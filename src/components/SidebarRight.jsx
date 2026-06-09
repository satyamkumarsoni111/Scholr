import React from 'react';
import { motion } from 'framer-motion';

export default function SidebarRight({ activeTab, selectedTopic, setSelectedTopic }) {
  // On Profile or Stats view: Remove who to follow,Recommended Topics and footer sections entirely
  if (activeTab === 'Profile' || activeTab === 'Stats') {
    return null;
  }

  const topics = [
    'AI/ML',
    'Robotics',
    'Python',
    'Web Development',
    'Data Science',
    'UI Design',
    'Economics',
    'Career Prep',
    'React',
    'DSA',
    'Hackathons',
    'Beginner Special'
  ];

  return (
    <aside className="sidebar-right">
      <motion.section 
        className="sidebar-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="sidebar-section-title">Recommended Topics</h3>
        <div className="recommended-topics-list">
          {topics.map((topic) => {
            const isSelected = selectedTopic === topic;
            return (
              <motion.a
                key={topic}
                href={`#topic-${topic.toLowerCase().replace(' ', '-')}`}
                className="topic-tag"
                style={{
                  backgroundColor: isSelected ? 'var(--primary-green)' : 'var(--search-bg)',
                  color: isSelected ? '#ffffff' : '#374151',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--primary-green)' : '1px solid transparent'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (setSelectedTopic) {
                    setSelectedTopic(isSelected ? null : topic);
                  }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {topic}
              </motion.a>
            );
          })}
        </div>
      </motion.section>
    </aside>
  );
}
