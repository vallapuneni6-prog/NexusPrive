
import { Lead, MandateLevel } from '../types';
import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = 'nexus_prive_leads_vault';

const MOCK_LEADS: Lead[] = [
  {
    id: 'm1',
    firstName: 'Vikram',
    lastName: 'Malhotra',
    email: 'v.malhotra@nexus-prive.com',
    phone: '+91 98200 12345',
    investmentCeiling: '$50M+',
    netWorthBand: '$100M+',
    residencyStatus: 'HNI',
    propertyInterest: 'The Skyline Penthouse',
    status: 'Prospect',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    estimatedValue: 55000000,
    notes: 'Looking for a trophy asset in South Mumbai. Interested in high floor height.'
  },
  {
    id: 'm2',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'schen@techventures.sg',
    phone: '+65 8822 4411',
    investmentCeiling: '$20M - $50M',
    netWorthBand: '$50M - $100M',
    residencyStatus: 'Foreign National',
    propertyInterest: 'Azure Bay Villa',
    status: 'Qualified',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    estimatedValue: 32000000,
    notes: 'Tech founder relocating. Priority on security and privacy.'
  },
  {
    id: 'm3',
    firstName: 'Rajesh',
    lastName: 'Gupta',
    email: 'r.gupta@prive-london.co.uk',
    phone: '+44 7700 900123',
    investmentCeiling: '$5M - $20M',
    netWorthBand: '$10M - $50M',
    residencyStatus: 'NRI',
    propertyInterest: 'Highclere Estate',
    status: 'Site Visit',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    estimatedValue: 18000000,
    notes: 'Wants to diversify portfolio back to India. Focus on rental yield.'
  }
];

export const getLeads = (): Lead[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_LEADS));
    return MOCK_LEADS;
  }
  return JSON.parse(data);
};

export const submitLeadToCRM = async (leadData: Partial<Lead>): Promise<{ success: boolean; message: string }> => {
  const leads = getLeads();
  const newLead: Lead = {
    id: Math.random().toString(36).substr(2, 9),
    firstName: leadData.firstName || '',
    lastName: leadData.lastName || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    investmentCeiling: leadData.investmentCeiling || '$5M',
    netWorthBand: leadData.netWorthBand || '$5M - $10M',
    propertyInterest: leadData.propertyInterest,
    residencyStatus: leadData.residencyStatus || 'HNI',
    message: leadData.message,
    status: 'Prospect',
    timestamp: new Date().toISOString(),
    estimatedValue: parseInt((leadData.investmentCeiling || '5000000').replace(/[^0-9]/g, '')) || 5000000,
    notes: leadData.message || ''
  };

  leads.push(newLead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: "Mandate successfully registered in Nexus Prive Vault." };
};

export const updateLeadStatus = (id: string, status: MandateLevel) => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const generateStrategicMemo = async (lead: Lead) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a Nexus Prive Strategic Mandate Memo for an ultra-luxury real estate negotiation.
      Client: ${lead.firstName} ${lead.lastName}
      Identity: ${lead.residencyStatus}
      Net Worth: ${lead.netWorthBand}
      Stage: ${lead.status}
      Mandate Details: ${lead.notes}
      
      Structure the response as:
      1. ASSET ALIGNMENT: Why ${lead.propertyInterest || 'Prime Global Assets'} fits their wealth strategy.
      2. NEGOTIATION LEVERAGE: Stage-specific tactics for the ${lead.status} phase.
      3. TAX & COMPLIANCE: Advice tailored to their ${lead.residencyStatus} status.`,
      config: {
        systemInstruction: "You are the Nexus Prive AI Strategy Engine. Use high-end, analytical, and elite real estate consulting language. Focus on wealth preservation and discretion.",
      }
    });
    return response.text;
  } catch (error) {
    return "Intelligence synthesis offline.";
  }
};

export const generateBespokeOutreach = async (lead: Lead) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft an elite, concierge-level property invitation for ${lead.firstName} ${lead.lastName} from Nexus Prive. 
      Residency: ${lead.residencyStatus}. 
      Investment Ceiling: ${lead.investmentCeiling}.
      Context: Interested in ${lead.propertyInterest || 'Prime Global Assets'}.
      Tone: Discreet, sophisticated, inviting them to an off-market private viewing.`,
      config: {
        systemInstruction: "You are a private concierge for Nexus Prive ultra-luxury real estate. Tone: Elite, subtle, exclusive. Avoid salesy language.",
      }
    });
    return response.text;
  } catch (error) {
    return "Outreach automation offline.";
  }
};

export const generateMarketForecast = async (leads: Lead[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const pipelineData = leads.map(l => `${l.residencyStatus} (${l.status}) with ${l.investmentCeiling} budget`).join(', ');
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a High-Level Analysis of the Nexus Prive Pipeline.
      Current Data: ${pipelineData}
      
      Identify:
      1. CAPITAL TRENDS: Where is the money moving?
      2. DEMAND SPIKES: Which property types are trending (Penthouse, Villa, etc.)?
      3. NRI INFLUX: Analyze the concentration of NRI vs HNI interest.`,
      config: {
        systemInstruction: "You are the Nexus Prive Macro Analyst. Provide data-driven predictions about global HNI/NRI capital movement in real estate.",
      }
    });
    return response.text;
  } catch (error) {
    return "Market forecasting unavailable.";
  }
};
