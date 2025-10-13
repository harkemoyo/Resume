import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faEdit, faSave, faTimes, faX } from '@fortawesome/free-solid-svg-icons';
import './AccountModal.css';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedName({
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleEdit = () => {
    setEditedName({
      firstName: user.firstName || '',
      lastName: user.lastName || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedName({
      firstName: user.firstName || '',
      lastName: user.lastName || ''
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would typically call an API to update the user
      // For now, we'll just simulate the update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refresh user data
      await refreshUser();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="account-modal-overlay" onClick={onClose}>
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Account Details</h2>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        <div className="modal-content">
          <div className="user-profile-section">
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
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="avatar-fallback" style={{ display: user.imageUrl ? 'none' : 'flex' }}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
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
              
              <div className="user-email">
                <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                <span>{user.primaryEmailAddress?.emailAddress || 'No email'}</span>
              </div>
              
              <div className="user-joined">
                <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <div className="edit-actions">
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="save-button"
                  >
                    <FontAwesomeIcon icon={faSave} />
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="cancel-button"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEdit}
                  className="edit-button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="account-details">
            <div className="details-section">
              <h3>Account Information</h3>
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

            {user.publicMetadata?.role && (
              <div className="details-section">
                <h3>Account Type</h3>
                <div className="role-badge">
                  {user.publicMetadata.role}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;

