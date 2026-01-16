// server/src/mockData.ts
import type { Country, UserProfile } from './types.js';

export const COUNTRIES: Country[] = [
    { id: 'AR', name: 'Argentina', locale: 'es-AR' },
    { id: 'BR', name: 'Brasil', locale: 'pt-BR' },
    { id: 'CO', name: 'Colombia', locale: 'es-CO' },
    { id: 'MX', name: 'México', locale: 'es-MX' },
    { id: 'CL', name: 'Chile', locale: 'es-CL' },
    { id: 'UY', name: 'Uruguay', locale: 'es-UY' },
];

// Simulamos una "Base de datos" de usuarios basada en el token que llega por URL
// Token '123' = Usuario con datos (Happy path de recarga de datos)
// Token 'new' = Usuario nuevo (Formulario vacío)
export const USERS_DB: Record<string, UserProfile> = {
    '123': {
        fullname: 'Juan Pérez',
        address: 'Calle Falsa 123, Piso 4',
        countryId: 'AR'
    },
    '456': {
        fullname: 'João Silva',
        address: 'Av. Paulista 1000',
        countryId: 'BR'
    }
};