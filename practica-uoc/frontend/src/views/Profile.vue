<template>
  <div class="profile">
    <div v-if="!token" class="error-message">
      <p>Token no disponible. Por favor, inicia sesión.</p>
    </div>

    <div v-else>
      <div class="user-info" v-if="profileUser">
        <button v-if="profileUser.username === authUser?.username" @click="logout">
          Cerrar sesión
        </button>
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
        <li v-for="post in posts" :key="post.id" class="post">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import { useAuthStore } from '../store/auth'
import { usePostsStore } from '../store/posts'
import PostCard from '../components/PostCard.vue'
import { formatDate } from '../utils/date'

const route = useRoute()
const router = useRouter()

const usernameParam = computed(() => route.params.username)
const authStore = useAuthStore()
const postsStore = usePostsStore()

const authUser = computed(() => authStore.user)
const token = computed(() => authStore.token)
const posts = computed(() => postsStore.posts)
const hasMorePosts = computed(() => posts.value.length < postsStore.totalPosts)

const profileUser = ref(null)

function logout() {
  authStore.logout()
  router.push('/login')
}

async function loadMorePosts() {
  if (token.value && usernameParam.value) {
    await postsStore.fetchPostsByUser({
      username: usernameParam.value,
      token: token.value
    })
  }
}

onMounted(async () => {
  if (!token.value || !usernameParam.value) {
    console.warn('Faltan token o username en la ruta')
    return
  }

  // Obtener los datos del perfil del usuario (no necesariamente el logueado)
  try {
    const response = await axios.get(`http://localhost:3000/user/${usernameParam.value}`, {
      headers: { Authorization: token.value }
    })
    profileUser.value = response.data
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error)
  }

  // Cargar sus posts
  postsStore.offset = 0
  postsStore.posts = []
  await postsStore.fetchPostsByUser({
    username: usernameParam.value,
    token: token.value
  })
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
