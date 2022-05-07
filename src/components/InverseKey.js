import { ACTIONS } from "../constants/actions";

import "../styles.css";

export function InverseKey({ dispatch, shifted, text }) {
  if (shifted) {
    return (
      <button
        className="smaller-text"
        onClick={() =>
          dispatch({
            type: ACTIONS.NOT_IMPLEMENTED,
          })
        }
      >
        {text}
        {<sup>-1</sup>}
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.NOT_IMPLEMENTED,
        })
      }
    >
      {text}
    </button>
  );
}
