import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductListing, BestPrice } from '../types';
import { getCompareData, createCustomTrack } from '../services/compareService';
import { getDashboardStats, DashboardDeal } from '../services/dashboardService';

interface CompareViewProps {
  onSelectProduct: (productId: number) => void;
}

export default function CompareView({ onSelectProduct }: CompareViewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&q=80';
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [bestPrices, setBestPrices] = useState<BestPrice[]>([]);
  const [topDeal, setTopDeal] = useState<DashboardDeal | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [newProductStore, setNewProductStore] = useState('Amazon');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const { products, listings, bestPrices } = await getCompareData();
      setProducts(products);
      setListings(listings);
      setBestPrices(bestPrices);

      try {
        const stats = await getDashboardStats();
        setTopDeal(stats.topDeal);
      } catch {
        setTopDeal(undefined);
      }
    } catch (err) {
      setError('Could not load comparison data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Helper: get best price entry for a product
  const getBestPrice = (productId: number): BestPrice | undefined =>
    bestPrices?.find((b) => b.product_id === productId);
  // Helper: get all listings for a product
  const getListings = (productId: number): ProductListing[] =>
    (listings ?? []).filter((l) => l.product_id === productId);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  // Featured product: prefer the dashboard's actual top deal (biggest
  // cross-platform savings) over an arbitrary "first product with a price".
  const featuredProduct = useMemo(() => {
    if (topDeal) {
      const match = products.find((p) => p.id === topDeal.product_id);
      if (match) return match;
    }
    return products.find((p) => getBestPrice(p.id)) ?? products[0];
  }, [products, bestPrices, topDeal]);

  const featuredBest = featuredProduct ? getBestPrice(featuredProduct.id) : undefined;
  const featuredListings = featuredProduct ? getListings(featuredProduct.id).slice(0, 2) : [];

  // "Trending Deals" grid -- first 4 tracked products for now.
  // Swap this for products.filter ranked by savings_percent once
  // GET /dashboard/best-deals is wired in here too.
  const trendingProducts = products.slice(0, 4);

  const handleCreateCustomTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await createCustomTrack({
        name: newProductName,
        currentPrice: parseFloat(newProductPrice) || 0,
        category: newProductCategory,
        store: newProductStore,
      });
      setNewProductName('');
      setNewProductPrice('');
      setShowAddModal(false);
      await loadData(); // refresh so the new product shows up immediately
    } catch (err) {
      setSubmitError('Could not save this product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-on-surface-variant text-sm">
        Loading comparison data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">

      {/* Search Bar */}
      <section className="space-y-4 pt-2">
        <div className="text-center space-y-1 py-2">
          <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-purple-500 to-green-400 bg-clip-text text-transparent">Compare Prices Instantly</h2>
          <p className="text-xl text-white font-semibold ">
            Find the best deal from multiple marketplaces in seconds
          </p>
        </div>

        <div className="relative flex items-center">
          {/* <div className="absolute left-4 text-outline select-none">
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
                if (products.length === 0) return;
                const random = products[Math.floor(Math.random() * products.length)];
                setQuery(random.title);
              }}
              className="p-1 px-2.5 text-[11px] font-sans font-extrabold text-primary bg-primary/10 rounded-lg hover:bg-primary/20"
            >
              Surprise Me
            </button>
          </div> */}
        </div>

        {query && (
          <div className="bg-white p-2 rounded-xl shadow-sm border border-outline-variant/20 max-h-48 overflow-y-auto divide-y divide-custom-bg text-xs">
            {filteredProducts.length === 0 ? (
              <div className="p-3 text-center text-on-surface-variant">No matching products found</div>
            ) : (
              filteredProducts.map((p) => {
                const best = getBestPrice(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p.id)}
                    className="p-3 hover:bg-custom-bg transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-bold text-on-surface">{p.title}</span>
                    {best && (
                      <span className="text-primary font-black">
                        ₹{best.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* Featured Product Card */}
      {featuredProduct && (
        <section
          onClick={() => onSelectProduct(featuredProduct.id)}
          className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="px-2.5 py-1 bg-primary-container text-on-primary-container rounded-full text-[10px] font-bold uppercase tracking-wider">
              Best Deal Tracked
            </span>
            <span className="material-symbols-outlined text-outline hover:text-red-500 transition-colors">
              favorite
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 bg-custom-bg rounded-lg p-1.5 flex items-center justify-center border border-outline-variant/5">
              <img
                alt={featuredProduct.title}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                src={featuredProduct.image_url ?? ''}
                onError={handleImageError}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest leading-none">
                {featuredProduct.category}
              </span>
              <h3 className="text-sm font-black text-on-surface truncate mt-1">
                {featuredProduct.title}
              </h3>
              {featuredListings[0] && (
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
                  <span className="font-extrabold">
                    {featuredListings[0].rating ?? '—'}
                  </span>
                  <span className="text-on-surface-variant text-[11px]">
                    ({featuredListings[0].reviews_count ?? 0} reviews)
                  </span>
                </div>
              )}
              {topDeal && topDeal.product_id === featuredProduct.id && (
                <p className="text-[10px] font-bold text-green-600 mt-1">
                  Save {topDeal.savings_percent.toFixed(0)}% vs {topDeal.highest_platform}
                </p>
              )}
            </div>
          </div>

          {/* Per-platform listing rows */}
          <div className="mt-4 space-y-2">
            {featuredListings.map((listing, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 bg-custom-bg rounded-lg border border-outline-variant/15"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px]">
                    {listing.platform[0]}
                  </span>
                  <span className="text-xs font-bold text-on-surface">{listing.platform}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-primary">
                    ₹{listing.price.toFixed(2)}
                  </span>
                  {featuredBest?.platform === listing.platform && (
                    <p className="text-[9px] font-bold text-secondary">Lowest mapped</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Market Insight -- now driven by the actual top deal from the backend */}
      <section className="bg-primary text-white p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-primary-container">trending_down</span>
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#a3efdb]">
              Market Insight
            </h4>
          </div>
          {topDeal ? (
            <>
              <p className="text-base font-bold leading-tight">
                {topDeal.title} is {topDeal.savings_percent.toFixed(0)}% cheaper on{' '}
                {topDeal.lowest_platform} than {topDeal.highest_platform}.
              </p>
              <p className="text-xs opacity-80 leading-normal">
                ₹{topDeal.lowest_price.toLocaleString('en-IN')} vs ₹
                {topDeal.highest_price.toLocaleString('en-IN')} — the biggest cross-platform gap
                we're tracking right now.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(topDeal.product_id);
                }}
                className="mt-2 bg-[#1f6f5f] hover:bg-white hover:text-primary transition-all text-white font-bold text-xs py-2 px-4 rounded-lg"
              >
                View This Deal
              </button>
            </>
          ) : (
            <p className="text-base font-bold leading-tight">
              Tracking {products.length} products across multiple marketplaces.
            </p>
          )}
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none flex items-end">
          <svg className="w-full h-1/2 text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 Q30,40 60,60 T100,20 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Trending Grid */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-on-surface px-1">Other Trending Deals</h3>
        <div className="grid grid-cols-2 gap-3">
          {trendingProducts.map((item) => {
            const best = getBestPrice(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item.id)}
                className="bg-white p-3 rounded-xl shadow-sm border border-outline-variant/10 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-custom-bg p-1 flex items-center justify-center border border-outline-variant/5">
                  <img
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    src={item.image_url ?? ''}
                    alt={item.title}
                    onError={handleImageError}
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <h4 className="text-xs font-bold text-on-surface truncate">{item.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-primary">
                      {best ? `₹${best.price.toFixed(0)}` : '—'}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-primary">
                      <span className="material-symbols-outlined text-[16px] font-black">add</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-6 border-t border-outline-variant/15 text-center space-y-3">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Comparing prices across tracked marketplaces
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-black opacity-45 select-none tracking-wider text-outline font-sans">
          <span>AMAZON</span>
          <span>FLIPKART</span>
          <span>MEESHO</span>
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-12 h-12 rounded-xl bg-primary text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Add Custom Price Tracker"
        >
          <span className="material-symbols-outlined text-2xl font-black">add</span>
        </button>
      </div>

      {/* Add Modal */}
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
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                  Product Name
                </label>
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
                <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                  Target / Current Price (₹)
                </label>
                <input
                  type="number"
                  required
                  className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none focus:border-primary"
                  placeholder="e.g. 29999"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Category
                  </label>
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
                  <label className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Store Source
                  </label>
                  <select
                    className="w-full bg-custom-bg border border-outline-variant/40 rounded-lg p-2.5 text-xs outline-none text-on-surface"
                    value={newProductStore}
                    onChange={(e) => setNewProductStore(e.target.value)}
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Meesho">Meesho</option>
                  </select>
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-red-500 font-semibold">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg text-xs font-bold hover:bg-primary-hover transition-colors mt-2 disabled:opacity-50"
              >
                {submitting ? 'Saving…' : 'Track Product Instantly'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
