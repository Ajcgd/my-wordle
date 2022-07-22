import "./Line.css";

import LineState from "../../types/lineState";

import { FC, useEffect, useState } from "react"
import {LetterBox} from "../LetterBox/LetterBox";
import Hints from "../../types/hints";


interface LineProps {
    size: number,
    active: LineState,
    word: string[],
    chars: string[]
}


export const Line:FC<LineProps> = (props: LineProps) => {
    const [x, setX] = useState(Array(+props.size).fill(Hints.MISS));
    useEffect(() => {
        if (props.active === LineState.FILLED) {
            const hints:Hints[] = Array(+props.size).fill(Hints.MISS);
            const occurences:any = {};
            const seen:any = {}
            props.chars.forEach(element => {
                occurences[element] = occurences[element] ? occurences[element] + 1 : 1;
            });
            for (let index = 0; index < props.word.length; index++) {
                if (props.chars[index] === props.word[index]) {
                    hints[index] = Hints.HIT
                }
                else if (
                  props.chars.includes(props.word[index]) &&
                  (seen[props.word[index]] == null ||
                    seen[props.word[index]] < occurences[props.word[index]])
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
        }
    }, [props.active])

    return (
        <div className="line-container">
            {[...Array(+props.size).keys()].map((i) => {
                return (<LetterBox state={props.active} letter={props.word && props.word[i] != null ? props.word[i] : ""} hint={x[i]}/>);

                })}
        </div>
    )
}

export default Line