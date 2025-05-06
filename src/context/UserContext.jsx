import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || "Unknown",
            email: user.email || "",
            avatar: user.photoURL || "",
            bio: "",
            xp: 0,
            level: 1,
            followers: [],
            following: [],
            joinedAt: serverTimestamp()
          });
        }

        const unsubscribeDoc = onSnapshot(
          userRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              setUserData(null);
              console.warn("⚠️ No user doc found after creation?");
            }
            setLoading(false);
          },
          (error) => {
            console.error("🔥 Firestore error:", error);
            setUserData(null);
            setLoading(false);
          }
        );

        return () => unsubscribeDoc();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
