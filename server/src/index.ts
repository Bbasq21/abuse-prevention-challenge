import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes.js';
//import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Endpoint de prueba para verificar que el server corre
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', server: 'Express + TS Ready' });
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});