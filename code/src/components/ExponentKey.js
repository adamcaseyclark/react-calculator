import "../styles.css";

export function ExponentKey({
  statusOfKey,
  dispatch,
  action,
  digit,
  text,
  exponent,
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
      <sup>{exponent}</sup>
    </button>
  );
}
