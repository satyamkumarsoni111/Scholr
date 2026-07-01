import { useState } from 'react';
import { MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity custom SVG for the "Clap" icon (identical to the Medium/mockup style)
const ClapIcon = ({ active }) => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

import CommentsSection from './CommentsSection';

export default function ArticleCard({ article, isSaved, onSaveClick, onTitleClick, onAddComment, onAuthorClick }) {
  const [claps, setClaps] = useState(article.initialClaps || article.claps || 0);
  const [hasClapped, setHasClapped] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleClap = (e) => {
    e.stopPropagation(); // Avoid triggering card navigation/click
    setClaps(prev => prev + (hasClapped ? -1 : 1));
    setHasClapped(prev => !prev);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onSaveClick) {
      onSaveClick();
    }
  };

  const handleShareOption = (option, e) => {
    e.stopPropagation();
    const articleUrl = `${window.location.origin}${window.location.pathname}#article-${article.id}`;
    const shareText = `Check out this article on Scholr: "${article.title}" - ${articleUrl}`;
    
    if (option === 'copy') {
      navigator.clipboard.writeText(articleUrl);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } else if (option === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (option === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (option === 'email') {
      window.open(`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareText)}`, '_blank');
    } else if (option === 'native' && navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: articleUrl,
      }).catch(err => console.log(err));
    }
    
    setShowShareMenu(false);
  };

  // Convert clap count into a formatted string (e.g., 2.4k)
  const formatClaps = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <motion.article 
      className="article-card article-card-stacked"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="article-card-row">
        <div className="article-card-left">
          <div className="article-meta">
            <a href={`#category-${article.category ? article.category.toLowerCase().replace(' ', '-') : 'general'}`} className="article-category">
              {article.category || 'Insights'}
            </a>
            <span className="meta-divider">•</span>
            <span 
              className="article-author article-author-clickable"
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

          <a 
            href={`#article-${article.id}`} 
            className="article-title"
            onClick={(e) => {
              e.preventDefault();
              if (onTitleClick) onTitleClick(article);
            }}
          >
            {article.title}
          </a>

          <p className="article-excerpt">
            {article.excerpt}
          </p>

          <div className="article-footer">
            <div className="article-stats-left">
              <motion.button 
                className={`article-stat-item ${hasClapped ? 'active' : ''}`}
                onClick={handleClap}
                whileTap={{ scale: 1.25 }}
                whileHover={{ scale: 1.05 }}
              >
                <ClapIcon active={hasClapped} />
                <span>{formatClaps(claps)}</span>
              </motion.button>

              <motion.button 
                className={`article-stat-item ${showComments ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={16} />
                <span>{article.comments || 0}</span>
              </motion.button>
            </div>

            <div className="article-actions-right">
              <motion.button 
                className={`article-action-btn ${isSaved ? 'active' : ''}`}
                onClick={handleBookmark}
                whileTap={{ scale: 1.3 }}
                animate={isSaved ? { scale: [1, 1.3, 0.9, 1.1, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Bookmark 
                  size={18} 
                  fill={isSaved ? "currentColor" : "none"} 
                />
              </motion.button>

              <div className="article-share-wrapper" onMouseLeave={() => setShowShareMenu(false)}>
                <motion.button 
                  className="article-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Share2 size={18} />
                </motion.button>
                
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -190, x: -90, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="article-share-menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {navigator.share && (
                        <button 
                          onClick={(e) => handleShareOption('native', e)}
                          className="article-share-option"
                        >
                          System Share
                        </button>
                      )}
                      <button 
                        onClick={(e) => handleShareOption('copy', e)}
                        className="article-share-option"
                      >
                        Copy Link
                      </button>
                      <button 
                        onClick={(e) => handleShareOption('whatsapp', e)}
                        className="article-share-option"
                      >
                        WhatsApp
                      </button>
                      <button 
                        onClick={(e) => handleShareOption('twitter', e)}
                        className="article-share-option"
                      >
                        Twitter / X
                      </button>
                      <button 
                        onClick={(e) => handleShareOption('email', e)}
                        className="article-share-option"
                      >
                        Email
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {showShareTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, x: '-50%', y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, x: '-50%', y: -35, scale: 1 }}
                      exit={{ opacity: 0, x: '-50%', y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="article-share-tooltip"
                    >
                      Link copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="article-card-right">
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-image" 
            loading="lazy"
          />
        </div>
      </div>

      {/* Expandable comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="article-comments-motion-wrapper"
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
