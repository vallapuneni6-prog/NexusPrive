
import React, { useState } from 'react';
import { Lock, Shield, User, Briefcase, Crown, Loader2 } from 'lucide-react';

export type UserRole = 'Principal' | 'Asset Manager' | 'Wealth Advisor';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (role: UserRole) => {
    setSelectedRole(role);
    setIsAuthenticating(true);
    // Simulate high-security authentication handshake
    setTimeout(() => {
      onLogin(role);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#d4af37]/5 blur-[100px] md:blur-[160px] rounded-full -mr-48 md:-mr-96 -mt-48 md:-mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/[0.02] blur-[80px] md:blur-[120px] rounded-full -ml-24 md:-ml-48 -mb-24 md:-mb-48"></div>

      <div className="relative w-full max-w-lg">
        {/* Branding */}
        <div className="text-center mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 gold-bg rounded-xl md:rounded-2xl transform rotate-45 mb-6 md:mb-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <span className="text-black font-bold -rotate-45 text-xl md:text-2xl tracking-tighter">NP</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-[0.2em] mb-4 uppercase">Nexus Prive</h1>
          <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">Encrypted Portfolio Gateway</p>
        </div>

        {isAuthenticating ? (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="relative inline-block mb-8 md:mb-10">
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full"></div>
              <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-[#d4af37] animate-spin relative z-10" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 uppercase tracking-widest">Verifying Identity</h2>
            <p className="text-[9px] md:text-[10px] text-[#d4af37] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold animate-pulse">Establishing Secure Handshake...</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <p className="text-center text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold mb-6 md:mb-10">Select Authorized Access Level</p>
            
            <button 
              onClick={() => handleLogin('Principal')}
              className="w-full group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#d4af37]/40 p-6 md:p-8 rounded-xl md:rounded-[2rem] flex items-center justify-between transition-all duration-500"
            >
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500">
                  <Crown className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] group-hover:text-black" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-serif text-lg md:text-xl tracking-wider mb-0.5 md:mb-1">Principal Office</h3>
                  <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-bold">Settlement & Governance</p>
                </div>
              </div>
              <Lock className="w-3.5 h-3.5 text-gray-800 group-hover:text-[#d4af37] transition-colors" />
            </button>

            <button 
              onClick={() => handleLogin('Asset Manager')}
              className="w-full group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#d4af37]/40 p-6 md:p-8 rounded-xl md:rounded-[2rem] flex items-center justify-between transition-all duration-500"
            >
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] group-hover:text-black" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-serif text-lg md:text-xl tracking-wider mb-0.5 md:mb-1">Asset Manager</h3>
                  <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-bold">Capital & Yield Analysis</p>
                </div>
              </div>
              <Lock className="w-3.5 h-3.5 text-gray-800 group-hover:text-[#d4af37] transition-colors" />
            </button>

            <button 
              onClick={() => handleLogin('Wealth Advisor')}
              className="w-full group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#d4af37]/40 p-6 md:p-8 rounded-xl md:rounded-[2rem] flex items-center justify-between transition-all duration-500"
            >
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] group-hover:text-black" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-serif text-lg md:text-xl tracking-wider mb-0.5 md:mb-1">Wealth Advisor</h3>
                  <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-bold">Registry & AI Concierge</p>
                </div>
              </div>
              <Lock className="w-3.5 h-3.5 text-gray-800 group-hover:text-[#d4af37] transition-colors" />
            </button>

            <div className="pt-8 md:pt-10 flex justify-center">
              <button 
                onClick={onBack}
                className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold hover:text-white transition-colors"
              >
                ← Return to Public Site
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 md:mt-20 text-center flex items-center justify-center space-x-3 md:space-x-4 opacity-20">
          <Shield className="w-3.5 md:w-4 h-3.5 md:h-4" />
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold">P2P Encryption Active</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
