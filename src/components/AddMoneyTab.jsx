import React, { useContext } from "react";
import { BetAmmountContext } from '../context/BetAmmountProvider';

export default function AddMoneyTab() {
  const { handleChange, betData, setEnableMoneyTab, addMoneyFunction } = useContext(BetAmmountContext);


  return (
    <div id="add-money-tab">
      <div className="items">
        <div className="title">How much money do you want to add?</div>

        <input 
          className="input"
          type='number'
          placeholder='Ammount'
          name='addMoneyInput'
          onChange={handleChange}
          value={betData.addMoneyInput}
        />

        <button className="add-money-btn" onClick={() => {
          addMoneyFunction();
          setEnableMoneyTab(false);
        }}>
          Start game
        </button>
      </div>
    </div>
  );
};
