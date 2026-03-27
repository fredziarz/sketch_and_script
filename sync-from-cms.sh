#!/bin/bash

# ============================================
# Sync CMS Projects to Dev Site
# ============================================
# This script copies new projects from CMS to dev site
# Run after creating projects in CMS

CMS_DIR="/home/michal/Documents/sketch_and_script_cms"
DEV_DIR="/home/michal/Documents/sketch_and_script"

echo "🔄 Syncing projects from CMS to Dev Site..."
echo ""

# Check if CMS directory exists
if [ ! -d "$CMS_DIR" ]; then
    echo "❌ Error: CMS directory not found at $CMS_DIR"
    exit 1
fi

# 1. Sync projects.json
echo "📋 Syncing projects.json..."
if [ -f "$CMS_DIR/data/projects.json" ]; then
    cp -v "$CMS_DIR/data/projects.json" "$DEV_DIR/data/projects.json"
    echo "   ✅ Synced projects.json"
else
    echo "   ⚠️  No projects.json found in CMS"
fi

# 2. Sync individual project JSON files
echo ""
echo "📄 Syncing project data files..."
if [ -d "$CMS_DIR/data" ]; then
    for json_file in "$CMS_DIR/data"/*.json; do
        if [ -f "$json_file" ] && [ "$(basename "$json_file")" != "projects.json" ]; then
            filename=$(basename "$json_file")
            cp -v "$json_file" "$DEV_DIR/data/$filename"
            echo "   ✅ Synced $filename"
        fi
    done
else
    echo "   ⚠️  No data directory in CMS"
fi

# 3. Sync project HTML files
echo ""
echo "📝 Syncing project HTML files..."
if [ -d "$CMS_DIR/projects" ]; then
    for html_file in "$CMS_DIR/projects"/*.html; do
        if [ -f "$html_file" ]; then
            filename=$(basename "$html_file")
            cp -v "$html_file" "$DEV_DIR/projects/$filename"
            echo "   ✅ Synced $filename"
        fi
    done
else
    echo "   ⚠️  No projects directory in CMS"
fi

# 4. Sync images
echo ""
echo "🖼️  Syncing project images..."
if [ -d "$CMS_DIR/images" ]; then
    # Create images directory if it doesn't exist
    mkdir -p "$DEV_DIR/images"
    
    # Sync all project image folders
    for img_folder in "$CMS_DIR/images"/*; do
        if [ -d "$img_folder" ]; then
            folder_name=$(basename "$img_folder")
            
            # Skip common icon/static files
            if [[ "$folder_name" != "archive" ]] && [[ "$folder_name" != "icons" ]]; then
                echo "   📁 Syncing $folder_name..."
                mkdir -p "$DEV_DIR/images/$folder_name"
                cp -rv "$img_folder"/* "$DEV_DIR/images/$folder_name/"
                echo "   ✅ Synced $folder_name images"
            fi
        fi
    done
else
    echo "   ⚠️  No images directory in CMS"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Sync complete!"
echo ""
echo "📊 Summary:"
echo "   • Projects data synced from CMS"
echo "   • HTML files synced to projects/"
echo "   • Images synced to images/"
echo ""
echo "Next steps:"
echo "   1. Review changes: git status"
echo "   2. Test on dev: http://localhost:8000"
echo "   3. Commit: git add . && git commit -m 'feat: Add new project'"
echo "   4. Push: git push origin dev"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
