// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(config => {
  const player = JSON.parse(localStorage.getItem('player'));
  const adminToken = localStorage.getItem('adminToken');
  
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (player && player.jwt) {
    config.headers.Authorization = `Bearer ${player.jwt}`;
  }
  
  // Désactiver le cache pour les requêtes
  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  config.headers['If-Modified-Since'] = '0';
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
