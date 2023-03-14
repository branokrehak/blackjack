import React, { useRef, useState, createContext } from "react";

export const MoveCardContext = createContext({});

export const MoveCardProvider = ({ children }) => {
  const [cardTranslateY, setCardTranslateY] = useState(0);
  const [cardTranslateX, setCardTranslateX] = useState(0);
  const [moveCardTimeout, setMoveCardTimeout] = useState(0);
  
  const cardDefaultDuration = 700;

  const cardRefBase = useRef(null);
  const cardRefDestinationPlayer = useRef(null);
  const cardRefDestinationOpponent = useRef(null);
  const cardRefInsideContainer = useRef(null);

  const moveCard = (playerTurn) => {
    const cardBaseDistance = cardRefBase.current.getBoundingClientRect();
    const cardInsideContainer = cardRefInsideContainer.current.getBoundingClientRect();
    const cardDestinationPlayer = cardRefDestinationPlayer.current.getBoundingClientRect();
    const cardDestinationOpponent = cardRefDestinationOpponent.current.getBoundingClientRect();
  
    playerTurn && setCardTranslateY(cardDestinationPlayer.y - cardBaseDistance.y + ((cardDestinationPlayer.height - cardBaseDistance.height) / 2));
    !playerTurn && setCardTranslateX((cardDestinationOpponent.x - cardBaseDistance.x) + ((cardDestinationOpponent.width - cardInsideContainer.width) / 2));
    setMoveCardTimeout(cardDefaultDuration - 200);
    
    setTimeout(() => {
      playerTurn && setCardTranslateY(0);
      !playerTurn && setCardTranslateX(0);
      setMoveCardTimeout(0);
    }, cardDefaultDuration);
  };

  return (
    <MoveCardContext.Provider value={{
      cardTranslateY,
      cardTranslateX,
      moveCardTimeout,
      cardDefaultDuration,
      cardRefBase,
      cardRefDestinationPlayer,
      cardRefDestinationOpponent,
      cardRefInsideContainer,
      moveCard,
    }}>{children}
    </MoveCardContext.Provider>
  );
};
