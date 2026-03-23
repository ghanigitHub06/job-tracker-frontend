import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-production-b07b.up.railway.app/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// NO response interceptor - removed completely
API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default API;
