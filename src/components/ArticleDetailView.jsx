import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommentsSection from './CommentsSection';
import { getImagePath } from '../utils/paths';

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
          <span style={{ color: '#64748b' }}>Published in {article.category || 'AI Insights'}</span>
          {article.tags && article.tags.map((tag, index) => (
            <span key={index} className="detail-meta-badge" style={{
              marginLeft: '8px',
              padding: '2px 8px',
              backgroundColor: '#f1f5f9',
              borderRadius: '999px',
              fontSize: '12px',
              color: '#475569',
              fontWeight: '500'
            }}>{tag}</span>
          ))}
        </div>
        
        <h1 className="detail-title">{article.title}</h1>
        
        <div className="detail-author-row">
          <img 
            src={article.author === 'Satyam' || isOwnArticle ? getImagePath('/images/avatar_user.png') : getImagePath(`/images/avatar_${article.author.toLowerCase().split(' ')[0]}.png`)} 
            alt={article.author}
            className="detail-author-avatar"
            onError={(e) => {
              e.target.src = getImagePath('/images/avatar_user.png');
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

      {/* TL;DR Highlight Box */}
      <div className="article-tldr-box" style={{
        backgroundColor: 'rgba(26, 137, 23, 0.05)',
        borderLeft: '4px solid var(--primary-green)',
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '32px'
      }}>
        <div className="tldr-title" style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--primary-green)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>⚡ TL;DR Summary</div>
        <p className="tldr-text" style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#334155',
          margin: 0
        }}>
          {article.excerpt || "A quick overview highlighting key findings, academic tips, and core takeaways from this student contribution."}
        </p>
      </div>

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

      {/* Author Card Section */}
      <div className="detail-author-card" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        marginTop: '32px',
        border: '1px solid #e2e8f0'
      }}>
        <img 
          src={article.author === 'Satyam' || isOwnArticle ? getImagePath('/images/avatar_user.png') : getImagePath(`/images/avatar_${article.author.toLowerCase().split(' ')[0]}.png`)} 
          alt={article.author}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = getImagePath('/images/avatar_user.png');
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Written by {article.author}</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13.5px', color: '#475569', fontWeight: '500' }}>Student & Creator on Scholr</p>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
            A passionate academic contributor interested in learning, writing, and sharing technological insights to help peers grow.
          </p>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="related-articles-section" style={{ marginTop: '40px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Recommended Reading</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            {
              id: 'r1',
              title: 'Mastering React State: Advanced Context & Reducers',
              author: 'Alex Chen',
              category: 'Code Academy',
              image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop',
              readTime: '4 min read'
            },
            {
              id: 'r2',
              title: 'The AI Revolution in Scientific Research Papers',
              author: 'Anna Richards',
              category: 'AI Insights',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop',
              readTime: '6 min read'
            }
          ].map((item) => (
            <div key={item.id} className="related-card" style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-green)', textTransform: 'uppercase', marginBottom: '4px' }}>{item.category}</span>
                <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4', flex: 1 }}>{item.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>{item.author}</span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </div>
          ))}
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
