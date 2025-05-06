import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";


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
