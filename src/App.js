import "./App.css";
import Sidebar from "./components/sidebar/sidebar.component";
import Home from "./pages/home/home.page";
import Users from "./pages/users/users.page";
import UserSeparate from "./pages/user-seperate/user-seperate.page";
import RevenuePage from "./pages/revenue/revenue.page";
import { Route, Routes, useLocation } from "react-router-dom";
import Integration from "./pages/integration/integrations";
import {useCookies} from 'react-cookie'
import Login from "./pages/login/Login";
import { UserProvider } from "./utils/UserContext";
import { useEffect } from "react";

function App() {
  const [cookie] = useCookies([])
  const location = useLocation()
  useEffect(()=>{
    console.log(location);
  },[])
  return (
    <div className="App">
      <UserProvider>
      <div id="snackbar" className="hide">
        <p>Hi</p>
      </div>
      {location.pathname!=='/'&&<Sidebar />}
      <div className={location.pathname!=='/'?"main-content":""}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <>
          <Route path="/home" element={<Home />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/id" element={<UserSeparate />} />
          <Route exact path="/integrations" element={<Integration />} />
          </>
        </Routes>
      </div>
      </UserProvider>
    </div>
  );
}

export default App;

// document.querySelector('input[type="radio"]:checked') ? (
//                 document.querySelector('input[type="radio"]:checked').value
//               ) : "" == "custom"
