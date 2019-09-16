import React, { useState } from "react";
import "./player-list.css";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

import PlayerData from "../../data/players.json";
import { DmCard } from "../shared/dm-card/dm-card";

function PlayerRow(props) {
  const name = props.name;
  const [initiative, setInitiative] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  function handleInitiativeChange(e) {
    let initiative = Number(e.target.value);

    if (initiative < 0) {
      initiative = 0;
    }

    setInitiative(initiative);

    // send change to parent
    props.onChange({
      name,
      initiative
    });
  }

  function handleDeleteButtonClick() {
    props.onDelete({
      name
    });
  }

  return (
    <div
      className="row"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <p> {name} </p>
      <div>
        <TextField
          label="initiative"
          type="number"
          value={initiative}
          onChange={handleInitiativeChange}
        />
        {showDelete && (
          <Fab size="small" color="primary" onClick={handleDeleteButtonClick}>
            <DeleteIcon />
          </Fab>
        )}
      </div>
    </div>
  );
}

export default function PlayerListCard(props) {
  const formattedPlayerData = PlayerData.names.map(player => {
    return {
      name: player,
      initiative: 0
    };
  });

  const [players, setPlayers] = useState(formattedPlayerData);
  const [name, setName] = useState("");

  function handlePlayersChange(player, index) {
    let newPlayers = players.slice(0);
    newPlayers[index] = player;

    setPlayers(newPlayers);
  }

  function handlePlayerDelete(index) {
    let newPlayers = players.slice(0);

    newPlayers.splice(index, 1);

    setPlayers(newPlayers);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function addPlayer() {
    const player = {
      name,
      initiative: 0
    };
    players.push(player);

    setPlayers(players);
    setName("");
  }

  return (
    <DmCard id="player-list" title="Battle Order" delete={props.delete}>
      {players
        .sort((a, b) => b.initiative - a.initiative)
        .map((player, index) => (
          <PlayerRow
            key={player.name}
            name={player.name}
            onChange={p => handlePlayersChange(p, index)}
            onDelete={() => handlePlayerDelete(index)}
          />
        ))}

      <div className="row">
        <TextField
          value={name}
          onChange={handleNameChange}
          label="New Player Name"
        />
        <button onClick={addPlayer}> Add Player </button>
      </div>
    </DmCard>
  );
}
