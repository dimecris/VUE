<template>
  <div class="filter-bar">

    <div class="filter-bar__first">
     
      <input
        v-model="localSearch"
        type="text"
        placeholder="Buscar series..."
        @input="emitSearch"
      />

      <button 
        @click="clearFilter" 
        class="btn">Limpiar
      </button>

      <button
        @click="emitOpenForm"
        class="btn btn--cta"
        v-if="!isFormVisible">
        Añadir nueva serie
      </button>

    </div>

    <div class="filter-bar__second">
      
      <div class="input-group">
        <label>Categoría</label>
        <select v-model="localTag" @change="emitTag">
          <option value="">Todas</option>
          <option v-for="tag in tags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label>Rating mínimo</label>
        <input
          v-model="localMinRating"
          @input="emitRating"
          type="range"
          min="0"
          max="5"
          step="0.5"
        />
      </div>

      <div class="input-group">
        <label>Ordenar por</label>
        <select v-model="localSortBy" @change="emitSort">
          <option value="title">Nombre</option>
          <option value="releaseDate">Fecha de estreno</option>
          <option value="rating">Valoración</option>
        </select>
      </div>

      <div class="input-group">
        <label>Orden</label>
        <select v-model="localOrder" @change="emitOrder">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

    </div>

  </div>
  
</template>


<style scoped>
/* Parent */
.filter-bar {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100px;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #393a41;
  border-radius: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  color: white;
  margin-bottom: 20px;
}

/* First column */
.filter-bar__first {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  height: 100%;
}

/* Second column */
.filter-bar__second {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
}

/* Input with label */
.input-group {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>