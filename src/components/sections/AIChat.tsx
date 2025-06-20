
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
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are Hark's AI assistant for his resume. Answer questions about his background professionally. Key info: 
              - 3+ years Shopify developer and frontend engineer
              - Certified Shopify Partner
              - Skills: JavaScript, Shopify development, Java, digital electronics
              - Increased client sales by 40% on average
              - Available for freelance work
              Keep responses concise and professional.`
            },
            {
              role: 'user',
              content: currentInput
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      const aiText = data.choices[0]?.message?.content || 'Sorry, I could not process that request.';

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Fallback to local responses if API fails
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(currentInput),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsLoading(false);
    }
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
