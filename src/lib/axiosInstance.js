import axios from "axios";

const apiBackendURL = process.env.BASE_URL + "/api/v1";
const api = axios.create({
  baseURL: apiBackendURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
