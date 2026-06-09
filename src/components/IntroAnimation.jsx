import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath } from '../utils/paths';

// Avatars of diverse students around the world (generated in prior step)
const STUDENT_AVATARS = [
  { id: 1, src: getImagePath('/images/intro_student_1.png'), initialX: -260, initialY: -160, size: 75 },
  { id: 2, src: getImagePath('/images/intro_student_2.png'), initialX: 280, initialY: -130, size: 80 },
  { id: 3, src: getImagePath('/images/intro_student_3.png'), initialX: -240, initialY: 150, size: 70 },
  { id: 4, src: getImagePath('/images/intro_student_4.png'), initialX: 250, initialY: 170, size: 75 },
  { id: 5, src: getImagePath('/images/intro_student_5.png'), initialX: 0, initialY: -220, size: 85 }
];

export default function IntroAnimation({ onComplete }) {
  // Animation phases: 'float' | 'gather' | 'pen' | 'write' | 'fade-pen' | 'exit'
  const [phase, setPhase] = useState('float');
  const textString = "Medium For Students";
  const textChars = Array.from(textString);

  useEffect(() => {
    // Phase 1 -> 2: Floating to Gathering (0.8s)
    const floatTimer = setTimeout(() => {
      setPhase('gather');
    }, 800);

    // Phase 2 -> 3: Gathering to Pen Morph (1.6s)
    const gatherTimer = setTimeout(() => {
      setPhase('pen');
    }, 1600);

    // Phase 3 -> 4: Pen Morph to Writing (2.2s)
    const penTimer = setTimeout(() => {
      setPhase('write');
    }, 2200);

    // Phase 4 -> End: Complete writing, linger, and exit smoothly (5.8s total duration)
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5800);

    return () => {
      clearTimeout(floatTimer);
      clearTimeout(gatherTimer);
      clearTimeout(penTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          id="intro-animation-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            userSelect: 'none',
          }}
        >
          {/* Phase 1 & 2: Floating & Gathering Avatars */}
          {(phase === 'float' || phase === 'gather') && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {STUDENT_AVATARS.map((avatar) => {
                const isGathering = phase === 'gather';
                return (
                  <motion.div
                    key={avatar.id}
                    initial={{
                      x: avatar.initialX,
                      y: avatar.initialY,
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={
                      isGathering
                        ? {
                            x: 0,
                            y: 0,
                            scale: 0.1,
                            opacity: 0,
                            filter: 'blur(12px)',
                          }
                        : {
                            scale: 1,
                            opacity: 1,
                            // Soft floating keyframes
                            x: [
                              avatar.initialX,
                              avatar.initialX + (avatar.id % 2 === 0 ? 12 : -12),
                              avatar.initialX + (avatar.id % 2 === 0 ? -8 : 8),
                              avatar.initialX,
                            ],
                            y: [
                              avatar.initialY,
                              avatar.initialY + (avatar.id % 2 === 0 ? -12 : 12),
                              avatar.initialY + (avatar.id % 2 === 0 ? 8 : -8),
                              avatar.initialY,
                            ],
                          }
                    }
                    transition={
                      isGathering
                        ? { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
                        : {
                            scale: { duration: 0.8, ease: 'easeOut' },
                            opacity: { duration: 0.8 },
                            x: { repeat: Infinity, duration: 4 + avatar.id, ease: 'easeInOut' },
                            y: { repeat: Infinity, duration: 3.5 + avatar.id, ease: 'easeInOut' },
                          }
                    }
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={avatar.src}
                      alt="Student Portrait"
                      style={{
                        width: `${avatar.size}px`,
                        height: `${avatar.size}px`,
                        borderRadius: '50%',
                        border: '3px solid rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        // Fallback in case of asset path issues
                        e.target.src = '/images/avatar_user.png';
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Phase 3: The Merged Node transforming into a minimal Pen */}
          {phase === 'pen' && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0.5, filter: 'blur(10px)' }}
              animate={{ scale: 1.0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }} // Soft elastic bounce
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              {/* Minimal SVG Pen */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                <path d="m15 5 3 3" />
              </svg>
            </motion.div>
          )}

          {/* Phase 4 & 5: Writing and Lingering Text */}
          {(phase === 'write' || phase === 'fade-pen') && (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                
                {/* Organic, high-fidelity human handwriting layout */}
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '12px',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.25)'
                }}>
                  {textChars.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={phase === 'write' || phase === 'fade-pen' ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{
                        // Natural human speed variations: slightly staggered per letter!
                        delay: index * 0.11, 
                        duration: 0.18,
                        ease: [0.34, 1.56, 0.64, 1] // elastic organic ink flow
                      }}
                      style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* The Pen writing along the organic mask edge */}
                {phase === 'write' && (
                  <motion.div
                    initial={{ left: '0%', opacity: 0, scale: 0.9 }}
                    animate={{
                      left: '100%',
                      opacity: [0, 1, 1, 0],
                      scale: [0.9, 1, 1, 0.9],
                      // Natural micro handwriting strokes: rapid, realistic up-and-down drawing motion
                      y: [
                        0, -6, 4, -5, 6, -4, 5, -6, 4, -5, 6, -4, 5, -6, 4, -5, 6, -4, 5, 0
                      ],
                      // Organic hand rotation tilts representing cursive stroke drawing
                      rotate: [
                        -8, -3, -11, -5, -9, -4, -10, -6, -8, -4, -9, -5, -8
                      ],
                      filter: [
                        "drop-shadow(0 4px 12px rgba(255,255,255,0.1)) blur(0px)",
                        "drop-shadow(0 4px 12px rgba(255,255,255,0.15)) blur(0.3px)",
                        "drop-shadow(0 4px 12px rgba(255,255,255,0.15)) blur(0.3px)",
                        "drop-shadow(0 4px 12px rgba(255,255,255,0.1)) blur(0px)"
                      ]
                    }}
                    transition={{
                      left: { duration: 2.1, ease: "linear" }, // synchronized perfectly with character reveal
                      opacity: { duration: 2.1, ease: "linear" },
                      scale: { duration: 2.1, ease: "linear" },
                      y: { duration: 2.1, ease: "easeInOut" },
                      rotate: { duration: 2.1, ease: "easeInOut" },
                      filter: { duration: 2.1, ease: "linear" },
                    }}
                    style={{
                      position: 'absolute',
                      top: '32%', 
                      transform: 'translate(-12px, -50%)',
                      width: '46px',
                      height: '46px',
                      pointerEvents: 'none',
                      color: '#ffffff',
                      zIndex: 10,
                    }}
                  >
                    {/* Glowing fluid ink point at the pen nib (bottom left) */}
                    <div style={{
                      position: 'absolute',
                      left: '4px',
                      bottom: '4px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 80%)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
                    }} />

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: 'rotate(-8deg)',
                      }}
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      <path d="m15 5 3 3" />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Tagline below the brand text */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.8 }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                  fontWeight: 500,
                  color: '#94a3b8',
                  letterSpacing: '1.5px',
                  textAlign: 'center',
                  marginTop: '12px'
                }}
              >
                Write  |  Read  |  Learn  |  Grow
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
