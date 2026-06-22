import React, { useState, useEffect } from 'react';
import { ProductWithBestPrice, PriceTrend } from '../types';
import CompactChart from './CompactChart';
import { getProductsWithBestPrices, getDashboardStats, DashboardStats } from '../services/dashboardService';
import { getPriceTrend, getLowestPriceTrendSeries } from '../services/priceService';
import { getProductImage, handleImageError } from '../utils/imgutils'

interface DashboardViewProps {
  onSelectProduct: (productId: number) => void;
  onSearch: (keyword: string) => void;
}

export default function DashboardView({ onSelectProduct, onSearch }: DashboardViewProps) {
  const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src =
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&q=80";
};
   
    
  };
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<ProductWithBestPrice[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trendSeries, setTrendSeries] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const productList = await getProductsWithBestPrices();
        if (cancelled) return;
        setProducts(productList);

        // Stats -- fails gracefully if /dashboard/stats isn't built yet
        try {
          const dashStats = await getDashboardStats();
          if (!cancelled) setStats(dashStats);
        } catch {
          if (!cancelled) setStats(null);
        }

        // Trend chart for the featured product
        const featured = productList[0];
        if (featured) {
          const trends: PriceTrend[] = await getPriceTrend(featured.id);
          if (!cancelled) setTrendSeries(getLowestPriceTrendSeries(trends));
        }
      } catch (err) {
        if (!cancelled) setError('Could not load dashboard data. Is the backend running?');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  console.log("products =", products);
  console.log("isArray =", Array.isArray(products));
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  // Deal of the day: cheapest current best-price among loaded products.
  const productArray = Array.isArray(products)
  ? products
  : [products];
  const featuredProduct = productArray.reduce<ProductWithBestPrice | null>((best, p) => {
    if (!best) return p;
    return p.bestPrice.price < best.bestPrice.price ? p : best;
  }, null) ?? products[0];

  const recentProducts = productArray.slice(0, 2);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-400">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-red-400">
        {error}
      </div>
    );
  }

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
          {productArray.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSearchInput(p.title);
                onSearch(p.title);
              }}
              className="px-5 py-2 rounded-full bg-[#161B22] border border-violet-500/20 text-gray-300 hover:bg-violet-600 hover:text-white transition-all duration-300"
            >
              {p.title}
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
                {featuredProduct.title}
              </h3>
              <p className="text-sm text-gray-400">
                {featuredProduct.brand} • {featuredProduct.category}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-black text-green-400 leading-none">
                ₹{featuredProduct.bestPrice.price.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-violet-300 font-semibold tracking-wide">
                  {featuredProduct.bestPrice.platform}
                  {featuredProduct.bestPrice.seller_name ? ` • ${featuredProduct.bestPrice.seller_name}` : ''}
                </span>
              </div>
            </div>
            {featuredProduct.image_url && (
              <div className="w-24 h-24 relative overflow-hidden rounded-lg bg-custom-bg p-1 flex items-center justify-center border border-outline-variant/10">
                <img
                  alt={featuredProduct.title}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                  src={featuredProduct.image_url}
                  onError={handleImageError}
                />
              </div>
            )}
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
          <div className="text-lg font-black text-on-surface">{stats?.totalSearches ?? '—'}</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Total Searches</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-tertiary text-[22px]">local_fire_department</span>
          <div className="text-lg font-black text-on-surface">{stats?.bestDealsCount ?? '—'}</div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Best Deals</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-secondary text-[22px]">savings</span>
          <div className="text-lg font-black text-on-surface">
            {stats?.avgSavingsPercent != null ? `${stats.avgSavingsPercent.toFixed(0)}%` : '—'}
          </div>
          <div className="text-[11px] font-semibold text-on-surface-variant">Avg Savings</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-1 border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
          <div className="text-lg font-black text-on-surface">{stats?.productsTracked ?? products.length}</div>
          <div className="text-[11px] font-semibold text-white">Products Tracked</div>
        </div>
      </section>

      {/* Trend Preview */}
      {trendSeries.length > 0 && (
        <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-on-surface">
              {featuredProduct?.title} — Lowest Price Trend
            </h3>
          </div>
          <div className="pt-2">
            <CompactChart data={trendSeries} strokeColor="#4f46e5" fillColorStart="#4f46e5" height={100} showTooltip={false} />
          </div>
        </section>
      )}

      {/* Recents Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Tracked Products</h3>
          <button
            onClick={() => onSearch('')}
            className="text-primary text-xs font-semibold hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {recentProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.id)}
              className="bg-white p-3 rounded-xl flex items-center gap-3 shadow-sm border border-outline-variant/10 hover:border-outline transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="w-14 h-14 bg-custom-bg flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-outline-variant/5">
                {prod.image_url && (
                  <img
                    alt={prod.title}
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    src={prod.image_url}
                    onError={handleImageError}
                  />
                )}
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                  {prod.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-on-surface-variant">
                    {prod.brand} • <span className="font-extrabold text-primary">₹{prod.bestPrice.price.toLocaleString('en-IN')}</span>
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

