import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registrationSchema } from "../schemas/userSchema.js";
import supabase from "../services/supabase";
import { uploadProfilePicture } from "../utils/supabaseStorage.js";
import {
  getMaxBirthday,
  getMinBirthday,
  calculateAge,
} from "../utils/dateHelpers.js";

const DBNAME = "members";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <p className="mt-1 text-sm text-red-600 flex items-start gap-1">
      <span className="mt-0.5">⚠️</span>
      <span>{error.message}</span>
    </p>
  );
};

const InputField = ({
  register,
  errors,
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  ...props
}) => (
  <div>
    <label className="block text-sm font-semibold text-bossDark mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...register(name)}
      type={type}
      className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:border-bossPinkLight ${
        errors[name]
          ? "border-red-300 bg-red-50"
          : "border-gray-200 focus:border-bossPinkStrong"
      }`}
      placeholder={placeholder}
      {...props}
    />
    <ErrorMessage error={errors[name]} />
  </div>
);

const TextareaField = ({
  register,
  errors,
  label,
  name,
  placeholder,
  rows = 4,
  required = true,
}) => (
  <div>
    <label className="block text-sm font-semibold text-bossDark mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      {...register(name)}
      rows={rows}
      className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:border-bossPinkStrong resize-none ${
        errors[name]
          ? "border-red-300 bg-red-50"
          : "border-gray-200 focus:border-bossPinkStrong"
      }`}
      placeholder={placeholder}
    />
    <ErrorMessage error={errors[name]} />
  </div>
);

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields, touchedFields },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      birthday: "",
      city: "",
      carrer: "",
      dream: "",
      affiliate_name: "",
      motivation: "",
      instagram_url: "https://www.instagram.com/",
      tiktok_url: "",
      youtube_url: "",
      website_url: "",
      message: "",
      picture_file: undefined,
      picture_url: "",
    },
  });

  const birthdayValue = watch("birthday");
  const age = birthdayValue ? calculateAge(birthdayValue) : null;

  // Redireccionamiento automatico
  const navegateToGratefulnessPage = () => {
    setTimeout(() => {
      navigate("/gratefulness", { replace: true });
    }, 3000);
  };

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validar tamaño
      if (file.size > 30000000) {
        setSubmitStatus({
          type: "error",
          message: "La imagen debe ser menor a 30MB",
        });
        return;
      }

      // Validar tipo
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        )
      ) {
        setSubmitStatus({
          type: "error",
          message: "Solo se permiten archivos JPG, PNG o WEBP",
        });
        return;
      }

      // Establecer el archivo en el formulario
      setValue("picture_file", file, { shouldValidate: true });

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Limpiar mensaje de error si había
      setSubmitStatus({ type: "", message: "" });
    }
  };

  const insertUser = async (userData) => {
    const { data, error } = await supabase.from(DBNAME).insert([userData]);
    return { data, error };
  };

  const onSubmit = async (data) => {
    setSubmitStatus({ type: "", message: "" });
    setUploadProgress(0);

    try {
      // 1. Subir la imagen a Supabase Storage
      setUploadProgress(30);
      const {
        url,
        path,
        error: uploadError,
      } = await uploadProfilePicture(
        data.picture_file,
        data.email, // Usar email como identificador único
      );

      if (uploadError) {
        throw new Error(`Error al subir la imagen: ${uploadError.message}`);
      }

      // 2. Preparar datos para insertar (sin picture_file, con picture_url)
      setUploadProgress(60);
      const { picture_file, ...dataToInsert } = data;
      dataToInsert.picture_url = url;

      // 3. Guardar en la base de datos
      const { data: result, error: dbError } = await insertUser(dataToInsert);

      if (dbError) {
        throw new Error(
          `Error al guardar en la base de datos: ${dbError.message}`,
        );
      }

      setUploadProgress(100);
      setSubmitStatus({
        type: "success",
        message:
          "¡Registro completado exitosamente! Tu foto ha sido subida y tus datos guardados.",
      });

      // Limpiar formulario
      reset();
      setImagePreview(null);
      setUploadProgress(0);

      // Scroll al inicio
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error completo:", error);
      setUploadProgress(0);
      setSubmitStatus({
        type: "error",
        message: error.message,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    /* TODO - Navegar hasta agradecimiento */
    // Redirigir después de 3 segundos
    navegateToGratefulnessPage();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-50  py-12 px-4 sm:px-6 lg:px-8 text-bossDark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-bossDark uppercase  mb-2">
            Formulario de Registro
          </h1>
          <p className="text-lg text-bossDark">
            Completa todos los campos para unirte a nuestra comunidad y aparecer
            en nuestro Boss Board!
          </p>
        </div>

        {submitStatus.message && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-300 text-green-800"
                : "bg-red-50 border-red-300 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {submitStatus.type === "success" ? "✅" : "❌"}
              </span>
              <div>
                <p className="font-semibold">
                  {submitStatus.type === "success" ? "¡Éxito!" : "Error"}
                </p>
                <p>{submitStatus.message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Sección: Información Personal */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-bossPink">
                📋 Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  register={register}
                  errors={errors}
                  label="Nombre completo"
                  name="name"
                  placeholder="Ej: Juan Pérez García"
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  placeholder="+52 33 1234 5678"
                />
                <div>
                  <InputField
                    register={register}
                    errors={errors}
                    label="Fecha de nacimiento"
                    name="birthday"
                    type="date"
                    min={getMinBirthday()}
                    max={getMaxBirthday()}
                  />
                  {age !== null && (
                    <p className="mt-1 text-sm">Tienes {age} años</p>
                  )}
                </div>
                <InputField
                  register={register}
                  errors={errors}
                  label="Ciudad y/o País de residencia"
                  name="city"
                  placeholder="Ej: Leon, Guanajuato"
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="¿A qué te dedicas actualmente?"
                  name="carrer"
                  placeholder="Puedes incluir tu profesión, emprendimiento o rol actual"
                />
              </div>
            </div>

            {/* Sección: Foto de Perfil */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-bossPink">
                📷 Foto de Perfil
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selecciona tu foto <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      className={`flex-1 cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        errors.picture_file
                          ? "border-red-300 bg-red-50"
                          : imagePreview
                            ? "border-green-300 bg-green-50"
                            : "border-gray-300 hover:border-bossPink hover:bg-bossPinkLight"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="space-y-2">
                        <div className="text-4xl">📸</div>
                        <p className="text-sm font-semibold text-gray-700">
                          {imagePreview
                            ? "Cambiar imagen"
                            : "Haz clic para seleccionar"}
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG o WEBP (máx. 5MB)
                        </p>
                      </div>
                    </label>

                    {imagePreview && (
                      <div className="shrink-0">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  <ErrorMessage error={errors.picture_file} />
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-700">
                        Subiendo imagen...
                      </span>
                      <span className="text-blue-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sección: Redes Sociales */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-bossPink">
                🌐 Redes Sociales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  register={register}
                  errors={errors}
                  label="Instagram"
                  name="instagram_url"
                  type="url"
                  placeholder="https://www.instagram.com/tuusuario"
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="TikTok"
                  name="tiktok_url"
                  type="url"
                  placeholder="https://tiktok.com/@tuusuario"
                  required={false}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="YouTube"
                  name="youtube_url"
                  type="url"
                  placeholder="https://youtube.com/@tucanal"
                  required={false}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="Sitio Web"
                  name="website_url"
                  type="url"
                  placeholder="https://tusitio.com"
                  required={false}
                />
              </div>
            </div>

            {/* Sección: Cuentanos sobre ti */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-bossPink">
                💭 Cuéntanos sobre ti
              </h2>
              <div className="space-y-6">
                <TextareaField
                  register={register}
                  errors={errors}
                  label="¿Cuál es tu propósito o sueño con tu proyecto/emprendimiento?"
                  name="dream"
                  placeholder="Un espacio para que compartas lo que te mueve..."
                  rows={3}
                />
                <TextareaField
                  register={register}
                  errors={errors}
                  label="¿Qué te motivó a unirte a The Boss Room VIP?"
                  name="motivation"
                  placeholder="Breve reflexión que conecte contigo y con otras..."
                  rows={4}
                />
                <InputField
                  register={register}
                  errors={errors}
                  label="¿Alguien te invito a unirte a la comunidad o te refirió?"
                  name="affiliate_name"
                  placeholder="Coloca su nombre y apellido o usuario en redes si lo sabes..."
                  required={false}
                />
                <TextareaField
                  register={register}
                  errors={errors}
                  label="Deja un mensaje o consejo para otra Boss que este comenzando"
                  name="message"
                  placeholder="Tu voz puede inspirar a muchas 💜..."
                  rows={4}
                />
              </div>
            </div>

            {/* Indicador de progreso */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Progreso del formulario
                </span>
                <span className="text-sm font-semibold text-bossPinkStrong">
                  {Object.keys(dirtyFields).length} / 10 campos obligatorios
                  completados
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.keys(dirtyFields).length / 10) * 100}%`,
                  }}
                />
                ˝˝
              </div>
            </div>

            {/* Botón de envío */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
              className="w-full bg-linear-to-r from-bossPinkStrong to-bossPink text-white py-4 px-6 rounded-lg font-bold text-l disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Subiendo datos...
                </span>
              ) : (
                "🚀 Completar Registro"
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              <span className="text-red-500">*</span> Campos obligatorios
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            🔒 Tus datos e imagen están seguros y serán tratados con
            confidencialidad
          </p>
        </div>
      </div>
    </div>
  );
}
