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
              <span className="contact-icon">
                {/* Email SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <div>
                <h4>Email</h4>
                <a href="mailto:markndeche91@gmail.com">Hark Ndeche</a>
              </div>
            </div>
            
            <div className="contact-method">
              <span className="contact-icon">
                {/* LinkedIn SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>
              <div>
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/hark-ndeche-09271a25a/" target="_blank" rel="noopener noreferrer">Hark Ndeche</a>
              </div>
            </div>
            
            <div className="contact-method">
              <span className="contact-icon">
                {/* GitHub SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </span>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/harkemoyo" target="_blank" rel="noopener noreferrer">github.com/harkemoyo</a>
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
