let gridNextMove = [6, 6, 6, 6, 6, 6, 6]
let grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]
let player1Turn = true;
const numberRows = 6;
const numberColumns = 7;
let movesMade = 0;
const maxMoves = 42;

console.log('JS is connected')

const col1Elements = document.getElementsByClassName('col-1');
const col2Elements = document.getElementsByClassName('col-2');
const col3Elements = document.getElementsByClassName('col-3');
const col4Elements = document.getElementsByClassName('col-4');
const col5Elements = document.getElementsByClassName('col-5');
const col6Elements = document.getElementsByClassName('col-6');
const col7Elements = document.getElementsByClassName('col-7');

function checkRows(row, column, playerNumber) {
  let piecesInARow = 1;
  let i = column + 1;
  while (i<numberColumns && grid[row][i] === playerNumber) {
    piecesInARow++;
    i++;
    if (piecesInARow === 4) return true;
  }
  i = column - 1;
  while(i>=0 && grid[row][i] === playerNumber) {
    piecesInARow++;
    i--;
    if (piecesInARow === 4) return true;
  }
  return false;
}

function checkDown(row, column, playerNumber) {
  let piecesInARow = 1;
  row++;
  while(row < numberRows && grid[row][column] === playerNumber) {
    piecesInARow++;
    row++;
    if (piecesInARow === 4) return true;
  }
  return false;
}

function checkDiagonals(row, column, playerNumber) {
  let piecesInARow = 1;
  // Check right down
  let i = row + 1;
  let j = column + 1;
  while(i < numberRows && j < numberColumns && grid[i][j] === playerNumber) {
    i++;
    j++;
    piecesInARow++;
    if (piecesInARow === 4) return true;
  }
  // Check left up
  i = row - 1;
  j = column - 1;
  while(i < numberRows && j < numberColumns && grid[i][j] === playerNumber) {
    i--;
    j--;
    piecesInARow++;
    if (piecesInARow === 4) return true;
  }
  piecesInARow = 1;
  //C Check left down
  i = row + 1;
  j = column - 1;
  while(i < numberRows && j < numberColumns && grid[i][j] === playerNumber) {
    i++;
    j--;
    piecesInARow++;
    if (piecesInARow === 4) return true;
  }
  i = row - 1;
  j = column + 1;
  while(i < numberRows && j < numberColumns && grid[i][j] === playerNumber) {
    i--;
    j++;
    piecesInARow++;
    if (piecesInARow === 4) return true;
  }
  return false;
}

function checkWinCondition(row, column) {
  let playerNumber = player1Turn ? 1 : 2;
  // Check for rows
  if (checkRows(row, column, playerNumber)) return true;
  // Check Down
  if (checkDown(row, column, playerNumber)) return true;
  // Check Diagonals
  if (checkDiagonals(row, column, playerNumber)) return true;
  return false;
}

function addChip(e) {
  const column = e.target.id[3];
  const row = gridNextMove[Number(column) - 1];
  if (row === 0) return;
  const componentId = "r" + row + "c" + column;
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = player1Turn ? 'red': 'yellow';
  grid[row - 1][column - 1] = player1Turn ? 1 : 2;
  movesMade++;
  if (checkWinCondition(row - 1, column - 1)) {
    console.log('GAME ENDED WITH WINNER');
  }
  if (movesMade === maxMoves) console.log('GAME ENDED IN A DRAW');
  player1Turn = !player1Turn;
  const hoverComponentId = "r0c" + column;
  const hoverCellId = document.getElementById(hoverComponentId);
  hoverCellId.style.backgroundColor = player1Turn ? 'red' : 'yellow';
  gridNextMove[Number(column) - 1] = row - 1;
}

function hoverChip(e) {
  const column = e.target.id[3];
  const componentId = "r0c" + column;
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = player1Turn ? 'red': 'yellow';
}

function hoverOut(e) {
  const column = e.target.id[3];
  const componentId = "r0c" + column;
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = 'black';
}

for(let i = 0; i<col1Elements.length; i++) {
  col1Elements[i].addEventListener('click', addChip);
  col2Elements[i].addEventListener('click', addChip);
  col3Elements[i].addEventListener('click', addChip);
  col4Elements[i].addEventListener('click', addChip);
  col5Elements[i].addEventListener('click', addChip);
  col6Elements[i].addEventListener('click', addChip);
  col7Elements[i].addEventListener('click', addChip);
  col1Elements[i].addEventListener('mouseover', hoverChip);
  col2Elements[i].addEventListener('mouseover', hoverChip);
  col3Elements[i].addEventListener('mouseover', hoverChip);
  col4Elements[i].addEventListener('mouseover', hoverChip);
  col5Elements[i].addEventListener('mouseover', hoverChip);
  col6Elements[i].addEventListener('mouseover', hoverChip);
  col7Elements[i].addEventListener('mouseover', hoverChip);
  col1Elements[i].addEventListener('mouseout', hoverOut);
  col2Elements[i].addEventListener('mouseout', hoverOut);
  col3Elements[i].addEventListener('mouseout', hoverOut);
  col4Elements[i].addEventListener('mouseout', hoverOut);
  col5Elements[i].addEventListener('mouseout', hoverOut);
  col6Elements[i].addEventListener('mouseout', hoverOut);
  col7Elements[i].addEventListener('mouseout', hoverOut);
}