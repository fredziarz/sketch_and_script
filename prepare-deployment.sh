#!/bin/bash

# Prepare Sketch & Script Portfolio for GitHub Pages Deployment
# This script restructures the project for deployment to www.sketchandscript.pl

echo "=========================================="
echo "Sketch & Script - Deployment Preparation"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "starter-template" ] && [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the sketchAndScript directory"
    echo "   Expected to find either 'starter-template/' or website files at root"
    exit 1
fi

# Check if already restructured
if [ -f "index.html" ] && [ -f "CNAME" ] && [ ! -d "starter-template" ]; then
    echo "✅ Project already restructured for deployment!"
    echo ""
    echo "Current structure:"
    ls -1 | head -15
    echo ""
    echo "You're ready to deploy. Next steps:"
    echo "1. git init (if not done)"
    echo "2. git add ."
    echo "3. git commit -m 'Initial deployment'"
    echo "4. git remote add origin https://github.com/fredziarz/sketch_and_script.git"
    echo "5. git push -u origin main"
    echo ""
    exit 0
fi

# Restructure if starter-template exists
if [ -d "starter-template" ]; then
    echo "📁 Found starter-template directory"
    echo "🔄 Restructuring project for GitHub Pages..."
    echo ""
    
    # Create backup
    echo "Creating backup..."
    if [ ! -d ".backup" ]; then
        cp -r starter-template .backup
        echo "✅ Backup created at .backup/"
    fi
    
    # Move files to root
    echo "Moving website files to root..."
    
    # Move all visible files
    mv starter-template/* . 2>/dev/null
    
    # Move hidden files (like .htaccess if any)
    shopt -s dotglob
    for file in starter-template/.*; do
        if [ -f "$file" ]; then
            mv "$file" . 2>/dev/null
        fi
    done
    shopt -u dotglob
    
    # Remove empty starter-template directory
    if [ -d "starter-template" ]; then
        if [ -z "$(ls -A starter-template)" ]; then
            rmdir starter-template
            echo "✅ Removed empty starter-template directory"
        else
            echo "⚠️  Warning: starter-template not empty, keeping it"
        fi
    fi
    
    echo ""
fi

# Verify CNAME file
echo "Checking CNAME file..."
if [ -f "CNAME" ]; then
    DOMAIN=$(cat CNAME)
    if [ "$DOMAIN" == "www.sketchandscript.pl" ]; then
        echo "✅ CNAME file correct: $DOMAIN"
    else
        echo "⚠️  CNAME contains: $DOMAIN"
        echo "   Expected: www.sketchandscript.pl"
        read -p "Update CNAME file? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "www.sketchandscript.pl" > CNAME
            echo "✅ CNAME file updated"
        fi
    fi
else
    echo "Creating CNAME file..."
    echo "www.sketchandscript.pl" > CNAME
    echo "✅ CNAME file created"
fi

echo ""
echo "Verifying project structure..."
echo ""

# Check critical files
MISSING_FILES=()

echo "Critical files:"
for file in index.html architecture.html coding.html robots.txt sitemap.xml CNAME; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file MISSING!"
        MISSING_FILES+=("$file")
    fi
done

echo ""
echo "Directories:"
for dir in css js images projects templates; do
    if [ -d "$dir" ]; then
        file_count=$(find "$dir" -type f | wc -l)
        echo "  ✅ $dir/ ($file_count files)"
    else
        echo "  ❌ $dir/ MISSING!"
        MISSING_FILES+=("$dir/")
    fi
done

echo ""
echo "Documentation:"
for doc in README.md DEPLOYMENT.md PROJECT_MANAGEMENT_GUIDE.md; do
    if [ -f "$doc" ]; then
        echo "  ✅ $doc"
    else
        echo "  ⚠️  $doc not found"
    fi
done

# Final status
echo ""
echo "=========================================="
if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "✅ Project structure is ready for deployment!"
    echo "=========================================="
    echo ""
    echo "📦 Project Summary:"
    echo "   - HTML pages: $(find . -maxdepth 1 -name '*.html' | wc -l)"
    echo "   - CSS files: $(find css -name '*.css' 2>/dev/null | wc -l)"
    echo "   - JS files: $(find js -name '*.js' 2>/dev/null | wc -l)"
    echo "   - Images: $(find images -type f 2>/dev/null | wc -l)"
    echo "   - Projects: $(find projects -name '*.html' 2>/dev/null | wc -l)"
    echo ""
    echo "🚀 Next Steps:"
    echo ""
    echo "1. Initialize Git:"
    echo "   git init"
    echo ""
    echo "2. Stage all files:"
    echo "   git add ."
    echo ""
    echo "3. Create initial commit:"
    echo "   git commit -m 'Initial deployment for www.sketchandscript.pl'"
    echo ""
    echo "4. Add GitHub remote:"
    echo "   git remote add origin https://github.com/fredziarz/sketch_and_script.git"
    echo ""
    echo "5. Push to GitHub:"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "6. Configure GitHub Pages:"
    echo "   → https://github.com/fredziarz/sketch_and_script/settings/pages"
    echo "   → Source: main branch, / (root) folder"
    echo "   → Custom domain: www.sketchandscript.pl"
    echo ""
    echo "7. Configure DNS at your registrar:"
    echo "   See DEPLOYMENT.md for detailed instructions"
    echo ""
    echo "📚 Next: Read DEPLOYMENT.md for complete deployment instructions"
    echo ""
else
    echo "⚠️  Warning: Missing files detected!"
    echo "=========================================="
    echo ""
    echo "Missing files/directories:"
    for item in "${MISSING_FILES[@]}"; do
        echo "  - $item"
    done
    echo ""
    echo "Please ensure all files are present before deploying."
    echo "Check the starter-template backup if needed: .backup/"
    echo ""
    exit 1
fi

# Offer to initialize git
echo "Would you like to initialize Git and prepare for deployment now? (y/n)"
read -p "> " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -d ".git" ]; then
        echo "✅ Git already initialized"
    else
        echo "Initializing Git repository..."
        git init
        echo "✅ Git initialized"
    fi
    
    echo ""
    echo "Checking git status..."
    git status --short | head -20
    echo ""
    
    echo "Ready to add files. Run:"
    echo "  git add ."
    echo "  git commit -m 'Initial deployment for www.sketchandscript.pl'"
    echo ""
else
    echo "Skipping git initialization."
    echo "Run the git commands above when ready."
fi

echo ""
echo "=========================================="
echo "✅ Preparation Complete!"
echo "=========================================="

