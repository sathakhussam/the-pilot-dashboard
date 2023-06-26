import './integration.scss'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SubIntegration = ({source,name,call,time,callPerUser,imgContainerStyle})=>{
    return <div className='subintegration'>
        <div style={imgContainerStyle?imgContainerStyle:{
            background: "linear-gradient(180deg, #E4656D 0%, #C13B51 100%)",
            boxShadow: "inset -1px -1px 4px #64003C, inset 1px 1px 0px rgba(255, 255, 255, 0.53)",
            borderRadius: "20px"           
        }} className='imgContainer'> 
            <img src={source} alt={name}/>
        </div>
        <h2>{name}</h2>
        <div className='details'>
            <div className='detail'>
                <p>No. of calls</p>
                <p style={{color:'#8BC8B3'}}><ArrowDropUpIcon/><span>{call}</span></p>
            </div>
            <div className='detail'>
                <p>Average Time</p>
                <p style={{color:'#EF4358'}}><ArrowDropDownIcon/><span>{time}</span></p>
            </div>
            <div className='detail'>
                <p>No. of calls/ user</p>
                <p style={{color:'#8BC8B3'}}><ArrowDropUpIcon/> <span>{callPerUser}</span></p>
            </div>
        </div>
    </div>
}


export default SubIntegration