import { useReducer } from "react";

import { AddDigitButton } from "./components/AddDigitButton";
import { AddOperationButton } from "./components/AddOperationButton";
import { RenderHtml } from "./components/RenderHtml";

import { ElementTextConstants } from "./constants/element-text";

import "./styles.css";

const E = "2.718281828459045";
const PI = "3.141592653589793";

const NOT_A_NUMBER = "Not a number";

export const ACTIONS = {
  ADD_DIGIT_OR_PERFORM_ACTION: "ADD_DIGIT_OR_PERFORM_ACTION", // ALL NUMBERS
  ADD_OPERATOR: "ADD_OPERATOR", // DIVISION, MULTIPLICATION, SUBTRACTION, ADDITION
  GET_SPECIFIED_NUMBER: "GET_SPECIFIED_NUMBER", // PI, E

  // ROW ONE KEYS
  ADD_RIGHT_PARENTHESIS: "ADD_RIGHT_PARENTHESIS",
  ADD_LEFT_PARENTHESIS: "ADD_LEFT_PARENTHESIS",
  REMOVE_VALUE_FROM_MEMORY: "REMOVE_VALUE_FROM_MEMORY",
  ADD_OR_MODIFY_MEMORY_VALUE: "ADD_OR_MODIFY_MEMORY_VALUE", // m+, m-
  RECALL_VALUE_FROM_MEMORY: "RECALL_VALUE_FROM_MEMORY",
  PERFORM_ALL_CLEAR: "PERFORM_ALL_CLEAR", // AC & C
  PERFORM_CLEAR: "PERFORM_CLEAR", // AC & C
  CHANGE_THE_SIGN_OF_NUMBER: "CHANGE_THE_SIGN_OF_NUMBER",
  COVERT_TO_PERCENTAGE: "COVERT_TO_PERCENTAGE",
  // DIVISION

  // ROW TWO KEYS
  PERFORM_SHIFT: "PERFORM_SHIFT",
  RAISED_TO_THE_POWER: "RAISED_TO_THE_POWER", // SQUARED, CUBED
  // ??
  NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER:
    "NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER", // 2 & 10
  // 7, 8, 9
  // MULTIPLICATION

  // ROW THREE KEYS
  GET_THE_INVERSE_OF_DISPLAYED_NUMBER: "GET_THE_INVERSE_OF_DISPLAYED_NUMBER",

  PERFORM_BASE_LOGARITHM: "PERFORM_BASE_LOGARITHM",
  // 4, 5, 6

  // ROW FOUR KEYS
  GET_FACTORIAL_FOR_GIVEN_VALUE: "GET_FACTORIAL_FOR_GIVEN_VALUE",
  // SIN, COS, TAN, E
  ENTER_EXPONENTIAL_NOTATION: "ENTER_EXPONENTIAL_NOTATION",
  // 1, 2, 3 KEYS
  // ADDITION KEY

  // ROW FIVE KEYS
  // RAD KEY, SINH KEY, COSH KEY, TANH KEY, PI KEY (HANDLED ABOVE),
  GET_RANDOM_NUMBER: "GET_RANDOM_NUMBER",
  // 0 KEY, DECIMAL (HANDLED ABOVE)
  CALCULATE: "CALCULATE",

  DELETE_DIGIT: "DELETE_DIGIT",
};

function calculate({ current, previous, operator }) {
  const currentAsANumber = parseFloat(current);
  const previousAsANumber = parseFloat(previous);

  let calculation = "";

  switch (operator) {
    case ElementTextConstants.DIVISION_SIGN:
      calculation = previousAsANumber / currentAsANumber;
      break;
    case ElementTextConstants.MULTIPLICATION_SIGN:
      calculation = previousAsANumber * currentAsANumber;
      break;
    case ElementTextConstants.SUBTRACTION_SIGN:
      calculation = previousAsANumber - currentAsANumber;
      break;
    case ElementTextConstants.ADDITION_SIGN:
      calculation = previousAsANumber + currentAsANumber;
      break;
  }
  return calculation.toString();
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION:
      if (
        !payload.digit.match(/[0-9]/) &&
        payload.digit !== "EE" &&
        payload.digit !== "."
      ) {
        return {
          ...state,
          current:
            payload.digit === "Rand"
              ? Math.random()
              : payload.digit === "e"
              ? E
              : PI,
        };
      }

      if (payload.digit === "." && state.current.includes(".")) {
        return {
          current: state.current,
        };
      } else if (payload.digit === "." && state.current === "0") {
        return {
          current: "0.",
        };
      }

      if (payload.digit === "EE") {
        return {
          current: `${state.current || "0"} e 0`,
        };
      }

      if (state.current === "0" && payload.digit === "0") {
        return {
          ...state,
        };
      }

      if (state.current === NOT_A_NUMBER) {
        return {
          current: payload.digit,
        };
      }

      return {
        ...state,
        current: `${
          state.current && state.current !== "0" ? state.current : ""
        }${payload.digit}`,
      };

    case ACTIONS.ADD_OPERATOR:
      if (state.current !== NOT_A_NUMBER) {
        return {
          ...state,
          current: "0",
          previous: state.current,
          operator: payload.operator,
          saved: true,
        };
      }

      return {
        ...state,
        current: "0",
        previous: state.current,
        operator: payload.operator,
        saved: true,
      };

    case ACTIONS.REMOVE_VALUE_FROM_MEMORY:
      return {
        ...state,
        memory: "0",
      };

    case ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE:
      return {
        ...state,
        memory:
          payload.key === ElementTextConstants.MEMORY_PLUS
            ? `${parseInt(state.memory) + parseInt(state.current)}`
            : `${parseInt(state.memory) - parseInt(state.current)}`,
      };

    case ACTIONS.RECALL_VALUE_FROM_MEMORY:
      return {
        ...state,
        current: state.memory,
      };

    case ACTIONS.PERFORM_ALL_CLEAR:
      if (state.saved) {
        return {
          ...state,
          current: "0",
          previous: null,
          saved: false,
        };
      }

      return { ...state, current: 0 };

    case ACTIONS.PERFORM_CLEAR:
      if (state.saved) {
        return {
          ...state,
          current: state.previous,
          previous: null,
          saved: false,
        };
      }

      return { ...state, current: 0 };

    case ACTIONS.CHANGE_THE_SIGN_OF_NUMBER:
      if (state.current.match(/0.0+/)) {
        return { current: 0 };
      }

      if (state.current.match(/^-[0-9]+/)) {
        return { current: state.current.slice(1) };
      }

      return {
        current: `-${state.current}`,
      };

    case ACTIONS.COVERT_TO_PERCENTAGE:
      if (state.current !== NOT_A_NUMBER) {
        if (state.current.length <= 2) {
          return {
            ...state,
            current: `0.${
              state.current.length === 1
                ? `0${state.current}`
                : `${state.current}`
            }`,
          };
        }

        if (!state.current.includes(".")) {
          return {
            ...state,
            current: `${state.current.slice(0, -2)}.${state.current.slice(-2)}`,
          };
        }
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
      if (payload.key === "x^2") {
        return {
          ...state,
          current: parseFloat(state.current) * parseFloat(state.current),
        };
      }

      if (payload.key === "x^3") {
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
      if (state.current === null) {
        return {
          current: `0 e 0`,
        };
      }
      break;

    case ACTIONS.PERFORM_BASE_LOGARITHM:
      if (state.current === 0) {
        return {
          current: NOT_A_NUMBER,
        };
      }

      return {
        state,
      };

    case ACTIONS.GET_THE_INVERSE_OF_DISPLAYED_NUMBER:
      if (state.current === 0 || state.current === NOT_A_NUMBER) {
        return {
          current: NOT_A_NUMBER,
        };
      }

      return {
        ...state,
        current: 1 / parseInt(state.current),
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
        current: NOT_A_NUMBER,
      };

    case ACTIONS.CALCULATE:
      // WHEN REPEATEDLY PUSHING EQUALS

      return {
        ...state,
        current: calculate(state),
        previous: state.current,
      };
  }
}

function App() {
  const [{ current, previous, operation, memory, shifted, saved }, dispatch] =
    useReducer(reducer, {
      current: "0",
      shifted: false,
      memory: "0",
    });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous">
          {previous} {operation}
        </div>
        <div className="current">{current}</div>
      </div>
      <button>(</button>
      <button>)</button>
      <button
        onClick={() => dispatch({ type: ACTIONS.REMOVE_VALUE_FROM_MEMORY })}
      >
        {ElementTextConstants.MEMORY_CLEAR}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
            payload: { key: ElementTextConstants.MEMORY_PLUS },
          })
        }
      >
        {ElementTextConstants.MEMORY_PLUS}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_OR_MODIFY_MEMORY_VALUE,
            payload: { key: ElementTextConstants.MEMORY_MINUS },
          })
        }
      >
        {ElementTextConstants.MEMORY_MINUS}
      </button>
      <button
        className={memory !== "0" ? "selected" : ""}
        onClick={() => dispatch({ type: ACTIONS.RECALL_VALUE_FROM_MEMORY })}
      >
        {ElementTextConstants.MEMORY_RECALL}
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.PERFORM_ALL_CLEAR })}>
        {saved ? ElementTextConstants.CLEAR : ElementTextConstants.ALL_CLEAR}
      </button>
      <button
        onClick={() => dispatch({ type: ACTIONS.CHANGE_THE_SIGN_OF_NUMBER })}
      >
        +/-
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.COVERT_TO_PERCENTAGE })}>
        %
      </button>
      <AddOperationButton
        dispatch={dispatch}
        operator={ElementTextConstants.DIVISION_SIGN}
      />
      <button
        className={shifted ? "selected" : ""}
        onClick={() => dispatch({ type: ACTIONS.PERFORM_SHIFT })}
      >
        2nd
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.RAISED_TO_THE_POWER,
            payload: { key: "x^2" },
          })
        }
      >
        x<sup>2</sup>
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.RAISED_TO_THE_POWER,
            payload: { key: "x^3" },
          })
        }
      >
        x<sup>3</sup>
      </button>
      <button>
        x<sup>y</sup>
      </button>
      <button>
        {shifted
          ? ElementTextConstants.RAISE_THE_NEXT_VALUE_ENTERED_TO_THE_POWER_OF_THE_DISPLAYED_VALUE
          : ElementTextConstants.E_TO_THE_POWER_OF_THE_NEXT_ENTERED_VALUE}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.NUMBER_RAISED_T0_THE_POWER_OF_THE_DISPLAYED_NUMBER,
          })
        }
      >
        {shifted
          ? ElementTextConstants.TWO_TO_THE_POWER_OF_THE_NEXT_ENTERED_VALUE
          : ElementTextConstants.TEN_TO_THE_POWER_OF_THE_NEXT_ENTERED_VALUE}
      </button>
      <AddDigitButton dispatch={dispatch} digit="7" />
      <AddDigitButton dispatch={dispatch} digit="8" />
      <AddDigitButton dispatch={dispatch} digit="9" />
      <AddOperationButton
        dispatch={dispatch}
        operator={ElementTextConstants.MULTIPLICATION_SIGN}
      />
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.GET_THE_INVERSE_OF_DISPLAYED_NUMBER })
        }
      >
        <sup>1</sup>/<sub>x</sub>
      </button>
      <button>
        <sup>2</sup>√x
      </button>
      <button>
        <sup>3</sup>√x
      </button>
      <button>
        <sup>y</sup>√x
      </button>
      <button>
        {shifted
          ? ElementTextConstants.LOG_OF_THE_DISPLAYED_VALUE_WITH_THE_BASE_OF_THE_NEXT_VALUE
          : ElementTextConstants.NATURAL_LOGARITHM}
      </button>
      <button
        onClick={() => dispatch({ type: ACTIONS.PERFORM_BASE_LOGARITHM })}
      >
        {shifted ? "log<sub>2</sub>" : "log<sub>10</sub>"}
      </button>
      <AddDigitButton dispatch={dispatch} digit="4" />
      <AddDigitButton dispatch={dispatch} digit="5" />
      <AddDigitButton dispatch={dispatch} digit="6" />
      <AddOperationButton
        dispatch={dispatch}
        operator={ElementTextConstants.SUBTRACTION_SIGN}
      />
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.GET_FACTORIAL_FOR_GIVEN_VALUE })
        }
      >
        x!
      </button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_SINE
          : ElementTextConstants.SINE}
      </button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_COSINE
          : ElementTextConstants.COSINE}
      </button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_TANGENT
          : ElementTextConstants.TANGENT}
      </button>
      <AddDigitButton dispatch={dispatch} digit="e" />
      <AddDigitButton dispatch={dispatch} digit="EE" />
      <AddDigitButton dispatch={dispatch} digit="1" />
      <AddDigitButton dispatch={dispatch} digit="2" />
      <AddDigitButton dispatch={dispatch} digit="3" />
      <AddOperationButton
        dispatch={dispatch}
        operator={ElementTextConstants.ADDITION_SIGN}
      />
      <button>Rad</button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_HYPERBOLIC_SINE
          : ElementTextConstants.HYPERBOLIC_SINE}
      </button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_HYPERBOLIC_COSINE
          : ElementTextConstants.HYPERBOLIC_COSINE}
      </button>
      <button>
        {shifted
          ? ElementTextConstants.INVERSE_HYPERBOLIC_TANGENT
          : ElementTextConstants.HYPERBOLIC_TANGENT}
      </button>
      <AddDigitButton dispatch={dispatch} digit="π" />
      <AddDigitButton dispatch={dispatch} digit="Rand" />
      <AddDigitButton
        elementHasClass="span-two"
        dispatch={dispatch}
        digit="0"
      />
      <AddDigitButton dispatch={dispatch} digit="." />
      <button
        className="operators"
        onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
      >
        {ElementTextConstants.EQUALS_SIGN}
      </button>
    </div>
  );
}

export default App;
