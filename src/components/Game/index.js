import React, { useState } from "react";

import "./Game.css";

import GameStatus from "../GameStatus";
import Board from "../Board";
import { StartScreen } from "../StartScreen";

import { initialSquares, initialXIsNext } from "./initial";
import { calculateWinner } from "./helper";

/*
State:
  players: []
  history: [{squares, xIsNext}, ...]
  current: {squares, xIsNext}
  
Behaviour:
  set xIsNext
  set square state (when square gets clicked)
*/

function Game() {
  const [players, setPlayers] = useState([]);
  const [history, setHistory] = useState([{ squares: initialSquares }]);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(initialXIsNext);

  function handleStartGame(player1, player2) {
    setPlayers([
      { ...player1, isX: false },
      { ...player2, isX: true },
    ]);
  }

  if (players.length === 0) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  const currentPlayer = players[xIsNext ? 1 : 0];
  const nextPlayer = players[!xIsNext ? 1 : 0];
  const allSquaresClicked = squares.every((square) => square);
  const { hasWon, winningCombinations } = calculateWinner(squares);
  const gameIsOver = hasWon || allSquaresClicked;

  let status;
  if (hasWon) {
    status = `${nextPlayer.name} ${nextPlayer.character} wins!`;
  } else if (allSquaresClicked) {
    status = "Game over! No winner!";
  } else {
    status = `Waiting for ${currentPlayer.name} ${currentPlayer.character}...`;
  }

  function onSquareClick(indexClicked) {
    if (gameIsOver) {
      return;
    }
    setSquares([
      ...squares.slice(0, indexClicked),
      players[xIsNext ? 1 : 0].character,
      ...squares.slice(indexClicked + 1),
    ]);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(initialSquares);
    setXIsNext(initialXIsNext);
  }

  return (
    <div className="game flex-col-center">
      <GameStatus status={status} />
      <Board
        squares={squares}
        onSquareClick={onSquareClick}
        winningCombinations={winningCombinations}
      />
      <button
        className="btn font-spooky"
        onClick={restartGame}
        style={{
          visibility: gameIsOver ? "visible" : "hidden",
        }}
      >
        Play again
      </button>
    </div>
  );
}

export default Game;
