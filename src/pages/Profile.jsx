import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ProfileFeed from "../components/ProfileFeed";
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
          <img src={userData.avatar} alt="Avatar" className="profile-avatar"/>
          <div  className="profile-info">
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

        <div className="profile-posts">
          <h2>My Posts</h2>
          <ProfileFeed />
        </div>
      </div>
    </>
  );
};

export default Profile;
