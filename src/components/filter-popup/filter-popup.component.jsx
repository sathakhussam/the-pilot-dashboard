import React, { useEffect, useState } from "react";

import closeIcon from "../../media/images/close-icon.svg";
import "./filter-popup.component.scss";
import { useCookies } from "react-cookie";

function addZeros(totalLength, value) {
  if (totalLength - String(value).length <= 0) {
    return String(value);
  } else {
    return `${"0".repeat(totalLength - String(value).length)}${String(value)}`;
  }
}

function FilterPopup(props) {
  const [customClicked, setCustomClicked] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cookie] = useCookies([])
  const [radio,setRadio] = useState('')
  const [name,setName] = useState(cookie['active'])
  function closeFilterPopUp(e) {
    if (!e.target.className.includes("filter-pop")) return;
    e.target.className = "filter-pop hide";

    localStorage.setItem("active", "");
  }
  function closeFilterPopUpButton(e) {
    e.target.parentElement.parentElement.parentElement.className =
      "filter-pop hide";

    localStorage.setItem("active", ""); 
  }

  function onFilterSubmit(e) {
    e.preventDefault();

    // if (!document.querySelector('input[type="radio"]:checked')) {
    //   const snackbar = document.querySelector("#snackbar");
    //   snackbar.innerHTML = "Please choose a filter value";
    //   snackbar.className = "";
    //   setTimeout(() => {
    //     snackbar.className = "hide";
    //     snackbar.innerHTML = "";
    //   }, 2500);
    // }
    if (
      document.querySelector('input[type="radio"]:checked').value != "custom"
    ) {
      localStorage.setItem(
        localStorage.getItem("active"),
        JSON.stringify({
          type: document.querySelector('input[type="radio"]:checked').value,
        })
      );
      console.log('123')
      props.changeVariable(prevValue=>{
          console.log(localStorage.getItem("active"),JSON.parse(localStorage.getItem(localStorage.getItem("active"))).type);
          return{
            ...prevValue,
            [localStorage.getItem("active")]:JSON.parse(localStorage.getItem(localStorage.getItem("active"))).type,
          }
        })
      document.querySelector(".filter-pop").className = "filter-pop hide";

      localStorage.setItem("active", "");
    } else {
      if (!fromDate || !toDate || new Date(fromDate) > new Date(toDate)) {
        const snackbar = document.querySelector("#snackbar");
        snackbar.innerHTML =
          "Please fill in the from date, to date and the to date should be after the from date";
        snackbar.className = "";
        setTimeout(() => {
          snackbar.className = "hide";
          snackbar.innerHTML = "";
        }, 2500);
      }
      localStorage.setItem(
        localStorage.getItem("active"),
        JSON.stringify({
          type: document.querySelector('input[type="radio"]:checked').value,
          fromDate: `${addZeros(2, new Date(fromDate).getDate())}/${addZeros(
            2,
            new Date(fromDate).getMonth() + 1
          )}/${addZeros(4, new Date(fromDate).getFullYear())}`,
          toDate: `${addZeros(2, new Date(toDate).getDate())}/${addZeros(
            2,
            new Date(toDate).getMonth() + 1
          )}/${addZeros(4, new Date(toDate).getFullYear())}`,
        })
      );

      props.changeVariable(prevValue=>{
        return{
          ...prevValue,
          [`${localStorage.getItem("active")}From`]:JSON.parse(localStorage.getItem(localStorage.getItem("active"))).fromDate,
          [`${localStorage.getItem("active")}To`]:JSON.parse(localStorage.getItem(localStorage.getItem("active"))).toDate,
        }
      })
      localStorage.setItem("active", "");
      document.querySelector(".filter-pop").className = "filter-pop hide";
    }
  }

  // useEffect(()=>{
  //   if (
  //     radio != "custom"
  //   ){
  //     console.log(cookie['active']);
  //     props.changeVariable(prevValue=>{
  //       var newValue = prevValue
  //       newValue[cookie['active']]=radio
  //       return newValue
  //     })
  //   }else{
  //     console.log(radio)
  //   }
  // },[radio])
  return (
    <div onClick={closeFilterPopUp} className="filter-pop hide">
      <div className="idchk"></div>
      <div className="background">
        <div className="top">
          <h3>Choose option to filter by</h3>
          <img
            src={closeIcon}
            alt="Close icon"
            onClick={closeFilterPopUpButton}
            className="close-icon"
          />
        </div>
        <div className="content">
          <form onSubmit={onFilterSubmit}>
            <div>
              <input
                onClick={() => {
                  setCustomClicked(false)
                  setRadio('week')
                }}
                type="radio"
                name="typeD"
                value="week"
              />
              <span>Week</span>
            </div>
            <div>
              <input
                onClick={() => {
                  setCustomClicked(false)
                  setRadio('month')
                }}
                type="radio"
                name="typeD"
                value="month"
              />
              <span>Month</span>
            </div>
            <div>
              <input
                onClick={() => {
                  setCustomClicked(false)
                  setRadio('year')
                }}
                type="radio"
                name="typeD"
                value="year"
              />
              <span>Year</span>
            </div>
            <div>
              <input
                onClick={() => {
                  setRadio('custom')
                  setCustomClicked(true)
                }}
                type="radio"
                name="typeD"
                value="custom"
              />
              <span>Custom</span>
            </div>

            {customClicked == true ? (
              <div className="customDates">
                <div>
                  <span>From Date</span>
                  <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <span>To Date</span>
                  <input
                    type="date"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
