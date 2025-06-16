/**
 * PostForm.vue
 * 
 * Este archivo define la vista para crear o editar un post en la aplicación.
 * 
 * Funcionalidades principales:
 * - Permitir a los usuarios crear un nuevo post.
 * - Permitir a los usuarios editar un post existente.
 * - Manejar la carga de datos del post para edición desde la API.
 * - Redirigir al detalle del post después de crear o editar.
 * 
 * Componentes utilizados:
 * - Ninguno externo, utiliza elementos HTML nativos.
 * 
 * Estado Reactivo:
 * - isEditing: Indica si el formulario está en modo de edición.
 * - form: Almacena el contenido del post.
 * 
 * Métodos:
 * - handleSubmit: Maneja el envío del formulario, crea o actualiza el post y redirige al detalle del post.
 */
<template>
  <div class="form-post">
    <img :src="authStore.user.profileImg" alt="Avatar" class="form-post__image" />
    <form class="form-post__form" @submit.prevent="handleSubmit">
      <textarea
        v-model="form.content"
        :placeholder="isEditing ? 'Edita tu post...' : 'Escribe algo...'"
        required
      ></textarea>
      <button type="submit" class="btn btn--share">
        {{ isEditing ? 'Guardar cambios' : 'Publicar' }}
      </button>
    </form>
  </div>
</template>
<script setup>
// Importa las dependencias necesarias
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { usePostsStore } from '../store/posts'
import axios from 'axios'

// Obtiene el ID del post desde los parámetros de la ruta
const { id: postId } = useRoute().params

// Configuración del router y los stores
const router = useRouter()
const authStore = useAuthStore()
const postsStore = usePostsStore()

// Estado reactivo
const isEditing = ref(false) // Indica si el formulario está en modo de edición
const form = ref({ content: '' }) // Almacena el contenido del post

// Carga los datos del post para edición al montar el componente
onMounted(async () => {
  if (postId) {
    isEditing.value = true // Activa el modo de edición
    try {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`, {
        headers: { Authorization: authStore.token }
      })
      form.value.content = data.content // Carga el contenido del post
    } catch (error) {
      console.error('Error al cargar el post para editar:', error)
    }
  }
})

// Maneja el envío del formulario
async function handleSubmit() {
  try {
    let idToRedirect

    if (isEditing.value) {
      await postsStore.updatePost(postId, form.value) // Actualiza el post existente
      idToRedirect = postId
    } else {
      const newPost = await postsStore.createPost(form.value) // Crea un nuevo post
      idToRedirect = newPost.id
    }

    router.push(`/post/${idToRedirect}`) // Redirige al detalle del post
  } catch (error) {
    console.error('Error al enviar el formulario:', error) // Manejo de errores
  }
}

</script>



<style scoped>
.form-post {
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  min-height: 100vh;
}
.form-post__image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
.form-post__form {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-post__form textarea {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
  min-height: 100px;
  margin-bottom: 10px;
}
.btn--share {
  align-self: flex-end;
}
</style>

