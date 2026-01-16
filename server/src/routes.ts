// server/src/routes.ts
import { Router } from 'express';
import type { Request, Response } from 'express';
import { COUNTRIES, USERS_DB } from './mockData.js';
import type { ApiResponse, Country, UserProfile } from './types.js';

const router = Router();

// Middleware para simular delay de red (IMPORTANTE para probar UX/Skeletons)
// El enunciado pide cuidar que la UI no se bloquee 
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 1. API Countries (meli-countries)
router.get('/countries', async (req: Request, res: Response<ApiResponse<Country[]>>) => {
    // Simulamos 500ms de carga
    await simulateDelay(500); 
    
    res.json({
        data: COUNTRIES
    });
});

// 2. API User (meli-users)
// Recibe el token por query param para identificar al usuario
router.get('/user', async (req: Request, res: Response<ApiResponse<UserProfile | null>>) => {
    const { token } = req.query;
    
    // Simulamos un delay un poco mayor (ej. 1 segundo) para ver cómo carga el formulario
    await simulateDelay(800);

    if (typeof token === 'string' && USERS_DB[token]) {
        // Caso: Usuario ya tiene datos 
        res.json({
            data: USERS_DB[token],
            message: 'User found'
        });
    } else {
        // Caso: Usuario nuevo o token inválido
        res.json({
            data: null, // El front deberá mostrar los campos vacíos
            message: 'User not found or new session'
        });
    }
});

export default router;