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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Endpoint de prueba para verificar que el server corre
app.get('/health', (req: Request, res: Response) => {
	res.json({ status: 'OK', server: 'Express + TS Ready' });
});

const SERVER_TRANSLATIONS: Record<string, any> = {
	es: {
		warning: "⚠ JavaScript está desactivado. Estás usando la versión básica del sitio.",
		title: "Finalizar Compra",
		labelName: "Nombre Completo",
		labelCountry: "País (Código)",
		labelAddress: "Dirección",
		btnSubmit: "Continuar"
	},
	pt: {
		warning: "⚠ O JavaScript está desativado. Você está usando a versão básica do site.",
		title: "Finalizar Compra",
		labelName: "Nome Completo",
		labelCountry: "País",
		labelAddress: "Endereço",
		btnSubmit: "Continuar"
	}
};

// Middleware para servir el HTML con traducción dinámica (SSR ligero)
app.get('/', (req: Request, res: Response) => {
	// 1. Detectar idioma por dominio (Host header)
	const host = req.get('host') || '';
	// Si es .br usa portugués, sino español
	const lang = host.includes('.br') || req.query.lang === 'pt' ? 'pt' : 'es'; 

	const t = SERVER_TRANSLATIONS[lang];

	// 2. Leer el index.html construido
	// Nota: En prod apuntaría a client/dist/index.html
	const indexPath = path.join(__dirname, '../../client/dist/index.html'); 

	// Si estamos en desarrollo y no hay build, podrías leer el del source o manejar error
	if (!fs.existsSync(indexPath)) {
		return res.send("Por favor ejecuta 'npm run build' en /client primero para ver la app servida.");
	}

	let html = fs.readFileSync(indexPath, 'utf-8');

	// 3. Reemplazo de Textos en el <noscript>
	// Usamos marcadores especiales que pondremos en el HTML
	html = html.replace('__NS_WARNING__', t.warning)
				.replace('__NS_TITLE__', t.title)
				.replace('__NS_LBL_NAME__', t.labelName)
				.replace('__NS_LBL_COUNTRY__', t.labelCountry)
				.replace('__NS_LBL_ADDRESS__', t.labelAddress)
				.replace('__NS_BTN__', t.btnSubmit);

	// 4. Enviar HTML modificado
	res.send(html);
});

// Ruta simulada para recibir al usuario después del formulario
app.get('/checkout', (req: Request, res: Response) => {
	const status = req.query.status;
	const message = status === 'success_noscript' 
		? '¡Formulario recibido sin Javascript!' 
		: '¡Verificación exitosa!';

	res.send(`
		<div style="font-family: sans-serif; text-align: center; padding: 50px;">
			<h1 style="color: #00a650;">${message}</h1>
			<p>Datos validados correctamente.</p>
			<p>El token del captcha ha sido procesado.</p>
			<a href="http://localhost:5173/?referrer=/checkout&token=123">Volver a probar</a>
		</div>
	`);
});


// TO DO: Aquí serviremos los estáticos de React más adelante
// app.use(express.static(path.join(__dirname, '../../client/dist')));
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}