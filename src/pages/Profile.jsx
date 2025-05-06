import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getDoc } from "firebase/firestore";
import "../styles/profile.css";

const Profile = () => {
  const { userData, loading } = useUser();
  const [showLevelUp, setShowLevelUp] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found.</p>;

  const level = Math.floor(userData.xp / 100);
  const currentXP = userData.xp % 100;
  const progress = (currentXP / 100) * 100;

  useEffect(() => {
    if (!loading && userData) {
      const calcLevel = Math.floor(userData.xp / 100);
      if (calcLevel > userData.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
    }
  }, [userData?.xp]);

  return (
    <>
      {showLevelUp && (
        <div className="level-up-popup">
          🎉 Level Up! You're now level {level}
        </div>
      )}

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
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="xp-text">XP: {currentXP} / 100</p>

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
    </>
  );
};

export default Profile;
