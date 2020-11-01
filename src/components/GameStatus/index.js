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

export function GameStatus({ status }) {
  return <div className="game-status font-spooky">{status}</div>;
}
