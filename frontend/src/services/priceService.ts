import api from "../api/api";

export const getProductPrices = async (productId: string) => {
  const response = await api.get(`/prices/${productId}`);
  return response.data;
};

export const addPrice = async (data: {
  product_id: number;
  platform: string;
  price: number;
}) => {
  const response = await api.post("/prices", data);
  return response.data;
};

export const getPriceHistory = async (productId: string) => {
  const response = await api.get(`/prices/${productId}`);
  return response.data;
};
