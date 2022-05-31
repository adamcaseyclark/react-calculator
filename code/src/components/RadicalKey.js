import { TextConstants } from "../constants/text";

import "../styles.css";

export function RadicalKey({ statusOfKey, dispatch, action, digit, index }) {
  return (
    <button
      className={statusOfKey ? "selected" : ""}
      onClick={() => dispatch({ type: action, payload: { digit } })}
    >
      <sup>{index}</sup>
      {TextConstants.RADICAND_X}
    </button>
  );
}
