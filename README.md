# Vita Intern Project
> Proyecto full-stack para la gestión de clientes, sesiones y reportes diarios para un servicio  de bienestar, salud y deporte. 
**Backend** en Node.js + Express + MySQL.
**Frontend** en React + Vite + Tailwind.

## Descripción General
Vita Intern Project es una plataforma que permite:
- Registrar sesiones diarias para clientes.
- Administrar clientes, planes y sesiones restantes.
- Obtener un resumen diario con insights:
    - Citas realizadas
    - Clientes únicos
    - Clientes sin sesiones restantes y su contacto
    - Detalle de citas del día (logs diarios)
    - Visualización de citas por hora (peaks)
<img width="1426" height="786" alt="Screenshot 2025-11-20 at 4 21 44 pm" src="https://github.com/user-attachments/assets/f3f9aaf5-6ad6-40b8-aee9-cdbc9896f80b" />
<img width="1426" height="786" alt="Screenshot 2025-11-20 at 4 21 26 pm" src="https://github.com/user-attachments/assets/0d71efbe-f53e-45c8-be24-30536f5952b2" />


## Arquitectura del Proyecto
```text
vita-intern-project/
├── vita-backend/      # API REST + MySQL
├── vita-frontend/     # React
└── docker-compose.yml # Levanta localmente la base de datos, el backend (API) y el frontend.
```
---

## Instrucciones de Ejecución

1. Verificar que Docker esté instalado
```text
docker --version
```
2. Crear archivos .env desde los .env.example
```text
cp vita-backend/.env.example vita-backend/.env
cp vita-frontend/.env.example vita-frontend/.env
```
3. Levantar el proyecto completo (DB + Backend + Frontend)
> Ejecutar desde la raíz del proyecto:
```text
docker-compose up --build
```
- Construye las imágenes
- Inicia MySQL
- Inicia el backend en http://localhost:3000
- Inicia el **frontend en http://localhost:5173**

4. Poblar la base de datos (seed)
> En otra terminal:
```text
docker exec -it vita-backend sh
```
> Y luego dentro del contenedor:
```text
npm run seed
```
> **Detener los servicios y limpiar todo**
```text
docker-compose down -v
```
---

## Backend
### Estructura del backend 
> Centrado en modularidad (Routes → Controllers → Validation → Services → Types → DB)
```text
vita-backend/
├── db/                         # Base de Datos 
│   └── init.sql                # Script de inicialización MySQL
│
├── src/
│   ├── server.ts               # Punto de partida de la API (Express)
│   ├── db.ts                   # Conexión a la base de datos
│   ├── seed.ts                 # Script para poblar la DB con datos iniciales
│   │
│   ├── routes/                 # Definición de rutas y delegar la lógica a los controladores
│   │   ├── clients.routes.ts
│   │   ├── appointments.routes.ts
│   │   └── summary.routes.ts
│   │
│   ├── controllers/            # Manejo de la lógica de petición/respuesta HTTP, validar parámetros de la request y manejo de errores
│   │   ├── clients.controller.ts
│   │   ├── appointments.controller.ts
│   │   └── summary.controller.ts
│   │
│   ├── services/               # Lógica de negocio
│   │   ├── clients.service.ts      # Obtener lista de clientes
│   │   ├── appointments.service.ts # Verificar si un cliente tiene sesiones disponibles, insertar una nueva cita e incrementar sesiones usadas
│   │   └── summary.service.ts      # Obtener citas del dia, calcular datos resumen y clientes que quedaron sin sesiones 
│   │
│   ├── types/                  # Definiciones de tipos
│   │   ├── appointment.ts
│   │   └── client.ts
│   │
│   └── validation/             # Esquemas de validación con Zod: Tipos, campos requeridos, rangos y manejo de errores
│       ├── clients.schema.ts
│       ├── appointments.schema.ts
│       └── summary.schema.ts
│
├── Dockerfile                  # Instrucciones para construir el contenedor Docker
└── .env                        # Variables de entorno
```
---

### Backend ERD
<img width="700" height="450" alt="Screenshot 2025-11-17 at 11 06 52 am" src="https://github.com/user-attachments/assets/7d2ae6e1-da60-4343-bf35-c2272a275f4e" />

---

### API Documentation

| Nombre | Método | Path | Descripción |
| :--- | :--- | :--- | :--- | 
| **Clients** | `GET` | `/clients` | Lista todos los clientes y su información. 
| **Appointments** | `POST` | `/appointments` | Registra una sesión nueva para un cliente, actualizando su contador de sesiones. 
| **Summary** | `GET` | `/summary/:date` | Retorna el resumen de citas de un día específico (en la app el dia actual). 

---

### Detalles de Endpoints

#### 1. Clients API

**`GET /clients`**

**Response**

```json
{
    "data": [
        {
            "id": 1,
            "name": "Pepito Fry",
            "email": "pepito@example.com",
            "phone": "+56911111111",
            "planName": "Plan 10 sesiones",
            "totalSessions": 10,
            "usedSessions": 2,
            "remaining": 8
        }
    ],
    "count": 1
}
```

#### 2. Appointments API

**`POST /appointments`**

**Body**

```json
{
    "clientId": 1,
    "date": "2025-01-15T10:00:00Z" // opcional: si no viene se usa "now"
}
```


#### 3. Summary API

**`GET /summary/:date`**

**Response**

```json
{
    "message": "Daily summary generated successfully",
    "data": {
        "date": "2025-11-20",
        "totalAppointments": 1,
        "uniqueClients": 1,
        "sessionUsed": 1,
        "clientsWithZeroSessions": [],
        "appointments": [
            {
                "id": 1,
                "clientId": 6,
                "date": "2025-11-20T13:06:48.000Z",
                "name": "Dr. Phyllis Schultz",
                "email": "Keven39@hotmail.com",
                "phone": "+56976709161",
                "planName": "Plan 6 sesiones"
            }
        ]
    }
}
```
---

## Frontend
### Estructura del Frontend 
```text
vita-frontend/
├── node_modules/
├── src/
│   ├── api/                     # Lógica para interactuar con los Endpoints del Backend
│   │   ├── appointments.ts      # Función para POST /appointments
│   │   ├── clients.ts           # Función para GET /clients
│   │   ├── http.ts              # Configuración base de Axios
│   │   └── summary.ts           # Función para GET /summary/{date}
│   │
│   ├── components/
│   │   ├── clients/
│   │   │   └── ClientCard.tsx   # Card para cada cliente
│   │   └── ui/                  # Componentes de UI
│   │       ├── Navbar.tsx
│   │       ├── PaginationControls.tsx # Componente de botones de paginación
│   │       └── ...
│   │
│   ├── hooks/                   # Custom Hooks para manejar el estado y la lógica de datos
│   │   ├── useClients.ts        # Fetch (getClients) y permite actualizar el estado local tras registrar una sesión
│   │   ├── usePagination.ts     # Lógica de paginación
│   │   ├── useRegisterSession.ts# Lógica POST /appointments para registrar sesión
│   │   └── useSummary.ts        # Fetch getDailySummary(date)
│   │
│   ├── pages/                   # Vistas principales
│   │   ├── ClientsPage.tsx      # Lista de clientes (ClientCard) y usa usePagination
│   │   └── SummaryPage.tsx      # Resumen diario y usa useSummary
│   │
│   ├── router/
│   │   └── index.tsx            # Configuración de rutas
│   │
│   ├── types/                   # Definiciones de tipos TypeScript
│   │   ├── Client.ts
│   │   └── Summary.ts
│   │
│   ├── App.tsx                  # Componente principal (Navbar)
│   ├── index.css                # Tailwind CSS
│   └── main.tsx                 # Punto de entrada de la app
├── .env                         # Variables de entorno
└── Dockerfile                   # Instrucciones para construir el contenedor Docker
```
