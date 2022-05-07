import "../styles.css";

export function LogKey({ dispatch, action, base }) {
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
