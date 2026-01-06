# Git Workflow para Máquina Electoral Digital

## Estrategia de Branches: GitHub Flow + GitOps

### Branches Principales
- **main**: Producción estable, solo deployments automáticos
- **develop**: Integración continua, staging environment

### Flujo de Trabajo

#### 1. Nueva Feature
```bash
# Desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nombre-feature

# Desarrollo...
git add .
git commit -m "feat: descripción de la feature"
git push origin feature/nombre-feature

# PR hacia develop
```

#### 2. Hotfix Producción
```bash
# Desde main
git checkout main
git pull origin main
git checkout -b hotfix/corrección-urgente

# Fix rápido...
git commit -m "fix: corrección urgente en producción"
git push origin hotfix/correción-urgente

# PR directa a main + merge automático
```

#### 3. Release
```bash
# Desde develop
git checkout develop
git checkout -b release/v1.2.0

# Preparar release...
git commit -m "chore: prepare release v1.2.0"
git push origin release/v1.2.0

# PR a main, merge y tag
git tag v1.2.0
git push origin v1.2.0
```

## Convenciones de Commits (Conventional Commits)

### Formato
```
<tipo>[!]: <descripción>

[opcional cuerpo]

[opcional footer]
```

### Tipos
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Formato, sin cambios lógicos
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance
- `ci`: Cambios en CI/CD
- `build`: Sistema de build/dependencies

### Ejemplos
```bash
feat(auth): add 2FA with TOTP
fix(map): resolve memory leak in layer rendering
docs(api): update authentication endpoints
refactor(components): extract common button styles
test(user): add integration tests for login flow
```

## Políticas de Branches

### Protecciones (GitHub Settings)
- **main**: 
  - Require PR reviews (2)
  - Require status checks to pass
  - Require up-to-date branches
  - Include administrators
  - Restrict force pushes

- **develop**:
  - Require PR reviews (1)
  - Require status checks to pass
  - Allow force pushes for maintainers

### Automatización
- **PR a main**: Deploy automático a producción
- **PR a develop**: Deploy automático a staging
- **Tags**: Creación automática de release
- **Hotfixes**: Merge directo con bypass de revisiones

## Ambiente Strategy

| Branch | Environment | URL | Deploy Trigger |
|--------|-------------|-----|----------------|
| main | Production | https://maquina-electoral.vercel.app | Merge/Tag |
| develop | Staging | https://maquina-electoral-staging.vercel.app | Merge |
| feature/* | Preview | https://feature-branch.vercel.app | PR |

## Team Workflow

### Desarrollador
1. Crear feature branch desde develop
2. Desarrollo con commits semánticos
3. Push y PR a develop
4. Responder code reviews
5. Merge después de aprobación

### Tech Lead
1. Revisar PRs de features
2. Aprobar merges a develop
3. Coordinar releases desde develop
4. Manejar hotfixes directamente

### Release Manager
1. Preparar branches de release
2. Ejecutar deploys a producción
3. Crear tags y changelogs
4. Monitorear post-deploy

## CI/CD Integration

### Pull Request Validation
- Linting + TypeScript check
- Tests unitarios e integración
- Build validation
- Security scan
- Size impact analysis

### Deployment Pipeline
1. **Staging**: Cada merge a develop
2. **Production**: Cada merge/tag en main
3. **Rollback**: Automático si health checks fallan

## Herramientas

### GitHub Actions Workflows
- `ci-cd.yml`: Pipeline principal
- `pr-validation.yml`: Validación de PRs
- `release.yml`: Creación de releases

### Integraciones
- **Vercel**: Deploy preview y producción
- **Codecov**: Coverage reports
- **Snyk**: Security scanning
- **Dependabot**: Updates automáticos

## Best Practices

### Commits
- Commits atómicos y descriptivos
- Separar cambios lógicos en commits distintos
- Usar presente imperativo ("add" no "added")

### Branches
- Mantener branches actualizadas
- Limpiar branches merged automáticamente
- Nombres descriptivos y consistentes

### PRs
- Describir el qué y el porqué
- Incluir screenshots para cambios UI
- Referenciar issues relacionados
- Tests para nuevas funcionalidades

### Releases
- Versionamiento semántico
- Changelog detallado
- Notas de migración si aplica