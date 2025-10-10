import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/use-toast';
import '../styles/admin-dashboard.css';

interface Contact {
  id: number;
  clerk_user_id: string | null;
  name: string;
  email: string;
  message: string;
  subject: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

/**
 * Admin Dashboard Component
 * 
 * Allows admin users to view and manage contact submissions.
 * Only accessible to users with admin role in Clerk.
 * 
 * @component
 * @returns {JSX.Element} Rendered admin dashboard
 */
const AdminDashboard: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { success, error } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      fetchContacts();
    }
  }, [isSignedIn, isAdmin]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching contacts from Contacts table...');
      
      const { data, error } = await supabase
        .from('Contacts')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Admin fetch response - Data:', data);
      console.log('📊 Admin fetch response - Error:', error);

      if (error) throw error;
      setContacts(data || []);
      console.log('✅ Contacts loaded:', data?.length || 0, 'records');
    } catch (err) {
      console.error('Error fetching contacts:', err);
      error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('Contacts')
        .update({ 
          status: newStatus,
          replied_at: newStatus === 'replied' ? new Date().toISOString() : null
        })
        .eq('id', contactId);

      if (error) throw error;
      
      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId 
            ? { ...contact, status: newStatus as any }
            : contact
        )
      );
      
      success('Contact status updated successfully');
    } catch (err) {
      console.error('Error updating contact:', err);
      error('Failed to update contact status');
    }
  };

  if (!isSignedIn) {
    return (
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <p>Please sign in to access the admin dashboard.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <p>Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.firstName}! Manage contact submissions below.</p>
      
      <div className="contacts-grid">
        <div className="contacts-list">
          <h3>Contact Submissions ({contacts.length})</h3>
          <div className="contacts-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>
                      <span className={`status-badge status-${contact.status}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => setSelectedContact(contact)}
                        className="btn-view"
                      >
                        View
                      </button>
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
              <p><strong>Subject:</strong> {selectedContact.subject}</p>
              <p><strong>Status:</strong> {selectedContact.status}</p>
              <p><strong>Date:</strong> {new Date(selectedContact.created_at).toLocaleString()}</p>
              <p><strong>Message:</strong></p>
              <div className="message-content">
                {selectedContact.message}
              </div>
            </div>
            
            <div className="contact-actions">
              <select 
                value={selectedContact.status}
                onChange={(e) => updateContactStatus(selectedContact.id, e.target.value)}
                className="status-select"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
              
              <button 
                onClick={() => setSelectedContact(null)}
                className="btn-close"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
