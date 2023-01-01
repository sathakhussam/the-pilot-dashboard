import React, { Component, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import "./user-seperate.page.scss";

import backIcon from "./../../media/images/back-icon.svg";

function UserSeparate() {
  return (
    <div className="home">
      <TopBar />
      <div className="nameDiv">
        <img src={backIcon} alt="Back Icon" />
        <p className="h3">Saravanan</p>
      </div>

      <div className="bg-grey">
        <p className="h3">Subcription</p>
        <div className="slider" />
        <p className="h3">Current Plan</p>
        <p>Next payment of $6.49 (Yearly) occurs on June 1, 2022.</p>
        <div className="bg-light-grey">
          <p className="h4">CURRENT PLAN</p>
          <p>$6.49 Charged every month</p>
        </div>
      </div>
      <div className="bg-grey">
        <p className="h3">Airline details</p>
        <div className="slider" />
        <div className="single">
          <p>Airline</p>
          <div className="airline-detail-single">
            <img src="" alt="Airline Image" />
            <p>Air Asia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSeparate;
