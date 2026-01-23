// api/index.js
// Este archivo conecta Vercel con tu servidor Express compilado

// Importamos la app compilada desde la carpeta server/dist
const app = require('../server/dist/index.js');

// Exportamos la app para que Vercel la ejecute como Serverless Function
module.exports = app.default || app;