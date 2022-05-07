import { ACTIONS } from "../App";

import "../styles.css";

export function ExponentButton({ dispatch, action, shifted, text, exponent }) {
  if (shifted) {
    return (
      <button
        onClick={() =>
          dispatch({
            type: action,
          })
        }
      >
        {Array.isArray(text) ? text[1] : text}
        {<sup>{Array.isArray(exponent) ? exponent[1] : exponent}</sup>}
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        dispatch({
          type: action,
        })
      }
    >
      {Array.isArray(text) ? text[0] : text}
      {<sup>{Array.isArray(text) ? exponent[0] : exponent}</sup>}
    </button>
  );
}
