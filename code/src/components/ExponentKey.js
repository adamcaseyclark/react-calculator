import "../styles.css";

export function ExponentKey({
  statusOfKey,
  dispatch,
  action,
  digit,
  text,
  exponent,
  superscript,
}) {
  return (
    <button
      className={statusOfKey ? "selected" : ""}
      onClick={() =>
        dispatch({
          type: action,
          payload: { digit },
        })
      }
    >
      {text}
      {superscript ? superscript : <sup>{exponent}</sup>}
    </button>
  );
}
