import React from 'react';
import { UserMinus, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NetworkView({ type, users, onUnfollow }) {
  return (
    <div className="feed-area" style={{ maxWidth: '1000px', padding: '36px 40px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
        {type}
      </h2>
      
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 1fr',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '24px',
        fontSize: '14px',
        color: '#6b7280',
        fontWeight: '500'
      }}>
        <div>Name</div>
        <div>Title / Bio</div>
        <div style={{ textAlign: 'center' }}>Action</div>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {users.map((user, index) => (
          <motion.div 
            key={user.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 3fr 1fr',
              alignItems: 'center',
              paddingBottom: '16px',
              borderBottom: '1px solid #fafafa'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ backgroundColor: '#fafafa', borderRadius: '8px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                {user.name}
              </span>
            </div>
            
            <div style={{ fontSize: '14px', color: '#475569' }}>
              {user.title}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {type === 'Following' ? (
                <button
                  onClick={() => onUnfollow && onUnfollow(user.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ef4444',
                    background: 'none',
                    color: '#ef4444',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <UserMinus size={14} />
                  Unfollow
                </button>
              ) : (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'var(--primary-green)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <UserPlus size={14} />
                  Follow Back
                </button>
              )}
            </div>
          </motion.div>
        ))}
        
        {users.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>
            No {type.toLowerCase()} yet.
          </div>
        )}
      </div>
    </div>
  );
}
