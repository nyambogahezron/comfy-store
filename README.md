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
- `@repo/typescript-config`: Shared TypeScript configurations

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Bun package manager

### Installation

1. Install dependencies:

```bash
bun install
```

2. Build all packages:

```bash
bun run build
```

3. Start development servers:

```bash
bun run dev
```

## Available Scripts

- `bun run dev` - Start all development servers
- `bun run build` - Build all packages and apps
- `bun run lint` - Run Biome linting across all packages
- `bun run format` - Format code with Biome
- `bun run check` - Run comprehensive Biome check (format + lint + organize imports)
- `bun run type-check` - Run TypeScript type checking
- `bun run clean` - Clean all build artifacts

## Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and code formatting, providing:

- ⚡ Fast performance (10-100x faster than ESLint)
- 🔧 Auto-fixing capabilities
- 📦 Zero configuration needed
- 🎯 Excellent TypeScript support
- 📝 Import organization

### Quick Biome Commands

```bash
# Check for issues without fixing
./scripts/biome.sh check

# Fix safe issues automatically
./scripts/biome.sh fix

# Fix all issues (including unsafe)
./scripts/biome.sh unsafe-fix

# Format code only
./scripts/biome.sh format

# Lint code only
./scripts/biome.sh lint
```

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
│   └── typescript-config/ # TypeScript configurations
├── scripts/
│   └── biome.sh        # Biome utility script
├── biome.json          # Biome configuration
└── turbo.json          # Turborepo configuration
```

## Development

Each app can be developed independently:

```bash
# Mobile app
cd apps/mobile && bun run dev

# Dashboard
cd apps/dashboard && bun run dev

# Web app
cd apps/web && bun run dev

# Server
cd apps/server && bun run dev
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
