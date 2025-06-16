/**
 * Función formatDate
 * -------------------
 * Formatea una fecha en un formato legible para el usuario.
 *
 *  - La fecha que se desea formatear. Puede ser un objeto Date o una cadena de texto.
 *  - La fecha formateada en el formato 'dd/mm/yyyy hh:mm'.
 *
 * Detalles:
 * - Utiliza la configuración regional 'es-ES' para formatear la fecha en español.
 * - Elimina la coma que separa la fecha y la hora en el formato por defecto.
 */

export function formatDate(date) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
  return new Date(date).toLocaleString('es-ES', options).replace(',', '')
}
