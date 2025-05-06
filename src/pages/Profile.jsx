import React from "react";
import { useUser } from "../context/UserContext";
import "../styles/profile.css";

const Profile = () => {
  const { userData, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found.</p>;

  return (
        <div className="profile-content">
          <div className="profile-header">
            <img
              src={userData.avatar}
              alt="Avatar"
              className="profile-avatar"
            />
            <div>
              <h2>{userData.displayName}</h2>
              <p className="level-label">Level {userData.level}</p>
            </div>
          </div>

          <div className="xp-bar">
            <div
              className="xp-fill"
              style={{ width: `${(userData.xp / 1600) * 100}%` }}
            ></div>
          </div>
          <p className="xp-text">XP: {userData.xp} / 1600</p>

          <div className="stat-cards">
            <div className="stat-card">Streak: 4 days</div>
            <div className="stat-card">Badges: 3</div>
            <div className="stat-card">Rank: #12</div>
          </div>

          <div className="profile-actions">
            <button className="btn-pixel">Start Task</button>
            <button className="btn-pixel">View Badges</button>
            <button className="btn-pixel">Edit Profile</button>
          </div>
        </div>
  );
};

export default Profile;
