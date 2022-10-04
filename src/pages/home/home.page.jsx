import React, { Component, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import "./home.page.scss";
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

function Home() {
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
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#A06AF9",
        backgroundColor: "#A06AF9",
      },
      {
        label: "Subscribed Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#FBA3FF",
        backgroundColor: "#FBA3FF",
      },
      {
        label: "Total Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#246BFD",
        backgroundColor: "#246BFD",
      },
      {
        label: "Active Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#8BC8B3",
        backgroundColor: "#8BC8B3",
      },
    ],
  };

  const [revenueLabel, setRevenueLabel] = useState([
    "1 Jan",
    "2 Jan",
    "3 Jan",
    "4 Jan",
    "5 Jan",
    "6 Jan",
    "7 Jan",
  ]);
  const revenueData = {
    labels: revenueLabel,
    datasets: [
      {
        label: "Revenue",
        fill: true,
        data: revenueLabel.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "#A06AF9",
        backgroundColor: "rgba(160, 106, 249, 0.13)",
      },
    ],
  };
  const timeData = {
    labels: ["Roster", "Weather", "WX Map", "Notams", "Safebox", "Home"],
    datasets: [
      {
        label: "Time Data",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#246BFD",
          "#EDEF00",
          "#FBA3FF",
          "#A06AF9",
          "#F96A6A",
          "#8BC8B3",
        ],
        borderColor: [
          "#246BFD",
          "#EDEF00",
          "#FBA3FF",
          "#A06AF9",
          "#F96A6A",
          "#8BC8B3",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="home">
      <TopBar />

      <div className="infos">
        <div className="info">
          <img src={totalUsersIcon} alt="total-users-icon" />
          <div>
            <p className="highlight">1.2K</p>
            <p className="explaination">Total Users</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={totalUsersIcon} alt="total-users-icon" />
          <div>
            <p className="highlight">78.8%</p>
            <p className="explaination">Conversion Rate</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={totalUsersIcon} alt="total-users-icon" />
          <div>
            <p className="highlight">$200K</p>
            <p className="explaination">Total Revenue</p>
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
            height="400px"
            data={mapData}
          />
        </Grapher>
      </div>
      <div className="grid-64">
        <Grapher graphId="first" title="Revenue">
          <Line
            data={revenueData}
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
          <Doughnut
            data={timeData}
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
      </div>
    </div>
  );
}

export default Home;
