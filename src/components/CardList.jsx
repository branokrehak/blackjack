import React, {useEffect, useState, useContext, createContext} from "react";
import { DisplayArray } from './index';
import { CardArrayContext } from '../context/CardArrayProvider';

export default function CardList(props) {
  const { playerCardArr, opponentCardArr } = useContext(CardArrayContext);

  return (
    <div className="card-list">
      <div className="card-container" ref={cardRef.insideContainer}>
        <DisplayArray 
        array={props.type === 'player' ? playerCardArr :opponentCardArr} 
        html="img" 
      />
      </div>
    </div>
  );
};