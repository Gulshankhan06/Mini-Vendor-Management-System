import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-vendor-management-system.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;