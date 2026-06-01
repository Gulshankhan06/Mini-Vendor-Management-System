import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-vendor-management-system.onrender.com",
});

export default API;