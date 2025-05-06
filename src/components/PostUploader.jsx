import { useState } from "react";
import { db } from "../services/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "../styles/postuploader.css";

const PostUploader = () => {
  const { userData } = useUser();
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text.");
      return;
    }

    setUploading(true);

    try {
      await addDoc(collection(db, "posts"), {
        authorId: userData.uid,
        displayName: userData.displayName,
        avatar: userData.avatar,
        text,
        createdAt: serverTimestamp(),
      });

      toast.success("Post created!");
      setText("");
      if (typeof onPost === "function") onPost();
    } catch (err) {
      console.error("❌ Error creating post:", err);
      toast.error("Failed to post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="post-uploader">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button className="btn-pixel" onClick={handlePost} disabled={uploading}>
        {uploading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default PostUploader;
