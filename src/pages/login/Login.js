import "./Login.scss";
import Logo from "../../media/images/logo.svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import url from '../urls'
import { useCookies } from "react-cookie";
import { useNavigate, useNavigation } from "react-router-dom";
import UserContext from "../../utils/UserContext";

const Login = ()=>{
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [cookies,setCookies] = useCookies([])
    const {user,setUser} = useContext(UserContext)
    const [err,setErr] = useState("")
    const VERSION = "v1"
    let navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
           
            try{
                const response = await axios.post(`${url}/api/${VERSION}/users/login`,{
                    "email": userName,
                    "password": password,
                    "firebaseToken": "hii"
                })

                if(response.status===200){
                    console.log(response.data);
                    setCookies('AuthToken',response.data.token);
                    setCookies('Username',`${response.data.data.firstName} ${response.data.data.secondName}`)
                    setCookies('email',response.data.data.email)
                    setCookies('profile',`http://${response.data.data.profileImageUrl}`)
                    setUser({
                        username:`${response.data.data.firstName} ${response.data.data.secondName}`,
                        email:response.data.data.email,
                        profileImage:`http://${response.data.data.profileImageUrl}`
                    })
                    navigate('/home')
                }else{
                    setErr('Invalid credentials')
                }
            }catch(err){
                setErr('Invalid credentials')
            }
    }

    useEffect(()=>{
        if(cookies.AuthToken) navigate('/home')
    },[])
    return <div className="login">
        <div className="innerDiv">
            <img src={Logo} alt="Logo"/>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="username" onChange={e=>setUserName(e.target.value)} value={userName}/>
                <input name="password" type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} value={password}/>
                <p className="error">{err&&err}</p>
                <input type="submit" placeholder="submit" />
            </form>
            
        </div>
    </div> 
}

export default Login