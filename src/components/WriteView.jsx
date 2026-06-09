import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Tag, BookOpen, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WriteView({ onPublish }) {
  const [step, setStep] = useState(1); // 1: Title/Description, 2: Topics Selection
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [selectedTags, setSelectedTags] = useState(['For you']); // Default tag

  const predefinedTags = ['AI/ML', 'Robotics', 'Web Development', 'Python', 'Data Science', 'Featured'];

  const togglePredefinedTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const addCustomTag = (e) => {
    e.preventDefault();
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags(prev => [...prev, customTag.trim()]);
      setCustomTag('');
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleNext = () => {
    if (title.trim() && description.trim()) {
      setStep(2);
    }
  };

  const handlePublish = () => {
    if (title.trim() && description.trim()) {
      onPublish({
        title: title.trim(),
        description: description.trim(),
        tags: selectedTags
      });
    }
  };

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '40px 24px',
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Editor Headers / Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} style={{ color: 'var(--primary-green)' }} />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
            Draft Story • Step {step} of 2
          </span>
        </div>

        {/* Step Progress indicators */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '24px', height: '4px', borderRadius: '2px', backgroundColor: 'var(--primary-green)' }} />
          <div style={{ width: '24px', height: '4px', borderRadius: '2px', backgroundColor: step === 2 ? 'var(--primary-green)' : '#cbd5e1' }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}
          >
            {/* Title Input */}
            <input 
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                fontSize: '36px',
                fontWeight: '800',
                border: 'none',
                outline: 'none',
                color: '#0f172a',
                fontFamily: '"Outfit", sans-serif',
                width: '100%',
                padding: '4px 0',
                letterSpacing: '-0.5px'
              }}
            />

            {/* Description Textarea */}
            <textarea
              placeholder="Tell your story... Add descriptions, content, code snippets, or thoughts..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                fontSize: '18px',
                border: 'none',
                outline: 'none',
                color: '#334155',
                width: '100%',
                flex: 1,
                minHeight: '280px',
                resize: 'none',
                lineHeight: '1.6',
                padding: '4px 0'
              }}
            />

            {/* Step 1 Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px',
              marginTop: 'auto'
            }}>
              <motion.button
                onClick={handleNext}
                disabled={!title.trim() || !description.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: (title.trim() && description.trim()) ? 'var(--primary-green)' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontSize: '14.5px',
                  fontWeight: '600',
                  cursor: (title.trim() && description.trim()) ? 'pointer' : 'not-allowed',
                  boxShadow: (title.trim() && description.trim()) ? '0 4px 6px -1px rgba(0, 138, 82, 0.15)' : 'none'
                }}
                whileHover={(title.trim() && description.trim()) ? { scale: 1.03, backgroundColor: '#007042' } : {}}
                whileTap={(title.trim() && description.trim()) ? { scale: 0.97 } : {}}
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '24px' }}
          >
            {/* Back to Step 1 */}
            <motion.button
              onClick={() => setStep(1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                width: 'fit-content'
              }}
              whileHover={{ color: '#0f172a', x: -4 }}
            >
              <ArrowLeft size={16} />
              <span>Back to Editor</span>
            </motion.button>

            {/* Preview Card */}
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#f8fafc'
            }}>
              <h4 style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                Preview
              </h4>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                {description}
              </p>
            </div>

            {/* Predefined Tags Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                Select topics that your article belongs to:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {predefinedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <motion.button
                      key={tag}
                      onClick={() => togglePredefinedTag(tag)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: '500',
                        backgroundColor: isSelected ? 'var(--primary-green-light)' : '#f1f5f9',
                        color: isSelected ? 'var(--primary-green)' : '#475569',
                        border: isSelected ? '1.5px solid var(--primary-green)' : '1.5px solid transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                Or add custom topics:
              </span>
              <form onSubmit={addCustomTag} style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Tag size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Enter custom topic tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  whileHover={{ backgroundColor: '#0f172a' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </form>
            </div>

            {/* Active Tags list */}
            {selectedTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--primary-green)',
                      backgroundColor: 'var(--primary-green-light)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-green)',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Step 2 Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px',
              marginTop: 'auto'
            }}>
              <motion.button
                onClick={handlePublish}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--primary-green)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '24px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 138, 82, 0.15)'
                }}
                whileHover={{ scale: 1.03, backgroundColor: '#007042' }}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Send size={16} />
                <span>Publish Now</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
