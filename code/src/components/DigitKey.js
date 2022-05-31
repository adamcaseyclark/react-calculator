import { ACTIONS } from "../constants/actions";

export function DigitKey({ elementHasClass, dispatch, digit }) {
  return (
    <button
      className={elementHasClass ? elementHasClass : ""}
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
