import React, { useContext } from "react";
import { MoveCardContext } from '../context/MoveCardProvider';

export default function DisplayArray(props) {
  const { cardDefaultDuration } = useContext(MoveCardContext);

  return (
    props.array.map(item => {
      return (
        <div style={{zIndex: item.zIndex}} key={item.id} className="card relative">
          <img src={`./images/${props.showCards ? `cards/${item.name}` : `backcard`}.jpg`} className={`card-img absolute ${item.color}`} alt="" />
        </div>
      );
    }).reverse()
  );
};



