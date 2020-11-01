import React from "react";
import "./GoTo.css";

export function GoTo({ gameIsOver, movesCount, currentMove, handleClick }) {
  return (
    <div className="go-to-move-container font-spooky">
      <span className="go-to-move__label glowing-text">Go back?</span>
      {Array.from({ length: movesCount }, (_, move) => {
        const classList = ["go-to-move__move"];
        if (move < currentMove) {
          classList.push("go-to-move__to-keep");
        } else if (move > currentMove) {
          classList.push("go-to-move__to-drop");
        } else {
          classList.push("go-to-move__to-keep", "go-to-move__current");
        }

        let buttonText;
        if (move > 0) {
          if (!gameIsOver || move < movesCount - 1) {
            buttonText = move;
          } else {
            buttonText = "End";
          }
        } else {
          buttonText = "Start";
        }

        if (move > 0) {
        }
        return (
          <button
            key={move}
            className={classList.join(" ")}
            onClick={() => handleClick(move)}
          >
            {buttonText}
          </button>
        );
      })}
    </div>
  );
}
