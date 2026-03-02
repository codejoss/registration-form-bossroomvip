import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Rate limiting en memoria
const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3;       // máx 3 envíos por minuto por IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) ?? [];
  const recent = requests.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// Mismas regex que tu userSchema.js
const INSTAGRAM_REGEX = /^[a-zA-Z0-9._]+\/?$/;
const TIKTOK_REGEX    = /^[a-zA-Z0-9._]+$/;
const YOUTUBE_REGEX   = /^[a-zA-Z0-9]([a-zA-Z0-9._\u00B7-]*[a-zA-Z0-9])?$/;
const URL_REGEX = /^(https?:\/\/)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
const NAME_REGEX      = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const WHATSAPP_REGEX  = /^\+?[1-9]\d{1,14}$/;
const EMAIL_REGEX     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mismos límites que tu FIELD_LENGTHS
const LIMITS = {
  member_name:      { min: 1,  max: 70   },
  father_last_name: { min: 1,  max: 50   },
  nickname:         { min: 3,  max: 30   },
  whatsapp:         { min: 13, max: 15   },
  address_city:     { min: 2,  max: 50   },
  address_state:    { min: 2,  max: 50   },
  address_country:  { min: 2,  max: 50   },
  career:           { min: 3,  max: 30   },
  dream:            { min: 10, max: 500  },
  motivation:       { min: 10, max: 1000 },
  member_message:   { min: 10, max: 1000 },
};

function validateLength(value: string, field: keyof typeof LIMITS): string | null {
  const { min, max } = LIMITS[field];
  if (!value || value.length < min) return `${field} debe tener al menos ${min} caracteres`;
  if (value.length > max) return `${field} no puede exceder ${max} caracteres`;
  return null;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders(),
  });
}

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return errorResponse("Método no permitido", 405);
  }

  // 1. Rate limit por IP
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  if (isRateLimited(ip)) {
    return errorResponse("Demasiados envíos. Espera un momento e intenta de nuevo.", 429);
  }

  // 2. Parsea el body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse("El formato de los datos es inválido.", 400);
  }

  const s = (val: unknown) => (val ?? "").toString().trim();

  // 3. Valida campos requeridos y sus reglas (igual que tu zod schema)
  const member_name      = s(body.member_name);
  const father_last_name = s(body.father_last_name);
  const mother_last_name = s(body.mother_last_name);
  const nickname         = s(body.nickname);
  const email            = s(body.email).toLowerCase();
  const whatsapp = s(body.whatsapp).replace(/[\s\-()/]/g, "");
  const birthday         = s(body.birthday);
  const address_city     = s(body.address_city);
  const address_state    = s(body.address_state);
  const address_country  = s(body.address_country);
  const career           = s(body.career);
  const dream            = s(body.dream);
  const affiliate_name   = s(body.affiliate_name);
  const motivation       = s(body.motivation);
  const instagram_url    = s(body.instagram_url);
  const tiktok_url       = s(body.tiktok_url);
  const youtube_url      = s(body.youtube_url);
  const website_url      = s(body.website_url);
  const member_message   = s(body.member_message);
  const picture_url      = s(body.picture_url);

  // Validaciones — mismas reglas que userSchema.js
  if (!NAME_REGEX.test(member_name))
    return errorResponse("El nombre solo puede contener letras y espacios", 400);
  const memberNameErr = validateLength(member_name, "member_name");
  if (memberNameErr) return errorResponse(memberNameErr, 400);

  if (father_last_name && !NAME_REGEX.test(father_last_name))
    return errorResponse("El apellido solo puede contener letras y espacios", 400);

  if (!EMAIL_REGEX.test(email))
    return errorResponse("Correo electrónico inválido", 400);

  if (!WHATSAPP_REGEX.test(whatsapp))
    return errorResponse("Formato de WhatsApp inválido", 400);
  const whatsappErr = validateLength(whatsapp, "whatsapp");
  if (whatsappErr) return errorResponse(whatsappErr, 400);

  // Valida edad (igual que tu zod refine)
  if (!birthday) return errorResponse("La fecha de nacimiento es obligatoria", 400);
  const birthDate = new Date(birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const exactAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  if (exactAge < 18 || exactAge > 120)
    return errorResponse("Debes tener entre 18 y 120 años", 400);
  if (birthDate > today)
    return errorResponse("La fecha de nacimiento no puede ser futura", 400);

  for (const [field, value] of Object.entries({ address_city, address_state, address_country, career, dream, motivation, member_message }) as [keyof typeof LIMITS, string][]) {
    const err = validateLength(value, field);
    if (err) return errorResponse(err, 400);
  }

  if (!INSTAGRAM_REGEX.test(instagram_url))
    return errorResponse("Formato de Instagram inválido", 400);

  if (tiktok_url && !TIKTOK_REGEX.test(tiktok_url))
    return errorResponse("Formato de TikTok inválido", 400);

  if (youtube_url && !YOUTUBE_REGEX.test(youtube_url))
    return errorResponse("Formato de YouTube inválido", 400);

  if (website_url && !URL_REGEX.test(website_url))
    return errorResponse("URL del sitio web inválida. Debe incluir http:// o https://", 400);

  if (!picture_url)
    return errorResponse("La imagen es requerida", 400);

  // 4. Llama a tu función PostgreSQL existente
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase.rpc("insert_member_with_private_data", {
    p_member_name:      member_name,
    p_father_last_name: father_last_name,
    p_mother_last_name: mother_last_name,
    p_nickname:         nickname,
    p_email:            email,
    p_whatsapp:         whatsapp,
    p_birthday:         birthday,
    p_address_city:     address_city,
    p_address_state:    address_state,
    p_address_country:  address_country,
    p_career:           career,
    p_dream:            dream,
    p_affiliate_name:   affiliate_name,
    p_motivation:       motivation,
    p_instagram_url:    instagram_url,
    p_tiktok_url:       tiktok_url,
    p_youtube_url:      youtube_url,
    p_website_url:      website_url,
    p_member_message:   member_message,
    p_picture_url:      picture_url,
  });

  if (error) {
    // Email duplicado
    if (error.message.includes("member_private_data_email_key")) {
      return errorResponse("Este correo electrónico ya está registrado", 409);
    }
    return errorResponse("Error al guardar el registro. Intenta de nuevo.", 500);
  }

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: corsHeaders(),
  });
});