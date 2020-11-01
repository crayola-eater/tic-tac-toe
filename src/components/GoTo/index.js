import React from "react";
import "./GoTo.css";

export function GoTo({ gameIsOver, movesCount, currentMove, handleClick }) {
  return (
    <div className="go-to-move-container">
      {Array.from({ length: movesCount }, (_, move) => {
        let className;

        // start
        // less than current
        // current
        // more than current
        // end

        if (move > 0) {
        }
        return (
          <button
            key={move}
            className={"" + (currentMove === move ? "go-to-move__current" : "")}
            onClick={() => handleClick(move)}
          >
            {move > 0
              ? !gameIsOver || move < movesCount - 1
                ? move
                : "End"
              : "Start"}
          </button>
        );
      })}
    </div>
  );
}
