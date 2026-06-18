import api from "../api/api";

export const searchProducts = async (query: string) => {
  const response = await api.get("/search", {
    params: { query }
  });
  return response.data;
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  const response = await api.get("/search/suggestions", {
    params: { query }
  });
  return response.data;
};
