# 🛡️ Desafío de Prevención de Abuso y Validación de Datos

Este repositorio contiene la solución para el desafío técnico de "Prevención de Abuso". Implementa un paso intermedio de verificación en el checkout, enfocándose en **Alto Rendimiento**, **Experiencia de Usuario (UX)** y **Soporte No-Script**.

---

## 📖 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Testing](#-testing)
- [Escenarios de Prueba](#-escenarios-de-prueba)
- [Estructura de Directorios](#-estructura-de-directorios)

---

## 🚀 Características Principales

### ⚡ Rendimiento Primero (Performance First)
- Cero dependencias para peticiones HTTP (`fetch` nativo)
- **Carga de Datos en Paralelo:** Datos del usuario y país se obtienen simultáneamente para minimizar el TTI (Time to Interactive)
- **Captcha con Carga Diferida (Lazy-Load):** Se carga solo tras la interacción del usuario
- Evita bloquear el hilo principal durante la carga inicial

### 🏗️ Arquitectura
- **Estructura Monorepo:** Clara separación entre Servidor (Express) y Cliente (React + Vite)
- **Estrategia No-Script:** Mecanismo de respaldo robusto para usuarios sin JavaScript
- Formularios HTML nativos con procesamiento del lado del servidor

### 👥 Experiencia de Usuario (UX)
- Estados de carga tipo "Skeleton" para reducir la latencia percibida
- Internacionalización (i18n) contextual basada en dominio/URL
- Formulario responsive y accesible

### ✅ Calidad (QA)
- Implementación completa en TypeScript con `strict: true`
- Pruebas Unitarias (Componentes y Hooks) e Integración (API Endpoints)
- **20/20 tests pasando** en cliente, **4/4 tests pasando** en servidor

---

## 🛠 Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 19, TypeScript 5.9, Vite 7, React Hook Form |
| **Backend** | Node.js, Express 5, TypeScript 5.9 |
| **Testing** | Vitest 4, React Testing Library, Supertest |
| **DevTools** | ESLint, Nodemon, Concurrently |

---

## 📦 Arquitectura

El proyecto sigue un patrón **BFF (Backend for Frontend)**:

### Servidor Express (`/server`)
- Proveedor de API (simulando `meli-users` y `meli-countries`)
- Renderizado del lado del servidor (SSR) para respaldo **No-Script**
- Inyección de traducciones en HTML estático
- Sirve el build estático de React en producción

### Cliente React (`/client`)
- Interfaz de usuario rica e interactiva
- Gestión de estado del formulario con `react-hook-form`
- Validación del lado del cliente para optimizar rendimiento
- Componentes no controlados para máximo rendimiento

---

## 🏁 Instalación y Configuración

### Prerrequisitos
- **Node.js** v16 o superior
- **npm** v7 o superior

### Instalación

```bash
# 1. Clonar el repositorio y navegar
git clone <repo-url>
cd abuse-prevention-challenge

# 2. Instalar dependencias raíz
npm install

# 3. Instalar dependencias del Servidor
cd server && npm install

# 4. Instalar dependencias del Cliente
cd ../client && npm install

# 5. Volver a la raíz
cd ..
```

---

## 🚀 Ejecutar el Proyecto

### Modo Desarrollo (Ambas aplicaciones simultáneamente)

```bash
npm run dev
```

Esto inicia automáticamente:
- **Cliente (Vite):** http://localhost:5176
- **Servidor (Express):** http://localhost:3001

### Modo Producción

```bash
# Cliente
cd client && npm run build

# Servidor
cd ../server && npm run build
```

---

## 🧪 Testing

### Ejecutar todos los tests

```bash
npm run test
```

### Tests del cliente

```bash
cd client && npm test
# o con UI
npm run test:ui
# con coverage
npm run test:coverage
```

### Tests del servidor

```bash
cd server && npm test:run
```

**Resultados:**
- ✅ Cliente: 20 tests pasando (3 archivos)
- ✅ Servidor: 4 tests pasando (1 archivo)

---

## 🧪 Escenarios de Prueba

### 1️⃣ Happy Path (Usuario Estándar)

```
URL: http://localhost:5176/?token=123&referrer=/home
```

**Resultado esperado:**
- ✅ Formulario carga con datos prellenados (Juan Pérez)
- ✅ Interacción con Captcha funciona correctamente
- ✅ Al hacer submit, redirige a `/home?captcha_token=...&status=verified`

### 2️⃣ Usuario Nuevo + Idioma Portugués

```
URL: http://localhost:5176/?token=new&lang=pt
```

**Resultado esperado:**
- ✅ Formulario vacío
- ✅ Interfaz traducida al portugués
- ✅ Simula dominio `.com.br`

### 3️⃣ La Estrategia "No-Script" (Avanzado)

Para probar con JavaScript deshabilitado:

**Pasos:**
1. Abre DevTools (F12)
2. Presiona Ctrl+Shift+P y escribe "Disable JavaScript"
3. Navega a: `http://localhost:3001/?token=123`

**Resultado esperado:**
- ✅ Aviso amarillo de advertencia visible
- ✅ UI renderizada con HTML/CSS estándar
- ✅ Etiquetas traducidas en el servidor
- ✅ Envío del formulario mediante POST a `/api/native-submit`
- ✅ Redirección del lado del servidor al checkout

---

## 📁 Estructura de Directorios

```
abuse-prevention-challenge/
├── README.md                          # Este archivo
├── package.json                       # Scripts y dependencias raíz
│
├── client/                            # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.tsx                   # Componente principal
│   │   ├── main.tsx                  # Entry point
│   │   ├── App.css
│   │   ├── index.css
│   │   │
│   │   ├── components/               # Componentes React
│   │   │   ├── Captcha/              # Componente Captcha (simula reCAPTCHA)
│   │   │   │   ├── Captcha.tsx
│   │   │   │   ├── Captcha.css
│   │   │   │   └── Captcha.test.tsx
│   │   │   ├── UserForm/             # Formulario principal
│   │   │   │   ├── UserForm.tsx
│   │   │   │   ├── UserForm.css
│   │   │   │   └── UserForm.test.tsx
│   │   │   ├── Header/
│   │   │   ├── TitleHeader/
│   │   │   ├── FormSkeleton/         # Loading state
│   │   │   └── FooterActions/        # Botones de acciones
│   │   │
│   │   ├── hooks/                    # Custom Hooks
│   │   │   └── useInitialData.ts     # Carga datos iniciales
│   │   │
│   │   ├── services/                 # Llamadas HTTP
│   │   │   └── api.ts                # Cliente del API
│   │   │
│   │   ├── i18n/                     # Internacionalización
│   │   │   └── translations.ts       # Español/Portugués
│   │   │
│   │   └── test/
│   │       └── setup.ts              # Setup para Vitest
│   │
│   ├── vitest.config.ts              # Configuración de tests
│   ├── vite.config.ts                # Configuración de build
│   ├── tsconfig.json
│   ├── package.json
│   └── eslint.config.js
│
├── server/                            # Backend (Express + Node.js)
│   ├── src/
│   │   ├── index.ts                  # Servidor principal
│   │   ├── routes.ts                 # Rutas y endpoints
│   │   ├── types.ts                  # Tipos TypeScript
│   │   ├── mockData.ts               # Datos simulados
│   │   │
│   │   └── __test__/                 # Tests del servidor
│   │       └── api.test.ts
│   │
│   ├── vitest.config.ts              # Configuración de tests
│   ├── tsconfig.json
│   ├── package.json
│   └── dist/                         # Build compilado
│
└── package.json                      # Scripts: dev, test, build
```

---

## 🔑 Scripts Disponibles

### Raíz del Proyecto

```bash
npm run dev              # Ejecuta cliente y servidor simultáneamente
npm run server          # Solo servidor
npm run client          # Solo cliente
npm run test            # Todos los tests (cliente + servidor)
npm run test:client     # Tests del cliente
npm run test:server     # Tests del servidor
```

### Cliente (`cd client`)

```bash
npm run dev             # Vite dev server (puerto 5176)
npm run build           # Build para producción
npm run preview         # Preview del build
npm test                # Tests en modo watch
npm run test:ui         # Tests con UI interactiva
npm run test:coverage   # Coverage report
npm run lint            # ESLint
```

### Servidor (`cd server`)

```bash
npm run dev             # Nodemon + tsx (puerto 3001)
npm run test            # Tests en modo watch
npm run test:run        # Tests una sola vez
```

---

## 📊 API Endpoints

### GET /api/countries
Retorna lista de todos los países disponibles.

```bash
curl http://localhost:3001/api/countries
```

**Respuesta:**
```json
{
  "data": [
    { "id": "AR", "name": "Argentina", "locale": "es-AR" },
    { "id": "BR", "name": "Brasil", "locale": "pt-BR" },
    ...
  ]
}
```

### GET /api/user?token=123
Retorna datos del usuario si existe.

```bash
curl http://localhost:3001/api/user?token=123
```

**Respuesta (usuario existe):**
```json
{
  "data": {
    "fullname": "Juan Pérez",
    "address": "Calle Principal 123",
    "countryId": "AR"
  },
  "message": "User found"
}
```

### POST /api/native-submit
Procesa formulario HTML (sin JavaScript).

```bash
curl -X POST http://localhost:3001/api/native-submit \
  -d "fullname=Juan&countryId=AR&address=Calle%20123&referrer=/checkout"
```

### GET /health
Verifica que el servidor está funcionando.

```bash
curl http://localhost:3001/health
```

---

## 💡 Conceptos Clave Implementados

| Concepto | Descripción |
|----------|-------------|
| **BFF Pattern** | Backend específico para el frontend, simplifica la integración |
| **No-Script Fallback** | Funcionalidad completa sin JavaScript (HTML + Formularios nativos) |
| **SSR Ligero** | Inyección de traducciones en el servidor antes de enviar HTML |
| **Lazy Loading** | Captcha se carga solo cuando el usuario interactúa |
| **Skeleton Loaders** | Estados de carga visuales para mejorar UX |
| **i18n Contextual** | Detecta idioma por dominio o parámetro URL |
| **Promise.all()** | Paralelización de requests para optimizar rendimiento |
| **React Hook Form** | Validación de formularios eficiente |
| **TypeScript Strict** | Tipado completo sin `any` |

---
