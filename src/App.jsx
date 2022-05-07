import { useReducer } from "react";

import { DigitKey } from "./components/DigitKey";
import { ExponentKey } from "./components/ExponentKey";
import { InverseKey } from "./components/InverseKey";
import { OperatorKey } from "./components/OperatorKey";
import { LogKey } from "./components/LogKey";
import { SingleExponentKey } from "./components/SingleExponentKey";

import { calculate } from "./helpers/calculate";

import { DEBUGGING_MODE } from "./constants/globals";
import { ACTIONS } from "./constants/actions";
import { RegexConstants } from "./constants/regex";
import { TextConstants } from "./constants/text";

import {
  PI,
  E,
  NOT_IMPLEMENTED_MESSAGE,
  NOT_A_NUMBER_MESSAGE,
} from "./constants/values";

import "./styles.css";

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION:
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
        };
      }

      if (state.current === "0" && payload.digit === "0") {
        return {
          ...state,
          statusOfAllClear: false,
        };
      }

      // EXPONENTIAL NOTATION
      if (
        state.current.match(
          RegexConstants.EXPONENTIAL_FORMAT_ANY_COEFFICIENT_ANY_EXPONENT
        )
      ) {
        const coefficient = state.current.split(" e ")[0];
        const exponent = state.current.split(" e ")[1];

        return {
          ...state,
          current: `${coefficient} e ${exponent.replace(/^0/, "")}${
            payload.digit
          }`,
        };
      }

      if (state.lastKey === TextConstants.EQUALS_SIGN) {
        return {
          ...state,
          current: payload.digit,
          previous: state.current,
          lastKey: null,
          statusOfAllClear: false,
        };
      }

      return {
        ...state,
        current: `${
          state.current && state.current !== "0" ? state.current : ""
        }${payload.digit}`,
      };

    case ACTIONS.ADD_OPERATOR:
      if (state.current !== NOT_A_NUMBER_MESSAGE) {

        // after equals - now operator
        // want current to stay until next key



        const common = {
          current: "0",
          previous: state.current,
          operator: payload.operator,
          statusOfAllClear: false,
          lastKey: payload.operator,
          divisionIsSelected: false,
          multiplicationIsSelected: false,
          subtractionIsSelected: false,
          additionIsSelected: false,
        };

        if (payload.operator === TextConstants.DIVISION_SIGN) {
          return {
            ...state,
            ...common,
            divisionIsSelected: true,
          };
        } else if (payload.operator === TextConstants.MULTIPLICATION_SIGN) {
          return {
            ...state,
            ...common,
            multiplicationIsSelected: true,
          };
        } else if (payload.operator === TextConstants.SUBTRACTION_SIGN) {
          return {
            ...state,
            ...common,
            subtractionIsSelected: true,
          };
        } else if (payload.operator === TextConstants.ADDITION_SIGN) {
          return {
            ...state,
            ...common,
            additionIsSelected: true,
          };
        }
      }

      return {
        ...state,
      };

    case ACTIONS.REMOVE_VALUE_FROM_MEMORY:
      return {
        ...state,
        memory: TextConstants.RESET_VALUE,
      };

    case ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        return {
          ...state,
          memory:
            payload.key === TextConstants.MEMORY_PLUS
              ? `${parseInt(state.memory) + parseInt(state.current)}`
              : `${parseInt(state.memory) - parseInt(state.current)}`,
        };
      }

      return {
        ...state,
      };

    case ACTIONS.RECALL_VALUE_FROM_MEMORY:
      return {
        ...state,
        current: state.memory,
      };

    case ACTIONS.PERFORM_CLEAR:
      if (state.statusOfAllClear === false) {
        return {
          ...state,
          operator: null,
          statusOfAllClear: true,
          divisionIsSelected: false,
          multiplicationIsSelected: false,
          subtractionIsSelected: false,
          additionIsSelected: false,
        };
      }

      return {
        ...state,
        previous: null,
        current: TextConstants.RESET_VALUE,
      };

    case ACTIONS.CHANGE_THE_SIGN_OF_NUMBER:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.current.match(/0.0+/)) {
          return { ...state, current: "0" };
        }

        if (state.current.match(/^-[0-9]+/)) {
          return { ...state, current: state.current.slice(1) };
        }

        return {
          ...state,
          current: `-${state.current}`,
        };
      }

      return {
        ...state,
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
        };
      }

      return {
        ...state,
      };

    case ACTIONS.PERFORM_SHIFT:
      return {
        ...state,
        shifted: !state.shifted,
      };

    case ACTIONS.RAISED_TO_THE_POWER:
      if (payload.key === TextConstants.X_RAISED_TO_THE_SECOND_POWER) {
        return {
          ...state,
          current: parseFloat(state.current) * parseFloat(state.current),
        };
      }

      if (payload.key === TextConstants.X_RAISED_TO_THE_THIRD_POWER) {
        return {
          ...state,
          current:
            parseFloat(state.current) *
            parseFloat(state.current) *
            parseFloat(state.current),
        };
      }
      return {
        state,
      };

    case ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER:
      if (state.current === "0") {
        return {
          ...state,
          current: "1",
        };
      }

      if (state.shifted) {
        return {
          ...state,
          current: Array(state.current - 1)
            .fill(2)
            .reduce((previous, current) => previous * current, 2),
        };
      }

      return {
        ...state,
        current: `1${Array(Number(state.current)).fill("0").join("")}`,
      };

    case ACTIONS.ENTER_EXPONENTIAL_NOTATION:
      return {
        ...state,
        current: `${state.current || "0"} e 0`,
      };

    case ACTIONS.PERFORM_BASE_LOGARITHM:
      if (state.current === "0") {
        return {
          ...state,
          current: NOT_A_NUMBER_MESSAGE,
        };
      }

      return {
        ...state,
        current: NOT_IMPLEMENTED_MESSAGE,
      };

    case ACTIONS.GET_THE_INVERSE_OF_DISPLAYED_NUMBER:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (state.current === "0") {
          return {
            current: NOT_A_NUMBER_MESSAGE,
          };
        }

        return {
          ...state,
          current: 1 / parseInt(state.current),
        };
      }

      return {
        ...state,
      };

    case ACTIONS.GET_FACTORIAL_FOR_GIVEN_VALUE:
      // OVER 102 RETURNS Infinity - OVERRIDING THIS TO RETURN 'NOT A NUMBER'
      if (Number(state.current) < 102) {
        if (state.current === "0") {
          return {
            ...state,
            current: "1",
          };
        }

        // APPLE CALCULATOR DOES NOT HAVE A `+` IN IT'S VERY LARGE VALUES - e159 - not e+159
        return {
          ...state,
          current: [...Array(Number(state.current) + 1).keys()]
            .slice(1)
            .reduce((n, m) => n * m)
            .toString()
            .replace("+", ""),
        };
      }

      return {
        ...state,
        current: NOT_A_NUMBER_MESSAGE,
      };

    case ACTIONS.ADD_DECIMAL_POINT:
      if (
        state.current !== NOT_A_NUMBER_MESSAGE &&
        state.current !== NOT_IMPLEMENTED_MESSAGE
      ) {
        if (
          state.lastKey === TextConstants.PERCENTAGE_SYMBOL ||
          state.current === "0"
        ) {
          return {
            ...state,
            current: "0.",
            lastKey: null,
          };
        }

        if (!state.current.includes(TextConstants.DECIMAL_POINT)) {
          return {
            ...state,
            current: `${state.current}${TextConstants.DECIMAL_POINT}`,
          };
        }
      }

      return {
        ...state,
      };

    case ACTIONS.CALCULATE:
      // WHEN REPEATEDLY PUSHING EQUALS

      const resetOperators = {
        divisionIsSelected: false,
        multiplicationIsSelected: false,
        subtractionIsSelected: false,
        additionIsSelected: false,
      };

      if (
        state.current.match(
          RegexConstants.EXPONENTIAL_FORMAT_NATURAL_COEFFICIENT_WITH_ANY_EXPONENT
        )
      ) {
        return {
          ...state,
          current:
            Array(Number(state.current.split(" e ")[1]))
              .fill(10)
              .reduce((number, memo) => number * memo) *
            Number(state.current.split(" e ")[0]),
          ...resetOperators,
        };
      }

      return {
        ...state,
        current: calculate(state),
        previous: null,
        operator: null,
        lastKey: TextConstants.EQUALS_SIGN,
        ...resetOperators,
      };

    case ACTIONS.NOT_IMPLEMENTED: {
      return {
        ...state,
        current: NOT_IMPLEMENTED_MESSAGE,
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
      shifted,
      calculated,
      lastKey,
      statusOfAllClear,
      divisionIsSelected,
      multiplicationIsSelected,
      subtractionIsSelected,
      additionIsSelected,
    },
    dispatch,
  ] = useReducer(reducer, {
    display: "0",
    current: "0",
    shifted: false,
    memory: "0",
    calculated: false,
    statusOfAllClear: true,
    divisionIsSelected: false,
    multiplicationIsSelected: false,
    subtractionIsSelected: false,
    additionIsSelected: false,
  });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div
          className="previous"
          style={{ display: DEBUGGING_MODE ? "block" : "none" }}
        >
          previous="{previous}" operator="{operator}" lastKey="{lastKey}'"
        </div>
        <div className="current">{current}</div>
      </div>
      <button>(</button>
      <button>)</button>
      <button
        onClick={() => dispatch({ type: ACTIONS.REMOVE_VALUE_FROM_MEMORY })}
      >
        {TextConstants.MEMORY_CLEAR}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
            payload: { key: TextConstants.MEMORY_PLUS },
          })
        }
      >
        {TextConstants.MEMORY_PLUS}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
            payload: { key: TextConstants.MEMORY_MINUS },
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
      <button onClick={() => dispatch({ type: ACTIONS.COVERT_TO_PERCENTAGE })}>
        {TextConstants.PERCENTAGE_SYMBOL}
      </button>
      <OperatorKey
        statusOfKey={divisionIsSelected}
        dispatch={dispatch}
        operator={TextConstants.DIVISION_SIGN}
      />
      <button
        className={shifted ? "selected" : ""}
        onClick={() => dispatch({ type: ACTIONS.PERFORM_SHIFT })}
      >
        2nd
      </button>

      {/*<SingleExponentKey*/}
      {/*  dispatch={dispatch}*/}
      {/*  action={ACTIONS.RAISED_TO_THE_POWER}*/}
      {/*  key={TextConstants.SECOND_POWER}*/}
      {/*  text={TextConstants.VARIABLE_X}*/}
      {/*  exponent={TextConstants.NUMBER_TWO}*/}
      {/*/>*/}

      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.RAISED_TO_THE_POWER,
            payload: { key: TextConstants.SECOND_POWER },
          })
        }
      >
        {TextConstants.VARIABLE_X}
        <sup>{TextConstants.NUMBER_TWO}</sup>
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.RAISED_TO_THE_POWER,
            payload: { key: TextConstants.THIRD_POWER },
          })
        }
      >
        {TextConstants.VARIABLE_X}
        <sup>{TextConstants.NUMBER_THREE}</sup>
      </button>
      <button>
        {TextConstants.VARIABLE_X}
        <sup>{TextConstants.VARIABLE_Y}</sup>
      </button>
      <ExponentKey
        dispatch={dispatch}
        action={ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER}
        shifted={shifted}
        text={[TextConstants.EULERS_NUMBER, TextConstants.VARIABLE_Y]}
        exponent={TextConstants.VARIABLE_X}
      />
      <ExponentKey
        dispatch={dispatch}
        action={ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER}
        shifted={shifted}
        text={[TextConstants.NUMBER_TEN, TextConstants.NUMBER_TWO]}
        exponent={TextConstants.VARIABLE_X}
      />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_SEVEN} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_EIGHT} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_NINE} />
      <OperatorKey
        statusOfKey={multiplicationIsSelected}
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
      <button>
        <sup>{TextConstants.NUMBER_TWO}</sup>
        {TextConstants.RADICAL_X}
      </button>
      <button>
        <sup>{TextConstants.NUMBER_THREE}</sup>
        {TextConstants.RADICAL_X}
      </button>
      <button>
        <sup>{TextConstants.VARIABLE_Y}</sup>
        {TextConstants.RADICAL_X}
      </button>

      {shifted ? (
        <LogKey
          dispatch={dispatch}
          action={ACTIONS.NOT_IMPLEMENTED}
          base={TextConstants.VARIABLE_Y}
        />
      ) : (
        <button>{TextConstants.NATURAL_LOGARITHM}</button>
      )}

      {shifted ? (
        <LogKey
          dispatch={dispatch}
          action={ACTIONS.PERFORM_BASE_LOGARITHM}
          base={TextConstants.NUMBER_TWO}
        />
      ) : (
        <LogKey
          dispatch={dispatch}
          action={ACTIONS.PERFORM_BASE_LOGARITHM}
          base={TextConstants.NUMBER_TEN}
        />
      )}

      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_FOUR} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_FIVE} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_SIX} />
      <OperatorKey
        statusOfKey={subtractionIsSelected}
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
        EE
      </button>
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_ONE} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_TWO} />
      <DigitKey dispatch={dispatch} digit={TextConstants.NUMBER_KEY_THREE} />
      <OperatorKey
        statusOfKey={additionIsSelected}
        dispatch={dispatch}
        operator={TextConstants.ADDITION_SIGN}
      />
      <button>Rad</button>
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
        elementHasClass="span-two"
        dispatch={dispatch}
        digit={TextConstants.NUMBER_KEY_ZERO}
      />
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DECIMAL_POINT })}>
        {TextConstants.DECIMAL_POINT}
      </button>
      <button
        className="operators"
        onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
      >
        {TextConstants.EQUALS_SIGN}
      </button>
    </div>
  );
}

export default App;
