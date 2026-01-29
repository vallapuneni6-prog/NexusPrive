
import React, { useState, useRef, useEffect } from 'react';
import { getPropertyAdvice } from '../services/geminiService';
import { Send, Bot, Sparkles, UserCheck, X } from 'lucide-react';

interface AiConciergeProps {
  onSuggestEnquiry: () => void;
}

const AiConcierge: React.FC<AiConciergeProps> = ({ onSuggestEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Welcome to the Nexus Prive Desk. I am your specialized Asset Advisor. How can I assist your global portfolio strategy today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getPropertyAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I apologize, our secure advisory line is experiencing heavy traffic. Please contact our human concierge." }]);
    setIsLoading(false);

    const triggerWords = ['invest', 'price', 'roi', 'buy', 'nri', 'tax', 'view', 'mumbai', 'dubai'];
    if (triggerWords.some(word => userMsg.toLowerCase().includes(word))) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Would you like me to arrange a private consultation with our Senior Wealth Manager to discuss this further?" 
        }]);
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button 
        id="concierge"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 md:bottom-8 right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 gold-bg rounded-full shadow-2xl flex items-center justify-center z-[100] hover:scale-110 transition-transform active:scale-95"
      >
        <Sparkles className="text-black w-6 h-6 md:w-8 md:h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-8 w-full sm:w-[450px] h-full sm:h-[650px] sm:max-h-[80vh] bg-[#0f0f0f] sm:border sm:border-[#d4af37]/30 shadow-2xl z-[150] flex flex-col sm:rounded-2xl overflow-hidden backdrop-blur-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="gold-bg p-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3 text-black">
              <div className="bg-black/10 p-2 rounded-lg">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base md:text-lg tracking-tight text-black">Prive Advisor</h4>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                  <p className="text-[9px] uppercase tracking-widest font-bold opacity-70">Secured Line Active</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:rotate-90 transition-transform p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-[#d4af37] text-black rounded-tr-none font-bold' 
                  : 'bg-[#1a1a1a] text-gray-200 border border-white/5 rounded-tl-none'
                }`}>
                  {m.content}
                  {m.content.includes("private consultation") && (
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        onSuggestEnquiry();
                      }}
                      className="mt-4 w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-colors border border-white/10 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Request Access</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 md:p-6 border-t border-white/5 bg-black/50 pb-8 sm:pb-6">
            <div className="relative flex items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about market trends..."
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-4 px-5 pr-14 text-sm focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-gray-600 text-white"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 p-2 text-[#d4af37] hover:scale-110 transition-transform disabled:opacity-30"
              >
                <Send className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiConcierge;
