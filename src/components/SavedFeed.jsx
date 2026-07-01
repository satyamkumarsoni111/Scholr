import ArticleCard from './ArticleCard';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './SavedFeed.css';

export default function SavedFeed({ savedArticles, onTitleClick, toggleSave, setActiveTab, onAuthorClick }) {
  return (
    <div className="saved-container">
      
      {/* Header Row */}
      <div className="saved-header-row">
        <div className="saved-title-wrapper">
          <Bookmark className="text-primary" size={22} />
          <h2 className="saved-title">
            Saved Stories ({savedArticles.length})
          </h2>
        </div>
        
        <button
          onClick={() => setActiveTab('Home')}
          className="saved-back-btn"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Saved Articles List */}
      <div className="feed-articles-list">
        {savedArticles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            isSaved={true}
            onSaveClick={() => toggleSave(article)}
            onTitleClick={() => onTitleClick(article)}
            onAuthorClick={onAuthorClick}
          />
        ))}

        {savedArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="saved-empty-card"
          >
            <div className="saved-empty-icon-circle">
              <Bookmark size={26} />
            </div>
            <h3 className="saved-empty-title">
              No saved stories
            </h3>
            <p className="saved-empty-desc">
              Click the bookmark icon on any article on the home feed to save it and read it later.
            </p>
            <button
              onClick={() => setActiveTab('Home')}
              className="saved-explore-btn"
            >
              Explore Feed
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
