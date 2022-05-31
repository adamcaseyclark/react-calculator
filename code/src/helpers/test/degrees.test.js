import { degrees } from "../calculations/get/degrees";

describe("Radians To Degrees Conversion", () => {
  test("1 Radian Is 57.2958 Degrees", () => {
    expect(degrees("1")).toBe(57.29577951308232);
  });

  test("1 Radian Is 57.2958 Degrees", () => {
    expect(degrees("1.5707963267948966")).toBe(90);
  });
});
