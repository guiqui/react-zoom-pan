import SpacialHelper from './SpacialHelper';
import Consts from './ViewPortConst';
import Matrix from './Matrix';
import Point from './Point';
import Registry from '../registry/Registry';

describe('Testing Normalising vector', () => {
  test('vector X>Y and X POSITIVe ', () => {
    let vector = { x: 50, y: 20 };
    let result = SpacialHelper.normaliseVector(vector);
    expect(result.x).toBe(1);
    expect(result.y).toBe(0);
  });
  test('vector X>Y and X Negative ', () => {
    let vector = { x: -50, y: 20 };
    let result = SpacialHelper.normaliseVector(vector);
    expect(result.x).toBe(-1);
    expect(result.y).toBe(0);
  });
  test('vector X<Y and Y POSITIVe ', () => {
    let vector = { x: 50, y: 60 };
    let result = SpacialHelper.normaliseVector(vector);
    expect(result.x).toBe(0);
    expect(result.y).toBe(1);
  });
  test('vector X<Y and Y Negative ', () => {
    let vector = { x: -50, y: -60 };
    let result = SpacialHelper.normaliseVector(vector);
    expect(result.x).toBe(0);
    expect(result.y).toBe(-1);
  });
});

describe('Calculate Distance', () => {
  test('In X', () => {
    let p1 = { x: 1, y: 0 };
    let p2 = { x: 4, y: 0 };
    let distance = SpacialHelper.calculateDistance(p1, p2);
    expect(distance).toBe(3);
  });
  test('In y', () => {
    let p1 = { x: 1, y: 1 };
    let p2 = { x: 1, y: 5 };
    let distance = SpacialHelper.calculateDistance(p1, p2);
    expect(distance).toBe(4);
  });
  test('In y', () => {
    let p1 = { x: 1, y: 1 };
    let p2 = { x: 4, y: 4 };
    let distance = SpacialHelper.calculateDistance(p1, p2);
    expect(distance).toBe(4.242640687119285);
  });
});

describe('getCombineMatrix', () => {
  test('In X', () => {
    let obj1 = {
      id: '1',
      transform: '1,2,0,1,20,20',
      matrix: new Matrix('1,2,0,1,20,20'),
    };
    let obj2 = {
      id: '2',
      parent: '1',
      transform: '1,2,0,1,30,40',
      matrix: new Matrix('1,2,0,1,30,40'),
    };
    Registry.add(obj1.id, obj1);
    Registry.add(obj2.id, obj2);
    let matrix1 = new Matrix('1,2,0,1,20,20');
    let matrix2 = new Matrix('1,2,0,1,30,40');
    let testCombine = matrix2.multiply(matrix1);
    let objConbine = SpacialHelper.getCombineMatrix(obj2.id);
    expect(objConbine.a).toBe(testCombine.a);
    expect(objConbine.b).toBe(testCombine.b);
    expect(objConbine.c).toBe(testCombine.c);
    expect(objConbine.d).toBe(testCombine.d);
    expect(objConbine.e).toBe(testCombine.e);
    expect(objConbine.f).toBe(testCombine.f);
  });
});
describe('Test get objet rotation direction ', () => {
  let angleInRad = 10;
  let testConversion = angleInRad * (180 / Math.PI);
  let result = SpacialHelper.degrees(angleInRad);
  test('Test conversionto degrees', () => {
    expect(result).toBe(testConversion);
  });
});

describe('rotateToCenter ', () => {
  test('Test angle 0', () => {
    let angleInRad = 0;
    let matrix = new Matrix('1,0,0,1,20,20');
    let result = SpacialHelper.rotateToCenter(0, 0, angleInRad, matrix);
    expect(result).toBe(matrix);
  });

  test('Test angle 45', () => {
    let angle = 45;
    let matrix = new Matrix('1,0,0,1,20,20');
    let cx = 8;
    let cy = 8;
    let testMatrix = new Matrix('1,0,0,1,20,20');
    testMatrix = testMatrix.translate(cx, cy);
    testMatrix = testMatrix.rotate(angle);
    testMatrix = testMatrix.translate(-cx, -cy);
    let result = SpacialHelper.rotateToCenter(cx, cy, angle, matrix);
    expect(result.matrixToText()).toBe(testMatrix.matrixToText());
  });
  test('Test matrix null', () => {
    let angle = 45;
    let cx = 8;
    let cy = 8;

    let result = SpacialHelper.rotateToCenter(cx, cy, angle, null);
    expect(result).toBeNull();
  });
});

describe('Testing scale to center ', () => {
  test('Test scale 0', () => {
    let scale = 0;
    let matrix = new Matrix('1,0,0,1,20,20');
    let result = SpacialHelper.scaleToCenter(0, 0, scale, matrix);
    expect(result).toBe(matrix);
  });

  test('Test scale 2', () => {
    let scale = 2;
    let matrix = new Matrix('1,0,0,1,20,20');
    let cx = 8;
    let cy = 8;
    let testMatrix: Matrix = new Matrix('1,0,0,1,20,20');
    testMatrix = testMatrix.translate(cx, cy);
    testMatrix = testMatrix.scale(scale, scale);
    testMatrix = testMatrix.translate(-cx, -cy);
    let result = SpacialHelper.scaleToCenter(cx, cy, scale, matrix);
    expect(result.matrixToText()).toBe(testMatrix.matrixToText());
  });
  test('Test matrix null', () => {
    let scale = 2;
    let cx = 8;
    let cy = 8;
    let result = SpacialHelper.scaleToCenter(cx, cy, scale, null);
    expect(result).toBeNull();
  });
});

describe('Test get objet rotation direction ', () => {
  test('SW', () => {
    let p1 = { x: 1, y: 1 };
    let center = { x: 0, y: 0 };
    let p2 = { x: 0, y: -4 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.UNCLOCKWISE);
  });
  test('W', () => {
    let p1 = { x: 1, y: 1 };
    let center = { x: 0, y: 0 };
    let p2 = { x: -4, y: -4 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.UNCLOCKWISE);
  });
  test('W', () => {
    let p1 = { x: 1, y: -10 };
    let center = { x: 0, y: 0 };
    let p2 = { x: 5, y: -10 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.CLOCKWISE);
  });
  test('W', () => {
    let p1 = { x: 1, y: -10 };
    let center = { x: 0, y: 0 };
    let p2 = { x: 5, y: -5 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.CLOCKWISE);
  });
  test('VERTICAL LEFT CENTER', () => {
    let p1 = { x: -10, y: -10 };
    let center = { x: 0, y: 0 };
    let p2 = { x: -10, y: 10 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.UNCLOCKWISE);
  });
  test('VERTICAL Right CENTER', () => {
    let p1 = { x: -10, y: -10 };
    let center = { x: -20, y: -20 };
    let p2 = { x: -10, y: 10 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.CLOCKWISE);
  });

  test('HORIZONTAL DOWN CENTER', () => {
    let p1 = { x: -10, y: -10 };
    let center = { x: 0, y: 0 };
    let p2 = { x: 10, y: -10 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.CLOCKWISE);
  });
  test('HORIZONTAL UP CENTER', () => {
    let p1 = { x: -10, y: -10 };
    let center = { x: -20, y: -20 };
    let p2 = { x: 10, y: -10 };

    let result = SpacialHelper.getRotationDirection(p1, p2, center);
    expect(result).toBe(Consts.UNCLOCKWISE);
  });
});

describe('coordinates GlobalToLocal', () => {
  test('global and parent null', () => {
    let resutl = SpacialHelper.coordinatesGlobalToLocal(2, 3, null, null);
    expect(resutl.x).toBe(2);
    expect(resutl.y).toBe(3);
  });
  test('global null', () => {
    let x = 2;
    let y = 3;
    let parent = new Matrix('1,0,0,1,20,20');
    let testPoint = new Point(x, y);
    testPoint.matrixTransform(parent.inverse());
    let resutl = SpacialHelper.coordinatesGlobalToLocal(x, y, null, parent);
    expect(resutl.x).toBe(testPoint.x);
    expect(resutl.y).toBe(testPoint.y);
  });
  test('global and parent set', () => {
    let x = 2;
    let y = 3;
    let global = new Matrix('1,0,0,1,30,50');
    let parent = new Matrix('1,0,0,1,20,20');
    let testPoint = new Point(x, y);
    testPoint.matrixTransform(global.inverse());
    testPoint.matrixTransform(parent.inverse());
    let resutl = SpacialHelper.coordinatesGlobalToLocal(x, y, global, parent);
    expect(resutl.x).toBe(testPoint.x);
    expect(resutl.y).toBe(testPoint.y);
  });
});

describe('transformToViewPort', () => {
  test('Testing for global null', () => {
    let x = 2;
    let y = 3;
    let resutl = SpacialHelper.transformToViewPort(x, y, null, null, null);
    expect(resutl.x).toBe(2);
    expect(resutl.y).toBe(3);
  });
  test('Testing for item null', () => {
    let x = 2;
    let y = 3;
    let global = new Matrix('1,0,0,1,30,50');
    let resutl = SpacialHelper.transformToViewPort(x, y, global, null, null);
    expect(resutl.x).toBe(2);
    expect(resutl.y).toBe(3);
  });
  test('Testing for item and Global set', () => {
    let x = 2;
    let y = 3;
    let global = new Matrix('1,0,0,1,30,50');
    let itemM = new Matrix('1,0,0,1,20,30');
    let result = global.multiply(itemM);
    let testPoint = new Point(x, y);
    testPoint.matrixTransform(result);
    let resutl = SpacialHelper.transformToViewPort(x, y, global, itemM, null);
    expect(resutl.x).toBe(testPoint.x);
    expect(resutl.y).toBe(testPoint.y);
  });
  test('Testing for item and Global set', () => {
    let x = 2;
    let y = 3;
    let global = new Matrix('1,0,0,1,30,50');
    let parent = new Matrix('1,2,2,1,30,50');
    let itemM = new Matrix('1,0,0,1,20,30');
    let result = global.multiply(parent);
    let testPoint = new Point(x, y);
    result = result.multiply(itemM);
    testPoint.matrixTransform(result);
    let resutl = SpacialHelper.transformToViewPort(x, y, global, itemM, parent);
    expect(resutl.x).toBe(testPoint.x);
    expect(resutl.y).toBe(testPoint.y);
  });
});

// describe("viewPorttoObject",()=>{

//     test('Testing for global null',()=>{
//         let x=2;
//         let y=3;
//         let resutl=SpacialHelper.viewPorttoObject(x,y,null,null)
//         expect(resutl.x).toBe(2)
//         expect(resutl.y).toBe(3)
//     })
//     test('Testing for item null',()=>{
//         let x=2;
//         let y=3;
//         let global=new Matrix('1,0,0,1,30,50')
//         let resutl=SpacialHelper.transformToViewPort(x,y,global,null,null)
//         expect(resutl.x).toBe(2)
//         expect(resutl.y).toBe(3)
//     })
//     test('Testing for item and Global set',()=>{
//         let x=2;
//         let y=3;
//         let global=new Matrix('1,0,0,1,30,50')
//         let itemM=new Matrix('1,0,0,1,20,30')
//         let result=global.multiply(itemM);
//         let testPoint=new Point(x,y)
//         testPoint.matrixTransform(result)
//         let resutl=SpacialHelper.transformToViewPort(x,y,global,itemM,null)
//         expect(resutl.x).toBe(testPoint.x)
//         expect(resutl.y).toBe(testPoint.y)
//     })
//     test('Testing for item and Global set',()=>{
//         let x=2;
//         let y=3;
//         let global=new Matrix('1,0,0,1,30,50')
//         let parent=new Matrix('1,2,2,1,30,50')
//         let itemM=new Matrix('1,0,0,1,20,30')
//         let result=global.multiply(parent);
//         let testPoint=new Point(x,y)
//         result=result.multiply(itemM);
//         testPoint.matrixTransform(result)
//         let resutl=SpacialHelper.transformToViewPort(x,y,global,itemM,parent)
//         expect(resutl.x).toBe(testPoint.x)
//         expect(resutl.y).toBe(testPoint.y)
//     })
// })

describe('Calculate Rotation Angle', () => {
  test('In 45', () => {
    let p1 = { x: 4, y: 1 };
    let p2 = { x: 4, y: 4 };
    let center = { x: 1, y: 1 };
    let angle = SpacialHelper.calculateRotationsAngle(p1, center, p2);
    expect(Math.round(angle)).toBe(45);
  });

  test('In 90', () => {
    let p1 = { x: 4, y: 1 };
    let p2 = { x: 1, y: 4 };
    let center = { x: 1, y: 1 };
    let angle = SpacialHelper.calculateRotationsAngle(p1, center, p2);
    expect(Math.round(angle)).toBe(90);
  });
  test('In 180', () => {
    let p1 = { x: 4, y: 1 };
    let p2 = { x: -4, y: 1 };
    let center = { x: 1, y: 1 };
    let angle = SpacialHelper.calculateRotationsAngle(p1, center, p2);
    expect(Math.round(angle)).toBe(180);
  });
});

describe('Test Resize Obj', () => {
  test('TOP LEFT', () => {
    let p1 = { x: 1, y: 0 };
    let p2 = { x: 4, y: 0 };
    let state: any = {};
    state.selectedMtx = new Matrix();
    state.box = { w: 20, h: 20 };
    let result = SpacialHelper.resizeObject(
      10,
      10,
      Consts.MODE_RUBER_BAND_RESIZE_UL,
      state
    );
    expect(result.matrix.f).toBe(-10);
    expect(result.matrix.e).toBe(-10);
    expect(result.box.w).toBe(30);
    expect(result.box.h).toBe(30);
  });
  test('TOP RIGHT', () => {
    let p1 = { x: 1, y: 0 };
    let p2 = { x: 4, y: 0 };
    let state: any = {};
    state.selectedMtx = new Matrix();
    state.box = { w: 20, h: 20 };
    let result = SpacialHelper.resizeObject(
      10,
      10,
      Consts.MODE_RUBER_BAND_RESIZE_UR,
      state
    );
    expect(result.matrix.e).toBe(0);
    expect(result.matrix.f).toBe(-10);
    expect(result.box.w).toBe(10);
    expect(result.box.h).toBe(30);
  });
  test('BOTTOM LEFT', () => {
    let p1 = { x: 1, y: 0 };
    let p2 = { x: 4, y: 0 };
    let state: any = {};
    state.selectedMtx = new Matrix();
    state.box = { w: 20, h: 20 };
    let result = SpacialHelper.resizeObject(
      10,
      10,
      Consts.MODE_RUBER_BAND_RESIZE_DL,
      state
    );
    expect(result.matrix.e).toBe(-10);
    expect(result.matrix.f).toBe(0);
    expect(result.box.w).toBe(30);
    expect(result.box.h).toBe(10);
  });
  test('BOTTOM RIGHT', () => {
    let p1 = { x: 1, y: 0 };
    let p2 = { x: 4, y: 0 };
    let state: any = {};
    state.selectedMtx = new Matrix();
    state.box = { w: 20, h: 20 };
    let result = SpacialHelper.resizeObject(
      10,
      10,
      Consts.MODE_RUBER_BAND_RESIZE_DR,
      state
    );
    expect(result.matrix.e).toBe(0);
    expect(result.matrix.f).toBe(0);
    expect(result.box.w).toBe(10);
    expect(result.box.h).toBe(10);
  });
});
