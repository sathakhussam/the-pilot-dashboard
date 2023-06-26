import "./grapher.component.scss";
import filterIcon from "../../media/images/filter-icon.svg";

import React, { useState, useEffect } from "react";
import FilterPopup from "../filter-popup/filter-popup.component";
import { useCookies } from "react-cookie";

function Grapher({children,graphId,propertyName,propertyChange,style,title}) {
  const [clicked, setClicked] = useState(true);
  const [showModal,setShowModal] = useState(false)
  const [cookie,setCookie] = useCookies([])

  async function openFilterPopUp(e) {
    document.querySelector(".App .filter-pop").className = "filter-pop";
    localStorage.setItem("active", graphId);
    setCookie('active',graphId)
    console.log(graphId);
    console.log(document.querySelector(".App .filter-pop.hide"));
  }
  console.log(style);

  return (
    <div style={style} className="grapher">
      <div className="filter">
        <div>
          <h2>{title}</h2>
          <img
            onClick={(e)=>{
              openFilterPopUp(e)
              setShowModal(true)
            }}
            src={filterIcon}
            alt="Filter icon"
            className="filter-btn"
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export default Grapher;
