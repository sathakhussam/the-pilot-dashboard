import React from "react";
import "./sidebar.component.scss";
import logo from "../../media/images/logo.svg";
import dash_icon_active from "../../media/images/dash-icon-active.svg";
import dash_icon from "../../media/images/dash-icon.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="filter-top"></div>
      <img src={logo} alt="logo" />
      <div className="links">
        <a href="https://google.com">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={dash_icon} alt="icon" className="inactive-image" />
              <img src={dash_icon_active} alt="icon" className="active-image" />
              <p>Dashboard</p>
            </div>
          </div>
        </a>
        <a href="https://google.com">
          <div className="link active">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={dash_icon} alt="icon" className="inactive-image" />
              <img src={dash_icon_active} alt="icon" className="active-image" />
              <p>Dashboard</p>
            </div>
          </div>
        </a>
        <div className="divider"></div>

        <a href="https://google.com">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={dash_icon} alt="icon" className="inactive-image" />
              <img src={dash_icon_active} alt="icon" className="active-image" />
              <p>Dashboard</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
