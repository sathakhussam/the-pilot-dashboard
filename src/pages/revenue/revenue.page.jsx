import React, { Component, useEffect, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import conversionFunnel from "../../media/images/conversion-funnel.svg";
import wallet from "../../media/images/wallet.svg";
import "./revenue.page.scss";
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
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import { height } from "@mui/system";
import axios from "axios";
import url,{countryCodes} from "../urls";
import FilterPopup from "../../components/filter-popup/filter-popup.component";

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

  const [revenueLabel, setRevenueLabel] = useState([]);
  const [revenueValue,setRevenueValue] = useState([])

  const revenueData = {
    labels: revenueLabel,
    datasets: [
      {
        label: "Revenue",
        data:revenueValue,
        backgroundColor: "#A06AF9",
      },
    ],
  };

  const [userData,setUserData] = useState({
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
  })

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
  const [cookies,setCookies] = useCookies([])
  const [urlBody,setUrlBody] = useState({})
  useEffect(()=>{
    const getData = async ()=>{
      setRevenueLabel([])
      setRevenueValue([])
      const response = await axios.post(`${url}/api/v1/admin/revenue`,urlBody,{
        headers:{
          Authorization:`Bearer ${cookies.AuthToken}`
        }
      })
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      setConversionRate(Number(response.data.data.conversionRate).toFixed(2)+'%');
      setTotalRevenue('₹'+response.data.data.totalRevenue)
      setPayingUsers(response.data.data.payingUsers)
      console.log(response.data.data)
      response.data.data.revenue.map((revenu)=>{
        var dateuuuu = new Date(revenu.date);
        console.log(dateuuuu.getTime());
        if(!dateuuuu.getTime()){
          setRevenueLabel(prevValue=>[...prevValue,revenu.date])
        }else{
          setRevenueLabel(prevValue=>[...prevValue,new Date(revenu.date).getDate()+' '+monthNames[new Date(revenu.date).getMonth()]])
        }
        setRevenueValue(prevValue=>[...prevValue,revenu.amount])
      })

      setUserData({
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
      })
      var states = Object.keys(response.data.data.region)
      var noOfUsers = Object.values(response.data.data.region)
      var userCountry = states.map((state,i)=>[countryCodes[state],noOfUsers[i]])

      setMapData([
        ['State','Users'],
        ...userCountry
      ])
      // setMapData([
      //   ["State", "Users"],
      //   ["IN-KL", "10"],
      //   ["IN-TN", "30"]
      // ])
    }

    getData()
  },[urlBody])
  return (
    <div className="revenue">
      <TopBar />
      <FilterPopup changeVariable={setUrlBody} />
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
        <div className="bar">
          <Grapher graphId="revenue" title="Total Revenue by Subscriptions">
            <Bar data={revenueData} />
          </Grapher>
        </div>
        <div className="dougnut">
          <Grapher graphId="subscription" title="User Status">
            <Doughnut data={userData} />
          </Grapher>
        </div>
      </div>
      <div className="grid-12">
        <Grapher style={{
          width:'100%',
          height:'100%',
          position:'relative'
        }} graphId="userMapData" title="Revenue by Region">
          <Chart
            style={{
              width:'100%',
              height:"100%"
            }
            }
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
