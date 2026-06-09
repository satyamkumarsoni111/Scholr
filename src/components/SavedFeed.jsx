import React from 'react';
import ArticleCard from './ArticleCard';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SavedFeed({ savedArticles, onTitleClick, toggleSave, setActiveTab }) {
  return (
    <div style={{
      maxWidth: '780px',
      margin: '0 auto',
      padding: '24px 20px 48px 20px',
      fontFamily: '"Inter", sans-serif'
    }}>
      
      {/* Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '16px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bookmark className="text-primary" style={{ color: 'var(--primary-green)' }} size={22} />
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
            Saved Stories ({savedArticles.length})
          </h2>
        </div>
        
        <button
          onClick={() => setActiveTab('Home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--primary-green)',
            cursor: 'pointer'
          }}
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
          />
        ))}

        {savedArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '1px dashed #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-green-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-green)',
              marginBottom: '4px'
            }}>
              <Bookmark size={26} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              No saved stories
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '320px', margin: '0 auto', lineHeight: '1.5' }}>
              Click the bookmark icon on any article on the home feed to save it and read it later.
            </p>
            <button
              onClick={() => setActiveTab('Home')}
              style={{
                marginTop: '8px',
                backgroundColor: 'var(--primary-green)',
                color: '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Explore Feed
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
