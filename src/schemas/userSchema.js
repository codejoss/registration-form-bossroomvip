import { z } from "zod";

/**
 * Límites máximos de caracteres por campo (para contador en el formulario).
 * Debe coincidir con los .max() definidos en registrationSchema.
 */
export const FIELD_LENGTHS = {
  member_name: { min: 1, max: 70 },
  father_last_name: { min: 1, max: 50 },
  nickname: { min: 3, max: 30 },
  whatsapp: { min: 13, max: 15 },
  address_city: { min: 2, max: 50 },
  address_state: { min: 2, max: 50 },
  address_country: { min: 2, max: 50 },
  career: { min: 3, max: 100 },
  dream: { min: 10, max: 500 },
  motivation: { min: 10, max: 1000 },
  member_message: { min: 10, max: 1000 },
};

// Expresiones regulares para validaciones
const URL_REGEX =
  /^(https?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const INSTAGRAM_REGEX = /^[a-zA-Z0-9._]+\/?$/;
const TIKTOK_REGEX = /^[a-zA-Z0-9._]+$/;
const YOUTUBE_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9._\u00B7-]*[a-zA-Z0-9])?$/;
const WHATSAPP_REGEX = /^\+?[1-9]\d{1,14}$/; // Formato internacional E.164

export const registrationSchema = z.object({
  // Nombre
  member_name: z
    .string()
    .min(FIELD_LENGTHS.member_name.min, `El nombre debe tener al menos ${FIELD_LENGTHS.member_name.min} caracteres`)
    .max(
      FIELD_LENGTHS.member_name.max,
      `El nombre no puede exceder ${FIELD_LENGTHS.member_name.max} caracteres`,
    )
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios",
    )
    .transform((val) => val.trim()),

  // Apellido Paterno
  father_last_name: z
    .string()
    .min(
      FIELD_LENGTHS.father_last_name.min,
      `El apellido debe tener al menos ${FIELD_LENGTHS.father_last_name.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.father_last_name.max,
      `El apellido no puede exceder ${FIELD_LENGTHS.father_last_name.max} caracteres`,
    )
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios",
    )
    .optional()
    .transform((val) => val.trim()),

  // Apellido Materno
  mother_last_name: z
    .string()
    .optional()
    .transform((val) => val.trim()),

  // Nickname
  nickname: z
    .string()
    .min(
      FIELD_LENGTHS.nickname.min,
      `El nombre debe tener al menos ${FIELD_LENGTHS.nickname.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.nickname.max,
      `El nombre no puede exceder ${FIELD_LENGTHS.nickname.max} caracteres`,
    )
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios",
    )
    .optional()
    .transform((val) => val.trim()),

  // Email
  email: z
    .string()
    .email("Correo electrónico inválido")
    .toLowerCase()
    .transform((val) => val.trim()),

  // WhatsApp
  whatsapp: z
    .string()
    .min(
      FIELD_LENGTHS.whatsapp.min,
      `El número de WhatsApp debe tener al menos ${FIELD_LENGTHS.whatsapp.min} dígitos`,
    )
    .max(
      FIELD_LENGTHS.whatsapp.max,
      `El número de WhatsApp no puede exceder ${FIELD_LENGTHS.whatsapp.max} dígitos`,
    )
    .regex(
      /^[\d\s\+\-\(\)]+$/,
      "Formato de WhatsApp inválido (solo números, +, -, (), espacios)",
    )
    .transform((val) => val.replace(/[\s\-\(\)]/g, "")), // Elimina espacios, guiones y paréntesis

  // Fecha de nacimiento
  birthday: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Calcular edad exacta
      const exactAge =
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ? age - 1
          : age;

      return exactAge >= 18 && exactAge <= 120;
    }, "Debes tener entre 18 y 120 años")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    }, "La fecha de nacimiento no puede ser futura"),

  // Ciudad de residencia
  address_city: z
    .string()
    .min(
      FIELD_LENGTHS.address_city.min,
      `La ciudad debe tener al menos ${FIELD_LENGTHS.address_city.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.address_city.max,
      `La ciudad no puede exceder ${FIELD_LENGTHS.address_city.min} caracteres`,
    )
    .transform((val) => val.trim()),

  // STATE
  address_state: z
    .string()
    .min(
      FIELD_LENGTHS.address_state.min,
      `El estado debe tener al menos ${FIELD_LENGTHS.address_state.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.address_state.max,
      `El estado no puede exceder ${FIELD_LENGTHS.address_state.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // COUNTRY
  address_country: z
    .string()
    .min(
      FIELD_LENGTHS.address_country.min,
      `El país debe tener al menos ${FIELD_LENGTHS.address_country.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.address_country.max,
      `El país no puede exceder ${FIELD_LENGTHS.address_country.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // Carrera/Profesión
  career: z
    .string()
    .min(
      FIELD_LENGTHS.career.min,
      `La carrera debe tener al menos ${FIELD_LENGTHS.career.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.career.max,
      `La carrera no puede exceder ${FIELD_LENGTHS.career.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // Sueño/Meta
  dream: z
    .string()
    .min(
      FIELD_LENGTHS.dream.min,
      `Tu sueño debe tener al menos ${FIELD_LENGTHS.dream.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.dream.max,
      `Tu sueño no puede exceder ${FIELD_LENGTHS.dream.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // Nombre del afiliado
  affiliate_name: z
    .string()
    .transform((val) => val.trim())
    .optional(),

  // Motivación
  motivation: z
    .string()
    .min(
      FIELD_LENGTHS.motivation.min,
      `La motivación debe tener al menos ${FIELD_LENGTHS.motivation.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.motivation.max,
      `La motivación no puede exceder ${FIELD_LENGTHS.motivation.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // Instagram (obligatorio)
  instagram_url: z
    .string()
    .min(1, "Este campo es obligatorio")
    .regex(
      INSTAGRAM_REGEX,
      "Formato inválido. Colocar solo el nombre de usuario",
    )
    .transform((val) => val.trim()),

  // TikTok (opcional)
  tiktok_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return TIKTOK_REGEX.test(val);
    }, "Formato inválido. Colocar solo el nombre de usuario")
    .transform((val) => (val ? val.trim() : "")),

  // YouTube (opcional)
  youtube_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return YOUTUBE_REGEX.test(val);
    }, "Formato inválido. Colocar solo el nombre de usuario")
    .transform((val) => (val ? val.trim() : "")),

  // Website (opcional)
  website_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return URL_REGEX.test(val);
    }, "URL del sitio web inválida. Debe incluir http:// o https://")
    .transform((val) => (val ? val.trim() : "")),

  // Mensaje
  member_message: z
    .string()
    .min(
      FIELD_LENGTHS.member_message.min,
      `El mensaje debe tener al menos ${FIELD_LENGTHS.member_message.min} caracteres`,
    )
    .max(
      FIELD_LENGTHS.member_message.max,
      `El mensaje no puede exceder ${FIELD_LENGTHS.member_message.max} caracteres`,
    )
    .transform((val) => val.trim()),

  // Archivo de imagen
  picture_file: z
    .instanceof(File, { message: "Debes seleccionar una imagen" })
    .refine((file) => file.size > 0, "Debes seleccionar una imagen")
    .refine((file) => file.size <= 30000000, "La imagen debe ser menor a 30MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      "Solo se permiten archivos JPG, PNG o WEBP",
    ),

  // URL de la imagen (se generará después de subir)
  picture_url: z.string().optional(),
});

// Tipo inferido de TypeScript (si usas TS)
// export type RegistrationFormData = z.infer<typeof registrationSchema>
