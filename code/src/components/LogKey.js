import { ACTIONS } from "../constants/actions";

import "../styles.css";

export function LogKey({ statusOfKey, dispatch, digit, base }) {
  return (
    <button
      className={statusOfKey ? "selected" : ""}
      onClick={() =>
        dispatch({
          type: ACTIONS.PERFORM_BASE_LOGARITHM,
          payload: { digit },
        })
      }
    >
      {!base ? digit : "log"}
      {<sub>{base ? base : null}</sub>}
    </button>
  );
}
