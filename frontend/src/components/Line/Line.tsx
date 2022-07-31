import "./Line.css";

import LineState from "../../types/lineState";

import { FC, useEffect, useState } from "react";
import { LetterBox } from "../LetterBox/LetterBox";
import Hints from "../../types/hints";

interface LineProps {
  size: number;
  active: LineState;
  word: string[];
  chars: string[];
  occurences: any;
  setVictory: any;
}

export const Line: FC<LineProps> = (props: LineProps) => {
  const [x, setX] = useState(Array(+props.size).fill(Hints.MISS));
  useEffect(() => {
    if (props.active === LineState.FILLED) {
      const hints: Hints[] = Array(+props.size).fill(Hints.MISS);
      const seen: any = {};
      let victory = true;
      for (let index = 0; index < props.word.length; index++) {
        if (props.chars[index] === props.word[index]) {
          hints[index] = Hints.HIT;
          seen[props.word[index]] = seen[props.word[index]]
            ? seen[props.word[index]] + 1
            : 1;
        }
      }
      for (let index = 0; index < props.word.length; index++) {
        if (hints[index] === Hints.HIT) {
          continue;
        }
        victory = false;
        if (
          props.chars.includes(props.word[index]) &&
          (seen[props.word[index]] == null ||
            seen[props.word[index]] < props.occurences[props.word[index]])
        ) {
          hints[index] = Hints.CLOSE;
        } else {
          hints[index] = Hints.MISS;
        }

        seen[props.word[index]] = seen[props.word[index]]
          ? seen[props.word[index]] + 1
          : 1;
      }
      setX(hints);
      props.setVictory(victory);
    }
  }, [props.active]);

  return (
    <div className="line-container">
      {[...Array(+props.size).keys()].map((i) => {
        return (
          <LetterBox
            state={props.active}
            letter={props.word && props.word[i] != null ? props.word[i] : ""}
            hint={x[i]}
          />
        );
      })}
    </div>
  );
};

export default Line;
