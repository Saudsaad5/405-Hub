import "../styles/SideBar.css";

const SideBar = ({activeTab, setActiveTab}) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    
  return (
    <div className="sidebar">
      <ul className="sidebar-options">
      <li className={`sidebar-option ${activeTab === 'Home' ? 'active' : ''}`}
        onClick={() => handleTabClick('Home')}>
            Home</li>

        <li className={`sidebar-option ${activeTab === 'leader board' ? 'active' : ''}`}
        onClick={() => handleTabClick('leader board')}>
            leader board</li>

        <li className={`sidebar-option ${activeTab === 'Profile' ? 'active' : ''}`}
        onClick={() => handleTabClick('Profile')}>
            Profile</li>
      </ul>
    </div>
  );
};

export default SideBar;