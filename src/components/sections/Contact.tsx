import React, { useState } from 'react';
import { useToast } from '../../hooks/use-toast';

/**
 * Contact Component
 * 
 * A form component that allows users to send messages directly from the website.
 * Includes form validation and toast notifications for user feedback.
 * 
 * @component
 * @returns {JSX.Element} Rendered Contact form component
 */

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your backend
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      success('Thank you for reaching out. I will get back to you soon!');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      error(`There was an error sending your message: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">I'd love to hear from you</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Feel free to reach out to me through any of these channels:</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:markndeche91@gmail.com">Hark Ndeche</a>
              </div>
            </div>
            
            <div className="contact-method">
              <span className="contact-icon">💼</span>
              <div>
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/hark-ndeche-09271a25a/" target="_blank" rel="noopener noreferrer">Hark Ndeche</a>
              </div>
            </div>
            
            <div className="contact-method">
              <span className="contact-icon">💻</span>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/harkemoyo" target="_blank" rel="noopener noreferrer">github.com/yourusername</a>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <h3>Send Me a Message</h3>
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="hark@ndeche.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="How can I help you?"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
