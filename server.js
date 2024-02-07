const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 8080;

// Game Information
let numberOfPlayers = 0;
const gameInformation = {
  nextPlayerId: 1,
  nextOpponentId: 2,
}
let isOngoingGame = false;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
const sockets = {
  1: undefined,
  2: undefined,
};

wss.on('connection', (socket) => {
  console.log(`NUMBER OF PLAYERS IS: ${numberOfPlayers}`)
  if (numberOfPlayers === 2) {
    const connectionRejection = {
      type: 'close',
      message: 'Game is currently full',
    };
    socket.send(JSON.stringify(connectionRejection));
    socket.close();
    return;
  }
  const playerId = gameInformation.nextPlayerId;
  const opponentId = gameInformation.nextOpponentId;
  gameInformation.nextPlayerId = opponentId;
  gameInformation.nextOpponentId = playerId;
  sockets[playerId] = socket;

  socket.on('message', (message) => {
    const playerMessage = JSON.parse(message);
    switch(playerMessage.type) {
      case 'connection':
        console.log(`A new player has joined: ${playerMessage.message}`);
        const opponentMessage = {
          type: 'opponentConnection',
          message: 'An opponent has connected',
        };
        // Let opponent know you have joined their game
        if (sockets[opponentId]?.readyState === WebSocket.OPEN) {
          console.log(`Sending connection message to Player ${opponentId}`);
          isOngoingGame = true;
          sockets[opponentId].send(JSON.stringify(opponentMessage));
          // If there was already a player in lobby, notify player
          if (numberOfPlayers === 1) {
            console.log(`Sending connection message for WAITING player ${playerId}`)
            socket.send(JSON.stringify(opponentMessage));
          }
        }
        numberOfPlayers++;
        break;
      case 'move':
        console.log(playerMessage);
        if (sockets[opponentId].readyState === WebSocket.OPEN) {
          sockets[opponentId].send(JSON.stringify(playerMessage));
        }
        break;
      case 'gameEnded':
        console.log(`END GAME MESSAGE FROM Player ${playerId}`);
        console.log(numberOfPlayers);
        isOngoingGame = false;
        sockets[playerId] = null;
        socket.close();
      default:
        console.log(`We received this message: ${message}`);
        break;
    }
  });

  socket.on('close', () => {
    numberOfPlayers--;
    if (sockets[opponentId]?.readyState === WebSocket.OPEN) {
      const closedSession = {
        type: 'playerLeft',
        message: 'Your opponent has disconnected',
        isOngoingGame,
      };
      sockets[opponentId].send(JSON.stringify(closedSession));
    }
    isOngoingGame = false;
    gameInformation.nextPlayerId = playerId;
    gameInformation.nextOpponentId = opponentId;
  })

  const welcomeMessage = {
    type: 'connection',
    playerId,
    opponentId,
    message: `Hello new challenger! You are player ${playerId}`,
  };

  socket.send(JSON.stringify(welcomeMessage));
})

server.listen((port), () => console.log(`Listening on port: ${port}`));