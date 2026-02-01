import supabase from "../services/supabase";

// Nombre del bucket en Supabase Storage
const BUCKET_NAME = "profile-pictures"; // Cambia esto según tu bucket

/**
 * Sube una imagen a Supabase Storage
 * @param {File} file - Archivo de imagen a subir
 * @param {string} userId - ID único para el archivo (puede ser email o UUID)
 * @returns {Promise<{url: string, path: string, error: null} | {url: null, path: null, error: Error}>}
 */
export const uploadProfilePicture = async (file, userId) => {
  try {
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${timestamp}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false, // No sobrescribir si existe
      });

    if (error) {
      throw error;
    }

    // Obtener URL pública del archivo
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath,
      error: null,
    };
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return {
      url: null,
      path: null,
      error,
    };
  }
};

/**
 * Elimina una imagen de Supabase Storage
 * @param {string} filePath - Ruta del archivo en el bucket
 * @returns {Promise<{success: boolean, error: null} | {success: false, error: Error}>}
 */
export const deleteProfilePicture = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return { success: false, error };
  }
};

/**
 * Actualiza una imagen (elimina la anterior y sube la nueva)
 * @param {File} newFile - Nueva imagen
 * @param {string} oldFilePath - Ruta de la imagen anterior
 * @param {string} userId - ID del usuario
 * @returns {Promise<{url: string, path: string, error: null} | {url: null, path: null, error: Error}>}
 */
export const updateProfilePicture = async (newFile, oldFilePath, userId) => {
  try {
    // Eliminar imagen anterior si existe
    if (oldFilePath) {
      await deleteProfilePicture(oldFilePath);
    }

    // Subir nueva imagen
    return await uploadProfilePicture(newFile, userId);
  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    return { url: null, path: null, error };
  }
};
