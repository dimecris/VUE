<!--
Home.vue

Este archivo define la vista principal del feed de la aplicación.

Propósito:
- Mostrar las publicaciones más recientes de los usuarios y permitir la interacción con ellas.

Funcionalidades principales:
- Mostrar una lista de posts utilizando el componente `PostCard`.
- Permitir la navegación al detalle de un post al hacer clic en él.
- **Cargar más posts al hacer clic en el botón "Cargar más" utilizando paginación.**
- **Manejar el estado de carga y la paginación de los posts para optimizar el rendimiento.**
- Realizar un scroll suave al último post cargado para mejorar la experiencia del usuario.

Componentes utilizados:
- **PostCard:** Componente reutilizable para mostrar la información de un post individual.

Estado Reactivo:
- **posts:** Lista de posts obtenidos del store.
- **hasMorePosts:** Indica si hay más posts disponibles para cargar.
- **loading:** Indica si los posts están siendo cargados.
- **lastPostEl:** Referencia al último elemento del feed para realizar un scroll suave.

Métodos:
- **goToDetail:** Navega a la vista de detalle de un post.
- **fetchInitialPosts:** Reinicia el estado del feed y carga los posts iniciales al montar el componente.
- **loadMorePosts:** Carga más posts desde el store y realiza un scroll suave al último post cargado.
-->
<template>
  <div class="feed">
    <h1>Feed</h1>

    <div v-if="loading" class="loading">Cargando...</div>

    <div v-else>
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="goToDetail(post)"
      />
      <button
        v-if="hasMorePosts"
        @click="loadMorePosts"
        class="btn load-more"
      >
        Cargar más
      </button>
    </div>
  </div>
</template>

<script setup>
// Importa las dependencias necesarias
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../store/posts'
import PostCard from '../components/PostCard.vue'

// Configuración del router y el store
const router = useRouter()
const postsStore = usePostsStore()

// Estado reactivo
const posts = computed(() => postsStore.posts) // Lista de posts
const hasMorePosts = computed(() => posts.value.length < postsStore.totalPosts) // Verifica si hay más posts
const loading = ref(true) // Indica si los posts están siendo cargados
const lastPostEl = ref(null) // Referencia al último post para el scroll

// Navega a la vista de detalle de un post
const goToDetail = (post) => {
  router.push(`/post/${post.id}`)
}

// Carga los posts iniciales al montar el componente
const fetchInitialPosts = async () => {
  postsStore.offset = 0 // Reinicia el offset
  postsStore.posts = [] // Limpia los posts actuales
  await postsStore.fetchPosts() // Obtiene los posts desde el store
  loading.value = false // Desactiva el indicador de carga
}

// Carga más posts y realiza un scroll suave al último post cargado
const loadMorePosts = async () => {
  const last = lastPostEl.value // Guarda la referencia al último post
  await postsStore.fetchPosts() // Obtiene más posts desde el store
  await nextTick() // Espera a que el DOM se actualice
  if (last) last.scrollIntoView({ behavior: 'smooth' }) // Realiza el scroll
}

// Ejecuta la carga inicial de posts al montar el componente
onMounted(fetchInitialPosts)
</script>

<style scoped>
.feed {
  padding: 20px 20px 75px;
}
.loading {
  text-align: center;
  font-size: 18px;
}
.btn.load-more {
  display: block;
  margin: 1rem auto;
}
</style>


