import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7038/api",
});

export default API;
