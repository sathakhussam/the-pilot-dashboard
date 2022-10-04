import React, { useState } from "react";

import closeIcon from "../../media/images/close-icon.svg";
import "./filter-popup.component.scss";

function addZeros(totalLength, value) {
  if (totalLength - String(value).length <= 0) {
    return String(value);
  } else {
    return `${"0".repeat(totalLength - String(value).length)}${String(value)}`;
  }
}

function FilterPopup() {
  const [customClicked, setCustomClicked] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

    if (!document.querySelector('input[type="radio"]:checked')) {
      const snackbar = document.querySelector("#snackbar");
      snackbar.innerHTML = "Please choose a filter value";
      snackbar.className = "";
      setTimeout(() => {
        snackbar.className = "hide";
        snackbar.innerHTML = "";
      }, 2500);
    }
    if (
      document.querySelector('input[type="radio"]:checked').value != "custom"
    ) {
      localStorage.setItem(
        localStorage.getItem("active"),
        JSON.stringify({
          type: document.querySelector('input[type="radio"]:checked').value,
        })
      );
      localStorage.setItem("active", "");
      document.querySelector(".filter-pop").className = "filter-pop hide";
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
      localStorage.setItem("active", "");
      document.querySelector(".filter-pop").className = "filter-pop hide";
    }
  }
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
                onClick={() => setCustomClicked(false)}
                type="radio"
                name="typeD"
                value="week"
              />
              <span>Week</span>
            </div>
            <div>
              <input
                onClick={() => setCustomClicked(false)}
                type="radio"
                name="typeD"
                value="month"
              />
              <span>Month</span>
            </div>
            <div>
              <input
                onClick={() => setCustomClicked(false)}
                type="radio"
                name="typeD"
                value="year"
              />
              <span>Year</span>
            </div>
            <div>
              <input
                onClick={() => setCustomClicked(true)}
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
