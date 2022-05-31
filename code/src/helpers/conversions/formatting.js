import { PURPOSELY_FAIL_MODE } from "../../constants/globals";
import { RegexConstants } from "../../constants/regex";
import {
  NOT_A_NUMBER_MESSAGE,
  LARGEST_WHOLE_NUMBER_THAT_WILL_DISPLAY,
  LARGEST_EXPONENTIAL_NOTATED_NUMBER_THAT_WILL_DISPLAY_IN_WHOLE_NUMBER_FORMAT,
} from "../../constants/values";

function formatNumbers(stringOrNumber, numberOfDigitsAfterTheDecimalPoint) {
  const FORMATTED_AS_STRING = typeof Number
    ? stringOrNumber.toString()
    : stringOrNumber;

  // DECIMAL_NUMBER_WITH_TWO_OR_MORE_ZEROS_ENDING
  // DECIMAL_NUMBER_LONGER_THAN_ACCEPTED_NUMBER_OF_PLACES

  console.log(`in formatNumbers fn() => ${FORMATTED_AS_STRING}`);

  // TO FIXED REQUIRES INPUT TO BE NUMBER

  if (/[0-9]\.[0-9]+[0]{2,}$/.test(FORMATTED_AS_STRING)) {
    return FORMATTED_AS_STRING.split(/[0]{2,}$/)[0];
  } else if (/[0-9]+\.[0-9]{16,}/.test(FORMATTED_AS_STRING)) {
    const formattedWithFixed = Number(FORMATTED_AS_STRING)
      .toFixed(numberOfDigitsAfterTheDecimalPoint)
      .toString();

    return formattedWithFixed[formattedWithFixed.length - 1] === "0"
      ? formattedWithFixed.slice(0, -1)
      : formattedWithFixed;
  } else if (FORMATTED_AS_STRING === "9999999999999999") {
    return "9.999999999999999e15";
  } else if (FORMATTED_AS_STRING.includes("1.000000000000000")) {
    return FORMATTED_AS_STRING.replace(".000000000000000", "");
  } else if (
    Number(FORMATTED_AS_STRING) >
    LARGEST_EXPONENTIAL_NOTATED_NUMBER_THAT_WILL_DISPLAY_IN_WHOLE_NUMBER_FORMAT
  ) {
    return NOT_A_NUMBER_MESSAGE;
  } else if (
    Number(FORMATTED_AS_STRING) >= 9999999999999999 &&
    !FORMATTED_AS_STRING.includes("e")
  ) {
    const numberWhenNotated = Number(FORMATTED_AS_STRING).toExponential(
      numberOfDigitsAfterTheDecimalPoint
    );
    return numberWhenNotated.toString();
  }
  return FORMATTED_AS_STRING;
}

function formatExponentialNotatedNumbers(
  stringOrNumber,
  numberOfDigitsAfterTheDecimalPoint
) {
  const FORMATTED_AS_STRING = typeof Number
    ? stringOrNumber.toString().replace(/\s/g, "")
    : stringOrNumber.replace(/\s/g, "");

  // IF NOTATION HAS ZERO AS A COEFFICIENT
  // SPACES STRIPPED OUT AT THIS POINT
  if (
    RegexConstants.EXPONENTIAL_NOTATION_FORMAT_EMPTY.test(
      FORMATTED_AS_STRING
    ) ||
    RegexConstants.EXPONENTIAL_FORMAT_WITHOUT_COEFFICIENT.test(
      FORMATTED_AS_STRING
    )
  ) {
    return "0";
  }

  // POSITIVE NOTATION
  if (/-?[1-9]+\.?[0-9]*e[0-9]+/.test(FORMATTED_AS_STRING)) {
    if (/1\.[0]{15}e[0-9]+$/.test(FORMATTED_AS_STRING)) {
      return stringOrNumber.replace(".000000000000000", "");
    }

    if (Number(FORMATTED_AS_STRING) > 1e160) {
      return NOT_A_NUMBER_MESSAGE;
    } else if (Number(FORMATTED_AS_STRING) <= 1e15) {
      const rawCalculation =
        Number(FORMATTED_AS_STRING.split("e")[0]) *
        Number(
          `1${Array(Number(FORMATTED_AS_STRING.split("e")[1]))
            .fill("0")
            .join("")}`
        );

      return formatNumbers(rawCalculation);
    }
    return FORMATTED_AS_STRING;
    // NEGATIVE NOTATION
  } else if (/-?[1-9.]+e-[0-9]+/.test(FORMATTED_AS_STRING)) {
    console.log(`in negative notation fn() => ${FORMATTED_AS_STRING}`);

    if (
      Number(FORMATTED_AS_STRING) < 1e-160 &&
      !RegexConstants.EXPONENTIAL_FORMAT_NEGATIVE_COEFFICIENT_NEGATIVE_EXPONENT.test(
        FORMATTED_AS_STRING
      )
    ) {
      return NOT_A_NUMBER_MESSAGE;
    } else if (
      Number(FORMATTED_AS_STRING) >= 1e-15 ||
      Number(FORMATTED_AS_STRING) <= -1e-15
    ) {
      // TODO: THIS NEEDS WORK - HARDENING AND TESTS TO SUPPORT
      const rawCalculation = (
        Number(FORMATTED_AS_STRING.split("e-")[0]) /
        Number(
          `1${Array(Number(FORMATTED_AS_STRING.split("e-")[1]))
            .fill("0")
            .join("")}`
        )
      ).toFixed(numberOfDigitsAfterTheDecimalPoint);
      return formatNumbers(rawCalculation);
    }
    return FORMATTED_AS_STRING;
  } else {
    throw new Error("didn't fit expected");
  }
}

function formatStrings(stringOrNumber) {
  if (
    stringOrNumber === "Infinity" ||
    stringOrNumber === "-Infinity" ||
    stringOrNumber === "NaN" ||
    isNaN(stringOrNumber)
  ) {
    return NOT_A_NUMBER_MESSAGE;
  }
  return stringOrNumber;
}

export function formatting(stringOrNumber, numberOfDigitsAfterTheDecimalPoint) {
  const FORMATTED_AS_STRING = typeof Number
    ? stringOrNumber.toString()
    : stringOrNumber;

  if (!PURPOSELY_FAIL_MODE) {
    if (
      /^-?[A-Za-z ]+$/.test(FORMATTED_AS_STRING) ||
      (isNaN(stringOrNumber) && typeof stringOrNumber !== "string")
    ) {
      return formatStrings(FORMATTED_AS_STRING);
    } else if (/-?[0-9.]+\s?e\s?-?[0-9]+/.test(FORMATTED_AS_STRING)) {
      return formatExponentialNotatedNumbers(
        FORMATTED_AS_STRING,
        numberOfDigitsAfterTheDecimalPoint
      ).replace("e+", "e");
    }
    return formatNumbers(
      FORMATTED_AS_STRING,
      numberOfDigitsAfterTheDecimalPoint
    ).replace("e+", "e");
  }
}
