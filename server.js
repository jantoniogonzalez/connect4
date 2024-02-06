const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 8080;

// Game Information
let numberOfPlayers = 0;
let playerTurn = 1;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
const sockets = {
  1: undefined,
  2: undefined,
};

function main() {
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
}

wss.on('connection', (socket) => {
  numberOfPlayers++;
  const playerId = numberOfPlayers;
  const opponentId = numberOfPlayers === 2 ? 1 : 2;
  if (playerId > 2) {
    const connectionRejection = {
      type: 'close',
      playerId,
      message: 'Game is currently full',
    };
    socket.send(JSON.stringify(connectionRejection));
    socket.close();
    numberOfPlayers = 2;
    return;
  }
  sockets[numberOfPlayers] = socket;

  socket.on('message', (message) => {
    const playerMessage = JSON.parse(message);
    switch(playerMessage.type) {
      case 'connection':
        console.log(`A new player has joined: ${playerMessage.message}`);
        if (sockets[opponentId].readyState === WebSocket.OPEN)
        break;
      case 'move':
        console.log(playerMessage);
        if (sockets[opponentId].readyState === WebSocket.OPEN) sockets[opponentId].send(JSON.stringify(playerMessage));
        break;
      default:
        console.log(`We received this message: ${message}`);
        break;
    }
  });

  const welcomeMessage = {
    type: 'connection',
    playerId,
    opponentId,
    message: `Hello new challenger! You are player ${playerId}`,
  };

  socket.send(JSON.stringify(welcomeMessage));
})

server.listen((port), () => console.log(`Listening on port: ${port}`));