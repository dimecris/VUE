<template>
  <div class="reply-form">
    <textarea v-model="content" placeholder="Escribe tu respuesta..." required></textarea>
    <button @click="submitReply">Responder</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useAuthStore } from '../store/auth'

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
});
const content = ref('');
const authStore = useAuthStore();
const emit = defineEmits(['new-reply'])

const submitReply = async () => {
  try {
    const token = authStore.token;
    console.log('Token:', token);
    const response = await axios.post(`http://localhost:3000/post/${props.postId}/reply`, {
      content: content.value
    }, {
      headers: {
        Authorization: token
      }
    });

    console.log('Respuesta enviada correctamente:', response.data);
    content.value = ''; // limpia el textarea
    emit('new-reply', {
      content: content.value,
      user: authStore.user, // añadimos manualmente el usuario autenticado
      publishDate: new Date().toISOString() // usamos la fecha actual
    });

  } catch (error) {
    console.error('Error al enviar respuesta:', error);
  }
}
</script>

<style scoped>
.reply-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
.reply-form textarea {
  resize: none;
  padding: 8px;
  margin-bottom: 8px;
}
.reply-form button {
  align-self: flex-end;
}
</style>
