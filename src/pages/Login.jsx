import { auth } from "../services/firebase-config";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/login.css";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("GitHub login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">WELCOME TO 405 HUB</h1>
      <button onClick={handleGitHubLogin} className="btn-pixel">
        <FaGithub style={{ marginRight: "10px", verticalAlign: "middle" }} />
        Sign in with GitHub
      </button>
    </div>
  );
};

export default Login;
