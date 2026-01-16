// client/src/i18n/translations.ts

export type Language = "es" | "pt";

type TranslationKeys = {
  headerTitle: string;
  headerSubtitle: string;
  labelFullname: string;
  labelCountry: string;
  labelAddress: string;
  placeholderFullname: string;
  placeholderAddress: string;
  selectDefault: string;
  btnBack: string;
  btnNext: string;
  btnLoading: string;
  captchaLabel: string;
  errorRequired: string;
  errorCaptcha: string;
};

const resources: Record<Language, TranslationKeys> = {
  es: {
    headerTitle: "Ya casi estamos...",
    headerSubtitle: "Actualiza tus datos de contacto",
    labelFullname: "Nombre completo",
    labelCountry: "País",
    labelAddress: "Dirección",
    placeholderFullname: "Ej. Juan Pérez",
    placeholderAddress: "Ej. Calle Falsa 123",
    selectDefault: "Seleccionar...",
    btnBack: "Volver",
    btnNext: "Continuar",
    btnLoading: "Cargando...",
    captchaLabel: "No soy un robot",
    errorRequired: "Este campo es requerido",
    errorCaptcha: "Por favor verifica que no eres un robot",
  },
  pt: {
    headerTitle: "Estamos quase lá...",
    headerSubtitle: "Atualize seus dados de contato",
    labelFullname: "Nome completo",
    labelCountry: "País",
    labelAddress: "Endereço",
    placeholderFullname: "Ex. João Silva",
    placeholderAddress: "Ex. Av. Paulista 1000",
    selectDefault: "Selecionar...",
    btnBack: "Voltar",
    btnNext: "Continuar",
    btnLoading: "Carregando...",
    captchaLabel: "Não sou um robô",
    errorRequired: "Este campo é obrigatório",
    errorCaptcha: "Por favor verifique se você não é um robô",
  },
};

// Función helper para detectar idioma según dominio
export const getLanguageFromDomain = (): Language => {
	const hostname = window.location?.hostname || "";
	// Simulamos detección: si termina en .br es portugués, sino español
	// En local podemos probar con ?lang=pt
	const params = new URLSearchParams(window.location?.search || "");
	if (params.get("lang") === "pt") return "pt";

	if (hostname.endsWith(".br")) return "pt";

	return "es"; // Default
};

export const useTranslations = () => {
	const lang = getLanguageFromDomain();
	return resources[lang];
};
