# 🐱 API RESTful de Gatitos con NestJS, PostgreSQL y Docker

Esta es una API RESTful desarrollada con NestJS, TypeScript, PostgreSQL y Docker, que permite gestionar un CRUD de gatitos con autenticación y roles de usuario.

## 🚀 Tecnologías Utilizadas
- **NestJS** - Framework para Node.js
- **TypeScript** - Lenguaje de programación tipado
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para manejar la base de datos
- **Docker** - Contenedores para fácil despliegue
- **JWT** - Autenticación basada en tokens

## 📌 Características
- CRUD de gatitos 🐱 (Crear, Leer, Actualizar y Eliminar)
- Autenticación con JWT (Login y Registro)
- Control de acceso por roles (Usuario y Administrador)
- Uso de Docker para despliegue fácil

## 📂 Estructura del Proyecto
```bash
src/
│── auth/     
│── breeds/   
│── cats/       
│── common/      
│── config/       
│── users/      
│── main.ts     
```

## ⚙️ Instalación y Configuración
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/api-gatitos.git
cd api-gatitos
```

### 2️⃣ Configurar variables de entorno
```Crear un archivo `.env` en la raíz del proyecto y reemplazar las variables de entorno

### 3️⃣ Levantar el proyecto con Docker
```bash
docker-compose up --build
```
Esto iniciará la base de datos y la API en contenedores.

## 🔥 Endpoints
### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Gestión de Gatitos 🐾
- `GET /cats` - Obtener todos los gatitos
- `GET /cats/:id` - Obtener un gatito por ID
- `POST /cats` - Crear un gatito (requiere autenticación y rol Admin)
- `PUT /cats/:id` - Actualizar un gatito (requiere autenticación y rol Admin)
- `DELETE /cats/:id` - Eliminar un gatito (requiere autenticación y rol Admin)

## 🛡️ Roles y Permisos
| Rol         | Acciones Permitidas |
|------------|--------------------|
| Usuario    | Ver gatitos        |
| Admin      | CRUD completo de gatitos |

## 📜 Licencia
Este proyecto está bajo la **MIT License**.

---
👨‍💻 Desarrollado por Perseo Cardenas
