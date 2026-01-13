# React TypeScript Template

Template escalable para aplicaciones React modernas, con arquitectura modular, tipado fuerte y optimizaciones de build.

## 🚀 Características Principales

- **React 19** con TypeScript para tipado fuerte y robusto
- **Vite** para builds rápidos con code-splitting y chunks separados
- **Tailwind CSS** con soporte nativo para temas oscuros y claros
- **Shadcn/UI** - Biblioteca de componentes UI accesibles y personalizables
- **React Router** para navegación SPA fluida con guards
- **TanStack Query** para gestión eficiente del estado del servidor
- **Zustand** para estado global del cliente con persistencia
- **React Hook Form + Zod** para formularios con validación declarativa
- **Sidebar responsiva** con navegación integrada y breadcrumbs dinámicos
- **Layout modular** con separación clara de responsabilidades
- **API robusta** con Axios, interceptors para auth/errores y logging
- **Optimizaciones**: Lazy loading, manualChunks en Vite para mejor performance

## 🏗️ Arquitectura y Decisiones de Estructura

Este template adopta una arquitectura modular y escalable, inspirada en patrones modernos como DDD. Las decisiones clave incluyen:

- **Separación de responsabilidades**: Cada directorio tiene un propósito específico, facilitando navegación y mantenimiento.
- **Modularidad**: Los módulos (como `auth`) encapsulan lógica relacionada, permitiendo desarrollo independiente y reutilización.
- **Escalabilidad**: La estructura soporta crecimiento sin refactorizaciones masivas, con barrel exports para imports limpios.
- **TypeScript first**: Tipado fuerte en APIs, stores y componentes.
- **Convenciones consistentes**: Nombres en inglés, archivos index.ts para exports, organización lógica.

## 📁 Estructura Detallada del Proyecto

```
src/
├── app/                          # Núcleo de la aplicación
│   ├── components/               # Componentes reutilizables
│   │   ├── shared/               # Componentes personalizados compartidos (Header, Sidebar, Container)
│   │   └── ui/                   # Componentes Shadcn/UI (botones, formularios, etc.)
│   ├── pages/                    # Páginas principales de la aplicación (Home, Dashboard, Auth)
│   ├── routes/                   # Configuración de rutas y navegación
│   ├── api/                      # Servicios de API y configuración
│   │   ├── client/               # Cliente HTTP (Axios) con interceptors
│   │   ├── services/             # Servicios específicos (auth, etc.)
│   │   ├── query-keys/           # Claves para TanStack Query
│   │   └── config.ts             # Configuración singleton de API
│   ├── modules/                  # Módulos funcionales independientes
│   │   └── auth/                 # Módulo de autenticación (forms, hooks, schemas)
│   ├── types/                    # Definiciones TypeScript globales
│   ├── App.tsx                   # Componente raíz con providers
│   └── layout.tsx                # Layout principal con sidebar y header
├── hooks/                        # Hooks personalizados reutilizables
├── lib/                          # Utilidades y helpers ( logger)
├── assets/                       # Recursos estáticos (imágenes, iconos)
├── constants/                    # Constantes de la aplicación
├── schemas/                      # Esquemas de validación con Zod
├── stores/                       # Estado global con Zustand
├── utils/                        # Funciones auxiliares y helpers
├── App.css                       # Estilos globales de la app
├── index.css                     # Estilos base y Tailwind
└── main.tsx                      # Punto de entrada de la aplicación
```

### Explicación de Directorios Clave

- **`app/`**: Contiene el código principal, organizado por funcionalidad.
- **`components/shared/`**: Componentes personalizados compartidos.
- **`components/ui/`**: Componentes Shadcn, estandarizados.
- **`pages/`**: Páginas lazy-loaded.
- **`routes/`**: Navegación con guards.
- **`api/`**: Capa de red con interceptors y logging.
- **`modules/`**: Funcionalidades encapsuladas.
- **`stores/`**: Estado global persistente.
- **`schemas/`**: Validaciones centralizadas.
- **`lib/`**: Utilidades como authActions y logger.

## 🛠️ Tecnologías y Herramientas

- **Routing**: React Router v7 para navegación declarativa
- **Estado**: Zustand para client state + TanStack Query para server state
- **Formularios**: React Hook Form con validación Zod
- **UI**: Primitivas Radix UI + Tailwind CSS
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Notificaciones**: Sonner
- **Temas**: next-themes
- **Build**: Vite con manualChunks para optimización

## 🚀 Inicio Rápido

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**

   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🎨 Personalización y Extensión

### Tema

- Soporte automático para temas claro/oscuro con next-themes.

### Componentes UI

- Más de 40 componentes preconstruidos en `src/app/components/ui/`.
- Personalizables via `components.json` y Tailwind.

### Layout

- Sidebar colapsable con navegación activa.
- Header con breadcrumbs dinámicos.
- Diseño responsivo.

## 📝 Consejos para Extender

### UI (Componentes)

- **Qué hacer**: Agrega en `components/ui/` para Shadcn; usa `components/shared/` para layouts. Reutiliza variantes de Shadcn.
- **Qué no hacer**: Evita estilos inline; no modifiques componentes base de Shadcn directamente.

### API (Servicios)

- **Qué hacer**: Extiende `api/services/` devolviendo `AxiosResponse`. Centraliza query-keys en `api/query-keys/`.
- **Qué no hacer**: No dupliques lógica de requests; evita llamadas directas sin interceptors.

### Estado (Stores)

- **Qué hacer**: Agrega en `stores/` con Zustand; usa persist para datos críticos.
- **Qué no hacer**: No combines server y client state en un store; evita stores monolíticos.

### Módulos (Funcionalidades)

- **Qué hacer**: Crea en `modules/` con subcarpetas (hooks, schemas). Usa barrel exports.
- **Qué no hacer**: No mezcles módulos; evita dependencias circulares.

### General

- **Qué hacer**: Actualiza `types/` para nuevos tipos. Prueba builds para code-splitting.
- **Qué no hacer**: No ignores tipado; evita imports directos de node_modules en componentes.

## 📝 Guía de Uso

Este template es agnóstico y adaptable:

- **Páginas de ejemplo**: Home, Dashboard, Auth.
- **Navegación funcional**: Sidebar con guards.
- **Estado de ejemplo**: Zustand con persistencia.
- **API preparada**: Interceptors para auth/errores.
- **Formularios**: Validación completa.

Para iniciar un nuevo proyecto:

1. Reemplaza páginas en `src/app/pages/`.
2. Agrega rutas en `src/app/routes/routes.ts`.
3. Personaliza sidebar en `src/app/components/shared/AppSidebar.tsx`.
4. Implementa servicios en `src/app/api/services/`.
5. Configura stores en `src/stores/`.
6. Agrega módulos en `src/app/modules/`.
7. Define hooks en `src/hooks/`.
8. Crea schemas en `src/schemas/`.
9. Usa utils en `src/utils/` y `src/lib/`.
10. Actualiza tipos en `src/app/types/`.
