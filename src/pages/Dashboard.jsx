import "../styles/dashboard.css";
import TopBar from "../context/TopBar";
import SideBar from "../context/SideBar";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <TopBar />
      <div className="dashboard-body">
        <SideBar />
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard!</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
