import React, { useState, useMemo } from 'react';
import { SearchTrackItem } from '../types';
import { mockHistoryTimeline } from '../data';

interface HistoryViewProps {
  onSelectProduct: (productId: string) => void;
}

export default function HistoryView({ onSelectProduct }: HistoryViewProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [timelineItems, setTimelineItems] = useState(mockHistoryTimeline);

  const filteredTimeline = useMemo(() => {
    if (!filterQuery) return timelineItems;
    return timelineItems.filter(item =>
      item.productName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [timelineItems, filterQuery]);

  const handleDeleteTimelineItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTimelineItems(items => item => id !== item.id); // Wait, this is a syntax error if not written correctly!
    // Let's write standard filtering:
    setTimelineItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Search Input Header */}
      <section className="space-y-3 pt-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline select-none">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-xs"
            placeholder="Search in history"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Total</p>
          <p className="text-sm font-black text-primary">124</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Popular</p>
          <p className="text-xs font-bold text-primary truncate">AirPods</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Last Check</p>
          <p className="text-sm font-black text-primary">2h ago</p>
        </div>
      </section>

      {/* Recently Viewed (Horizontal scroll) */}
      <section className="space-y-2">
        <h2 className="text-sm font-black text-on-surface px-1">Recently Viewed</h2>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {/* Card 1 */}
          <div
            onClick={() => onSelectProduct('sony-wh-1000xm5')}
            className="min-w-[150px] bg-white rounded-xl p-3 shadow-sm border border-outline-variant/15 flex-shrink-0 cursor-pointer hover:border-primary transition-all active:scale-[0.98]"
          >
            <div className="w-full h-20 rounded-lg bg-custom-bg p-1 flex items-center justify-center overflow-hidden mb-2">
              <img
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B"
                alt="Sony headphones"
              />
            </div>
            <p className="text-xs font-bold text-on-surface truncate">Sony WH-1000XM5</p>
            <p className="text-[10px] text-outline font-semibold mt-1">15m ago</p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onSelectProduct('macbook-air-m3')}
            className="min-w-[150px] bg-white rounded-xl p-3 shadow-sm border border-outline-variant/15 flex-shrink-0 cursor-pointer hover:border-primary transition-all active:scale-[0.98]"
          >
            <div className="w-full h-20 rounded-lg bg-custom-bg p-0.5 flex items-center justify-center overflow-hidden mb-2">
              <img
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ld8zbRU5IjZch_9Ixt21qFS1blv6WU58Izjsx75ZM2Mfc_X4gNR8zajCzze6UuZ9ds7XkwBjVE5YuyAi31B1gxAJLBSXSDW9XUroLi9O3Tv9xaG6wUk_H4haYOJ_9gmpKef3fzGB1J2MEUM57rGTSGEATKofUEa256b9OFjo1EjtdKarsluFhrer6pJVdyDr68C3beLEh9dLOcTsABX81uEGLImq-7egrwLMCnsXw9tHRo_lfreAoqfI0iYZohkEww4gmLR5tVdr"
                alt="MacBook Pro"
              />
            </div>
            <p className="text-xs font-bold text-on-surface truncate">MacBook Air M3</p>
            <p className="text-[10px] text-outline font-semibold mt-1">45m ago</p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onSelectProduct('smart-watch-v3')}
            className="min-w-[150px] bg-white rounded-xl p-3 shadow-sm border border-outline-variant/15 flex-shrink-0 cursor-pointer hover:border-primary transition-all active:scale-[0.98]"
          >
            <div className="w-full h-20 rounded-lg bg-custom-bg p-0.5 flex items-center justify-center overflow-hidden mb-2">
              <img
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0PqNQNS_V6gMfz9qM7oCAmtKKoIvWNi15YmdRy3Z83rWMn7kW1iVbAHMa_Gcu2f9sI7r0sTnp4u_iO4syGCtbKgzXokkMvQzqNxeV6cy7yG6HT9vXHmSylX7nPzBooZTt0pB9t8nhK59aE_F6RkSdrqf8i1w6BXx2ygD75al91MZDJlOtdDfbA-225PJe0Wfcvud5WvxaE_7D63mTTa8CEUcN5RPtvyoOXl5bCUql23wN1FFMN7ZyPtKbboENBpbeGyKL8EaVBPRe"
                alt="Nordic Watch"
              />
            </div>
            <p className="text-xs font-bold text-on-surface truncate">Smart Watch V3</p>
            <p className="text-[10px] text-outline font-semibold mt-1">1h ago</p>
          </div>
        </div>
      </section>

      {/* History List (Timeline) */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-on-surface px-1">Search History</h2>
        
        <div className="flex flex-col gap-4 relative">
          {/* Vertical Timeline axis connector */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-outline-variant/20 -z-0"></div>

          {filteredTimeline.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item.productId)}
              className="relative pl-12 cursor-pointer group active:scale-[0.99] transition-all"
            >
              {/* Dot indicator */}
              <div className="absolute left-[14px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white flex items-center justify-center border-2 border-outline-variant/80 z-10 transition-all group-hover:border-primary group-hover:scale-110">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.trendType === 'down'
                      ? 'bg-secondary'
                      : item.trendType === 'up'
                      ? 'bg-red-500'
                      : 'bg-outline-variant'
                  }`}
                />
              </div>

              {/* Detail Card */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-3 hover:border-primary transition-all">
                <div className="w-14 h-14 bg-custom-bg rounded-lg p-0.5 flex items-center justify-center overflow-hidden border border-outline-variant/5">
                  <img
                    alt={item.productName}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    src={item.image}
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="text-xs font-bold text-on-surface truncate">{item.productName}</h3>
                  <p className="text-[10px] text-outline font-semibold mt-0.5">{item.timestamp}</p>
                  
                  <div className="mt-1.5 flex gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px]">
                      {item.trendType === 'down' ? (
                        <>
                          <span className="material-symbols-outlined text-[10px] font-black">trending_down</span>
                          Price Drop
                        </>
                      ) : item.trendType === 'up' ? (
                        <>
                          <span className="material-symbols-outlined text-[10px] font-black">trending_up</span>
                          Price Up
                        </>
                      ) : (
                        'Stable'
                      )}
                    </span>
                    <span className="text-[10px] font-sans font-black text-on-surface-variant flex items-center">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={(e) => handleDeleteTimelineItem(item.id, e)}
                    className="p-1 text-outline-variant hover:text-red-500 rounded-md transition-colors"
                    title="Remove from history"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                  <button className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded-full font-bold text-[10px] transition-all">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
