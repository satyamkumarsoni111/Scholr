import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Repeat, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom high-fidelity Clap Icon
const ClapIcon = ({ active }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

// High-fidelity Publication Logos
const LevelUpLogo = () => (
  <div style={{
    width: '18px',
    height: '18px',
    backgroundColor: '#2563eb', 
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '9px',
    fontFamily: '"Outfit", sans-serif',
    flexShrink: 0,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }}>
    CO
  </div>
);

const DSCLogo = () => (
  <div style={{
    width: '18px',
    height: '18px',
    backgroundColor: '#ea580c', 
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '8px',
    fontFamily: '"Outfit", sans-serif',
    flexShrink: 0,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }}>
    DSC
  </div>
);

const SelfPublishedLogo = () => (
  <div style={{
    width: '18px',
    height: '18px',
    background: 'linear-gradient(135deg, var(--primary-green) 0%, #00b36c 100%)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '9px',
    fontFamily: '"Outfit", sans-serif',
    flexShrink: 0,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }}>
    S
  </div>
);

import CommentsSection from './CommentsSection';

function HomeArticleCard({ article, currentUser, isSaved, onSaveClick, onTitleClick, onAddComment, onAuthorClick }) {
  const [claps, setClaps] = useState(article.initialClaps || article.claps || 0);
  const [hasClapped, setHasClapped] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const isOwnArticle = currentUser && article.author === currentUser;

  const handleClap = (e) => {
    e.stopPropagation();
    if (isOwnArticle) return;
    setClaps(prev => prev + (hasClapped ? -1 : 1));
    setHasClapped(prev => !prev);
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <motion.article 
      className="article-card"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', width: '100%', alignItems: 'flex-start' }}>
        <div className="article-card-left">
          {/* Meta Row */}
          <div className="article-meta" style={{ gap: '8px' }}>
            {article.publication === 'Level Up Coding' ? (
              <LevelUpLogo />
            ) : article.publication === 'Data Science Collective' ? (
              <DSCLogo />
            ) : (
              <SelfPublishedLogo />
            )}
            <span style={{ fontSize: '13px', color: '#1f2937' }}>
              In <strong>{article.publication}</strong>
            </span>
            <span className="meta-divider">by</span>
            <span 
              className="article-author" 
              style={{ color: '#4b5563', fontWeight: '500', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                if (onAuthorClick) onAuthorClick(article.author);
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {article.author}
            </span>
            <span className="meta-divider">•</span>
            <span className="article-date">{article.date}</span>
          </div>

          {/* Title */}
          <a 
            href={`#article-${article.id}`} 
            className="article-title" 
            style={{ fontSize: '20px', letterSpacing: '-0.3px', margin: '6px 0 4px 0' }}
            onClick={(e) => {
              e.preventDefault();
              if (onTitleClick) onTitleClick(article);
            }}
          >
            {article.title}
          </a>

          {/* Excerpt */}
          <p className="article-excerpt" style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.45', marginBottom: '14px' }}>
            {article.excerpt}
          </p>

          {/* Bottom Actions Bar */}
          <div className="article-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="article-stats-left" style={{ gap: '16px' }}>
              {/* Claps */}
              <motion.button 
                className={`article-stat-item ${hasClapped ? 'active' : ''}`}
                onClick={isOwnArticle ? undefined : handleClap}
                whileTap={isOwnArticle ? {} : { scale: 1.25 }}
                whileHover={isOwnArticle ? {} : { scale: 1.05 }}
                style={{ 
                  gap: '4px',
                  cursor: isOwnArticle ? 'not-allowed' : 'pointer',
                  opacity: isOwnArticle ? 0.6 : 1
                }}
                title={isOwnArticle ? "You cannot like your own article" : "Like this story"}
              >
                <ClapIcon active={hasClapped} />
                <span style={{ fontWeight: '500' }}>{formatCount(claps)}</span>
              </motion.button>

              {/* Comments */}
              <motion.button 
                className={`article-stat-item ${showComments ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ gap: '4px' }}
              >
                <MessageCircle size={15} />
                <span>{article.comments || 0}</span>
              </motion.button>
            </div>

            <div className="article-actions-right" style={{ gap: '14px' }}>
              {/* Thumbs Down */}
              <motion.button 
                className="article-action-btn"
                onClick={isOwnArticle ? undefined : () => setIsDisliked(!isDisliked)}
                whileTap={isOwnArticle ? {} : { scale: 0.85 }}
                style={{ 
                  color: isDisliked ? '#ef4444' : '',
                  cursor: isOwnArticle ? 'not-allowed' : 'pointer',
                  opacity: isOwnArticle ? 0.6 : 1
                }}
                title={isOwnArticle ? "You cannot dislike your own article" : "Show less of this"}
              >
                <ThumbsDown size={17} fill={isDisliked ? "currentColor" : "none"} />
              </motion.button>

              {/* Bookmark */}
              <motion.button 
                className={`article-action-btn ${isSaved ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSaveClick) onSaveClick();
                }}
                whileTap={isOwnArticle ? {} : { scale: 1.25 }}
                style={{ 
                  color: isSaved ? 'var(--primary-green)' : '',
                  cursor: isOwnArticle ? 'not-allowed' : 'pointer',
                  opacity: isOwnArticle ? 0.6 : 1
                }}
                title={isOwnArticle ? "You cannot save your own article" : "Save this story"}
              >
                <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
              </motion.button>

              {/* Share button instead of 3 dots */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <motion.button 
                  className="article-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
                    setShowShareTooltip(true);
                    setTimeout(() => setShowShareTooltip(false), 2000);
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  title="Share this story"
                >
                  <Share2 size={17} />
                </motion.button>
                
                <AnimatePresence>
                  {showShareTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -35, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#111111',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 10
                      }}
                    >
                      Link copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right Thumbnail Image */}
        <div className="article-card-right" style={{ width: '140px', height: '92px' }}>
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-image" 
          />
        </div>
      </div>

      {/* Expandable Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', overflow: 'hidden' }}
          >
            <CommentsSection 
              articleId={article.id} 
              commentsList={article.commentsList} 
              onAddComment={onAddComment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function HomeFeed({ 
  articles, 
  selectedTopic, 
  setSelectedTopic, 
  currentUser, 
  searchQuery, 
  savedArticles, 
  toggleSave, 
  onTitleClick, 
  onAddComment,
  onAuthorClick
}) {
  const tabs = ['For you', 'Featured', ...(selectedTopic ? [selectedTopic] : [])];
  const [activeTab, setActiveTab] = useState('For you');

  useEffect(() => {
    if (selectedTopic) {
      setActiveTab(selectedTopic);
    } else if (activeTab !== 'For you' && activeTab !== 'Featured') {
      setActiveTab('For you');
    }
  }, [selectedTopic]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== selectedTopic && setSelectedTopic) {
      setSelectedTopic(null);
    }
  };

  const matchesTopic = (article, topic) => {
    if (!topic) return false;
    const lowerTopic = topic.toLowerCase().trim();
    
    // Check tags
    if (article.tags) {
      for (const tag of article.tags) {
        const lowerTag = tag.toLowerCase().trim();
        // If the tag contains comma, split it
        if (lowerTag.includes(',')) {
          const subTags = lowerTag.split(',').map(s => s.trim());
          if (subTags.some(sub => sub.includes(lowerTopic) || lowerTopic.includes(sub))) {
            return true;
          }
        } else {
          if (lowerTag.includes(lowerTopic) || lowerTopic.includes(lowerTag)) {
            return true;
          }
        }
      }
    }
    
    // Check title
    if (article.title && article.title.toLowerCase().includes(lowerTopic)) {
      return true;
    }
    
    // Check excerpt
    if (article.excerpt && article.excerpt.toLowerCase().includes(lowerTopic)) {
      return true;
    }
    
    return false;
  };

  // Filter based on the global search query first
  const searchFilteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    
    if (article.title && article.title.toLowerCase().includes(query)) return true;
    if (article.excerpt && article.excerpt.toLowerCase().includes(query)) return true;
    if (article.author && article.author.toLowerCase().includes(query)) return true;
    if (article.publication && article.publication.toLowerCase().includes(query)) return true;
    if (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query))) return true;
    
    return false;
  });

  const filteredArticles = searchFilteredArticles.filter(article => {
    if (activeTab === 'For you') return true;
    if (activeTab === 'Featured') {
      return article.tags && article.tags.includes('Featured');
    }
    return matchesTopic(article, activeTab);
  });

  return (
    <section className="feed-area">
      <nav className="feed-tabs-container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              className={`feed-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              {isActive && (
                <motion.div 
                  className="active-tab-indicator" 
                  layoutId="activeHomeTabUnderline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="feed-articles-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (searchQuery ? `-${searchQuery}` : '')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <HomeArticleCard 
                  key={article.id} 
                  article={article} 
                  currentUser={currentUser} 
                  isSaved={savedArticles.some(a => a.id === article.id)}
                  onSaveClick={() => toggleSave(article)}
                  onTitleClick={onTitleClick}
                  onAddComment={onAddComment}
                  onAuthorClick={onAuthorClick}
                />
              ))
            ) : (
              <div style={{ 
                padding: '48px 24px', 
                textAlign: 'center', 
                backgroundColor: '#f8fafc', 
                borderRadius: '16px', 
                border: '1px dashed #e2e8f0', 
                marginTop: '16px' 
              }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  No matches found for "{searchQuery}"
                </span>
                <span style={{ fontSize: '13.5px', color: '#64748b', display: 'block', maxWidth: '320px', margin: '0 auto', lineHeight: '1.5' }}>
                  Try checking your spelling, selecting another tab, or searching for other academic topics.
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
