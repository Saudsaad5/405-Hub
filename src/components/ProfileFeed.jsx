import { useEffect, useState } from "react";
import {collection,query,onSnapshot,orderBy,doc,updateDoc,arrayUnion,arrayRemove,increment,getDoc,} from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useUser } from "../context/UserContext";
import CommentModal from "./CommentModal";
import "../styles/postfeed.css";

const ProfileFeed = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => post.uid === userData.uid);
      setPosts(userPosts);
    });

    return () => unsubscribe();
  }, [userData]);

  const handleLike = async (post) => {
    if (!userData) return;

    const postRef = doc(db, "posts", post.id);
    const hasLiked = post.likes?.includes(userData.uid);

    try {
      const authorRef = doc(db, "users", post.uid);
      const authorSnap = await getDoc(authorRef);
      const authorData = authorSnap.exists() ? authorSnap.data() : null;

      if (!authorData) return;

      const currentXP = authorData.xp || 0;
      const currentLevel = authorData.level || 0;

      if (hasLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(userData.uid),
          likeCount: increment(-1),
        });

        if (post.uid !== userData.uid) {
          const newXP = Math.max(currentXP - 10, 0);
          const prevThreshold = Math.floor(currentXP / 100);
          const newThreshold = Math.floor(newXP / 100);

          await updateDoc(authorRef, {
            xp: newXP,
            ...(newThreshold < prevThreshold && { level: increment(-1) }),
          });
        }
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(userData.uid),
          likeCount: increment(1),
        });

        if (post.uid !== userData.uid) {
          const newXP = currentXP + 10;
          const prevThreshold = Math.floor(currentXP / 100);
          const newThreshold = Math.floor(newXP / 100);

          await updateDoc(authorRef, {
            xp: newXP,
            ...(newThreshold > prevThreshold && { level: increment(1) }),
          });
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="post-feed">
      <h2>My Posts</h2>
      {posts.length === 0 && <p>You haven't posted anything yet.</p>}
      {posts.map((post) => {
        const hasLiked = post.likes?.includes(userData?.uid);

        return (
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
            <div className="post-actions">
              <button
                className={`like-btn ${hasLiked ? "liked" : ""}`}
                onClick={() => handleLike(post)}
              >
                ❤️ {post.likeCount || 0}
              </button>
              <button
                className="comment-btn"
                onClick={() => setActivePost(post)}
              >
                💬 Comment
              </button>
            </div>
          </div>
        );
      })}

      {activePost && (
        <CommentModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </div>
  );
};

export default ProfileFeed;
