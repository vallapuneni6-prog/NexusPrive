
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onEnquireClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 gold-bg rounded-sm transform rotate-45 flex items-center justify-center">
            <span className="text-black font-bold -rotate-45 text-xs">NP</span>
          </div>
          <span className="text-lg md:text-xl font-serif tracking-widest font-bold">NEXUS PRIVE</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-[10px] tracking-widest uppercase font-bold">
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-[#d4af37] transition-colors">Portfolio</button>
          <button onClick={() => scrollToSection('advisory')} className="hover:text-[#d4af37] transition-colors">Advisory</button>
          <button onClick={() => scrollToSection('insights')} className="hover:text-[#d4af37] transition-colors">Insights</button>
          <button onClick={() => scrollToSection('concierge')} className="hover:text-[#d4af37] transition-colors">Concierge</button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onEnquireClick}
            className="hidden sm:block border border-[#d4af37] text-[#d4af37] px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all duration-300 font-bold"
          >
            Enquire Now
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-t border-white/5 py-10 px-6 flex flex-col space-y-8 animate-in slide-in-from-top-4 duration-300">
          <button onClick={() => scrollToSection('portfolio')} className="text-left text-xs tracking-[0.3em] uppercase font-bold text-gray-400 hover:text-[#d4af37]">Portfolio</button>
          <button onClick={() => scrollToSection('advisory')} className="text-left text-xs tracking-[0.3em] uppercase font-bold text-gray-400 hover:text-[#d4af37]">Advisory</button>
          <button onClick={() => scrollToSection('insights')} className="text-left text-xs tracking-[0.3em] uppercase font-bold text-gray-400 hover:text-[#d4af37]">Insights</button>
          <button onClick={() => scrollToSection('concierge')} className="text-left text-xs tracking-[0.3em] uppercase font-bold text-gray-400 hover:text-[#d4af37]">Concierge</button>
          <button 
            onClick={() => {
              onEnquireClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-4 gold-bg text-black text-[10px] uppercase tracking-widest font-bold"
          >
            Enquire Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
