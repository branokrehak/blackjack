import React, { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from "react";
import { cardArray, getArraySum, shuffleArray } from '../utilities';
import { MoveCardContext } from './MoveCardProvider';

export const CardArrayContext = createContext({});

export function CardArrayProvider({ children }) {
  const [deck, setDeck] = useState(cardArray);
  const [playerCardArr, setPlayerCardArr] = useState([]);
  const [opponentCardArr, setOpponentCardArr] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [playerEndedGame, setPlayerEndedGame] = useState(false);
  
  const { cardDefaultDuration } = useContext(MoveCardContext);
  
  const playerSum = useMemo(() => getArraySum(playerCardArr), [playerCardArr]);
  const opponentSum = useMemo(() => getArraySum(opponentCardArr), [opponentCardArr]);
  
  const fullDeckLength = cardArray.length;

  const resetGame = () => {
    setDeck(cardArray);
    setPlayerCardArr([]);
    setOpponentCardArr([]);
    setPlayerEndedGame(false);
    setBtnDisabled(false);
    setDeck(array => shuffleArray(array));
  };
  
  const giveCard = (playerTurn, startingCards) => {
    const changeIndex = fullDeckLength - (fullDeckLength - (playerTurn ? playerCardArr.length : opponentCardArr.length));

    playerTurn && setBtnDisabled(prevValaue => !prevValaue);

    setTimeout(() => {
      setDeck(cardArray => {
        if (playerTurn) {
          setPlayerCardArr(prevArray => addItemToArray(prevArray));
          setBtnDisabled(prevValaue => !prevValaue);
        } else {
          setOpponentCardArr(prevArray => addItemToArray(prevArray));
        };
        
        const addItemToArray = (array) => {
          return [...array, {...cardArray[0], zIndex: changeIndex}];
        };
        
        return cardArray.filter(item => item.id !== cardArray[0].id);
      });
    }, startingCards ? 0 : cardDefaultDuration);
  };

  useEffect(() => {
    if (playerSum >= 21 || playerEndedGame) {
      setPlayerEndedGame(true);
      setBtnDisabled(true);
    };
  }, [playerSum, playerEndedGame]);
  
  return (
    <CardArrayContext.Provider value={{ 
      deck, 
      playerCardArr,
      opponentCardArr,
      btnDisabled,
      playerSum,
      opponentSum,
      playerEndedGame,
      setPlayerEndedGame,
      resetGame,
      setDeck,
      giveCard,
    }}>{children}
    </CardArrayContext.Provider>
  );
};


