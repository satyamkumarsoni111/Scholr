import { useState } from 'react';
import { MessageCircle, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomeFeed.css';

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
    className="clap-icon-custom"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

// High-fidelity Publication Logos
const LevelUpLogo = () => (
  <div className="pub-logo-levelup">
    CO
  </div>
);

const DSCLogo = () => (
  <div className="pub-logo-dsc">
    DSC
  </div>
);

const SelfPublishedLogo = () => (
  <div className="pub-logo-self">
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
      className="article-card home-article-card-layout"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="home-article-card-row">
        <div className="article-card-left">
          {/* Meta Row */}
          <div className="article-meta home-article-meta">
            {article.publication === 'Level Up Coding' ? (
              <LevelUpLogo />
            ) : article.publication === 'Data Science Collective' ? (
              <DSCLogo />
            ) : (
              <SelfPublishedLogo />
            )}
            <span className="home-article-pub-text">
              In <strong>{article.publication}</strong>
            </span>
            <span className="meta-divider">by</span>
            <span 
              className="article-author home-article-author" 
              onClick={(e) => {
                e.stopPropagation();
                if (onAuthorClick) onAuthorClick(article.author);
              }}
            >
              {article.author}
            </span>
            <span className="meta-divider">•</span>
            <span className="article-date">{article.date}</span>
          </div>

          {/* Title */}
          <a 
            href={`#article-${article.id}`} 
            className="article-title home-article-title" 
            onClick={(e) => {
              e.preventDefault();
              if (onTitleClick) onTitleClick(article);
            }}
          >
            {article.title}
          </a>

          {/* Excerpt */}
          <p className="article-excerpt home-article-excerpt">
            {article.excerpt}
          </p>

          {/* Bottom Actions Bar */}
          <div className="article-footer home-article-footer">
            <div className="article-stats-left home-article-stats-left">
              {/* Claps */}
              <motion.button 
                className={`article-stat-item home-article-stat-item-btn ${hasClapped ? 'active' : ''} ${isOwnArticle ? 'disabled' : ''}`}
                onClick={isOwnArticle ? undefined : handleClap}
                whileTap={isOwnArticle ? {} : { scale: 1.25 }}
                whileHover={isOwnArticle ? {} : { scale: 1.05 }}
                title={isOwnArticle ? "You cannot like your own article" : "Like this story"}
              >
                <ClapIcon active={hasClapped} />
                <span className="home-article-claps-text">{formatCount(claps)}</span>
              </motion.button>

              {/* Comments */}
              <motion.button 
                className={`article-stat-item home-article-comments-btn ${showComments ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={15} />
                <span>{article.comments || 0}</span>
              </motion.button>
            </div>

            <div className="article-actions-right home-article-actions-right">
              {/* Thumbs Down */}
              <motion.button 
                className={`article-action-btn home-article-dislike-btn ${isDisliked ? 'active' : ''} ${isOwnArticle ? 'disabled' : ''}`}
                onClick={isOwnArticle ? undefined : () => setIsDisliked(!isDisliked)}
                whileTap={isOwnArticle ? {} : { scale: 0.85 }}
                title={isOwnArticle ? "You cannot dislike your own article" : "Show less of this"}
              >
                <ThumbsDown size={17} fill={isDisliked ? "currentColor" : "none"} />
              </motion.button>

              {/* Bookmark */}
              <motion.button 
                className={`article-action-btn home-article-save-btn ${isSaved ? 'active' : ''} ${isOwnArticle ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSaveClick) onSaveClick();
                }}
                whileTap={isOwnArticle ? {} : { scale: 1.25 }}
                title={isOwnArticle ? "You cannot save your own article" : "Save this story"}
              >
                <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
              </motion.button>

              {/* Share button instead of 3 dots */}
              <div className="home-article-share-wrapper">
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
                      className="home-article-share-tooltip"
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
        <div className="article-card-right home-article-image-wrapper">
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
            className="home-article-comments-wrapper"
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
  const [localActiveTab, setLocalActiveTab] = useState('For you');
  const activeTab = selectedTopic || (localActiveTab === 'Featured' ? 'Featured' : 'For you');

  const handleTabClick = (tab) => {
    setLocalActiveTab(tab);
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
              <div className="home-feed-empty-container">
                <span className="home-feed-empty-title">
                  No matches found for "{searchQuery}"
                </span>
                <span className="home-feed-empty-desc">
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
