import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, increment, getDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useUser } from "../context/UserContext";
import CommentModal from "./CommentModal";

export default function PostCard({ post }) {
  const [activePost, setActivePost] = useState(null);
  const { userData } = useUser();

  const handleLike = async () => {
    if (!userData) return;

    const postRef = doc(db, "posts", post.id);
    const hasLiked = post.likes?.includes(userData.uid);

    try {
      const authorRef = doc(db, "users", post.uid);
      const authorSnap = await getDoc(authorRef);
      const authorData = authorSnap.exists() ? authorSnap.data() : null;

      if (!authorData) return;

      const currentXP = authorData.xp || 0;
      const prevThreshold = Math.floor(currentXP / 100);
      const newXP = hasLiked ? Math.max(currentXP - 10, 0) : currentXP + 10;
      const newThreshold = Math.floor(newXP / 100);

      await updateDoc(postRef, {
        likes: hasLiked ? arrayRemove(userData.uid) : arrayUnion(userData.uid),
        likeCount: increment(hasLiked ? -1 : 1),
      });

      if (post.uid !== userData.uid) {
        await updateDoc(authorRef, {
          xp: newXP,
          ...(newThreshold !== prevThreshold && {
            level: increment(newThreshold > prevThreshold ? 1 : -1),
          }),
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const hasLiked = post.likes?.includes(userData?.uid);

  return (
    
      <div className="post-card">
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
            onClick={handleLike}
          >
            ❤️ {post.likeCount || 0}
          </button>
          <button className="comment-btn" onClick={() => setActivePost(post)}>
            💬 Comment
          </button>
        </div>
        {activePost && (
        <CommentModal post={activePost} onClose={() => setActivePost(null)} />
      )}
      </div>

      
    
  );
}