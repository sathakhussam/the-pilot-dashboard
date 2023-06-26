import React, { useContext, useEffect, useState } from "react";
import searchIcon from "../../media/images/search-icon.svg";
import profileImage from "../../media/images/profile-preview.png";
import dropdownArrow from "../../media/images/dropdown-arrow.svg";
import notificationBell from "../../media/images/notification-bell.svg";
import "./topbar.component.scss";
import UserContext from "../../utils/UserContext";
import NotificationModal from "../notification/notificationModal";
import axios from "axios";
import url,{countryCodes} from '../../pages/urls';
import { useCookies } from "react-cookie";

function TopBar() {
  const {user} = useContext(UserContext)
  const [notifications,setNotifications] = useState(["Fly the plane","Park the plane"])
  const [showNotifications,setShowNotifications] = useState(false)
  const [cookies,setCookies] = useCookies(['user'])
  useEffect(()=>{
    const getNotification = async ()=>{
      const response = await axios.get(`${url}/api/v1/users/notifications`,{headers:{
        Authorization:`Bearer ${cookies.AuthToken}`
      }})
      setNotifications(response.data.data);
    }
    getNotification()

  },[cookies])

  return (
    <div className="topbar">
      <div>
        <div className="notifications">
          <div>
            <img src={notificationBell} alt="Notification Icon" onClick={()=>setShowNotifications(!showNotifications)} 
            // onMouseEnter={()=>setShowNotifications(true)} onMouseLeave={()=>setShowNotifications(false)} 
            />
            {notifications.length>0&&<p className="noOfNotifications">{notifications.length}</p>}
            {showNotifications&&<NotificationModal notifactions={notifications}/>}
          </div>
        </div>

        <div className="profile">
          <img src={user.profileImage.includes('undefined')?'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png':user.profileImages} alt="profile-image" className="profileImage"/>
          <p className="userName">{user.username}</p>
          <img src={dropdownArrow} alt="dropdown" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
