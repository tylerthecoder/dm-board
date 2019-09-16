import React, { useState } from "react";
import "./App.css";
import PlayerListCard from "./components/player-list/player-list";
import MonsterCard from "./components/moster/monster";
import { Sidebar } from "./components/sidebar/sidebar";

function App() {
  const [items, setItems] = useState(["Battle Order"]);

  function handleAddingItem(item) {
    const newItems = items.slice(0);

    newItems.push(item);

    setItems(newItems);
  }

  function handleDeleteCard(index) {
    const newItems = items.slice(0);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <div id="app">
      <div id="left-side-panel">
        <Sidebar onAddItem={handleAddingItem} />
      </div>
      <div id="main-content">
        {items.map((item, index) => {
          const props = {
            key: index,
            delete: () => handleDeleteCard(index)
          };
          switch (item) {
            case "Monster":
              return <MonsterCard {...props} />;
            case "Battle Order":
              return <PlayerListCard {...props} />;
            default:
              return <div key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default App;
