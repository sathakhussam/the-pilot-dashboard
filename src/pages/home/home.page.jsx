import React, { Component } from "react";
import TopBar from "../../components/topbar/topbar.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import "./home.page.scss";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <TopBar />

        <div className="infos">
          <div className="info">
            <img src={totalUsersIcon} alt="total-users-icon" />
            <div>
              <p className="highlight">1.2K</p>
              <p className="explaination">Total Users</p>
            </div>
          </div>
          <div className="divider" />
          <div className="info">
            <img src={totalUsersIcon} alt="total-users-icon" />
            <div>
              <p className="highlight">78.8%</p>
              <p className="explaination">Conversion Rate</p>
            </div>
          </div>
          <div className="divider" />
          <div className="info">
            <img src={totalUsersIcon} alt="total-users-icon" />
            <div>
              <p className="highlight">$200K</p>
              <p className="explaination">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
