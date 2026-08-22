import React, { useState, useEffect } from 'react';

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function getInitials(fullName) {
  if (!fullName) return 'HA';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function SettingsModal({ isOpen, onClose, userProfile, onSave }) {
  const [name, setName] = useState(userProfile?.name || 'Hanif Abbad');
  const [role, setRole] = useState(userProfile?.role || 'Agency Owner');
  const [email, setEmail] = useState(userProfile?.email || 'hanifbad09@gmail.com');
  const [taskThreshold, setTaskThreshold] = useState(userProfile?.taskThreshold || 30);
  const [emailNotifications, setEmailNotifications] = useState(
    userProfile?.emailNotifications ?? true
  );

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || 'Hanif Abbad');
      setRole(userProfile.role || 'Agency Owner');
      setEmail(userProfile.email || 'hanifbad09@gmail.com');
      setTaskThreshold(userProfile.taskThreshold || 30);
      setEmailNotifications(userProfile.emailNotifications ?? true);
    }
  }, [userProfile, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      name,
      role,
      email,
      initials: getInitials(name),
      taskThreshold,
      emailNotifications,
    });
    onClose();
  };

  return (
    <div className="npm-backdrop" onClick={onClose}>
      <div className="set-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="set-modal-header">
          <div>
            <h2 className="set-modal-title">Settings</h2>
            <p className="set-modal-sub">Customize your profile and preferences</p>
          </div>
          <button type="button" className="set-modal-close" onClick={onClose}>
            <IconClose />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="set-modal-body">
          {/* Profile Card Preview */}
          <div className="set-profile-card">
            <div className="set-avatar-circle">
              {getInitials(name)}
            </div>
            <div className="set-profile-info">
              <div className="set-profile-name">{name || 'Hanif Abbad'}</div>
              <div className="set-profile-role">{role || 'Agency Owner'}</div>
              <div className="set-profile-email">{email || 'hanifbad09@gmail.com'}</div>
            </div>
          </div>

          {/* Section 1: Profile */}
          <div className="set-section-label">Profile</div>

          <div className="set-field-group">
            <label className="set-field-label">Display Name</label>
            <input
              type="text"
              className="set-field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hanif Abbad"
            />
          </div>

          <div className="set-field-group">
            <label className="set-field-label">Job Title</label>
            <input
              type="text"
              className="set-field-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Agency Owner"
            />
          </div>

          {/* Section 2: Preferences */}
          <div className="set-section-label" style={{ marginTop: '12px' }}>Preferences</div>

          <div className="set-field-group">
            <div className="set-slider-header">
              <span className="set-slider-title">Task capacity threshold</span>
              <span className="set-slider-sub">Max active tasks before 'at capacity'</span>
            </div>
            <div className="set-slider-row">
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                className="set-range-input"
                value={taskThreshold}
                style={{
                  background: `linear-gradient(to right, #0c61cf 0%, #0c61cf ${(taskThreshold / 30) * 100}%, #f2f4f7 ${(taskThreshold / 30) * 100}%, #f2f4f7 100%)`
                }}
                onChange={(e) => setTaskThreshold(Number(e.target.value))}
              />
              <span className="set-slider-value">{taskThreshold}</span>
            </div>
          </div>

          <div className="set-notif-box">
            <div className="set-notif-left">
              <div className="set-notif-icon">
                <IconMail />
              </div>
              <div>
                <div className="set-notif-title">Email notifications</div>
                <div className="set-notif-sub">Get alerts for deadlines & risks</div>
              </div>
            </div>
            <label className="set-toggle-switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span className="set-toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="set-modal-footer">
          <button type="button" className="set-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="set-btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
