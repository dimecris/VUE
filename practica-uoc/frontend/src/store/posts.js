/**
 * posts.js
 * 
 * Este archivo define un store de Pinia para gestionar los posts en la aplicación.
 * 
 * Funcionalidades principales:
 * - Almacenar y gestionar el estado de los posts.
 * - Proveer métodos para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los posts.
 * - Integración con una API externa para obtener y manipular datos de posts.
 * - Manejar la paginación de los posts.
 * 
 * Estado:
 * - posts: Lista de posts cargados.
 * - totalPosts: Número total de posts disponibles.
 * - limit: Número de posts por página.
 * - offset: Desplazamiento para la paginación.
 * - loading: Indica si se está cargando información.
 * 
 * Acciones:
 * - fetchPosts: Obtiene una lista de posts desde la API.
 * - createPost: Crea un nuevo post y lo añade al estado.
 * - updatePost: Actualiza un post existente en el estado.
 * - deletePost: Elimina un post del estado.
 * - fetchPostsByUser: Obtiene los posts de un usuario específico.
 */

// Importa las dependencias necesarias
import { defineStore, storeToRefs } from 'pinia'
import apiClient from '../api/showsAPI';
import { useAuthStore } from './auth'


// Define el store de posts
export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [], // Lista de posts cargados
    totalPosts: 0, // Número total de posts disponibles
    limit: 10, // Número de posts por página
    offset: 0, // Desplazamiento para la paginación
    loading: false, // Indica si se está cargando información
  }),

  actions: {
    // Agrega nuevos posts al estado y actualiza el offset
    _append(newPosts = []) {
      this.posts.push(...newPosts)
      this.offset += this.limit
    },

    // Obtiene una lista de posts desde la API
    async fetchPosts() {
      try {
        this.loading = true // Activa el indicador de carga
        const { data } = await  apiClient.get('/posts', {
          params: { limit: this.limit, offset: this.offset }, // Parámetros de paginación
        })
        this._append(data?.result || []) // Agrega los posts obtenidos
        this.totalPosts = data?.paginator?.total ?? this.totalPosts // Actualiza el total de posts
      } catch (err) {
        console.error('fetchPosts ERRORS: ', err) // Manejo de errores
      } finally {
        this.loading = false // Desactiva el indicador de carga
      }
    },

    // Crea un nuevo post y lo añade al inicio de la lista
    async createPost(payload) {
      const { token } = storeToRefs(useAuthStore()) // Obtiene el token del store de autenticación
      const { data } = await  apiClient.post('/post', payload, {
        headers: { Authorization: token.value }, // Incluye el token en la cabecera
      })
      this.posts.unshift(data) // Añade el nuevo post al inicio de la lista
      return data
    },

    // Actualiza un post existente en la lista
    async updatePost(id, payload) {
      const { token } = storeToRefs(useAuthStore()) // Obtiene el token del store de autenticación
      await  apiClient.put(`/post/${id}`, payload, {
        headers: { Authorization: token.value }, // Incluye el token en la cabecera
      })
      const i = this.posts.findIndex(p => p.id === id) // Encuentra el índice del post
      if (i !== -1) this.posts[i] = { ...this.posts[i], ...payload } // Actualiza el post
    },

    // Elimina un post de la lista
    async deletePost(id) {
      await API.delete(`/post/${id}`) // Llama a la API para eliminar el post
      this.posts = this.posts.filter(p => p.id !== id) // Filtra el post eliminado
    },

    // Obtiene los posts de un usuario específico
    async fetchPostsByUser({ username, token, limit = 10, offset = 0 }) {
      const { data } = await  apiClient.get(`/user/${username}/posts`, {
        params: { limit, offset }, // Parámetros de paginación
        headers: { Authorization: token }, // Incluye el token en la cabecera
      })
      this._append(data?.result || []) // Agrega los posts obtenidos
      this.totalPosts = data?.paginator?.total ?? this.totalPosts // Actualiza el total de posts
    },
  },
})
