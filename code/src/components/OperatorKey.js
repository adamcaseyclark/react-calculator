import { ACTIONS } from "../constants/actions";

import "../styles.css";

export function OperatorKey({ statusOfKey, dispatch, operator }) {
  return (
    <button
      className={statusOfKey ? "op-select" : "operators"}
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATOR, payload: { digit: operator } })
      }
    >
      {operator}
    </button>
  );
}
