import React, { useState, useRef, useEffect } from 'react';
import './WaterAssistant.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WaterAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<{id: number; left: string; size: number; duration: number}[]>([]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate random bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3 + 2
      };
      setBubbles(prev => [...prev, newBubble]);
      
      // Remove bubble after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
      }, newBubble.duration * 1000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

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
      // Simulate AI thinking with water-themed responses
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateWaterResponse(currentInput),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some waves of trouble. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateWaterResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const waterResponses = [
      "The ocean's wisdom reminds us that even the mightiest waves start as gentle ripples. What else would you like to know?",
      "Like a river finding its way to the sea, I'm here to guide you. Tell me more about what you're looking for.",
      "In the vast ocean of information, I'm here to help you find the answers you seek. What's on your mind?",
      "Water teaches us patience and persistence. I'm here to help you navigate your questions.",
      "Just as water adapts to its container, I'm here to adapt to your needs. How can I assist you further?"
    ];

    const waterFacts = [
      "Did you know that water covers about 71% of the Earth's surface?",
      "Water is the only substance that naturally exists in three states: solid, liquid, and gas.",
      "The human body is about 60% water, and the brain is composed of about 75% water.",
      "Water expands by 9% when it freezes, which is why ice floats on water.",
      "The water you drink today could be the same water that dinosaurs drank millions of years ago!"
    ];

    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return "Hello! I'm your water-themed assistant. Like a gentle stream, I'm here to help you navigate your questions. What would you like to know?";
    } else if (lowerQuestion.includes('water') || lowerQuestion.includes('ocean') || lowerQuestion.includes('sea')) {
      return waterFacts[Math.floor(Math.random() * waterFacts.length)];
    } else if (lowerQuestion.includes('help')) {
      return "I'm here to help! You can ask me about water, the ocean, or anything else on your mind. I'll do my best to provide a thoughtful response.";
    } else if (lowerQuestion.includes('thank')) {
      return "You're welcome! Like the ocean's endless waves, I'm here whenever you need assistance.";
    } else if (lowerQuestion.includes('bye') || lowerQuestion.includes('goodbye')) {
      return "Farewell! May your journey be as smooth as a calm sea. Feel free to return with more questions!";
    } else {
      return waterResponses[Math.floor(Math.random() * waterResponses.length)];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="water-assistant">
      <div className="water-container">
        {bubbles.map(bubble => (
          <div 
            key={bubble.id}
            className="water-bubble"
            style={{
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`
            }}
          />
        ))}
        
        <div className="chat-container">
          <div className="chat-header">
            <div className="water-drop-icon">💧</div>
            <h2>Water Assistant</h2>
            <p>Dive into conversation with me!</p>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>🌊 Welcome to your water-themed assistant! Ask me anything, and I'll respond with wisdom from the depths.</p>
              </div>
            ) : (
              messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.isUser ? 'user' : 'ai'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="chat-input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage} 
              className="send-button"
              disabled={isLoading || !inputText.trim()}
            >
              <span className="button-icon">💧</span>
              <span className="button-text">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterAssistant;
