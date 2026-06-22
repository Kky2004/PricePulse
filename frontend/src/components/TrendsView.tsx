import React, { useState, useEffect, useMemo } from 'react';
import { Product, PriceTrend, BestPrice, PricePoint } from '../types';
import CompactChart from './CompactChart';
import { getProducts } from '../services/dashboardService';
import { getAllPriceTrends } from '../services/priceService';
import { deriveBestPrices, getAllListings } from '../services/compareService';

interface TrendsViewProps {
  onSelectProduct: (productId: number) => void;
}

// Derive PriceHistoryPoint-compatible shape from PricePoint[]
// CompactChart expects { date: string; price: number }
function toChartPoints(points: PricePoint[]): { date: string; price: number }[] {
  return points.map((p) => ({
    date: new Date(p.recorded_at).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    }),
    price: p.price,
  }));
}

// Slice points by range
function filterByRange(points: PricePoint[], range: '7d' | '30d' | '1y'): PricePoint[] {
  const now = Date.now();
  const ms = range === '7d' ? 7 : range === '30d' ? 30 : 365;
  const cutoff = now - ms * 24 * 60 * 60 * 1000;
  const filtered = points.filter((p) => new Date(p.recorded_at).getTime() >= cutoff);
  return filtered.length > 0 ? filtered : points; // fallback to all if sparse
}

// Compute stats from points
function computeStats(points: PricePoint[]) {
  if (!points.length) return { lowest: 0, highest: 0, average: 0 };
  const prices = points.map((p) => p.price);
  return {
    lowest: Math.min(...prices),
    highest: Math.max(...prices),
    average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
  };
}

// Percent change from first to last point in a series, signed (negative = price drop)
function pctChange(points: PricePoint[]): number {
  if (points.length < 2) return 0;
  const first = points[0].price;
  const last = points[points.length - 1].price;
  if (first === 0) return 0;
  return Math.round(((last - first) / first) * 100);
}

export default function TrendsView({ onSelectProduct }: TrendsViewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&q=80';
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);
  const [bestPrices, setBestPrices] = useState<BestPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [range, setRange] = useState<'7d' | '30d' | '1y'>('30d');
  const [selectedProductId, setSelectedProductId] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [productList, trends, listings] = await Promise.all([
          getProducts(),
          getAllPriceTrends(),
          getAllListings(),
        ]);
        if (cancelled) return;

        setProducts(productList);
        setPriceTrends(trends);
        setBestPrices(deriveBestPrices(productList, listings));
        setSelectedProductId((current) => current || productList[0]?.id || 0);
      } catch (err) {
        if (!cancelled) setError('Could not load trend data. Is the backend running?');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Products that have trend data available
  const trendableProducts = useMemo(
    () => products.filter((p) => priceTrends.some((t) => t.product_id === p.id)),
    [products, priceTrends]
  );

  const selectedProduct = products.find((p) => p.id === selectedProductId) ?? products[0];

  // Merge all platform points for the selected product
  const allPoints = useMemo<PricePoint[]>(() => {
    return priceTrends
      .filter((t) => t.product_id === selectedProduct?.id)
      .flatMap((t) => t.points)
      .sort(
        (a, b) =>
          new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
      );
  }, [priceTrends, selectedProduct]);

  const rangedPoints = useMemo(
    () => filterByRange(allPoints, range),
    [allPoints, range]
  );

  const chartData = useMemo(() => toChartPoints(rangedPoints), [rangedPoints]);
  const stats = useMemo(() => computeStats(allPoints), [allPoints]);

  // Best price for selected product
  const bestPrice = bestPrices.find((b) => b.product_id === selectedProduct?.id);

  // Trend percentage: compare first vs last point in range
  const trendPct = useMemo(() => {
    if (rangedPoints.length < 2) return 0;
    const first = rangedPoints[0].price;
    const last = rangedPoints[rangedPoints.length - 1].price;
    return Math.abs(Math.round(((last - first) / first) * 100));
  }, [rangedPoints]);

  const trendDir = useMemo(() => {
    if (rangedPoints.length < 2) return 'stable';
    const first = rangedPoints[0].price;
    const last = rangedPoints[rangedPoints.length - 1].price;
    return last < first ? 'down' : last > first ? 'up' : 'stable';
  }, [rangedPoints]);

  // Market movers: products with the LARGEST actual price change across
  // their trend history, ranked by |% change|, excluding the selected one.
  // (Previously this was just the first 2 other products in array order.)
  const marketMovers = useMemo(() => {
    const candidates = products
      .filter((p) => p.id !== selectedProduct?.id)
      .map((p) => {
        const points = priceTrends
          .filter((t) => t.product_id === p.id)
          .flatMap((t) => t.points)
          .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime());
        return { product: p, change: pctChange(points) };
      })
      .filter((c) => c.change !== 0);

    candidates.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
    return candidates.slice(0, 2).map((c) => c.product);
  }, [products, priceTrends, selectedProduct]);

  if (loading) {
    return (
      <div className="py-20 text-center text-on-surface-variant text-sm">
        Loading trend data…
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

  if (!selectedProduct) return null;

  return (
    <div className="space-y-6 pb-12">

      {/* Header & Range Toggle */}
      <section className="space-y-4 pt-2">
        <h2 className="text-2xl font-black tracking-tight text-white">Trends & Insights</h2>
        <div className="flex bg-white/80 p-1 border border-outline-variant/30 rounded-xl w-fit">
          {(['7D', '30D', '1Y'] as const).map((r) => {
            const val = r.toLowerCase() as '7d' | '30d' | '1y';
            const isActive = range === val;
            return (
              <button
                key={r}
                onClick={() => setRange(val)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${isActive
                    ? 'bg-primary text-black shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product selector thumbnails */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {trendableProducts.map((p) => {
          const isSelected = p.id === selectedProductId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold shrink-0 cursor-pointer ${isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-outline-variant/30 bg-black hover:border-outline'
                }`}
            >
              <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center p-0.5 bg-black">
                <img
                  src={p.image_url ?? ''}
                  className="object-contain"
                  alt=""
                  onError={handleImageError}
                />
              </div>
              {p.brand}
            </button>
          );
        })}
      </div>

      {/* Selected product summary */}
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 border border-outline-variant/20">
            <img
              alt={selectedProduct.title}
              className="w-full h-full object-contain"
              src={selectedProduct.image_url ?? ''}
              onError={handleImageError}
            />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-white line-clamp-1">
              {selectedProduct.title}
            </h3>
            <p className="text-[10px] font-medium text-on-surface-variant">
              {selectedProduct.brand} • {selectedProduct.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-primary">
            {bestPrice ? `₹${bestPrice.price.toFixed(2)}` : '—'}
          </p>
          {trendPct > 0 && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-primary text-[10px] font-bold">
              <span className="material-symbols-outlined text-[12px] font-black">
                {trendDir === 'down' ? 'trending_down' : 'trending_up'}
              </span>
              {trendDir === 'down' ? '-' : '+'}{trendPct}%
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider">
            Price History ({range.toUpperCase()})
          </span>
          <span className="material-symbols-outlined text-outline select-none">info</span>
        </div>

        <div className="relative pt-2">
          {chartData.length > 0 ? (
            <CompactChart
              data={chartData}
              strokeColor="#005648"
              fillColorStart="#005648"
              height={130}
            />
          ) : (
            <div className="h-[130px] flex items-center justify-center text-xs text-on-surface-variant">
              No price data available for this range.
            </div>
          )}
        </div>

        <div className="flex justify-between mt-3 text-[10px] text-outline-variant font-extrabold uppercase px-1">
          {chartData
            .filter(
              (_, i) =>
                i === 0 ||
                i === chartData.length - 1 ||
                i === Math.floor(chartData.length / 2)
            )
            .map((pt, i) => (
              <span key={i}>{pt.date}</span>
            ))}
        </div>
      </section>

      {/* Stats bento */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Lowest Tracked</p>
          <p className="text-lg font-black text-primary mt-1">₹{stats.lowest.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Highest Tracked</p>
          <p className="text-lg font-black text-on-surface mt-1">₹{stats.highest.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10">
          <p className="text-[9px] font-extrabold text-on-surface-variant uppercase">Avg Pricing</p>
          <p className="text-lg font-black text-on-surface mt-1">₹{stats.average.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-primary-container/30">
          <p className="text-[9px] font-bold text-primary uppercase">Current Best</p>
          <p className="text-lg font-black text-primary mt-1">
            {bestPrice ? `₹${bestPrice.price.toFixed(0)}` : '—'}
          </p>
        </div>
      </section>

      {/* Market Movers -- now ranked by actual price change, not array order */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">Market Movers</h3>
        </div>

        {marketMovers.length === 0 ? (
          <p className="text-xs text-on-surface-variant text-center py-4">
            No significant price movement detected yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {marketMovers.map((mover) => {
              const moverBest = bestPrices.find((b) => b.product_id === mover.id);
              const moverPoints = priceTrends
                .filter((t) => t.product_id === mover.id)
                .flatMap((t) => t.points)
                .sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime());
              const moverChange = pctChange(moverPoints);

              return (
                <div
                  key={mover.id}
                  onClick={() => onSelectProduct(mover.id)}
                  className="bg-white p-3 rounded-xl shadow-sm border border-outline-variant/10 relative hover:border-primary transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-white text-[9px] font-bold z-10 ${
                      moverChange < 0 ? 'bg-secondary' : 'bg-red-500'
                    }`}
                  >
                    {moverChange < 0 ? '' : '+'}{moverChange}%
                  </span>
                  <div className="aspect-square w-full rounded-lg bg-custom-bg p-1.5 flex items-center justify-center overflow-hidden mb-2">
                    <img
                      alt={mover.title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      src={mover.image_url ?? ''}
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface truncate">{mover.title}</p>
                    <p className="text-sm font-black text-primary mt-1">
                      {moverBest ? `₹${moverBest.price.toFixed(2)}` : '—'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
