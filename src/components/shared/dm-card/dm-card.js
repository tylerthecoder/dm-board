import React from "react";
import "./dm-card.css";

export function DmCard(props) {
  return (
    <div className="dm-card">
      <div className="header">
        {props.title && <h1> {props.title} </h1>}
        <button className="x" onClick={props.delete}>
          {" "}
          X{" "}
        </button>
      </div>

      <div id={props.id} className={props.className}>
        {props.children}
      </div>
    </div>
  );
}
