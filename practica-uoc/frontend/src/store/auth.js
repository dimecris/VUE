/**
 * auth.js
 * 
 * Este archivo define un store de autenticación utilizando Pinia para gestionar el estado global relacionado con la autenticación del usuario.
 * 
 * Funcionalidades principales:
 * - Iniciar sesión: Realiza una solicitud a la API para autenticar al usuario y almacena el token y los datos del usuario.
 * - Cerrar sesión: Limpia el estado de autenticación y elimina los datos almacenados localmente.
 * - Cargar sesión: Recupera el token y los datos del usuario desde el almacenamiento local para mantener la sesión activa.
 * - Establecer manualmente el token y los datos del usuario.
 * 
 * Este store también incluye un getter para verificar si el usuario está autenticado.
 */

import { defineStore } from 'pinia';
import axios from 'axios';

// URL base para las solicitudes a la API
const baseUrl = 'http://localhost:3000'

export const useAuthStore = defineStore('auth', {
  // Estado inicial del Store
  state: () => ({
    user: null, // Información del usuario autenticado
    token: null // Token de autenticación
  }),
  actions: {
    // Acción para iniciar sesión
    async login(username, password) {
      try {
        console.log('Datos enviados:', { username, password });
        // Solicitud para obtener el token de autenticación
        const loginResponse = await axios.post(`${baseUrl}/login`, { username, password });
        console.log('Respuesta de la API de login:', loginResponse);

        if (loginResponse.data && loginResponse.data.token) {
          // Guardar el token en el estado y en el almacenamiento local
          this.token = loginResponse.data.token;
          localStorage.setItem('token', this.token);
  
          // Solicitud para obtener los datos del usuario
          const userResponse = await axios.get(`${baseUrl}/user/${username}`, {
            headers: { Authorization: this.token }
          });
          console.log('Respuesta de la API de usuario:', userResponse);

          if (userResponse.data) {
            // Guardar los datos del usuario en el estado y en el almacenamiento local
            this.user = userResponse.data;
            console.log('Objeto user asignado:', this.user);
            localStorage.setItem('user', JSON.stringify(this.user)); // Guardar el objeto user completo, incluyendo 'bio'
            return { token: this.token, user: this.user };
          } else {
            throw new Error('Error al obtener los datos del usuario.');
          }
        } else {
          throw new Error('Error en el inicio de sesión. Token no recibido.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    // Acción para cerrar sesión
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
      localStorage.removeItem('user'); // Eliminar los datos del usuario del almacenamiento local
    },
    // Acción para cargar la sesión desde el almacenamiento local
    loadSession() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log('Datos locales cargados:', { token, user });
      if (token && user) {
        this.token = token; // Asignar el token al estado
        this.user = JSON.parse(user); // Parsear y asignar los datos del usuario al estado
        console.log('Objeto user después de parsear:', this.user);
      }
    },
    // Acción para establecer manualmente el token de autenticación
    setAuthToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    },
    // Acción para establecer manualmente los datos del usuario
    setUser(user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }
  },
  getters: {
    // Getter para verificar si el usuario está autenticado
    isAuthenticated: (state) => !!state.token
  }
});
