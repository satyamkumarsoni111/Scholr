import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommentsSection({ articleId, commentsList = [], onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(articleId, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="comments-container" onClick={(e) => e.stopPropagation()}>
      <h3 className="comments-title">
        Responses ({commentsList.length})
      </h3>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="comment-input-wrapper">
          <textarea
            placeholder="What are your thoughts?"
            className="comment-textarea"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="comment-form-actions">
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="comment-submit-btn"
          >
            Respond
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {commentsList.map((comment) => (
          <motion.div 
            key={comment.id}
            className="comment-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={comment.avatar || "/images/avatar_user.png"} 
              alt={comment.author} 
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </motion.div>
        ))}

        {commentsList.length === 0 && (
          <div style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '13.5px' }}>
            No responses yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
}
