export default class ZoomPanHelper {
  pan(dx, dy, transformMatrix) {
    transformMatrix.e -= dx;
    transformMatrix.f -= dy;
  }

  zoom(scale, cx, cy, transformMatrix) {
    transformMatrix.e -= cx;
    transformMatrix.f -= cy;

    transformMatrix.a *= scale;
    transformMatrix.b *= scale;
    transformMatrix.c *= scale;
    transformMatrix.d *= scale;
    transformMatrix.e *= scale;
    transformMatrix.f *= scale;

    transformMatrix.e += cx;
    transformMatrix.f += cy;
  }
}
