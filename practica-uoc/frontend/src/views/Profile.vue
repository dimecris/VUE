
/**
 * Profile.vue
 * 
 * Este archivo define la vista de perfil de usuario en la aplicación.
 * 
 * Funcionalidades principales:
 * - Mostrar la información del perfil del usuario.
 * - Listar los posts del usuario utilizando el componente `PostCard`.
 * - Permitir la navegación al detalle de un post al hacer clic en él.
 * - Cargar más posts del usuario con paginación.
 * - Manejar el cierre de sesión del usuario.
 * 
 * Componentes utilizados:
 * - PostCard: Componente para mostrar la información de un post.
 * 
 * Estado Reactivo:
 * - token: Token de autenticación del usuario.
 * - posts: Lista de posts del usuario obtenidos del store.
 * - hasMorePosts: Indica si hay más posts disponibles para cargar.
 * - profileUser: Información del usuario del perfil.
 * 
 * Métodos:
 * - logout: Cierra la sesión del usuario y redirige a la vista de login.
 * - goToDetail: Navega a la vista de detalle de un post.
 * - loadMorePosts: Carga más posts del usuario con paginación.
 */

<template>
  <div class="profile">
    <div v-if="!token" class="error-message">
      <p>Token no disponible. Por favor, inicia sesión.</p>
    </div>

    <div v-else>
      <div class="user-info" v-if="profileUser">
        <button class="btn" @click="logout">Cerrar sesión</button>
        <img :src="profileUser.profileImg" alt="Avatar" class="user-info__avatar" />
        <h2>{{ profileUser.name }}</h2>
        <p>@{{ profileUser.username }}</p>
        <p>{{ profileUser.bio }}</p>
        <p v-if="profileUser.registrationDate">
          Miembro desde {{ formatDate(profileUser.registrationDate) }}
        </p>
        <p v-else>Fecha de registro no disponible</p>
      </div>

      <ul class="posts-list">
        <li
          v-for="post in posts"
          :key="post.id"
          class="post"
          @click="goToDetail(post)"
        >
          <PostCard :post="post" :hideUserInfo="true" />
        </li>
      </ul>

      <button
        v-if="hasMorePosts"
        class="btn load-more"
        @click="loadMorePosts"
      >
        Cargar más
      </button>
    </div>
  </div>
</template>

<script setup>
// Importa las dependencias necesarias
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import { useAuthStore } from '../store/auth'
import { usePostsStore } from '../store/posts'
import PostCard from '../components/PostCard.vue'
import { formatDate } from '../utils/date'

// Configuración del router y los stores
const route = useRoute()
const router = useRouter()
const { username } = route.params
const authStore = useAuthStore()
const postsStore = usePostsStore()

// Estado reactivo
const token = computed(() => authStore.token) // Token de autenticación
const posts = computed(() => postsStore.posts) // Lista de posts del usuario
const hasMorePosts = computed(() => posts.value.length < postsStore.totalPosts) // Verifica si hay más posts
const profileUser = ref(null) // Información del usuario del perfil

// Cierra la sesión del usuario y redirige a la vista de login
function logout() {
  authStore.logout()
  router.push('/login')
}

// Navega a la vista de detalle de un post
function goToDetail(post) {
  if (!post.postId) {
    router.push(`/post/${post.id}`)
  }
}

// Carga más posts del usuario con paginación
async function loadMorePosts() {
  if (token.value && username) {
    await postsStore.fetchPostsByUser({ username, token: token.value })
  }
}

// Carga los datos del perfil y los posts del usuario al montar el componente
onMounted(async () => {
  if (!token.value || !username) {
    console.warn('Faltan token o username en la ruta')
    return
  }

  try {
    // Obtener datos del perfil
    const { data } = await axios.get(`http://localhost:3000/user/${username}`, {
      headers: { Authorization: token.value }
    })
    profileUser.value = data // Almacena la información del usuario

    // Cargar posts del usuario
    postsStore.offset = 0 // Reinicia el offset
    postsStore.posts = [] // Limpia los posts actuales
    await postsStore.fetchPostsByUser({ username, token: token.value })

  } catch (error) {
    console.error('Error en carga de perfil o posts:', error) // Manejo de errores
  }
})
</script>

<style scoped>
.profile {
  padding: 20px;
}
.user-info {
  display: grid;
  place-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.user-info__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}
.btn.load-more {
  margin: 10px auto;
  min-width: 200px;
}
.error-message {
  text-align: center;
  color: red;
}
</style>
