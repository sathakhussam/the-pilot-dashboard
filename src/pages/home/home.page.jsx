import './home.page.scss'
import React, { Component, useEffect, useState } from "react";
import TopBar from "../../components/topbar/topbar.component";
import Grapher from "../../components/grapher/grapher.component";
import totalUsersIcon from "../../media/images/total-users-icon.svg";
import conversionFunnel from "../../media/images/conversion-funnel.svg";
import wallet from "../../media/images/wallet.svg";
import { faker } from "@faker-js/faker";
import { Chart } from "react-google-charts";
import axios from 'axios'
import { useCookies } from 'react-cookie';
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
import FilterPopup from '../../components/filter-popup/filter-popup.component';

import { Bar, Line, Doughnut } from "react-chartjs-2";
import url,{countryCodes} from '../urls';

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
        label: "Total Users",
        data: usersLabel.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        borderColor: "#246BFD",
        backgroundColor: "#246BFD",
      },
    ],
  });

  const [urlBody,setUrlBody]= useState({
    userCountry:'year'
  },)
  const [revenueLabel, setRevenueLabel] = useState([
    "1 Jan",
    "2 Jan",
    "3 Jan",
    "4 Jan",
    "5 Jan",
    "6 Jan",
    "7 Jan",
  ]);
  const [revenueValue,setRevenueValue] = useState( revenueLabel.map(() =>
  faker.datatype.number({ min: 0, max: 1000 })
))
  const revenueData = {
    labels: revenueLabel,
    datasets: [
      {
        label: "Revenue",
        fill: true,
        data:revenueValue,
        borderColor: "#A06AF9",
        backgroundColor: "rgba(160, 106, 249, 0.13)",
      },
    ],
  };
  
  const [timeData,setTimeData] = useState({
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
    ]
  });
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [totalUsers, setTotalUsers] = useState("1.2K");
  const [conversionRate, setConversionRate] = useState("78.8%");
  const [revenueRate, setRevenueRate] = useState("₹200K");
  const [cookies,setCookies] = useCookies([])
  useEffect(()=>{
    const getData = async ()=>{
      console.log(urlBody);
      const response = await axios.post(`${url}/api/v1/admin`,urlBody,{headers:{
        Authorization:`Bearer ${cookies.AuthToken}`
      }})
      console.log(urlBody);
      setRevenueLabel([])
      setRevenueValue([])
      setConversionRate(Number(response.data.data.conversionRate).toFixed(2)+'%');
      setTotalUsers(response.data.data.totalNoOfUsers);
      setRevenueRate("₹"+response.data.data.totalRevenueThisMonth);
      console.log(response.data.data)
      setTimeData({
        labels: Object.keys(response.data.data.timeSpent),
        datasets: [
          {
            label: "Time Data",
            data: Object.values(response.data.data.timeSpent),
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
      })

      response.data.data.revenue.map((data)=>{
        var dateuuuu = new Date(data.date);
        console.log(dateuuuu.getTime());
        if(!dateuuuu.getTime()){
          setRevenueLabel(prevValue=>[...prevValue,data.date])
        }else{
          setRevenueLabel(prevValue=>[...prevValue,new Date(data.date).getDate()+' '+monthNames[new Date(data.date).getMonth()]])
        }
        setRevenueValue(prevValue=>[...prevValue,data.amount])
      })

      setUserData({
        labels: response.data.data.userStats.map((data)=>{
          var dateuuuu = new Date(data.date);
          console.log(dateuuuu.getTime());
          if(!dateuuuu.getTime()){
            return data.date
          }else{
            return new Date(data.date).getDate()+' '+monthNames[new Date(data.date).getMonth()]
          }
        
        }),
        datasets: [
          {
            label: "New Users",
            data: response.data.data.userStats.map((data)=>{return data.newUsers}),
            borderColor: "#A06AF9",
            backgroundColor: "#A06AF9",
          },
          {
            label: "Total Users",
            data: response.data.data.userStats.map((data)=>{return data.totalUsers}),
            borderColor: "#246BFD",
            backgroundColor: "#246BFD",
          },
        ],
      })
      console.log(response.data.data.userCountry)
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
    <div className="home">
      <TopBar />
      <FilterPopup changeVariable={setUrlBody}/>

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
            <p className="highlight">{conversionRate}</p>
            <p className="explaination">Conversion Rate</p>
          </div>
        </div>
        <div className="divider" />
        <div className="info">
          <img src={wallet} alt="total-users-icon" />
          <div>
            <p className="highlight">{revenueRate}</p>
            <p className="explaination">Total Revenue</p>
          </div>
        </div>
      </div>
      <div className="grid-64">
        <div className="bar">
          <Grapher  style={{
          width:'100%',
          height:'100%'
        }} graphId="userStats" title="Total Users and New Users" propertyChange={setUrlBody} propertyName={"userStats"}>
            <Line
              data={usersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  yAxis: {
                    min: 0
                  }
                }
              }}
            />
          </Grapher>
        </div>
        <div className="doughnut exception">
          <Grapher style={{
        }} graphId="userCountry" title="Users By Region" propertyChange={setUrlBody} propertyName={"userCountry"}>
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
      <div className="grid-64 v2">
        <div className="bar">
          <Grapher graphId="revenue" title="Revenue" propertyChange={setUrlBody} propertyName={"revenue"}>
            <Line
              data={revenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales:{
                  yAxis:{
                    min:0
                  }
                }
              }}
            />
          </Grapher>
        </div>
        <div className="doughnut">
          <Grapher graphId="first" title="Users By Region" >
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
    </div>
  );
}

export default Home;
