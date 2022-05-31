import { TextConstants } from "../../constants/text";

export function performBasicMath({ current, previous, operator }) {
  const currentAsANumber = parseFloat(current);
  const previousAsANumber = parseFloat(previous);

  let calculation = "";

  switch (operator) {
    case TextConstants.DIVISION_SIGN:
      calculation = previousAsANumber / currentAsANumber;
      break;
    case TextConstants.MULTIPLICATION_SIGN:
      calculation = previousAsANumber * currentAsANumber;
      break;
    case TextConstants.SUBTRACTION_SIGN:
      calculation = previousAsANumber - currentAsANumber;
      break;
    case TextConstants.ADDITION_SIGN:
      calculation = previousAsANumber + currentAsANumber;
      break;
  }

  return calculation.toString();
}
