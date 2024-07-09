import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(config => {
  const adminToken = localStorage.getItem('adminToken');
  const playerToken = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).jwt : null;

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (playerToken) {
    config.headers.Authorization = `Bearer ${playerToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    const originalRequest = error.config;
    const adminToken = localStorage.getItem('adminToken');
    const playerToken = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).jwt : null;

    if (adminToken && originalRequest.url.includes('/admin')) {
      localStorage.removeItem('adminToken');
      // Déclencher l'affichage de la modal de mot de passe
      document.dispatchEvent(new Event('showPasswordModal'));
    } else if (playerToken) {
      localStorage.removeItem('player');
      router.push('/register');
    }
  }
  return Promise.reject(error);
});

export default api;
