import { Home, User, BarChart2, Settings, Users, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import './SidebarLeft.css';

export default function SidebarLeft({ activeTab, setActiveTab, onEditProfileClick, followingCreatorsCount, followersCount, savedArticlesCount }) {
  const isHomeView = activeTab === 'Home';
  const showSidebarDetails = activeTab === 'Profile' || activeTab === 'Stats' || activeTab === 'Following' || activeTab === 'Followers' || activeTab === 'Saved';

  // Navigation Items
  const navItems = isHomeView
    ? [
        { name: 'Home', icon: Home },
        { name: 'Profile', icon: User }
      ]
    : [
        { name: 'Home', icon: Home },
        { name: 'Profile', icon: User },
        { name: 'Stats', icon: BarChart2 }
      ];

  // Removed local state since it's lifted to App.jsx



  return (
    <aside className="sidebar-left sidebar-left-custom">
      {/* Navigation List */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <li key={item.name} className="sidebar-nav-item">
                <motion.a
                  href={`#${item.name.toLowerCase()}`}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.name);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon />
                  <span>{item.name}</span>
                </motion.a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Shifting "Following" section directly below Stats link in Left Sidebar when in Profile or Stats section */}
      {showSidebarDetails && (
        <div className="sidebar-details-container">
          
          {/* Following Section Link */}
          <div className="sidebar-link-wrapper">
            <motion.a
              href="#following"
              className={`sidebar-link ${activeTab === 'Following' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Following');
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <User size={18} />
              <span>Following ({followingCreatorsCount})</span>
            </motion.a>
          </div>

          {/* Followers Section Link */}
          <div className="sidebar-link-wrapper-margin">
            <motion.a
              href="#followers"
              className={`sidebar-link ${activeTab === 'Followers' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Followers');
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users size={18} />
              <span>Followers ({followersCount})</span>
            </motion.a>
          </div>

          {/* Saved Section Link directly above Edit Profile */}
          <div className="sidebar-link-wrapper-margin">
            <motion.a
              href="#saved"
              className={`sidebar-link ${activeTab === 'Saved' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Saved');
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Bookmark size={18} />
              <span>Saved ({savedArticlesCount})</span>
            </motion.a>
          </div>

          {/* Edit Profile Section just below Saved */}
          <div className="sidebar-link-wrapper-margin">
            <motion.button
              onClick={onEditProfileClick}
              className="sidebar-link sidebar-button-reset"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings />
              <span>Edit Profile</span>
            </motion.button>
          </div>

        </div>
      )}



    </aside>
  );
}
