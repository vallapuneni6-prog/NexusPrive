
import React, { useState } from 'react';
import { X, Shield, CheckCircle2 } from 'lucide-react';
import { Lead, NetWorthBand } from '../types';
import { submitLeadToCRM } from '../services/crmService';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProperty?: string;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, preSelectedProperty }) => {
  const [formData, setFormData] = useState<Partial<Lead>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    investmentCeiling: '$5M - $10M',
    netWorthBand: '$10M - $50M',
    residencyStatus: 'HNI',
    propertyInterest: preSelectedProperty || '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const result = await submitLeadToCRM(formData);
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-[#12141d] border border-[#d4af37]/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[95vh]">
        {status === 'success' ? (
          <div className="w-full p-10 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px]">
            <CheckCircle2 className="w-16 h-16 text-[#d4af37] mb-8" />
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white text-center">Mandate Registered</h2>
            <p className="text-gray-400 max-w-sm mx-auto font-light leading-relaxed text-center">
              Your profile has been secured in the Nexus Prive Vault. A Senior Portfolio Advisor will reach out shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:flex w-5/12 bg-black/40 p-12 border-r border-white/5 flex-col justify-between">
              <div>
                <div className="w-10 h-10 gold-bg rounded-md transform rotate-45 mb-8 flex items-center justify-center">
                  <span className="text-black font-bold -rotate-45 text-sm">NP</span>
                </div>
                <h2 className="text-3xl font-serif mb-6 text-white leading-tight">Nexus Prive <br/><span className="italic">Onboarding</span></h2>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-[0.2em] font-medium">
                  Exclusive asset matching for global HNIs and NRIs. Secure, discrete, and curated.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Shield className="w-5 h-5 text-[#d4af37] opacity-60" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Prive Vault Encryption</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-center mb-8 md:hidden">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 gold-bg rounded-sm transform rotate-45 flex items-center justify-center">
                    <span className="text-black font-bold -rotate-45 text-[8px]">NP</span>
                  </div>
                  <span className="text-xs font-serif tracking-widest font-bold">NEXUS PRIVE</span>
                </div>
                <button onClick={onClose} className="text-gray-600 p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">First Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white transition-all" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Last Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white transition-all" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Residency Index</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white" value={formData.residencyStatus} onChange={e => setFormData({...formData, residencyStatus: e.target.value as any})}>
                      <option value="HNI">Indian HNI</option>
                      <option value="NRI">NRI (Global)</option>
                      <option value="Foreign National">Foreign National</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Net Worth Band</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white" value={formData.netWorthBand} onChange={e => setFormData({...formData, netWorthBand: e.target.value as NetWorthBand})}>
                      <option value="$5M - $10M">$5M - $10M</option>
                      <option value="$10M - $50M">$10M - $50M</option>
                      <option value="$50M - $100M">$50M - $100M</option>
                      <option value="$100M+">$100M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Investment Budget (USD)</label>
                  <select className="w-full bg-[#111] border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white" value={formData.investmentCeiling} onChange={e => setFormData({...formData, investmentCeiling: e.target.value})}>
                    <option>$1M - $5M</option>
                    <option>$5M - $20M</option>
                    <option>$20M - $50M</option>
                    <option>$50M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Private Mandate Brief</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 text-sm focus:border-[#d4af37] outline-none text-white transition-all resize-none" placeholder="Requirements..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full gold-bg text-black font-bold uppercase tracking-[0.3em] py-4 md:py-5 rounded-lg text-xs md:text-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Securing Mandate...' : 'Submit to Prive Vault'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;
