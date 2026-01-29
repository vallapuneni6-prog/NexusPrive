
import { GoogleGenAI, Type } from "@google/genai";

export const getPropertyAdvice = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `You are an elite luxury real estate advisor for Nexus Prive. 
        Your target audience are High Net Worth Individuals (HNIs) and Non-Resident Indians (NRIs).
        Focus on investment potential, ROI, wealth preservation, and the luxury lifestyle.
        Keep responses professional, sophisticated, and data-oriented.
        Always suggest why real estate in India or major global hubs is a strong asset class right now.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I am currently unable to provide real-time advisory. Please contact our concierge directly.";
  }
};

export const analyzeInvestmentProfile = async (profileData: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this investor profile and recommend a portfolio strategy for Nexus Prive: ${profileData}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskProfile: { type: Type.STRING },
            recommendedLocations: { type: Type.ARRAY, items: { type: Type.STRING } },
            expectedYield: { type: Type.STRING },
            strategy: { type: Type.STRING }
          },
          required: ["riskProfile", "recommendedLocations", "expectedYield", "strategy"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
};
