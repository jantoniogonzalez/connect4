const gridNextMove = [6, 6, 6, 6, 6, 6, 6]
const grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

const gameInformation = {
  movesMade: 0,
  maxMoves: 42,
  numberColumns: 7,
  numberRows: 6,
  playerId: 0,
  opponentId: 0,
  pieceColor: 'red',
  playerTurn: 1,
  gameEnded: false,
}

function changePlayerMessageText(text) {
  const playerMessage = document.getElementById('player-message');
  playerMessage.innerText = text;
}

function setWinningColorPieces(componentIds) {
  console.log(setWinningColorPieces);
  for (let i = 0; i < componentIds.length; i++) {
    const colorPiece = document.getElementById(componentIds[i]);
    colorPiece.style.backgroundColor = 'purple';
  }
}

function assignEventListeners() {
  if (gameInformation.playerTurn === gameInformation.playerId) changePlayerMessageText('Your Move');
  else changePlayerMessageText('Waiting for opponent to move...');

  const col1Elements = document.getElementsByClassName('col-1');
  const col2Elements = document.getElementsByClassName('col-2');
  const col3Elements = document.getElementsByClassName('col-3');
  const col4Elements = document.getElementsByClassName('col-4');
  const col5Elements = document.getElementsByClassName('col-5');
  const col6Elements = document.getElementsByClassName('col-6');
  const col7Elements = document.getElementsByClassName('col-7');
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
  console.log(`is player turn: ${gameInformation.playerTurn}`);
}

function checkRows(row, column, playerNumber) {
  console.log('CHECKING ROWS');
  let componentIdRow = row + 1;
  let componentIdCol = column + 1
  const winningCombination = ['r'+componentIdRow+'c'+componentIdCol];
  let piecesInARow = 1;
  let i = column + 1;
  // Check Right
  console.log('CHECK RIGHT');
  while (i<gameInformation.numberColumns && grid[row][i] === playerNumber) {
    piecesInARow++;
    i++;
    componentIdCol++;
    winningCombination.push('r'+componentIdRow+'c'+componentIdCol);
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination);
      return true;
    }
  }
  i = column - 1;
  // Check Left
  console.log('CHECK LEFT');
  componentIdCol = column + 1;
  while(i>=0 && grid[row][i] === playerNumber) {
    piecesInARow++;
    i--;
    componentIdCol--;
    winningCombination.push('r'+componentIdRow+'c'+componentIdCol);
    if (piecesInARow === 4){
      setWinningColorPieces(winningCombination);
      return true;
    }
  }
  console.log('DONe CHECKING');
  return false;
}

function checkDown(row, column, playerNumber) {
  console.log('CHECKING DOWN')
  let piecesInARow = 1;
  let componentIdRow = row + 1;
  let componentIdCol = column + 1;
  const winningCombination = ['r'+componentIdRow+'c'+componentIdCol];
  row++;
  while(row < gameInformation.numberRows && grid[row][column] === playerNumber) {
    piecesInARow++;
    row++;
    componentIdRow++;
    winningCombination.push('r'+componentIdRow+'c'+componentIdCol);
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination);
      return true;
    }
  }
  return false;
}

function checkDiagonals(row, column, playerNumber) {
  console.log('CHECKING DIAGONALS')
  let piecesInARow = 1;
  let componentIdRow = row + 1;
  let componentIdCol = column + 1;
  const winningCombination = ['r'+componentIdRow+'c'+componentIdCol];
  // Check right down
  let i = row + 1;
  let j = column + 1;
  console.log('CHECKING RIGHT DOWN');
  while(i < gameInformation.numberRows && j < gameInformation.numberColumns && grid[i][j] === playerNumber) {
    i++;
    j++;
    componentIdCol++;
    componentIdRow++;
    winningCombination.push('r'+componentIdRow+'c'+componentIdCol);
    piecesInARow++;
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination);
      return true;
    }
  }
  // Check left up
  componentIdRow = row + 1;
  componentIdCol = column + 1;
  i = row - 1;
  j = column - 1;
  console.log('CHECKING LEFT UP');
  while(i >= 0 && j >= 0 && grid[i][j] === playerNumber) {
    i--;
    j--;
    componentIdCol--;
    componentIdRow--;
    winningCombination.push('r'+componentIdRow+'c'+componentIdCol);
    piecesInARow++;
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination);
      return true;
    }
  }
  piecesInARow = 1;
  // Check left down
  componentIdRow = row + 1;
  componentIdCol = column + 1;
  const winningCombination2 = ['r' + componentIdRow + 'c' + componentIdCol];
  i = row + 1;
  j = column - 1;
  console.log('CHECKING LEFT DOWN');
  while(i < gameInformation.numberRows && j >= 0 && grid[i][j] === playerNumber) {
    i++;
    j--;
    componentIdCol--;
    componentIdRow++;
    winningCombination2.push('r'+componentIdRow+'c'+componentIdCol);
    piecesInARow++;
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination2);
      return true;
    }
  }
  // Check right up
  console.log('CHECKING RIGHT UP');
  componentIdRow = row + 1;
  componentIdCol = column + 1;
  i = row - 1;
  j = column + 1;
  while(i >= 0 && j < gameInformation.numberColumns && grid[i][j] === playerNumber) {
    i--;
    j++;
    componentIdCol++;
    componentIdRow--;
    winningCombination2.push('r'+componentIdRow+'c'+componentIdCol);
    piecesInARow++;
    if (piecesInARow === 4) {
      setWinningColorPieces(winningCombination2);
      return true;
    }
  }
  return false;
}

function checkWinCondition(row, column) {
  // Check for rows
  if (checkRows(row, column, gameInformation.playerTurn)) return true;
  // Check Down
  if (checkDown(row, column, gameInformation.playerTurn)) return true;
  // Check Diagonals
  if (checkDiagonals(row, column, gameInformation.playerTurn)) return true;
  return false;
}

function updateGameState(row, column, componentId) {
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = gameInformation.playerTurn === 1 ? 'red': 'yellow';
  grid[row - 1][column - 1] = gameInformation.playerTurn;
  gameInformation.movesMade = gameInformation.movesMade + 1;
  gridNextMove[Number(column) - 1] = row - 1;
  console.log(gridNextMove);
  // Check to end game
  if (checkWinCondition(row - 1, column - 1)) {
    endGame(gameInformation.playerTurn, false);
    return;
  }
  if (gameInformation.movesMade === gameInformation.maxMoves) {
    endGame(gameInformation.playerTurn, true);
    return;
  }
  if (gameInformation.playerTurn !== gameInformation.playerId) changePlayerMessageText('Your Move');
  else changePlayerMessageText('Waiting for opponent to move...');
  console.log('FINISHED UPDATING GAME STATE')
}

function addChip(e) {
  // Not player's turn
  if (gameInformation.playerTurn !== gameInformation.playerId || gameInformation.gameEnded) return;
  const col = e.target.id[3];
  const row = gridNextMove[Number(col) - 1];
  const componentId = "r" + row + "c" + col;

  // Column is full
  if (row === 0) return;

  // Move Piece
  updateGameState(row, col, componentId);
  // Uncolor hover
  const hoverComponentId = 'r0c' + col;
  const cellId = document.getElementById(hoverComponentId);
  cellId.style.backgroundColor = 'darkgreen'; 

  console.log('SENT MOVE')
  gameInformation.playerTurn = gameInformation.opponentId;
  const message = {
    type: 'move',
    componentId,
    row,
    col,
    opponentId: gameInformation.opponentId,
    playerId: gameInformation.playerId,
    playerTurn: gameInformation.playerTurn,
    gameEnded: gameInformation.gameEnded,
  };
  webSocket.send(JSON.stringify(message));
}

function hoverChip(e) {
  if (gameInformation.playerTurn !== gameInformation.playerId || gameInformation.gameEnded) return;
  const column = e.target.id[3];
  const componentId = "r0c" + column;
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = gameInformation.pieceColor;
}

function hoverOut(e) {
  if (gameInformation.playerTurn !== gameInformation.playerId || gameInformation.gameEnded) return;
  const column = e.target.id[3];
  const componentId = "r0c" + column;
  const cellId = document.getElementById(componentId);
  cellId.style.backgroundColor = 'darkgreen';
}

function activatePlayAgainButton(text) {
  const playAgainButton = document.getElementById('play-again');
  playAgainButton.innerText = text;
  playAgainButton.style.visibility = 'visible';
  playAgainButton.addEventListener('click', (e) => location.reload());
}

function endGame(winner, isTie) {
  if (isTie) changePlayerMessageText('Draw...');
  else if (winner !== gameInformation.playerId) changePlayerMessageText('Loser!');
  else changePlayerMessageText('Winner!');
  gameInformation.gameEnded = true;
  activatePlayAgainButton('Play Again');
  console.log("winner winner chicker dinner");
  const gameEnded = {
    type: 'gameEnded',
    message: 'It is done!',
  }
  webSocket.send(JSON.stringify(gameEnded));
}

const webSocket = new WebSocket("wss://localhost:8080");

webSocket.onopen = function(event) {
  const message = {
    type: 'connection',
    message: 'WAZAAAA',
  };
  webSocket.send(JSON.stringify(message));
}
webSocket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  console.log('RECEIVED MESSAGE');
  switch(message.type) {
    case 'connection':
      gameInformation.playerId = Number(message.playerId);
      gameInformation.opponentId = Number(message.opponentId);
      if (message.playerId === 2) gameInformation.pieceColor = 'yellow';
      gameInformation.gameEnded = false;
      console.log(message.message);
      break;
    case 'opponentConnection':
      assignEventListeners();
      break;
    case 'move':
      console.log('A MOVE HAS BEEN MADE')
      console.log(message);
      gameInformation.gameEnded = message.gameEnded;
      updateGameState(Number(message.row), Number(message.col), message.componentId);
      gameInformation.playerTurn = message.playerTurn;
      break;
    case 'playerLeft':
      console.log(message);
      console.log(gameInformation);
      gameInformation.gameEnded = true;
      if (message.isOngoingGame) changePlayerMessageText('Winner! Your opponent has left.');
      webSocket.close();
      activatePlayAgainButton('Play Again');
      break;
    case 'close':
      changePlayerMessageText('Game is currently full...');
      activatePlayAgainButton('Try Again');
      break;
    default:
      console.log(message);
  }
}

console.log('JS is connected')

