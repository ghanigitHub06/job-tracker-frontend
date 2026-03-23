import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-logout on every error
    // Only logout on 401 from specific endpoints
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      if (!url.includes("/auth/")) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default API;
