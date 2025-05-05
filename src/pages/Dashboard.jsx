import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/dashboard.css";


const Dashboard = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to 405 Hub 🚀</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
