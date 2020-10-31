import React, { useState } from "react";

import { allCharacters } from "./allCharacters";
import { PlayerInput } from "../PlayerInput";
import "./StartScreen.css";

export function StartScreen({ onStartGame }) {
  const [player1, setPlayer1] = useState({
    name: "",
    character: "",
  });
  const [player2, setPlayer2] = useState({
    name: "",
    character: "",
  });

  const userInputIsValid =
    player1.name && player1.character && player2.name && player2.character;

  function handleClick() {
    if (userInputIsValid) {
      onStartGame(player1, player2);
    }
  }

  return (
    <div className="start-screen flex-col-center glowing-border font-spooky">
      <p
        className="glowing-text"
        style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
      >
        Character selection screen
      </p>
      <PlayerInput
        playerNumber={1}
        availableCharacters={allCharacters.filter(
          ({ character }) => player2.character !== character
        )}
        onPlayerUpdate={(newPlayer) => setPlayer1(newPlayer)}
      />
      <PlayerInput
        playerNumber={2}
        availableCharacters={allCharacters.filter(
          ({ character }) => player1.character !== character
        )}
        onPlayerUpdate={(newPlayer) => setPlayer2(newPlayer)}
      />
      {userInputIsValid && (
        <button className="btn font-spooky glowing-font" onClick={handleClick}>
          Start game
        </button>
      )}
    </div>
  );
}
