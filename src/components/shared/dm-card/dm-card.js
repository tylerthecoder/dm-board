import React from "react";
import "./dm-card.css";

export function DmCard(props) {
  return (
    <div class="dm-card">
      <div className="header">
        {props.title && <h1> {props.title} </h1>}
        <button onClick={props.delete}> X </button>
      </div>

      <div id={props.id} className={props.className}>
        {props.children}
      </div>
    </div>
  );
}
