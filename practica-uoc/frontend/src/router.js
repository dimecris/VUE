/**
 * Archivo: router.js
 * Descripción: Configuración del sistema de enrutamiento para la aplicación Vue utilizando vue-router.
 * 
 * Este archivo define las rutas de la aplicación, asocia cada ruta con un componente específico y 
 * gestiona la navegación entre las vistas. También incluye una función para proteger rutas 
 * que requieren autenticación.
 * 
 * Funcionalidades principales:
 * - Definición de rutas con sus respectivos componentes.
 * - Configuración del historial de navegación utilizando la API de historial del navegador.
 * - Funcion para verificar la autenticación antes de permitir el acceso a ciertas rutas.
 * - Función para comprobar si el usuario está autenticado mediante el almacenamiento local (localStorage).
 * 
 * Rutas definidas:
 * - `/`: Página principal (Home).
 * - `/login`: Página de inicio de sesión.
 * - `/post/form/:id?`: Página para crear o editar un post (requiere autenticación).
 * - `/post/:id`: Página de detalles de un post (requiere autenticación).
 * - `/profile/:username`: Página de perfil de usuario (requiere autenticación).
 * 
 * Dependencias:
 * - vue-router: Biblioteca para manejar el enrutamiento en aplicaciones Vue.
 * 
 */
import { createRouter, createWebHistory } from 'vue-router' // Importación de las funciones necesarias para crear el router y manejar el historial de navegación
// Importación de las vistas que se utilizarán en las rutas
import Home from './views/Home.vue'
import Profile from './views/Profile.vue';
import Login from './views/Login.vue';
import PostForm from './views/PostForm.vue';
import PostDetail from './views/PostDetail.vue';

// Definición de las rutas de la aplicación
const routes = [
  {
    path: '/', // Ruta para la página principal
    name: 'Home', // Nombre de la ruta
    component: Home // Componente que se renderiza en esta ruta
  }, 
  {
    path: '/login', // Ruta para la página de inicio de sesión
    name: 'Login',
    component: Login
  },
  {
    path: '/post/form/:id?', // Ruta para crear o editar un post (el parámetro `id` es opcional)
    name: 'PostForm',
    component: PostForm,
    meta: { requiresAuth: true } // Requiere autenticación para acceder
  },
  {
    path: '/post/:id', // Ruta para ver los detalles de un post
    name: 'PostDetail',
    component: PostDetail,
    meta: { requiresAuth: true } // Requiere autenticación para acceder
  },
  {
    path: '/profile/:username', // Ruta para ver el perfil de un usuario
    name: 'UserProfile',
    component: Profile,
    meta: { requiresAuth: true } // Requiere autenticación para acceder
  }
]

// Creación del router con historial de navegación
const router = createRouter({
  history: createWebHistory(''), // Al pasarlo vacio se asume que la aplicación está en el directorio raíz del servidor
  routes // Lista de rutas definidas anteriormente
})

// función global para verificar la autenticación antes de cada navegación
router.beforeEach((to, from, next) => {
  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de login
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    next('/login');
  } else {
    next(); // Permite la navegación si no se requiere autenticación o si el usuario está autenticado
  }
});

// Función para verificar si el usuario está autenticado
function isUserLoggedIn() {
  // Comprueba si hay un usuario almacenado en el localStorage
  return !!localStorage.getItem('user');
}

// Exporta el router para que pueda ser utilizado en la aplicación
export default router