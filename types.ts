
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: 'Penthouse' | 'Villa' | 'Estate' | 'Mansion';
  sqft: number;
  bedrooms: number;
  image: string;
  roi: string;
  description: string;
}

export type MandateLevel = 'Prospect' | 'Qualified' | 'Site Visit' | 'Negotiation' | 'Under Contract' | 'Closed';

export type NetWorthBand = '$5M - $10M' | '$10M - $50M' | '$50M - $100M' | '$100M+';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investmentCeiling: string;
  netWorthBand: NetWorthBand;
  propertyInterest?: string;
  residencyStatus: 'HNI' | 'NRI' | 'Foreign National';
  message?: string;
  status: MandateLevel;
  timestamp: string;
  estimatedValue: number; 
  notes?: string; // For Strategic Mandate Memo synthesis (PRD 3.3)
}

export interface MarketInsight {
  city: string;
  appreciation: number;
  demand: 'High' | 'Very High' | 'Stable';
}
