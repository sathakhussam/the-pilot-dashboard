import './notificationModal.scss'

const NotificationModal = ({notifactions})=>{
    
    return <div className="notificationModal">
        <ul>
            <hr />
            {notifactions.length>0?notifactions.map((notifaction)=>{
                return <><li>{notifaction}</li><hr/></>
            }):<h4>No notifications</h4>}
        </ul>
    </div>
}

export default NotificationModal