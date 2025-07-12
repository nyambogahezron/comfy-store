// Bun configuration for the monorepo
import { defineConfig } from 'bun';

export default defineConfig({
	entrypoints: ['./apps/*/src/index.ts', './packages/*/src/index.ts'],
	outdir: './dist',
	target: 'node',
	format: 'esm',
});
