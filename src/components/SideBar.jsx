import "../styles/SideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-options">
                <li className="sidebar-option">Home</li>
                <li className="sidebar-option">Profile</li>
                <li className="sidebar-option">Settings</li>
                <li className="sidebar-option">Help</li>
            </ul>
        </div>
    );
    }   

export default SideBar;