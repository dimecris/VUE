<script>
  export default { //Exporta el componente para que pueda ser importado y utilizado en otras partes de la aplicación.
    props: { // Define las propiedades que el componente acepta.
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      inStock: {
        type: Boolean,
        required: true
      }
    },
    data() { // Define el estado local del componente.
      // Aquí se inicializan las variables que se utilizarán en el componente.
      return {
        quantity: 0,
        shipping: [
          { id: 1, cost: 3.95, days: 3, country: 'Germany', freeShippingItems: 10 },
          { id: 2, cost: 0.50, days: 15, country: 'China', freeShippingItems: 5 }
        ],
        selectedShipping: []
      };
    },
    methods: { // Define los métodos que se pueden utilizar en el componente.
      increaseQuantity() {
        if (this.shipping.length > 0) {
          this.quantity++;
        }
      }
    }
  };
  </script>
<template>
<div class="container">
    <div class="product-card">
      <h2 class="color-featured">{{ title }}</h2>
      <p>Precio: {{ price }} €</p>
      <p v-if="inStock === true">En Stock</p> <!-- Muestra un mensaje si el producto está en stock, fuera o es desconocido.-->
      <p v-else-if="inStock === false" class="alert"><small>Sin Stock</small></p>
      
      <label for="quantity">Cantidad:</label>
      <input id="quantity" type="number" v-model="quantity" min="0" />
      
    
      <button class="addtocartButton" @click="increaseQuantity" :disabled="!inStock || shipping.length === 0">
        Añadir al carrito
      </button>
      
    </div>
    <div class="carrito">
        <label for="shipping"><b>Elige un tipo de envío:</b></label>
        <select id="shipping" v-model="selectedShipping"> 
            <option v-for="option in shipping" :key="option.id" :value="option">
            {{ option.country }} - {{ option.cost }} € ({{ option.days }} días)
            </option>
        </select>
        <p v-if="quantity > 0">Productos en el carrito: {{ quantity }}</p>
        <p v-else><small>Sin productos en el carrito</small></p>

      <p>Coste de envío:
      <span v-if="selectedShipping.id && quantity < selectedShipping.freeShippingItems">
         {{ selectedShipping.cost }} €
      </span>
      <p class="alert" v-if="selectedShipping.id && quantity < selectedShipping.freeShippingItems">
        ¡Si compras {{ selectedShipping.freeShippingItems - quantity }} productos más tendrás el envío gratis!
      </p>
      <span v-else-if="selectedShipping.id && quantity >= selectedShipping.freeShippingItems" class="color-featured">
         Envío gratis!
      </span>
    </p>
  
    </div>
</div>
</template>
  
  
  
  <style scoped>
  .container{
    display: flex ;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-start
  }
  .product-card {
    border: 1px solid #42b883;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
  }
  .product-card h2 {
    font-size: 25px;
  }
  .product-card .addtocartButton{
    padding: 20px;
    margin: 20px;
    border: 1px solid #42b883;
    background-color: #42b883;
    color: #f2f2f2;
    transition: all 0.2s ease; /* Transición suave del fondo */
  }
  .product-card .addtocartButton:hover {
    background-color: transparent;
    color: #222;
  }
  .product-card .addtocartButton:focus {
    outline: none; /* Elimina el borde azul al hacer clic */
  }
  #quantity,  #shipping {
    max-width: 80px; 
    padding: 5px; 
    margin: 5px 5px 5px 10px; 
    border: 1px solid #ddd; 
    background-color: #f6f6f6;
    color: #222 ;
    border-radius: 4px; 
    font-size: 16px; 
    text-align: center; 
    outline: none; /* Elimina el borde azul al hacer clic */
    transition: border-color 0.3s ease; /* Transición suave para el borde */
  }
  #quantity:focus, #shipping:focus {
    border-color: #42b883; /* Cambia el color del borde al enfocar */
    box-shadow: 0 0 5px rgba(66, 184, 131, 0.5); 
  }
  #shipping {
    width: 100%;
    max-width: 90%;
  }
  #shipping option {
    padding: 10px;
    font-size: 14px;
  }

  .carrito{
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    margin-top: 20px;
  }
  .alert{
    color: rgb(255, 132, 80);
  }
  .color-featured{
    color: #42b883;
  }

  </style>
