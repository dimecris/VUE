/**
 * auth.js
 * 
 * Este archivo define un store de Pinia para gestionar la autenticación de usuarios en la aplicación.
 * 
 * Funcionalidades principales:
 * - Almacenar y gestionar el estado de autenticación del usuario.
 * - Proveer métodos para iniciar y cerrar sesión.
 * - Persistir la sesión del usuario en el almacenamiento local.
 * 
 * Estado:
 * - user: Información del usuario autenticado.
 * - token: Token de autenticación del usuario.
 * 
 * Getters:
 * - isAuthenticated: Devuelve `true` si el usuario está autenticado (es decir, si hay un token válido).
 * 
 * Acciones:
 * - login: Inicia sesión con un nombre de usuario y contraseña, y almacena el token y la información del usuario.
 * - logout: Cierra la sesión del usuario y limpia el estado.
 * - loadSession: Carga la sesión del usuario desde el almacenamiento local.
 * - setAuthToken: Establece manualmente el token de autenticación.
 * - setUser: Establece manualmente la información del usuario.
 */

// Importa las dependencias necesarias
import { defineStore } from 'pinia'
import axios from 'axios'

// Configuración de la instancia de Axios para la API
const API = axios.create({ baseURL: 'http://localhost:3000' })

// Define el store de autenticación
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Información del usuario autenticado
    token: null, // Token de autenticación
  }),

  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: s => !!s.token,
  },

  actions: {
    // Persiste el estado de autenticación en el almacenamiento local
    _persist() {
      localStorage.setItem('token', this.token ?? '')
      localStorage.setItem('user', JSON.stringify(this.user ?? null))
    },

    // Inicia sesión con el nombre de usuario y contraseña
    async login(username, password) {
      try {
        const { data: login } = await API.post('/login', { username, password })
        if (!login?.token) throw new Error('Token no recibido')

        this.token = login.token // Almacena el token recibido
        const { data: user } = await API.get(`/user/${username}`, {
          headers: { Authorization: this.token }, // Incluye el token en la cabecera
        })

        this.user = user // Almacena la información del usuario
        this._persist() // Persiste la sesión
        return { token: this.token, user }
      } catch (err) {
        console.error('login ❌', err)
        throw err
      }
    },

    // Cierra la sesión del usuario
    logout() {
      this.token = null // Limpia el token
      this.user = null // Limpia la información del usuario
      this._persist() // Actualiza el almacenamiento local
    },

    // Carga la sesión desde el almacenamiento local
    loadSession() {
      const token = localStorage.getItem('token') || null
      const user  = localStorage.getItem('user')

      this.token = token // Restaura el token
      this.user  = user ? JSON.parse(user) : null // Restaura la información del usuario
    },

    // Establece manualmente el token de autenticación
    setAuthToken(t) { this.token = t; this._persist() },

    // Establece manualmente la información del usuario
    setUser(u) { this.user = u; this._persist() },
  },
})
