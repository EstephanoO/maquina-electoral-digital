# Arquitectura de Carpetas - Máquina Electoral Digital

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + CSS Modules
- **Mapas**: MapLibre GL
- **Estado**: Zustand + React Query
- **Validación**: Zod
- **Testing**: Jest + Testing Library
- **Linting**: ESLint + Prettier
- **Build**: Turbopack

---

## Estructura de Carpetas

```
geo-hub/
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── 
├── public/
│   ├── icons/
│   │   ├── modes/
│   │   ├── alerts/
│   │   └── actions/
│   ├── images/
│   │   ├── campaigns/
│   │   └── territories/
│   ├── map-styles/
│   │   ├── light.json
│   │   ├── dark.json
│   │   └── political.json
│   └── favicon.ico
│
├── src/
│   ├── app/                          # Next.js 16 App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── map/
│   │   │   ├── organization/
│   │   │   ├── war-room/
│   │   │   └── mobile/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/                   # Componentes UI
│   │   ├── ui/                      # Componentes base reutilizables
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── modal/
│   │   │   ├── alert/
│   │   │   ├── input/
│   │   │   ├── dropdown/
│   │   │   ├── loading/
│   │   │   └── index.ts
│   │   │
│   │   ├── core/                    # Componentes canónicos del Design System
│   │   │   ├── header-global/
│   │   │   ├── mode-bar/
│   │   │   ├── action-panel/
│   │   │   ├── alerts-list/
│   │   │   ├── kpi-card/
│   │   │   └── index.ts
│   │   │
│   │   ├── decision/                # Componentes de decisión
│   │   │   ├── recommendation-card/
│   │   │   ├── scenario-card/
│   │   │   ├── approval-modal/
│   │   │   └── index.ts
│   │   │
│   │   ├── execution/               # Componentes de ejecución
│   │   │   ├── task-card/
│   │   │   ├── assignee-selector/
│   │   │   ├── critical-action-button/
│   │   │   └── index.ts
│   │   │
│   │   ├── map/                     # Componentes específicos de mapas
│   │   │   ├── map-container/
│   │   │   ├── layer-control/
│   │   │   ├── territory-view/
│   │   │   ├── risk-overlay/
│   │   │   ├── legend/
│   │   │   └── index.ts
│   │   │
│   │   ├── modes/                   # Componentes por modo
│   │   │   ├── dashboard/
│   │   │   │   ├── campaign-overview/
│   │   │   │   ├── metrics-grid/
│   │   │   │   ├── timeline/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── map/
│   │   │   │   ├── air-view/
│   │   │   │   ├── ground-view/
│   │   │   │   ├── water-view/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── organization/
│   │   │   │   ├── team-structure/
│   │   │   │   ├── task-manager/
│   │   │   │   ├── meeting-scheduler/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── war-room/
│   │   │   │   ├── crisis-monitor/
│   │   │   │   ├── action-priority/
│   │   │   │   ├── communication-center/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── mobile/
│   │   │       ├── task-list/
│   │   │       ├── quick-form/
│   │   │       ├── sync-status/
│   │   │       └── index.ts
│   │   │
│   │   └── layout/                  # Componentes de layout
│   │       ├── app-shell/
│   │       ├── mode-layout/
│   │       ├── auth-layout/
│   │       └── index.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-campaign.ts
│   │   ├── use-mode.ts
│   │   ├── use-map.ts
│   │   ├── use-offline.ts
│   │   ├── use-socket.ts
│   │   ├── use-permissions.ts
│   │   ├── use-audit.ts
│   │   └── index.ts
│   │
│   ├── store/                       # Gestión de estado global
│   │   ├── slices/
│   │   │   ├── auth-slice.ts
│   │   │   ├── campaign-slice.ts
│   │   │   ├── mode-slice.ts
│   │   │   ├── map-slice.ts
│   │   │   ├── organization-slice.ts
│   │   │   ├── war-room-slice.ts
│   │   │   └── index.ts
│   │   ├── middleware/
│   │   │   ├── persistence.ts
│   │   │   ├── audit.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── services/                    # Lógica de negocio y API
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── campaigns.ts
│   │   │   ├── maps.ts
│   │   │   ├── organization.ts
│   │   │   ├── war-room.ts
│   │   │   ├── mobile.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── realtime/
│   │   │   ├── websocket.ts
│   │   │   ├── events.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── offline/
│   │   │   ├── storage.ts
│   │   │   ├── sync-queue.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── map/
│   │   │   ├── maplibre-manager.ts
│   │   │   ├── layer-manager.ts
│   │   │   ├── style-loader.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── audit/
│   │   │   ├── logger.ts
│   │   │   ├── event-tracker.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── types/                       # Definiciones de tipos TypeScript
│   │   ├── auth.ts
│   │   ├── campaign.ts
│   │   ├── map.ts
│   │   ├── organization.ts
│   │   ├── war-room.ts
│   │   ├── mobile.ts
│   │   ├── audit.ts
│   │   ├── api.ts
│   │   └── index.ts
│   │
│   ├── utils/                       # Utilidades reutilizables
│   │   ├── permissions.ts
│   │   ├── validation.ts
│   │   ├── format.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── decorators.ts
│   │   ├── map-utils.ts
│   │   └── index.ts
│   │
│   ├── styles/                      # Estilos globales y temas
│   │   ├── globals.css
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   └── political.css
│   │   ├── components.css
│   │   └── modes.css
│   │
│   └── lib/                         # Librerías de terceros y configuración
│       ├── maplibre-gl.ts
│       ├── socket.io.ts
│       ├── zustand.ts
│       ├── react-query.ts
│       ├── zod.ts
│       └── index.ts
│
├── docs/                            # Documentación del proyecto
│   ├── api/
│   ├── components/
│   ├── deployment/
│   └── architecture/
│
├── __tests__/                       # Archivos de prueba
│   ├── __mocks__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── setup.ts
│
├── scripts/                         # Scripts de utilidad
│   ├── build.js
│   ├── deploy.js
│   └── seed.ts
│
└── .vscode/                         # Configuración de VSCode
    ├── settings.json
    ├── extensions.json
    └── launch.json
```

---

## Principios Clave de la Arquitectura

### 1. **Separación por Modos (Design System Funcional)**
Cada modo tiene su propia carpeta dentro de `components/modes/`:
- `dashboard/` - Control total para Dirección
- `map/` - Análisis territorial con subvistas Aire/Tierra/Agua
- `organization/` - Gestión de equipos y tareas
- `war-room/` - Manejo de crisis
- `mobile/` - Ejecución offline en campo

### 2. **Componentes Canónicos**
En `components/core/` viven los componentes obligatorios del Design System:
- `header-global/` - Siempre visible
- `mode-bar/` - Navegación entre modos
- `action-panel/` - Panel de acciones contextuales
- `alerts-list/` - Sistema de alertas
- `kpi-card/` - Métricas principales

### 3. **Gestión de Estado Robusta**
- **Zustand** para estado global por modo
- **React Query** para cacheo y sincronización de servidor
- **Middleware** para auditoría y persistencia
- Estado offline-first con colas de sincronización

### 4. **MapLibre GL Integrado**
- Componentes de mapa en `components/map/`
- Servicios de mapa en `services/map/`
- Estilos personalizados en `public/map-styles/`
- Manejo de capas por modo (Aire/Tierra/Agua)

### 5. **Seguridad y Auditoría**
- Sistema de permisos en `utils/permissions.ts`
- logging inmutable en `services/audit/`
- Validación con Zod en toda la app
- 2FA para acciones críticas

### 6. **Offline-First**
- Servicios de almacenamiento local en `services/offline/`
- Cola de eventos para sincronización
- Estado de conexión visible en modo Mobile
- Conflict resolution automática

---

## Convenciones de Nomenclatura

### Archivos
- Componentes: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Servicios: `kebab-case.ts`
- Tipos: `kebab-case.ts`
- Utilidades: `kebabCase.ts`

### Carpetas
- Siempre en `kebab-case`
- Cada componente tiene su propia carpeta
- `index.ts` para exports agrupados
- Archivos de estilos `.module.css` cuando sea necesario

### Componentes
- Props con TypeScript interface
- Default exports principales
- Named exports para utilidades
- Desestructuración de props al inicio

---

## Flujo de Datos

```
Usuario → Componente → Hook → Store/Query → Service → API
    ↓                ↓          ↓            ↓
Auditoría ← Eventos ← Middleware ← Store ← Service
```

### Event-Driven Architecture
- Todo acción importante dispara un evento
- Los eventos se registran en el audit trail
- Actualizaciones en tiempo real vía WebSocket
- Sincronización eventual para offline

---

## Configuraciones Clave

### Next.js 16 App Router
- Layouts anidados para autenticación y modos
- Server Components para datos estáticos
- Client Components solo para interactividad
- Route handlers para API interna

### TypeScript Estricto
- Tipado completo del sistema
- Interfaces autogeneradas desde API
- Validación Zod en boundaries
- Errores tipados y manejados

### Tailwind CSS
- Diseño atómico reutilizable
- Temas por modo y estado del sistema
- Animaciones consistentes
- Responsive para tablets y mobile

---

## Consideraciones de Performance

### Bundle Splitting
- Por modo (dashboard/map/organization/etc.)
- Por rol de usuario
- Componentes de mapa bajo demanda
- Librerías pesadas dinámicas

### Cache Estratégico
- React Query con stale-while-revalidate
- Service Worker para assets offline
- Map tiles cache persistente
- Estado local persistente

### Rendering Optimizado
- Virtual scrolling para listas largas
- Map rendering con viewport culling
- Component update granularity
- Memoización selectiva

---

## Seguridad

### Autenticación
- JWT con refresh tokens
- 2FA obligatorio para roles críticos
- Session timeout configurable
- Logout concurrente

### Autorización
- RBAC (Role-Based Access Control)
- Permisos granulares por acción
- Validación en frontend y backend
- Auditoría inmutable

### Datos
- Encriptación en tránsito y reposo
- Sanitización de inputs
- CSP headers
- Rate limiting

---

Esta arquitectura asegura:
- **Escalabilidad** por campañas y territorios
- **Mantenibilidad** con separación clara
- **Performance** con optimizaciones específicas
- **Seguridad** con auditoría completa
- **Experiencia** pensada para decisión política real