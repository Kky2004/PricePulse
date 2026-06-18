import React, { useState } from 'react';
import { Product } from '../types';
import CompactChart from './CompactChart';

interface DashboardViewProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onSearch: (keyword: string) => void;
}

export default function DashboardView({ products, onSelectProduct, onSearch }: DashboardViewProps) {
  const [searchInput, setSearchInput] = useState('');

  // Find a specific product for the featured deal of the day (e.g. Sony WH-1000XM5)
  const featuredProduct = products.find(p => p.id === 'sony-wh-1000xm5') || products[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const trendData = [
    { date: 'Jan', price: 110 },
    { date: 'Feb', price: 95 },
    { date: 'Mar', price: 105 },
    { date: 'Apr', price: 80 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-6 pb-12">
      {/* Search Header */}
     <section className="text-center py-10 space-y-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
          Find the Best Price Instantly
        </h2>
        
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-violet-400 select-none">search</span>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-32 py-5 rounded-2xl bg-[#161B22] border border-violet-500/20 text-white placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none shadow-[0_0_25px_rgba(124,58,237,0.25)]"
            placeholder="Search products, brands, or URLs"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            SEARCH
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2 pt-1 text-xs">
          {['iPhone 15', 'Sony WH-1000XM5', 'iPad Pro'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => {
                setSearchInput(keyword);
                onSearch(keyword);
              }}
              className="px-5 py-2 rounded-full bg-[#161B22] border border-violet-500/20 text-gray-300 hover:bg-violet-600 hover:text-white transition-all duration-300"
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Recommendation - Deal of the Day */}
      {featuredProduct && (
        <section className="bg-gradient-to-br from-[#111827] via-[#0B0B12] to-[#0F172A] rounded-3xl p-6 overflow-hidden relative border border-violet-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-all duration-500">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                Deal of the Day
              </span>
              <h3 className="text-3xl font-black text-white">
                {featuredProduct.name}
              </h3>
              <p className="text-sm text-gray-400">
                Professional Noise Cancelling Headphones
              </p>
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] font-bold">arrow_downward</span>
              <span className="font-extrabold text-xs">-$80</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-black text-green-400 leading-none">
                ${featuredProduct.currentPrice.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  alt="Amazon Logo"
                  className="w-4 h-4 rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqVEPBI0zbwlKcUqEwFTuEwAFsPooNCvnBctZZphOiDvd-jQYc8eVjIjxvC3JX_vCYfcZdCetKy7FtH47nFIIQav2op6a8k-6YunIBTewHLSAgHOmh-js6_6RRcMo2YmwhHiypWJz9CA006NM4esOClXm3pe6YLKd5lVMOmYfLiLgVAMESxyhXhGKq2aL5w68OrKt9x-q9wppajmja4LkVA7lQfha4Qrn8KeklIoMDSPBbbuwiAmUjYvOXXX_hCczZ201lCcSbjKmH"
                />
                <span className="text-sm text-violet-300 font-semibold tracking-wide">
  Amazon.com
</span>
              </div>
            </div>
            <div className="w-24 h-24 relative overflow-hidden rounded-lg bg-custom-bg p-1 flex items-center justify-center border border-outline-variant/10">
              <img
                alt={featuredProduct.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
                src={featuredProduct.image}
              />
            </div>
          </div>

          <button
            onClick={() => onSelectProduct(featuredProduct.id)}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 via-purple-600 to-green-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            View Comparison
          </button>
        </section>
      )}

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary text-[22px]">search_insights</span>
          <div className="text-lg font-black text-on-surface">1.2k</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Total Searches</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-tertiary text-[22px]">local_fire_department</span>
          <div className="text-lg font-black text-on-surface">45</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Best Deals</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-secondary text-[22px]">savings</span>
          <div className="text-lg font-black text-on-surface">18%</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Avg Savings</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
          <div className="text-lg font-black text-on-surface">85</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Products Tracked</div>
        </div>
      </section>

      {/* Trend Preview */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-on-surface">Electronics Trend</h3>
          <span className="text-xs font-semibold text-tertiary flex items-center gap-1 bg-tertiary/10 px-2 py-0.5 rounded-full">
            Trending Down <span className="material-symbols-outlined text-[14px]">trending_down</span>
          </span>
        </div>
        <div className="pt-2">
          <CompactChart data={trendData} strokeColor="#4f46e5" fillColorStart="#4f46e5" height={100} showTooltip={false} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-outline font-semibold">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
        </div>
      </section>

      {/* Recents Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-on-surface">Recent Comparisons</h3>
          <button 
            onClick={() => onSearch('')} 
            className="text-primary text-xs font-semibold hover:underline"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-3">
          {products.filter(p => ['playstation-5-slim', 'iphone-15-pro', 'ipad-pro-12-9'].includes(p.id)).slice(0, 2).map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.id)}
              className="bg-white p-3 rounded-xl flex items-center gap-3 shadow-sm border border-outline-variant/10 hover:border-outline transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="w-14 h-14 bg-custom-bg flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-outline-variant/5">
                <img
                  alt={prod.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  src={prod.image}
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                  {prod.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-on-surface-variant">
                    {prod.brand} • <span className="font-extrabold text-primary">${prod.currentPrice.toFixed(0)}</span>
                  </span>
                </div>
              </div>
              <div className="text-right text-outline-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined font-black">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
