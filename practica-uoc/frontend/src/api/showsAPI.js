import axios from 'axios';

const API_URL = 'http://localhost:3000';

let authToken = null;

// Establecer el token desde fuera, por ejemplo después de hacer login
export function setAuthToken(token) {
  authToken = token;
}

// Axios instance con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token si está presente
apiClient.interceptors.request.use(config => {
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

// Métodos expuestos
export default {
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
  getUserByUsername(username) {
    return apiClient.get(`/user/${username}`);
  },
  getPosts() {
    return apiClient.get('/posts?limit=10&offset=0');
  },

  getUserPosts(username, limit = 10, offset = 0) {
    return apiClient.get(`/user/${username}/posts`, {
      params: {
        limit,
        offset
      }
    });
  }
};
