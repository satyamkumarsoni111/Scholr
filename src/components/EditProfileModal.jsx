import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Save, GraduationCap, Cpu, Link, AlignLeft, Info } from 'lucide-react';
import { getImagePath } from '../utils/paths';

export default function EditProfileModal({ isOpen, onClose, userProfile, onSave }) {
  const [avatar, setAvatar] = useState(userProfile.avatar || getImagePath('/images/avatar_user.png'));
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
    if (!name.trim() || !headline.trim() || !about.trim() || !education.trim() || !branch.trim() || !gradYear.trim() || !collegeLocation.trim() || !skills.trim() || !areasOfInterest.trim() || !github.trim() || !linkedin.trim()) {
      alert("please fill all section carefulyy.....");
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
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000, // Make sure it sits above the global drawer
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          fontFamily: '"Inter", sans-serif'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Edit Profile Info
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Premium Two-Column Dashboard) */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          maxHeight: '68vh'
        }}>
          
          {/* Left Column: Avatar Photo & Basic Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 1. Profile Photo Edit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={15} style={{ color: 'var(--primary-green)' }} />
                Profile Photo
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
                  <img 
                    src={avatar} 
                    alt="Avatar Preview" 
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--primary-green-light)'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
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
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Upload Photo from Device
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Basic Info (Name, Headline, About) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <AlignLeft size={15} style={{ color: 'var(--primary-green)' }} />
                Basic Information
              </span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Satyam"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Professional Headline *</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="AI/ML Enthusiast | Web Developer | Open Source Learner"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Info size={13} style={{ color: 'var(--primary-green)' }} />
                    About *
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                    style={{ width: '100%', minHeight: '120px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Academic Details, Skills, Web Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* 3. Academic Details (College, Branch, Graduation Year, College Location) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <GraduationCap size={15} style={{ color: 'var(--primary-green)' }} />
                Academic Details
              </span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Education / College *</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="College or University name..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Branch *</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science, ECE, etc..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Graduation Year *</label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="e.g. 2028"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>College Location *</label>
                  <input
                    type="text"
                    value={collegeLocation}
                    onChange={(e) => setCollegeLocation(e.target.value)}
                    placeholder="e.g. Ranchi, Jharkhand, India"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* 4. Skills & Interests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <Cpu size={15} style={{ color: 'var(--primary-green)' }} />
                Skills & Interests
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Skills (comma separated) *</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, Python, DSA, Machine Learning"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Areas of Interest *</label>
                  <input
                    type="text"
                    value={areasOfInterest}
                    onChange={(e) => setAreasOfInterest(e.target.value)}
                    placeholder="Robotics & Automation, AI, Frontend, etc..."
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* 5. Web Connections (Optional Links) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <Link size={15} style={{ color: 'var(--primary-green)' }} />
                Web Links (Optional)
              </span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>GitHub Link *</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>LinkedIn Link *</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#475569' }}>Portfolio Website Link (Optional)</label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://yourportfolio.com"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          backgroundColor: '#f8fafc',
          flexShrink: 0
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '500',
              color: '#475569',
              background: '#ffffff',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSave}
            style={{
              padding: '8px 18px',
              backgroundColor: 'var(--primary-green)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
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
