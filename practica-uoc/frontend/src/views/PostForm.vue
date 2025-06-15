<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { usePostsStore } from '../store/posts'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const postsStore = usePostsStore()

const isEditing = ref(false)
const form = ref({ content: '' })

const postId = route.params.id // null si estamos creando

onMounted(async () => {
  if (postId) {
    isEditing.value = true
    try {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`, {
        headers: { Authorization: authStore.token }
      })
      form.value.content = data.content
    } catch (error) {
      console.error('Error al cargar el post para editar:', error)
    }
  }
})

async function handleSubmit() {
  try {
    let idToRedirect


    if (isEditing.value) {
      await postsStore.updatePost(postId, form.value)
      idToRedirect = postId
    } else {
      const newPost = await postsStore.createPost(form.value)
      idToRedirect = newPost.id
    }

    router.push(`/post/${idToRedirect}`)
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
  }
}
</script>

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
