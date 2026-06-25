# Task Flow 🗂️

Clon de Trello desarrollado desde cero como proyecto de portfolio. Una aplicación de gestión de tareas con metodología Kanban, autenticación de usuarios y base de datos en tiempo real.

## 🚀 Demo

https://notis-board.vercel.app/

## 📸 Capturas

<!-- pronto -->
<img width="1919" height="914" alt="task" src="https://github.com/user-attachments/assets/544e0110-738e-42d4-9e6e-02190c1a7ba9" />
<img width="1903" height="894" alt="notis" src="https://github.com/user-attachments/assets/0d89e4d4-2c97-4c5c-bb0d-c5aaddd2d558" />
<img width="1901" height="891" alt="notis-dos" src="https://github.com/user-attachments/assets/64cf8611-7029-4e54-854f-3781aa35cf25" />


## ✨ Funcionalidades

- **Autenticación completa** — Registro e inicio de sesión con Supabase Auth
- **Rutas protegidas** — Solo usuarios autenticados pueden acceder al dashboard y tableros
- **Gestión de tableros** — Creá múltiples tableros desde el dashboard
- **Columnas automáticas** — Al crear un tablero se generan las columnas To Do, In Progress y Done automáticamente
- **Tarjetas** — Creá tareas dentro de cada columna
- **Drag & Drop** — Mové tarjetas entre columnas arrastrando con el mouse
- **Persistencia** — Todos los cambios se guardan en Supabase en tiempo real

## 🛠️ Tecnologías

- **React** + **TypeScript** — Frontend
- **Vite** — Bundler y servidor de desarrollo
- **Supabase** — Base de datos PostgreSQL + Autenticación
- **@hello-pangea/dnd** — Drag & Drop
- **React Router DOM** — Navegación entre páginas
- **CSS Modules** — Estilos por componente

## 🗄️ Estructura de la base de datos

```
boards
├── id (uuid)
├── name (text)
├── user_id (uuid)
└── created_at (timestamp)

columns
├── id (uuid)
├── title (text)
├── position (int4)
├── board_id (uuid)
└── created_at (timestamp)

cards
├── id (uuid)
├── title (text)
├── description (text)
├── position (int4)
├── column_id (uuid)
├── due_date (date)
└── created_at (timestamp)
```

## ⚙️ Instalación local

1. Cloná el repositorio

```bash
git clone https://github.com/fedebarrazaa/task-flow.git
cd task-flow
```

2. Instalá las dependencias

```bash
npm install
```

3. Creá un archivo `.env` en la raíz del proyecto

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

4. Corré el proyecto

```bash
npm run dev
```

## 👤 Autor

**Federico Barraza**
- Portfolio: [fedebarrazaa.github.io/mi-portfolio-react](https://fedebarrazaa.github.io/mi-portfolio-react)
- LinkedIn: [linkedin.com/in/federicobarraza](https://www.linkedin.com/in/federico-barraza/)
