<template>
  <div :class="['board', isFormVisible ? 'form-is-visible' : 'form-no-visible']"> <!-- Usamos un div contenedor con la clase board  -->
    <!-- Iteramos sobre showList y renderizamos un ShowCard por cada serie -->
    <ShowCard
      v-for="show in showList"
      :key="show.id" 
      :show="show"
      @delete-show="enviarDeleteShow" 
    />
  </div>
</template>

<script>
import ShowCard from './ShowCard.vue'; // Importamos el componente secundario ShowCard

export default {
  name: 'CardBoard',
  emits: ["deleteShow"], // Declarar el evento en camelCase
  components: { 
    ShowCard,
  }, // Registramos en la propiedad component el componente secundario ShowCard. Así lo podemos usar detro del template
  // (en Option Api se usa para usar un componente secundario dentro de otro)
  // En Composition API se hace de otra manera setup()
  props: { // Definimos las propiedades que el componente acepta
    showList: { //Array de objetos. Cada objeto es una serie y es obligatoria
      type: Array,
      required: true,
    },
    isFormVisible: { // Propiedad para controlar la visibilidad del formulario
      type: Boolean,
      required: true,
    },
  },
  methods: {
    enviarDeleteShow(showId) {
      this.$emit('deleteShow', showId); // Emitir evento en camelCase
      console.log('Evento emitido deleteShow con id:', showId);
    },
  },
}
</script>
<style scoped>
.board {
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 0.5fr));
  grid-auto-rows: min-content;
  gap: 20px;
  transition: all 0.5s ease;
 }
 .board > * {
  transition: all 0.3s ease;
}
</style>