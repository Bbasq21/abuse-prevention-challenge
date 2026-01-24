import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import routes from "./routes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();
const PORT = process.env.PORT || 3001;
// 1. Configuraciones básicas
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Servir Archivos Estáticos del Frontend (Vite build)
// Esto permite que el CSS y JS carguen correctamente
let clientDistPath = path.join(__dirname, "../../client/dist");

if (!fs.existsSync(clientDistPath)) {
  clientDistPath = path.join(process.cwd(), "client/dist");
}

console.log("Dist path resolved to:", clientDistPath);
app.use(express.static(clientDistPath));

// 3. Rutas API
app.use("/api", routes);

// 4. Lógica de Inyección SSR Generalizada (Tu estrategia No-Script)
const serveSSR = (req: Request, res: Response) => {
  const host = req.get("host") || "";
  const lang = host.includes(".br") || req.query.lang === "pt" ? "pt" : "es";
  // let lang = "es";
  // if (req.query.lang === "en" || host.includes(".com")) {
  //   lang = "en";
  // } else if (req.query.lang === "pt" || host.includes(".br")) {
  //   lang = "pt";
  // } else if (req.query.lang === "es") {
  //   lang = "es";
  // }

  // Diccionarios
  const SERVER_TRANSLATIONS: Record<string, any> = {
    es: {
      warning: "⚠ JavaScript desactivado. Cargando versión ligera...",
      title: "Ya casi estamos...",
      subtitle: "Actualiza tus datos de contacto",
      labelName: "Nombre completo",
      labelCountry: "País",
      labelAddress: "Dirección",
      btnSubmit: "Continuar",
      btnBack: "Volver",
      captchaLabel: "No soy un robot",
      successMsg: "¡Datos enviados correctamente! (Modo No-Script)",
    },
    pt: {
      warning: "⚠ JavaScript desativado. Carregando versão leve...",
      title: "Quase lá...",
      subtitle: "Atualize seus dados de contato",
      labelName: "Nome completo",
      labelCountry: "País",
      labelAddress: "Endereço",
      btnSubmit: "Continuar",
      btnBack: "Voltar",
      captchaLabel: "Não sou um robô",
      successMsg: "Dados enviados com sucesso! (Modo No-Script)",
    },
  };
  const t = SERVER_TRANSLATIONS[lang];

  const indexPath = path.join(clientDistPath, "app.html");

  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, "utf-8");

    // 1. Reemplazo de traducciones
    html = html
      .replace("__NS_WARNING__", t.warning)
      .replace("__NS_TITLE__", t.title)
      .replace("__NS_SUBTITLE__", t.subtitle)
      .replace("__NS_LBL_NAME__", t.labelName)
      .replace("__NS_LBL_COUNTRY__", t.labelCountry)
      .replace("__NS_LBL_ADDRESS__", t.labelAddress)
      .replace("__NS_BTN__", t.btnSubmit)
      .replace("__NS_BTN_BACK__", t.btnBack)
      .replace("__NS_CAPTCHA__", t.captchaLabel);

    // 2. Lógica para mostrar mensaje de éxito en No-Script
    if (req.query.status === "success_noscript") {
      const successHtml = `<div style="padding: 20px; background: #d4edda; color: #155724; border-radius: 5px; text-align: center;"><h3>${t.successMsg}</h3></div>`;
      // Reemplazamos el formulario con el mensaje de éxito
      html = html.replace(/<form[\s\S]*?<\/form>/, successHtml);
    }

    res.send(html);
  } else {
    res.send("Building... Please refresh.");
  }
};

// Interceptamos la raíz
app.get("/", serveSSR);

// 5. Catch-all: Cualquier otra ruta TAMBIÉN usa SSR (para /home, etc.)
// Express 5 RegExp catch-all
app.get(/.*/, serveSSR);

// 6. IMPORTANTE PARA VERCEL: Exportar la app
export default app;

// Solo escuchar puerto si NO estamos en Vercel (Entorno local)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
