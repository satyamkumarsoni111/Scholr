import React, { useState, useRef } from 'react';
import ArticleCard from './ArticleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  User, 
  GraduationCap, 
  Cpu, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Globe, 
  Tag,
  Pencil
} from 'lucide-react';

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

export default function ProfileFeed({ articles, userProfile, onSaveProfile, onEditProfileClick, savedArticles, toggleSave, onTitleClick, onAddComment, currentUser, onAuthorClick }) {
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
    <div style={{
      maxWidth: '780px',
      margin: '0 auto',
      padding: '24px 20px 48px 20px',
      fontFamily: '"Inter", sans-serif'
    }}>
      
      {/* Profile Sections Tab Header */}
      <nav 
        className="feed-tabs-container" 
        style={{ 
          marginBottom: '28px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: '24px'
        }}
      >
        {[
          { name: 'My Articles', icon: BookOpen },
          { name: 'About', icon: User }
        ].map((tab) => {
          const isActive = profileTab === tab.name;
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              className={`feed-tab ${isActive ? 'active' : ''}`}
              onClick={() => setProfileTab(tab.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingBottom: '12px',
                fontSize: '15px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#0f172a' : '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Icon size={16} />
              <span>{tab.name}</span>
              
              {isActive && (
                <motion.div 
                  className="active-tab-indicator" 
                  layoutId="activeProfileViewUnderline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--primary-green)'
                  }}
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
                />
              ))}
              {articles.length === 0 && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b', fontSize: '14.5px' }}>
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              color: '#334155'
            }}
          >
            
            {/* LinkedIn-Style Profile Header Block */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              position: 'relative'
            }}>
              
              {/* Hidden File Inputs for direct uploading of cover banner and profile photo */}
              <input 
                type="file" 
                accept="image/*" 
                ref={avatarInputRef} 
                style={{ display: 'none' }} 
                onChange={handleAvatarFileChange} 
              />
              <input 
                type="file" 
                accept="image/*" 
                ref={bannerInputRef} 
                style={{ display: 'none' }} 
                onChange={handleBannerFileChange} 
              />

              {/* Cover Banner Section (Clean display with hover pencil shortcut) */}
              <div 
                onMouseEnter={isOwnProfile ? () => setIsHoveringBanner(true) : undefined}
                onMouseLeave={isOwnProfile ? () => setIsHoveringBanner(false) : undefined}
                onClick={isOwnProfile ? () => bannerInputRef.current.click() : undefined}
                style={{
                  height: '210px',
                  background: userProfile.banner?.startsWith('linear-gradient') 
                    ? userProfile.banner 
                    : `url(${userProfile.banner || 'linear-gradient(135deg, #0F172A 0%, #1A8917 100%)'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  cursor: isOwnProfile ? 'pointer' : 'default'
                }}
              >
                {/* Pencil Overlay */}
                {isOwnProfile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHoveringBanner ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '50%',
                      width: '46px',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                    }}>
                      <Pencil size={20} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Profile Photo Overlapping Cover (Clean display with hover pencil shortcut) */}
              <div style={{ padding: '0 28px 28px 28px', position: 'relative' }}>
                
                <div 
                  onMouseEnter={isOwnProfile ? () => setIsHoveringAvatar(true) : undefined}
                  onMouseLeave={isOwnProfile ? () => setIsHoveringAvatar(false) : undefined}
                  onClick={isOwnProfile ? () => avatarInputRef.current.click() : undefined}
                  style={{
                    width: '136px',
                    height: '136px',
                    marginTop: '-76px',
                    borderRadius: '50%',
                    border: '5px solid #ffffff',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    cursor: isOwnProfile ? 'pointer' : 'default'
                  }}
                >
                  <img 
                    src={userProfile.avatar || '/images/avatar_user.png'} 
                    alt={userProfile.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Pencil Overlay */}
                  {isOwnProfile && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHoveringAvatar ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        <Pencil size={16} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* User Information & Header Details Area in LinkedIn Visual Order */}
                <div style={{ 
                  marginTop: '16px', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    
                    {/* User Name */}
                    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
                      {userProfile.name}
                    </h2>
                    
                    {/* 1/ Professional headline is shown just below name */}
                    <p style={{ fontSize: '15.5px', color: '#475569', fontWeight: '600', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                      {userProfile.headline}
                    </p>

                    {/* 2/ Academics details is just below the professional headline */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '14px', 
                      color: '#334155',
                      fontWeight: '500',
                      margin: '0 0 8px 0'
                    }}>
                      <GraduationCap size={16} style={{ color: 'var(--primary-green)' }} />
                      <span>{userProfile.branch} at {userProfile.education}</span>
                    </div>

                    {/* 3/ Add location of user college and display as it is just below acadamics details */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '13.5px', 
                      color: '#64748b',
                      fontWeight: '500',
                      margin: '0 0 4px 0'
                    }}>
                      <MapPin size={16} style={{ color: '#ef4444' }} />
                      <span>{userProfile.collegeLocation || 'Ranchi, Jharkhand, India'}</span>
                    </div>

                  </div>

                  {/* Social Connections */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    alignItems: 'flex-start',
                    minWidth: '160px' 
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Connections
                    </span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {userProfile.github && (
                        <div 
                          style={{ 
                            color: '#475569', 
                            backgroundColor: '#f1f5f9', 
                            padding: '8px', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid #e2e8f0',
                            cursor: 'default'
                          }} 
                          title="GitHub Profile"
                        >
                          <GithubIcon size={18} />
                        </div>
                      )}
                      
                      {userProfile.linkedin && (
                        <div 
                          style={{ 
                            color: '#0077b5', 
                            backgroundColor: '#f0f9ff', 
                            padding: '8px', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid #bae6fd',
                            cursor: 'default'
                          }} 
                          title="LinkedIn Profile"
                        >
                          <LinkedinIcon size={18} />
                        </div>
                      )}
                    </div>

                    {/* Follow button for external authors */}
                    {!isOwnProfile && (
                      <motion.button
                        onClick={() => setIsFollowing(!isFollowing)}
                        style={{
                          backgroundColor: isFollowing ? '#f1f5f9' : 'var(--primary-green)',
                          color: isFollowing ? '#0f172a' : '#ffffff',
                          border: isFollowing ? '1px solid #e2e8f0' : 'none',
                          borderRadius: '9999px',
                          padding: '8px 20px',
                          fontSize: '13.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'center',
                          marginTop: '6px'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </motion.button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* About Card */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} style={{ color: 'var(--primary-green)' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  About Me
                </h3>
              </div>
              
              <div style={{ 
                fontSize: '14.5px', 
                color: '#475569', 
                whiteSpace: 'pre-line',
                lineHeight: '1.6' 
              }}>
                {userProfile.about ? userProfile.about : (
                  <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                    Tell students about your learning journey, interests, and goals.
                  </span>
                )}
              </div>
            </div>

            {/* Academic Information Card */}
            {(userProfile.education || userProfile.branch) && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={18} style={{ color: 'var(--primary-green)' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Education & Credentials
                  </h3>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: '#f1f5f9', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    color: 'var(--primary-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <GraduationCap size={24} />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                      {userProfile.education}
                    </span>
                    <span style={{ fontSize: '13.5px', color: '#475569', fontWeight: '500' }}>
                      {userProfile.branch || 'Degree Program in Engineering'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>
                      <Calendar size={13} />
                      <span>Graduation Year: {userProfile.gradYear || '2028'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Skills Card */}
            {skillsList.length > 0 && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={18} style={{ color: 'var(--primary-green)' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Top Technical Skills
                  </h3>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skillsList.map((skill, index) => (
                    <motion.span 
                      key={index} 
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '600',
                        color: 'var(--primary-green)',
                        backgroundColor: 'var(--primary-green-light)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1px solid #d1fae5',
                        cursor: 'default'
                      }}
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
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag size={18} style={{ color: '#0284c7' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Interests & Topics
                  </h3>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {interestsList.map((interest, index) => (
                    <motion.span 
                      key={index} 
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '600',
                        color: '#0284c7',
                        backgroundColor: '#e0f2fe',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1px solid #bae6fd',
                        cursor: 'default'
                      }}
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
