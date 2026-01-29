
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import MarketAnalysis from './components/MarketAnalysis';
import AiConcierge from './components/AiConcierge';
import Footer from './components/Footer';
import LeadFormModal from './components/LeadFormModal';
import AureosCrm from './components/AureosCrm';
import Login, { UserRole } from './components/Login';
import { ShieldCheck, TrendingUp, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'website' | 'login' | 'crm'>('website');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>();

  const openEnquiry = (propertyName?: string) => {
    setSelectedProperty(propertyName);
    setIsLeadModalOpen(true);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setView('crm');
  };

  const handleLogout = () => {
    setUserRole(null);
    setView('website');
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} onBack={() => setView('website')} />;
  }

  if (view === 'crm') {
    return <AureosCrm onLogout={handleLogout} userRole={userRole || 'Wealth Advisor'} />;
  }

  return (
    <div className="min-h-screen selection:bg-[#d4af37] selection:text-black">
      <Navbar onEnquireClick={() => openEnquiry()} />
      
      <Hero />

      {/* Trust Bar */}
      <section className="bg-black py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'AUM MANAGED', val: '$2.4B+' },
            { label: 'GLOBAL CITIES', val: '18+' },
            { label: 'TRUSTED CLIENTS', val: '500+' },
            { label: 'AVG ROI', val: '14.5%' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-[#d4af37] text-4xl font-serif mb-2 transition-transform group-hover:scale-110 duration-500">{stat.val}</p>
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Showcase */}
      <PropertyGrid onEnquire={openEnquiry} />

      {/* Advisory & Market Section */}
      <section id="advisory" className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10">
            <h2 className="text-[#d4af37] uppercase tracking-[0.3em] text-xs mb-6 font-bold">Investment Advisory</h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Preserving Wealth Across <br/><span className="italic">Generations</span></h3>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed font-light">
              We specialize in mapping the movement of global capital. Our proprietary analytics engine identifies emerging luxury corridors before they hit the mainstream market. For NRIs, we provide a seamless "End-to-End" acquisition model.
            </p>
            
            <div className="grid gap-10">
              {[
                { icon: <ShieldCheck className="w-8 h-8" />, title: 'Asset Protection', desc: 'Secure legal structures and tax-optimized instruments for NRI investments.' },
                { icon: <TrendingUp className="w-8 h-8" />, title: 'Yield Optimization', desc: 'Active portfolio management to maximize rental and long-term capital appreciation.' },
                { icon: <Globe className="w-8 h-8" />, title: 'Global Diversification', desc: 'Bespoke exposure to residential and commercial real assets in high-growth corridors.' }
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-8 group">
                  <div className="text-[#d4af37] mt-1 p-3 bg-white/5 rounded-xl group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-2xl mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div id="insights" className="relative group">
            <div className="absolute -inset-4 bg-[#d4af37]/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <MarketAnalysis />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 grayscale scale-110"
            alt="CTA Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 border border-[#d4af37]/40 rounded-full mb-8">
            <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-bold">Limited Availability</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-serif mb-12 text-white leading-tight">Curate Your <br/> <span className="italic text-[#d4af37]">Global Legacy</span></h2>
          <p className="text-gray-400 mb-16 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Join an exclusive circle of international investors. Access off-market opportunities and institutional-grade real estate assets.
          </p>
          <button 
            onClick={() => openEnquiry()}
            className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#d4af37] text-black font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:pr-16"
          >
            <span className="relative z-10 text-sm">Schedule Private Consultation</span>
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
          </button>
        </div>
      </section>

      <Footer onCrmLogin={() => setView('login')} />
      
      {/* Modals & Floating Elements */}
      <AiConcierge onSuggestEnquiry={() => openEnquiry()} />
      <LeadFormModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        preSelectedProperty={selectedProperty}
      />
    </div>
  );
};

export default App;
