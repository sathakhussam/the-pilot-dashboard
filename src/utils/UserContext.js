import { useState,createContext } from "react";
import { useCookies } from "react-cookie";


const UserContext = createContext({
    username:'',
    profileImage:'',
    email:''
})


const UserProvider = ({children})=>{
    const [cookie] = useCookies([])
    const [user,setUser] = useState({
        username:cookie.Username,
        profileImage:cookie.profile,
        email:cookie.email
    })

    const value = {user,setUser}
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContext
export {UserProvider}