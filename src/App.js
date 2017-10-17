import React, { Component } from "react";
import "./App.css";

import { makeEmptyGrid, makeRandomGrid, getNeighbourCount, setCellStatus } from "./utilities";
import GameButton from './components/GameButton';
import Row from "./components/Row";
class App extends Component {
   state = {
      grid: makeRandomGrid(50, 50),
      generations: 0,
      runGame: true
   }

   componentDidMount() {
      this._getNextGrid();
   }

   _toggleGame = () => {
      clearInterval(this.interval)

      if(!this.state.runGame){
         this._getNextGrid();
      }
      this.setState({ runGame: !this.state.runGame})

   }

   _handleClick = (x, y) => {
      const { grid } = this.state;
      grid[x][y] = grid[x][y] ? 0 : 1;
      this.setState({ grid });
   }

   _getNextGrid = () => {

         this.interval = setInterval(() => {

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

   }
   _resetGrid = () => {
      clearInterval(this.interval)
      this.setState({grid: makeEmptyGrid(50, 50), runGame: false, generations: 0})
   }
   _getRandomGrid = () => {
      this.setState({grid: makeRandomGrid(50, 50)})
   }

   render() {
      const { grid, generations, runGame } = this.state;
      let playButton = runGame ? 'pause' : 'play'
      return (
         <div className="App">
            <h1>Generations: {generations}</h1>
            <div className="button-container">
               <GameButton
                  key="reset"
                  className="reset"
                  onClick={this._resetGrid}
                  label="reset"
               />
               <GameButton
                  key="play"
                  className={playButton}
                  onClick={this._toggleGame}
                  label={playButton}
               />
               <GameButton
                  key="randomize"
                  className="random"
                  onClick={this._getRandomGrid}
                  label="randomize"
               />
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
