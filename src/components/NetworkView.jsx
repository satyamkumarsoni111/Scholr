import { UserMinus, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import './NetworkView.css';

export default function NetworkView({ type, users, onUnfollow }) {
  return (
    <div className="feed-area network-container">
      <h2 className="network-title">
        {type}
      </h2>
      
      {/* Table Header */}
      <div className="network-table-header">
        <div>Name</div>
        <div>Title / Bio</div>
        <div className="network-header-center">Action</div>
      </div>

      {/* Rows */}
      <div className="network-users-list">
        {users.map((user, index) => (
          <motion.div 
            key={user.id}
            className="network-user-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ backgroundColor: '#fafafa', borderRadius: '8px' }}
          >
            <div className="network-user-profile">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="network-user-avatar"
              />
              <span className="network-user-name">
                {user.name}
              </span>
            </div>
            
            <div className="network-user-bio">
              {user.title}
            </div>
            
            <div className="network-action-cell">
              {type === 'Following' ? (
                <button
                  onClick={() => onUnfollow && onUnfollow(user.id)}
                  className="network-unfollow-btn"
                >
                  <UserMinus size={14} />
                  Unfollow
                </button>
              ) : (
                <button
                  className="network-follow-btn"
                >
                  <UserPlus size={14} />
                  Follow Back
                </button>
              )}
            </div>
          </motion.div>
        ))}
        
        {users.length === 0 && (
          <div className="network-empty-message">
            No {type.toLowerCase()} yet.
          </div>
        )}
      </div>
    </div>
  );
}
