import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './UserAccountDetails.css';
import { useToast } from '../hooks/use-toast';

const UserAccountDetails: React.FC = () => {
  const { user, isLoading, refreshUser, updateUserProfile, startEmailUpdate, verifyNewEmail, makePrimaryAndCleanup } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedName, setEditedName] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });
  const [editedEmail, setEditedEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [newEmail, setNewEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [pendingEmailId, setPendingEmailId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditedName({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
      setEditedEmail(user.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentEmail = user?.primaryEmailAddress?.emailAddress || '';
      const emailChanged = editedEmail.trim() && editedEmail.trim().toLowerCase() !== currentEmail.toLowerCase();

      // If email changed and we have not started verification yet, start it and prompt for code
      if (emailChanged && !pendingEmailId) {
        const start = await startEmailUpdate(editedEmail.trim());
        if (start.success && start.emailId) {
          setPendingEmailId(start.emailId);
        }
        setIsSaving(false);
        return; // Wait for user to enter code, then save again
      }

      // If we're in verification step and user provided code, verify and set as primary
      if (emailChanged && pendingEmailId) {
        if (!emailCode.trim()) {
          setIsSaving(false);
          return;
        }
        const verified = await verifyNewEmail(pendingEmailId, emailCode.trim());
        if (!verified.success) {
          error(verified.error || 'Verification failed');
          setIsSaving(false);
          return;
        }
        const madePrimary = await makePrimaryAndCleanup(pendingEmailId, true);
        if (!madePrimary.success) {
          error(madePrimary.error || 'Failed to set email as primary');
          setIsSaving(false);
          return;
        }
      }

      // Update name fields
      const nameResult = await updateUserProfile({
        firstName: editedName.firstName.trim(),
        lastName: editedName.lastName.trim(),
      });
      if (!nameResult.success) {
        setIsSaving(false);
        return;
      }

      await refreshUser();
      setIsEditing(false);
      setPendingEmailId(null);
      setEmailCode('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEmailChange = async () => {
    if (!newEmail.trim()) return;
    setIsSaving(true);
    const res = await startEmailUpdate(newEmail.trim());
    setIsSaving(false);
    if (res.success && res.emailId) {
      setPendingEmailId(res.emailId);
      success('Verification code sent');
    } else {
      error(res.error || 'Failed to start email update');
    }
  };

  const handleVerifyEmail = async () => {
    if (!pendingEmailId || !emailCode.trim()) return;
    setIsSaving(true);
    const verified = await verifyNewEmail(pendingEmailId, emailCode.trim());
    if (!verified.success) {
      error(verified.error || 'Verification failed');
      setIsSaving(false);
      return;
    }
    const madePrimary = await makePrimaryAndCleanup(pendingEmailId, true);
    setIsSaving(false);
    if (madePrimary.success) {
      await refreshUser();
      setNewEmail('');
      setEmailCode('');
      setPendingEmailId(null);
      success('Email updated successfully');
    } else {
      error(madePrimary.error || 'Failed to set email as primary');
    }
  };

  if (isLoading) {
    return (
      <div className="user-account-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          Loading account details...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-account-container">
        <div className="loading-state">
          You are signed out. <button className="edit-button" onClick={() => navigate('/login')}>Sign in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-account-container">
      <div className="account-header">
        <div className="user-avatar-section">
          <div className="user-avatar-large">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || 'User'}
                className="avatar-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : null}
            {!user.imageUrl && (
              <div className="avatar-fallback">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
        </div>

        <div className="user-info-section">
          <div className="user-name">
            {isEditing ? (
              <div className="edit-name-fields">
                <input
                  type="text"
                  value={editedName.firstName}
                  onChange={(e) => setEditedName(prev => ({ ...prev, firstName: e.target.value }))}
                  className="name-input"
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={editedName.lastName}
                  onChange={(e) => setEditedName(prev => ({ ...prev, lastName: e.target.value }))}
                  className="name-input"
                  placeholder="Last name"
                />
              </div>
            ) : (
              user.fullName || 'User'
            )}
          </div>

          {isEditing ? (
            <div className="user-joined">
              <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                placeholder="Email address"
                style={{ border: '2px solid #d1d5db', borderRadius: 6, padding: '0.35rem 0.5rem' }}
              />
            </div>
          ) : (
            <div className="user-joined">
              <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
              <span>{user.primaryEmailAddress?.emailAddress || 'No email'}</span>
            </div>
          )}
          <div className="user-joined">
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>

        <div className="account-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave} disabled={isSaving}>
                <FontAwesomeIcon icon={faSave} /> {isSaving ? 'Saving…' : 'Save'}
              </button>
              <button className="cancel-button" onClick={() => setIsEditing(false)} disabled={isSaving}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="account-details">
        <div className="details-section">
          <h2>Account Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label>User ID</label>
              <span className="user-id">{user.id}</span>
            </div>
            <div className="detail-item">
              <label>Email Status</label>
              <span className={`status ${user.emailAddresses[0]?.verification?.status || 'unknown'}`}>
                {user.emailAddresses[0]?.verification?.status || 'Unknown'}
              </span>
            </div>
            <div className="detail-item">
              <label>Account Created</label>
              <span>{formatDate(user.createdAt)}</span>
            </div>
            <div className="detail-item">
              <label>Last Updated</label>
              <span>{formatDate(user.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Change Email section removed per request */}

        {user.publicMetadata?.role && (
          <div className="details-section">
            <h2>Account Type</h2>
            <div className="role-badge">{user.publicMetadata.role}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountDetails;


