# Shadows Monorepo

Monorepo containing the Shadows mobile application and backend services.

## Structure

```
shadows/
├── mobile/          # Expo React Native mobile app
├── backend/         # Backend API services
└── packages/        # Shared packages (optional)
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Setup

Install all dependencies:

```bash
pnpm install
```

## Workspaces

### Mobile App

```bash
# Start Expo dev server
pnpm mobile:start

# Run on iOS
pnpm mobile:ios

# Run on Android
pnpm mobile:android

# Run on Web
pnpm mobile:web

# Lint
pnpm mobile:lint
```

Or use the workspace filter directly:

```bash
pnpm --filter @shadows/mobile start
```

### Backend

```bash
# Development (to be implemented)
pnpm --filter @shadows/backend dev

# Build (to be implemented)
pnpm --filter @shadows/backend build
```

## Common Commands

```bash
# Install dependencies for all workspaces
pnpm install:all

# Run type checking across all workspaces
pnpm typecheck

# Run linting across all workspaces
pnpm lint

# Clean all node_modules
pnpm clean
```

## Adding New Workspaces

1. Create a new directory (e.g., `packages/shared`)
2. Add `package.json` with name `@shadows/package-name`
3. The workspace will be automatically detected if placed in `packages/*` or explicitly added to `pnpm-workspace.yaml`