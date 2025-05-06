import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../services/firebase-config";
import PostCard from "./PostCard";
import "../styles/postfeed.css";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="post-feed">
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
