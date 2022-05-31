import { radians } from "../calculations/get/radians";

describe("Degrees To Radians Conversion", () => {
  test("1 Degree Is 0.017453292519943295 Radians", () => {
    expect(radians("1")).toBe(0.017453292519943295);
  });

  test("1 Degree Is 0.017453292519943295 Radians", () => {
    expect(radians("90")).toBe(1.5707963267948966);
  });
});
