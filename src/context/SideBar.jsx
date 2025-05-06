import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-options">
        <li>
          <NavLink to="/dashboard" className="sidebar-option">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="sidebar-option">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="sidebar-option">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className="sidebar-option">
            Help
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
