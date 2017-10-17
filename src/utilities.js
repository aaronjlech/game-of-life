

//create a grid with all dead cells
//dead cells have a value of 0 alive cells have a value of 1
export function makeEmptyGrid(height, width) {
   const grid = [];
   for(let y = 0; y < height; y++){
      grid[y] = [];
      for(let x = 0; x < width; x++){
         grid[y].push(0);
      }
   }

   return grid;
}

//randomly populate grid with cells
export function makeRandomGrid(height, width) {
   const grid = [];
   for(let y = 0; y < height; y++){
      grid[y] = [];
      for(let x = 0; x < width; x++){
         grid[y].push(Math.floor(Math.random() * 2 ))
      }
   }
   return grid
}

export function getNeighbourCount(currentGrid, x, y)  {
   let neighbourCount = 0
   //total length of rows (y axis)
   let rowCount = currentGrid.length;
   //total length of columns in the given row (x axis)
   let columnCount = currentGrid[x].length;

   //*** GET LEFT, RIGHT, TOP, BOTTOM COORIDINATES FOR CURRENT cells ***
   // if the current cell is on the first row the rowAbove is set to the last row(wraps to bottom row)
   let rowAbove = (y-1 >= 0) ? y-1 : rowCount - 1;
   //if the current cell is on the last row the rowBelow is set to the first row(wraps to the top row)
   let rowBelow = (y+1 <= rowCount - 1) ? y+1 : 0;
   //if the current cell is at the beginning of the row columnLeft is set to the end of the row(wraps to end of given row)
   let columnLeft = (x-1  >= 0) ? x-1 : columnCount - 1;
   //if the current cell is at the end of the row columnRight is set to the beginning of the row(wraps to beginning of given row)
   let columnRight = (x+1 <= columnCount - 1) ? x+1 : 0;

   //*** CHECK STATUS(ALIVE: 1 OR DEAD: 0) OF NEIGHBOUR CELLS,
   //top left cell
   if(currentGrid[rowAbove][columnLeft]) neighbourCount++;
   //top center cell
   if(currentGrid[rowAbove][x]) neighbourCount++;
   //top right cell
   if(currentGrid[rowAbove][columnRight]) neighbourCount++;
   //left cell
   if(currentGrid[y][columnLeft]) neighbourCount++;
   //right cell
   if(currentGrid[y][columnRight]) neighbourCount++;
   //bottom left cell
   if(currentGrid[rowBelow][columnLeft]) neighbourCount++;
   //bottom center cell
   if(currentGrid[rowBelow][x]) neighbourCount++;
   //bottom right cell
   if(currentGrid[rowBelow][columnRight]) neighbourCount++;

   return neighbourCount
}



// set the status of the current cell based upon the number of neighbouring cells
//cell is set to alive(1) or dead(0)
export function setCellStatus(currentCell, neighbourCount){
   let newCell = 0
   if(currentCell){
      if(neighbourCount < 2 || neighbourCount > 3){
         //too many or too little neighbouring cells.
         newCell = 0
      } else if(neighbourCount === 2 || neighbourCount === 3){
         //cell is stable due to enough neighbouring cells
         newCell = 1
      }
   } else {
      if(neighbourCount === 3){
         //cell is regenerated due to enough neighbouring cells
         newCell = 1
      }
   }
   return newCell
}
