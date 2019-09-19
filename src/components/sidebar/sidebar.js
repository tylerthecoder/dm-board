import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import "./sidebar.css";
import Monsters from "../../data/monster.json";
import PlayerListCard from "../player-list/player-list";

console.log(Monsters);

const cards = [
  {
    name: "Battle Order",
    html: <PlayerListCard />
  },
  {
    name: "Monster",
    types: [
      {
        name: "Goblin",
        html: Monsters.goblin
      }
    ]
  }
];

function addRow(props) {
  const card = props.card;
  return (
    <div className="flex-row" key={card}>
      <h3>{card.name}</h3>
      <Fab size="small" color="primary" onClick={() => card.onClick(card.html)}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export function Sidebar(props) {
  function handleClick(item) {
    props.onAddItem(item);
  }

  return (
    <div id="sidebar">
      {cards.map(thing => (
        <div>
          <addRow card={thing} />
          {thing.types && thing.types.map(card => <addRow card={card} />)}
        </div>
      ))}
    </div>
  );
}
