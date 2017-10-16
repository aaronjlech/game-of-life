import React from 'react';

const GameButton = (props) => {
   const {className, label, onClick } = props
   return <button className={`button ${className}`} onClick={onClick}>{label}</button>
}

export default GameButton;
