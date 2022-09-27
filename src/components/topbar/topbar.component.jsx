import React from "react";
import searchIcon from "../../media/images/search-icon.svg";
import profileImage from "../../media/images/profile-preview.png";
import dropdownArrow from "../../media/images/dropdown-arrow.svg";
import notificationBell from "../../media/images/notification-bell.svg";
import "./topbar.component.scss";

function TopBar() {
  return (
    <div className="topbar">
      <div className="searchBar">
        <img src={searchIcon} alt="search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      <div>
        <div className="notifications">
          <div>
            <img src={notificationBell} alt="Notification Icon" />
            <p className="noOfNotifications">5</p>
          </div>
        </div>

        <div className="profile">
          <img src={profileImage} alt="profile-image" />
          <p className="userName">Olivia James</p>
          <img src={dropdownArrow} alt="dropdown" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
