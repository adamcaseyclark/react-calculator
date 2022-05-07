import "../styles.css";
// import {ACTIONS} from "../constants/actions";
//
// dispatch({ type: ACTIONS.ADD_OPERATOR, payload: { operator } })

{/*<SingleExponentKey*/}
{/*  dispatch={dispatch}*/}
{/*  action={ACTIONS.RAISED_TO_THE_POWER}*/}
{/*  key={TextConstants.SECOND_POWER}*/}
{/*  text={TextConstants.VARIABLE_X}*/}
{/*  exponent={TextConstants.NUMBER_TWO}*/}
{/*/>*/}

export function SingleExponentKey({ dispatch, action, key, text, exponent }) {
  return (
    <button
      onClick={() =>
        dispatch({
          type: action,
          payload: { key },
        })
      }
    >
      {text}
      <sup>{exponent}</sup>
    </button>
  );
}
