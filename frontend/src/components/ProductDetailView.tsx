// import React, { useState, useMemo } from 'react';
// import { Product, ProductListing, BestPrice, PriceTrend } from '../types';

// interface ProductDetailViewProps {
//   product: Product;
//   listings?: ProductListing[];       // ← optional
//   bestPrice?: BestPrice;
//   priceTrends?: PriceTrend[];        // ← optional
//   onBack: () => void;
//   onSetAlertFeedback: (msg: string) => void;
// }

// export default function ProductDetailView({
//   product,
//   listings,
//   bestPrice,
//   priceTrends,
//   onBack,
//   onSetAlertFeedback,
// }: ProductDetailViewProps) {
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     e.currentTarget.src =
//       'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&q=80';
//   };

//   const [activeImgIndex, setActiveImgIndex] = useState(0);
//   const [targetAlertPrice, setTargetAlertPrice] = useState(
//     bestPrice ? bestPrice.price * 0.85 : 0
//   );
//   const [userEmail, setUserEmail] = useState('');

//   const carouselImgs = [
//     product.image_url ?? '',
//     'https://lh3.googleusercontent.com/aida-public/AB6AXuCCp9EZ3K9JHGxJ-dmzW--hwAyR9GFpVgGf_SJLHa6WmJ7YhEGc7EqOvuCDZHre7rr7_ZJE6lGN9kcQ0uVEPfL23ek25jLVUIdOx77e04_kOqFDCqXdSLUcbV_O2ngjezYFk3wgZhkJkIbAEdXcagihBOX_cjK7bDMpXvpwkZfXSYb9UTtxzJr5_1lrGieCjgoAy6eQutw8kv-mWyTjCCbY9N1DDYANjVGi-F2HEtsha796-NWegZ_V3KqAA4aSr9Nf3Wt9fx55ol6E',
//     'https://lh3.googleusercontent.com/aida-public/AB6AXuAi666ZJBRfMy60VoiY626BW5y2kgukIaLu8yGyzMqdTKEd9eAKvLRgHSTnYuD3OfHzPoLmG4ngKJkFoBvGMEOa7MXgmL_ZNoqO8tP4HfCY_Tat1KXqSBOt5ifQBiLaUgFeol3mew_tZMEraIDYcxO4LM8OHS2w4D4PueF6iLVv0H1_Jl9lFSBzaZNUfh319aHUEMqIsWj-9TKy4o-EP9DR1OJ0nooqlwrJLky3CzYcvgfnhnjY8yir9QDvAARYdvmIBTUjibAp7vsi',
//   ];

//   // Line 39-41 — add ?? [] guard
// const allPoints = useMemo(
//   () => (priceTrends ?? []).flatMap((t) => t.points),
//   [priceTrends]
// );

//   const stats = useMemo(() => {
//     if (!allPoints.length) return { lowest: 0, highest: 0, average: 0 };
//     const prices = allPoints.map((p) => p.price);
//     return {
//       lowest: Math.min(...prices),
//       highest: Math.max(...prices),
//       average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
//     };
//   }, [allPoints]);

//   // Best listing for rating/reviews display
//   const primaryListing =
//   listings?.find((l) => l.platform === bestPrice?.platform) ??
//   listings?.[0];

//   // Savings vs average
//   const savingsAmount = bestPrice ? stats.average - bestPrice.price : 0;
//   const savingsPct = stats.average > 0 ? Math.round((savingsAmount / stats.average) * 100) : 0;

//   const handleSetAlert = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userEmail) {
//       onSetAlertFeedback('Please enter a valid email address to configure trackers.');
//       return;
//     }
//     onSetAlertFeedback(
//       `🔔 Price alert set for ${product.title}! We will notify you at ${userEmail} once the price drops to ₹${targetAlertPrice.toFixed(2)}.`
//     );
//     setUserEmail('');
//   };

//   const handleClaimDeal = (storeName: string) => {
//     onSetAlertFeedback(
//       `🎉 Claiming deal! Redirecting to ${storeName} checkout secure gateway...`
//     );
//   };

//   return (
//     <div className="space-y-6 pb-16">

//       {/* Back nav */}
//       <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all"
//         >
//           <span className="material-symbols-outlined text-sm font-black">arrow_back</span>
//           Back to list
//         </button>
//         <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest bg-custom-bg px-2.5 py-1 rounded-md">
//           {product.brand}
//         </span>
//       </div>

//       {/* Main product card */}
//       <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10 flex flex-col md:flex-row gap-6 items-center">

//         {/* Gallery */}
//         <div className="w-full md:w-1/2 space-y-3">
//           <div className="relative aspect-video md:aspect-[4/3] rounded-xl bg-custom-bg p-4 flex items-center justify-center border border-outline-variant/10 group overflow-hidden">
//             <img
//               alt={product.title}
//               className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
//               src={carouselImgs[activeImgIndex] || product.image_url || ''}
//               onError={handleImageError}
//             />
//             <button
//               onClick={() =>
//                 setActiveImgIndex((prev) =>
//                   prev > 0 ? prev - 1 : carouselImgs.length - 1
//                 )
//               }
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white border border-outline-variant/15 transition-all text-on-surface"
//             >
//               <span className="material-symbols-outlined text-sm">chevron_left</span>
//             </button>
//             <button
//               onClick={() =>
//                 setActiveImgIndex((prev) =>
//                   prev < carouselImgs.length - 1 ? prev + 1 : 0
//                 )
//               }
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white border border-outline-variant/15 transition-all text-on-surface"
//             >
//               <span className="material-symbols-outlined text-sm">chevron_right</span>
//             </button>
//           </div>

//           <div className="flex gap-2 justify-center">
//             {carouselImgs.map((img, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveImgIndex(i)}
//                 className={`w-12 h-12 rounded-lg bg-custom-bg p-1 border overflow-hidden transition-all ${activeImgIndex === i
//                     ? 'border-primary ring-2 ring-primary/20 scale-105'
//                     : 'border-outline-variant/30 opacity-60'
//                   }`}
//               >
//                 <img
//                   src={img}
//                   className="w-full h-full object-contain"
//                   alt=""
//                   onError={handleImageError}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Info block */}
//         <div className="flex-1 w-full space-y-4">
//           <div className="flex items-center gap-2">
//             <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
//               {product.category}
//             </span>
//             <span className="text-outline-variant text-xs">•</span>
//             <span className="text-xs text-on-surface-variant font-medium">Verified Product</span>
//           </div>

//           <h2 className="text-xl md:text-2xl font-black text-on-surface leading-tight">
//             {product.title}
//           </h2>

//           {/* Rating from best listing */}
//           {primaryListing?.rating && (
//             <div className="flex items-center gap-3">
//               <div className="flex text-amber-500 items-center">
//                 <span className="material-symbols-outlined text-base font-black">star</span>
//                 <span className="text-xs font-black text-on-surface ml-1">
//                   {primaryListing.rating}
//                 </span>
//               </div>
//               <span className="text-outline-variant">|</span>
//               <span className="text-xs text-outline font-semibold">
//                 ({primaryListing.reviews_count ?? 0} reviews)
//               </span>
//             </div>
//           )}

//           {product.description && (
//             <p className="text-xs text-on-surface-variant leading-relaxed">
//               {product.description}
//             </p>
//           )}

//           {/* Price footer */}
//           <div className="pt-2 flex justify-between items-end border-t border-outline-variant/10">
//             <div>
//               <p className="text-[10px] text-outline font-extrabold uppercase">Starting at</p>
//               <h3 className="text-2xl font-black text-primary">
//                 {bestPrice ? `₹${bestPrice.price.toFixed(2)}` : '—'}
//               </h3>
//             </div>
//             {savingsPct > 0 && (
//               <div className="bg-[#6FCF97]/15 text-[#006b56] px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-0.5 animate-pulse">
//                 <span className="material-symbols-outlined text-sm">arrow_downward</span>
//                 {savingsPct}% below avg
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Smart Recommendations */}
//       <section className="space-y-3">
//         <h3 className="text-sm font-black text-on-surface px-1">Smart Recommendations</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-secondary space-y-1 hover:shadow-md transition-all">
//             <div className="flex justify-between items-center text-xs">
//               <span className="font-bold text-secondary uppercase tracking-wider">Cheapest Option</span>
//               <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[9px] font-bold">
//                 BEST PRICE
//               </span>
//             </div>
//             <h4 className="text-lg font-black text-on-surface">
//               ₹{stats.lowest.toFixed(2)}
//             </h4>
//             <p className="text-[11px] text-on-surface-variant leading-tight">
//               Historically tracked lowest price across all platforms.
//             </p>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-primary space-y-1 hover:shadow-md transition-all">
//             <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">
//               Fastest Delivery
//             </span>
//             <h4 className="text-base font-black text-on-surface">Today, 6 PM</h4>
//             <p className="text-[11px] text-on-surface-variant leading-tight">
//               Prime courier delivery available today on verified postal ranges.
//             </p>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-tertiary space-y-1 hover:shadow-md transition-all">
//             <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider block">
//               Best Rated Seller
//             </span>
//             <h4 className="text-base font-black text-on-surface">Verified Stock</h4>
//             <p className="text-[11px] text-on-surface-variant leading-tight">
//               99% positive feedback across Amazon and official retailers.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Deal banner */}
//       <section className="bg-primary text-white p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
//         <div className="space-y-1 relative z-10">
//           <span className="bg-[#a3efdb] text-[#005648] px-2 py-0.5 rounded-full font-black text-[9px] tracking-widest uppercase">
//             RECOMMENDED DEAL
//           </span>
//           <h3 className="text-base font-bold">
//             Best Deal: {bestPrice ? `₹${bestPrice.price.toFixed(2)}` : '—'} on{' '}
//             {bestPrice?.platform ?? 'Amazon'}
//           </h3>
//           <p className="text-xs text-[#a3efdb] font-medium">
//             {savingsPct > 0
//               ? `Save ₹${savingsAmount.toFixed(0)} (${savingsPct}%) compared to average retail!`
//               : 'Compare prices across all platforms instantly!'}
//           </p>
//         </div>
//         <button
//           onClick={() => handleClaimDeal(bestPrice?.platform ?? 'Amazon')}
//           className="bg-white hover:bg-custom-bg text-primary font-black text-xs py-3 px-6 rounded-lg transition-all active:scale-95 shrink-0 relative z-10 shadow-sm"
//         >
//           Claim Deal
//         </button>
//       </section>

//       {/* Marketplace Comparison — from ProductListing[] */}
//       <section className="space-y-3">
//         <h3 className="text-sm font-bold text-on-surface px-1">Marketplace Comparison</h3>
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
//           <div className="divide-y divide-custom-bg">
//             {(listings ?? []).map((listing, idx) => {
    
//               const isLowest = listing.platform === bestPrice?.platform;
//               return (
//                 <div
//                   key={idx}
//                   className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-custom-bg transition-colors ${isLowest ? 'bg-[#6FCF97]/5 border-l-4 border-secondary' : ''
//                     }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-custom-bg p-1 overflow-hidden flex items-center justify-center font-bold text-xs text-primary border border-outline-variant/10">
//                       {listing.platform[0]}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-1.5">
//                         <span className="text-xs font-extrabold text-on-surface">
//                           {listing.platform}
//                         </span>
//                         {isLowest && (
//                           <span className="bg-secondary text-white text-[9px] font-sans font-bold px-1.5 py-0.5 rounded uppercase">
//                             Best Price
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-[10px] text-outline mt-0.5">
//                         {listing.seller_name ?? 'Official Store'} •{' '}
//                         {listing.stock_status ?? 'In Stock'}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
//                     <div className="text-left sm:text-right">
//                       <p className={`text-base font-black ${isLowest ? 'text-secondary' : 'text-primary'}`}>
//                         ₹{listing.price.toFixed(2)}
//                       </p>
//                       <p className="text-[9px] text-outline font-semibold">
//                         {listing.rating ? `⭐ ${listing.rating}` : 'Standard Shipping'}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleClaimDeal(listing.platform)}
//                       className={`px-4 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 ${isLowest
//                           ? 'bg-primary text-white hover:bg-primary-hover shadow-sm'
//                           : 'border border-primary text-primary hover:bg-primary/5'
//                         }`}
//                     >
//                       {listing.product_url ? (
//                         <a href={listing.product_url} target="_blank" rel="noopener noreferrer">
//                           Buy Now
//                         </a>
//                       ) : (
//                         'Buy Now'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Price Alert */}
//       <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
//         <div className="flex items-center gap-3 mb-4">
//           <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-full select-none">
//             notifications_active
//           </span>
//           <div>
//             <h4 className="text-sm font-bold text-on-surface">Set Smart Price Alert</h4>
//             <p className="text-[11px] text-on-surface-variant font-semibold">
//               Get notified immediately once this drops below threshold
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSetAlert} className="space-y-4">
//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-on-surface-variant uppercase">
//                 Target Price (₹)
//               </label>
//               <input
//                 type="number"
//                 className="w-full bg-custom-bg rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-primary font-black text-primary border border-outline-variant/20"
//                 value={targetAlertPrice}
//                 onChange={(e) => setTargetAlertPrice(parseFloat(e.target.value) || 0)}
//               />
//             </div>
//             <div className="space-y-1">
//               <label className="text-[11px] font-bold text-on-surface-variant uppercase">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full bg-custom-bg rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
//                 placeholder="you@example.com"
//                 value={userEmail}
//                 onChange={(e) => setUserEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2.5 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-primary transition-all active:scale-[0.99] shadow-sm select-none"
//           >
//             Activate Price Monitor Alert
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }


import React, { useState, useMemo } from 'react';
import { Product, ProductListing, BestPrice, PriceTrend } from '../types';

interface ProductDetailViewProps {
  product: Product;
  listings?: ProductListing[];       // ← optional
  bestPrice?: BestPrice;
  priceTrends?: PriceTrend[];        // ← optional
  onBack: () => void;
  onSetAlertFeedback: (msg: string) => void;
}

export default function ProductDetailView({
  product,
  listings,
  bestPrice,
  priceTrends,
  onBack,
  onSetAlertFeedback,
}: ProductDetailViewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&q=80';
  };

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [targetAlertPrice, setTargetAlertPrice] = useState(
    bestPrice ? bestPrice.price * 0.85 : 0
  );
  const [userEmail, setUserEmail] = useState('');

  const carouselImgs = [
    product.image_url ?? '',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCp9EZ3K9JHGxJ-dmzW--hwAyR9GFpVgGf_SJLHa6WmJ7YhEGc7EqOvuCDZHre7rr7_ZJE6lGN9kcQ0uVEPfL23ek25jLVUIdOx77e04_kOqFDCqXdSLUcbV_O2ngjezYFk3wgZhkJkIbAEdXcagihBOX_cjK7bDMpXvpwkZfXSYb9UTtxzJr5_1lrGieCjgoAy6eQutw8kv-mWyTjCCbY9N1DDYANjVGi-F2HEtsha796-NWegZ_V3KqAA4aSr9Nf3Wt9fx55ol6E',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAi666ZJBRfMy60VoiY626BW5y2kgukIaLu8yGyzMqdTKEd9eAKvLRgHSTnYuD3OfHzPoLmG4ngKJkFoBvGMEOa7MXgmL_ZNoqO8tP4HfCY_Tat1KXqSBOt5ifQBiLaUgFeol3mew_tZMEraIDYcxO4LM8OHS2w4D4PueF6iLVv0H1_Jl9lFSBzaZNUfh319aHUEMqIsWj-9TKy4o-EP9DR1OJ0nooqlwrJLky3CzYcvgfnhnjY8yir9QDvAARYdvmIBTUjibAp7vsi',
  ];

  const allPoints = useMemo(
    () => (priceTrends ?? []).flatMap((t) => t.points),
    [priceTrends]
  );

  const stats = useMemo(() => {
    if (!allPoints.length) return { lowest: 0, highest: 0, average: 0 };
    const prices = allPoints.map((p) => p.price);
    return {
      lowest: Math.min(...prices),
      highest: Math.max(...prices),
      average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    };
  }, [allPoints]);

  const primaryListing =
    listings?.find((l) => l.platform === bestPrice?.platform) ??
    listings?.[0];

  const savingsAmount = bestPrice ? stats.average - bestPrice.price : 0;
  const savingsPct = stats.average > 0 ? Math.round((savingsAmount / stats.average) * 100) : 0;

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      onSetAlertFeedback('Please enter a valid email address to configure trackers.');
      return;
    }
    onSetAlertFeedback(
      `🔔 Price alert set for ${product.title}! We will notify you at ${userEmail} once the price drops to ₹${targetAlertPrice.toFixed(2)}.`
    );
    setUserEmail('');
  };

  const handleClaimDeal = (storeName: string) => {
    onSetAlertFeedback(
      `🎉 Claiming deal! Redirecting to ${storeName} checkout secure gateway...`
    );
  };

  return (
    <div className="space-y-6 pb-16">

      <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-sm font-black">arrow_back</span>
          Back to list
        </button>
        <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest bg-custom-bg px-2.5 py-1 rounded-md">
          {product.brand}
        </span>
      </div>

      <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10 flex flex-col md:flex-row gap-6 items-center">

        <div className="w-full md:w-1/2 space-y-3">
          <div className="relative aspect-video md:aspect-[4/3] rounded-xl bg-custom-bg p-4 flex items-center justify-center border border-outline-variant/10 group overflow-hidden">
            <img
              alt={product.title}
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              src={carouselImgs[activeImgIndex] || product.image_url || ''}
              onError={handleImageError}
            />
            <button
              onClick={() =>
                setActiveImgIndex((prev) =>
                  prev > 0 ? prev - 1 : carouselImgs.length - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white border border-outline-variant/15 transition-all text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={() =>
                setActiveImgIndex((prev) =>
                  prev < carouselImgs.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full hover:bg-white border border-outline-variant/15 transition-all text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <div className="flex gap-2 justify-center">
            {carouselImgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImgIndex(i)}
                className={`w-12 h-12 rounded-lg bg-custom-bg p-1 border overflow-hidden transition-all ${activeImgIndex === i
                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                    : 'border-outline-variant/30 opacity-60'
                  }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain"
                  alt=""
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-outline-variant text-xs">•</span>
            <span className="text-xs text-on-surface-variant font-medium">Verified Product</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-on-surface leading-tight">
            {product.title}
          </h2>

          {primaryListing?.rating && (
            <div className="flex items-center gap-3">
              <div className="flex text-amber-500 items-center">
                <span className="material-symbols-outlined text-base font-black">star</span>
                <span className="text-xs font-black text-on-surface ml-1">
                  {primaryListing.rating}
                </span>
              </div>
              <span className="text-outline-variant">|</span>
              <span className="text-xs text-outline font-semibold">
                ({primaryListing.reviews_count ?? 0} reviews)
              </span>
            </div>
          )}

          {product.description && (
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="pt-2 flex justify-between items-end border-t border-outline-variant/10">
            <div>
              <p className="text-[10px] text-outline font-extrabold uppercase">Starting at</p>
              <h3 className="text-2xl font-black text-primary">
                {bestPrice ? `₹${bestPrice.price.toFixed(2)}` : '—'}
              </h3>
            </div>
            {savingsPct > 0 && (
              <div className="bg-[#6FCF97]/15 text-[#006b56] px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-0.5 animate-pulse">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                {savingsPct}% below avg
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-black text-on-surface px-1">Smart Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-secondary space-y-1 hover:shadow-md transition-all">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-secondary uppercase tracking-wider">Cheapest Option</span>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[9px] font-bold">
                BEST PRICE
              </span>
            </div>
            <h4 className="text-lg font-black text-on-surface">
              ₹{stats.lowest.toFixed(2)}
            </h4>
            <p className="text-[11px] text-on-surface-variant leading-tight">
              Historically tracked lowest price across all platforms.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-primary space-y-1 hover:shadow-md transition-all">
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">
              Fastest Delivery
            </span>
            <h4 className="text-base font-black text-on-surface">Today, 6 PM</h4>
            <p className="text-[11px] text-on-surface-variant leading-tight">
              Prime courier delivery available today on verified postal ranges.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-tertiary space-y-1 hover:shadow-md transition-all">
            <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider block">
              Best Rated Seller
            </span>
            <h4 className="text-base font-black text-on-surface">Verified Stock</h4>
            <p className="text-[11px] text-on-surface-variant leading-tight">
              99% positive feedback across Amazon and official retailers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white p-5 rounded-xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="bg-[#a3efdb] text-[#005648] px-2 py-0.5 rounded-full font-black text-[9px] tracking-widest uppercase">
            RECOMMENDED DEAL
          </span>
          <h3 className="text-base font-bold">
            Best Deal: {bestPrice ? `₹${bestPrice.price.toFixed(2)}` : '—'} on{' '}
            {bestPrice?.platform ?? 'Amazon'}
          </h3>
          <p className="text-xs text-[#a3efdb] font-medium">
            {savingsPct > 0
              ? `Save ₹${savingsAmount.toFixed(0)} (${savingsPct}%) compared to average retail!`
              : 'Compare prices across all platforms instantly!'}
          </p>
        </div>
        <button
          onClick={() => handleClaimDeal(bestPrice?.platform ?? 'Amazon')}
          className="bg-white hover:bg-custom-bg text-primary font-black text-xs py-3 px-6 rounded-lg transition-all active:scale-95 shrink-0 relative z-10 shadow-sm"
        >
          Claim Deal
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-on-surface px-1">Marketplace Comparison</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
          <div className="divide-y divide-custom-bg">
            {(listings ?? []).map((listing, idx) => {

              const isLowest = listing.platform === bestPrice?.platform;
              return (
                <div
                  key={idx}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-custom-bg transition-colors ${isLowest ? 'bg-[#6FCF97]/5 border-l-4 border-secondary' : ''
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-custom-bg p-1 overflow-hidden flex items-center justify-center font-bold text-xs text-primary border border-outline-variant/10">
                      {listing.platform[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-on-surface">
                          {listing.platform}
                        </span>
                        {isLowest && (
                          <span className="bg-secondary text-white text-[9px] font-sans font-bold px-1.5 py-0.5 rounded uppercase">
                            Best Price
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-outline mt-0.5">
                        {listing.seller_name ?? 'Official Store'} •{' '}
                        {listing.stock_status ?? 'In Stock'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <p className={`text-base font-black ${isLowest ? 'text-secondary' : 'text-primary'}`}>
                        ₹{listing.price.toFixed(2)}
                      </p>
                      <p className="text-[9px] text-outline font-semibold">
                        {listing.rating ? `⭐ ${listing.rating}` : 'Standard Shipping'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleClaimDeal(listing.platform)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 ${isLowest
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-sm'
                          : 'border border-primary text-primary hover:bg-primary/5'
                        }`}
                    >
                      {listing.product_url ? (
                        <a href={listing.product_url} target="_blank" rel="noopener noreferrer">
                          Buy Now
                        </a>
                      ) : (
                        'Buy Now'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-full select-none">
            notifications_active
          </span>
          <div>
            <h4 className="text-sm font-bold text-on-surface">Set Smart Price Alert</h4>
            <p className="text-[11px] text-on-surface-variant font-semibold">
              Get notified immediately once this drops below threshold
            </p>
          </div>
        </div>

        <form onSubmit={handleSetAlert} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                Target Price (₹)
              </label>
              <input
                type="number"
                className="w-full bg-custom-bg rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-primary font-black text-primary border border-outline-variant/20"
                value={targetAlertPrice}
                onChange={(e) => setTargetAlertPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-custom-bg rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-primary transition-all active:scale-[0.99] shadow-sm select-none"
          >
            Activate Price Monitor Alert
          </button>
        </form>
      </section>
    </div>
  );
}
