import "./grapher.component.scss";
import filterIcon from "../../media/images/filter-icon.svg";

import React, { useState, useEffect } from "react";

function Grapher(props) {
  const [clicked, setClicked] = useState(true);

  async function openFilterPopUp(e) {
    document.querySelector(".App .filter-pop").className = "filter-pop";

    localStorage.setItem("active", props.graphId);

    console.log(document.querySelector(".App .filter-pop.hide"));
  }

  return (
    <div className="grapher">
      <div className="filter">
        <div>
          <h2>{props.title}</h2>
          <img
            onClick={openFilterPopUp}
            src={filterIcon}
            alt="Filter icon"
            className="filter-btn"
          />
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Grapher;
