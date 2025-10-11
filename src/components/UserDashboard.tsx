import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/use-toast';
import '../styles/user-dashboard.css';

interface Contact {
  id: number;
  clerk_user_id: string | null;
  name: string;
  email: string;
  message: string;
  subject?: string;
  status?: string;
  created_at: string;
  updated_at?: string;
}

/**
 * User Dashboard Component
 * 
 * Allows authenticated users to view, edit, and delete their own contact submissions.
 * Secure access controlled by Clerk authentication and Supabase RLS policies.
 * 
 * @component
 * @returns {JSX.Element} Rendered user dashboard
 */
const UserDashboard: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { success, error } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserContacts();
    }
  }, [isSignedIn, user]);

  const fetchUserContacts = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching user contacts for:', user?.id);
      
      const { data, error } = await supabase
        .from('Contacts')
        .select('*')
        .eq('clerk_user_id', user?.id)
        .order('created_at', { ascending: false });

      console.log('📊 User contacts response:', data);

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching user contacts:', err);
      error('Failed to fetch your contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setEditForm({
      name: contact.name,
      email: contact.email,
      message: contact.message
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!selectedContact) return;

    try {
      const { error } = await supabase
        .from('Contacts')
        .update({
          name: editForm.name.trim(),
          email: editForm.email.trim(),
          message: editForm.message.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedContact.id)
        .eq('clerk_user_id', user?.id); // Double security check

      if (error) throw error;

      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === selectedContact.id 
            ? { ...contact, ...editForm, updated_at: new Date().toISOString() }
            : contact
        )
      );

      success('Contact updated successfully!');
      setIsEditing(false);
      setSelectedContact(null);
    } catch (err) {
      console.error('Error updating contact:', err);
      error('Failed to update contact');
    }
  };

  const handleDelete = async (contactId: number) => {
    if (!window.confirm('Are you sure you want to delete this contact submission? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('Contacts')
        .delete()
        .eq('id', contactId)
        .eq('clerk_user_id', user?.id); // Double security check

      if (error) throw error;

      // Update local state
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      success('Contact deleted successfully!');
    } catch (err) {
      console.error('Error deleting contact:', err);
      error('Failed to delete contact');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isSignedIn) {
    return (
      <div className="user-dashboard">
        <div className="dashboard-header">
          <h2>My Contact Submissions</h2>
          <p>Please sign in to view and manage your contact submissions.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="dashboard-header">
          <h2>My Contact Submissions</h2>
          <p>Loading your submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h2>My Contact Submissions</h2>
        <p>Welcome, {user?.firstName}! Manage your contact submissions below.</p>
        <div className="submission-count">
          {contacts.length} submission{contacts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No submissions yet</h3>
          <p>You haven't submitted any contact forms yet.</p>
          <a href="/contact" className="cta-button">Submit a Contact Form</a>
        </div>
      ) : (
        <div className="contacts-grid">
          <div className="contacts-list">
            <div className="contacts-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{formatDate(contact.created_at)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleEdit(contact)}
                            className="btn-edit"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(contact.id)}
                            className="btn-delete"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedContact && (
            <div className="contact-detail">
              <h3>Contact Details</h3>
              <div className="contact-info">
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Subject:</strong> {selectedContact.subject || 'Contact Form Submission'}</p>
                <p><strong>Date:</strong> {formatDate(selectedContact.created_at)}</p>
                {selectedContact.updated_at && (
                  <p><strong>Last Updated:</strong> {formatDate(selectedContact.updated_at)}</p>
                )}
                <p><strong>Message:</strong></p>
                <div className="message-content">
                  {selectedContact.message}
                </div>
              </div>
              
              <div className="contact-actions">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedContact(null);
                  }}
                  className="btn-close"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {isEditing && selectedContact && (
            <div className="edit-form">
              <h3>Edit Contact</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="form-group">
                  <label htmlFor="edit-name">Name</label>
                  <input
                    type="text"
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-email">Email</label>
                  <input
                    type="email"
                    id="edit-email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-message">Message</label>
                  <textarea
                    id="edit-message"
                    value={editForm.message}
                    onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-save">Save Changes</button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
