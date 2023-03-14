import React, { useContext, useState } from "react";
import { CardArrayContext } from '../context/CardArrayProvider';

export default function Button(props) {
  const { btnDisabled } = useContext(CardArrayContext);
  const [hover, setHover] = useState(false);

  const cssStyle = {
    opacity: btnDisabled ? '.4' : '1',
    scale: btnDisabled ? '.95' : '1',
    color: hover && !btnDisabled ? 'rgb(212, 212, 0)' : 'rgb(255, 255, 255)',
  };

  return (
    <button 
      className={`btn btn--${props.type}`}
      onClick={btnDisabled ? null : props.handleClick}
      style={cssStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
    {props.children}
    </button>
  );
};
