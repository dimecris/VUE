// src/api/showsAPI.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';
let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});


export default apiClient;
