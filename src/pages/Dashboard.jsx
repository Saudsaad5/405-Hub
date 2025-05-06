import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import Profile from "./Profile";
import Home from "./Home";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const { userData, loading } = useUser();
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    if (!userData) return <p>Loading...</p>;

    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Leaderboard":
        return <Leaderboard />;
      case "Profile":
        return <Profile />;
      default:
        return <h2>Select a tab</h2>;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="dashboard">
      <TopBar />
      <div className="dashboard-body">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
