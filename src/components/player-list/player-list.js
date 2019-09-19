import React, { useState, useRef, useEffect } from "react";
import "./player-list.css";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import PlayerData from "../../data/players.json";
import { DmCard } from "../shared/dm-card/dm-card";
import { Menu, Button, MenuItem } from "@material-ui/core";

function PlayerRow(props) {
  const name = props.name;
  const textFieldRef = useRef(null);
  const [initiative, setInitiative] = useState(0);
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);

  const blurHandler = () => {
    props.onBlur();
  };

  useEffect(() => {
    const inputElement = textFieldRef.current.querySelector("input");

    if (textFieldRef && textFieldRef.current) {
      inputElement.addEventListener("blur", blurHandler);
    }

    return () => {
      inputElement.removeEventListener("blur", blurHandler);
    };
  });

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
    setMenuAnchorElement(null);
  }

  function handleMenuClose() {
    setMenuAnchorElement(null);
  }

  return (
    <div className="row player-row">
      <p> {name} </p>
      <div>
        <TextField
          label="initiative"
          type="number"
          value={initiative}
          onChange={handleInitiativeChange}
          ref={textFieldRef}
        />
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          tabIndex="-1"
          onClick={event => setMenuAnchorElement(event.currentTarget)}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorElement}
          keepMounted
          open={Boolean(menuAnchorElement)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteButtonClick}>Delete</MenuItem>
          <MenuItem onClick={handleMenuClose}>Move Up</MenuItem>
          <MenuItem onClick={handleMenuClose}>Move Down</MenuItem>
        </Menu>
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

  function sortPlayers() {
    const newPlayers = players.slice(0);
    newPlayers.sort((a, b) => b.initiative - a.initiative);
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
      {players.map((player, index) => (
        <PlayerRow
          key={player.name}
          name={player.name}
          onChange={p => handlePlayersChange(p, index)}
          onDelete={() => handlePlayerDelete(index)}
          onBlur={sortPlayers}
        />
      ))}

      <div className="row end-row">
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
