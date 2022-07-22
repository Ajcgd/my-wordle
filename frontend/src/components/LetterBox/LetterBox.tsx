import "./LetterBox.css"

import LineState from "../../types/lineState"
import Hints from "../../types/hints";

export const LetterBox = (props:any) => {
    if (props.state === LineState.FILLED) {
    console.log(props)
    }
      return (
        <button
          className={`
            box 
            ${props.state === LineState.ACTIVE ? "active" : "inactive"}
            ${
              props.state === LineState.FILLED
                ? props.hint === Hints.HIT
                  ? "hit"
                  : props.hint === Hints.CLOSE
                  ? "close"
                  : ""
                : ""
            }
            ${props.state === LineState.FILLED ? "flip" : ""}
            `}
          type="button"
        >
          <span className={`box-letter`}>{props.letter}</span>
        </button>
      );
}

export default LetterBox