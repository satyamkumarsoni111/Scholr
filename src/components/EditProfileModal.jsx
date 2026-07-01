import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Save, GraduationCap, Cpu, Link, AlignLeft, Info } from 'lucide-react';
import { getImagePath } from '../utils/paths';
import './EditProfileModal.css';

export default function EditProfileModal({ isOpen, onClose, userProfile, onSave }) {
  const [avatar, setAvatar] = useState(userProfile.avatar || '');
  const [name, setName] = useState(userProfile.name || '');
  const [headline, setHeadline] = useState(userProfile.headline || '');
  const [about, setAbout] = useState(userProfile.about || '');
  const [skills, setSkills] = useState(userProfile.skills || '');
  const [education, setEducation] = useState(userProfile.education || '');
  const [branch, setBranch] = useState(userProfile.branch || '');
  const [gradYear, setGradYear] = useState(userProfile.gradYear || '');
  const [collegeLocation, setCollegeLocation] = useState(userProfile.collegeLocation || '');
  const [github, setGithub] = useState(userProfile.github || '');
  const [linkedin, setLinkedin] = useState(userProfile.linkedin || '');
  const [portfolio, setPortfolio] = useState(userProfile.portfolio || '');
  const [areasOfInterest, setAreasOfInterest] = useState(userProfile.areasOfInterest || '');
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert("please fill name section carefulyy.....");
      return;
    }

    onSave({
      avatar,
      name: name.trim(),
      headline: headline.trim(),
      about: about.trim(),
      skills: skills.trim(),
      education: education.trim(),
      branch: branch.trim(),
      gradYear: gradYear.trim(),
      collegeLocation: collegeLocation.trim(),
      github: github.trim(),
      linkedin: linkedin.trim(),
      portfolio: portfolio.trim(),
      areasOfInterest: areasOfInterest.trim()
    });
  };

  return (
    <div className="edit-profile-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="edit-profile-dialog"
      >
        {/* Modal Header */}
        <div className="edit-profile-header">
          <h2 className="edit-profile-title">
            Edit Profile Info
          </h2>
          <button 
            onClick={onClose}
            className="edit-profile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Premium Two-Column Dashboard) */}
        <div className="edit-profile-body">
          
          {/* Left Column: Avatar Photo & Basic Information */}
          <div className="edit-profile-col">
            
            {/* 1. Profile Photo Edit */}
            <div className="edit-profile-section">
              <span className="edit-profile-section-title">
                <Camera size={15} />
                Profile Photo
              </span>
              <div className="edit-avatar-row">
                <div className="edit-avatar-preview-wrapper">
                  <img 
                    src={avatar || getImagePath('/images/avatar_user.png')} 
                    alt="Avatar Preview" 
                    className="edit-avatar-img"
                  />
                </div>
                <div className="edit-avatar-actions">
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    className="edit-profile-hidden-input"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatar(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="edit-upload-btn"
                  >
                    Upload Photo from Device
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Basic Info (Name, Headline, About) */}
            <div className="edit-profile-section">
              <span className="edit-profile-section-title bordered">
                <AlignLeft size={15} />
                Basic Information
              </span>
              
              <div className="edit-fields-grid-single">
                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Satyam"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Professional Headline *</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="AI/ML Enthusiast | Web Developer | Open Source Learner"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">
                    <Info size={13} />
                    About *
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="edit-field-textarea"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Academic Details, Skills, Web Links */}
          <div className="edit-profile-col">

            {/* 3. Academic Details (College, Branch, Graduation Year, College Location) */}
            <div className="edit-profile-section">
              <span className="edit-profile-section-title bordered">
                <GraduationCap size={15} />
                Academic Details
              </span>
              
              <div className="edit-fields-grid-double">
                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Education / College *</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="College or University name..."
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Branch *</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science, ECE, etc..."
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Graduation Year *</label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="e.g. 2028"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">College Location *</label>
                  <input
                    type="text"
                    value={collegeLocation}
                    onChange={(e) => setCollegeLocation(e.target.value)}
                    placeholder="e.g. Ranchi, Jharkhand, India"
                    className="edit-field-input"
                  />
                </div>
              </div>
            </div>

            {/* 4. Skills & Interests */}
            <div className="edit-profile-section">
              <span className="edit-profile-section-title bordered">
                <Cpu size={15} />
                Skills & Interests
              </span>
              
              <div className="edit-fields-grid-single">
                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Skills (comma separated) *</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, Python, DSA, Machine Learning"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">Areas of Interest *</label>
                  <input
                    type="text"
                    value={areasOfInterest}
                    onChange={(e) => setAreasOfInterest(e.target.value)}
                    placeholder="Robotics & Automation, AI, Frontend, etc..."
                    className="edit-field-input"
                  />
                </div>
              </div>
            </div>

            {/* 5. Web Connections (Optional Links) */}
            <div className="edit-profile-section">
              <span className="edit-profile-section-title bordered">
                <Link size={15} />
                Web Links (Optional)
              </span>
              
              <div className="edit-links-grid">
                <div className="edit-field-wrapper">
                  <label className="edit-field-label">GitHub Link *</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper">
                  <label className="edit-field-label">LinkedIn Link *</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="edit-field-input"
                  />
                </div>

                <div className="edit-field-wrapper span-2">
                  <label className="edit-field-label">Portfolio Website Link (Optional)</label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="edit-field-input"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="edit-profile-footer">
          <button
            onClick={onClose}
            className="edit-cancel-btn"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSave}
            className="edit-save-btn"
            whileHover={{ backgroundColor: '#007042' }}
            whileTap={{ scale: 0.97 }}
          >
            <Save size={15} />
            <span>Saved</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

