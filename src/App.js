import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeEmptyGrid, makeRandomGrid, getNeighbourCount, setCellStatus } from "./utilities";
import Row from "./components/Row";
class App extends Component {
   state = {
      grid: makeRandomGrid(50, 50),
      generations: 0
   }
   componentDidMount() {
      this._getNextGrid()
   }
   _handleClick = (x, y) => {
      const { grid } = this.state;
      grid[x][y] = grid[x][y] ? 0 : 1;
      this.setState({ grid });
   }
   _getNextGrid = () => {
      this.interval = window.setInterval(() => {
         let currentGrid = this.state.grid
         const newGrid = []
         for (let y = 0; y < currentGrid.length; y++) {
            newGrid[y] = []
            for(let x = 0; x < currentGrid[y].length; x++){
               let currentCell = currentGrid[y][x];
               //get the number of alive neighbours for current cell
               let neighbourCount = getNeighbourCount(currentGrid, x, y)
               //check to see if current cell is alive or dead

               newGrid[y].push(setCellStatus(currentCell, neighbourCount))
            }
         }
         console.log(newGrid[21][20] === currentGrid[21][20]);
         this.setState({ grid: newGrid})
      }, 100)
   }


   render() {
      const { grid } = this.state;
      console.log(grid[20][10]);
      return (
         <div className="App">
            <div className="grid">
               {grid.length &&
                  grid.map((cells, i) => {
                     return (
                        <Row
                           onClick={this._handleClick}
                           key={i}
                           row={i}
                           cells={cells}
                        />
                     );
                  })}
            </div>
         </div>
      );
   }
}

export default App;
