import React, { useState } from "react";

import "./Game.css";

import { GameStatus } from "../GameStatus";
import { Board } from "../Board";
import { StartScreen } from "../StartScreen";
import { GoTo } from "../GoTo";
import { initialPlayers, initialHistory, initialXIsNext } from "./initial";
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

export function Game() {
  const [players, setPlayers] = useState([]);
  const [history, setHistory] = useState(initialHistory);
  const [xIsNext, setXIsNext] = useState(initialXIsNext);
  const [stepNumber, setStepNumber] = useState(0);

  function handleStartGame(player1, player2) {
    setPlayers([
      { ...player1, isX: false },
      { ...player2, isX: true },
    ]);
  }

  if (0 === players.length) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  function onSquareClick(indexClicked) {
    if (gameIsOver) {
      return;
    }
    const { squares } = history[stepNumber];
    const truncatedHistory = history.slice(0, stepNumber + 1);

    if (squares[indexClicked] || calculateWinner(squares).hasWon) {
      return;
    }

    setHistory([
      // Create deep, imperative copy of existing history
      ...truncatedHistory.map((step) => {
        return { squares: [...step.squares] };
      }),

      // New step in history
      {
        squares: [
          ...squares.slice(0, indexClicked),
          players[xIsNext ? 1 : 0].character,
          ...squares.slice(indexClicked + 1),
        ],
      },
    ]);
    setStepNumber(truncatedHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    console.log("Set step number to", step);
    setStepNumber(step);
    setXIsNext(0 !== step % 2);
  }

  function restartGame() {
    setHistory(initialHistory);
    setStepNumber(0);
    setXIsNext(initialXIsNext);
  }

  const { squares } = history[stepNumber];
  const currentPlayer = players[xIsNext ? 1 : 0];
  const nextPlayer = players[xIsNext ? 0 : 1];
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

  return (
    <div className="game flex-col-center">
      <GoTo
        gameIsOver={
          history[history.length - 1].squares.every((square) => square) ||
          calculateWinner(history[history.length - 1].squares).hasWon
        }
        movesCount={history.length}
        currentMove={stepNumber}
        handleClick={jumpTo}
      />
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
