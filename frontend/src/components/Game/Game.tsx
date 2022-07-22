import "./Game.css";

import {Line} from "../Line/Line";

import LineState from "../../types/lineState";
import { useEffect, useState } from "react";

const words:string[][] = [];

const states: LineState[] = [LineState.ACTIVE, LineState.EMPTY, LineState.EMPTY, LineState.EMPTY, LineState.EMPTY, LineState.EMPTY];

const Game = (props:any) => {
    const [currLine, setCurrline] = useState(0);
    const [currLetter, setCurrLetter] = useState(0);

    const targetWord = "autos";
    const chars = [...targetWord]


    useEffect (() => {
        const keyDownHandler = (event:any) => {
            if (event.key === "Backspace") {
                setCurrLetter(Math.max(currLetter - 1, 0));
                words[currLine].pop();
            }
            else if (event.key === "Enter") {
                if (currLetter === +props.size) {
                    states[currLine] = LineState.FILLED;
                    states[currLine + 1] = LineState.ACTIVE;
                    setCurrline(currLine + 1);
                    setCurrLetter(0);
                }
            }
            if (event.key.match(/^[a-zA-ZÀ-ž]$/g)) {
                if (currLetter !== +props.size) {
                  setCurrLetter(currLetter + 1);
                  if (! words[currLine]) {
                    words[currLine] = [];
                  }
                  words[currLine].push(event.key);
                }
            }
        }
        document.addEventListener("keydown", keyDownHandler);


        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        }
    }, [currLine, currLetter, words])


    return (
        <div className="game-container">
          {[...Array(6).keys()].map((i) => {
            return (
              <Line
                size={props.size}
                active={states[i]}
                word={words[i]}
                key={i}
                chars={chars}
              />
            );
          })}
      </div>
    );
}

export default Game