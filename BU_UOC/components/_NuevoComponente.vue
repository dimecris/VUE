<script setup>
defineProps({
  subtitulo: String,
  msg: String,
  objetoFruta: Object,
})
</script>

<template>
    <div>
      <h2>{{ subtitulo }}</h2>
      <p class="subrayado">{{ msg }}</p>
    </div>
</template>

<style scoped>
h2 {
  color: #42b883;
}
.subrayado{
    text-decoration: underline;
}
</style>
  