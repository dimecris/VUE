/**
 * posts.js
 * 
 * Este archivo define un store de Pinia para gestionar el estado global relacionado con los posts en la aplicación.
 * 
 * Funcionalidades principales:
 * - Obtener posts desde la API con paginación.
 * - Crear, actualizar y eliminar posts.
 * - Obtener posts específicos de un usuario.
 * 
 * Uso:
 * Este store se utiliza para centralizar la lógica de gestión de posts, permitiendo que los componentes accedan y manipulen los datos de manera consistente.
 */

// Importaciones necesarias para definir el store y realizar solicitudes HTTP
import { defineStore } from 'pinia'; // Importación de Pinia para definir el store
import axios from 'axios'; // Biblioteca para realizar solicitudes HTTP
import { useAuthStore } from './auth'; // Importación del store de autenticación para manejar la autenticación de usuarios

// URL base para las solicitudes a la API
const baseUrl = 'http://localhost:3000'

// Definición del store de Pinia para gestionar los posts
export const usePostsStore = defineStore('posts', {
  // Estado inicial del store
  state: () => ({
    posts: [], // Lista de posts
    totalPosts: 0, // Número total de posts disponibles
    limit: 10, // Límite de posts por solicitud
    offset: 0, // Desplazamiento para la paginación
    loading: false // Indicador de carga
  }),
  actions: {
    // Acción para obtener posts desde la API con paginación
    async fetchPosts() {
        try {
            this.loading = true; // Activar indicador de carga
            const response = await axios.get(`${baseUrl}/posts`, { // Solicitud GET a la API para obtener posts
                params: { 
                    limit: this.limit, 
                    offset: this.offset } // Parámetros de paginación
            });

            if (response.data && Array.isArray(response.data.result)) { // Verificar que la respuesta tiene la estructura esperada
                this.posts.push(...response.data.result); // Agregar los nuevos posts al estado
                this.totalPosts = response.data.paginator?.total || this.totalPosts; // Actualizar el total de posts
                this.offset += this.limit; // Incrementar el desplazamiento
            } 
        } catch (error) {
            console.error('Error al obtener posts:', error);
        } finally {
            this.loading = false; // Desactivar indicador de carga
        }
    },
    // Acción para crear un nuevo post
    async createPost(postData) {
        try {
            const authStore = useAuthStore(); // Obtener el store de autenticación
            const token = authStore.token; // Obtener el token de autenticación

            const response = await axios.post(`${baseUrl}/post`, postData, {
            headers: {
                Authorization: token // Incluir el token en los headers
            }
            });

            this.posts.unshift(response.data); // Agregar el nuevo post al inicio de la lista
            return response.data;  // Devolver el post creado
        } catch (error) {
            console.error('Error al crear post:', error);
            throw error;
        }
    },
    // Acción para actualizar un post existente
    async updatePost(postId, postData) {
        try {
            const authStore = useAuthStore(); // Obtener el store de autenticación
            const token = authStore.token; // Obtener el token de autenticación

            await axios.put(`${baseUrl}/post/${postId}`, postData, {
            headers: {
                Authorization: token // Incluir el token en los headers
            }
            });

            const index = this.posts.findIndex(post => post.id === postId); // Buscar el índice del post
            if (index !== -1) {
                this.posts[index] = { ...this.posts[index], ...postData }; // Actualizar el post en el estado
            }
        } catch (error) {
            console.error('Error al actualizar post:', error);
            throw error;
        }
    },
    // Acción para eliminar un post
    async deletePost(postId) {
      try {
        await axios.delete(`${baseUrl}/post/${postId}`); // Solicitud para eliminar el post
        this.posts = this.posts.filter(post => post.id !== postId); // Eliminar el post del estado
      } catch (error) {
        console.error('Error al eliminar post:', error);
        throw error;
      }
    },
    // Acción para obtener posts de un usuario específico
    async fetchPostsByUser({ username, token, limit = 10, offset = 0 }) {
        try {
            const response = await axios.get(`${baseUrl}/user/${username}/posts`, {
            params: { limit, offset }, // Parámetros de paginación
            headers: {
                Authorization: `${token}`, // Incluir el token en los headers
            },
            });

            if (Array.isArray(response.data.result)) {
                this.posts.push(...response.data.result); // Agregar los nuevos posts al estado
                this.totalPosts = response.data.paginator?.total || this.totalPosts; // Actualizar el total de posts
                this.offset += limit; // Incrementar el desplazamiento
            }
        } catch (error) {
            console.error('Error al obtener posts del usuario:', error);
            throw error;
        }
    }
  }
});
