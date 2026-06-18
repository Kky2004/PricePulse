import api from "../api/api";
import { Product } from "../types";
import { mockProducts } from "../data";

const makeSafeProduct = (raw: any): Product => {
  const id = raw.slug || (raw.id !== undefined ? String(raw.id) : undefined) || `prod-${Math.random().toString(36).slice(2,8)}`;
  const name = raw.title || raw.name || 'Unknown Product';
  const image = raw.image_url || raw.image || '';
  const brand = raw.brand || 'Unknown';
  const currentPrice = Number(raw.currentPrice ?? raw.current_price ?? raw.price ?? 0) || 0;

  // Use a lightweight safe shape with sensible defaults to avoid runtime errors calling toFixed
  return {
    id,
    name,
    brand,
    category: raw.category || 'Misc',
    rating: Number(raw.rating ?? 4.5) || 4.5,
    reviewsCount: raw.reviewsCount || '0',
    currentPrice,
    lowestPrice: Number(raw.lowestPrice ?? raw.lowest_price ?? currentPrice) || currentPrice,
    highestPrice: Number(raw.highestPrice ?? raw.highest_price ?? currentPrice) || currentPrice,
    averagePrice: Number(raw.averagePrice ?? raw.average_price ?? currentPrice) || currentPrice,
    description: raw.description || '',
    specifications: raw.specifications || [],
    image,
    trendDirection: raw.trendDirection || 'stable',
    trendPercentage: Number(raw.trendPercentage ?? 0) || 0,
    bestDealStore: raw.bestDealStore || '',
    bestDealSavingsPercent: Number(raw.bestDealSavingsPercent ?? 0) || 0,
    bestDealSavingsAmount: Number(raw.bestDealSavingsAmount ?? 0) || 0,
    stores: raw.stores || [],
    priceHistory7d: raw.priceHistory7d || [],
    priceHistory30d: raw.priceHistory30d || [],
    priceHistory1y: raw.priceHistory1y || [],
    recentEvents: raw.recentEvents || []
  } as Product;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  const data = response.data;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return mockProducts;
  }

  try {
    return data.map(makeSafeProduct);
  } catch (err) {
    // Fallback to mock products on unexpected shape
    return mockProducts;
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  const raw = response.data;
  return makeSafeProduct(raw);
};

export const createProduct = async (product: {
  title: string;
  category: string;
  image_url: string;
  brand: string;
  slug?: string;
}): Promise<Product> => {
  const response = await api.post("/products", product);
  return makeSafeProduct(response.data);
};
