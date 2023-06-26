import "./lister.component.scss";
import filterIcon from "../../media/images/filter-icon.svg";
import searchIcon from "../../media/images/search-icon.svg";
import React, { useState, useEffect } from "react";
import threeDots from "../../media/images/three-dots.svg";
import sampleImage from "../../media/images/sample.png";
import { Link } from "react-router-dom";

function Lister({graphId,usersList,style,title}) {
  const [clicked, setClicked] = useState(true);
  const [search,setSearch] = useState("")
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const [users,setUsers] = useState(usersList)

  async function openFilterPopUp(e) {
    document.querySelector(".App .filter-pop").className = "filter-pop";

    localStorage.setItem("active",graphId);

    console.log(document.querySelector(".App .filter-pop.hide"));
  }

  useEffect(()=>{
    console.log(usersList);
    setUsers(usersList)
  },[usersList])
  const handleChange =async  e=>{
    
    if(search.length<1){
      setUsers(usersList)
    }else{
      setUsers(prevValue => prevValue.filter(user=> (user.firstName + user.secondName).toLowerCase().indexOf(search) > -1) )
    }
    await setSearch(e.target.value)
    
  }
  return (
    <div className="lister">
      <div className="filter">
        <div>
          <div className="head-sub">
            <h2>{title}</h2>
            <div className="searchBar">
              <img src={searchIcon} alt="search-icon" />
              <input type="text" placeholder="Search" onChange={handleChange} value={search} />
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
        <thead>
          <tr className="">
            <th scope="col">Profile</th>
            <th scope="col">User</th>
            <th scope="col">Subscription Status</th>
            <th scope="col">User Since</th>
            <th scope="col">Subscriber Since</th>
            <th scope="col">User Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user)=>{
            return   <Link to="/users/id" state={{user:user}}>
            <tr>
              <td data-label="Profile"><img className="profileImageSeperateuser" src={user.profileImageUrl?'http://'+user.profileImageUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt="Profile Image" /></td>  
              <td data-label="User">
                    <p>{user.firstName} {user.secondName}</p>
              </td>
              <td data-label="Subscription Status" ><div className={`tablet ${user.subscription?'green':'red'}`}>{user.subscription?'Paid':'Not paid'}</div></td>
              <td data-label="User Since" >{new Date(user.createdAt)?.getDate()} {monthNames[new Date(user.createdAt)?.getMonth()]} {new Date(user.createdAt)?.getFullYear()}</td>
              <td data-label="Subscriber Since">{new Date(user.createdAt)?.getDate()} {monthNames[new Date(user.createdAt)?.getMonth()]} {new Date(user.createdAt)?.getFullYear()}</td>
              <td data-label="User Status"><div className={`tablet ${user.status==="active"?'green':'red'}`}>{user.status}</div></td>
              <td>
                <img src={threeDots} alt="Three dots" />
              </td>
              
          </tr>
          </Link>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Lister;
