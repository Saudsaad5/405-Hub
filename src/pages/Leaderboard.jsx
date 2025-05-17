import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../services/firebase-config";
import "../styles/leaderboard.css";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      {users.map((user, index) => (
        <div key={user.id} className="leaderboard-entry">
          <div className="entry-left">
            <span className="entry-rank">#{index + 1}</span>
            <img
              src={user.avatar || "https://i.pravatar.cc/40"}
              alt={user.displayName || "User"}
              className="entry-avatar"
            />
            <span className="entry-name">{user.displayName || "Unnamed"}</span>
          </div>
          <span className="entry-xp">Level {user.level} : {user.xp || 0} XP</span>
        </div>
      ))}
    </div>
  );
}