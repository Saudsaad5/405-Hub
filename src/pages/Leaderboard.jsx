import React from "react";
import "../styles/leaderboard.css";
export default function Leaderboard() {
    const users = [
      { id: 1, name: "Saud Saad", avatar: "https://i.pravatar.cc/40?img=1", xp: 1600 },
      { id: 2, name: "ورع", avatar: "https://i.pravatar.cc/40?img=2", xp: 1450 },
      { id: 3, name: "Omar Zain", avatar: "https://i.pravatar.cc/40?img=3", xp: 1300 },
    ];
  
    return (
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">🏆 Leaderboard</h1>
        {users.map((user, index) => (
          <div key={user.id} className="leaderboard-entry">
            <div className="entry-left">
              <span className="entry-rank">#{index + 1}</span>
              <img src={user.avatar} alt={user.name} className="entry-avatar" />
              <span className="entry-name">{user.name}</span>
            </div>
            <span className="entry-xp">{user.xp} XP</span>
          </div>
        ))}
      </div>
    );
  }  