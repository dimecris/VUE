<!--
    PostCard.vue

    Componente Vue que representa una tarjeta de publicación o respuesta en una red social o foro.

    Props:
        - post (Object, requerido): Objeto que contiene la información de la publicación, incluyendo usuario, contenido, fecha, número de likes y respuestas.
        - isReply (Boolean, opcional, default: false): Indica si la tarjeta representa una respuesta a otra publicación.
        - hideUserInfo (Boolean, opcional, default: false): Si es true, oculta la información del usuario en la cabecera.

    Funcionalidad:
        - Muestra la información del usuario (nombre, apellido, username, imagen de perfil) si hideUserInfo es false.
        - Muestra el contenido de la publicación si no es una respuesta (postId no presente).
        - Muestra la fecha de publicación formateada.
        - Muestra iconos y contadores de likes y respuestas.
        - Al hacer clic en el contenido de la publicación, emite un evento 'click' con el objeto post.
        - Al hacer clic en la imagen de perfil, navega al perfil del usuario correspondiente.

    Dependencias:
        - formatDate: Función utilitaria para formatear fechas.
        - useRouter: Composable de Vue Router para navegación programática.

    Estilos:
        - Define estilos para la tarjeta, encabezado, imagen de perfil, contenido, fecha y pie de publicación.
-->
<template>
  <!-- Componente que representa una tarjeta de publicación o respuesta -->
  <div :class="['post-card', { 'reply-card': isReply }]"> 
    <div class="post-card">
      <!-- Encabezado de la publicación, muestra información del usuario si no está oculto -->
      <div v-if="!hideUserInfo"  class="post-header" >
        <img
            :src="post.user.profileImg"
            alt="Profile Image"
            class="profile-img"
            @click.stop="goToUserProfile"
          />
        <div>
          <h2>{{ post.user.name }} {{ post.user.surname }}</h2>
          <p>@{{ post.user.username }}</p>
        </div>
      </div>

      <!-- Contenido de la publicación, solo se muestra si no es una respuesta -->
      <div v-if="!post.postId" class="post-content"  @click="handleClick">
        {{ post.content }}
      </div>

      <!-- Fecha de publicación -->
      <p class="post-date">{{ formatDate(post.publishDate) }}</p>

      <!-- Pie de la publicación con iconos de likes y comentarios -->
      <div class="post-footer">
            <span class="like-icon">
              <!-- Icono de "me gusta" con contador -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Heart--Streamline-Font-Awesome" height="20" width="20">
                  <path d="m2.426625 13.8064734375 8.30090625 7.749656249999999c 0.34453124999999996 0.32156250000000003 0.7993125 0.50071875 1.27246875 0.50071875s0.9279375 -0.17915625000000002 1.27246875 -0.50071875l8.30090625 -7.749656249999999c1.3965 -1.30003125 2.1866250000000003 -3.1237500000000002 2.1866250000000003 -5.03015625v-0.2664375c0 -3.2110312499999996 -2.31984375 -5.94890625 -5.4849375 -6.4771875 -2.0947500000000003 -0.349125 -4.22625 0.33534375 -5.7238125 1.8329062499999997L12 4.416848437500001l-0.55125 -0.55125c-1.4975625 -1.4975625 -3.6290625 -2.1820312499999996 -5.7238125 -1.8329062499999997C2.5598437499999998 2.5609734375 0.24 5.2988484375 0.24 8.5098796875v0.2664375c0 1.90640625 0.7901250000000001 3.7301249999999997 2.1866250000000003 5.03015625Z" fill="#000000" stroke-width="0.0469"></path>
              </svg> {{ post.nLikes }}</span>
            <span class="comment-icon">
              <!-- Icono de comentarios con contador -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.9998 18.9999V12.3399C24.0371 9.25737 22.9069 6.27481 20.8362 3.99109C18.7654 1.70737 15.9073 0.291558 12.8358 0.0279206C11.1215 -0.0920218 9.40137 0.15766 7.79188 0.760073C6.18238 1.36249 4.72105 2.30358 3.50675 3.51967C2.29246 4.73576 1.35354 6.19849 0.753514 7.80888C0.153488 9.41927 -0.093644 11.1398 0.0288396 12.8539C0.47084 19.2079 6.08184 23.9999 13.0828 23.9999H18.9998C20.3254 23.9983 21.5963 23.471 22.5336 22.5337C23.471 21.5964 23.9983 20.3255 23.9998 18.9999ZM12.6998 2.02392C15.2663 2.25096 17.6518 3.44083 19.3769 5.35448C21.1021 7.26812 22.0392 9.76374 21.9998 12.3399V18.9999C21.9998 19.7956 21.6838 20.5586 21.1212 21.1212C20.5586 21.6839 19.7955 21.9999 18.9998 21.9999H13.0828C7.04884 21.9999 2.39984 18.0999 2.02484 12.7159C1.92639 11.3445 2.11181 9.96752 2.56952 8.67099C3.02723 7.37446 3.74739 6.18625 4.68501 5.18059C5.62263 4.17493 6.75757 3.37343 8.01891 2.82617C9.28025 2.2789 10.6409 1.99763 12.0158 1.99992C12.2428 1.99992 12.4718 2.00892 12.6998 2.02392Z" fill="#374957"/>
              </svg> {{ post.nReplies }}</span>
      </div>
    </div> 

  </div>
</template>

<script setup>
// Importa la función para formatear fechas
import { formatDate } from '../utils/date.js'
// Importa el router para manejar la navegación
import { useRouter } from 'vue-router'

const router = useRouter()

// Define las propiedades que recibe el componente
const props = defineProps({
  post: { 
    type: Object, 
    required: true // La publicación es obligatoria
  },
  isReply: {
    type: Boolean,
    default: false // Indica si es una respuesta
  },
  hideUserInfo: {
    type: Boolean,
    default: false // Indica si se debe ocultar la información del usuario
  }
})

// Define los eventos que puede emitir el componente
const emit = defineEmits(['click'])

// Maneja el clic en el contenido de la publicación
function handleClick() {
  emit('click', props.post)
}

// Navega al perfil del usuario al hacer clic en su imagen
function goToUserProfile() {
  router.push(`/profile/${props.post.user.username}`)
}
</script>

<style scoped>
/* Estilo para la tarjeta de publicación */
.post-card {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  cursor: pointer;
}

/* Encabezado de la publicación */
.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Imagen de perfil del usuario */
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* Contenido de la publicación */
.post-content {
  margin: 10px 0;
}

/* Fecha de la publicación */
.post-date {
  font-size: 12px;
  color: gray;
}

/* Pie de la publicación */
.post-footer {
  display: flex;
  gap: 20px;
  font-size: 14px;
}
</style>
