import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.message}`);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
    }
    return Promise.reject(error);
  }
);

export default api;