
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687940-4e524cb35a36?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_infinite]"
          alt="Luxury Property"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
        <h2 className="text-[#d4af37] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm mb-4 font-bold animate-fade-in">Private Wealth & Real Assets</h2>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif mb-6 md:mb-8 leading-tight">Curating the Future of <br/><span className="italic">Luxury Living</span></h1>
        <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4">
          Exclusive access to off-market investment-grade properties in India and global high-growth corridors. Tailored for the modern HNI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button className="w-full sm:w-auto px-8 md:px-10 py-4 gold-bg text-black font-bold uppercase tracking-widest hover:brightness-110 transition-all text-xs">
            Explore Portfolio
          </button>
          <button className="w-full sm:w-auto px-8 md:px-10 py-4 border border-white/20 hover:border-[#d4af37] transition-colors uppercase tracking-widest text-[10px] md:text-xs">
            Investment Insights
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 hidden sm:block">
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent to-[#d4af37]"></div>
      </div>
    </section>
  );
};

export default Hero;
