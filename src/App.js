import "./App.css";
import Sidebar from "./components/sidebar/sidebar.component";
import Home from "./pages/home/home.page";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Home />
      </div>
    </div>
  );
}

export default App;
