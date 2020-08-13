class Point {
  constructor(x, y) {
    this.matrixTransform = this.matrixTransform.bind(this);
    this.x = x;
    this.y = y;
  }

  matrixTransform(matrix) {
    let x = this.x;
    let y = this.y;
    this.x = x * matrix.a + y * matrix.c + matrix.e;
    this.y = x * matrix.b + y * matrix.d + matrix.f;
  }
}
export default Point;
