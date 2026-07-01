import { useState, useRef } from 'react';
import ArticleCard from './ArticleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath } from '../utils/paths';
import { 
  BookOpen, 
  User, 
  GraduationCap, 
  Cpu, 
  MapPin, 
  Calendar, 
  Tag,
  Pencil
} from 'lucide-react';
import './ProfileFeed.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.4 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C4.8 1.4 3.6 1.8 3.6 1.8c-.7 1.8-.2 3.1-.1 3.4-1 1-1.5 2-1.5 3.4 0 5 3 6.2 6 6.5-.4.4-.8 1.1-.9 2.1-.5.2-1.8.6-2.6-.7 0 0-.5-.8-1.4-.9 0 0-.9-.1-.1.6 0 0 .6.9 1 1.7 0 0 .8 2.6 3 1.8V22"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const getGithubUrl = (id) => {
  if (!id) return '#';
  if (id.startsWith('http://') || id.startsWith('https://')) return id;
  return `https://github.com/${id}`;
};

const getLinkedinUrl = (id) => {
  if (!id) return '#';
  if (id.startsWith('http://') || id.startsWith('https://')) return id;
  return `https://linkedin.com/in/${id}`;
};

export default function ProfileFeed({ articles, userProfile, onSaveProfile, savedArticles, toggleSave, onTitleClick, onAddComment, currentUser, onAuthorClick }) {
  const [profileTab, setProfileTab] = useState('My Articles');
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = !currentUser || userProfile.name === currentUser;

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSaveProfile({
          ...userProfile,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSaveProfile({
          ...userProfile,
          banner: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to split comma-separated strings into lists
  const getPillsList = (commaStr) => {
    if (!commaStr) return [];
    return commaStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
  };

  const skillsList = getPillsList(userProfile.skills);
  const interestsList = getPillsList(userProfile.areasOfInterest || userProfile.interests);

  return (
    <div className="profile-feed-container">
      
      {/* Profile Sections Tab Header */}
      <nav className="feed-tabs-container profile-tabs-header">
        {[
          { name: 'My Articles', icon: BookOpen },
          { name: 'About', icon: User }
        ].map((tab) => {
          const isActive = profileTab === tab.name;
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              className={`feed-tab profile-tab-button ${isActive ? 'active' : ''}`}
              onClick={() => setProfileTab(tab.name)}
            >
              <Icon size={16} />
              <span>{tab.name}</span>
              
              {isActive && (
                <motion.div 
                  className="active-tab-indicator profile-tab-underline" 
                  layoutId="activeProfileViewUnderline"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {profileTab === 'My Articles' ? (
          <motion.div
            key="articles"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="feed-articles-list">
              {articles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  isSaved={savedArticles && savedArticles.some(a => a.id === article.id)}
                  onSaveClick={() => toggleSave(article)}
                  onTitleClick={() => onTitleClick(article)}
                  onAddComment={onAddComment}
                  onAuthorClick={onAuthorClick}
                />
              ))}
              {articles.length === 0 && (
                <div className="profile-articles-empty">
                  No articles published yet.
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="profile-about-tab-container"
          >
            
            {/* LinkedIn-Style Profile Header Block */}
            <div className="profile-card-container">
              
              {/* Hidden File Inputs for direct uploading of cover banner and profile photo */}
              <input 
                type="file" 
                accept="image/*" 
                ref={avatarInputRef} 
                className="profile-hidden-file-input" 
                onChange={handleAvatarFileChange} 
              />
              <input 
                type="file" 
                accept="image/*" 
                ref={bannerInputRef} 
                className="profile-hidden-file-input" 
                onChange={handleBannerFileChange} 
              />

              {/* Cover Banner Section (Clean display with hover pencil shortcut) */}
              <div 
                onMouseEnter={isOwnProfile ? () => setIsHoveringBanner(true) : undefined}
                onMouseLeave={isOwnProfile ? () => setIsHoveringBanner(false) : undefined}
                onClick={isOwnProfile ? () => bannerInputRef.current.click() : undefined}
                className={`profile-cover-banner ${isOwnProfile ? 'own-profile' : ''}`}
                style={{
                  background: userProfile.banner
                    ? (userProfile.banner.startsWith('linear-gradient') ? userProfile.banner : `url(${userProfile.banner})`)
                    : 'linear-gradient(135deg, #0F172A 0%, #1A8917 100%)'
                }}
              >
                {/* Pencil Overlay */}
                {isOwnProfile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHoveringBanner ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="profile-pencil-overlay"
                  >
                    <div className="profile-pencil-circle">
                      <Pencil size={20} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Profile Photo Overlapping Cover (Clean display with hover pencil shortcut) */}
              <div className="profile-avatar-row">
                
                <div 
                  onMouseEnter={isOwnProfile ? () => setIsHoveringAvatar(true) : undefined}
                  onMouseLeave={isOwnProfile ? () => setIsHoveringAvatar(false) : undefined}
                  onClick={isOwnProfile ? () => avatarInputRef.current.click() : undefined}
                  className={`profile-avatar-wrapper ${isOwnProfile ? 'own-profile' : ''}`}
                >
                  <img 
                    src={userProfile.avatar || getImagePath('/images/avatar_user.png')} 
                    alt={userProfile.name}
                    className="profile-avatar-img"
                  />
                  {/* Pencil Overlay */}
                  {isOwnProfile && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringAvatar ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="profile-avatar-pencil-overlay"
                    >
                      <div className="profile-avatar-pencil-circle">
                        <Pencil size={16} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* User Information & Header Details Area in LinkedIn Visual Order */}
                <div className="profile-details-wrapper">
                  <div className="profile-main-info">
                    
                    {/* User Name */}
                    <h2 className="profile-name">
                      {userProfile.name}
                    </h2>
                    
                    {/* 1/ Professional headline is shown just below name */}
                    {userProfile.headline && (
                      <p className="profile-headline">
                        {userProfile.headline}
                      </p>
                    )}

                    {/* 2/ Academics details is just below the professional headline */}
                    {(userProfile.branch || userProfile.education) && (
                      <div className="profile-academic-line">
                        <GraduationCap size={16} />
                        <span>
                          {userProfile.branch && userProfile.education 
                            ? `${userProfile.branch} at ${userProfile.education}` 
                            : (userProfile.branch || userProfile.education)}
                        </span>
                      </div>
                    )}

                    {/* 3/ Add location of user college and display as it is just below acadamics details */}
                    {userProfile.collegeLocation && (
                      <div className="profile-location-line">
                        <MapPin size={16} />
                        <span>{userProfile.collegeLocation}</span>
                      </div>
                    )}

                  </div>

                  {/* Social Connections */}
                  {(userProfile.github || userProfile.linkedin || !isOwnProfile) && (
                    <div className="profile-sidebar-connections">
                      {(userProfile.github || userProfile.linkedin) && (
                        <>
                          <span className="profile-connections-title">
                            Connections
                          </span>
                          <div className="profile-connections-row">
                            {userProfile.github && (
                              <a 
                                href={getGithubUrl(userProfile.github)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-connection-icon github clickable"
                                title="GitHub Profile"
                              >
                                <GithubIcon size={18} />
                              </a>
                            )}
                            
                            {userProfile.linkedin && (
                              <a 
                                href={getLinkedinUrl(userProfile.linkedin)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-connection-icon linkedin clickable"
                                title="LinkedIn Profile"
                              >
                                <LinkedinIcon size={18} />
                              </a>
                            )}
                          </div>
                        </>
                      )}

                      {/* Follow button for external authors */}
                      {!isOwnProfile && (
                        <motion.button
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`profile-follow-btn ${isFollowing ? 'following' : ''}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* About Card */}
            {userProfile.about && (
              <div className="profile-about-card">
                <div className="profile-card-header">
                  <User size={18} />
                  <h3 className="profile-card-title">
                    About Me
                  </h3>
                </div>
                
                <div className="profile-about-text">
                  {userProfile.about}
                </div>
              </div>
            )}

            {/* Academic Information Card */}
            {(userProfile.education || userProfile.branch) && (
              <div className="profile-education-card">
                <div className="profile-card-header">
                  <GraduationCap size={18} />
                  <h3 className="profile-card-title">
                    Education & Credentials
                  </h3>
                </div>
                
                <div className="profile-education-content-row">
                  <div className="profile-education-icon-wrapper">
                    <GraduationCap size={24} />
                  </div>
                  
                  <div className="profile-education-details">
                    <span className="profile-education-name">
                      {userProfile.education}
                    </span>
                    <span className="profile-education-degree">
                      {userProfile.branch || 'Degree Program in Engineering'}
                    </span>
                    <div className="profile-education-year-row">
                      <Calendar size={13} />
                      <span>Graduation Year: {userProfile.gradYear || '2028'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Skills Card */}
            {skillsList.length > 0 && (
              <div className="profile-skills-card">
                <div className="profile-card-header">
                  <Cpu size={18} />
                  <h3 className="profile-card-title">
                    Top Technical Skills
                  </h3>
                </div>
                
                <div className="profile-skills-list">
                  {skillsList.map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className="profile-skill-badge"
                      whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-green)', color: '#ffffff', borderColor: 'var(--primary-green)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Interests & Topics Card */}
            {interestsList.length > 0 && (
              <div className="profile-interests-card">
                <div className="profile-card-header">
                  <Tag size={18} />
                  <h3 className="profile-card-title">
                    Interests & Topics
                  </h3>
                </div>
                
                <div className="profile-skills-list">
                  {interestsList.map((interest, index) => (
                    <motion.span 
                      key={index} 
                      className="profile-interest-badge"
                      whileHover={{ scale: 1.05, backgroundColor: '#0284c7', color: '#ffffff', borderColor: '#0284c7' }}
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

