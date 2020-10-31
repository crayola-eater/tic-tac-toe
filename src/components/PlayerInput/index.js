import React, { useState } from "react";

import "./PlayerInput.css";

export function PlayerInput({
  playerNumber,
  availableCharacters,
  onPlayerUpdate,
}) {
  const [player, setPlayer] = useState({
    name: "",
    character: "",
  });

  function handleChange(update) {
    const updatedPlayer = { ...player, ...update };
    setPlayer(updatedPlayer);
    onPlayerUpdate(updatedPlayer);
  }

  return (
    <fieldset className="player-input-container flex-col-center">
      <legend className="player-input__legend glowing-text">{`Player ${playerNumber}`}</legend>
      <input
        className="player-input__name font-spooky"
        type="text"
        placeholder={`Enter player ${playerNumber}'s name here...`}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      {player.name && (
        <select
          className="player-input__character font-spooky"
          defaultValue={player.character}
          onChange={(e) => handleChange({ character: e.target.value })}
        >
          <option className="player-input__character-option" disabled value="">
            {`Select a character for player ${playerNumber}`}
          </option>
          {availableCharacters.map(({ character, characterId }) => {
            return (
              <option
                className="player-input__character-option"
                value={character}
                key={characterId}
              >
                {character}
              </option>
            );
          })}
        </select>
      )}
    </fieldset>
  );
}
