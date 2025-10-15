#!/bin/bash
# Publish Website to Live
# This merges your dev work into main and pushes to GitHub

set -e  # Exit on any error

echo "🚀 Publishing Website to Live"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we have uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes!"
    echo ""
    git status -s
    echo ""
    read -p "Do you want to commit them now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        echo "✅ Changes committed to dev"
    else
        echo "❌ Aborting. Please commit or stash your changes first."
        exit 1
    fi
fi

# Make sure we're on dev branch
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "dev" ]]; then
    echo "⚠️  You're on '$current_branch' branch, not 'dev'"
    read -p "Switch to dev branch? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout dev
    else
        echo "❌ Aborting. Please switch to dev branch first."
        exit 1
    fi
fi

echo "📋 Current dev branch status:"
git log --oneline -3
echo ""

read -p "⚠️  This will publish to www.sketchandscript.pl. Continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publishing cancelled."
    exit 1
fi

echo ""
echo "1️⃣  Switching to main branch..."
git checkout main

echo "2️⃣  Merging dev into main..."
git merge dev -m "Publish: merge dev to main"

echo "3️⃣  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ SUCCESS! Your site is now LIVE! 🎉"
echo ""
echo "   🌐 www.sketchandscript.pl"
echo ""
echo "   ⏱️  GitHub Pages will update in 2-3 minutes"
echo ""
echo "Switching back to dev branch..."
git checkout dev

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Done! You're back on dev branch and ready to work."

