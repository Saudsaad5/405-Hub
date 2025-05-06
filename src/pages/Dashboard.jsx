import "../styles/dashboard.css";
import TopBar from "../context/TopBar";
import SideBar from "../context/SideBar";
import { useUser } from "../context/UserContext"; // ✅ using context

const Dashboard = () => {
  const { userData, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="dashboard">
      <TopBar />
      <div className="dashboard-body">
        <SideBar />
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard!</h1>
          <p>👋 Hello, {userData.displayName}!</p>
          <p>Level: {userData.level}</p>
          <p>XP: {userData.xp}</p>
          <img
            src={userData.avatar}
            alt="Avatar"
            width="80"
            style={{ borderRadius: "50%", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
