import { ACTIONS } from "../constants/actions";

export function DigitKey({ elementHasClass, dispatch, digit }) {
  if (elementHasClass) {
    return (
      <button
        className={elementHasClass}
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
            payload: { digit },
          })
        }
      >
        {digit}
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.ADD_DIGIT_OR_PERFORM_ACTION,
          payload: { digit },
        })
      }
    >
      {digit}
    </button>
  );
}
