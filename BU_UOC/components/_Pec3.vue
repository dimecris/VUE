
<script>
import SecundaryComponent from './SecundaryComponent.vue';

export default {
  components: { SecundaryComponent },
  methods: {
    respuestaAlEvento() {
      console.log('¡El componente secundario emitió un evento!');
    }
  }
}
</script>

<template>
  <SecundaryComponent @my-event="respuestaAlEvento" />
</template>
