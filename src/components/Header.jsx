import React, { useState } from 'react';
import { Search, PenSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath, getBasePath } from '../utils/paths';

export default function Header({ activeTab, setActiveTab, userProfile, searchQuery, setSearchQuery }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  const isHomeView = activeTab === 'Home';

  return (
    <header className="header">
      <div className="header-left">
        <motion.a 
          href={getBasePath()} 
          className="logo-text"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('Home');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <img 
            src={getImagePath('/images/logo.png')} 
            alt="Scholr Logo" 
            style={{ height: '32px', width: 'auto', display: 'block' }} 
          />
          <span>Scholr</span>
        </motion.a>
        
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search articles, projects, tutorials..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'Home' && activeTab !== 'Saved') {
                setActiveTab('Home');
              }
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      <div className="header-right">
        <motion.a 
          href="#write" 
          className="write-link"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('Write');
          }}
          whileHover={{ color: '#111111' }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PenSquare size={16} strokeWidth={2} />
          <span>Write</span>
        </motion.a>

        {/* When user clicks on rightmost profile icon, navigate to Profile view */}
        <div 
          style={{ position: 'relative' }} 
          onMouseEnter={() => setIsHoveringProfile(true)}
          onMouseLeave={() => setIsHoveringProfile(false)}
        >
          <motion.button 
            className="user-avatar-btn"
            onClick={() => setActiveTab('Profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={userProfile ? userProfile.avatar : getImagePath('/images/avatar_user.png')} 
              alt="User Avatar" 
              className="user-avatar"
            />
          </motion.button>
          
          <AnimatePresence>
            {isHoveringProfile && userProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '12px',
                  width: '300px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
                  zIndex: 100,
                  cursor: 'default',
                  border: '1px solid #f1f5f9',
                  textAlign: 'left'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <img 
                      src={userProfile.avatar || getImagePath('/images/avatar_user.png')} 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-green-light)' }}
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                        {userProfile.name}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>he/him</span>
                    </div>
                    {userProfile.headline && (
                      <div style={{ 
                        fontSize: '13px', 
                        color: 'var(--primary-green)', 
                        fontWeight: '600', 
                        lineHeight: '1.4' 
                      }}>
                        {userProfile.headline}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                      1 follower
                    </div>
                  </div>
                  
                  {userProfile.about && (
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#475569', 
                      lineHeight: '1.5', 
                      whiteSpace: 'pre-line',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '12px',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {userProfile.about}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
