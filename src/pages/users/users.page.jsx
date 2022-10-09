import React, { Component, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import Lister from "../../components/lister/lister.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import conversionFunnel from "../../media/images/conversion-funnel.svg";
import wallet from "../../media/images/wallet.svg";
import "./users.page.scss";
import { faker } from "@faker-js/faker";
import { Chart } from "react-google-charts";

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

  const usersData = {
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
  };

  const [totalUsers, setTotalUsers] = useState("1.2K");
  const [userOnboard, setUserOnboard] = useState("347");
  const [expiringSubs, setExpiringSubs] = useState("176");
  return (
    <div className="home">
      <TopBar />

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
        <Grapher graphId="first" title="Total Users and New Users">
          <Line
            data={usersData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </Grapher>
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
      <div className="grid-12">
        <Lister title="Users List"></Lister>
      </div>
    </div>
  );
}

export default Users;
