import React, { useState } from 'react';
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

  const handleShare = (e) => {
    e.stopPropagation();
    setShowShareTooltip(true);
    navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
    setTimeout(() => {
      setShowShareTooltip(false);
    }, 2000);
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
      className="article-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', width: '100%', alignItems: 'flex-start' }}>
        <div className="article-card-left">
          <div className="article-meta">
            <a href={`#category-${article.category ? article.category.toLowerCase().replace(' ', '-') : 'general'}`} className="article-category">
              {article.category || 'Insights'}
            </a>
            <span className="meta-divider">•</span>
            <span 
              className="article-author"
              style={{ cursor: 'pointer' }}
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

          <a 
            href={`#article-${article.id}`} 
            className="article-title"
            onClick={(e) => {
              e.preventDefault();
              if (onTitleClick) onTitleClick();
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
                style={isSaved ? { color: 'var(--primary-green)' } : {}}
              >
                <Bookmark 
                  size={18} 
                  fill={isSaved ? "currentColor" : "none"} 
                />
              </motion.button>

              <div style={{ position: 'relative' }}>
                <motion.button 
                  className="article-action-btn"
                  onClick={handleShare}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Share2 size={18} />
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
