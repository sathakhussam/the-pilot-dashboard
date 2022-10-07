import React from "react";
import "./sidebar.component.scss";
import logo from "../../media/images/logo.svg";
import dash_icon_active from "../../media/images/dash-icon-active.svg";
import dash_icon from "../../media/images/dash-icon.svg";
import revenue_icon from "../../media/images/revenue-sidebar.svg";
import integrations_icon from "../../media/images/integrations-sidebar.svg";
import analytics_icon from "../../media/images/analytics-sidebar.svg";
import settings_icon from "../../media/images/settings-sidebar.svg";
import users_icon from "../../media/images/users-sidebar.svg";
import revenue_icon_active from "../../media/images/revenue-sidebar-active.svg";
import integrations_icon_active from "../../media/images/integrations-sidebar-active.svg";
import analytics_icon_active from "../../media/images/analytics-sidebar-active.svg";
import settings_icon_active from "../../media/images/settings-sidebar-active.svg";
import users_icon_active from "../../media/images/users-sidebar-active.svg";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="filter-top"></div>
      <img src={logo} alt="logo" />
      <div className="links">
        <NavLink end activeClassName="active" to="/">
          <div className="link active">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={dash_icon} alt="icon" className="inactive-image" />
              <img src={dash_icon_active} alt="icon" className="active-image" />
              <p>Dashboard</p>
            </div>
          </div>
        </NavLink>
        <NavLink end activeClassName="active" to="/revenue">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={revenue_icon} alt="icon" className="inactive-image" />
              <img
                src={revenue_icon_active}
                alt="icon"
                className="active-image"
              />
              <p>Revenue</p>
            </div>
          </div>
        </NavLink>
        <NavLink end activeClassName="active" to="/integrations">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img
                src={integrations_icon}
                alt="icon"
                className="inactive-image"
              />
              <img
                src={integrations_icon_active}
                alt="icon"
                className="active-image"
              />
              <p>Integrations</p>
            </div>
          </div>
        </NavLink>
        <NavLink end activeClassName="active" to="/users">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={users_icon} alt="icon" className="inactive-image" />
              <img
                src={users_icon_active}
                alt="icon"
                className="active-image"
              />
              <p>Users</p>
            </div>
          </div>
        </NavLink>
        <NavLink end activeClassName="active" to="/analytics">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={analytics_icon} alt="icon" className="inactive-image" />
              <img
                src={analytics_icon_active}
                alt="icon"
                className="active-image"
              />
              <p>Analytics</p>
            </div>
          </div>
        </NavLink>
        <div className="divider"></div>

        <NavLink end activeClassName="active" to="/settings">
          <div className="link">
            <div className="sider"></div>
            <div className="sider-next">
              <img src={settings_icon} alt="icon" className="inactive-image" />
              <img
                src={settings_icon_active}
                alt="icon"
                className="active-image"
              />
              <p>Settings</p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
