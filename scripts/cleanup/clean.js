#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
};

class CleanupManager {
	constructor() {
		this.rootDir = process.cwd();
		this.cleanupOptions = [
			{
				key: '1',
				name: 'node_modules',
				description: 'Delete all node_modules directories',
				pattern: '**/node_modules',
				color: colors.red,
			},
			{
				key: '2',
				name: 'dist files',
				description: 'Delete all dist directories',
				pattern: '**/dist',
				color: colors.yellow,
			},
			{
				key: '3',
				name: '.turbo cache',
				description: 'Delete .turbo cache directories',
				pattern: '**/.turbo',
				color: colors.blue,
			},
			{
				key: '4',
				name: '.next builds',
				description: 'Delete .next build directories',
				pattern: '**/.next',
				color: colors.magenta,
			},
			{
				key: '5',
				name: 'build directories',
				description: 'Delete build directories',
				pattern: '**/build',
				color: colors.cyan,
			},
			{
				key: '6',
				name: 'coverage reports',
				description: 'Delete coverage directories',
				pattern: '**/coverage',
				color: colors.green,
			},
			{
				key: '7',
				name: 'logs',
				description: 'Delete log files (*.log, logs/)',
				pattern: '**/*.log',
				color: colors.yellow,
			},
			{
				key: '8',
				name: 'temp files',
				description: 'Delete temporary files and directories',
				pattern: '**/tmp',
				color: colors.red,
			},
		];
	}

	displayHeader() {
		console.log(`${colors.bright}${colors.blue}
╔═══════════════════════════════════════════════════════════════╗
║                    🧹 Cleanup Manager                        ║
║                   Clean your workspace                       ║
╚═══════════════════════════════════════════════════════════════╝
${colors.reset}`);
	}

	displayOptions() {
		console.log(
			`${colors.bright}Select what you want to clean:${colors.reset}\n`
		);

		this.cleanupOptions.forEach((option) => {
			console.log(
				`${option.color}${option.key}${colors.reset}. ${option.description}`
			);
		});

		console.log(`\n${colors.green}a${colors.reset}. Clean all`);
		console.log(`${colors.red}q${colors.reset}. Quit\n`);
	}

	findDirectories(pattern) {
		try {
			// Use find command to locate directories/files matching the pattern
			const command = pattern.includes('*.log')
				? `find . -name "*.log" -type f 2>/dev/null || true`
				: `find . -name "${pattern.replace('**/', '')}" -type d 2>/dev/null || true`;

			const result = execSync(command, {
				encoding: 'utf8',
				cwd: this.rootDir,
			});

			const paths = result
				.trim()
				.split('\n')
				.filter((line) => line && line !== '.');

			// Exclude paths inside node_modules for build-related patterns
			const buildPatterns = ['dist', '.next', 'build', '.turbo'];
			const cachePatterns = ['coverage', 'tmp'];
			const patternName = pattern.replace('**/', '');

			if (
				buildPatterns.includes(patternName) ||
				cachePatterns.includes(patternName)
			) {
				return paths.filter((path) => !path.includes('node_modules'));
			}

			// Also exclude node_modules for log files
			if (pattern.includes('*.log')) {
				return paths.filter((path) => !path.includes('node_modules'));
			}

			return paths;
		} catch (error) {
			return [];
		}
	}

	calculateSize(paths) {
		let totalSize = 0;
		paths.forEach((dirPath) => {
			try {
				const fullPath = path.join(this.rootDir, dirPath);
				if (fs.existsSync(fullPath)) {
					const command = `du -sb "${fullPath}" 2>/dev/null | cut -f1`;
					const size = execSync(command, { encoding: 'utf8' }).trim();
					totalSize += parseInt(size) || 0;
				}
			} catch (error) {
				// Ignore errors for individual directories
			}
		});
		return totalSize;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	async confirmDeletion(paths, optionName) {
		if (paths.length === 0) {
			console.log(`${colors.yellow}No ${optionName} found.${colors.reset}`);
			return false;
		}

		const totalSize = this.calculateSize(paths);

		console.log(
			`\n${colors.yellow}Found ${paths.length} items to delete:${colors.reset}`
		);
		paths.slice(0, 10).forEach((p) => console.log(`  ${p}`));
		if (paths.length > 10) {
			console.log(`  ... and ${paths.length - 10} more`);
		}

		console.log(
			`${colors.bright}Total size: ${this.formatBytes(totalSize)}${colors.reset}`
		);

		const answer = await this.getUserInput(
			`\n${colors.red}Are you sure you want to delete these ${optionName}? (y/N): ${colors.reset}`
		);
		return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
	}

	deletePaths(paths) {
		let deleted = 0;
		paths.forEach((dirPath) => {
			try {
				const fullPath = path.join(this.rootDir, dirPath);
				if (fs.existsSync(fullPath)) {
					execSync(`rm -rf "${fullPath}"`, { cwd: this.rootDir });
					deleted++;
				}
			} catch (error) {
				console.log(
					`${colors.red}Error deleting ${dirPath}: ${error.message}${colors.reset}`
				);
			}
		});
		return deleted;
	}

	getUserInput(prompt) {
		return new Promise((resolve) => {
			process.stdout.write(prompt);
			process.stdin.once('data', (data) => {
				resolve(data.toString().trim());
			});
		});
	}

	async cleanSelected(selections) {
		let totalDeleted = 0;
		let totalSizeFreed = 0;

		for (const selection of selections) {
			const option = this.cleanupOptions.find((opt) => opt.key === selection);
			if (!option) continue;

			console.log(
				`\n${colors.bright}${option.color}Searching for ${option.name}...${colors.reset}`
			);

			const paths = this.findDirectories(option.pattern);

			if (paths.length === 0) {
				console.log(`${colors.yellow}No ${option.name} found.${colors.reset}`);
				continue;
			}

			const sizeBeforeDelete = this.calculateSize(paths);

			if (await this.confirmDeletion(paths, option.name)) {
				console.log(`${colors.green}Deleting ${option.name}...${colors.reset}`);
				const deleted = this.deletePaths(paths);
				totalDeleted += deleted;
				totalSizeFreed += sizeBeforeDelete;
				console.log(
					`${colors.green}✓ Deleted ${deleted} ${option.name} items${colors.reset}`
				);
			} else {
				console.log(`${colors.yellow}Skipped ${option.name}${colors.reset}`);
			}
		}

		if (totalDeleted > 0) {
			console.log(
				`\n${colors.bright}${colors.green}✨ Cleanup completed!${colors.reset}`
			);
			console.log(
				`${colors.green}Total items deleted: ${totalDeleted}${colors.reset}`
			);
			console.log(
				`${colors.green}Total space freed: ${this.formatBytes(totalSizeFreed)}${colors.reset}`
			);
		} else {
			console.log(`\n${colors.yellow}No items were deleted.${colors.reset}`);
		}
	}

	async run() {
		console.clear();
		this.displayHeader();

		// Enable raw mode for input
		process.stdin.setRawMode(false);
		process.stdin.resume();
		process.stdin.setEncoding('utf8');

		while (true) {
			this.displayOptions();

			const input = await this.getUserInput(
				`${colors.bright}Enter your choice (or multiple like "1,3,5"): ${colors.reset}`
			);

			if (input.toLowerCase() === 'q') {
				console.log(`${colors.yellow}Goodbye! 👋${colors.reset}`);
				process.exit(0);
			}

			if (input.toLowerCase() === 'a') {
				const allKeys = this.cleanupOptions.map((opt) => opt.key);
				await this.cleanSelected(allKeys);
			} else {
				const selections = input
					.split(',')
					.map((s) => s.trim())
					.filter((s) => s);
				if (selections.length > 0) {
					await this.cleanSelected(selections);
				} else {
					console.log(
						`${colors.red}Invalid selection. Please try again.${colors.reset}`
					);
					continue;
				}
			}

			const continueChoice = await this.getUserInput(
				`\n${colors.blue}Do you want to clean something else? (y/N): ${colors.reset}`
			);
			if (
				continueChoice.toLowerCase() !== 'y' &&
				continueChoice.toLowerCase() !== 'yes'
			) {
				console.log(`${colors.yellow}Goodbye! 👋${colors.reset}`);
				break;
			}

			console.clear();
			this.displayHeader();
		}

		process.exit(0);
	}
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
	console.log(
		`\n${colors.yellow}Cleanup cancelled. Goodbye! 👋${colors.reset}`
	);
	process.exit(0);
});

// Run the cleanup manager
if (require.main === module) {
	const manager = new CleanupManager();
	manager.run().catch((error) => {
		console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
		process.exit(1);
	});
}

module.exports = CleanupManager;
