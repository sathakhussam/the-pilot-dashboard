import React, { Component, useEffect, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import "./user-seperate.page.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MockPhoto from '../../media/images/person.jpeg'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallIcon from '@mui/icons-material/Call';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AirAsia from '../../media/images/AirAsia.png'
import { useLocation, useNavigate } from "react-router-dom";
import AirIndiaExpress from '../../media/images/air_logos/AirIndiaExpress.jpg'
import Alliance from '../../media/images/air_logos/Alliance.jpeg'
import SpiceJet from '../../media/images/air_logos/SpiceJet.png'
import GoAir from '../../media/images/air_logos/goair-agencies.jpg'
import Indigo from '../../media/images/air_logos/indigo.jpeg'
import AirIndia from '../../media/images/air_logos/AirIndia.png'
import Vistara from '../../media/images/air_logos/vistara.png'

function UserSeparate() {
  const navigator = useNavigate()
  const location = useLocation()
  const {user} = location.state
  const {subscription} = user
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  useEffect(()=>{
    console.log(user)
    console.log(subscription);
  },[])
  const QuireStatus = user.tickets

  const logos = {
    "indigo":Indigo,
    "airIndia":AirIndia,
    "airIndiaExpress":AirIndiaExpress,
    "goAir":GoAir,
    "vistara":Vistara,
    "airAsia":AirAsia,
    "spiceJet":SpiceJet,
    "allianceAir":Alliance
  }

  return (
    <div className="userSeperate">
      <TopBar />
      <div className="mainDiv">
        <div className="leftSide">
          <div className="nameDiv">
            <ArrowBackIcon onClick={()=>{
              navigator('/users')
            }}/>
            <p className="h3">{user?.firstName} {user?.secondName}</p>
          </div>
          <div className="top">
            <div className="bg-grey">
              <p className="h3">Subcription</p>
              <div className="slider" />
              {subscription?<>
              <p className="h4">Current Plan</p>
              <p>Next payment of ₹{subscription.amount} ({subscription.plan}) occurs on {monthNames[new Date(subscription.paidAt).getMonth()+1]} {new Date(subscription.paidAt).getDate()},{new Date(subscription.paidAt).getFullYear()}.</p>
              <div className="bg-light-grey">
                <p className="h4">{subscription.plan}</p>
                <p>₹ {subscription.amount} Charged every month</p>
              </div>
              </>:<p>No current active plan</p>}
            </div>
            <div className="bg-grey">
              <p className="h3">Airline details</p>
              <div className="slider" />
              <table className="airline-detail">
                <tbody>
                  <tr>
                    <td>Airline</td>
                    <td>
                      <div className="airline-detail-single">
                        <img src={user&&logos[user.airline]} alt="Airline Image" />
                        <p>{user?.airline}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>
                      <div className="airline-detail-single" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <p style={{textAlign:'center'}}>{user?.firstName} {user?.secondName}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bottom">
            <div className="bg-grey">
              <p className="h3">Quire status</p>
              <div className="slider" />
              <table cellSpacing={0}>
                <thead>
                  <th>Topic</th>
                  <th>Quire no</th>
                  <th>Status</th>
                  <th>Date created</th>
                </thead>
                <tbody>
                  {QuireStatus.map((status,index)=>{
                    return <tr style={{backgroundColor:index%2!=0?'#000000':'transparent'}}>
                      <td>{status.subject}</td>
                      <td>{status.user}</td>
                      <td><div className={status.resolved?'status green':'status red'}>{status.resolved?'Resolved':'Pending'}</div></td>
                      <td>{new Date(status.createdAt).getDate()} {monthNames[new Date(status.createdAt).getDate()]} {new Date(status.createdAt).getFullYear()}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="userDetails bg-grey">
          <div className="innerUserMain">
          <img className="profileImageSeperateuser" src={user.profileImageUrl?'http://'+user.profileImageUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt="Profile Image" />
            <h2>{user?.firstName} {user?.secondName}</h2>
            <button><ErrorOutlineIcon/> <span>Block</span></button>
          </div>
          <div className="details">
            <h3>Details</h3>
            
            <div className="profile">
              <div className="profileItem">
                <div className="iconHolder">
                  <AccessTimeIcon />
                </div>
                <div>
                  <p className="detailName">User Since</p>
                  <p className="subDetail">{new Date(user.createdAt)?.getDate()} {monthNames[new Date(user.createdAt)?.getMonth()]} {new Date(user.createdAt)?.getFullYear()}</p>
                </div>
              </div>
           
              <div className="profileItem">
                <div className="iconHolder">
                  <LocationOnIcon />
                </div>
                <div>
                  <p className="detailName">Address</p>
                  <p className="subDetail">{user?.homeBase} {user?.homeCountry}</p>
                </div>
              </div>
            
              <div className="profileItem">
                <div className="iconHolder">
                  <EmailOutlinedIcon />
                </div>
                <div>
                  <p className="detailName">Email</p>
                  <p className="subDetail">{user?.email}</p>
                </div>
              </div>
            
              <div className="profileItem">
                <div className="iconHolder">
                  <CallIcon />
                </div>
                <div>
                  <p className="detailName">Mobile</p>
                  <p className="subDetail">+92 3476363577</p>
                </div>
              </div>
            
              <div className="profileItem">
                <div className="iconHolder">
                  <StarBorderIcon />
                </div>
                <div>
                  <p className="detailName">Subscribes Since</p>
                  <p className="subDetail">{new Date(user.createdAt)?.getDate()} {monthNames[new Date(user.createdAt)?.getMonth()]} {new Date(user.createdAt)?.getFullYear()}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSeparate;
