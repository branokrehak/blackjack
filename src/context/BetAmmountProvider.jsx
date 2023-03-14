import React, { useState, createContext, useContext, useEffect } from "react";
import { ChangeTurnContext } from "../context/ChangeTurnProvider";

export const BetAmmountContext = createContext({});

export function BetAmmountProvider({ children }) {
  const [summaryMessage, setSummaryMessage] = useState('');
  const [playerTotalMoney, setPlayerTotalMoney] = useState(0);
  const [moneyWon, setMoneyWon] = useState(0);
  const [enableMoneyTab, setEnableMoneyTab] = useState(false);
  const [betData, setBetData] = useState({
    betAmmountInput: '',
    addMoneyInput: '',
  });

  const { whoWon } = useContext(ChangeTurnContext);

  const { betAmmountInput } = betData; 
  const minBet = 1;
  const maxBet = 100;

  const handleChange = event => {
    const typedValue = event.target.name === 'betAmmountInput' ? Math.floor(Math.max(minBet, Math.min(maxBet, Number(event.target.value)))) : Math.floor(event.target.value);

    setBetData(prev => ({
      ...prev,
      [event.target.name]: typedValue,
    }));
  };

  const addMoneyFunction = () => {
    setPlayerTotalMoney(prev => prev + betData.addMoneyInput);
  };

  useEffect(() => {
    setPlayerTotalMoney(prev => prev + moneyWon);
  }, [moneyWon]);

  useEffect(() => {
    if (whoWon === 'player') {
      setSummaryMessage(`You won ${betAmmountInput * 2}€!`);
      setMoneyWon(betAmmountInput);
    } else if (whoWon === 'opponent') {
      setSummaryMessage(`You lost ${betAmmountInput}€!`);
      setMoneyWon(betAmmountInput - betAmmountInput * 2);
    } else if (whoWon === 'draw') {
      setSummaryMessage(`It's a draw, here is your ${betAmmountInput}€ back!`);
    } else if (whoWon === 'noone') {
      setSummaryMessage(`Both of you lost, here is your ${betAmmountInput}€ back!`);
    };
  }, [whoWon, moneyWon, betAmmountInput]);

  return (
    <BetAmmountContext.Provider value={{
      minBet,
      maxBet,
      playerTotalMoney,
      betData,
      enableMoneyTab,
      summaryMessage,
      addMoneyFunction,
      setEnableMoneyTab,
      handleChange,
    }}>{children}
    </BetAmmountContext.Provider>
  );
};