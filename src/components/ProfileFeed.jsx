import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useUser } from "../context/UserContext";
import PostCard from "./PostCard";
import "../styles/postfeed.css";

const ProfileFeed = () => {
  const [posts, setPosts] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => post.authorId === userData.uid)
      setPosts(userPosts);
    });

    return () => unsubscribe();
  }, [userData]);

  return (
    <div className="post-feed">
      {posts.length === 0 && <p>You haven't posted anything yet.</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfileFeed;
