#!/bin/bash

# Biome utility script for the entire repository

case "$1" in
    "check")
        echo "Running Biome check across all packages..."
        bunx @biomejs/biome check .
        ;;
    "fix")
        echo "Running Biome check with fixes..."
        bunx @biomejs/biome check --write .
        ;;
    "unsafe-fix")
        echo "Running Biome check with unsafe fixes..."
        bunx @biomejs/biome check --write --unsafe .
        ;;
    "format")
        echo "Formatting code with Biome..."
        bunx @biomejs/biome format --write .
        ;;
    "lint")
        echo "Linting code with Biome..."
        bunx @biomejs/biome lint .
        ;;
    *)
        echo "Usage: $0 {check|fix|unsafe-fix|format|lint}"
        echo ""
        echo "Commands:"
        echo "  check       - Check for issues without fixing"
        echo "  fix         - Fix safe issues automatically"
        echo "  unsafe-fix  - Fix all issues including unsafe ones"
        echo "  format      - Format code"
        echo "  lint        - Lint code only"
        exit 1
        ;;
esac
