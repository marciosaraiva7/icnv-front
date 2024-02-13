import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://icnv-backend.onrender.com/api/", // Substitua pela URL da sua API
  timeout: 10000, // Tempo limite de 10 segundos para todas as solicitações
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
