import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { makeEmptyGrid, makeRandomGrid, getNeighbourCount, setCellStatus } from "./utilities";
import Row from "./components/Row";
class App extends Component {
   state = {
      grid: makeRandomGrid(50, 50),
      generations: 0,
      runGame: true
   }
   componentDidMount() {
      // if(this.state.runGame){
      //    this._getNextGrid()
      // }
      this._getNextGrid();
   }
   _toggleGame = () => {

   }

   _handleClick = (x, y) => {
      const { grid } = this.state;
      grid[x][y] = grid[x][y] ? 0 : 1;
      this.setState({ grid });
   }
   _getNextGrid = () => {

        const interval = window.setInterval(() => {
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
         this.setState({ grid: newGrid, generations: this.state.generations += 1})
      }, 100)
      if(!this.state.runGame){
         console.log('hello!');
         clearInterval(interval);
      }
   }
   _resetGrid = () => {
      this.setState({grid: makeEmptyGrid(50, 50)})
   }


   render() {
      const { grid, generations, runGame } = this.state;
      return (
         <div className="App">
            <h1>generations: {generations}</h1>
            <div className="button-container">
               <button className="reset" onClick={this._resetGrid}>reset grid</button>
               <button className="pause" onClick={() =>this._getNextGrid()}>{ runGame ? 'pause' : 'start'} generations</button>
            </div>
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
