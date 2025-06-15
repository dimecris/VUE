<template>
  <div class="card" :style="{ borderTopColor: show.color }"> <!-- Estilo dinámico para el borde superior basado en el color del show -->
    <img class="cover" :src="show.image" :alt="show.title" /> <!-- Imagen de la serie con atributos reactivos -->
    <div class="delete-btn" @click="emitDeleteShow"> <!-- Botón para eliminar la serie -->
    </div>

    <div class="info">
      <h2 class="info__title">{{ show.title }}</h2> <!-- Título de la serie -->
      <p class="info__description">{{ show.description }}</p> <!-- Descripción de la serie -->
      <p class="info__year">Estreno: {{ show.releaseDate }}</p> <!-- Fecha de estreno -->
      <ul class="info__tags">
        <li v-for="(tag, index) in show.tags" :key="index">{{ tag }}</li> <!-- Lista de etiquetas -->
      </ul>
      <p class="info__notes" v-if="show.notes">Notas: {{ show.notes }}</p> <!-- Notas adicionales si existen -->
      <p class="info__rating">
        <span v-for="i in 5" :key="i" :class="i <= paintedStars ? 'full-star' : 'empty-star'">★</span> <!-- Estrellas basadas en el rating -->
      </p>
    </div>  
  </div>
</template>

<style scoped>
/* Contenedor principal de la tarjeta */
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  color: rgb(41, 38, 38);
  border-top: 10px outset;
  position: relative;
  box-shadow: 10px 10px 11px -6px rgba(0, 0, 0, 0.12);
  height: 270px;
  text-align: left;
}

/* Imagen de la serie */
.cover {
  flex: 25% 0 0;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* Botón para eliminar la serie */
.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 0px;
  padding-inline: 0px;
  border: none;
  background: url('src/assets/delete.svg') center center no-repeat;
  transition: background-color 0.3s ease;
}

/* Título de la serie */
.info__title {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
  overflow: hidden;
}

/* Descripción de la serie */
.info__description {
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 60px;
  overflow: hidden;
}

/* Año de estreno */
.info__year {
  font-size: 0.7rem;
  color: #5c5c5c;
}

/* Lista de etiquetas */
.info__tags {
  display: flex;
  gap: 5px;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  height: 50px;
}

/* Estilo de cada etiqueta */
.info__tags li {
  font-size: 0.6rem;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 2px 4px;
  border-radius: 10px;
  height: 15px;
  display: flex;
  align-items: center;
}

/* Notas adicionales */
.info__notes {
  font-size: 0.65rem;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 50px;
  color: rgb(92, 92, 92);
}

/* Estrellas */
.full-star {
  color: gold;
}
</style>