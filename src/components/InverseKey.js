import { ACTIONS } from "../App";

import "../styles.css";

export function InverseButton({ dispatch, shifted, text }) {
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
