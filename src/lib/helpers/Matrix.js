class Matrix {
  constructor(data) {
    this.apply(data);
  }

  apply(data) {
    let values = [1, 0, 0, 1, 0, 0];
    if (data) {
      values = data.split(',');
    }

    this.a = parseFloat(values[0]);
    this.b = parseFloat(values[1]);
    this.c = parseFloat(values[2]);
    this.d = parseFloat(values[3]);
    this.e = parseFloat(values[4]);
    this.f = parseFloat(values[5]);
    this.transform = this.transform.bind(this);
    this.rotate = this.rotate.bind(this);
    this.applyToPoint = this.applyToPoint.bind(this);
    this._isEqual = this._isEqual.bind(this);
  }

  flipX() {
    return this.transform(-1, 0, 0, 1, 0, 0);
  }

  /**
   * Flips the vertical values.
   */
  flipY() {
    return this.transform(1, 0, 0, -1, 0, 0);
  }

  reset() {
    this.a = this.d = 1;
    this.b = this.c = this.e = this.f = 0;
    return this;
  }

  rotate(angle) {
    let cos = Math.cos(angle * 0.017453292519943295),
      sin = Math.sin(angle * 0.017453292519943295);
    return this.transform(cos, sin, -sin, cos, 0, 0);
  }

  rotateDeg(angle) {
    return this.rotate(angle * 0.017453292519943295);
  }

  scale(sx, sy) {
    return this.transform(sx, 0, 0, sy, 0, 0);
  }

  scaleX(sx) {
    return this.transform(sx, 0, 0, 1, 0, 0);
  }

  scaleY(sy) {
    return this.transform(1, 0, 0, sy, 0, 0);
  }

  skew(sx, sy) {
    return this.transform(1, sy, sx, 1, 0, 0);
  }

  skewX(sx) {
    return this.transform(1, 0, sx, 1, 0, 0);
  }

  skewY(sy) {
    return this.transform(1, sy, 0, 1, 0, 0);
  }

  setTransform(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
  }

  translate(tx, ty) {
    return this.transform(1, 0, 0, 1, tx, ty);
  }

  transform(a2, b2, c2, d2, e2, f2) {
    let a1 = this.a,
      b1 = this.b,
      c1 = this.c,
      d1 = this.d,
      e1 = this.e,
      f1 = this.f;
    let result = new Matrix();
    result.a = a1 * a2 + c1 * b2;
    result.b = b1 * a2 + d1 * b2;
    result.c = a1 * c2 + c1 * d2;
    result.d = b1 * c2 + d1 * d2;
    result.e = a1 * e2 + c1 * f2 + e1;
    result.f = b1 * e2 + d1 * f2 + f1;

    return result;
  }

  multiply(matrix) {
    let result = new Matrix();
    let a1 = this.a,
      b1 = this.b,
      c1 = this.c,
      d1 = this.d,
      e1 = this.e,
      f1 = this.f;

    result.a = a1 * matrix.a + c1 * matrix.b;
    result.b = b1 * matrix.a + d1 * matrix.b;
    result.c = a1 * matrix.c + c1 * matrix.d;
    result.d = b1 * matrix.c + d1 * matrix.d;
    result.e = a1 * matrix.e + c1 * matrix.f + e1;
    result.f = b1 * matrix.e + d1 * matrix.f + f1;

    return result;
  }

  inverse() {
    let a = this.a,
      b = this.b,
      c = this.c,
      d = this.d,
      e = this.e,
      f = this.f,
      m = new Matrix(),
      dt = a * d - b * c;

    m.a = d / dt;
    m.b = -b / dt;
    m.c = -c / dt;
    m.d = a / dt;
    m.e = (c * f - d * e) / dt;
    m.f = -(a * f - b * e) / dt;

    return m;
  }

  interpolate(m2, t) {
    let m = new Matrix();

    m.a = this.a + (m2.a - this.a) * t;
    m.b = this.b + (m2.b - this.b) * t;
    m.c = this.c + (m2.c - this.c) * t;
    m.d = this.d + (m2.d - this.d) * t;
    m.e = this.e + (m2.e - this.e) * t;
    m.f = this.f + (m2.f - this.f) * t;

    return m;
  }

  applyToPoint(x, y) {
    return {
      x: x * this.a + y * this.c + this.e,
      y: x * this.b + y * this.d + this.f
    };
  }

  applyToArray(points) {
    let i = 0,
      p,
      l,
      mxPoints = [];

    if (typeof points[0] === 'number') {
      l = points.length;

      while (i < l) {
        p = this.applyToPoint(points[i++], points[i++]);
        mxPoints.push(p.x, p.y);
      }
    } else {
      for (; (p = points[i]); i++) {
        mxPoints.push(this.applyToPoint(p.x, p.y));
      }
    }

    return mxPoints;
  }

  applyToTypedArray(points) {
    let i = 0,
      p,
      l = points.length,
      mxPoints = new Float32Array(l);

    while (i < l) {
      p = this.applyToPoint(points[i], points[i + 1]);
      mxPoints[i++] = p.x;
      mxPoints[i++] = p.y;
    }

    return mxPoints;
  }

  isIdentity() {
    return (
      this._isEqual(this.a, 1) &&
      this._isEqual(this.b, 0) &&
      this._isEqual(this.c, 0) &&
      this._isEqual(this.d, 1) &&
      this._isEqual(this.e, 0) &&
      this._isEqual(this.f, 0)
    );
  }

  isEqual(m) {
    return (
      this._isEqual(this.a, m.a) &&
      this._isEqual(this.b, m.b) &&
      this._isEqual(this.c, m.c) &&
      this._isEqual(this.d, m.d) &&
      this._isEqual(this.e, m.e) &&
      this._isEqual(this.f, m.f)
    );
  }

  _isEqual(f1, f2) {
    return Math.abs(f1 - f2) < 1e-14;
  }

  matrixToText() {
    return this.a + ', ' + this.b + ', ' + this.c + ', ' + this.d + ', ' + this.e + ', ' + this.f;
  }
  get trx() {
    return this.e;
  }
  set trx(value) {
    this.e = value;
  }
  get try() {
    return this.f;
  }
  set try(value) {
    this.f = value;
  }
}
export default Matrix;
