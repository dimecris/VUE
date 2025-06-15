<template>
  <div v-if="post" class="post-detail">
    <PostCard
        :key="post.id"
        :post="post"
      />
    <div v-if="authStore.user?.id === post.user?.id" class="post-actions">
        <div class="reply-icon">
            <div @click="editarPost" class="edit-reply-icon">
                <svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg" id="Pen--Streamline-Unicons" height="15" width="15">
                    <path d="M47.5182 12.8036c0.002 -0.3096 -0.0576 -0.6164 -0.1744 -0.9028 -0.1172 -0.2866 -0.2896 -0.5472 -0.5076 -0.767L36.8646 1.162c-0.2198 -0.2178 -0.4806 -0.3904 -0.767 -0.5074 -0.2864 -0.117 -0.5934 -0.1764 -0.9028 -0.1746 -0.3096 -0.0018 -0.6166 0.0576 -0.903 0.1746s-0.5472 0.2894 -0.7668 0.5074l-6.6558 6.6558L1.1638 33.5232c-0.218 0.2198 -0.3904 0.4804 -0.5076 0.7668 -0.117 0.2866 -0.1762 0.5934 -0.1744 0.903v9.9718c0 0.6236 0.2476 1.222 0.6888 1.6628 0.441 0.4412 1.0392 0.689 1.663 0.689h9.9716c0.3292 0.0178 0.6584 -0.0338 0.9662 -0.151 0.308 -0.1176 0.5878 -0.2984 0.8212 -0.531l25.5644 -25.7056 6.6792 -6.538c0.2148 -0.228 0.3894 -0.4902 0.5174 -0.7762 0.0226 -0.1874 0.0226 -0.3768 0 -0.5644 0.011 -0.1094 0.011 -0.2198 0 -0.3292l0.1646 -0.1176ZM11.841 42.8128H5.1854v-6.6556L28.539 12.8036l6.6556 6.6556L11.841 42.8128ZM38.5108 16.1432l-6.6558 -6.6556 3.3396 -3.3162 6.6322 6.6322 -3.316 3.3396Z" fill="#fff" stroke-width="2"></path>
                </svg>
            </div>
            <div @click="eliminarPost" class="delete-reply-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" id="Trash-Alt--Streamline-Unicons" height="15" width="15">
                    <path d="M19.296 38.112c0.6238 0 1.2222 -0.2478 1.6632 -0.6888s0.6888 -1.0394 0.6888 -1.6632v-14.112c0 -0.6238 -0.2478 -1.222 -0.6888 -1.663s-1.0394 -0.689 -1.6632 -0.689c-0.6238 0 -1.222 0.248 -1.6632 0.689 -0.441 0.441 -0.6888 1.0392 -0.6888 1.663v14.112c0 0.6238 0.2478 1.2222 0.6888 1.6632 0.4412 0.441 1.0394 0.6888 1.6632 0.6888Zm23.52 -28.224h-9.408V7.536c0 -1.8714 -0.7434 -3.666 -2.0666 -4.9894C30.018 1.2234 28.2232 0.48 26.352 0.48h-4.704c-1.8712 0 -3.666 0.7434 -4.9894 2.0666 -1.3232 1.3234 -2.0666 3.118 -2.0666 4.9894v2.352H5.184c-0.6238 0 -1.222 0.2478 -1.6632 0.6888 -0.441 0.4412 -0.6888 1.0394 -0.6888 1.6632s0.2478 1.222 0.6888 1.6632c0.4412 0.441 1.0394 0.6888 1.6632 0.6888h2.352v25.872c0 1.8712 0.7434 3.666 2.0666 4.9894 1.3234 1.3232 3.118 2.0666 4.9894 2.0666h18.816c1.8712 0 3.666 -0.7434 4.9894 -2.0666 1.3232 -1.3234 2.0666 -3.1182 2.0666 -4.9894V14.592h2.352c0.6238 0 1.2222 -0.2478 1.6632 -0.6888 0.441 -0.4412 0.6888 -1.0394 0.6888 -1.6632s-0.2478 -1.222 -0.6888 -1.6632c-0.441 -0.441 -1.0394 -0.6888 -1.6632 -0.6888ZM19.296 7.536c0 -0.6238 0.248 -1.222 0.689 -1.6632 0.441 -0.441 1.0392 -0.6888 1.663 -0.6888h4.704c0.6238 0 1.2222 0.2478 1.6632 0.6888 0.441 0.4412 0.6888 1.0394 0.6888 1.6632v2.352H19.296V7.536Zm16.464 32.928c0 0.6238 -0.248 1.222 -0.6888 1.6632s-1.0394 0.6888 -1.6632 0.6888H14.592c-0.6238 0 -1.222 -0.2478 -1.6632 -0.6888 -0.441 -0.441 -0.6888 -1.0394 -0.6888 -1.6632V14.592h23.52v25.872Zm-7.056 -2.352c0.6238 0 1.2222 -0.2478 1.6632 -0.6888s0.6888 -1.0394 0.6888 -1.6632v-14.112c0 -0.6238 -0.2478 -1.222 -0.6888 -1.663s-1.0394 -0.689 -1.6632 -0.689c-0.6238 0 -1.222 0.248 -1.663 0.689s-0.689 1.0392 -0.689 1.663v14.112c0 0.6238 0.248 1.2222 0.689 1.6632s1.0392 0.6888 1.663 0.6888Z" fill="#ffffff" stroke-width="2"></path>
                </svg>
            </div>
        </div>  
    </div>
    <div class="respuesta-wrap"> 
        <PostCard
            v-for="reply in replies"
            :key="reply.id"
            :post="reply"
            :isReply="true"
            />
    </div>
     <!-- formulario para responder -->
    <ReplyForm :postId="post.id" @new-reply="addReply"/>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import ReplyForm from '../views/ReplyForm.vue';

import PostCard from '../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore() // 👉 MOVER AQUÍ

const postId = route.params.id
const post = ref(null)
const replies = ref([])

const addReply = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/post/${postId}`, {
      headers: { Authorization: authStore.token }
    });

    replies.value = data.replies || [];
  } catch (error) {
    console.error('Error actualizando respuestas:', error);
  }
}


const eliminarPost = async () => {
  if (confirm('¿Estás segura de que quieres eliminar este post?')) {
    try {
      await axios.delete(`http://localhost:3000/post/${postId}`, {
        headers: { Authorization: authStore.token }
      })
      router.push('/')
    } catch (error) {
      console.error('Error al eliminar el post:', error)
    }
  }
}

const editarPost = () => {
  router.push(`/post/form/${postId}`)
}



onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/post/${postId}`, {
      headers: { Authorization: authStore.token }
    })

    if (data.postId) {
      post.value = null
      return
    }

    post.value = data
    replies.value = data.replies || []
  } catch (error) {
    console.error('Error cargando detalle del post:', error)
  }
})
</script>




<style scoped>
.post-detail {
  padding: 20px;
}
.reply {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-left: 20px;
  border-left: 2px solid #ccc;
}
.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
.date {
  font-size: 12px;
  color: #666;
}
.post-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.reply-icon{
  display: flex;
  justify-content: flex-end; /* alinea a la derecha */
  align-items: center;        /* centra verticalmente */
  gap: 10px;   
}
.edit-reply-icon, .delete-reply-icon {
    display: inline-block;
    background-color: var(--primary-color);
    border-radius: 50%;
    height: 30px;
    width: 30px;
    cursor: pointer;
     display: flex;
    justify-content: center;
    align-items: center;
}
.respuesta-wrap {
  margin-left: 40px;
}
</style>
