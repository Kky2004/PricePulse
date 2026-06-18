import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface CompareViewProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddComparison: (newProductData: any) => void;
}

export default function CompareView({ products, onSelectProduct, onAddComparison }: CompareViewProps) {
  const [query, setQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [newProductStore, setNewProductStore] = useState('Amazon');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!query) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  // Featured Large Product: Apple iPhone 15 Pro or whatever is in stock
  const featuredCompareItem = products.find(p => p.id === 'iphone-15-pro') || products[0];

  const handleCreateCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;
    
    // Trigger callback to parent to add
    onAddComparison({
      name: newProductName,
      currentPrice: parseFloat(newProductPrice) || 299,
      category: newProductCategory,
      store: newProductStore
    });

    // Reset
    setNewProductName('');
    setNewProductPrice('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Search Bar section */}
      <section className="space-y-4 pt-2">
        <div className="text-center space-y-1 py-2">
          <h2 className="text-2xl font-black text-on-surface">Compare Prices Instantly</h2>
          <p className="text-xs text-on-surface-variant">Find the best deal from multiple marketplaces in seconds</p>
        </div>

        <div className="relative flex items-center">
          <div className="absolute left-4 text-outline select-none">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="w-full bg-white border border-outline-variant/30 rounded-xl py-3.5 pl-12 pr-28 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              onClick={() => {
                const popularList = ['Sony WH-1000XM5', 'iPhone 15 Pro', 'iPad Pro'];
                const randomKeyword = popularList[Math.floor(Math.random() * popularList.length)];
                setQuery(randomKeyword);
              }}
              className="p-1 px-2.5 text-[11px] font-sans font-extrabold text-primary bg-primary/10 rounded-lg hover:bg-primary/20"
            >
              Surprise Me
            </button>
          </div>
        </div>

        {query && (
          <div className="bg-white p-2 rounded-xl shadow-sm border border-outline-variant/20 max-h-48 overflow-y-auto divide-y divide-custom-bg text-xs">
            {filteredProducts.length === 0 ? (
              <div className="p-3 text-center text-on-surface-variant">No matching products found</div>
            ) : (
              filteredProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="p-3 hover:bg-custom-bg transition-colors cursor-pointer flex justify-between items-center"
                >
                  <span className="font-bold text-on-surface">{p.name}</span>
                  <span className="text-primary font-black">${p.currentPrice.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* Main Large product card comparison */}
      {featuredCompareItem && (
        <section
          onClick={() => onSelectProduct(featuredCompareItem.id)}
          className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="px-2.5 py-1 bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold uppercase tracking-wider">
              Best Deal Tracked
            </span>
            <span className="material-symbols-outlined text-outline hover:text-red-500 transition-colors">favorite</span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 bg-custom-bg rounded-lg p-1.5 flex items-center justify-center border border-outline-variant/5">
              <img
                alt={featuredCompareItem.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                src={featuredCompareItem.image}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest leading-none">
                {featuredCompareItem.category}
              </span>
              <h3 className="text-sm font-black text-on-surface truncate mt-1">
                {featuredCompareItem.name}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
                <span className="font-extrabold">{featuredCompareItem.rating}</span>
                <span className="text-on-surface-variant text-[11px]">({featuredCompareItem.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {featuredCompareItem.stores.slice(0, 2).map((st, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 bg-custom-bg rounded-lg border border-outline-variant/15"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px]">
                    {st.name[0]}
                  </span>
                  <span className="text-xs font-bold text-on-surface">{st.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-primary">${st.price.toFixed(2)}</span>
                  {st.isLowest && (
                    <p className="text-[9px] font-bold text-secondary">Lowest mapped</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Market Insight block */}
      <section className="bg-primary text-white p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-primary-container">trending_down</span>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#a3efdb]">Market Insight</h4>
          </div>
          <p className="text-base font-bold leading-tight">Prices for tech gear are down 12% this week.</p>
          <p className="text-xs opacity-80 leading-normal">Our Calm Intelligence algorithm suggests now is the best time to buy laptops and peripherals.</p>
          <button 
            onClick={() => onSelectProduct('macbook-air-m3')}
            className="mt-2 bg-[#1f6f5f] hover:bg-white hover:text-primary transition-all text-white font-bold text-xs py-2 px-4 rounded-lg"
          >
            Explore MacBook Deal
          </button>
        </div>
        {/* Abstract SVG line graph backing */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none flex items-end">
          <svg className="w-full h-1/2 text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 Q30,40 60,60 T100,20 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Grid listing items */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-on-surface px-1">Other Trending Deals</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {products.filter(p => ['macbook-air-m3', 'playstation-5-slim', 'nike-air-max', 'smart-watch-v3'].includes(p.id)).slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item.id)}
              className="bg-white p-3 rounded-xl shadow-sm border border-outline-variant/10 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-custom-bg p-1 flex items-center justify-center border border-outline-variant/5">
                <img
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  src={item.image}
                  alt={item.name}
                />
                <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-[9px] font-bold text-on-secondary-container">
                  -{item.trendPercentage}% Off
                </span>
              </div>
              
              <div className="mt-2 space-y-1">
                <h4 className="text-xs font-bold text-on-surface truncate">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-primary">${item.currentPrice.toFixed(0)}</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-primary">
                    <span className="material-symbols-outlined text-[16px] font-black">add</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust logs section */}
      <section className="py-6 border-t border-outline-variant/15 text-center space-y-3">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Comparing over 500+ Marketplaces worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-black opacity-45 select-none tracking-wider text-outline font-sans">
          <span>AMAZON</span>
          <span>BEST BUY</span>
          <span>WALMART</span>
          <span>EBAY</span>
          <span>TARGET</span>
        </div>
      </section>

      {/* Trigger floating action button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-12 h-12 rounded-xl bg-primary text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Add Custom Price Tracker"
        >
          <span className="material-symbols-outlined text-2xl font-black">add</span>
        </button>
      </div>

      {/* Interactive Modal to add new item to tracker */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow-xl border border-outline-variant/10">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-on-surface">Add New Price Tracker</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCustomTrack} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase space-y-1">Product Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none focus:border-primary"
                  placeholder="e.g. Nintendo Switch OLED"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">Target / Current Price ($)</label>
                <input
                  type="number"
                  required
                  className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none focus:border-primary"
                  placeholder="e.g. 299"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">Category</label>
                  <select
                    className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none text-on-surface"
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">Store Source</label>
                  <select
                    className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none text-on-surface"
                    value={newProductStore}
                    onChange={(e) => setNewProductStore(e.target.value)}
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Best Buy">Best Buy</option>
                    <option value="Walmart">Walmart</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold hover:bg-primary-hover transition-colors mt-2"
              >
                Track Product Instantly
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
