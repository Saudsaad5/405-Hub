import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { toast } from "react-toastify";

export const handleGitHubLogin = async (navigate) => {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const profile = result.additionalUserInfo?.profile;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: profile?.name || user.displayName || "Unknown",
        email: user.email || "",
        avatar: profile?.avatar_url || user.photoURL || "",
        bio: "",
        xp: 0,
        level: 1,
        followers: [],
        following: [],
        joinedAt: serverTimestamp()
      });
    }

    toast.success("Signed in! 🚀");
    navigate("/dashboard");
  } catch (error) {
    toast.error("GitHub login failed: " + error.message);
  }
};
