import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommentsSection from './CommentsSection';

// High-fidelity custom SVG for the "Clap" icon (identical to the Medium style)
const ClapIcon = ({ active }) => (
  <svg 
    width="20" 
    height="20" 
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

export default function ArticleDetailView({ article, onBack, toggleSave, isSaved, onAddComment, currentUser, onAuthorClick }) {
  const [claps, setClaps] = useState(article.initialClaps || article.claps || 0);
  const [hasClapped, setHasClapped] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isOwnArticle = currentUser && article.author === currentUser;

  const handleClap = () => {
    if (isOwnArticle) return;
    setClaps(prev => prev + (hasClapped ? -1 : 1));
    setHasClapped(prev => !prev);
  };

  const handleShare = () => {
    setShowShareTooltip(true);
    navigator.clipboard.writeText(window.location.origin + `/article/${article.id}`);
    setTimeout(() => {
      setShowShareTooltip(false);
    }, 2000);
  };

  // Helper to render body content (supports paragraph lists and markdown-like parsing)
  const renderBodyContent = () => {
    if (!article.content) {
      // Fallback: Generate mock paragraphs from excerpt
      return (
        <>
          <p>{article.excerpt || "No summary provided."}</p>
          <p>
            In the rapidly evolving world of technology, understanding key architectural patterns is more vital than ever. This guide takes you on a deep dive into the engineering foundations required to design, test, and scale modern software systems efficiently.
          </p>
          <h2>Key Takeaways & Frameworks</h2>
          <p>
            When building robust software interfaces or backend systems, modularity and state predictability are crucial. We must establish structured, reliable layers that separate user interface elements from core business logic.
          </p>
          <blockquote>
            "Good software design is not about absolute perfection; it's about minimizing the friction of future changes."
          </blockquote>
          <p>
            By implementing clean hooks, optimizing rendering loops, and keeping dependencies lightweight, developers can deliver lightning-fast applications that remain simple to maintain and extend.
          </p>
        </>
      );
    }

    if (Array.isArray(article.content)) {
      return article.content.map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
        }
        if (paragraph.startsWith('> ')) {
          return <blockquote key={index}>{paragraph.replace('> ', '')}</blockquote>;
        }
        if (paragraph.startsWith('```')) {
          // Monospace Code Block
          const codeText = paragraph.replace(/```[a-zA-Z]*\n?/, '').replace(/```$/, '');
          return (
            <pre key={index}>
              <code>{codeText}</code>
            </pre>
          );
        }
        // Paragraph with potential inline code parsing
        return (
          <p key={index}>
            {parseInlineCode(paragraph)}
          </p>
        );
      });
    }

    return <p>{article.content}</p>;
  };

  // Helper function to render backticks as <code> blocks
  const parseInlineCode = (text) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="article-detail-wrapper">
      {/* Back Button */}
      <div className="back-button-container">
        <motion.button 
          onClick={onBack} 
          className="back-btn"
          whileHover={{ x: -2 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Feed</span>
        </motion.button>
      </div>

      {/* Article Header */}
      <header className="article-detail-header">
        <div className="detail-pub-row">
          <span style={{ color: 'var(--primary-green)', fontWeight: '700' }}>{article.publication}</span>
          <span className="meta-divider">•</span>
          <span style={{ color: '#64748b' }}>Published in AI Insights</span>
        </div>
        
        <h1 className="detail-title">{article.title}</h1>
        
        <div className="detail-author-row">
          <img 
            src={article.author === 'Satyam' || isOwnArticle ? "/images/avatar_user.png" : `/images/avatar_${article.author.toLowerCase().split(' ')[0]}.png`} 
            alt={article.author}
            className="detail-author-avatar"
            onError={(e) => {
              e.target.src = "/images/avatar_user.png";
            }}
          />
          <div className="detail-author-info">
            <span 
              className="detail-author-name"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (onAuthorClick) onAuthorClick(article.author);
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {article.author}
            </span>
            <span className="detail-meta-text">
              {article.date} · 5 min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Image */}
      {article.image && (
        <div className="article-detail-banner-container">
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-detail-banner"
          />
        </div>
      )}

      {/* Article Body Content */}
      <div className="article-detail-body">
        {renderBodyContent()}
      </div>

      {/* Action Row */}
      <div className="detail-actions-row">
        <div className="article-stats-left" style={{ gap: '24px' }}>
          {/* Claps */}
          <motion.button 
            className={`article-stat-item ${hasClapped ? 'active' : ''}`}
            onClick={handleClap}
            whileTap={isOwnArticle ? {} : { scale: 1.2 }}
            whileHover={isOwnArticle ? {} : { scale: 1.05 }}
            style={{ 
              gap: '6px', 
              fontSize: '14.5px',
              cursor: isOwnArticle ? 'not-allowed' : 'pointer',
              opacity: isOwnArticle ? 0.6 : 1
            }}
            title={isOwnArticle ? "You cannot like your own article" : "Like this story"}
          >
            <ClapIcon active={hasClapped} />
            <span style={{ fontWeight: '500' }}>{claps}</span>
          </motion.button>

          {/* Comment toggle */}
          <motion.button 
            className="article-stat-item"
            onClick={() => setShowComments(!showComments)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ gap: '6px', fontSize: '14.5px' }}
          >
            <MessageCircle size={19} />
            <span>{article.comments || 0}</span>
          </motion.button>
        </div>

        <div className="article-actions-right" style={{ gap: '20px' }}>
          {/* Save/Bookmark */}
          <motion.button 
            className={`article-action-btn ${isSaved ? 'active' : ''}`}
            onClick={() => toggleSave(article)}
            whileTap={{ scale: 1.25 }}
            style={{ 
              color: isSaved ? 'var(--primary-green)' : '',
              cursor: 'pointer'
            }}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>

          {/* Share */}
          <div style={{ position: 'relative' }}>
            <motion.button 
              className="article-action-btn"
              onClick={handleShare}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Share2 size={20} />
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

      {/* Expandable Comments Drawer */}
      <AnimatePresence>
        {(showComments || true) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommentsSection 
              articleId={article.id} 
              commentsList={article.commentsList} 
              onAddComment={onAddComment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
