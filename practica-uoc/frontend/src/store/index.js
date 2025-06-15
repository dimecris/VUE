/**
 * index.js
 * 
 * Este archivo configura y exporta la instancia principal de Pinia, que es el sistema de gestión de estado global para la aplicación.
 * 
 * Funcionalidades principales:
 * - Crear una instancia de Pinia para gestionar el estado global.
 * - Exportar esta instancia para que pueda ser utilizada en toda la aplicación.
 * 
 * Uso:
 * Este archivo se importa en el archivo principal de la aplicación (por ejemplo, `main.js`) para registrar Pinia como un plugin de Vue.
 */

import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;
