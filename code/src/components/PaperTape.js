import React from "react";
import { Rnd } from "react-rnd";

import { ACTIONS } from "../constants/actions";

const styleOfModal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid black",
  background: "white",
  position: "absolute",
  top: "20%",
  left: "30%",
  width: "40%",
  padding: "20px",
  borderRadius: "5px",
};

export const PaperTape = ({ rendered, dispatch }) => (
  <Rnd
    style={{ ...styleOfModal, display: rendered ? "block" : "none" }}
    default={{
      x: 0,
      y: 0,
      width: 260,
      height: 380,
    }}
  >
    <span
      className="close"
      onClick={() =>
        dispatch({
          type: ACTIONS.TOGGLE_PAPER_TAPE,
          payload: { digit: "x" },
        })
      }
    >
      &times;{" "}
    </span>
    <div>
      <div className="modal-header">Paper Tape</div>
      <div className="modal-content">{}</div>
      <button>clear</button>
    </div>
  </Rnd>
);
