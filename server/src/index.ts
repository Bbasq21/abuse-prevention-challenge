import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// 3. Rutas API
app.use('/api', routes);

// 4. Lógica de Inyección SSR (Tu estrategia No-Script)
// Interceptamos la raíz para inyectar traducciones
app.get('/', (req: Request, res: Response) => {
    const host = req.get('host') || '';
    const lang = host.includes('.br') || req.query.lang === 'pt' ? 'pt' : 'es';
    
    // Diccionarios (Mueve esto a un archivo separado si quieres limpiar)
    const SERVER_TRANSLATIONS: Record<string, any> = {
        es: { warning: "⚠ JavaScript desactivado...", title: "Finalizar Compra", labelName: "Nombre", labelCountry: "País", labelAddress: "Dirección", btnSubmit: "Continuar" },
        pt: { warning: "⚠ JavaScript desativado...", title: "Finalizar Compra", labelName: "Nome", labelCountry: "País", labelAddress: "Endereço", btnSubmit: "Continuar" }
    };
    const t = SERVER_TRANSLATIONS[lang];

    const indexPath = path.join(clientDistPath, 'index.html');

    if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        // Reemplazos
        html = html.replace('__NS_WARNING__', t.warning)
                   .replace('__NS_TITLE__', t.title)
                   .replace('__NS_LBL_NAME__', t.labelName)
                   .replace('__NS_LBL_COUNTRY__', t.labelCountry)
                   .replace('__NS_LBL_ADDRESS__', t.labelAddress)
                   .replace('__NS_BTN__', t.btnSubmit);
        res.send(html);
    } else {
        res.send("Building... Please refresh.");
    }
});

// 5. Catch-all: Cualquier otra ruta devuelve el index.html (para React Router si lo usaras)
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// 6. IMPORTANTE PARA VERCEL: Exportar la app
export default app;

// Solo escuchar puerto si NO estamos en Vercel (Entorno local)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}