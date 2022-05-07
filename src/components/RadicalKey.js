import { ACTIONS } from "../constants/actions";

import "../styles.css";

export function RadicalKey({ dispatch, action, integer, exponent }) {
  return (
    <button onClick={() => dispatch({ type: action, payload: { exponent } })}>
      {integer}
      <sup>{exponent}</sup>
    </button>
  );
}
