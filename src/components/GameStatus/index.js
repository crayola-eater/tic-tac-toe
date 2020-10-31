import React from "react";
import "./GameStatus.css";

/*
Props:
    Status: 
        Something like:
            "Next player: <player_character>"
            "Game over! No winner!"
            "<player_character> wins!"
*/

function GameStatus({ status }) {
  return (
    <div className="game-status">
      <p className="font-spooky">{status}</p>
    </div>
  );
}

export default GameStatus;
