import "../styles/dashboard.css";
import TopBar from "../context/TopBar";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <TopBar />
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
