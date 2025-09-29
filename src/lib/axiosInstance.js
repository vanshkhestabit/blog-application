import axios from "axios";

const apiBackendURL = "http://localhost:3000/api/v1";
const api = axios.create({
  baseURL: apiBackendURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
