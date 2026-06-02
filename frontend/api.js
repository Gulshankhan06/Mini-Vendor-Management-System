import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-vendor-management-system.onrender.com/api",
});

export default API;