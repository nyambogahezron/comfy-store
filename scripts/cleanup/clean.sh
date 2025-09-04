#!/bin/bash

# Cleanup script for monorepo
# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Function to display header
show_header() {
    clear
    echo -e "${BOLD}${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                    🧹 Cleanup Manager                        ║"
    echo "║                   Clean your workspace                       ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Function to show options
show_options() {
    echo -e "${BOLD}Select what you want to clean:${NC}\n"
    echo -e "${RED}1${NC}. Delete all node_modules directories"
    echo -e "${YELLOW}2${NC}. Delete all dist directories"
    echo -e "${BLUE}3${NC}. Delete .turbo cache directories"
    echo -e "${PURPLE}4${NC}. Delete .next build directories"
    echo -e "${CYAN}5${NC}. Delete build directories"
    echo -e "${GREEN}6${NC}. Delete coverage directories"
    echo -e "${YELLOW}7${NC}. Delete log files (*.log, logs/)"
    echo -e "${RED}8${NC}. Delete temporary files and directories"
    echo -e "\n${GREEN}a${NC}. Clean all"
    echo -e "${RED}q${NC}. Quit"
    echo ""
}

# Function to calculate directory size
calculate_size() {
    local path="$1"
    if [[ -d "$path" ]]; then
        du -sh "$path" 2>/dev/null | cut -f1
    else
        echo "0"
    fi
}

# Function to find and confirm deletion
find_and_confirm() {
    local pattern="$1"
    local description="$2"
    local color="$3"
    
    echo -e "\n${BOLD}${color}Searching for $description...${NC}"
    
    local paths=()
    if [[ "$pattern" == "*.log" ]]; then
        # Find log files
        while IFS= read -r -d '' file; do
            paths+=("$file")
        done < <(find . -name "*.log" -type f -print0 2>/dev/null)
    else
        # Find directories, excluding those inside node_modules for build patterns
        local build_patterns=("dist" ".next" "build" ".turbo")
        local cache_patterns=("coverage" "tmp")
        local pattern_name="${pattern#**/}"
        
        if [[ " ${build_patterns[@]} " =~ " ${pattern_name} " ]] || [[ " ${cache_patterns[@]} " =~ " ${pattern_name} " ]]; then
            # Exclude node_modules for build-related and cache patterns
            while IFS= read -r -d '' dir; do
                if [[ "$dir" != *"node_modules"* ]]; then
                    paths+=("$dir")
                fi
            done < <(find . -name "${pattern_name}" -type d -print0 2>/dev/null)
        else
            # Regular search for non-build patterns (like node_modules itself)
            while IFS= read -r -d '' dir; do
                paths+=("$dir")
            done < <(find . -name "${pattern_name}" -type d -print0 2>/dev/null)
        fi
    fi
    
    if [[ ${#paths[@]} -eq 0 ]]; then
        echo -e "${YELLOW}No $description found.${NC}"
        return 0
    fi
    
    echo -e "\n${YELLOW}Found ${#paths[@]} items to delete:${NC}"
    
    local total_size=0
    local count=0
    for path in "${paths[@]}"; do
        if [[ $count -lt 10 ]]; then
            local size=$(calculate_size "$path")
            echo "  $path ($size)"
        fi
        ((count++))
    done
    
    if [[ ${#paths[@]} -gt 10 ]]; then
        echo "  ... and $((${#paths[@]} - 10)) more"
    fi
    
    echo ""
    read -p "Are you sure you want to delete these $description? (y/N): " -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}Deleting $description...${NC}"
        local deleted=0
        for path in "${paths[@]}"; do
            if [[ -e "$path" ]]; then
                rm -rf "$path" && ((deleted++))
            fi
        done
        echo -e "${GREEN}✓ Deleted $deleted $description items${NC}"
        return $deleted
    else
        echo -e "${YELLOW}Skipped $description${NC}"
        return 0
    fi
}

# Function to clean selected items
clean_selected() {
    local selections=("$@")
    local total_deleted=0
    
    for selection in "${selections[@]}"; do
        case $selection in
            1)
                result=$(find_and_confirm "**/node_modules" "node_modules directories" "$RED")
                total_deleted=$((total_deleted + result))
                ;;
            2)
                result=$(find_and_confirm "**/dist" "dist directories" "$YELLOW")
                total_deleted=$((total_deleted + result))
                ;;
            3)
                result=$(find_and_confirm "**/.turbo" ".turbo cache directories" "$BLUE")
                total_deleted=$((total_deleted + result))
                ;;
            4)
                result=$(find_and_confirm "**/.next" ".next build directories" "$PURPLE")
                total_deleted=$((total_deleted + result))
                ;;
            5)
                result=$(find_and_confirm "**/build" "build directories" "$CYAN")
                total_deleted=$((total_deleted + result))
                ;;
            6)
                result=$(find_and_confirm "**/coverage" "coverage directories" "$GREEN")
                total_deleted=$((total_deleted + result))
                ;;
            7)
                result=$(find_and_confirm "*.log" "log files" "$YELLOW")
                total_deleted=$((total_deleted + result))
                ;;
            8)
                result=$(find_and_confirm "**/tmp" "temporary directories" "$RED")
                total_deleted=$((total_deleted + result))
                ;;
        esac
    done
    
    if [[ $total_deleted -gt 0 ]]; then
        echo -e "\n${BOLD}${GREEN}✨ Cleanup completed!${NC}"
        echo -e "${GREEN}Total items deleted: $total_deleted${NC}"
    else
        echo -e "\n${YELLOW}No items were deleted.${NC}"
    fi
}

# Main execution
main() {
    show_header
    
    while true; do
        show_options
        
        read -p "Enter your choice (or multiple like \"1,3,5\"): " input
        
        case $input in
            q|Q)
                echo -e "${YELLOW}Goodbye! 👋${NC}"
                exit 0
                ;;
            a|A)
                clean_selected 1 2 3 4 5 6 7 8
                ;;
            *[0-9]*)
                # Parse comma-separated input
                IFS=',' read -ra selections <<< "$input"
                # Clean up whitespace and validate
                clean_selections=()
                for selection in "${selections[@]}"; do
                    selection=$(echo "$selection" | tr -d ' ')
                    if [[ "$selection" =~ ^[1-8]$ ]]; then
                        clean_selections+=("$selection")
                    fi
                done
                
                if [[ ${#clean_selections[@]} -gt 0 ]]; then
                    clean_selected "${clean_selections[@]}"
                else
                    echo -e "${RED}Invalid selection. Please try again.${NC}"
                    sleep 2
                    show_header
                    continue
                fi
                ;;
            *)
                echo -e "${RED}Invalid selection. Please try again.${NC}"
                sleep 2
                show_header
                continue
                ;;
        esac
        
        echo ""
        read -p "Do you want to clean something else? (y/N): " -r
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}Goodbye! 👋${NC}"
            break
        fi
        
        show_header
    done
}

# Handle Ctrl+C gracefully
trap 'echo -e "\n${YELLOW}Cleanup cancelled. Goodbye! 👋${NC}"; exit 0' INT

# Run main function
main
