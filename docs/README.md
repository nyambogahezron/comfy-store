# Comfy Store Monorepo

This is a monorepo for the Comfy Store project built with [Turborepo](https://turbo.build/repo).

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `@repo/mobile`: React Native Expo application
- `@repo/dashboard`: Next.js admin dashboard
- `@repo/web`: Next.js customer-facing website
- `@repo/server`: Express.js API server

### Packages

- `@repo/ui`: Shared React UI components
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Build all packages:

```bash
npm run build
```

3. Start development servers:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and apps
- `npm run lint` - Run ESLint across all packages
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean all build artifacts

## Project Structure

```
comfy-store/
├── apps/
│   ├── mobile/          # React Native Expo app
│   ├── dashboard/       # Next.js admin dashboard
│   ├── web/            # Next.js customer website
│   └── server/         # Express.js API
├── packages/
│   ├── ui/             # Shared UI components
│   ├── eslint-config/  # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
└── turbo.json          # Turborepo configuration
```

## Development

Each app can be developed independently:

```bash
# Mobile app
cd apps/mobile && npm run dev

# Dashboard
cd apps/dashboard && npm run dev

# Web app
cd apps/web && npm run dev

# Server
cd apps/server && npm run dev
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
