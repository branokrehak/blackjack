import React, { useContext } from "react";
import { ChangeTurnContext } from "../context/ChangeTurnProvider";
import { CardArrayContext } from '../context/CardArrayProvider';
import { BetAmmountContext } from '../context/BetAmmountProvider';

export default function StartGameTab() {
  const { setNewGameTab, setGameEnd } = useContext(ChangeTurnContext);
  const { resetGame } = useContext(CardArrayContext);
  const { handleChange, minBet, maxBet, betData, playerTotalMoney, setEnableMoneyTab } = useContext(BetAmmountContext);

  return (
    <div id="start-game-tab">
      <div className="items">
        <div className="title">Blackjack</div>

        <div id="player-total-money">
          Your total money: {playerTotalMoney}€
        </div>

        <div className="message message--bet">
          <div className="text">
            <p>How much do you want to bet?</p>
            <p>Min = {minBet}€ / Max = {maxBet}€</p>
          </div>

          <div className="message--input">
            <input 
              className="input"
              type='number'
              placeholder='Ammount'
              name='betAmmountInput'
              onChange={handleChange}
              value={betData.betAmmountInput}
            />
            
            <button className="message--btn add-money" onClick={() => {
              setEnableMoneyTab(true);
            }}>
              Add money
            </button>
            
            <button className="message--btn" onClick={() => {
              if (betData.betAmmountInput && betData.betAmmountInput <= betData.addMoneyInput) {
                resetGame();
                setNewGameTab(false);
                setGameEnd(false);
              };
            }}>
              Start game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


