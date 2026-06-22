export interface Specification {
  label: string;
  value: string;
  icon: string;
}

export interface StoreOffer {
  name: string;
  price: number;
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
  shippingInfo: string;
  logoUrl?: string;
  actionUrl?: string;
  badge?: string;
  isLowest?: boolean;
}



export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface PricePoint {
  price: number;
  recorded_at: string;
}

export interface PriceTrend {
  product_id: number;
  title: string;
  platform: string;
  points: PricePoint[];
}

export interface RecentEvent {
  date: string;
  type: 'drop' | 'stable' | 'increase';
  title: string;
  subtitle: string;
}

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   category: string;
//   rating: number;
//   reviewsCount: string;
//   currentPrice: number;
//   lowestPrice: number;
//   highestPrice: number;
//   averagePrice: number;
//   description: string;
//   specifications: Specification[];
//   image: string;
//   trendDirection: 'up' | 'down' | 'stable';
//   trendPercentage: number;
//   bestDealStore: string;
//   bestDealSavingsPercent: number;
//   bestDealSavingsAmount: number;
//   stores: StoreOffer[];
//   priceHistory7d: PriceHistoryPoint[];
//   priceHistory30d: PriceHistoryPoint[];
//   priceHistory1y: PriceHistoryPoint[];
//   recentEvents: RecentEvent[];
// }

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface ProductListing {
  id: number;
  product_id: number;
  platform: string;          // "Amazon" | "Flipkart" | "Meesho"
  price: number;
  rating?: number;
  reviews_count?: number;
  stock_status?: string;     // "In Stock" | "Out of Stock"
  product_url?: string;
  seller_name?: string;
  recorded_at: string;
}

export interface BestPrice {
  product_id: number;
  title: string;
  platform: string;
  price: number;
  product_url?: string;
  seller_name?: string;
  stock_status?: string;
}

export interface SearchTrackItem {
  id: string;
  productId: number;
  productName: string;
  brand: string;
  price: number;
  store: string;
  storeLogo?: string;
  image: string;
  timestamp: string; // e.g. "Today, 2:40 PM"
  trendType: 'down' | 'up' | 'stable';
  changeAmount?: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  email: string;
  createdAt: string;
}



export interface DashboardResponse {
  total_searches: number;
  total_products: number;
  total_price_records: number;

  recent_searches: {
    product_name: string;
    searched_at: string;
  }[];

  most_searched_products: {
    product_name: string;
    search_count: number;
  }[];

}
export interface SearchHistoryItem {
  id: number;
  product_name: string;
  searched_at: string;
}
 


export interface LoginResponse {
  access_token: string;
  full_name: string;
  token_type?: string;
}

export interface SignupResponse {
  message?: string;
  full_name?: string;
  email?: string;
}

export interface ProductWithBestPrice extends Product {
  bestPrice: BestPrice;
}