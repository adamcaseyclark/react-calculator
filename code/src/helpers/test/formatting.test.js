import { formatting } from "../conversions/formatting";

describe("Formatted Strings And Numbers", () => {
  test("Notated Number 1 e -7 After Formatted", () => {
    expect(formatting("1 e -7")).toBe("0.0000001");
  });

  test("Notated Number 1 e -15 After Formatted", () => {
    expect(formatting("1 e -15")).toBe("0.000000000000001");
  });

  test("Notated Number 1 e -16 After Formatted", () => {
    expect(formatting("1 e -16")).toBe("1e-16");
  });

  test("Float Number With Zero(s) Ending Number Are Stripped Away", () => {
    expect(formatting("0.10")).toBe("0.1");
  });

  test("-1.1240007277776077e+21 removes '+' and formats to -1.1240007277776077e21", () => {
    expect(formatting("-1.1240007277776077e+21")).toBe("-1.124000727777608e21");
  });

  test("1.1247284486357991e161 formats to `Not a number`", () => {
    expect(formatting("1.1247284486357991e161")).toBe("Not a number");
  });

  test("LARGEST_EXPONENTIAL_NOTATED_NUMBER_THAT_WILL_DISPLAY_IN_WHOLE_NUMBER_FORMAT will be Not a number", () => {
    expect(
      formatting(
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
      )
    ).toBe("Not a number");
  });

  test("Infinity formats to Not A Number", () => {
    expect(formatting("Infinity")).toBe("Not a number");
  });

  test("Negative Infinity (-Infinity) formats to Not A Number", () => {
    expect(formatting("-Infinity")).toBe("Not a number");
  });

  test("Not A Number Symbol (NaN) When The Type Is A String - formats to Not A Number", () => {
    expect(formatting("NaN")).toBe("Not a number");
  });

  test("Not A Number Symbol (NaN) When The Type Is A Number - formats to Not A Number", () => {
    expect(formatting(NaN)).toBe("Not a number");
  });

  test("9999999999999998 formats to 9999999999999998", () => {
    expect(formatting("9999999999999998")).toBe("9999999999999998");
  });

  test("9999999999999999 formats to 9999999999999999", () => {
    expect(formatting("9999999999999999")).toBe("9.999999999999999e15");
  });

  test("99999999999999999 formats to 1e17", () => {
    expect(formatting("99999999999999999")).toBe("1e17");
  });

  test("1.000000000000000e17 formats to 1e17", () => {
    expect(formatting("1.000000000000000e17")).toBe("1e17");
  });

  test("1.1 e 17 formats to 1.1e17", () => {
    expect(formatting("1.1 e 17")).toBe("1.1e17");
  });

  test("0 e 0 formats to 0", () => {
    expect(formatting("0 e 0")).toBe("0");
  });

  test("1.2 e -1 formats to 0.12", () => {
    expect(formatting("1.2 e -1")).toBe("0.12");
  });
});
