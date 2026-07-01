import { useState } from 'react';
import { ArrowLeft, ArrowRight, Tag, BookOpen, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './WriteView.css';

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

  const hasTitleAndDesc = title.trim() && description.trim();

  return (
    <div className="write-container">
      {/* Editor Headers / Progress */}
      <div className="write-header-row">
        <div className="write-draft-label">
          <BookOpen size={18} />
          <span className="write-draft-text">
            Draft Story • Step {step} of 2
          </span>
        </div>

        {/* Step Progress indicators */}
        <div className="write-steps-indicator">
          <div className="write-step-pill" />
          <div className={`write-step-pill ${step === 2 ? '' : 'inactive'}`} />
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
            className="write-step-container"
          >
            {/* Title Input */}
            <input 
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="write-title-input"
            />

            {/* Description Textarea */}
            <textarea
              placeholder="Tell your story... Add descriptions, content, code snippets, or thoughts..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="write-desc-textarea"
            />

            {/* Step 1 Actions */}
            <div className="write-action-row">
              <motion.button
                onClick={handleNext}
                disabled={!hasTitleAndDesc}
                className={`write-next-btn ${hasTitleAndDesc ? 'enabled' : 'disabled'}`}
                whileHover={hasTitleAndDesc ? { scale: 1.03, backgroundColor: '#007042' } : {}}
                whileTap={hasTitleAndDesc ? { scale: 0.97 } : {}}
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
            className="write-step2-container"
          >
            {/* Back to Step 1 */}
            <motion.button
              onClick={() => setStep(1)}
              className="write-back-btn"
              whileHover={{ color: '#0f172a', x: -4 }}
            >
              <ArrowLeft size={16} />
              <span>Back to Editor</span>
            </motion.button>

            {/* Preview Card */}
            <div className="write-preview-card">
              <h4 className="write-preview-label">
                Preview
              </h4>
              <h3 className="write-preview-title">{title}</h3>
              <p className="write-preview-desc">
                {description}
              </p>
            </div>

            {/* Predefined Tags Selectors */}
            <div className="write-topics-wrapper">
              <span className="write-topics-label">
                Select topics that your article belongs to:
              </span>
              <div className="write-tags-list">
                {predefinedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <motion.button
                      key={tag}
                      onClick={() => togglePredefinedTag(tag)}
                      className={`write-tag-button ${isSelected ? 'selected' : ''}`}
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
            <div className="write-topics-wrapper">
              <span className="write-topics-label">
                Or add custom topics:
              </span>
              <form onSubmit={addCustomTag} className="write-custom-tag-form">
                <div className="write-custom-input-wrapper">
                  <Tag size={16} className="write-custom-input-icon" />
                  <input
                    type="text"
                    placeholder="Enter custom topic tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    className="write-custom-input"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="write-add-tag-btn"
                  whileHover={{ backgroundColor: '#0f172a' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </form>
            </div>

            {/* Active Tags list */}
            {selectedTags.length > 0 && (
              <div className="write-active-tags-row">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="write-active-tag-pill"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="write-active-tag-remove-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Step 2 Actions */}
            <div className="write-action-row">
              <motion.button
                onClick={handlePublish}
                className="write-publish-btn"
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
