# Vita Intern Project
> Proyecto full-stack para la gestión de clientes, sesiones y reportes diarios para un servicio  de bienestar, salud y deporte. 
**Backend** en Node.js + Express + MySQL.
**Frontend** en React + Vite + Tailwind.

## Descripción General
Vita Intern Project es una plataforma que permite:
- Registrar sesiones diarias por clientes.
- Administrar clientes, planes y sesiones restantes.
- Obtener un resumen diario con insights:
    - Citas realizadas
    - Sesiones utilizadas
    - Clientes sin sesiones
    - Detalle de citas del día
    - Visualización mediante gráficos interactivos.

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
2. Levantar el proyecto completo (DB + Backend + Frontend)
> Ejecutar desde la raíz del proyecto:
```text
docker-compose up --build
```
- Construye las imágenes
- Inicia MySQL
- Inicia el backend en http://localhost:3000
- Inicia el frontend en http://localhost:5173

3. Poblar la base de datos (seed)
> En otra terminal:
```text
docker exec -it vita-backend
```
> Y luego dentro del contenedor:
```text
npm run seed
```
4. Detener los servicios y limpiar todo
```text
docker-compose down -v
```
---

## Backend
### Estructura del backend 
> Centrado en modularidad (Routes → Controllers → Validation → Services → Types → DB)
```text
vita-backend/
├── db/                         # Configuración de la Base de Datos
│   └── init.sql                # Script de inicialización SQL
│
├── src/
│   ├── server.ts               # Punto de arranque principal (Express)
│   ├── db.ts                   # Conexión a la base de datos o cliente ORM
│   ├── seed.ts                 # Script para poblar la DB con datos iniciales
│   │
│   ├── routes/                 # Definición de rutas y mapeo a controladores
│   │   ├── clients.routes.ts
│   │   ├── appointments.routes.ts
│   │   └── summary.routes.ts
│   │
│   ├── controllers/            # Manejo de la lógica de petición/respuesta HTTP
│   │   ├── clients.controller.ts
│   │   ├── appointments.controller.ts
│   │   └── summary.controller.ts
│   │
│   ├── services/               # Lógica de negocio (Business Logic) y manipulación de datos
│   │   ├── clients.service.ts
│   │   ├── appointments.service.ts
│   │   └── summary.service.ts
│   │
│   ├── types/                  # Definiciones de tipos (TypeScript Interfaces/Types)
│   │   ├── appointment.ts
│   │   └── client.ts
│   │
│   └── validation/             # Esquemas de validación (ej. con Zod)
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
| **Summary** | `GET` | `/summary/:date` | Retorna el resumen de la actividad de citas de un día de trabajo específico. 

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
│   │   ├── appointments.ts      # Funciones para POST /appointments
│   │   ├── clients.ts           # Funciones para GET /clients
│   │   ├── http.ts              # Configuración base de Axios o Fetch
│   │   └── summary.ts           # Funciones para GET /summary/{date}
│   │
│   ├── components/
│   │   ├── clients/
│   │   │   └── ClientCard.tsx   # Tarjeta individual del cliente
│   │   └── ui/                  # Componentes de interfaz reutilizables
│   │       ├── Navbar.tsx
│   │       ├── PaginationControls.tsx # Componente de botones de paginación
│   │       └── ...
│   │
│   ├── hooks/                   # Custom Hooks para manejar el estado y la lógica de datos
│   │   ├── useClients.ts        # Fetch y estado de la lista de clientes
│   │   ├── usePagination.ts     # Lógica de paginación reutilizable (Estado + Cálculo)
│   │   ├── useRegisterSession.ts# Lógica para POST /appointments (mutación)
│   │   └── useSummary.ts        # Fetch y estado del resumen diario
│   │
│   ├── pages/                   # Vistas principales de la aplicación
│   │   ├── ClientsPage.tsx      # Muestra la lista de clientes y usa usePagination
│   │   └── SummaryPage.tsx      # Muestra el resumen diario y usa useSummary
│   │
│   ├── router/
│   │   └── index.tsx            # Configuración de rutas (ej. React Router)
│   │
│   ├── types/                   # Definiciones de tipos TypeScript
│   │   ├── Client.ts
│   │   └── Summary.ts
│   │
│   ├── App.tsx                  # Componente principal de la aplicación
│   ├── index.css                # Estilos globales (Tailwind CSS)
│   └── main.tsx                 # Punto de entrada de la aplicación (Renderizado de React)
├── .env                         # Variables de entorno (ej. URL del backend)
└── Dockerfile
```
