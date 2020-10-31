import React from "react";
import "./Square.css";

/*
Props:
  value (either null, "X", "O"),
  handleClick: for when someone clicks a "square"
  isWinning: boolean
*/
function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "winning-square" : ""}`.trim()}
      onClick={onSquareClick}
      disabled={!!value}
    >
      <span>{value}</span>
    </button>
  );
}

export default Square;
