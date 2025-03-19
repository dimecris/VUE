<script setup>
import HelloWorld from './components/HelloWorld.vue';
import NuevoComponente from './components/NuevoComponente.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld  
    msg="Vite + Vue"
    autora="Kris Darias"
  />
  <NuevoComponente
    subtitulo="Nuevo Componente creado por Kris"
    msg="Este es un nuevo componente creado por Kris para la PEC1"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

