import "./Game.css";

import {Line} from "../Line/Line";

import LineState from "../../types/lineState";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";

const Game = (props:any) => {
    //@ts-ignore
    const { gameState, setGameState } = useContext(GameContext);
    const [victory, setVictory] = useState(false);

    const targetWord = "autos";
    const chars = [...targetWord]

    const occurences: any = {};

    useEffect(() => {
      localStorage.setItem("gameState", JSON.stringify(gameState));
    }, [gameState]);

    const reset = () => {
      setGameState({
        line: 0,
        letter: 0,
        states: [
          LineState.ACTIVE,
          LineState.EMPTY,
          LineState.EMPTY,
          LineState.EMPTY,
          LineState.EMPTY,
          LineState.EMPTY,
        ],
        words: [],
      });
      setVictory(false);
      localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    useEffect(() => {
      for (var i = 0; i < targetWord.length; i++) {
        const char = targetWord[i];
        occurences[char] = occurences[char] ? occurences[char] + 1 : 1;
      }
    }, [])

    useEffect(() => {
      if (victory) {
        setTimeout(() => {
          alert("You won!");
          reset();
        }, 1500)
      }
    }, [victory])

    useEffect(() => {
      if (!victory && gameState.line === gameState.states.length) {
        setTimeout(() => {
          alert("You lost!");
          reset();
        }, 1500);
      }
    }, [gameState.line])


    useEffect(() => {
      const keyDownHandler = (event: any) => {
        if (event.key === "Backspace") {
          setGameState({
            ...gameState,
            letter: Math.max(gameState.letter - 1, 0),
          });
          gameState.words[gameState.line].pop();
        } else if (event.key === "Enter") {
          if (gameState.letter === +props.size) {
            gameState.states[gameState.line] = LineState.FILLED;
            if (gameState.line !== gameState.states.length - 1) {
              gameState.states[gameState.line + 1] = LineState.ACTIVE;
            }
            setGameState({
              ...gameState,
              letter: 0,
              line: gameState.line + 1,
            });
          }
        }
        if (event.key.match(/^[a-zA-ZÀ-ž]$/g)) {
          if (gameState.letter !== +props.size) {
            setGameState({
              ...gameState,
              letter: gameState.letter + 1,
            });
            if (!gameState.words[gameState.line]) {
              gameState.words[gameState.line] = [];
            }
            gameState.words[gameState.line].push(event.key);
          }
        }
      };
      document.addEventListener("keydown", keyDownHandler);

      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }, [gameState.line, gameState.letter, gameState.words]);


    return (
      <div className="game-container">
        {[...Array(6).keys()].map((i) => {
          return (
            <Line
              size={props.size}
              active={gameState.states[i]}
              word={gameState.words[i]}
              key={i}
              chars={chars}
              occurences={occurences}
              setVictory={setVictory}
            />
          );
        })}
      </div>
    );
}

export default Game