import { motion } from 'framer-motion';
import './SidebarRight.css';

export default function SidebarRight({ activeTab, selectedTopic, setSelectedTopic, userProfile }) {
  // On Profile or Stats view: Remove who to follow,Recommended Topics and footer sections entirely
  if (activeTab === 'Profile' || activeTab === 'Stats') {
    return null;
  }

  const userStream = userProfile?.stream || '🎓 B.Tech / B.E.';
  let topics = [];
  if (userStream === '🎓 B.Tech / B.E.') {
    topics = [
      'AI/ML',
      'Robotics',
      'Python',
      'Web Development',
      'Data Science',
      'React',
      'DSA',
      'Hackathons'
    ];
  } else if (userStream === '💼 MBA') {
    topics = [
      'Economics',
      'Finance',
      'Marketing',
      'Leadership',
      'Product Management',
      'Startup',
      'Consulting',
      'Career Prep',
      'UI Design'
    ];
  } else if (userStream === 'Learner') {
    topics = [
      'Beginner Special',
      'DSA Intro',
      'Stream Choice',
      '1st Internships',
      'Startups',
      'Hackathons',
      'Python',
      'UI Design',
      'Career Prep'
    ];
  }

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
                className={`topic-tag ${isSelected ? 'selected' : ''}`}
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
