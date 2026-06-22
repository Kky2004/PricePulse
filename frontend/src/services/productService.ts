import api from "../api/api";
import { Product } from "../types";

const makeSafeProduct = (raw: any): Product => {
  return {
    id:          Number(raw.id),
    title:       raw.title || raw.name || 'Unknown Product',
    brand:       raw.brand || 'Unknown',
    category:    raw.category || 'Misc',
    description: raw.description || '',
    image_url:   raw.image_url || raw.image || '',
    created_at:  raw.created_at || new Date().toISOString(),
  };
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    const data = response.data;
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    return data.map(makeSafeProduct);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    return [];
  }
};

export const getProductById = async (productId: number): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${productId}`);
    return makeSafeProduct(response.data);
  } catch (err) {
    console.error(`❌ Failed to fetch product ${productId}:`, err);
    return null;
  }
};

export const createProduct = async (product: {
  title: string;
  category: string;
  image_url: string;
  brand: string;
  description?: string;
}): Promise<Product | null> => {
  try {
    const response = await api.post('/products', product);
    return makeSafeProduct(response.data);
  } catch (err) {
    console.error('❌ Failed to create product:', err);
    return null;
  }
};