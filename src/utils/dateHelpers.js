/**
 * Calcula la edad exacta en años a partir de una fecha de nacimiento
 * @param {string} birthday - Fecha en formato YYYY-MM-DD
 * @returns {number} - Edad en años
 */
export const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Ajustar si aún no ha cumplido años este año
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Obtiene la fecha máxima permitida (para mayores de 16 años)
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const getMaxBirthday = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  return maxDate.toISOString().split("T")[0];
};

/**
 * Obtiene la fecha mínima permitida (para menores de 120 años)
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const getMinBirthday = () => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate(),
  );
  return minDate.toISOString().split("T")[0];
};

/**
 * Formatea una fecha para mostrarla en español
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
export const formatDateES = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
