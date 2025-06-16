<script setup>
import Header from './components/Header.vue';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <div class="container"> 
   <Header />
    <router-view /> <!-- Aquí se renderizarán las vistas según la ruta actual -->
     <Navbar />
  </div>
</template>

<style scoped>
/* Estilos globales */
body {
  color: var(--primary-color);
}
.container{
  background-color: var(--white-color);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow-y: scroll;
  margin: 60px 0;
}
</style>
