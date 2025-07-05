import React, { useState, FC } from 'react';
import { useToast } from '../../hooks/use-toast';
import styles from './Contact.module.css';

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

interface ContactInfo {
  title: string;
  value: string;
  link?: string;
  icon: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const Contact: FC = () => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/harkemoyo', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hark-ndeche-09271a25a/', icon: 'linkedin' },
    { name: 'X (Twitter)', url: 'https://x.com/harkemoyo', icon: 'twitter' },
    { name: 'Email', url: 'mailto:markndeche91@gmail.com', icon: 'mail' },
  ];
  
  const contactInfo: ContactInfo[] = [
    { 
      title: 'Email', 
      value: 'markndeche91@gmail.com', 
      link: 'mailto:markndeche91@gmail.com',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      title: 'Location', 
      value: 'Nairobi, Kenya', 
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    },
    { 
      title: 'Availability', 
      value: 'Available for freelance work', 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

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
          // Mock API call with a timeout
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
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
    <section className={styles.contactSection}>
      <div className={styles.contactHeader}>
        <h2 className={styles.contactTitle}>Get In Touch</h2>
        <p className={styles.contactSubtitle}>
          Have a project in mind or want to say hello? I'm always open to discussing new opportunities, 
          creative ideas, or just a friendly chat. Drop me a message and I'll get back to you as soon as possible!
        </p>
      </div>
      
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h3>Contact Information</h3>
          <div className={styles.contactDetails}>
            {contactInfo.map((item, index) => (
              <div key={index} className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <h4>{item.title}</h4>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.socialSection}>
            <h4>Connect with me</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.icon === 'github' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>}
                    {social.icon === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>}
                    {social.icon === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path>}
                    {social.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.formControl}
                placeholder="Hark Ndeche"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.formControl}
                placeholder="markndeche91@gmail.com"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={`${styles.formControl} ${styles.textarea}`}
                placeholder="Hello! I'd like to discuss a potential project..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
