import React from 'react';
import Cell from './Cell';

const Row = (props) =>{
   const { cells, onClick, row } = props;
   return (
      <div className="row">
         {cells.map((status, i) => {
            return (
               <Cell
                  status={status}
                  row={row}
                  cell={i}
                  key={`${i}.${row}`}
                  onClick={onClick}
               />
            )
         })}
      </div>
   )
}

export default Row;
