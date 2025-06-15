<template>
  <div class="login">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Usuario</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button class="btn" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  if (username.value && password.value) {
    try {
      const response = await authStore.login(username.value, password.value);
      console.log('Respuesta completa de la API:', response);

      // Validar la estructura de la respuesta antes de desestructurar
      if (response && response.token && response.user) {
        const { token, user } = response;
        authStore.setAuthToken(token);
        authStore.setUser({
          id: user.id,
          username: user.username,
          name: user.name,
          surname: user.surname,
          profileImg: user.profileImg
        });
        router.push(`/profile/${user.username}`);
      } else {
        console.error('Estructura inesperada en la respuesta de la API:', response);
        //alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      //alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  } else {
    alert('Por favor, completa todos los campos.');
  }
}
</script>

<style scoped>
.login {
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: start;
  height: 100vh;
  margin-top: 4rem;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.btn{
  margin: auto;
}

</style>
