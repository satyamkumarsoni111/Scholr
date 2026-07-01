import { Fragment } from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './StatsView.css';

export default function StatsView({ articles = [], onTitleClick }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="feed-area stats-empty-feed">
        <div className="stats-empty-card">
          <h3 className="stats-empty-title">
            No stories published yet
          </h3>
          <p className="stats-empty-desc">
            When you publish articles, you will see real-time statistics including presentations, views, and reads right here.
          </p>
        </div>
      </div>
    );
  }

  const statsData = articles.map((art, idx) => {
    const claps = art.initialClaps || art.claps || 0;
    const commentsCount = art.comments || (art.commentsList ? art.commentsList.length : 0);
    
    // Generate dynamic values based on interaction data
    const presentations = claps * 3 + commentsCount * 5 + 15;
    const views = claps * 2 + commentsCount * 2 + 8;
    const reads = Math.max(0, Math.floor(claps * 0.85 + commentsCount * 1));

    return {
      id: art.id || `stats-${idx}`,
      title: art.title,
      meta: `2 min read • ${art.date || 'Just now'} • View story`,
      presentations,
      views,
      reads,
      articleObj: art
    };
  });

  return (
    <div className="feed-area stats-container">
      {/* Stats Table Header */}
      <div className="stats-table-header">
        <div>Story</div>
        <div className="stats-header-cell-icon">
          Presentations 
          <span className="stats-help-icon-span" title="How many times this story was presented to users">
            <HelpCircle size={14} />
          </span>
        </div>
        <div className="stats-header-cell-center">Views</div>
        <div className="stats-header-cell-center">Reads</div>
      </div>

      {/* Stats Rows */}
      <div className="stats-rows-list">
        {statsData.map((item, index) => (
          <motion.div 
            key={item.id}
            className="stats-grid-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ backgroundColor: '#fafafa', borderRadius: '4px' }}
          >
            {/* Story details */}
            <div className="stats-story-info">
              <a 
                href={`#story-${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  if (onTitleClick) onTitleClick(item.articleObj);
                }}
                className="stats-story-title-link"
              >
                {item.title}
              </a>
              <div className="stats-story-meta">
                {item.meta.split(' • ').map((part, idx2) => (
                  <Fragment key={idx2}>
                    {idx2 > 0 && <span className="stats-meta-dot">•</span>}
                    {part === 'View story' ? (
                      <a 
                        href="#view" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (onTitleClick) onTitleClick(item.articleObj);
                        }}
                        className="stats-view-story-link"
                      >
                        {part}
                      </a>
                    ) : (
                      <span>{part}</span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="stats-metrics-cell">
              {item.presentations}
            </div>
            <div className="stats-metrics-cell">
              {item.views}
            </div>
            <div className="stats-metrics-cell">
              {item.reads}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
