import React, { Component, useEffect, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import Lister from "../../components/lister/lister.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import conversionFunnel from "../../media/images/conversion-funnel.svg";
import wallet from "../../media/images/wallet.svg";
import "./users.page.scss";
import { faker } from "@faker-js/faker";
import { Chart } from "react-google-charts";
import { useCookies } from "react-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import url,{countryCodes} from "../urls";
import FilterPopup from "../../components/filter-popup/filter-popup.component";

function Users() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const [cookies,setCookies] = useCookies([])
  const [usersLabel, setUsersLabel] = useState([
    "1 Jan",
    "2 Jan",
    "3 Jan",
    "4 Jan",
    "5 Jan",
    "6 Jan",
    "7 Jan",
  ]);
  const [mapData, setMapData] = useState([
    ["State", "Users"],
    ["IN-KL", "100"],
    ["IN-TN", "350"],
    ["IN-AP", "75"],
    ["IN-MH", "225"],
  ]);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Set", "Oct", "Nov", "Dec"
];
  const [urlBody,setUrlBody] = useState({})
  const [usersData,setUserData] = useState({
    labels: usersLabel,
    datasets: [
      {
        label: "Free Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        borderColor: "#A06AF9",
        backgroundColor: "#A06AF9",
      },
      {
        label: "Subscribed Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        borderColor: "#FBA3FF",
        backgroundColor: "#FBA3FF",
      },
      {
        label: "Total Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        borderColor: "#246BFD",
        backgroundColor: "#246BFD",
      },
      {
        label: "Active Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        borderColor: "#8BC8B3",
        backgroundColor: "#8BC8B3",
      },
    ],
  });

  const [totalUsers, setTotalUsers] = useState("1.2K");
  const [userOnboard, setUserOnboard] = useState("347");
  const [expiringSubs, setExpiringSubs] = useState("176");
  const [usersList,setUsersList] = useState([])

  useEffect(()=>{
    const getData = async ()=>{
      const response = await axios.post(`${url}/api/v1/admin/users`,urlBody,{
        headers:{
          Authorization:`Bearer ${cookies.AuthToken}`
        }
      })
      setTotalUsers(response.data.data.totalNoOfUsers);
      setExpiringSubs(response.data.data.expiringSubs)
      setUsersList(response.data.data.usersList)
      setUserOnboard(response.data.data.newUserOnboardMonth)
      setUserData({
        labels: response.data.data.userStats.map(stats=>`${new Date(stats.date).getDate()} ${monthNames[new Date(stats.date).getMonth()]}`),
        datasets: [
          {
            label: "Free Users",
            data: response.data.data.userStats.map(stats=>stats.freeUsers),
            borderColor: "#A06AF9",
            backgroundColor: "#A06AF9",
          },
          {
            label: "Subscribed Users",
            data: response.data.data.userStats.map(stats=>stats.subscribedUsers),
            borderColor: "#FBA3FF",
            backgroundColor: "#FBA3FF",
          },
          {
            label: "Total Users",
            data: response.data.data.userStats.map(stats=>stats.totalUsers),
            borderColor: "#246BFD",
            backgroundColor: "#246BFD",
          },
          {
            label: "Active Users",
            data: response.data.data.userStats.map(stats=>stats.activeUsers),
            borderColor: "#8BC8B3",
            backgroundColor: "#8BC8B3",
          },
        ],
      })
      console.log(response.data.data);
      var states = Object.keys(response.data.data.userCountry)
      var noOfUsers = Object.values(response.data.data.userCountry)
      var userCountry = states.map((state,i)=>[countryCodes[state],noOfUsers[i]])
      console.log(userCountry);
      setMapData([
        ['State','Users'],
        ...userCountry
      ])
    }

    getData()
  },[urlBody])
  return (
    <div className="userSingle">
      <TopBar />
      <FilterPopup changeVariable={setUrlBody} />
      <div className="infos">
        <div className="info">
          <img src={totalUsersIcon} alt="total-users-icon" />
          <div>
            <p className="highlight">{totalUsers}</p>
            <p className="explaination">Total Users</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={conversionFunnel} alt="total-users-icon" />
          <div>
            <p className="highlight">{userOnboard}</p>
            <p className="explaination">Users Onboarded This Month</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={wallet} alt="total-users-icon" />
          <div>
            <p className="highlight">{expiringSubs}</p>
            <p className="explaination">Expiring subscriptions</p>
          </div>
        </div>
      </div>
      <div className="grid-64">
        <div className="line-graph">
          <Grapher graphId="first" title="Total Users and New Users">
            <Line
              data={usersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels:{
                      font:{
                        size:10
                      }
                    }
                  },
                },
                scales:{
                  yAxes:{
                        min: 0
                    }
                }
              }}
            />
          </Grapher>
        </div>
        <div className="doughnut">
          <Grapher graphId="first" title="Users By Region">
            <Chart
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                    const region = mapData[selection[0].row + 1];
                    console.log("Selected : " + region);
                  },
                },
              ]}
              options={{
                region: "IN", // Africa
                resolution: "provinces",
                backgroundColor: "#0f0f0f",
                datalessRegionColor: "#262B2D",
                colorAxis: { colors: ["#262B2D", "#262B2D", "#8BC8B3"] },
              }}
              chartType="GeoChart"
              width="100%"
              height="300px"
              data={mapData}
            />
          </Grapher>
        </div>
      </div>
      <div className="grid-12 with-lister">
        <Lister title="Users List" usersList={usersList}></Lister>
      </div>
    </div>
  );
}

export default Users;
