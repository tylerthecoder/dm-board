import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import "./sidebar.css";

export function Sidebar(props) {
  const things = ["Battle Order", "Monster"];

  function handleClick(item) {
    props.onAddItem(item);
  }

  return (
    <div id="sidebar">
      {things.map(thing => (
        <div className="flex-row" key={thing}>
          <h3>{thing}</h3>
          <Fab size="small" color="primary" onClick={() => handleClick(thing)}>
            <AddIcon />
          </Fab>
        </div>
      ))}
    </div>
  );
}
