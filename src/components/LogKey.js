import "../styles.css";

export function SingleLogKey({ dispatch, action, base }) {
  return (
    <button
      onClick={() =>
        dispatch({
          type: action,
        })
      }
    >
      log
      {<sub>{base}</sub>}
    </button>
  );
}
