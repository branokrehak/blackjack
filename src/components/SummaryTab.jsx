import React, { useContext } from "react";
import { ChangeTurnContext } from "../context/ChangeTurnProvider";
import { CardArrayContext } from '../context/CardArrayProvider';
import { BetAmmountContext } from '../context/BetAmmountProvider';

export default function Summarytab() {
  const { summaryMessage } = useContext(BetAmmountContext);
  const { setNewGameTab } = useContext(ChangeTurnContext);
  const { playerSum, opponentSum } = useContext(CardArrayContext);

  return (
    <div id="summary-tab">
      <div className="items">
        <div className="message message--summary">
          <p>{summaryMessage}</p>
        </div>

        <button className="message message--new-game" onClick={() => {
          setNewGameTab(true);
        }}>
          Do you want to play one more game?
        </button>

        <div className="message message--card-value">
          <p>Your card value: {playerSum}</p>
          <p>Opponent card value: {opponentSum}</p>
        </div>
      </div>
    </div>
  );
};


