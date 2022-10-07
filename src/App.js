import "./App.css";
import FilterPopup from "./components/filter-popup/filter-popup.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Home from "./pages/home/home.page";
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
        </Routes>
      </div>
    </div>
  );
}

export default App;

// document.querySelector('input[type="radio"]:checked') ? (
//                 document.querySelector('input[type="radio"]:checked').value
//               ) : "" == "custom"
