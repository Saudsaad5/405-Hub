import { useEffect, useState } from "react";
import { db } from "../services/firebase-config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";
import "../styles/commentmodal.css";

const CommentModal = ({ post, onClose }) => {
  const { userData } = useUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentsRef = collection(db, "posts", post.id, "comments");

  useEffect(() => {
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await addDoc(commentsRef, {
        uid: userData.uid,
        displayName: userData.displayName,
        avatar: userData.avatar,
        text: comment,
        createdAt: serverTimestamp(),
      });

      setComment("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <div className="comment-modal">
      <div className="comment-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="post-details">
          <img src={post.avatar} className="post-avatar" />
          <div>
            <p className="post-name">{post.displayName}</p>
            <p className="post-text">{post.text}</p>
          </div>
        </div>

        <div className="comments-section">
          <h4>Comments</h4>
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <img src={c.avatar} className="comment-avatar" />
              <div>
                <p className="comment-name">{c.displayName}</p>
                <p className="comment-text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="btn-pixel" onClick={handleSubmit}>Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
