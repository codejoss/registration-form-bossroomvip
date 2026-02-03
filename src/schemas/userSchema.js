import { z } from "zod";

// Expresiones regulares para validaciones
const URL_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const INSTAGRAM_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
const TIKTOK_REGEX =
  /^https?:\/\/(www\.)?(tiktok\.com\/@[a-zA-Z0-9._]+|vm\.tiktok\.com\/[a-zA-Z0-9]+)\/?$/;
const YOUTUBE_REGEX =
  /^https?:\/\/(www\.)?(youtube\.com\/(c\/|channel\/|user\/|@)?[a-zA-Z0-9_-]+|youtu\.be\/[a-zA-Z0-9_-]+)\/?$/;
const WHATSAPP_REGEX = /^\+?[1-9]\d{1,14}$/; // Formato internacional E.164

export const registrationSchema = z.object({
  // Nombre completo
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios",
    )
    .transform((val) => val.trim()),

  // Apellido Paterno
  father_last_name: z
    .string()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(100, "El apellido no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios",
    )
    .transform((val) => val.trim()),
  // Apellido Materno
  mother_last_name: z
    .string()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(100, "El apellido no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios",
    )
    .optional()
    .transform((val) => val.trim()),
  // Nickname
  nickname: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
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
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos")
    .max(15, "El número de WhatsApp no puede exceder 15 dígitos")
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
  city: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres")
    .transform((val) => val.trim()),
  state: z
    .string()
    .min(2, "El estado debe tener al menos 2 caracteres")
    .max(100, "El estado no puede exceder 100 caracteres")
    .transform((val) => val.trim()),
  country: z
    .string()
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(100, "El país no puede exceder 100 caracteres")
    .transform((val) => val.trim()),

  // Carrera/Profesión
  carrer: z
    .string()
    .min(2, "La carrera debe tener al menos 2 caracteres")
    .max(100, "La carrera no puede exceder 100 caracteres")
    .transform((val) => val.trim()),

  // Sueño/Meta
  dream: z
    .string()
    .min(10, "Tu sueño debe tener al menos 10 caracteres")
    .max(500, "Tu sueño no puede exceder 500 caracteres")
    .transform((val) => val.trim()),

  // Nombre del afiliado
  affiliate_name: z
    .string()
    .transform((val) => val.trim())
    .optional(),

  // Motivación
  motivation: z
    .string()
    .min(10, "La motivación debe tener al menos 10 caracteres")
    .max(1000, "La motivación no puede exceder 1000 caracteres")
    .transform((val) => val.trim()),

  // Instagram (obligatorio)
  instagram_url: z
    .string()
    .min(1, "La URL de Instagram es obligatoria")
    .regex(
      INSTAGRAM_REGEX,
      "URL de Instagram inválida. Ejemplo: https://www.instagram.com/usuario",
    )
    .transform((val) => val.trim()),

  // TikTok (opcional)
  tiktok_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return TIKTOK_REGEX.test(val);
    }, "URL de TikTok inválida. Ejemplo: https://tiktok.com/@usuario")
    .transform((val) => (val ? val.trim() : "")),

  // YouTube (opcional)
  youtube_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return YOUTUBE_REGEX.test(val);
    }, "URL de YouTube inválida. Ejemplo: https://youtube.com/@usuario")
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
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres")
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
