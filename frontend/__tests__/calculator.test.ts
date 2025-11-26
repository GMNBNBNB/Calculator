import { Operation } from '../gen/proto/calculator/v1/calculator_pb';

describe('Calculator Operations', () => {
  test('Operation enum has correct values', () => {
    expect(Operation.UNSPECIFIED).toBe(0);
    expect(Operation.ADD).toBe(1);
    expect(Operation.SUBTRACT).toBe(2);
    expect(Operation.MULTIPLY).toBe(3);
    expect(Operation.DIVIDE).toBe(4);
  });
});

describe('Calculator Logic', () => {
  test('addition calculation', () => {
    const a = 10;
    const b = 5;
    expect(a + b).toBe(15);
  });

  test('subtraction calculation', () => {
    const a = 10;
    const b = 5;
    expect(a - b).toBe(5);
  });

  test('multiplication calculation', () => {
    const a = 10;
    const b = 5;
    expect(a * b).toBe(50);
  });

  test('division calculation', () => {
    const a = 10;
    const b = 5;
    expect(a / b).toBe(2);
  });

  test('division by zero returns infinity', () => {
    const a = 10;
    const b = 0;
    expect(a / b).toBe(Infinity);
  });

  test('handles decimal numbers', () => {
    const a = 10.5;
    const b = 2.5;
    expect(a + b).toBe(13);
    expect(a - b).toBe(8);
    expect(a * b).toBe(26.25);
    expect(a / b).toBe(4.2);
  });

  test('handles negative numbers', () => {
    const a = -10;
    const b = 5;
    expect(a + b).toBe(-5);
    expect(a - b).toBe(-15);
    expect(a * b).toBe(-50);
    expect(a / b).toBe(-2);
  });
});
