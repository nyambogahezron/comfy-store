# Cleanup script for repo
#!/bin/bash


# Remove node_modules directories
echo "Removing node_modules directories..."
find . -name "node_modules" -type d -exec rm -rf {} +


# Remove .turbo directories
echo "Removing .turbo directories..."
find . -name ".turbo" -type d -exec rm -rf {} +

# Remove .next directories
echo "Removing .next directories..."
find . -name ".next" -type d -exec rm -rf {} +

# Remove .cache directories
echo "Removing .cache directories..."
find . -name ".cache" -type d -exec rm -rf {} +

# Remove dist directories
echo "Removing dist directories..."
find . -name "dist" -type d -exec rm -rf {} +


# Remove  logs
echo "Removing log files..."
find . -name "*.log" -type f -exec rm -f {} +

# Remove coverage directories
echo "Removing coverage directories..."
find . -name "coverage" -type d -exec rm -rf {} +


# remove lock files 
echo "Removing lock files..."
find . -name "package-lock.json" -type f -exec rm -f {} +
find . -name "yarn.lock" -type f -exec rm -f {} +
find . -name "pnpm-lock.yaml" -type f -exec rm -f {} +
find . -name "bun.lock" -type f -exec rm -f {} +