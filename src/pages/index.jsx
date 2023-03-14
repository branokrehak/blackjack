import React, { useContext } from "react";
import { CardArrayContext } from '../context/CardArrayProvider';
import { MoveCardContext } from '../context/MoveCardProvider';
import { Button, DisplayArray, SummaryTab, StartGameTab, AddMoneyTab } from '../components/index';
import { ChangeTurnContext } from "../context/ChangeTurnProvider";
import { BetAmmountContext } from "../context/BetAmmountProvider";

export default function Index() {
  const { giveCard, deck, playerCardArr, opponentCardArr, setPlayerEndedGame, playerSum, playerEndedGame } = useContext(CardArrayContext);
  const { cardTranslateY, cardTranslateX, moveCardTimeout, moveCard, cardRefBase, cardRefDestinationPlayer, cardRefDestinationOpponent, cardRefInsideContainer } = useContext(MoveCardContext);
  const { playerTurn, gameEnd, newGameTab } = useContext(ChangeTurnContext);
  const { enableMoneyTab } = useContext(BetAmmountContext);

  return (
    <section id="main">
      {gameEnd && <SummaryTab />}
      {newGameTab && <StartGameTab />}
      {enableMoneyTab && <AddMoneyTab />}

      <div className={`container content ${gameEnd || newGameTab ? `blurred-background` : ''}`}>
        <div className="items">
          <div className="row">
            <div className="col-2">
              <div className="card-pile">
                <div className="content">
                  <img src="./images/backcard.jpg" className="card" id="top" />
                  <img style={{transform: playerTurn ? `translateY(${cardTranslateY}px)` : `translateX(${cardTranslateX}px)`, transition: `${moveCardTimeout}ms`}} src="./images/backcard.jpg" className="card" id='move-card' ref={cardRefBase}/>
                  <div className="nbr-cards-left">Cards left: {deck.length}</div>
                </div>
              </div>
            </div>

            <div className="col-2">
            </div>

            <div className="col-8">
              <div className="card-list" ref={cardRefDestinationOpponent}>
                <div className="card-container" ref={cardRefInsideContainer}>
                  <DisplayArray array={opponentCardArr} showCards={playerEndedGame} />
                </div>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-8">
              <div className="card-list">
                <div className="card-container" ref={cardRefDestinationPlayer}>
                  <DisplayArray array={playerCardArr} showCards={true} />
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="card-col2">
                <div className="card-sum">
                  Total value: {playerSum ? playerSum : 0}
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="card-col2">
                <div className="card-pick">
                  <div className="buttons">
                    <Button type={'hit'} handleClick={() => {
                      giveCard(playerTurn);
                      moveCard(playerTurn);
                    }}>Hit</Button>
                    <Button type={'stop'} handleClick={() => {
                      setPlayerEndedGame(true);
                    }}>Stop</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


 