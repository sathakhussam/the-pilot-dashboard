import React, { Component, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import conversionFunnel from "../../media/images/conversion-funnel.svg";
import wallet from "../../media/images/wallet.svg";
import "./revenue.page.scss";
import { faker } from "@faker-js/faker";
import { Chart } from "react-google-charts";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
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
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

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
        data: revenueLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "#A06AF9",
      },
    ],
  };

  const userData = {
    labels: ["Subscribed", "Free"],
    datasets: [
      {
        label: "# of Users",
        data: [12, 3],
        backgroundColor: ["#246BFD", "#8BC8B3"],
        borderColor: ["#246BFD", "#8BC8B3"],
        borderWidth: 1,
      },
    ],
  };

  const [mapData, setMapData] = useState([
    ["State", "Users"],
    ["IN-KL", "100"],
    ["IN-TN", "350"],
    ["IN-AP", "75"],
    ["IN-MH", "225"],
  ]);
  const [totalRevenue, setTotalRevenue] = useState("$200K");
  const [conversionRate, setConversionRate] = useState("78.8%");
  const [payingUsers, setPayingUsers] = useState("1.2K");
  return (
    <div className="home">
      <TopBar />

      <div className="infos">
        <div className="info">
          <img src={wallet} alt="total-users-icon" />
          <div>
            <p className="highlight">{totalRevenue}</p>
            <p className="explaination">Total Revenue</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={conversionFunnel} alt="total-users-icon" />
          <div>
            <p className="highlight">{conversionRate}</p>
            <p className="explaination">Conversion Rate</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={totalUsersIcon} alt="total-users-icon" />
          <div>
            <p className="highlight">{payingUsers}</p>
            <p className="explaination">Paying Users</p>
          </div>
        </div>
      </div>
      <div className="grid-64">
        <Grapher graphId="revenueChart" title="Total Revenue by Subscriptions">
          <Bar data={revenueData} />
        </Grapher>
        <Grapher graphId="usersData" title="User Status">
          <Doughnut data={userData} />
        </Grapher>
      </div>
      <div className="grid-12">
        <Grapher graphId="userMapData" title="Revenue by Region">
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
              colorAxis: {
                colors: ["#246BFD", "#FBA3FF", "##A06AF9", "#237D5E"],
              },
            }}
            chartType="GeoChart"
            width="100%"
            data={mapData}
          />
        </Grapher>
      </div>
    </div>
  );
}

export default Home;
