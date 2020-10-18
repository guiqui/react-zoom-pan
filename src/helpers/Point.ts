import Matrix from './Matrix';
class Point {
  x: number = 0;
  y: number = 0;
  constructor(x: number, y: number) {
    this.matrixTransform = this.matrixTransform.bind(this);
    this.x = x;
    this.y = y;
  }

  matrixTransform(matrix: Matrix) {
    let x = this.x;
    let y = this.y;
    this.x = x * matrix.a + y * matrix.c + matrix.e;
    this.y = x * matrix.b + y * matrix.d + matrix.f;
  }
}
export default Point;
