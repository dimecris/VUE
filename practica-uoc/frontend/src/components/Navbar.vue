<!--
  Componente Navbar
  -----------------
  Este componente representa la barra de navegación inferior de la aplicación.

  Funcionalidades principales:
  - Navegación entre las vistas principales de la aplicación: Inicio, Login y Perfil.
  - Muestra diferentes opciones según el estado de autenticación del usuario.
  - Resalta la vista activa con un estilo visual distintivo.

  Dependencias:
  - `useAuthStore` para gestionar el estado de autenticación.
  - `useRoute` y `useRouter` de Vue Router para manejar la navegación y la ruta actual.

  Estilos:
  - Incluye estilos para la barra de navegación, los botones y los íconos.
  - Resalta la vista activa con un color primario definido en las variables CSS.
-->


<template> 
  <nav class="menu">
    <button
      class="menu-link"
      :class="{  active: isHomePage() }"
      @click="navigateTo('/')"
    >
      <span class="footer-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Home-App-Logo-Fill--Streamline-Rounded-Fill-Material" height="32" width="32">
        <path fill="#000000" d="M4.5 20.9999c-0.416665 0 -0.770835 -0.14585 -1.0625 -0.4375 -0.291665 -0.29165 -0.4375 -0.64585 -0.4375 -1.0625v-1.9l4 -3.55v6.95H4.5Zm3.5 0v-4h8v4H8Zm9 0v-8.2l-4.275 -3.8 3.025 -2.675 4.75 4.225c0.16665 0.15 0.29165 0.32085 0.375 0.5125 0.08335 0.19165 0.125 0.39585 0.125 0.6125v7.825c0 0.41665 -0.14585 0.77085 -0.4375 1.0625 -0.29165 0.29165 -0.64585 0.4375 -1.0625 0.4375h-2.5Zm-14 -4.75v-4.575c0 -0.21665 0.041665 -0.425 0.125 -0.625 0.083335 -0.2 0.208335 -0.36665 0.375 -0.5l7.5 -6.65c0.13335 -0.13333 0.2875 -0.229165 0.4625 -0.2875 0.175 -0.05833 0.35415 -0.0875 0.5375 -0.0875 0.18335 0 0.3625 0.02917 0.5375 0.0875 0.175 0.058335 0.32915 0.15417 0.4625 0.2875l2 1.775 -12 10.575Z" stroke-width="0.5"></path>
        </svg>
      </span>
    </button>

    <button v-if="!isAuthenticated" 
        class="menu-link" 
        :class="{ active: currentRoute === 'Login', login: isLoginPage()  }" 
        @click="navigateTo('/login')"
    >
      <span class="footer-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Person-Fill--Streamline-Rounded-Fill-Material" height="32" width="32">
        <path fill="#000000" d="M12 11.9751c-1.1 0 -2 -0.35 -2.7 -1.05 -0.7 -0.7 -1.05 -1.6 -1.05 -2.7s0.35 -2 1.05 -2.7c0.7 -0.7 1.6 -1.05 2.7 -1.05s2 0.35 2.7 1.05c0.7 0.7 1.05 1.6 1.05 2.7s-0.35 2 -1.05 2.7c-0.7 0.7 -1.6 1.05 -2.7 1.05Zm-8 6.525v-0.85c0 -0.63335 0.158335 -1.175 0.475 -1.625 0.316665 -0.45 0.725 -0.79165 1.225 -1.025 1.11665 -0.5 2.1875 -0.875 3.2125 -1.125s2.05415 -0.375 3.0875 -0.375 2.05835 0.12915 3.075 0.3875c1.01665 0.25835 2.08335 0.62915 3.2 1.1125 0.51665 0.23335 0.93335 0.575 1.25 1.025 0.31665 0.45 0.475 0.99165 0.475 1.625v0.85c0 0.41665 -0.14585 0.77085 -0.4375 1.0625 -0.29165 0.29165 -0.64585 0.4375 -1.0625 0.4375H5.5c-0.41665 0 -0.770835 -0.14585 -1.0625 -0.4375 -0.291665 -0.29165 -0.4375 -0.64585 -0.4375 -1.0625Z" stroke-width="0.5"></path>
        </svg>
      </span>
    </button>

    <button v-if="isAuthenticated" 
        class="menu-link" 
        :class="{ active: currentRoute === 'UserProfile' }" 
        @click="navigateTo(`/profile/${user?.username}`)"
    >
      <img :src="user?.profileImg" alt="Avatar" class="profile-img" />
    </button>
  </nav>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      currentRoute: route.name || '',
      navigateTo,
      isHomePage: () => route.name === 'Home', // Verifica si la ruta actual es la página de inicio
      isLoginPage: () => route.name === 'Login' // Verifica si la ruta actual es la página de inicio de sesión
    };
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
    user() {
      const authStore = useAuthStore();
      return authStore.user;
    }
  }
};
</script>

<style scoped>

/* Button to create a new post inside Header */
.btn.new-post {
  position: absolute;
  right: 10px;
  top: 10px;
}
.menu {
  position: fixed; 
  width: 100%;
  bottom: 0;
  left: 0; 
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px -4px 9px 0px rgba(194, 194, 194, 0.25);
  z-index: 1;
}
.menu-link {
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--grey-color); /* Color por defecto */
}

.menu-link.active path,
.menu-link.login:not(.active) path {
  fill: var(--primary-color); /* Color cuando está activo */
}

.footer-icon {
  font-size: 24px;
  padding: 8px;
}
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 5px;
}
</style>

