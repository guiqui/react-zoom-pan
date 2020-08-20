import Consts from './ViewPortConst';
import Matrix from './Matrix';
import Point from './Point';
import Registry from '../registry/Registry';
const radiansFactor = 180 / Math.PI;
class SpacialHelper {
  static normaliseVector(vector) {
    if (Math.abs(vector.x) > Math.abs(vector.y)) {
      return vector.x > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
    } else {
      return vector.y > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
    }
  }

  //Distance between 2 points
  static calculateDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  static calculateRotationsAngle(p1, center, p2) {
    let p1Center = SpacialHelper.calculateDistance(p1, center);
    let p2Center = SpacialHelper.calculateDistance(p2, center);
    let p1p2 = SpacialHelper.calculateDistance(p1, p2);
    let enu = Math.pow(p1Center, 2) + Math.pow(p2Center, 2) - Math.pow(p1p2, 2);
    let deno = 2 * p1Center * p2Center;
    return Math.acos(enu / deno) * radiansFactor;
  }
  static getParentMatrix(id, combine) {
    let parentId = Registry.get(id).parent;
    if (!parentId) return combine;
    let parentObj = Registry.get(parentId);
    let parentMtx = parentObj.matrix;
    if (combine) combine = combine.multiply(parentMtx);
    else combine = parentMtx;
    return SpacialHelper.getParentMatrix(parentId, combine);
  }

  static getCombineMatrix(id) {
    let combine = new Matrix(Registry.get(id).transform);
    let parentMtx = SpacialHelper.getParentMatrix(id, combine);
    return parentMtx ? parentMtx : combine;
  }

  static degrees(radians) {
    return radians * radiansFactor;
  }

  static rotateToCenter(cx, cy, angle, matrix) {
    if (angle == 0 || !matrix) return matrix;
    matrix = matrix.translate(cx, cy);
    matrix = matrix.rotate(angle);
    matrix = matrix.translate(-cx, -cy);
    return matrix;
  }

  static scaleToCenter(cx, cy, scale, matrix) {
    if (scale == 0 || !matrix) return matrix;
    matrix = matrix.translate(cx, cy);
    matrix = matrix.scale(scale);
    matrix = matrix.translate(-cx, -cy);
    return matrix;
  }

  static getRotationDirection(p1, p2, center) {
    let vector = { x: p2.x - p1.x, y: p2.y - p1.y };
    vector = SpacialHelper.normaliseVector(vector);
    //we are on x
    if (vector.y === 0) {
      if (p1.y - center.y < 0) {
        return vector.x > 0 ? Consts.CLOCKWISE : Consts.UNCLOCKWISE;
      } else {
        return vector.x < 0 ? Consts.CLOCKWISE : Consts.UNCLOCKWISE;
      }
    } else {
      if (p1.x - center.x > 0) {
        return vector.y > 0 ? Consts.CLOCKWISE : Consts.UNCLOCKWISE;
      } else {
        return vector.y < 0 ? Consts.CLOCKWISE : Consts.UNCLOCKWISE;
      }
    }
  }
  static transfromIncrement(dx, dy, global, selectedObjMatrix) {
    //La concatenada
    let matrix = global;
    if (global) {
      matrix = matrix.multiply(selectedObjMatrix);
    } else {
      matrix = selectedObjMatrix;
    }
    let pts = new Point(0, 0);
    let pte = new Point(dx, dy);
    let inverse = matrix.inverse();
    pts.matrixTransform(inverse);
    pte.matrixTransform(inverse);
    return { dx: pte.x - pts.x, dy: pte.y - pts.y };
  }

  static coordinatesGlobalToLocal(x, y, global, parent) {
    //La concatenada
    let pts = new Point(x, y);
    if (global) pts.matrixTransform(global.inverse());
    if (parent) pts.matrixTransform(parent.inverse());
    return pts;
  }

  static transformToViewPort(x, y, globalM, itemM, parent) {
    let pts = new Point(x, y);
    if (!globalM || !itemM) return pts;
    if (parent) globalM = globalM.multiply(parent);
    let matrix = globalM.multiply(itemM);

    pts.matrixTransform(matrix);
    return pts;
  }

  static viewPorttoObject(x, y, globalM, parent) {
    let itemMatrix = new Matrix();

    itemMatrix.translate(x, y);
    let contextMatrix = globalM ? globalM : itemMatrix;
    if (parent) contextMatrix = contextMatrix.multiply(parent);
    contextMatrix = contextMatrix.inverse();
    return itemMatrix.multiply(contextMatrix);
  }

  // To calculate the rubber band position giving a selected element
  // We nede to do the following
  // 1)Get the box of the element
  // 2)Remove the rotation out of the item matrix
  // 3)Get the combine matrix of global and item without the rotation
  // 4)Get the x,y,w,h new positions
  // 5)Calculate the newmatix of the rubberband to apply rotation

  static calculateRubberBandPosition(selectedMatrix, selectedBox, globalMatrix, parentMatrix) {
    if (!selectedMatrix) {
      return {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        transform: 0
      };
    }

    let box = selectedBox;
    let matrix = selectedMatrix;
    //extract rotation
    box = this.calculateTrasformBox(box, globalMatrix, matrix, parentMatrix);
    box.x = box.x - Consts.RUBBER_BAND_HANDLE_SIZE;
    box.y = box.y - Consts.RUBBER_BAND_HANDLE_SIZE;
    box.w = box.w + Consts.RUBBER_BAND_HANDLE_SIZE * 2;
    box.h = box.h + Consts.RUBBER_BAND_HANDLE_SIZE * 2;

    let rubberMatrix = new Matrix();
    let cx = box.x + box.w / 2;
    let cy = box.y + box.h / 2;
    rubberMatrix = SpacialHelper.rotateToCenter(cx, cy, box.angle, rubberMatrix);
    rubberMatrix = rubberMatrix.matrixToText();
    return {
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      transform: rubberMatrix
    };
  }

  //Calculates the the box position with combine matrix minus
  //taking out the item matrix rotation
  static calculateTrasformBox(box, globalM, itemM, parentMatrix) {
    let angle = 0;
    if (itemM.b != 0) angle = SpacialHelper.degrees(Math.atan2(itemM.b, itemM.a));
    if (parentMatrix) globalM = globalM.multiply(parentMatrix);
    //Remove roation from item matrix
    let cx = box.w / 2;
    let cy = box.h / 2;
    itemM = SpacialHelper.rotateToCenter(cx, cy, -angle, itemM);
    //Combine with global
    let matrix = globalM.multiply(itemM);
    //get new point given the new combine matrix
    let pts = new Point(0, 0);
    let pte = new Point(box.w, box.h);
    pts.matrixTransform(matrix);
    pte.matrixTransform(matrix);

    pte.x = pte.x - pts.x;
    pte.y = pte.y - pts.y;
    return { x: pts.x, y: pts.y, w: pte.x, h: pte.y, angle: angle };
  }

  static moveObject(dx, dy, state) {
    let increment = SpacialHelper.transfromIncrement(dx, dy, state.viewportMtx, state.selection.matrix);
    let objMatrix = state.selection.matrix;
    objMatrix = objMatrix.translate(-increment.dx, -increment.dy);
    return { matrix: objMatrix, box: null };
  }

  static checkConstrains(objbox, matrix, parentbox) {
    if (!parentbox) return true;
    let ptl = new Point(0, 0);
    let ptr = new Point(objbox.w, 0);
    let pbl = new Point(0, objbox.h);
    let pbr = new Point(objbox.w, objbox.h);
    ptl.matrixTransform(matrix);
    if (!SpacialHelper.isPointInBox(ptl, parentbox)) return false;
    ptr.matrixTransform(matrix);
    if (!SpacialHelper.isPointInBox(ptr, parentbox)) return false;
    pbl.matrixTransform(matrix);
    if (!SpacialHelper.isPointInBox(pbl, parentbox)) return false;
    pbr.matrixTransform(matrix);
    if (!SpacialHelper.isPointInBox(pbr, parentbox)) return false;
    return true;
  }
  static isPointInBox(point, box) {
    if (point.x < 0 || point.y < 0) return false;
    if (point.x > box.w || point.y > box.h) return false;
    return true;
  }

  static rotateObject(x, y, lastx, lasty, state) {
    //Calculating angle giv
    let box = state.box;
    let cx = box.x + box.w / 2;
    let cy = box.y + box.h / 2;

    let p1 = { x: lastx, y: lasty };
    let p2 = { x: x, y: y };
    let center = SpacialHelper.transformToViewPort(cx, cy, state.viewportMtx, state.selection.matrix, state.parentMtx);
    console.log(`rotating cx:${center.x} cy:${center.y}   x:${x} y:${y} `);
    let direction = SpacialHelper.getRotationDirection(p1, p2, center);
    let angle = SpacialHelper.calculateRotationsAngle(p1, center, p2);
    angle = direction == Consts.CLOCKWISE ? angle : -angle;

    let objMatrix = state.selection.matrix;
    //let inc=2.0;

    objMatrix = objMatrix.translate(cx, cy);
    objMatrix = objMatrix.rotate(angle);
    objMatrix = objMatrix.translate(-cx, -cy);
    return { matrix: objMatrix, box: null };
  }

  static scaleObject(dx, dy, right, state) {
    let box = state.box;
    let cx = box.x + box.w / 2;
    let cy = box.y + box.h / 2;

    if (!right) {
      dx = -dx;
      dy = -dy;
    }

    //To Calculate the tramsformer right scale to increase
    let increment = SpacialHelper.transfromIncrement(dx, dy, state.viewportMtx, state.selection.matrix);
    let oldpoint = SpacialHelper.transfromIncrement(box.x + box.w - cx, box.y + box.h - cy, state.viewportMtx, state.selection.matrix);
    let newpoint = SpacialHelper.transfromIncrement(
      box.x + box.w - increment.dx - cx,
      box.y + box.h - increment.dy - cy,
      state.viewportMtx,
      state.selection.matrix
    );

    if (box.x + box.w - increment.dx < cx) return;
    if (box.y + box.h - increment.dy < cy) return;

    let ix = newpoint.dx / oldpoint.dx;
    let iy = newpoint.dy / oldpoint.dy;

    let objMatrix = state.selection.matrix;
    objMatrix = objMatrix.translate(cx, cy);
    objMatrix = objMatrix.scale(ix, iy);
    objMatrix = objMatrix.translate(-cx, -cy);
    return { matrix: objMatrix, box: null };
  }

  static resizeObject(dx, dy, side, state) {
    let box = state.selection.box;
    let ix = 0;
    let iy = 0;

    //To Calculate the tramsformer right scale to increase
    let increment = SpacialHelper.transfromIncrement(dx, dy, state.viewportMtx, state.selection.matrix);
    let fdx = 0;
    let fdy = 0;
    let objMatrix = state.selection.matrix;
    switch (side) {
      case Consts.MODE_RUBER_BAND_RESIZE_UL:
        ix = -increment.dx;
        iy = -increment.dy;
        fdx = increment.dx;
        fdy = increment.dy;
        break;
      case Consts.MODE_RUBER_BAND_RESIZE_UR:
        iy = -increment.dy;
        fdx = -increment.dx;
        fdy = increment.dy;
        break;
      case Consts.MODE_RUBER_BAND_RESIZE_DL:
        ix = -increment.dx;
        fdx = increment.dx;
        fdy = -increment.dy;
        break;
      case Consts.MODE_RUBER_BAND_RESIZE_DR:
        fdx = -increment.dx;
        fdy = -increment.dy;
        break;
    }

    //ver aplicar la inversa del incremento x,y si left or up
    //return new (w,h)
    let objBox = { x: 0, y: 0, w: box.w + fdx, h: box.h + fdy };
    objMatrix = objMatrix.translate(ix, iy);
    return { matrix: objMatrix, box: objBox };
  }
}
export default SpacialHelper;
