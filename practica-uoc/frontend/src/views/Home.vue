
/**
 * Home.vue
 * 
 * Este archivo define la vista principal del feed de la aplicación, donde se muestran los posts.
 * 
 * Funcionalidades principales:
 * - Mostrar una lista de posts utilizando el componente PostCard.
 * - Implementar paginación para cargar más posts.
 * - Navegar a los detalles de un post al hacer clic en él.
 * - Mostrar un indicador de carga mientras se obtienen los posts.
 * 
 * Uso:
 * Esta vista se utiliza como la página principal de la aplicación y está conectada al store de posts para gestionar el estado global.
 */
<template>
  <div class="feed">
    <h1>Feed</h1>
    <!-- Mostrar indicador de carga mientras se obtienen los posts -->
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else>
      <!-- Renderizar cada post utilizando el componente PostCard -->
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="goToDetail(post)"
      />
      <!-- Botón para cargar más posts si hay más disponibles -->
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
// Importaciones necesarias
import { ref, onMounted, computed, nextTick } from 'vue'; // Funciones reactivas y del ciclo de vida
import { usePostsStore } from '../store/posts'; // Store de posts
import { useRouter } from 'vue-router'; // Router para la navegación
import PostCard from '../components/PostCard.vue'; // Componente para mostrar cada post

// Inicializar el router y el store
const router = useRouter();
const postsStore = usePostsStore();

// Computed para obtener los posts y verificar si hay más posts disponibles
const posts = computed(() => postsStore.posts);
const hasMorePosts = computed(() => posts.value.length < postsStore.totalPosts);

// Estado reactivo para manejar la carga y el último elemento visible
const loading = ref(true);
const lastPostEl = ref(null);

// Función para navegar a los detalles de un post
const goToDetail = (post) => {
  if (!post.postId) {
    router.push(`/post/${post.id}`); // Redirigir a la página de detalles del post
  }
};

// Función para establecer una referencia al último post visible
const setLastPostRef = (el) => {
  if (el) lastPostEl.value = el;
};

// Función para obtener los posts iniciales
const fetchInitialPosts = async () => {
  postsStore.offset = 0; // Reiniciar el offset
  postsStore.posts = []; // Limpiar los posts actuales
  await postsStore.fetchPosts(); // Obtener los posts desde el store
  loading.value = false; // Desactivar el indicador de carga
};

// Función para cargar más posts
const loadMorePosts = async () => {
  const previousLastPost = lastPostEl.value; // Guardar referencia al último post visible
  await postsStore.fetchPosts(); // Obtener más posts desde el store
  await nextTick(); // Esperar a que el DOM se actualice
  if (previousLastPost) {
    previousLastPost.scrollIntoView({ behavior: 'smooth' }); // Desplazar al último post visible
  }
};

// Obtener los posts iniciales al montar el componente
onMounted(fetchInitialPosts);
</script>

<style scoped>
.feed {
  padding: 20px 20px 75px 20px; /* Espaciado del contenedor principal */
}
.loading {
  text-align: center; /* Centrar el texto */
  font-size: 18px; /* Tamaño de fuente */
}
.btn.load-more {
  display: block; /* Botón centrado */
  margin: 1rem auto; /* Espaciado */
}
</style>

