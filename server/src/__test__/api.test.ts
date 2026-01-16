import request from 'supertest';
import { app } from '../index.js';
import { describe, it, expect } from 'vitest';

describe('Backend API Endpoints', () => {
    
    it('GET /api/countries returns list of countries', async () => {
        const res = await request(app).get('/api/countries');
        
        expect(res.status).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('id');
        expect(res.body.data[0]).toHaveProperty('name');
    });

    it('GET /api/user returns specific user for token 123', async () => {
        const res = await request(app).get('/api/user?token=123');
        
        expect(res.status).toBe(200);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data.fullname).toBe('Juan Pérez');
    });

    it('GET /api/user returns null for invalid token', async () => {
        const res = await request(app).get('/api/user?token=invalid_token');
        
        expect(res.status).toBe(200);
        expect(res.body.data).toBeNull();
    });

    it('POST /api/native-submit redirects correctly (No-Script strategy)', async () => {
        const formData = {
            fullname: 'No Script User',
            countryId: 'AR',
            address: 'Offline St',
            referrer: '/home'
        };

        const res = await request(app)
            .post('/api/native-submit')
            .type('form') // Simula envío de formulario HTML
            .send(formData);

        expect(res.status).toBe(302); // Redirección
        expect(res.header.location).toContain('/home?status=success_noscript');
    });
});