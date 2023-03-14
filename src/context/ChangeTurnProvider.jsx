import React, { useEffect, useState, useContext, createContext } from "react";
import { CardArrayContext } from './CardArrayProvider';
import { MoveCardContext } from "./MoveCardProvider";

export const ChangeTurnContext = createContext({});

export function ChangeTurnProvider({ children }) {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [newGameTab, setNewGameTab] = useState(true);
  const [whoWon, setWhoWon] = useState(null);

  const { playerSum, opponentSum, playerEndedGame, giveCard, playerCardArr, opponentCardArr } = useContext(CardArrayContext);
  const { moveCard } = useContext(MoveCardContext);

  useEffect(() => {
    if (playerEndedGame) setPlayerTurn(false);
    else {setPlayerTurn(true)};

    setPlayerTurn(() => {
      if (playerEndedGame) return false; 
      else return true;
    });
  }, [playerEndedGame]);

  useEffect(() => {
    if ((opponentSum < 17 || playerSum > opponentSum && playerSum <= 21) && playerEndedGame) {
      setTimeout(() => {
        giveCard(playerTurn);
        moveCard(playerTurn);
      }, 500);
    } else if (playerEndedGame) {
      setTimeout(() => {
        setWhoWon(() => {
          if ((opponentSum > playerSum || playerSum > 21) && opponentSum <= 21) return 'opponent';
          else if ((opponentSum < playerSum || opponentSum > 21) && playerSum <= 21) return 'player';
          else if (opponentSum === playerSum && opponentSum <= 21) return 'draw';
          else if (opponentSum > 21 && playerSum > 21) return 'noone';
          else return null;
        });

        setGameEnd(true);
      }, 2000);
    };
  }, [opponentSum, playerTurn]);

  useEffect(() => {
    if (!newGameTab) {
      if (playerCardArr.length < 2) giveCard(true, true);
      if (opponentCardArr.length < 2) giveCard(false, true);
    };
  }, [playerCardArr, opponentCardArr]);

  return (
    <ChangeTurnContext.Provider value={{
      playerTurn,
      gameEnd,
      whoWon,
      newGameTab,
      setNewGameTab,
      setPlayerTurn,
      setGameEnd,
    }}>{children}
    </ChangeTurnContext.Provider>
  );
};