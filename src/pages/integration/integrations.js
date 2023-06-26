import './integrations.scss'
import TopBar from "../../components/topbar/topbar.component"
import SubIntegration from '../../components/integration/integration.component'
import Calender from '../../media/images/calendar2.png'
import Weather from '../../media/images/weather.png'
import Radar from '../../media/images/radar.png'
import Flight from '../../media/images/flight.png'
import Cone from '../../media/images/cone.png'
import Box from '../../media/images/box.png' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../urls';
import { useCookies } from 'react-cookie'

const Integration = () =>{
    const [roosterValue,setRoosterValue] = useState({
        noOfCalls:0,
        noOfCallsPerUser:0,
        averageTime:0
    })
    const [wxnoatm,setWxNoAtm] = useState({
        noOfCalls:0,
        noOfCallsPerUser:0,
        averageTime:0
    })

    const [flightTracking,setFlightTracking] = useState({
        noOfCalls:0,
        noOfCallsPerUser:0,
        averageTime:0
    })

    const [safeBox,setSafeBox] = useState({
        noOfCalls:0,
        noOfCallsPerUser:0,
        averageTime:0
    })
    const [cookies,setCookies] = useCookies([])
    useEffect(()=>{
        const getData = async ()=>{
            const response = await axios.post(`${url}/api/v1/admin/integrations`,{},{
                headers:{
                  Authorization:`Bearer ${cookies.AuthToken}`
                }
              })
              console.log(response.data);
              setRoosterValue({
                noOfCalls:response.data.data.roster.calls.length,
                noOfCallsPerUser:Number(response.data.data.roster.noOfCallsPerUser).toFixed(2),
                averageTime:String(response.data.data.roster.averageTime).split('h')[0]+'h'+Number(String(response.data.data.roster.averageTime).split('h')[1].split('min')[0]).toFixed(0)+'min'
              })

              setWxNoAtm({
                noOfCalls:response.data.data.wxnotams.calls.length,
                noOfCallsPerUser:Number(response.data.data.wxnotams.noOfCallsPerUser).toFixed(2),
                averageTime:String(response.data.data["wxnotams"].averageTime).split('h')[0]+'h'+Number(String(response.data.data["wxnotams"].averageTime).split('h')[1].split('min')[0]).toFixed(0)+'min'
              })
              
              setFlightTracking({
                noOfCalls:response.data.data["flight-tracking"].calls.length,
                noOfCallsPerUser:Number(response.data.data["flight-tracking"].noOfCallsPerUser).toFixed(2),
                averageTime:String(response.data.data["flight-tracking"].averageTime).split('h')[0]+'h'+Number(String(response.data.data["flight-tracking"].averageTime).split('h')[1].split('min')[0]).toFixed(0)+'min'
              })

              setSafeBox({
                noOfCalls:response.data.data.storage.calls.length,
                noOfCallsPerUser:Number(response.data.data.storage.noOfCallsPerUser).toFixed(2),
                averageTime:String(response.data.data["storage"].averageTime).split('h')[0]+'h'+Number(String(response.data.data["storage"].averageTime).split('h')[1].split('min')[0]).toFixed(0)+'min'
              })
              
            
        }
        getData()
    },[])

    return <div className='integration'>
        <TopBar />
        <input className='theSelector' type="button" placeholder="button"/> 
        <div className='contents'>
            <SubIntegration source={Calender} name={"Roster"}  call={roosterValue.noOfCalls} time={roosterValue.averageTime} callPerUser={roosterValue.noOfCallsPerUser}/>
            <SubIntegration source={Weather} imgContainerStyle={{
                background: "linear-gradient(157.75deg, #EFC602 4.48%, #EF8702 85.48%)",
                boxShadow: "inset -1px -1px 4px #642400, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
                borderRadius: "20px"
                }
            } name={"Weather"}  call={wxnoatm.noOfCalls} time={wxnoatm.averageTime} callPerUser={wxnoatm.noOfCallsPerUser}/>
            <SubIntegration
             source={Radar}
             name={"WX map"} imgContainerStyle={{
                background: "#E8EEEA",
                boxShadow: "inset -1px -1px 4px #001048, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
                borderRadius: "20px"
            }}  call={wxnoatm.noOfCalls} time={wxnoatm.averageTime} callPerUser={wxnoatm.noOfCallsPerUser}/>
            <SubIntegration 
             source={Cone} name={"Notam"}  imgContainerStyle={{
                background: "linear-gradient(161.9deg, #FFB900 15.39%, #D86900 76.01%)",
                boxShadow: "inset -1px -1px 4px #001048, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
                borderRadius: "20px"
             }} call={wxnoatm.noOfCalls} time={wxnoatm.averageTime} callPerUser={wxnoatm.noOfCallsPerUser}/>
             <SubIntegration source={Box} name={"Safe box"} imgContainerStyle={{
                background: "linear-gradient(180deg, #48AFD8 0%, #0E62A8 100%)",
                boxShadow: "inset -1px -1px 4px #001048, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
                borderRadius: "20px"
             }} call={safeBox.noOfCalls} time={safeBox.averageTime} callPerUser={safeBox.noOfCallsPerUser}/>
             <SubIntegration source={Flight} name={"Flight Tracking"} 
             imgContainerStyle={{
                background: "linear-gradient(180deg, #9292F6 0%, #7171E6 100%)",
                boxShadow: "inset -1px -1px 4px #001048, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
                borderRadius:"20px"
             }}
             call={flightTracking.noOfCalls} time={flightTracking.averageTime} callPerUser={flightTracking.noOfCallsPerUser}/>
        </div>
    </div>
}

export default Integration