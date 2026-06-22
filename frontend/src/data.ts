import { SearchTrackItem, Product, ProductListing, BestPrice, PriceTrend } from './types';

export const mockHistoryTimeline: SearchTrackItem[] = [
  {
    id: '1',
    productId: 1,
    productName: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 24999,
    store: 'Amazon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B',
    timestamp: 'Today, 2:40 PM',
    trendType: 'down' as const,
    changeAmount: '₹1,500',
  },
  {
    id: '2',
    productId: 2,
    productName: 'MacBook Air M3',
    brand: 'Apple',
    price: 114900,
    store: 'Flipkart',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ld8zbRU5IjZch_9Ixt21qFS1blv6WU58Izjsx75ZM2Mfc_X4gNR8zajCzze6UuZ9ds7XkwBjVE5YuyAi31B1gxAJLBSXSDW9XUroLi9O3Tv9xaG6wUk_H4haYOJ_9gmpKef3fzGB1J2MEUM57rGTSGEATKofUEa256b9OFjo1EjtdKarsluFhrer6pJVdyDr68C3beLEh9dLOcTsABX81uEGLImq-7egrwLMCnsXw9tHRo_lfreAoqfI0iYZohkEww4gmLR5tVdr',
    timestamp: 'Today, 1:55 PM',
    trendType: 'stable' as const,
  },
  {
    id: '3',
    productId: 3,
    productName: 'Smart Watch V3',
    brand: 'Nordic',
    price: 8999,
    store: 'Meesho',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PqNQNS_V6gMfz9qM7oCAmtKKoIvWNi15YmdRy3Z83rWMn7kW1iVbAHMa_Gcu2f9sI7r0sTnp4u_iO4syGCtbKgzXokkMvQzqNxeV6cy7yG6HT9vXHmSylX7nPzBooZTt0pB9t8nhK59aE_F6RkSdrqf8i1w6BXx2ygD75al91MZDJlOtdDfbA-225PJe0Wfcvud5WvxaE_7D63mTTa8CEUcN5RPtvyoOXl5bCUql23wN1FFMN7ZyPtKbboENBpbeGyKL8EaVBPRe',
    timestamp: 'Today, 1:00 PM',
    trendType: 'down' as const,
    changeAmount: '₹500',
  },
  {
    id: '4',
    productId: 4,
    productName: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 134900,
    store: 'Amazon',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=150&q=80',
    timestamp: 'Yesterday, 9:30 AM',
    trendType: 'up' as const,
    changeAmount: '₹2,000',
  },
  {
    id: '5',
    productId: 5,
    productName: 'iPad Pro 12.9"',
    brand: 'Apple',
    price: 112900,
    store: 'Flipkart',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&q=80',
    timestamp: 'Yesterday, 4:15 PM',
    trendType: 'stable' as const,
  },
  {
    id: '6',
    productId: 6,
    productName: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 129999,
    store: 'Amazon',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&q=80',
    timestamp: 'Yesterday, 11:00 AM',
    trendType: 'down' as const,
    changeAmount: '₹3,000',
  },
  {
    id: '7',
    productId: 7,
    productName: 'Boat Airdopes 141',
    brand: 'Boat',
    price: 1299,
    store: 'Meesho',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=150&q=80',
    timestamp: '2 days ago',
    trendType: 'down' as const,
    changeAmount: '₹200',
  },
  {
    id: '8',
    productId: 8,
    productName: 'OnePlus 12R',
    brand: 'OnePlus',
    price: 39999,
    store: 'Flipkart',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&q=80',
    timestamp: '2 days ago',
    trendType: 'stable' as const,
  },
];



export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    description: 'Industry-leading noise cancelling headphones with 30-hour battery life and crystal clear hands-free calling.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    description: 'Supercharged by the next-generation M3 chip, MacBook Air is more capable than ever with up to 18 hours of battery life.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ld8zbRU5IjZch_9Ixt21qFS1blv6WU58Izjsx75ZM2Mfc_X4gNR8zajCzze6UuZ9ds7XkwBjVE5YuyAi31B1gxAJLBSXSDW9XUroLi9O3Tv9xaG6wUk_H4haYOJ_9gmpKef3fzGB1J2MEUM57rGTSGEATKofUEa256b9OFjo1EjtdKarsluFhrer6pJVdyDr68C3beLEh9dLOcTsABX81uEGLImq-7egrwLMCnsXw9tHRo_lfreAoqfI0iYZohkEww4gmLR5tVdr',
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 3,
    title: 'Smart Watch V3',
    brand: 'Nordic',
    category: 'Wearables',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life in a sleek aluminium body.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PqNQNS_V6gMfz9qM7oCAmtKKoIvWNi15YmdRy3Z83rWMn7kW1iVbAHMa_Gcu2f9sI7r0sTnp4u_iO4syGCtbKgzXokkMvQzqNxeV6cy7yG6HT9vXHmSylX7nPzBooZTt0pB9t8nhK59aE_F6RkSdrqf8i1w6BXx2ygD75al91MZDJlOtdDfbA-225PJe0Wfcvud5WvxaE_7D63mTTa8CEUcN5RPtvyoOXl5bCUql23wN1FFMN7ZyPtKbboENBpbeGyKL8EaVBPRe',
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 4,
    title: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    description: 'Titanium design. A17 Pro chip. A camera that captures every detail. And the flexibility of USB 3.',
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80',
    created_at: '2024-02-10T10:00:00Z',
  },
  {
    id: 5,
    title: 'iPad Pro 12.9"',
    brand: 'Apple',
    category: 'Tablets',
    description: 'The ultimate iPad experience with the M2 chip, stunning Liquid Retina XDR display, and all-day battery life.',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80',
    created_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 6,
    title: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'The most powerful Galaxy ever with built-in S Pen, 200MP camera, and Galaxy AI features.',
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80',
    created_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 7,
    title: 'Boat Airdopes 141',
    brand: 'Boat',
    category: 'Audio',
    description: 'True wireless earbuds with 42-hour total playback, ASAP Charge, and IPX4 water resistance.',
    image_url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80',
    created_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 8,
    title: 'OnePlus 12R',
    brand: 'OnePlus',
    category: 'Smartphones',
    description: 'Powered by Snapdragon 8 Gen 2, 50W SUPERVOOC charging, and a fluid 120Hz AMOLED display.',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80',
    created_at: '2024-03-10T10:00:00Z',
  },
];


// ─── Mock Product Listings ────────────────────────────────────────────────────

export const mockListings: ProductListing[] = [
  // Sony WH-1000XM5 (product_id: 1)
  { id: 1,  product_id: 1, platform: 'Amazon',   price: 24999, rating: 4.5, reviews_count: 8200, stock_status: 'In Stock', seller_name: 'Sony India',    product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 2,  product_id: 1, platform: 'Flipkart', price: 25499, rating: 4.4, reviews_count: 6100, stock_status: 'In Stock', seller_name: 'RetailNet',     product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 3,  product_id: 1, platform: 'Meesho',   price: 26200, rating: 4.1, reviews_count: 980,  stock_status: 'In Stock', seller_name: 'AudioZone',     product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // MacBook Air M3 (product_id: 2)
  { id: 4,  product_id: 2, platform: 'Amazon',   price: 114900, rating: 4.8, reviews_count: 3400, stock_status: 'In Stock', seller_name: 'Apple India',   product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 5,  product_id: 2, platform: 'Flipkart', price: 113900, rating: 4.7, reviews_count: 2100, stock_status: 'In Stock', seller_name: 'TechRetail',    product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 6,  product_id: 2, platform: 'Meesho',   price: 116000, rating: 4.0, reviews_count: 310,  stock_status: 'In Stock', seller_name: 'GadgetHub',     product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // Smart Watch V3 (product_id: 3)
  { id: 7,  product_id: 3, platform: 'Amazon',   price: 8999,  rating: 4.3, reviews_count: 5600, stock_status: 'In Stock', seller_name: 'Nordic Store',  product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 8,  product_id: 3, platform: 'Flipkart', price: 9299,  rating: 4.2, reviews_count: 3200, stock_status: 'In Stock', seller_name: 'WearTech',      product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 9,  product_id: 3, platform: 'Meesho',   price: 9599,  rating: 3.9, reviews_count: 740,  stock_status: 'In Stock', seller_name: 'SmartDeals',    product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // iPhone 15 Pro (product_id: 4)
  { id: 10, product_id: 4, platform: 'Amazon',   price: 134900, rating: 4.8, reviews_count: 12400, stock_status: 'In Stock', seller_name: 'Apple India',  product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 11, product_id: 4, platform: 'Flipkart', price: 133900, rating: 4.7, reviews_count: 9800,  stock_status: 'In Stock', seller_name: 'iStore',       product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 12, product_id: 4, platform: 'Meesho',   price: 136000, rating: 4.2, reviews_count: 1200,  stock_status: 'In Stock', seller_name: 'MobileZone',   product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // iPad Pro 12.9" (product_id: 5)
  { id: 13, product_id: 5, platform: 'Amazon',   price: 112900, rating: 4.7, reviews_count: 4300, stock_status: 'In Stock', seller_name: 'Apple India',   product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 14, product_id: 5, platform: 'Flipkart', price: 111900, rating: 4.6, reviews_count: 2900, stock_status: 'In Stock', seller_name: 'TabWorld',      product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 15, product_id: 5, platform: 'Meesho',   price: 114500, rating: 4.0, reviews_count: 560,  stock_status: 'In Stock', seller_name: 'GadgetHub',     product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // Samsung Galaxy S24 Ultra (product_id: 6)
  { id: 16, product_id: 6, platform: 'Amazon',   price: 129999, rating: 4.6, reviews_count: 7800, stock_status: 'In Stock', seller_name: 'Samsung India', product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 17, product_id: 6, platform: 'Flipkart', price: 127999, rating: 4.5, reviews_count: 5600, stock_status: 'In Stock', seller_name: 'MobileMart',    product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 18, product_id: 6, platform: 'Meesho',   price: 131000, rating: 4.1, reviews_count: 890,  stock_status: 'In Stock', seller_name: 'PhoneDeals',    product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // Boat Airdopes 141 (product_id: 7)
  { id: 19, product_id: 7, platform: 'Amazon',   price: 1299, rating: 4.2, reviews_count: 32000, stock_status: 'In Stock', seller_name: 'Boat Official',  product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 20, product_id: 7, platform: 'Flipkart', price: 1199, rating: 4.1, reviews_count: 28000, stock_status: 'In Stock', seller_name: 'AudioMart',      product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 21, product_id: 7, platform: 'Meesho',   price: 1399, rating: 3.8, reviews_count: 4200,  stock_status: 'In Stock', seller_name: 'BudgetDeals',    product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },

  // OnePlus 12R (product_id: 8)
  { id: 22, product_id: 8, platform: 'Amazon',   price: 39999, rating: 4.5, reviews_count: 6700, stock_status: 'In Stock', seller_name: 'OnePlus India',  product_url: 'https://amazon.in', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 23, product_id: 8, platform: 'Flipkart', price: 38999, rating: 4.4, reviews_count: 5100, stock_status: 'In Stock', seller_name: 'MobileMart',     product_url: 'https://flipkart.com', recorded_at: '2024-06-01T10:00:00Z' },
  { id: 24, product_id: 8, platform: 'Meesho',   price: 40500, rating: 4.0, reviews_count: 1100, stock_status: 'In Stock', seller_name: 'PhoneZone',      product_url: 'https://meesho.com', recorded_at: '2024-06-01T10:00:00Z' },
];

// ─── Mock Best Prices ─────────────────────────────────────────────────────────

export const mockBestPrices: BestPrice[] = [
  { product_id: 1, title: 'Sony WH-1000XM5',          platform: 'Amazon',   price: 24999,  product_url: 'https://amazon.in', seller_name: 'Sony India',    stock_status: 'In Stock' },
  { product_id: 2, title: 'MacBook Air M3',            platform: 'Flipkart', price: 113900, product_url: 'https://flipkart.com', seller_name: 'TechRetail', stock_status: 'In Stock' },
  { product_id: 3, title: 'Smart Watch V3',            platform: 'Amazon',   price: 8999,   product_url: 'https://amazon.in', seller_name: 'Nordic Store',  stock_status: 'In Stock' },
  { product_id: 4, title: 'iPhone 15 Pro',             platform: 'Flipkart', price: 133900, product_url: 'https://flipkart.com', seller_name: 'iStore',     stock_status: 'In Stock' },
  { product_id: 5, title: 'iPad Pro 12.9"',            platform: 'Flipkart', price: 111900, product_url: 'https://flipkart.com', seller_name: 'TabWorld',   stock_status: 'In Stock' },
  { product_id: 6, title: 'Samsung Galaxy S24 Ultra',  platform: 'Flipkart', price: 127999, product_url: 'https://flipkart.com', seller_name: 'MobileMart', stock_status: 'In Stock' },
  { product_id: 7, title: 'Boat Airdopes 141',         platform: 'Flipkart', price: 1199,   product_url: 'https://flipkart.com', seller_name: 'AudioMart',  stock_status: 'In Stock' },
  { product_id: 8, title: 'OnePlus 12R',               platform: 'Flipkart', price: 38999,  product_url: 'https://flipkart.com', seller_name: 'MobileMart', stock_status: 'In Stock' },
];

// ─── Mock Price Trends ────────────────────────────────────────────────────────

// Helper to generate realistic price points going back N days
function generatePoints(basePrice: number, days: number, volatility = 0.03) {
  const points = [];
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const jitter = 1 + (Math.random() - 0.5) * volatility;
    const trend = 1 - (i / days) * 0.05; // slight downward trend over time
    points.push({
      price: Math.round(basePrice * jitter * trend),
      recorded_at: date.toISOString(),
    });
  }
  return points;
}



