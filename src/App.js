import "./App.css";
import FilterPopup from "./components/filter-popup/filter-popup.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Home from "./pages/home/home.page";
import Users from "./pages/users/users.page";
import RevenuePage from "./pages/revenue/revenue.page";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div id="snackbar" className="hide">
        <p>Hi</p>
      </div>
      <FilterPopup />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// document.querySelector('input[type="radio"]:checked') ? (
//                 document.querySelector('input[type="radio"]:checked').value
//               ) : "" == "custom"
