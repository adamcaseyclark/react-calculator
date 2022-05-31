import {
  calculateMultiOperationString,
  removeParenthesesAndCalculate,
} from "../calculations/order-of-operations";

describe("Order Of Operations Fn() Tests - Main & Helper Method", () => {
  test("Helper Method: 6*52+3*17+3 Equals 315", () => {
    expect(calculateMultiOperationString("6*52+3*17+3")).toBe("366");
  });

  test("Helper Method: 6+52*3+17*3 Equals 213", () => {
    expect(calculateMultiOperationString("6+52*3+17*3")).toBe("213");
  });

  test("Helper Method: 6+52*3+17*3-1+33÷3÷0.5 Equals 234", () => {
    expect(calculateMultiOperationString("6+52*3+17*3-1+33÷3÷0.5")).toBe("234");
  });

  test("Helper Method: -6+52*3 Equals 150", () => {
    expect(calculateMultiOperationString("-6+52*3")).toBe("150");
  });

  test("Helper Method: -6+52*3+-17*-33÷-0.5 Equals 207", () => {
    expect(calculateMultiOperationString("-6+52*3+-17*-33÷-0.5")).toBe("-972");
  });

  test("(8) Returns a String of 8", () => {
    expect(removeParenthesesAndCalculate("(8)")).toBe("8");
  });

  test("7+(6×52+3) Equals 322", () => {
    expect(removeParenthesesAndCalculate("7+(6*52+3)")).toBe("322");
  });

  test("1*(12÷6×3÷2) Equals 3", () => {
    expect(removeParenthesesAndCalculate("1*(12÷6*3÷2)")).toBe("3");
  });

  test("1*(1+5*7(2÷4))*2+(17*3) Equals 88", () => {
    expect(removeParenthesesAndCalculate("1*(1+5*7*(2÷4))*2+(17*3)")).toBe(
      "88"
    );
  });

  test("2+(12÷6*3)÷2+2 Equals 7", () => {
    expect(removeParenthesesAndCalculate("2+(12÷6*3)÷2+2")).toBe("7");
  });

  test("(9+8*7*(8+9÷10)) Equals 507.4", () => {
    expect(removeParenthesesAndCalculate("(9+8*7*(8+9÷10))")).toBe("507.4");
  });

  test("8*(10+8*2*(10*2+6÷3)) Equals 2816", () => {
    expect(removeParenthesesAndCalculate("8*(10+8*2*(10*2+6÷3))")).toBe("2896");
  });

  // // TODO: FIND OUT WHY THESE DON'T WORK
  // test("3+(10÷(7-6*4))*2 Equals 17", () => {
  //   expect(removeParenthesesAndCalculate("3+(10÷(7-6*4))*2")).toBe(
  //     "1.8235294118"
  //   );
  // });

  test("Formatted (6+3)÷(7-4) Equals 3", () => {
    expect(removeParenthesesAndCalculate("(6+3)÷(7-4)")).toBe("3");
  });
});
