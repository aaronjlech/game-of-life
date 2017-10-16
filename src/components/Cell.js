import React from "react";

const Cell = props => {
   const { status, onClick, cell, row } = props
   return (
      <button onClick={() => props.onClick(row, cell)} className={`life-cell ${status ? 'alive' : 'dead' }`} />
   );
};

export default Cell;
