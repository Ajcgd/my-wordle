import { useState, createContext } from "react";
import LineState from "../types/lineState";

const GameContext = createContext({});

export const GameContextProvider = ({ children }: any) => {
  const savedValue = localStorage.getItem("gameState")
    ? //@ts-ignore
      JSON.parse(window.localStorage.getItem("gameState"))
    : {
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
      };

  const [gameState, setGameState] = useState(savedValue);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
