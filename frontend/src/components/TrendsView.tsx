import { useState } from 'react';
import { Product } from '../types';
import CompactChart from './CompactChart';

interface TrendsViewProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onSetAlertFeedback: (msg: string) => void;
}

export default function TrendsView({ products, onSelectProduct, onSetAlertFeedback }: TrendsViewProps) {
  const [range, setRange] = useState<'7d' | '30d' | '1y'>('30d');
  
  // Allow toggling active trending product to view dynamic charts
  const trendableProducts = products.filter(p => ['sony-wh-1000xm5', 'iphone-15-pro', 'ipad-pro-12-9'].includes(p.id));
  const [selectedTrendProductId, setSelectedTrendProductId] = useState('sony-wh-1000xm5');

  const selectedProduct = products.find(p => p.id === selectedTrendProductId) || products[0];

  // Resolve active chart dataset based on range state
  const activeChartData = selectedProduct.priceHistory30d; // Default fallback
  const finalChartData = range === '7d' 
    ? selectedProduct.priceHistory7d 
    : range === '1y' 
    ? selectedProduct.priceHistory1y 
    : selectedProduct.priceHistory30d;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter */}
      <section className="space-y-4 pt-2">
        <h2 className="text-2xl font-black tracking-tight text-on-surface">Trends & Insights</h2>
        
        {/* Toggle Range */}
        <div className="flex bg-white/80 p-1 border border-outline-variant/30 rounded-xl w-fit">
          {(['7D', '30D', '1Y'] as const).map((r) => {
            const val = r.toLowerCase() as '7d' | '30d' | '1y';
            const isActive = range === val;
            return (
              <button
                key={r}
                onClick={() => setRange(val)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </section>

      {/* Selector thumbnails to switch trend charting */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {trendableProducts.map((p) => {
          const isSelected = p.id === selectedTrendProductId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedTrendProductId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold shrink-0 cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-outline-variant/30 bg-white hover:border-outline'
              }`}
            >
              <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center p-0.5 bg-white">
                <img src={p.image} className="object-contain" alt="" />
              </div>
              {p.brand}
            </button>
          );
        })}
      </div>

      {/* Main product selected summary heading */}
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 border border-outline-variant/20">
            <img
              alt={selectedProduct.name}
              className="w-full h-full object-contain"
              src={selectedProduct.image}
            />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-on-surface line-clamp-1">{selectedProduct.name}</h3>
            <p className="text-[10px] font-medium text-on-surface-variant">{selectedProduct.brand} • {selectedProduct.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-primary">${selectedProduct.currentPrice.toFixed(2)}</p>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-primary text-[10px] font-bold">
            <span className="material-symbols-outlined text-[12px] font-black">trending_down</span>
            -{selectedProduct.trendPercentage}%
          </span>
        </div>
      </div>

      {/* Chart container */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">
            Price History Range ({range.toUpperCase()})
          </span>
          <span className="material-symbols-outlined text-outline select-none">info</span>
        </div>

        {/* Master Chart Component */}
        <div className="relative pt-2">
          <CompactChart data={finalChartData} strokeColor="#005648" fillColorStart="#005648" height={130} />
        </div>

        <div className="flex justify-between mt-3 text-[10px] text-outline-variant font-extrabold uppercase px-1">
          {finalChartData.map((pt, i) => {
            if (i === 0 || i === finalChartData.length - 1 || i === Math.floor(finalChartData.length / 2)) {
              return <span key={i}>{pt.date}</span>;
            }
            return <span key={i} className="hidden sm:inline opacity-40">{pt.date}</span>;
          })}
        </div>
      </section>

      {/* Summary grid bento */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Lowest Tracked</p>
          <p className="text-lg font-black text-primary mt-1">${selectedProduct.lowestPrice.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Highest Tracked</p>
          <p className="text-lg font-black text-on-surface mt-1">${selectedProduct.highestPrice.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Avg Pricing</p>
          <p className="text-lg font-black text-on-surface mt-1">${selectedProduct.averagePrice.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-primary-container/30">
          <p className="text-[9px] font-bold text-primary uppercase">Current Best</p>
          <p className="text-lg font-black text-primary mt-1">${selectedProduct.currentPrice.toFixed(0)}</p>
        </div>
      </section>

      {/* Recommendation alert panel */}
      <section className="bg-secondary-container/20 border border-secondary/10 rounded-xl p-4 flex gap-3.5">
        <div className="flex-shrink-0 w-8 h-8 bg-secondary/15 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-lg">timer</span>
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wide">WAIT FOR PRICE DROP</h4>
          <p className="text-xs text-on-surface-variant leading-tight">
            Our Calm Intelligence predictive engine suggests a 75% chance of a further reduction in the next 14 days based on historical cycles.
          </p>
        </div>
      </section>

      {/* Timeline Price activity list */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-on-surface px-1">Price Activity</h3>
        <div className="space-y-4 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
          
          {selectedProduct.recentEvents.map((evt, idx) => (
            <div key={idx} className="flex gap-4 relative">
              <div className={`w-5 h-5 rounded-full z-10 flex items-center justify-center shrink-0 mt-0.5 ${
                evt.type === 'drop'
                  ? 'bg-primary-container/20 text-primary'
                  : evt.type === 'increase'
                  ? 'bg-red-500/20 text-red-500'
                  : 'bg-outline-variant/20 text-outline'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-on-surface">{evt.title}</p>
                <p className="text-[10px] text-outline font-semibold mt-0.5">{evt.date} • {evt.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Movers section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-on-surface">Market Movers</h3>
          <button
            onClick={() => onSelectProduct('nike-air-max')}
            className="text-xs font-bold text-primary hover:underline"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.filter(p => ['nike-air-max', 'smart-watch-v3'].includes(p.id)).map((mover) => (
            <div
              key={mover.id}
              onClick={() => onSelectProduct(mover.id)}
              className="bg-white p-3 rounded-xl shadow-sm border border-outline-variant/10 relative hover:border-primary transition-all cursor-pointer group flex flex-col justify-between"
            >
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-secondary text-white text-[9px] font-bold z-10">
                -{mover.trendPercentage}%
              </span>
              
              <div className="aspect-square w-full rounded-lg bg-custom-bg p-1.5 flex items-center justify-center overflow-hidden mb-2">
                <img
                  alt={mover.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                  src={mover.image}
                />
              </div>

              <div>
                <p className="text-xs font-bold text-on-surface truncate">{mover.name}</p>
                <p className="text-sm font-black text-primary mt-1">${mover.currentPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
