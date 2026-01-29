
import React, { useState, useEffect } from 'react';
import { getLeads, updateLeadStatus, generateStrategicMemo, generateBespokeOutreach, generateMarketForecast } from '../services/crmService';
import { Lead, MandateLevel } from '../types';
import { UserRole } from './Login';
import { 
  Users, TrendingUp, LogOut, Search, FileText, 
  DollarSign, Zap, Target, BarChart3, PieChart,
  Mail, Globe, Briefcase, Activity, ChevronRight, CheckCircle2,
  TrendingDown, ArrowUpRight, ShieldCheck, Crown, Landmark, Menu, X, ArrowLeft
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AureosCrmProps {
  onLogout: () => void;
  userRole: UserRole;
}

type TabType = 'leads' | 'funnel' | 'ledger' | 'intelligence';

const ACTIVE_LEVELS: MandateLevel[] = ['Prospect', 'Qualified', 'Site Visit', 'Negotiation', 'Under Contract'];
const ALL_LEVELS: MandateLevel[] = [...ACTIVE_LEVELS, 'Closed'];

const PROBABILITY_WEIGHTS: Record<MandateLevel, number> = {
  'Prospect': 0.1,
  'Qualified': 0.3,
  'Site Visit': 0.5,
  'Negotiation': 0.75,
  'Under Contract': 0.9,
  'Closed': 1.0
};

const AureosCrm: React.FC<AureosCrmProps> = ({ onLogout, userRole }) => {
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [residencyFilter, setResidencyFilter] = useState<'ALL' | 'HNI' | 'NRI'>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [outreach, setOutreach] = useState<string | null>(null);
  const [forecast, setForecast] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const roleTabs: Record<UserRole, TabType[]> = {
    'Principal': ['ledger', 'funnel', 'leads'],
    'Asset Manager': ['funnel', 'leads', 'intelligence'],
    'Wealth Advisor': ['leads', 'intelligence']
  };

  useEffect(() => {
    setLeads(getLeads());
    if (userRole === 'Principal') setActiveTab('ledger');
    else if (userRole === 'Asset Manager') setActiveTab('funnel');
    else setActiveTab('leads');
  }, [userRole]);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesResidency = residencyFilter === 'ALL' || l.residencyStatus === residencyFilter;
    const isActive = l.status !== 'Closed';
    return matchesSearch && matchesResidency && (activeTab === 'ledger' ? l.status === 'Closed' : isActive);
  });

  const handleStatusChange = (id: string, status: MandateLevel) => {
    if (userRole === 'Wealth Advisor' && (status === 'Closed' || status === 'Under Contract')) {
      alert("Unauthorized: Settlement level status changes require Asset Manager or Principal approval.");
      return;
    }
    updateLeadStatus(id, status);
    const updated = getLeads();
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  const runIntelligence = async (type: 'memo' | 'outreach' | 'forecast') => {
    setIsGenerating(true);
    setMemo(null); setOutreach(null); setForecast(null);
    if (type === 'memo' && selectedLead) {
      setMemo(await generateStrategicMemo(selectedLead));
    } else if (type === 'outreach' && selectedLead) {
      setOutreach(await generateBespokeOutreach(selectedLead));
    } else if (type === 'forecast') {
      setForecast(await generateMarketForecast(leads));
    }
    setIsGenerating(false);
  };

  const closedLeads = leads.filter(l => l.status === 'Closed');
  const totalSettledValue = closedLeads.reduce((acc, l) => acc + l.estimatedValue, 0);
  const totalCommission = totalSettledValue * 0.02;

  const activeLeads = leads.filter(l => l.status !== 'Closed');
  const totalOpportunityValue = activeLeads.reduce((acc, l) => acc + l.estimatedValue, 0);
  const weightedPipelineRevenue = activeLeads.reduce((acc, l) => {
    return acc + (l.estimatedValue * PROBABILITY_WEIGHTS[l.status]);
  }, 0);

  const funnelData = ACTIVE_LEVELS.map(status => ({
    name: status,
    count: leads.filter(l => l.status === status).length,
    weightedValue: leads.filter(l => l.status === status).reduce((acc, l) => acc + (l.estimatedValue * PROBABILITY_WEIGHTS[status]), 0),
    probability: (PROBABILITY_WEIGHTS[status] * 100) + '%'
  }));

  const allTabs: { id: TabType; icon: React.ReactNode; label: string }[] = [
    { id: 'ledger', icon: <Landmark className="w-4 h-4" />, label: 'Settlement Ledger' },
    { id: 'funnel', icon: <BarChart3 className="w-4 h-4" />, label: 'Capital Funnel' },
    { id: 'leads', icon: <Users className="w-4 h-4" />, label: 'Mandate Registry' },
    { id: 'intelligence', icon: <Zap className="w-4 h-4" />, label: 'Prive Intelligence' }
  ];

  const visibleTabs = allTabs.filter(tab => roleTabs[userRole].includes(tab.id));

  const SidebarContent = () => (
    <>
      <div className="p-8 md:p-12 border-b border-white/5 bg-black/40">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 md:w-10 md:h-10 gold-bg rounded-lg transform rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <span className="text-black font-bold -rotate-45 text-xs md:text-sm tracking-tighter">NP</span>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] font-bold text-white uppercase">Nexus Prive</span>
            <p className="text-[8px] text-[#d4af37] tracking-[0.5em] font-bold uppercase mt-1">Hub v2.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6 md:p-10 space-y-4 overflow-y-auto">
        <div className="mb-6 px-6">
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">Authorized View</p>
        </div>
        {visibleTabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedLead(null);
              setMemo(null); setOutreach(null); setForecast(null);
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-5 px-6 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${activeTab === tab.id ? 'bg-[#d4af37] text-black shadow-xl shadow-[#d4af37]/10' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 md:p-10 border-t border-white/5 bg-black/40">
        <button onClick={onLogout} className="w-full flex items-center space-x-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-[#d4af37] transition-colors font-bold group">
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Terminate</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#d4af37] selection:text-black antialiased overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 bg-[#0a0a0a] border-r border-white/5 flex-col shadow-2xl z-30">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Panel */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#050505] to-[#0a0a0a] flex flex-col">
        <header className="h-20 md:h-28 border-b border-white/5 flex items-center justify-between px-4 md:px-16 backdrop-blur-3xl sticky top-0 z-40 bg-[#050505]/80">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-white p-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-4">
                {userRole === 'Principal' && <Crown className="w-5 h-5 text-[#d4af37]" />}
                {userRole === 'Asset Manager' && <Briefcase className="w-5 h-5 text-[#d4af37]" />}
                {userRole === 'Wealth Advisor' && <Users className="w-5 h-5 text-[#d4af37]" />}
                <h2 className="text-xl md:text-3xl font-serif text-white uppercase tracking-widest truncate">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
              </div>
            </div>
            {/* Mobile Header Title */}
            <h2 className="sm:hidden text-sm font-serif text-white uppercase tracking-widest truncate">{activeTab}</h2>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-10">
            <div className="hidden md:block relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#d4af37] transition-colors" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Vault..." 
                className="bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-8 text-[11px] focus:outline-none focus:border-[#d4af37] w-48 xl:w-80 text-white placeholder:text-gray-700 font-medium transition-all" 
              />
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-6 border-l border-white/10 pl-4 md:pl-10">
               <div className="hidden sm:block text-right">
                  <p className="text-[8px] md:text-[9px] text-gray-600 uppercase tracking-widest font-bold">{userRole}</p>
                  <p className="text-[10px] md:text-xs text-white font-medium">Nexus Prive Admin</p>
               </div>
               <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#d4af37]/40 p-1 flex-shrink-0">
                 <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37] to-amber-950 flex items-center justify-center text-xs md:text-sm font-bold text-black uppercase">
                    {userRole.charAt(0)}
                 </div>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-16 max-w-[1800px] mx-auto w-full">
          {/* Tab: Registry */}
          {activeTab === 'leads' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-16 relative">
              <div className={`${selectedLead ? 'hidden xl:block' : 'block'} xl:col-span-2 space-y-4 md:space-y-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 md:mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-6 overflow-x-auto pb-2 sm:pb-0 scroll-hide">
                    <button onClick={() => setResidencyFilter('ALL')} className={`text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap ${residencyFilter === 'ALL' ? 'text-[#d4af37]' : 'text-gray-600'}`}>All</button>
                    <button onClick={() => setResidencyFilter('HNI')} className={`text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap ${residencyFilter === 'HNI' ? 'text-[#d4af37]' : 'text-gray-600'}`}>HNI</button>
                    <button onClick={() => setResidencyFilter('NRI')} className={`text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap ${residencyFilter === 'NRI' ? 'text-[#d4af37]' : 'text-gray-600'}`}>NRI</button>
                  </div>
                </div>
                
                {filteredLeads.map(lead => (
                  <div 
                    key={lead.id} 
                    onClick={() => { setSelectedLead(lead); setMemo(null); setOutreach(null); }}
                    className={`p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border transition-all duration-500 cursor-pointer group relative overflow-hidden ${selectedLead?.id === lead.id ? 'border-[#d4af37] bg-white/[0.04] shadow-2xl' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                      <div className="flex items-center space-x-4 md:space-x-8">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${lead.residencyStatus === 'NRI' ? 'bg-[#d4af37]' : 'bg-blue-500'}`}></div>
                        <div>
                          <h4 className="text-lg md:text-2xl font-serif text-white group-hover:text-[#d4af37] transition-colors">{lead.firstName} {lead.lastName}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mt-2 font-bold">
                            <span className="text-[#d4af37]">{lead.residencyStatus}</span>
                            <span className="hidden sm:inline opacity-20 text-white">|</span>
                            <span>{lead.investmentCeiling} Budget</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                        <p className="text-[9px] md:text-[10px] text-gray-700 font-bold tracking-widest uppercase italic">{lead.propertyInterest}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mandate Deck View */}
              <div className={`${selectedLead ? 'block' : 'hidden xl:block'} xl:col-span-1`}>
                {selectedLead ? (
                  <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />
                        <h3 className="text-xl md:text-3xl font-serif text-white uppercase tracking-widest">Mandate Deck</h3>
                      </div>
                      <button className="xl:hidden p-2 text-gray-500" onClick={() => setSelectedLead(null)}>
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-6 md:mb-8 font-bold">Capital Progression</p>
                      <div className="grid grid-cols-1 gap-2">
                        {ALL_LEVELS.map((level, idx) => {
                          const isCurrent = selectedLead.status === level;
                          const isPast = ALL_LEVELS.indexOf(selectedLead.status) > idx;
                          return (
                            <button 
                              key={level}
                              onClick={() => handleStatusChange(selectedLead.id, level)}
                              className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${isCurrent ? 'bg-[#d4af37] border-[#d4af37] text-black sm:scale-105' : isPast ? 'bg-white/5 border-white/10 text-[#d4af37] opacity-60' : 'bg-black/40 border-white/5 text-gray-700 hover:border-white/10'}`}
                            >
                              <div className="flex items-center space-x-3 md:space-x-4">
                                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[8px] md:text-[9px] font-bold border ${isCurrent ? 'border-black' : isPast ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'border-gray-800'}`}>
                                  {isPast ? <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3" /> : idx + 1}
                                </div>
                                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">{level}</span>
                              </div>
                              <span className="text-[8px] md:text-[9px] font-bold opacity-70">{(PROBABILITY_WEIGHTS[level] * 100)}%</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-6 md:pt-10 border-t border-white/5 space-y-4">
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <button onClick={() => runIntelligence('memo')} disabled={isGenerating} className="gold-bg text-black font-bold uppercase tracking-[0.2em] py-4 md:py-5 text-[8px] md:text-[9px] rounded-xl md:rounded-2xl hover:brightness-110 disabled:opacity-50 flex items-center justify-center space-x-2 md:space-x-3 transition-all">
                          <Zap className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          <span>Memo</span>
                        </button>
                        <button onClick={() => runIntelligence('outreach')} disabled={isGenerating} className="bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] py-4 md:py-5 text-[8px] md:text-[9px] rounded-xl md:rounded-2xl hover:bg-white/10 disabled:opacity-50 flex items-center justify-center space-x-2 md:space-x-3 transition-all">
                          <Mail className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          <span>Script</span>
                        </button>
                      </div>
                    </div>

                    {(memo || outreach) && (
                      <div className="mt-6 md:mt-8 bg-black/60 border border-[#d4af37]/20 p-6 md:p-8 rounded-2xl md:rounded-3xl text-[10px] md:text-[11px] text-gray-400 leading-relaxed max-h-[300px] md:max-h-[400px] overflow-y-auto animate-in zoom-in-95 duration-500 custom-scrollbar">
                        <div className="flex items-center space-x-3 text-[#d4af37] font-bold mb-4 md:mb-6 uppercase tracking-[0.4em] border-b border-white/5 pb-4">
                          <Activity className="w-3.5 md:w-4 h-3.5 md:h-4" />
                          <span>Prive Intelligence</span>
                        </div>
                        <div className="whitespace-pre-wrap font-serif text-base md:text-lg leading-relaxed text-gray-200">
                          {memo || outreach}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden xl:flex text-center p-32 bg-black/40 rounded-[3rem] border border-dashed border-white/10 opacity-20 h-[600px] flex-col justify-center animate-pulse">
                    <Target className="w-12 h-12 text-gray-800 mx-auto mb-8" />
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-bold">Select Active Mandate</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other tabs follow similar structure but with Nexus Prive labels */}
          {activeTab === 'funnel' && (
            <div className="space-y-8 md:space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12">
                <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-2xl md:rounded-[3rem] relative overflow-hidden shadow-2xl">
                  <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Realistic Revenue</p>
                  <p className="text-3xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight">${weightedPipelineRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intelligence' && (
            <div className="space-y-12 md:space-y-16 max-w-6xl mx-auto py-4 md:py-10">
               <div className="text-center mb-12 md:mb-24 px-4">
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-4 md:mb-8 uppercase tracking-[0.1em] md:tracking-[0.2em]">Nexus <span className="italic text-[#d4af37]">Prive AI</span></h3>
                  <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold">Macro Intelligence Engine</p>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-20 rounded-2xl md:rounded-[4rem] shadow-2xl text-center flex flex-col items-center group">
                  <button onClick={() => runIntelligence('forecast')} disabled={isGenerating} className="group mb-10 md:mb-16 flex flex-col items-center">
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-6 md:mb-10 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.25)] bg-[#d4af37]/5 transition-all">
                      <Globe className={`w-8 h-8 md:w-12 md:h-12 text-[#d4af37] ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-1000'}`} />
                    </div>
                    <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-[12px] group-hover:text-[#d4af37] transition-colors">Generate Pipeline Report</span>
                  </button>
                  {forecast && (
                    <div className="text-left w-full bg-black border border-white/5 p-6 md:p-16 rounded-2xl md:rounded-[3rem] text-sm md:text-lg text-gray-300 leading-relaxed font-light whitespace-pre-wrap animate-in zoom-in-95 duration-700">
                      {forecast}
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[3.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 md:p-20 border-b border-white/5 bg-gradient-to-br from-black to-[#d4af37]/5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                <div>
                  <h4 className="text-2xl md:text-5xl font-serif text-white uppercase tracking-[0.1em] mb-4">Nexus Ledger</h4>
                  <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-[0.6em] font-bold">Immutable Transaction Record</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-4xl md:text-7xl font-serif text-[#d4af37] tracking-tight">${totalCommission.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AureosCrm;
