import React from "react";
import Square from "../Square";
import "./Board.css";

/*
Props:
  squares: array in which each value is either: null, "X", "O"
  winningCombinations: array of arrays
  handleClick: function
*/

function Board({ squares, onSquareClick, winningCombinations }) {
  return (
    <div className="board">
      {squares.map((value, i) => {
        const isWinningSquare = winningCombinations.some((combination) =>
          combination.includes(i)
        );
        return (
          <Square
            key={i}
            value={value}
            onSquareClick={() => onSquareClick(i)}
            isWinning={isWinningSquare}
          />
        );
      })}
    </div>
  );
}

export default Board;
