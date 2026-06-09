import React from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsView() {
  const statsData = [
    {
      id: 1,
      title: "From Confusion to Confidence !!!!",
      meta: "3 min read • May 17, 2026 • View story",
      presentations: 10,
      views: 7,
      reads: 0
    },
    {
      id: 2,
      title: "Building My First Obstacle Avoidance Car !",
      meta: "1 min read • Mar 23, 2026 • View story",
      presentations: 16,
      views: 1,
      reads: 0
    },
    {
      id: 3,
      title: "I Think It's Simple... Until I Try to Understand It",
      meta: "1 min read • Mar 23, 2026 • View story",
      presentations: 9,
      views: 2,
      reads: 0
    },
    {
      id: 4,
      title: "Mistakes I Made in My First Robotics Project !!",
      meta: "2 min read • Mar 21, 2026 • View story",
      presentations: 25,
      views: 22,
      reads: 5
    }
  ];

  return (
    <div className="feed-area" style={{ maxWidth: '1000px', padding: '36px 40px' }}>
      {/* Stats Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr 1fr 1fr',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '24px',
        fontSize: '14px',
        color: '#6b7280',
        fontWeight: '500'
      }}>
        <div>Story</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
          Presentations 
          <span style={{ cursor: 'pointer', display: 'inline-flex', color: '#9ca3af' }} title="How many times this story was presented to users">
            <HelpCircle size={14} />
          </span>
        </div>
        <div style={{ textAlign: 'center' }}>Views</div>
        <div style={{ textAlign: 'center' }}>Reads</div>
      </div>

      {/* Stats Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {statsData.map((item) => (
          <motion.div 
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr 1fr 1fr',
              alignItems: 'center',
              paddingBottom: '12px',
              borderBottom: '1px solid #fafafa'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: item.id * 0.05 }}
            whileHover={{ backgroundColor: '#fafafa', borderRadius: '4px' }}
          >
            {/* Story details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '20px' }}>
              <a 
                href={`#story-${item.id}`} 
                style={{ 
                  fontFamily: 'var(--font-logo)',
                  fontSize: '17px', 
                  fontWeight: '700', 
                  color: '#0f172a',
                  textDecoration: 'none',
                  lineHeight: '1.3'
                }}
              >
                {item.title}
              </a>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                {item.meta.split(' • ').map((part, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span style={{ margin: '0 6px' }}>•</span>}
                    {part === 'View story' ? (
                      <a href="#view" style={{ color: '#6b7280', textDecoration: 'underline' }}>{part}</a>
                    ) : (
                      <span>{part}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', color: '#1e293b' }}>
              {item.presentations}
            </div>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', color: '#1e293b' }}>
              {item.views}
            </div>
            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', color: '#1e293b' }}>
              {item.reads}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
