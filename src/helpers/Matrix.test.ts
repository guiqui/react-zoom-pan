import Matrix from './Matrix';

describe('Testing Matrix creatiom', () => {
  let matrix = new Matrix('5, 6, 7, 8, 9, 10');
  test('Matrix creation', () => {
    expect(matrix.a).toBe(5);
    expect(matrix.b).toBe(6);
    expect(matrix.c).toBe(7);
    expect(matrix.d).toBe(8);
    expect(matrix.e).toBe(9);
    expect(matrix.f).toBe(10);
  });
});

describe('Testing Matrix translate', () => {
  let matrix = new Matrix('5, 6, 7, 8, 9, 10');
  matrix = matrix.translate(10, 10);
  test('Matrix creation', () => {
    expect(matrix.a).toBe(5);
    expect(matrix.b).toBe(6);
    expect(matrix.c).toBe(7);
    expect(matrix.d).toBe(8);
    expect(matrix.e).toBe(129);
    expect(matrix.f).toBe(150);
  });
});

describe('Testing Matrix rotating', () => {
  let matrix = new Matrix('5, 6, 7, 8, 9, 10');
  matrix = matrix.rotate(45);
  test('Matrix creation', () => {
    expect(matrix.a).toBe(8.48528137423857);
    expect(matrix.b).toBe(9.899494936611665);
    expect(matrix.c).toBe(1.4142135623730954);
    expect(matrix.d).toBe(1.4142135623730958);
    expect(matrix.e).toBe(9);
    expect(matrix.f).toBe(10);
  });
});

describe('Testing Matrix rotating', () => {
  let matrix = new Matrix('1,0,0,1,10,10');
  matrix = matrix.scale(10, 10);
  test('Matrix creation', () => {
    expect(matrix.a).toBe(10);
    expect(matrix.b).toBe(0);
    expect(matrix.c).toBe(0);
    expect(matrix.d).toBe(10);
    expect(matrix.e).toBe(10);
    expect(matrix.f).toBe(10);
  });
});
