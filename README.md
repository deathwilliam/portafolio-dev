# Portfolio - Wilfredo Melgar

Este es un proyecto de portafolio personal moderno construido con **Next.js 15**, **Prisma**, **PostgreSQL** y **Tailwind CSS**.

## 🚀 Características

-   **Dashboard de Administración**: Gestión completa de proyectos, posts de blog y testimonios.
-   **Internacionalización (i18n)**: Soporte multi-idioma (Español/Inglés).
-   **Diseño Premium**: Interfaz moderna, responsiva y con modo oscuro integrado.
-   **Base de Datos**: Integración con PostgreSQL mediante Prisma ORM.
-   **Cloudinary**: Gestión de imágenes en la nube.
-   **Framer Motion**: Animaciones fluidas y transiciones interactivas.

## 🛠️ Tecnologías

-   **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide React.
-   **Backend**: Next.js Server Actions, Prisma.
-   **Base de Datos**: PostgreSQL (Hospedado en Railway).
-   **Almacenamiento**: Cloudinary.
-   **Validación**: Zod.

## 🏁 Configuración Local

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/deathwilliam/portafolio-dev.git
    cd portafolio-dev
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes claves:
    ```env
    DATABASE_URL="tu_url_de_postgresql"
    ADMIN_PASSWORD="tu_password_de_admin"
    CLOUDINARY_CLOUD_NAME="tu_cloud_name"
    CLOUDINARY_API_KEY="tu_api_key"
    CLOUDINARY_API_SECRET="tu_api_secret"
    GMAIL_USER="tu_correo@gmail.com"
    GMAIL_APP_PASSWORD="tu_password_de_aplicacion"
    ```

4.  **Generar Cliente de Prisma**:
    ```bash
    npx prisma generate
    ```

5.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

6.  **Ver el resultado**:
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Despliegue

Este proyecto está configurado para desplegarse fácilmente en **Railway** o **Vercel**. Asegúrate de configurar todas las variables de entorno en la plataforma de despliegue.

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.
