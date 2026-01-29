
import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onCrmLogin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCrmLogin }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 gold-bg rounded-sm transform rotate-45 flex items-center justify-center">
              <span className="text-black font-bold -rotate-45 text-xs">NP</span>
            </div>
            <span className="text-xl font-serif tracking-widest font-bold">NEXUS PRIVE</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            The global standard for luxury real estate asset management. Curating bespoke portfolios for the world's most discerning investors.
          </p>
        </div>
        
        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-8 text-[#d4af37]">Global Portfolio</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Mumbai Elite</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dubai Residency</a></li>
            <li><a href="#" className="hover:text-white transition-colors">London Heritage</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Singapore Central</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-8 text-[#d4af37]">NRI Services</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Repatriation Advice</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Property Management</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tax Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Virtual Site Tours</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-8 text-[#d4af37]">System Access</h4>
          {onCrmLogin && (
            <button 
              onClick={onCrmLogin}
              className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-3 rounded text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all group"
            >
              <Lock className="w-3 h-3 group-hover:animate-pulse" />
              <span>Nexus Prive Hub</span>
            </button>
          )}
          <div className="mt-8">
            <p className="text-gray-500 text-xs mb-4">Private Wealth Newsletter</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Discreet Email Address" 
                className="bg-transparent text-xs w-full focus:outline-none"
              />
              <button className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">Join</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">
        <p>&copy; 2025 Nexus Prive Global Advisory. Wealth. Legacy. Horizon.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Disclosures</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
