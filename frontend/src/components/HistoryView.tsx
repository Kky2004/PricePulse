 import React, { useState, useEffect, useMemo } from 'react';
import { SearchHistoryItem } from '../types';
import { getSearchHistory, deleteSearchHistoryItem } from '../services/historyServices';

interface HistoryViewProps {
  onSearch: (term: string) => void; // re-run a past search
}

export default function HistoryView({ onSearch }: HistoryViewProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [items, setItems] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getSearchHistory();
      setItems(data);
    } catch (err) {
      setError('Could not load search history. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filteredItems = useMemo(() => {
    if (!filterQuery) return items;
    const q = filterQuery.toLowerCase();
    return items.filter((item) => item.product_name.toLowerCase().includes(q));
  }, [items, filterQuery]);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Optimistic remove, with rollback on failure
    const prev = items;
    setItems((current) => current.filter((item) => item.id !== id));
    try {
      await deleteSearchHistoryItem(id);
    } catch {
      setItems(prev); // rollback
    }
  };

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Most frequently searched term, for the "Popular" stat
  const mostPopular = useMemo(() => {
    if (items.length === 0) return null;
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.product_name, (counts.get(item.product_name) ?? 0) + 1);
    }
    let top = items[0].product_name;
    let topCount = 0;
    for (const [name, count] of counts.entries()) {
      if (count > topCount) {
        top = name;
        topCount = count;
      }
    }
    return top;
  }, [items]);

  if (loading) {
    return (
      <div className="py-20 text-center text-on-surface-variant text-sm">
        Loading search history…
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
    <div className="space-y-6 pb-12">

      {/* Search Input */}
      <section className="space-y-3 pt-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline select-none">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-black border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans text-xs"
            placeholder="Search in history"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-2">
        <div className="bg-success p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Total</p>
          <p className="text-sm font-black text-primary">{items.length}</p>
        </div>
        <div className="bg-black p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Popular</p>
          <p className="text-xs font-bold text-primary truncate">
            {mostPopular ?? '—'}
          </p>
        </div>
        <div className="bg-black p-3 rounded-xl shadow-sm text-center border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5">Last Search</p>
          <p className="text-[11px] font-black text-primary">
            {items[0] ? formatTimestamp(items[0].searched_at) : '—'}
          </p>
        </div>
      </section>

      {/* Search History List */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-white px-1">Search History</h2>

        <div className="flex flex-col gap-3">
          {filteredItems.length === 0 ? (
            <p className="text-xs text-on-surface-variant text-center py-6">
              {items.length === 0 ? 'No searches yet.' : 'No matching history found.'}
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSearch(item.product_name)}
                className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center gap-3 hover:border-primary transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">history</span>
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {item.product_name}
                  </h3>
                  <p className="text-[10px] text-outline font-semibold mt-0.5">
                    {formatTimestamp(item.searched_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-1.5 text-outline-variant hover:text-red-500 rounded-md transition-colors"
                    title="Remove from history"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSearch(item.product_name);
                    }}
                    className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded-full font-bold text-[10px] transition-all"
                  >
                    Search Again
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
