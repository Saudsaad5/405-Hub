import "../styles/TopBar.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";
import { toast } from "react-toastify";

const TopBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out!");
            navigate("/"); // back to login page
        } catch (error) {
            toast.error("Logout failed.");
            console.error(error);
        }
    };
  
    return (
      <div className="topbar">
        <div className="topbar-left">
          <h1>🚀 405 Hub</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };
  
  export default TopBar;