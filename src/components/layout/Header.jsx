import React, { useContext } from "react";
import { ChangeTurnContext } from "../../context/ChangeTurnProvider";

export default function Header() {
  const { gameEnd, newGameTab } = useContext(ChangeTurnContext);

  return (
    <header className={gameEnd || newGameTab ? 'blurred-background' : ''}>
      <div className="container">
        <nav>
          <a href="" className="logo">
            Blackjack
          </a>
        </nav>
      </div>
    </header>
  )
}