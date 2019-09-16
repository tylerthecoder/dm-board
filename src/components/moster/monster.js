import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./monster.css";
import { DmCard } from "../shared/dm-card/dm-card";

export default function MonsterCard(props) {
  const [name, changeName] = useState("");
  const [ac, changeAc] = useState(0);
  const [hp, changeHp] = useState(10);

  function handleNameChange(e) {
    changeName(e.target.value);
  }

  function handleAc(e) {
    changeAc(e.target.value);
  }

  function handleHp(e) {
    changeHp(e.target.value);
  }

  return (
    <DmCard delete={props.delete} className="monsterCard">
      <TextField
        id="monster-name-input"
        label="Monster Name"
        InputProps={{
          classes: {
            input: "monster-name-input",
            root: "row"
          }
        }}
        value={name}
        onChange={handleNameChange}
        fullWidth
      />

      <div className="row">
        <p> AC: </p>
        <TextField type="number" value={ac} onChange={handleAc} />
      </div>

      <div className="row">
        <p> HP: </p>
        <TextField type="number" value={hp} onChange={handleHp} />
      </div>
    </DmCard>
  );
}
