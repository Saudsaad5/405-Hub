import React from "react";
import { useUser } from "../context/UserContext";
import "../styles/Home.css";

const Home = () => {
    const { userData, loading } = useUser();
    
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
                    <img src={userData.avatar} alt="Avatar" className="user-avatar"/>
                    <div className="user-level">level: {userData.level} </div>
                </div>
            </div>
        <h1>Welcome, {userData.displayName}!</h1>
        <p>Your current level: {userData.level}</p>
        <p>Your current XP: {userData.xp}</p>
        </div>
    );
}

export default Home;