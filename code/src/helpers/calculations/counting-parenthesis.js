import { radians } from "./get/radians";

import { TextConstants } from "../../constants/text";

export function countingParenthesisOfString(type, string) {
  if (type === TextConstants.RIGHT_PARENTHESIS) {
    return (
      string
        .split("")
        .filter((letter) => letter === TextConstants.LEFT_PARENTHESIS)
        .length ===
      string
        .split("")
        .filter((letter) => letter === TextConstants.RIGHT_PARENTHESIS).length +
        1
    );
  }
}
