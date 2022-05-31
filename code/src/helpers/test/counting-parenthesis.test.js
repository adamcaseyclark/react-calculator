import { countingParenthesisOfString } from "../calculations/counting-parenthesis";

describe("Counting Parenthesis", () => {
  test("Testing String '8*(10+8*2*(10*2+6÷3)' Comes Back As True", () => {
    expect(countingParenthesisOfString(")", "8*(10+8*2*(10*2+6÷3)")).toBe(true);
  });
});
