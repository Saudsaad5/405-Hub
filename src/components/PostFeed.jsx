import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase-config";
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
        <div key={post.id} className="post-card">
          <div className="post-header">
            <img src={post.avatar} alt="Avatar" className="post-avatar" />
            <div>
              <p className="post-name">{post.displayName}</p>
              <p className="post-time">
                {post.createdAt?.toDate().toLocaleString() || "Just now"}
              </p>
            </div>
          </div>
          <p className="post-text">{post.text}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
