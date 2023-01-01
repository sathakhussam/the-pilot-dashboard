import "./lister.component.scss";
import filterIcon from "../../media/images/filter-icon.svg";
import searchIcon from "../../media/images/search-icon.svg";
import React, { useState, useEffect } from "react";
import threeDots from "../../media/images/three-dots.svg";
import sampleImage from "../../media/images/sample.png";
import { Link } from "react-router-dom";

function Lister(props) {
  const [clicked, setClicked] = useState(true);

  async function openFilterPopUp(e) {
    document.querySelector(".App .filter-pop").className = "filter-pop";

    localStorage.setItem("active", props.graphId);

    console.log(document.querySelector(".App .filter-pop.hide"));
  }

  return (
    <div className="lister">
      <div className="filter">
        <div>
          <div className="head-sub">
            <h2>{props.title}</h2>
            <div className="searchBar">
              <img src={searchIcon} alt="search-icon" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <img
            onClick={openFilterPopUp}
            src={filterIcon}
            alt="Filter icon"
            className="filter-btn"
          />
        </div>
      </div>
      <table>
        <tr className="">
          <th>User</th>
          <th>Subscription Status</th>
          <th>User Since</th>
          <th>Subscriber Since</th>
          <th>User Status</th>
          <th></th>
        </tr>
        <tr className="">
          <td>
            <Link to="/users/id">
              <div>
                <img src={sampleImage} alt="Profile Image" />
                <p>Robert Fox</p>
              </div>
            </Link>
          </td>
          <td className="tablet green">Paid</td>
          <td>12 May 2022</td>
          <td>12 May 2022</td>
          <td className="tablet red">active</td>
          <td>
            <img src={threeDots} alt="Three dots" />
          </td>
        </tr>
      </table>
      {/* {props.children} */}
    </div>
  );
}

export default Lister;
