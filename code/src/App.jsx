import { useReducer } from "react";

import useKeyboardShortcut from "use-keyboard-shortcut";

import { DigitKey } from "./components/DigitKey";
import { ExponentKey } from "./components/ExponentKey";
import { InverseKey } from "./components/InverseKey";
import { LogKey } from "./components/LogKey";
import { OperatorKey } from "./components/OperatorKey";
import { RadicalKey } from "./components/RadicalKey";
import { PaperTape } from "./components/PaperTape";

import { formatting } from "./helpers/conversions/formatting";

import { countingParenthesisOfString } from "./helpers/calculations/counting-parenthesis";
import { performBasicMath } from "./helpers/calculations/basic-math";
import { removeParenthesesAndCalculate } from "./helpers/calculations/order-of-operations";
import { trig } from "./helpers/calculations/trig";
import { factorial } from "./helpers/calculations/factorial";

import {
  DEBUGGING_MODE,
  PURPOSELY_FAIL_MODE,
  DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT,
} from "./constants/globals";
import { ACTIONS } from "./constants/actions";

import { RegexConstants } from "./constants/regex";
import { TextConstants } from "./constants/text";
import { ShortcutKeyConstants } from "./constants/shortcuts";

import {
  PI,
  E,
  NOT_IMPLEMENTED_MESSAGE,
  NOT_A_NUMBER_MESSAGE,
  EMPTY_EXPONENTIAL_NOTATION,
} from "./constants/values";

import "./styles.css";

const TWO_STEP_OPERATIONS = [
  TextConstants.X_RAISED_TO_THE_Y,
  TextConstants.Y_RAISED_TO_THE_X,
  TextConstants.LOG_Y,
  TextConstants.Y_ROOT_OF_X,
];

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.TOGGLE_PAPER_TAPE:
      return {
        ...state,
        showPaperTape: !state.showPaperTape,
        lastKey: payload.digit,
        shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.CHANGE_CALCULATOR_LAYOUT:
      // ONLY CAN BE OPENED BY SHORTCUT KEYS

      return {
        ...state,
        lastKey: payload.digit,
        shortcutKeys: payload.digit,
      };

    case ACTIONS.MONITOR_PARENTHESES:
      // COMMON KEYS THAT ARE ACROSS MULTIPLE CONDITIONS - AGGREGATED IN ONE SPOT
      // EITHER OF THE TWO KEYS INVOLVE SHIFT, THE LAYOUT SHOULD NOT SWITCH
      const commonParenthesesKeys = {
        lastKey: payload.digit,
        shifted: payload.shortcutKeys ? !state.shifted : state.shifted,
        shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        const COPY_OF_STATE = Object.assign({}, state);

        if (payload.digit === TextConstants.LEFT_PARENTHESIS) {
          if (RegexConstants.ANY_OPERATOR.test(state.lastKey)) {
            const IS_NESTED_PARENTHESES =
              payload.digit === TextConstants.LEFT_PARENTHESIS &&
              state.audit &&
              state.audit.includes(TextConstants.LEFT_PARENTHESIS);

            return {
              ...state,
              previous: IS_NESTED_PARENTHESES ? null : state.current,
              operationKeyIsSelected: null,
              ...commonParenthesesKeys,
              audit: IS_NESTED_PARENTHESES
                ? `${COPY_OF_STATE.audit}${TextConstants.LEFT_PARENTHESIS}`
                : `${state.current}${state.operator}${TextConstants.LEFT_PARENTHESIS}`,
            };
          }

          // WHEN NO PREVIOUS DATA IS INCLUDED IN THE EQUATION
          // THE EQUATION STARTS WITH THE LEFT PARENTHESIS
          // OR NO CHANGE IF CURRENT IS NOT AN OPERATOR
          return {
            ...state,
            ...commonParenthesesKeys,
            audit:
              /^-?[0-9.]+/.test(state.current) && state.current !== "0"
                ? null
                : TextConstants.LEFT_PARENTHESIS,
          };
        }

        // NO REASON TO KNOW THAT THE LAST KEY WAS A RIGHT PARENTHESIS THAT I CAN THINK OF
        if (payload.digit === TextConstants.RIGHT_PARENTHESIS) {
          if (!state.audit) {
            return {
              ...state,
              shifted: payload.shortcutKeys ? !state.shifted : state.shifted,
              shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
            };
          }

          // CAN THIS BREAK?
          const READY_FOR_CALCULATION = countingParenthesisOfString(
            TextConstants.RIGHT_PARENTHESIS,
            state.audit
          );

          if (READY_FOR_CALCULATION) {
            const NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS =
              state.audit &&
              RegexConstants.NUMBERS_AND_OPERATOR_BEFORE_LEFT_PARENTHESIS.test(
                state.audit
              )
                ? state.audit.split(TextConstants.LEFT_PARENTHESIS)[0].slice(-1)
                : null;

            const BEFORE_FIRST_PARENTHESIS_ARRAY =
              NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS
                ? state.audit.match(
                    RegexConstants.NUMBERS_AND_OPERATOR_BEFORE_LEFT_PARENTHESIS
                  )
                : null;

            const REMAINING = NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS
              ? state.audit.replace(BEFORE_FIRST_PARENTHESIS_ARRAY[0], "")
              : null;

            // THIS IS IF THERE IS A PREVIOUS NUMBERS AND OPERATOR TO THE FIRST LEFT PARENTHESIS
            // WILL DISPLAY EVERYTHING EXCEPT THIS PART UNTIL EQUALS IS SELECTED
            return {
              ...state,
              ...commonParenthesesKeys,
              current: NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS
                ? removeParenthesesAndCalculate(`(${REMAINING})`)
                : removeParenthesesAndCalculate(`${state.audit})`),
              previous: null,
              operator: NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS,
              operationKeyIsSelected:
                NUMBERS_AND_OPERATOR_BEFORE_FIRST_LEFT_PARENTHESIS,
              audit: state.audit ? state.audit.concat(payload.digit) : null,
            };
          }

          // WHEN DETERMINED STRING IS UNBALANCED - KEEPS ADDING TO AUDIT
          return {
            ...state,
            ...commonParenthesesKeys,
            previous: null,
            operationKeyIsSelected: null,
            audit: `${COPY_OF_STATE.audit}${TextConstants.RIGHT_PARENTHESIS}`,
          };
        }
      }

      return {
        ...state,
        ...commonParenthesesKeys,
      };

    case ACTIONS.DELETE_DIGIT_FROM_DISPLAY:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE &&
        !RegexConstants.ANY_OPERATOR.test(state.lastKey) &&
        !RegexConstants.ANY_SPECIFIED_KEY.test(state.lastKey)
      ) {
        if (state.current === "0" || state.current.length === 1) {
          return {
            ...state,
            current: "0",
            shortcutKeys: payload.shortcutKeys,
          };
        }

        return {
          ...state,
          current: state.current.slice(0, -1),
          lastKey: state.current.slice(0, -1).slice(-1),
          shortcutKeys: payload.shortcutKeys,
        };
      }

      return {
        ...state,
        shortcutKeys: payload.shortcutKeys,
      };

    case ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION:
      // COMMON KEYS THAT ARE ACROSS MULTIPLE CONDITIONS - AGGREGATED IN ONE SPOT
      const commonSingleDigitOrActionKey = {
        lastKey: payload.digit,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        !payload.digit.match(RegexConstants.ANY_SINGLE_DIGIT_ZERO_THROUGH_NINE)
      ) {
        return {
          ...state,
          current:
            payload.digit === TextConstants.RANDOM
              ? Math.random()
              : payload.digit === TextConstants.EULERS_NUMBER
              ? E
              : PI,
          ...commonSingleDigitOrActionKey,
        };
      }

      // REPLACES CURRENT NUMBER(S) AFTER A LEFT PARENTHESIS SELECTED -
      // WITH NO OPERATOR IN BETWEEN (NOT SURE WHY)
      if (state.lastKey === TextConstants.LEFT_PARENTHESIS && !state.audit) {
        return {
          ...state,
          current: payload.digit,
          ...commonSingleDigitOrActionKey,
        };
      }

      // LAST KEY EQUALS `)` MEANS THIS IS MULTIPLYING LIKE (8+1)8
      if (state.lastKey === TextConstants.RIGHT_PARENTHESIS) {
        return {
          ...state,
          current: payload.digit,
          audit: state.audit ? state.audit.concat(payload.digit) : null,
          ...commonSingleDigitOrActionKey,
        };
      }

      if (state.current === "0" && payload.digit === "0") {
        return {
          ...state,
          statusOfAllClear: false,
          ...commonSingleDigitOrActionKey,
        };
      }

      // WHEN THE CURRENT IS AN EXPONENTIAL NOTATED NUMBER
      if (
        state.current &&
        RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT.test(
          state.current
        )
      ) {
        const coefficient = state.current.split(" e ")[0];
        const exponent = state.current.split(" e ")[1];

        return {
          ...state,
          current: `${coefficient} e ${exponent.replace(/^0/, "")}${
            payload.digit
          }`,
          ...commonSingleDigitOrActionKey,
        };
      }

      const reasonsToClearDisplayForNewDigits =
        (state.lastKey && RegexConstants.ANY_OPERATOR.test(state.lastKey)) ||
        state.current === "0" ||
        (state.lastKey && TWO_STEP_OPERATIONS.includes(state.lastKey)) ||
        state.current === NOT_A_NUMBER_MESSAGE ||
        state.lastKey === TextConstants.LEFT_PARENTHESIS ||
        [
          TextConstants.PI,
          TextConstants.RANDOM,
          TextConstants.EULERS_NUMBER,
        ].includes(state.lastKey);

      // REASONS TO MOVE CURRENT TO PREVIOUS
      // LAST KEY WAS AN OPERATOR OR LAST KEY WAS A TWO STEP OPERATION
      const reasonsToMoveCurrentToPrevious =
        (state.lastKey && RegexConstants.ANY_OPERATOR.test(state.lastKey)) ||
        (TWO_STEP_OPERATIONS.includes(state.lastKey) &&
          state.lastKey !== TextConstants.CLEAR);

      return {
        ...state,
        current: reasonsToClearDisplayForNewDigits
          ? payload.digit
          : `${state.current}${payload.digit}`,
        previous: reasonsToMoveCurrentToPrevious
          ? state.current
          : state.previous,
        ...commonSingleDigitOrActionKey,
        statusOfAllClear: false,
        audit: state.audit ? state.audit.concat(payload.digit) : null,
      };

    case ACTIONS.ADD_OPERATOR:
      // COMMON KEYS THAT ARE ACROSS MULTIPLE CONDITIONS - AGGREGATED IN ONE SPOT
      // WHEN SHORTCUT KEYS ARE USED THAT INVOLVE SHIFT, THE LAYOUT SHOULD NOT SWITCH
      const commonAddingOperatorKeys = {
        operator: payload.digit,
        lastKey: payload.digit,
        operationKeyIsSelected: payload.digit,
        shifted:
          payload.shortcutKeys && /[*+]/.test(payload.digit)
            ? !state.shifted
            : state.shifted,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE &&
        state.lastKey !== TextConstants.LEFT_PARENTHESIS
      ) {
        // EQUALS KEY FOLLOWED BY AN OPERATOR CLEAR PREVIOUS - NEXT ENTRY MOVE CURRENT TO PREVIOUS
        if (state.lastKey === TextConstants.EQUALS_SIGN) {
          return {
            ...state,
            previous: null,
            ...commonAddingOperatorKeys,
          };
        }

        // STANDARD CALCULATION - SAME AS EQUALS BUT EVENT IS SELECTING OPERATOR KEY - NEW OPERATOR SAVED
        // DISPLAY STAYS THE SAME - SHOWS THE DIGITS ENTERED BEFORE
        if (state.previous && state.current) {
          return {
            ...state,
            current: formatting(
              performBasicMath(state),
              DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
            ),
            previous: null,
            ...commonAddingOperatorKeys,
            audit: state.audit ? state.audit.concat(payload.digit) : null,
          };
        }

        // NO PREVIOUS VALUE - JUST ADDS THE OPERATOR, DISPLAY STAYS UNTIL NEW NUMBERS ARE SELECTED
        // OR PREVIOUS LAST KEY WAS AN OPERATOR - JUST SWITCHING OPERATORS
        return {
          ...state,
          ...commonAddingOperatorKeys,
          audit: state.audit ? state.audit.concat(payload.digit) : null,
        };
      }

      return {
        ...state,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.REMOVE_VALUE_FROM_MEMORY:
      return {
        ...state,
        memory: TextConstants.RESET_VALUE,
        shortcutKeys: null,
      };

    case ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        return {
          ...state,
          memory:
            payload.digit === TextConstants.MEMORY_PLUS
              ? `${parseInt(state.memory) + parseInt(state.current)}`
              : `${parseInt(state.memory) - parseInt(state.current)}`,
          lastKey: payload.digit,
          shortcutKeys: null,
        };
      }

      return {
        ...state,
        shortcutKeys: null,
      };

    case ACTIONS.RECALL_VALUE_FROM_MEMORY:
      return {
        ...state,
        current: state.memory,
        shortcutKeys: null,
      };

    case ACTIONS.PERFORM_CLEAR:
      // WHEN THE BUTTON IS (C), NOT (AC)
      // WHEN CALCULATION IN PROGRESS IN TRUE WITH NO PREVIOUS IS REMOVED
      if (!state.statusOfAllClear) {
        if (state.calculationInProgress) {
          return {
            ...state,
            current: state.previous ? "0" : state.current,
            statusOfAllClear: true,
            lastKey: TextConstants.CLEAR,
            calculationInProgress: state.previous
              ? state.calculationInProgress
              : null,
            shortcutKeys:
              payload && payload.shortcutKeys ? payload.shortcutKeys : null,
          };
        }

        // WILL FORMAT EXPONENTIAL FORMAT NUMBER WHEN CLEARED ONCE (C)
        if (
          RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT.test(
            state.current
          )
        ) {
          return {
            ...state,
            current: Number(state.current.replace(/\s/g, "")),
            statusOfAllClear: true,
            lastKey: null,
          };
        }

        // IF OPERATOR IS LAST KEY - REMOVES OPERATOR, DISPLAY REMAINS
        // IF HAS OPERATOR, PREVIOUS, AND CURRENT - CLEARS DISPLAY - HOLDS PREVIOUS AND OPERATOR
        // IF NO OPERATOR, REMOVES DISPLAY
        // THIS IS CALCULATION IN PROGRESS WITH NO PREVIOUS - CLEARS CALCULATION IN PROGRESS
        // CLEARS WHEN MEMORY ADDED OR ADJUSTED - NOT EXPECTED
        const lastKeyWasNotAnOperator =
          state.operator && !RegexConstants.ANY_OPERATOR.test(state.lastKey);

        const reasonToClearDisplay =
          lastKeyWasNotAnOperator ||
          (!state.operator &&
            ![TextConstants.MEMORY_PLUS, TextConstants.MEMORY_MINUS].includes(
              state.lastKey
            ));

        return {
          ...state,
          current: reasonToClearDisplay ? "0" : state.current,
          operator: lastKeyWasNotAnOperator ? state.operator : null,
          statusOfAllClear: true,
          lastKey: TextConstants.CLEAR,
          calculationInProgress: false,
          operationKeyIsSelected: lastKeyWasNotAnOperator
            ? state.operationKeyIsSelected
            : null,
          shortcutKeys:
            payload && payload.shortcutKeys ? payload.shortcutKeys : null,
        };
      }

      // WHEN THE BUTTON IS (AC)
      return {
        ...state,
        current: "0",
        previous: null,
        operator: null,
        calculationInProgress: false,
        lastKey: TextConstants.ALL_CLEAR,
        statusOfAllClear: true,
        audit: null,
        operationKeyIsSelected: null,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.CHANGE_THE_SIGN_OF_NUMBER:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE &&
        !RegexConstants.EXPONENTIAL_FORMAT_WITHOUT_EXPONENT.test(state.current)
      ) {
        // RETURNS `0` ON `0.000000` THEN SELECTING NEGATIVE
        if (state.current.match(/0.0+/) || state.current === "0") {
          return {
            ...state,
            current: "0",
            shortcutKeys:
              payload && payload.shortcutKeys ? payload.shortcutKeys : null,
          };
        }

        // EXPONENTIAL NOTATION FORMAT, HANDLING BOTH ADDING OR REMOVING NEGATIVE SIGN
        if (
          RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT.test(
            state.current
          )
        ) {
          return {
            ...state,
            current: RegexConstants.EXPONENTIAL_FORMAT_NEGATIVE_EXPONENT.test(
              state.current
            )
              ? `${state.current.split(" e ")[0]} e ${state.current
                  .split(" e ")[1]
                  .replace("-", "")}
                `
              : `${state.current.split(" e ")[0]} e -${
                  state.current.split(" e ")[1]
                }`,
            shortcutKeys:
              payload && payload.shortcutKeys ? payload.shortcutKeys : null,
          };
        }

        // HANDLING BOTH ADDING OR REMOVING NEGATIVE SIGN
        return {
          ...state,
          current: state.current.match(/^-[0-9]+/)
            ? state.current.replace("-", "")
            : `-${state.current}`,
          shortcutKeys:
            payload && payload.shortcutKeys ? payload.shortcutKeys : null,
        };
      }

      return {
        ...state,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.COVERT_TO_PERCENTAGE:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        return {
          ...state,
          current: Number(state.current) / 100,
          lastKey: TextConstants.PERCENTAGE_SYMBOL,
          shortcutKeys:
            payload && payload.shortcutKeys ? payload.shortcutKeys : null,
        };
      }

      return {
        ...state,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.PERFORM_SHIFT:
      return {
        ...state,
        shifted: !state.shifted,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.RAISED_TO_THE_POWER:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        const IS_A_TWO_STEP_CALCULATION =
          payload.digit === TextConstants.X_RAISED_TO_THE_Y ||
          payload.digit === TextConstants.Y_RAISED_TO_THE_X;
        const squared = parseFloat(state.current) * parseFloat(state.current);
        const cubed =
          parseFloat(state.current) *
          parseFloat(state.current) *
          parseFloat(state.current);

        return {
          ...state,
          current: IS_A_TWO_STEP_CALCULATION
            ? state.current
            : payload.digit === TextConstants.X_SQUARED
            ? squared
            : cubed,
          lastKey: payload.digit,
          calculationInProgress: IS_A_TWO_STEP_CALCULATION
            ? payload.digit
            : null,
          shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
        };
      }

      return {
        ...state,
        shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.REMOVE_THE_RADICAL:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        return {
          ...state,
          current:
            payload.digit === TextConstants.Y_ROOT_OF_X
              ? state.current
              : payload.digit === TextConstants.THIRD_ROOT_OF_X
              ? Number(state.current) ** (1 / 3)
              : Number(state.current) ** (1 / 2),
          lastKey: payload.digit,
          calculationInProgress:
            payload.digit === TextConstants.Y_ROOT_OF_X
              ? TextConstants.Y_ROOT_OF_X
              : null,
          shortcutKeys: null,
        };
      }

      return {
        ...state,
        shortcutKeys: null,
      };

    case ACTIONS.PERFORM_TRIG_FUNCTIONS:
      return {
        ...state,
        current: formatting(
          trig({ ...state }, payload.digit, state.usingRadiansInCalculations),
          DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
        ),
        lastKey: payload.digit,
        shortcutKeys: null,
      };

    case ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (
          payload.digit === TextConstants.EULERS_NUMBER_RAISED_TO_THE_X &&
          state.current.match(/-[0-9]+/)
        ) {
          return {
            ...state,
            current: NOT_A_NUMBER_MESSAGE,
            shortcutKeys: null,
          };
        }

        if (state.current === "1" || state.current === "0") {
          return {
            ...state,
            current:
              state.current === "0"
                ? "1"
                : payload.digit === TextConstants.TWO_RAISED_T0_X
                ? TextConstants.NUMBER_TWO
                : payload.digit === TextConstants.TEN_RAISED_T0_X
                ? TextConstants.NUMBER_TEN
                : E,
            lastKey: payload.digit,
            shortcutKeys: null,
          };
        }

        const USERS_INPUT = Number(state.current.replace("-", ""));
        const POSITIVE_EXPONENT = Array(USERS_INPUT - 1)
          .fill(
            state.shifted
              ? 2
              : payload.digit === TextConstants.TEN_RAISED_T0_X
              ? 10
              : E
          )
          .reduce(
            (previous, current) => previous * current,
            state.shifted
              ? 2
              : payload.digit === TextConstants.TEN_RAISED_T0_X
              ? 10
              : E
          );

        return {
          ...state,
          current: formatting(
            /^-/.test(state.current)
              ? 1 / POSITIVE_EXPONENT
              : POSITIVE_EXPONENT,
            DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
          ),
          lastKey: payload.digit,
          shortcutKeys: null,
        };
      }

      return {
        ...state,
      };

    case ACTIONS.ENTER_EXPONENTIAL_NOTATION:
      const commonExponentialNotationKeys = {
        lastKey: TextConstants.EXPONENTIAL_NOTATION,
        shortcutKeys:
          payload && payload.shortcutKeys
            ? TextConstants.EXPONENTIAL_NOTATION
            : null,
      };

      if (
        !state.current.match(
          RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT
        ) &&
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (/^0.[0]+/.test(state.current)) {
          return {
            ...state,
            current: TextConstants.EMPTY_EXPONENTIAL_FORMAT,
            ...commonExponentialNotationKeys,
          };
        }

        return {
          ...state,
          current: `${state.current || "0"} e 0`,
          ...commonExponentialNotationKeys,
        };
      }

      return {
        ...state,
        ...commonExponentialNotationKeys,
      };

    case ACTIONS.PERFORM_BASE_LOGARITHM:
      const commonLogKeys = {
        lastKey: payload.digit,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.current === "0") {
          return {
            ...state,
            current: NOT_A_NUMBER_MESSAGE,
            ...commonLogKeys,
          };
        }

        return {
          ...state,
          current: state.shifted
            ? payload.digit === TextConstants.LOG_Y
              ? state.current
              : formatting(
                  Math.log2(Number(state.current)),
                  DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
                )
            : payload.digit === TextConstants.BASE_TEN_LOGARITHM
            ? formatting(
                Math.log10(Number(state.current)),
                DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
              )
            : formatting(
                Math.log(Number(state.current)),
                DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
              ),
          ...commonLogKeys,
          calculationInProgress:
            payload.digit === TextConstants.LOG_Y ? TextConstants.LOG_Y : null,
        };
      }

      return {
        ...state,
        ...commonLogKeys,
      };

    case ACTIONS.GET_THE_INVERSE_OF_DISPLAYED_NUMBER:
      const commonInverseKeyValues = {
        lastKey: TextConstants.INVERSE,
        shortcutKeys: null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.current === "0") {
          return {
            current: NOT_A_NUMBER_MESSAGE,
            ...commonInverseKeyValues,
          };
        }

        return {
          ...state,
          current: 1 / Number(state.current),
          ...commonInverseKeyValues,
        };
      }

      return {
        ...state,
        ...commonInverseKeyValues,
      };

    case ACTIONS.GET_FACTORIAL_FOR_GIVEN_VALUE:
      const addingNegativeIfNeeded =
        state.current && /^-/.test(state.current) ? "-" : "";

      const commonFactorialKeys = {
        lastKey: TextConstants.FACTORIAL_KEY,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.current === "0") {
          return {
            ...state,
            current: "1",
            ...commonFactorialKeys,
          };
        }

        if (state.current.includes(".")) {
          return {
            ...state,
            current: NOT_A_NUMBER_MESSAGE,
            ...commonFactorialKeys,
          };
        }

        return {
          ...state,
          current: formatting(
            factorial(state.current),
            DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
          ),
          ...commonFactorialKeys,
        };
      }

      return {
        ...state,
        ...commonFactorialKeys,
      };

    case ACTIONS.ADD_DECIMAL_POINT:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE &&
        !RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT.test(
          state.current
        )
      ) {
        if (
          state.lastKey === TextConstants.PERCENTAGE_SYMBOL ||
          state.current === "0"
        ) {
          return {
            ...state,
            current: "0.",
            lastKey: null,
            shortcutKeys:
              payload && payload.shortcutKeys ? payload.shortcutKeys : null,
          };
        }

        if (!state.current.includes(TextConstants.DECIMAL_POINT)) {
          return {
            ...state,
            current: `${state.current}${TextConstants.DECIMAL_POINT}`,
            shortcutKeys:
              payload && payload.shortcutKeys ? payload.shortcutKeys : null,
          };
        }
      }

      return {
        ...state,
        shortcutKeys:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.CALCULATE:
      // COMMON KEYS THAT ARE ACROSS MULTIPLE CONDITIONS - AGGREGATED IN ONE SPOT
      const STAND_FIELDS_IN_CALCULATION = {
        previous: null,
        operator: null,
        lastKey: TextConstants.EQUALS_SIGN,
        calculationInProgress: false,
        operationKeyIsSelected: null,
        audit: null,
        shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
      };

      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.lastKey === TextConstants.RIGHT_PARENTHESIS) {
          return {
            ...state,
            current: removeParenthesesAndCalculate(state.audit),
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        // IF FITS THIS FORMAT NUMBER/(NUMBER+NUMBER)NUMBER
        // TAKES THE OPERATION FROM PRECEDING (NOT SURE WHY)
        if (
          state.audit &&
          RegexConstants.NUMBER_OUTSIDE_OF_PARENTHESIS_WITH_NO_PRECEDING_OPERATOR.test(
            state.audit
          ) &&
          state.operator
        ) {
          const sub = state.audit.split(TextConstants.LEFT_PARENTHESIS)[1];
          const problem = sub.split(TextConstants.RIGHT_PARENTHESIS)[0];
          const right = sub.split(TextConstants.RIGHT_PARENTHESIS)[1];

          return {
            ...state,
            current: removeParenthesesAndCalculate(
              `(${problem})${state.operator}${right}`
            ),
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        if (state.calculationInProgress) {
          if (state.calculationInProgress === TextConstants.Y_ROOT_OF_X) {
            return {
              ...state,
              current: Number(state.previous) ** (1 / Number(state.current)),
              ...STAND_FIELDS_IN_CALCULATION,
            };
          }

          return {
            ...state,
            current: Array(
              Number(
                state.calculationInProgress === TextConstants.X_RAISED_TO_THE_Y
                  ? state.current
                  : state.previous
              )
            )
              .fill(
                Number(
                  state.calculationInProgress ===
                    TextConstants.X_RAISED_TO_THE_Y
                    ? state.previous
                    : state.current
                )
              )
              .reduce((n, m) => n * m),
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        // WHEN NO OPERATOR SELECTED, WILL FORMAT IN NOTATION IF MEETS CRITERIA
        if (
          RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT.test(
            state.current
          )
        ) {
          return {
            ...state,
            current: formatting(
              state.current,
              DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
            ),
            lastKey: TextConstants.EQUALS_SIGN,
          };
        }

        // NOT A NUMBER DISPLAYED WHEN 0 + DIVIDE + EQUALS => NOT A NUMBER MESSAGE (NOT SURE WHY)
        if (!state.previous && state.current === "0") {
          return {
            ...state,
            current:
              state.lastKey === TextConstants.DIVISION_SIGN
                ? NOT_A_NUMBER_MESSAGE
                : state.current,
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        // DOES NOT CLEAR DISPLAY WHEN NUMBERS AND NO OPERATOR
        // WILL MUTATE NUMBER THAT CAN BE MODIFIED
        if (
          !state.previous &&
          !state.operator &&
          state.lastKey !== TextConstants.EQUALS_SIGN
        ) {
          return {
            ...state,
            current: formatting(
              state.current,
              DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
            ),
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        // SUBTRACTION CHANGES THE SIGN
        if (
          !state.previous &&
          state.current !== "0" &&
          state.operator === TextConstants.SUBTRACTION_SIGN
        ) {
          return {
            ...state,
            current: `-${state.current}`,
            ...STAND_FIELDS_IN_CALCULATION,
          };
        }

        // MULTIPLE TIMES REPEATEDLY SELECTING OF EQUALS
        // WHEN VALUE, OPERATOR, AND EQUALS ARE SELECTED - ADDS 2 OF THE CURRENT TOGETHER
        return {
          ...state,
          current: !state.previous
            ? formatting(
                performBasicMath({ ...state, previous: state.current }),
                DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
              )
            : payload.digit === TextConstants.EQUALS_SIGN &&
              state.lastKey === TextConstants.EQUALS_SIGN
            ? formatting(
                performBasicMath({
                  ...state,
                  previous: state.current,
                  current: state.previous,
                  operator: !state.operator
                    ? TextConstants.ADDITION_SIGN
                    : state.operator,
                }),
                DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
              )
            : formatting(
                performBasicMath(state),
                DEFAULT_NUMBER_OF_DIGITS_AFTER_THE_DECIMAL_POINT
              ),
          previous:
            state.lastKey === TextConstants.EQUALS_SIGN
              ? state.previous
              : state.current,
          lastKey: TextConstants.EQUALS_SIGN,
          operationKeyIsSelected: null,
          audit: null,
          shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
        };
      }

      return {
        ...state,
        shortcutKeys: payload.shortcutKeys ? payload.shortcutKeys : null,
      };

    case ACTIONS.TOGGLE_BETWEEN_DEGREES_AND_RADIANS:
      return {
        ...state,
        usingRadiansInCalculations: !state.usingRadiansInCalculations,
        shortcutKeys: null,
      };

    case ACTIONS.NOT_IMPLEMENTED: {
      // INCLUDING SHORTCUTS KEYS IN CASE SCENARIO IS RULED NOT IMPLEMENTED
      return {
        ...state,
        current: `${NOT_IMPLEMENTED_MESSAGE} (${
          payload && payload.digit ? payload.digit : null
        })`,
        lastKey: payload && payload.digit ? payload.digit : null,
        shortcutKey:
          payload && payload.shortcutKeys ? payload.shortcutKeys : null,
      };
    }
  }
}

function App() {
  const [
    {
      current,
      previous,
      operator,
      memory,
      calculationInProgress,
      lastKey,
      operationKeyIsSelected,
      shifted,
      usingRadiansInCalculations,
      shortcutKeys,
      statusOfAllClear,
      audit,
      showPaperTape,
      listOfTransactions,
    },
    dispatch,
  ] = useReducer(reducer, {
    current: "0",
    memory: "0",
    shifted: false,
    usingRadiansInCalculations: false,
    shortcutKeys: null,
    statusOfAllClear: true,
    showPaperTape: false,
  });

  useKeyboardShortcut(ShortcutKeyConstants.LEFT_PARENTHESIS, () =>
    dispatch({
      type: ACTIONS.MONITOR_PARENTHESES,
      payload: {
        digit: TextConstants.LEFT_PARENTHESIS,
        shortcutKeys: ShortcutKeyConstants.LEFT_PARENTHESIS,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.RIGHT_PARENTHESIS, () =>
    dispatch({
      type: ACTIONS.MONITOR_PARENTHESES,
      payload: {
        digit: TextConstants.RIGHT_PARENTHESIS,
        shortcutKeys: ShortcutKeyConstants.RIGHT_PARENTHESIS,
      },
    })
  );

  // OVERRIDE SYSTEM FLAG WILL NOT CLEAR CALCULATOR ON COPY (CONTROL/COMMAND + C) - NOT WORKING
  useKeyboardShortcut(ShortcutKeyConstants.CLEAR, () =>
    dispatch(
      {
        type: ACTIONS.PERFORM_CLEAR,
        payload: { shortcutKeys: ShortcutKeyConstants.CLEAR },
      },
      {
        overrideSystem: true,
      }
    )
  );

  useKeyboardShortcut(ShortcutKeyConstants.CLEAR_ESC, () =>
    dispatch({
      type: ACTIONS.PERFORM_CLEAR,
      payload: { shortcutKeys: ShortcutKeyConstants.CLEAR_ESC },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.CLEAR_ALL, () =>
    dispatch({
      type: ACTIONS.PERFORM_CLEAR,
      payload: { shortcutKeys: ShortcutKeyConstants.CLEAR_ALL },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.NEGATE_VALUE, () =>
    dispatch({
      type: ACTIONS.CHANGE_THE_SIGN_OF_NUMBER,
      payload: {
        shortcutKeys: ShortcutKeyConstants.NEGATE_VALUE,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.PERCENTAGE_SYMBOL, () =>
    dispatch({
      type: ACTIONS.COVERT_TO_PERCENTAGE,
      payload: {
        shortcutKeys: ShortcutKeyConstants.PERCENTAGE_SYMBOL,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.DIVISION_SYMBOL, () =>
    dispatch({
      type: ACTIONS.ADD_OPERATOR,
      payload: {
        digit: TextConstants.DIVISION_SIGN,
        shortcutKeys: ShortcutKeyConstants.DIVISION_SYMBOL,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.SHIFT, () => {
    dispatch({
      type: ACTIONS.PERFORM_SHIFT,
      payload: { shortcutKeys: ShortcutKeyConstants.SHIFT },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.CARET_SYMBOL, () => {
    dispatch({
      type: ACTIONS.RAISED_TO_THE_POWER,
      payload: {
        digit: TextConstants.X_RAISED_TO_THE_Y,
        shortcutKeys: ShortcutKeyConstants.CARET_SYMBOL,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.SEVEN, () => {
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_SEVEN,
        shortcutKeys: ShortcutKeyConstants.SEVEN,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.EIGHT, () => {
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_EIGHT,
        shortcutKeys: ShortcutKeyConstants.EIGHT,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.NINE, () => {
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_NINE,
        shortcutKeys: ShortcutKeyConstants.NINE,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.MULTIPLICATION_SYMBOL, () =>
    dispatch({
      type: ACTIONS.ADD_OPERATOR,
      payload: {
        digit: TextConstants.MULTIPLICATION_SIGN,
        shortcutKeys: ShortcutKeyConstants.MULTIPLICATION_SYMBOL,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.NATURAL_LOG, () =>
    dispatch({
      type: ACTIONS.PERFORM_BASE_LOGARITHM,
      payload: { shortcutKeys: ShortcutKeyConstants.NATURAL_LOG },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.FOUR, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_FOUR,
        shortcutKeys: ShortcutKeyConstants.FOUR,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.FIVE, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_FIVE,
        shortcutKeys: ShortcutKeyConstants.FIVE,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.SIX, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_SIX,
        shortcutKeys: ShortcutKeyConstants.SIX,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.SUBTRACTION_SYMBOL, () =>
    dispatch({
      type: ACTIONS.ADD_OPERATOR,
      payload: {
        digit: TextConstants.SUBTRACTION_SIGN,
        shortcutKeys: ShortcutKeyConstants.SUBTRACTION_SYMBOL,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.EXCLAMATION_POINT, () =>
    dispatch({
      type: ACTIONS.GET_FACTORIAL_FOR_GIVEN_VALUE,
      payload: {
        shortcutKeys: ShortcutKeyConstants.EXCLAMATION_POINT,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.EE, () => {
    dispatch({
      type: ACTIONS.ENTER_EXPONENTIAL_NOTATION,
      payload: { shortcutKeys: ShortcutKeyConstants.EE },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.ONE, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_ONE,
        shortcutKeys: ShortcutKeyConstants.ONE,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.TWO, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_TWO,
        shortcutKeys: ShortcutKeyConstants.TWO,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.THREE, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_THREE,
        shortcutKeys: ShortcutKeyConstants.THREE,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.ADDITION_SYMBOL, () =>
    dispatch({
      type: ACTIONS.ADD_OPERATOR,
      payload: {
        digit: TextConstants.ADDITION_SIGN,
        shortcutKeys: ShortcutKeyConstants.ADDITION_SYMBOL,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.PI, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.PI,
        shortcutKeys: ShortcutKeyConstants.PI,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.ZERO, () =>
    dispatch({
      type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
      payload: {
        digit: TextConstants.NUMBER_KEY_ZERO,
        shortcutKeys: ShortcutKeyConstants.ZERO,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.DECIMAL_POINT, () =>
    dispatch({
      type: ACTIONS.ADD_DECIMAL_POINT,
      payload: {
        shortcutKeys: ShortcutKeyConstants.DECIMAL_POINT,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.EQUALS, () =>
    dispatch({
      type: ACTIONS.CALCULATE,
      payload: {
        digit: TextConstants.EQUALS_SIGN,
        shortcutKeys: ShortcutKeyConstants.EQUALS,
      },
    })
  );

  // --------------------------------------------------

  useKeyboardShortcut(ShortcutKeyConstants.BACKSPACE, () =>
    dispatch({
      type: ACTIONS.DELETE_DIGIT_FROM_DISPLAY,
      payload: {
        shortcutKeys: ShortcutKeyConstants.BACKSPACE,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.COMMA, () =>
    dispatch({
      type: ACTIONS.ADD_DECIMAL_POINT,
      payload: { shortcutKeys: ShortcutKeyConstants.COMMA },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.ENTER, () =>
    dispatch({
      type: ACTIONS.CALCULATE,
      payload: {
        digit: TextConstants.EQUALS_SIGN,
        shortcutKeys: ShortcutKeyConstants.ENTER,
      },
    })
  );

  useKeyboardShortcut(ShortcutKeyConstants.TOGGLE_PAPER_TAPE, () => {
    dispatch({
      type: ACTIONS.TOGGLE_PAPER_TAPE,
      payload: {
        digit: ShortcutKeyConstants.SHORTENED_TOGGLE_PAPER_TAPE,
        shortcutKeys: ShortcutKeyConstants.SHORTENED_TOGGLE_PAPER_TAPE,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.CONTROL_ONE, () => {
    dispatch({
      type: ACTIONS.CHANGE_CALCULATOR_LAYOUT,
      payload: {
        digit: ShortcutKeyConstants.SHORTENED_CONTROL_ONE,
        shortcutKeys: ShortcutKeyConstants.CONTROL_ONE,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.CONTROL_TWO, () => {
    dispatch({
      type: ACTIONS.CHANGE_CALCULATOR_LAYOUT,
      payload: {
        digit: ShortcutKeyConstants.SHORTENED_CONTROL_TWO,
        shortcutKeys: ShortcutKeyConstants.CONTROL_TWO,
      },
    });
  });

  useKeyboardShortcut(ShortcutKeyConstants.CONTROL_THREE, () => {
    dispatch({
      type: ACTIONS.CHANGE_CALCULATOR_LAYOUT,
      payload: {
        digit: ShortcutKeyConstants.SHORTENED_CONTROL_THREE,
        shortcutKeys: ShortcutKeyConstants.CONTROL_THREE,
      },
    });
  });

  return (
    <div>
      <PaperTape rendered={showPaperTape} dispatch={dispatch} />
      <div className="calculator-grid">
        <div className="output">
          <div
            className="previous"
            style={{
              display: DEBUGGING_MODE ? "block" : "none",
              fontSize: "15px",
            }}
          >
            previous="{previous}" operator="{operator}" lastKey="{lastKey}"
            calculationInProgress="{calculationInProgress}" audit="{audit}"
            shortcutKeys="{shortcutKeys}"
          </div>
          <div className="current">{current}</div>
          <div className="measurement">
            {usingRadiansInCalculations ? "Rad" : ""}
          </div>
        </div>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.MONITOR_PARENTHESES,
              payload: { digit: TextConstants.LEFT_PARENTHESIS },
            })
          }
        >
          (
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.MONITOR_PARENTHESES,
              payload: { digit: TextConstants.RIGHT_PARENTHESIS },
            })
          }
        >
          )
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.REMOVE_VALUE_FROM_MEMORY })}
        >
          {TextConstants.MEMORY_CLEAR}
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
              payload: { digit: TextConstants.MEMORY_PLUS },
            })
          }
        >
          {TextConstants.MEMORY_PLUS}
        </button>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
              payload: { digit: TextConstants.MEMORY_MINUS },
            })
          }
        >
          {TextConstants.MEMORY_MINUS}
        </button>
        <button
          className={memory !== "0" ? "selected" : ""}
          onClick={() => dispatch({ type: ACTIONS.RECALL_VALUE_FROM_MEMORY })}
        >
          {TextConstants.MEMORY_RECALL}
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.PERFORM_CLEAR })}>
          {statusOfAllClear ? TextConstants.ALL_CLEAR : TextConstants.CLEAR}
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.CHANGE_THE_SIGN_OF_NUMBER })}
        >
          {TextConstants.NEGATE_DISPLAYED_VALUE_SIGN}
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.COVERT_TO_PERCENTAGE })}
        >
          {TextConstants.PERCENTAGE_SYMBOL}
        </button>
        <OperatorKey
          statusOfKey={operationKeyIsSelected === TextConstants.DIVISION_SIGN}
          dispatch={dispatch}
          operator={TextConstants.DIVISION_SIGN}
        />
        <button
          className={shifted ? "selected" : ""}
          onClick={() => dispatch({ type: ACTIONS.PERFORM_SHIFT })}
        >
          2nd
        </button>

        <ExponentKey
          dispatch={dispatch}
          action={ACTIONS.RAISED_TO_THE_POWER}
          digit={TextConstants.X_SQUARED}
          text={TextConstants.VARIABLE_X}
          exponent={TextConstants.NUMBER_TWO}
        />

        <ExponentKey
          dispatch={dispatch}
          action={ACTIONS.RAISED_TO_THE_POWER}
          digit={TextConstants.X_CUBED}
          text={TextConstants.VARIABLE_X}
          exponent={TextConstants.NUMBER_THREE}
        />

        <ExponentKey
          statusOfKey={
            calculationInProgress === TextConstants.X_RAISED_TO_THE_Y
          }
          dispatch={dispatch}
          action={ACTIONS.RAISED_TO_THE_POWER}
          digit={TextConstants.X_RAISED_TO_THE_Y}
          text={TextConstants.VARIABLE_X}
          exponent={TextConstants.VARIABLE_Y}
        />

        {shifted ? (
          <ExponentKey
            statusOfKey={
              calculationInProgress === TextConstants.Y_RAISED_TO_THE_X
            }
            dispatch={dispatch}
            action={ACTIONS.RAISED_TO_THE_POWER}
            digit={TextConstants.Y_RAISED_TO_THE_X}
            text={TextConstants.VARIABLE_Y}
            exponent={TextConstants.VARIABLE_X}
          />
        ) : (
          <ExponentKey
            dispatch={dispatch}
            action={ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER}
            digit={TextConstants.EULERS_NUMBER_RAISED_TO_THE_X}
            text={TextConstants.EULERS_NUMBER}
            exponent={TextConstants.VARIABLE_X}
          />
        )}

        {shifted ? (
          <ExponentKey
            dispatch={dispatch}
            action={ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER}
            digit={TextConstants.TWO_RAISED_T0_X}
            text={TextConstants.NUMBER_TWO}
            exponent={TextConstants.VARIABLE_X}
          />
        ) : (
          <ExponentKey
            dispatch={dispatch}
            action={ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER}
            digit={TextConstants.TEN_RAISED_T0_X}
            text={TextConstants.NUMBER_TEN}
            exponent={TextConstants.VARIABLE_X}
          />
        )}
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_SEVEN} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_EIGHT} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_NINE} />
        <OperatorKey
          statusOfKey={
            operationKeyIsSelected === TextConstants.MULTIPLICATION_SIGN
          }
          dispatch={dispatch}
          operator={TextConstants.MULTIPLICATION_SIGN}
        />
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.GET_THE_INVERSE_OF_DISPLAYED_NUMBER })
          }
        >
          <sup>{TextConstants.NUMBER_ONE}</sup>/
          <sub>{TextConstants.VARIABLE_X}</sub>
        </button>

        <RadicalKey
          dispatch={dispatch}
          action={ACTIONS.REMOVE_THE_RADICAL}
          digit={TextConstants.SECOND_ROOT_OF_X}
          index={TextConstants.NUMBER_TWO}
        />
        <RadicalKey
          dispatch={dispatch}
          action={ACTIONS.REMOVE_THE_RADICAL}
          digit={TextConstants.THIRD_ROOT_OF_X}
          index={TextConstants.NUMBER_THREE}
        />
        <RadicalKey
          statusOfKey={calculationInProgress === TextConstants.Y_ROOT_OF_X}
          dispatch={dispatch}
          action={ACTIONS.REMOVE_THE_RADICAL}
          digit={TextConstants.Y_ROOT_OF_X}
          index={TextConstants.VARIABLE_Y}
        />

        {shifted ? (
          <LogKey
            statusOfKey={calculationInProgress === TextConstants.LOG_Y}
            dispatch={dispatch}
            digit={TextConstants.LOG_Y}
            base={TextConstants.VARIABLE_Y}
          />
        ) : (
          <LogKey dispatch={dispatch} digit={TextConstants.NATURAL_LOGARITHM} />
        )}

        {shifted ? (
          <LogKey
            dispatch={dispatch}
            digit={TextConstants.BASE_TWO_LOGARITHM}
            base={TextConstants.NUMBER_TWO}
          />
        ) : (
          <LogKey
            dispatch={dispatch}
            digit={TextConstants.BASE_TEN_LOGARITHM}
            base={TextConstants.NUMBER_TEN}
          />
        )}

        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_FOUR} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_FIVE} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_SIX} />
        <OperatorKey
          statusOfKey={
            operationKeyIsSelected === TextConstants.SUBTRACTION_SIGN
          }
          dispatch={dispatch}
          operator={TextConstants.SUBTRACTION_SIGN}
        />
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.GET_FACTORIAL_FOR_GIVEN_VALUE })
          }
        >
          {TextConstants.FACTORIAL_KEY}
        </button>
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.SINE}
        />
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.COSINE}
        />
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.TANGENT}
        />
        <DigitKey dispatch={dispatch} digit={TextConstants.EULERS_NUMBER} />
        <button
          onClick={() => dispatch({ type: ACTIONS.ENTER_EXPONENTIAL_NOTATION })}
        >
          {TextConstants.EXPONENTIAL_NOTATION}
        </button>
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_ONE} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_TWO} />
        <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_THREE} />
        <OperatorKey
          statusOfKey={operationKeyIsSelected === TextConstants.ADDITION_SIGN}
          dispatch={dispatch}
          operator={TextConstants.ADDITION_SIGN}
        />
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.TOGGLE_BETWEEN_DEGREES_AND_RADIANS })
          }
        >
          {usingRadiansInCalculations ? "Deg" : "Rad"}
        </button>
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.HYPERBOLIC_SINE}
        />
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.HYPERBOLIC_COSINE}
        />
        <InverseKey
          dispatch={dispatch}
          shifted={shifted}
          text={TextConstants.HYPERBOLIC_TANGENT}
        />
        <DigitKey dispatch={dispatch} digit={TextConstants.PI} />
        <DigitKey dispatch={dispatch} digit={TextConstants.RANDOM} />
        <DigitKey
          elementHasClass="two-cells"
          dispatch={dispatch}
          digit={TextConstants.NUMBER_KEY_ZERO}
        />
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DECIMAL_POINT })}>
          {TextConstants.DECIMAL_POINT}
        </button>
        <button
          className="operators"
          onClick={() =>
            dispatch({
              type: ACTIONS.CALCULATE,
              payload: { digit: TextConstants.EQUALS_SIGN },
            })
          }
        >
          {TextConstants.EQUALS_SIGN}
        </button>
      </div>
    </div>
  );
}

export default App;
