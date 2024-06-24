// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(config => {
  const adminToken = localStorage.getItem('adminToken');
  const player = JSON.parse(localStorage.getItem('player'));
  
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (player && player.jwt) {
    config.headers.Authorization = `Bearer ${player.jwt}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
