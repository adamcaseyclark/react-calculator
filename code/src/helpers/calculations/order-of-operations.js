import { performBasicMath } from "./basic-math";

import { RegexConstants } from "../../constants/regex";
import { TextConstants } from "../../constants/text";

function getOperation(string) {
  if (/[0-9]+(÷-|÷)[0-9]+/.test(string)) {
    return TextConstants.DIVISION_SIGN;
  } else if (/[0-9]+(\*-|\*)[0-9]+/.test(string)) {
    return TextConstants.MULTIPLICATION_SIGN;
  } else if (/[0-9]+(--|-)[0-9]+/.test(string)) {
    return TextConstants.SUBTRACTION_SIGN;
  } else {
    return TextConstants.ADDITION_SIGN;
  }
}

// WILL HANDLE STRING WITH NO PARENTHESIS
export function calculateMultiOperationString(string) {
  let first, equation, last;

  if (
    RegexConstants.STRING_WITHOUT_ANY_OPERATORS.test(string) ||
    /^-[0-9]+$/.test(string)
  ) {
    return string;
  }

  // IF STRING HAS ADDITION AND SUBTRACTION BUT NOT
  // DIVISION OR MULTIPLICATION OR VICE VERSA
  if (
    (RegexConstants.ANY_OPERATOR.test(string) &&
      RegexConstants.STRING_WITH_ADDITION_SUBTRACTION_OPERATORS.test(string) &&
      !RegexConstants.STRING_WITH_MULTIPLICATION_DIVISION_OPERATORS.test(
        string
      )) ||
    (!RegexConstants.STRING_WITH_ADDITION_SUBTRACTION_OPERATORS.test(string) &&
      RegexConstants.STRING_WITH_MULTIPLICATION_DIVISION_OPERATORS.test(string))
  ) {
    // FRONT TO BACK GOES IN ORDER SINCE IT HAS MULTIPLICATION & DIVISION
    // OR ADDITION AND SUBTRACTION - NOT BOTH

    equation = string.match(
      RegexConstants.STRING_STARTING_WITH_EQUATION_WITH_ANY_OPERATOR
    );
    [first, last] = string.split(equation[0]);
  } else {
    const regexToUse =
      RegexConstants.CHECK_FOR_MULTIPLICATION_DIVISION_EQUATION_WITH_PRECEDING_NEGATIVE.test(
        string
      )
        ? RegexConstants.MULTIPLICATION_DIVISION_EQUATION_WITH_PRECEDING_NEGATIVE
        : RegexConstants.MULTIPLICATION_DIVISION_EQUATION_WITHOUT_PRECEDING_NEGATIVE;

    equation = string.match(regexToUse);
    [first, last] = string.split(equation[0]);
  }

  const operator = getOperation(equation[0]);
  const basicMathEquation = {
    previous: equation[0].split(operator)[0],
    current: equation[0].split(operator)[1],
    operator,
  };

  const answer = performBasicMath({ ...basicMathEquation });
  return calculateMultiOperationString(`${first}${answer}${last}`);
}

export function removeParenthesesAndCalculate(string) {
  const INNER_MOST_PARENTHESES = /\([0-9÷*\-+.]+\)/;

  if (INNER_MOST_PARENTHESES.test(string)) {
    const matchArray = string.match(INNER_MOST_PARENTHESES);
    const left = string.split(matchArray[0])[0];
    const right = string.split(matchArray[0])[1];
    const equation = string.replace(`${left}(`, "").replace(`)${right}`, "");
    const answer = calculateMultiOperationString(equation);
    const formatted = /\.[0-9]+/.test(answer)
      ? Number(answer).toFixed(1)
      : answer;
    return removeParenthesesAndCalculate(`${left}${formatted}${right}`);
  } else if (RegexConstants.ANY_OPERATOR.test(string)) {
    const answer = calculateMultiOperationString(string);
    return removeParenthesesAndCalculate(answer);
  }
  return string;
}
