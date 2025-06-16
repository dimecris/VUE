/**
 * Función formatDate
 * -------------------
 * Formatea una fecha en un formato legible para el usuario.
 *
 * @param {string|Date} date - La fecha que se desea formatear. Puede ser un objeto Date o una cadena de texto.
 * @param {string} format - El formato deseado ('default' o 'monthYear').
 * @returns {string} - La fecha formateada en el formato especificado.
 *
 * Detalles:
 * - Utiliza la configuración regional 'es-ES' para el formato por defecto.
 * - Elimina la coma que separa la fecha y la hora en el formato por defecto.
 * - Para el formato 'monthYear', utiliza la configuración regional 'es-ES'.
 */

export function formatDate(date, format = 'default') {
  const parsedDate = new Date(date);

  if (format === 'monthYear') {
    // Formato: 'January 2025'
    const options = { year: 'numeric', month: 'long' };
    return parsedDate.toLocaleDateString('es-ES', options);
  }

  // Formato por defecto: 'dd/mm/yyyy hh:mm'
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return parsedDate.toLocaleString('es-ES', options).replace(',', '');
}
