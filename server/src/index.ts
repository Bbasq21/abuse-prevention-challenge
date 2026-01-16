import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes.js';
//import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Endpoint de prueba para verificar que el server corre
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', server: 'Express + TS Ready' });
});

// TO DO: Aquí serviremos los estáticos de React más adelante
// app.use(express.static(path.join(__dirname, '../../client/dist')));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});