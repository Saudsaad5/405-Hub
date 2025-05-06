import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import "../styles/Home.css";
import PostUploader from "../components/PostUploader";
import PostFeed from "../components/PostFeed";

const Home = () => {
  const { userData, loading } = useUser();
  const [showUploader, setShowUploader] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found.</p>;

  return (
    <div className="home-content">
      <div className="header">
        <div className="community-info">
          <div className="community-avatar"></div>
          <div>
            <h2 className="community-name">Community Name</h2>
            <p className="community-tagline">something cool</p>
          </div>
        </div>
        <div className="user-profile">
          <img src={userData.avatar} alt="Avatar" className="user-avatar" />
          <div className="user-level">level: {userData.level}</div>
        </div>
      </div>

      {/* Post Button */}
      <div className="post-btn-container">
        <button className="btn-pixel" onClick={() => setShowUploader(true)}>
          + Post
        </button>
      </div>

      {/* Post Modal */}
      {showUploader && (
        <div className="post-modal">
          <div className="post-modal-content">
            <button className="close-btn" onClick={() => setShowUploader(false)}>✖</button>
            <PostUploader onPost={() => setShowUploader(false)} />
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="Posts">
        <PostFeed />
      </div>
    </div>
  );
};

export default Home;
