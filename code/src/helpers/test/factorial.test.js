import { factorial } from "../calculations/factorial";

describe("Get Factorial Function", () => {
  test("5 Factorial Is 120", () => {
    expect(factorial(5)).toBe(120);
  });

  test("-5 Factorial Is -120", () => {
    expect(factorial(-5)).toBe(-120);
  });

  test("-6 Factorial Is -720", () => {
    expect(factorial(-6)).toBe(-720);
  });

  test("-22 Factorial Is -1.1240007277776077e21", () => {
    expect(factorial(-22)).toBe(-1.1240007277776077e21);
  });

  test("101 Factorial Is 9.425947759838354e159", () => {
    expect(factorial(101)).toBe(9.425947759838354e159);
  });

  test("102 Factorial Brings Back The Message `Not a number`", () => {
    expect(factorial(102)).toBe("Not a number");
  });

  test("-101 Factorial Is -9.425947759838354e159", () => {
    expect(factorial(-101)).toBe(-9.425947759838354e159);
  });

  test("-102 Factorial Brings Back The Message `Not a number`", () => {
    expect(factorial(-102)).toBe("Not a number");
  });
});
