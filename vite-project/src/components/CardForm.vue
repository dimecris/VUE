<template>
  <!-- Transición para mostrar/ocultar el formulario con un efecto de fade -->
  <transition name="fade">
    <!-- Contenedor del formulario, visible solo si isFormVisible es true -->
    <div v-if="isFormVisible" class="section-add">
      <button
        class="section-add__close"
        @click="enviarCloseForm">
      </button>

      <div class="card-form">
        <h2>Añadir Nueva Serie</h2>
        <form @submit.prevent="submitForm">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <div class="form-group">
            <label>Título*:</label>
            <input v-model="newShow.title" type="text" />
          </div>

          <div class="form-group">
            <label>Descripción*:</label>
            <textarea v-model="newShow.description"></textarea>
          </div>

          <div class="form-group">
            <label>Imagen URL*:</label>
            <input v-model="newShow.image" type="url" />
          </div>

          <div class="form-group">
            <label>Valoración*:</label>
            <input v-model="newShow.rating" type="number" min="0" max="5" step="0.5" />
          </div>

          <div class="form-group">
            <label>Etiquetas (separadas por comas)*:</label>
            <div class="input-tags">
              <input v-model="newShow.tags" type="text" placeholder="Ejemplo: Drama, Acción, Aventura" />
            </div>
          </div>

          <div class="form-group">
            <label>Fecha de estreno (año)*:</label>
            <input v-model="newShow.releaseDate" type="date" /> <!-- Cambiado a type="date" -->
          </div>

          <div class="form-group">
            <label>Notas:</label>
            <textarea v-model="newShow.notes"></textarea>
          </div>

          <div class="form-group">
            <label>Color*:</label>
            <input v-model="newShow.color" type="color" />
          </div>

          <button class="btn btn--cta" type="submit">Añadir Serie</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.section-add {
  width: calc(100% - 40px);
  min-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #393a41;
  color: white;
  position: relative;
  text-align: left;
}

/* Estilos del botón para cerrar el formulario */
.section-add__close {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: url('src/assets/arrow-right.svg') 7px center no-repeat;
  background-size: 13px;
  background-color: #fff;
  transition: background-color 0.3s ease;
  z-index: 999;
}

/* Estilos del mensaje de error */
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

/* Estilos generales del formulario */
form {
  display: grid;
  gap: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input[type="color"] {
  padding: 0;
  height: 40px;
}

.form-group textarea {
  resize: vertical;
}

/* Estilos del botón de envío */
.btn[type="submit"] {
  width: 100%;
}

/* Estilos para la transición de fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>