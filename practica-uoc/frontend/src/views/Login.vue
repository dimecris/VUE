<!--
Login.vue

Este archivo define la vista de inicio de sesión de la aplicación.

Propósito:
- Permitir que los usuarios ingresen sus credenciales (usuario y contraseña) para acceder a la aplicación.

Funcionalidades principales:
- Validar que los campos estén completos antes de enviar el formulario.
- Autenticar al usuario utilizando el store de autenticación.
- Redirigir al perfil del usuario después de un inicio de sesión exitoso.
- Manejar errores de inicio de sesión y mostrar mensajes al usuario.

Componentes utilizados:
- Ninguno externo, utiliza elementos HTML nativos.

Estado Reactivo:
- username: Almacena el nombre de usuario ingresado.
- password: Almacena la contraseña ingresada.

Métodos:
- handleLogin: Maneja el envío del formulario, valida los campos, realiza la autenticación y redirige al perfil del usuario.
-->

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
// Importa las dependencias necesarias
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

// Estado reactivo para los campos del formulario
const username = ref('') // Almacena el nombre de usuario ingresado
const password = ref('') // Almacena la contraseña ingresada

// Configuración del router y el store de autenticación
const router = useRouter()
const authStore = useAuthStore()


const handleLogin = async () => {
  if (!username.value || !password.value) { // Verifica que los campos no estén vacíos
    alert('Por favor, completa todos los campos.')
    return
  }

  try {
    const response = await authStore.login(username.value, password.value) // Llama al método de inicio de sesión del store

    if (response?.token && response?.user) { // Verifica que la respuesta contenga un token y un usuario
      const { token, user } = response

      authStore.setAuthToken(token) // Almacena el token en el store
      authStore.setUser({ // Almacena la información del usuario en el store
        id: user.id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        profileImg: user.profileImg
      })

      router.push(`/profile/${user.username}`) // Redirige al perfil del usuario
    } else {
      alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.')
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error) // Manejo de errores
    alert('Error al iniciar sesión. Por favor, intenta nuevamente.')
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
.btn {
  margin: auto;
}
</style>

