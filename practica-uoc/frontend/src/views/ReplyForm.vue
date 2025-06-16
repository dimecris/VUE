/**
 * Componente ReplyForm
 * Este componente permite a los usuarios escribir y enviar respuestas a un post.
 *
 * Props:
 * - postId: Identificador del post al que se está respondiendo (String o Number, requerido).
 *
 * Eventos emitidos:
 * - new-reply: Se emite cuando se crea una nueva respuesta, enviando los datos de la respuesta.
 */
<template>
  <div class="reply-form">
    <textarea
      v-model="content"
      placeholder="Escribe tu respuesta..."
      required
    ></textarea>
    <button @click="submitReply" :disabled="!content.trim()">Responder</button>
  </div>
</template>

<script setup>
// Importamos las dependencias necesarias
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'

// Definimos las props que recibe el componente
const { postId } = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
})

// Definimos los eventos que puede emitir el componente
const emit = defineEmits(['new-reply'])

// Estado local para el contenido de la respuesta
const content = ref('')

// Accedemos al store de autenticación para obtener el token y el usuario actual
const authStore = useAuthStore()

/**
 * Función submitReply
 * Envía la respuesta al backend y emite el evento 'new-reply' con los datos de la respuesta.
 */
const submitReply = async () => {
  const token = authStore.token // Obtenemos el token de autenticación
  const replyText = content.value.trim() // Eliminamos espacios en blanco del contenido

  if (!replyText) return // Validamos que el contenido no esté vacío

  try {
    // Enviamos la respuesta al backend
    const { data } = await axios.post(
      `http://localhost:3000/post/${postId}/reply`,
      { content: replyText },
      { headers: { Authorization: token } }
    )

    // Emitimos el evento 'new-reply' con los datos de la respuesta
    emit('new-reply', {
      ...data, // Si el backend devuelve la respuesta completa, usamos esos datos
      content: replyText,
      user: authStore.user,
      publishDate: new Date().toISOString() // Fecha de publicación actual
    })

    // Limpiamos el contenido del formulario
    content.value = ''
  } catch (error) {
    console.error('Error al enviar respuesta:', error) // Manejo de errores
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
  min-height: 60px;
}

.reply-form button {
  align-self: flex-end;
  padding: 6px 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reply-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
