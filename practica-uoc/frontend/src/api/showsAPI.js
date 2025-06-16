// src/api/showsAPI.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';
let authToken = null;

export function setAuthToken(token) { // función para establecer el token de autenticación
  authToken = token;
}

const apiClient = axios.create({ // crear una instancia de axios con la configuración base
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => { // interceptor para añadir el token de autenticación a cada solicitud
  // Si hay un token de autenticación, lo añade a las cabeceras de la solicitud
  if (authToken) {
    config.headers.Authorization = authToken; // Añadir el token de autenticación a las cabeceras
  }
  return config;
});


export default apiClient;
