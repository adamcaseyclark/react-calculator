import { NOT_A_NUMBER_MESSAGE } from "../../constants/values";

export const factorial = (number) => {
  const NUMBER_AS_NUMBER = Number(number);

  if (NUMBER_AS_NUMBER <= 101 && NUMBER_AS_NUMBER >= -101) {
    if (NUMBER_AS_NUMBER === 0 || NUMBER_AS_NUMBER === 1) {
      return 1;
    } else if (NUMBER_AS_NUMBER === -1) {
      return -1;
    } else if (NUMBER_AS_NUMBER < 0) {
      const numberAfterCalculation =
        NUMBER_AS_NUMBER * factorial(NUMBER_AS_NUMBER + 1);
      return NUMBER_AS_NUMBER % 2 === 0
        ? numberAfterCalculation * -1
        : numberAfterCalculation;
    }
    return NUMBER_AS_NUMBER * factorial(NUMBER_AS_NUMBER - 1);
  }
  return NOT_A_NUMBER_MESSAGE;
};
