
import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Hark's AI assistant. Ask me anything about his experience, skills, or projects!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('years')) {
      return "Hark has 3+ years of experience as a Shopify developer and frontend engineer, specializing in custom eCommerce solutions and theme development.";
    } else if (lowerQuestion.includes('skills') || lowerQuestion.includes('technology')) {
      return "His core skills include JavaScript, Shopify development, frontend technologies, Java, and digital electronics. He's also a certified Shopify Partner.";
    } else if (lowerQuestion.includes('project') || lowerQuestion.includes('work')) {
      return "He's worked on various projects including binary arithmetic calculators, AI-powered transcription tools, and custom Shopify integrations that have increased client sales by an average of 40%.";
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('hire')) {
      return "You can contact Hark through the Contact section of this resume or connect with him on LinkedIn. He's currently available for freelance opportunities!";
    } else {
      return "That's a great question! Feel free to ask me about Hark's experience, skills, projects, or how to get in touch with him.";
    }
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Ask My AI Assistant</h2>
        <p className="section-subtitle">Get instant answers about my background</p>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.isUser ? 'user' : 'ai'}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <p>Thinking...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about Hark's experience..."
            className="chat-input-field"
          />
          <button onClick={handleSendMessage} className="chat-send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
