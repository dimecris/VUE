export function useShowValidator() {
    function validateShow(value) {
      if (typeof value.title !== 'string' || value.title.trim() === '') {
        return { isValid: false, errorMessage: 'El título es obligatorio.' };
      }
      if (typeof value.description !== 'string' || value.description.trim() === '') {
        return { isValid: false, errorMessage: 'La descripción es obligatoria.' };
      }
      if (typeof value.image !== 'string' || !value.image.startsWith('http')) {
        return { isValid: false, errorMessage: 'La imagen debe ser una URL válida.' };
      }
      if (typeof value.rating !== 'number' || value.rating < 0 || value.rating > 5) {
        return { isValid: false, errorMessage: 'La valoración debe estar entre 0 y 5.' };
      }
      if (!Array.isArray(value.tags) || value.tags.some(tag => typeof tag !== 'string')) {
        return { isValid: false, errorMessage: 'Las etiquetas deben ser un array de strings.' };
      }
      if (typeof value.releaseDate !== 'string' || !/^\d{4}$/.test(value.releaseDate)) {
        return { isValid: false, errorMessage: 'La fecha de estreno debe tener el formato YYYY.' };
      }
      if (!/^#[0-9A-Fa-f]{6}$/.test(value.color)) {
        return { isValid: false, errorMessage: 'El color debe ser un código hexadecimal válido.' };
      }
      return { isValid: true, errorMessage: '' };
    }
  
    return {
      validateShow
    };
  }
