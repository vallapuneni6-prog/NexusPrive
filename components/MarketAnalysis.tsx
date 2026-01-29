
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '2019', value: 400 },
  { name: '2020', value: 450 },
  { name: '2021', value: 600 },
  { name: '2022', value: 550 },
  { name: '2023', value: 850 },
  { name: '2024', value: 1100 },
];

const MarketAnalysis: React.FC = () => {
  return (
    <div className="bg-[#111] p-8 rounded-xl border border-white/5">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-2xl font-serif mb-2">Portfolio Growth Projection</h3>
          <p className="text-gray-500 text-sm">Luxury Segment: Average Appreciation Index</p>
        </div>
        <div className="text-right">
          <span className="text-[#d4af37] text-3xl font-serif">+14.2%</span>
          <p className="text-gray-500 text-xs uppercase tracking-tighter">YOY Growth</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
            <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff' }}
              itemStyle={{ color: '#d4af37' }}
            />
            <Area type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5 text-center">
        <div>
          <p className="text-[#d4af37] font-serif text-lg">7.2%</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Avg. Rental Yield</p>
        </div>
        <div>
          <p className="text-[#d4af37] font-serif text-lg">Dubai / Mum</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Hot Markets</p>
        </div>
        <div>
          <p className="text-[#d4af37] font-serif text-lg">Off-Market</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Availability</p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
