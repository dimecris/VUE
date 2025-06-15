

<template>
  <div id="content">
    <!-- Cabecera principal -->
    <header class="main-header">
      <div class="logo">
        <img src="/src/assets/logo.png" alt="Logo" />
      </div>
      <Creditos :alumnado="alumnado" />
    </header>

    <main class="main">

      <div class="shows-container__filter">
        <!--  <FilterBar: Componente de barra de filtros
              -- Le pasa el valor actual de la prop isFormVisible al componente hijo.
              -- Le pasa la lista de etiquetas allTags al componente hijo
              -- El componente padre escucha el `emit` del evento `openForm` emitido desde el hijo para abrir el formulario.
              -- El componente padre escucha el `emit` del evento `clearFilter` emitido desde el hijo para limpiar los filtros.
              -- El componente padre escucha los `emit` de los eventos `searchChange`, `tagChange`, `orderChange`, `sortChange` y `ratingChange` 
                 emitidos por el hijo para actualizar el estado o realizar acciones correspondientes.
        -->
        <FilterBar
          :isFormVisible="isFormVisible" 
          :tags="allTags"
          @open-form="toggleFormVisibility"
          @clear-filter="clearFilters"
          @search-change="updateSearch"
          @tag-change="updateTag"
          @order-change="updateOrder"
          @sort-change="updateSort"
          @rating-change="updateRating"
        />
      </div>

      <!-- Contenedor principal -->
      <div class="shows-container">

        <div class="shows-container__board">
        <!--  <CardBoard : Componente que muestra la lista de series
              -- Le pasa el valor actual de la prop isFormVisible al componente hijo.
              -- Le pasa el nuevo array de series filtradas al componente hijo
              -- El componente padre escucha el `emit` del evento `deleteShow` emitido desde el hijo para eliminar una serie 
                 y ejecuta el método handleDeleteShow.
        -->
          <CardBoard
            :isFormVisible="isFormVisible" 
            :showList="filteredSeries"
            @delete-show="handleDeleteShow" 
          />
        </div>

        <div class="shows-container__form">
        <!--  <CardForm: Componente del formulario para añadir una nueva serie
              -- Le pasa el valor actual de la prop isFormVisible al componente hijo.
              -- El componente padre escucha el `emit` del evento `closeForm` emitido desde el hijo para ocultar el formulario 
                 y ejecuta el método toggleFormVisibility.
              -- Pasamos el mensaje de error como prop al componente hijo para mostrarlo en el formulario.
        -->
          <CardForm
            :isFormVisible="isFormVisible" 
            @add-show="handleAddShow" 
            @close-form="toggleFormVisibility"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Contenedor */
#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin: auto;
}
/* Encabezado */
.main-header {
  height: 75px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  background-color: #f6f6f6;
  border-bottom: 2px solid #ddd;
}
.logo img {
  height: 100%;
  width: 70px;
  object-fit: contain;
}
/* Contenido principal */
.main {
  padding: 20px;
}
.shows-container {
  display: flex;
  gap: 20px;
}
.shows-container__board {
  flex: 70%;
}
.shows-container__form {
  position: relative;
}
</style>