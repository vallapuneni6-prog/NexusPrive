
import React from 'react';
import { Property } from '../types';

interface PropertyGridProps {
  onEnquire: (propertyName: string) => void;
}

const properties: Property[] = [
  {
    id: '1',
    title: 'The Skyline Penthouse',
    location: 'Worli, Mumbai',
    price: '$8.5M',
    type: 'Penthouse',
    sqft: 6500,
    bedrooms: 5,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    roi: '12% Est.',
    description: 'Breathtaking 360-degree views of the Arabian Sea.'
  },
  {
    id: '2',
    title: 'Azure Bay Villa',
    location: 'Palm Jumeirah, Dubai',
    price: '$12.0M',
    type: 'Villa',
    sqft: 8200,
    bedrooms: 6,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    roi: '15% Est.',
    description: 'Private beach access with ultramodern aesthetics.'
  },
  {
    id: '3',
    title: 'Highclere Estate',
    location: 'Buckinghamshire, UK',
    price: '£14.2M',
    type: 'Estate',
    sqft: 12000,
    bedrooms: 8,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
    roi: 'Stable',
    description: 'Heritage property spanning 50 acres of rolling hills.'
  },
  {
    id: '4',
    title: 'The Gilded Loft',
    location: 'Upper East Side, NY',
    price: '$24.5M',
    type: 'Mansion',
    sqft: 9500,
    bedrooms: 6,
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=800',
    roi: '8% Est.',
    description: 'A historic triplex with a private roof deck.'
  },
  {
    id: '5',
    title: 'Serenity Ridge',
    location: 'Swiss Alps, Zermatt',
    price: 'CHF 18.0M',
    type: 'Villa',
    sqft: 7000,
    bedrooms: 5,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    roi: 'High Demand',
    description: 'Ski-in ski-out luxury chalet with panoramic peaks.'
  },
  {
    id: '6',
    title: 'Emerald Bay Manor',
    location: 'Phuket, Thailand',
    price: '$6.8M',
    type: 'Villa',
    sqft: 11000,
    bedrooms: 7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    roi: '18% Est.',
    description: 'Ultra-luxury waterfront property with private pier.'
  }
];

const PropertyCard: React.FC<{ property: Property, onEnquire: (p: string) => void }> = ({ property, onEnquire }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden aspect-[4/5] mb-6">
      <img 
        src={property.image} 
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 gold-bg text-black px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
        {property.type}
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          onClick={() => onEnquire(property.title)}
          className="bg-white text-black px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-colors"
        >
          Enquire
        </button>
      </div>
    </div>
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-xl font-serif text-white group-hover:text-[#d4af37] transition-colors">{property.title}</h3>
        <p className="text-gray-500 text-sm tracking-wide">{property.location}</p>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{property.price}</p>
        <p className="text-[#d4af37] text-[10px] uppercase font-bold tracking-tighter">{property.roi} ROI</p>
      </div>
    </div>
  </div>
);

const PropertyGrid: React.FC<PropertyGridProps> = ({ onEnquire }) => {
  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div className="max-w-xl">
          <h2 className="text-[#d4af37] uppercase tracking-[0.2em] text-xs mb-4">Curated Assets</h2>
          <h3 className="text-4xl md:text-5xl font-serif">Global Portfolio of <br/> Rare Assets</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {properties.map(p => (
          <PropertyCard key={p.id} property={p} onEnquire={onEnquire} />
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;
