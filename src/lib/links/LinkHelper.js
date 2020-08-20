import Matrix from '../helpers/Matrix';
export default class LinkHelper {
  static getPosFromObjectOutPut(obj, outputId) {
    let matrix = new Matrix(obj.transform);
    matrix = matrix.translate(obj.w - 10, 30);
    return matrix;
  }
}
