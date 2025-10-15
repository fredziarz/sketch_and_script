# 🎛️ Development Workflow - Quick Reference

## Your "On/Off Switch" for the Website

This setup gives you **two separate workspaces**:

| Workspace | Status | What It Does |
|-----------|--------|--------------|
| **`dev` branch** | 🔒 Private | Where you add projects, test, experiment |
| **`main` branch** | 🌐 Public | What's live on www.sketchandscript.pl |

**The website is ALWAYS "on"** - but visitors only see what's on the `main` branch.

---

## 🚀 Quick Start

### **Daily Work: Adding New Content**

```bash
# 1. Make sure you're on dev branch
git checkout dev

# 2. Add your projects, edit files, etc.
# (Use your IDE to edit HTML, add images, etc.)

# 3. Test locally
./start-local-server.sh
# Open browser: http://localhost:8000

# 4. Save your work
git add .
git commit -m "Add new project"

# ✅ Your changes are saved but NOT published yet!
```

### **Publishing: Going Live**

```bash
# When you're ready to publish everything:
./publish.sh

# That's it! ✨
# The script handles everything automatically
```

---

## 📝 Step-by-Step Example

### **Example: Adding a New Architecture Project**

```bash
# Step 1: Start in dev branch
git checkout dev

# Step 2: Copy project template
cp projects/architecture-project-1.html projects/architecture-project-10.html

# Step 3: Edit the new project file
# (Open in your IDE and customize)

# Step 4: Add project images
# Copy images to: images/architecture/project-10/

# Step 5: Test locally
./start-local-server.sh
# Visit: http://localhost:8000/projects/architecture-project-10.html
# Check: Does it look good? Images loading? Links working?
# Press Ctrl+C to stop server

# Step 6: Save your work
git add .
git commit -m "Add architecture project 10: Modern Villa"

# Step 7: Publish when ready
./publish.sh
# Confirms, then publishes to live site!

# ✅ Done! Live in 2-3 minutes at www.sketchandscript.pl
```

---

## 🛠️ Helpful Scripts

### **`./start-local-server.sh`**
Starts a local web server so you can test your site.
- Visit: http://localhost:8000
- Press `Ctrl+C` to stop

### **`./publish.sh`**
Publishes your dev changes to the live website.
- Checks for uncommitted changes
- Merges dev → main
- Pushes to GitHub
- Returns you to dev branch

---

## 🎯 Common Tasks

### **Check Which Branch You're On**
```bash
git branch
# The one with * is your current branch
```

### **See What You Changed**
```bash
git status
```

### **Undo Changes (Before Committing)**
```bash
# Undo changes to one file
git checkout filename.html

# Undo ALL changes
git checkout .
```

### **Work on Multiple Projects at Once**
```bash
# Create a feature branch from dev
git checkout dev
git checkout -b feature/new-gallery

# Work on it...
git add .
git commit -m "New gallery feature"

# Merge back when ready
git checkout dev
git merge feature/new-gallery

# Then publish
./publish.sh
```

---

## 🚨 "Emergency" Scenarios

### **Hide the Site Temporarily (Maintenance Mode)**

```bash
# Create a maintenance page on main
git checkout main

# Create simple placeholder
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Maintenance</title>
    <style>
        body {
            font-family: 'PT Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container { max-width: 600px; padding: 2rem; }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Under Maintenance</h1>
        <p>We're making some updates to bring you an even better experience.</p>
        <p>Check back soon!</p>
    </div>
</body>
</html>
EOF

git add index.html
git commit -m "Maintenance mode"
git push origin main

# ✅ Site now shows maintenance page

# Later, restore from dev:
git checkout dev -- index.html
git add index.html
git commit -m "Restore live site"
git push origin main
```

### **Fix Something on Live Site RIGHT NOW**

```bash
# Work directly on main for urgent fixes
git checkout main

# Fix the issue...
git add .
git commit -m "Urgent fix: broken contact form"
git push origin main

# ✅ Fixed live site immediately

# Sync the fix back to dev
git checkout dev
git merge main
```

---

## 💡 Pro Tips

1. **Always work in `dev` first** - only go to `main` when publishing
2. **Test locally before publishing** - use `./start-local-server.sh`
3. **Commit often** - small commits are easier to manage
4. **Use descriptive commit messages** - "Add project 10" not "update"
5. **Keep `main` stable** - never experiment there

---

## 📊 Visual Workflow

```
┌─────────────────────────────────────┐
│  DEV BRANCH (Your Workshop)         │
│  - Add projects                     │
│  - Experiment                       │
│  - Test locally                     │
│  - Make mistakes safely             │
└──────────────┬──────────────────────┘
               │
               │ Ready to publish?
               │ Run: ./publish.sh
               │
               ▼
┌─────────────────────────────────────┐
│  MAIN BRANCH (Live Website)         │
│  🌐 www.sketchandscript.pl          │
│  - Stable, tested content           │
│  - Public-facing                    │
│  - Auto-deployed by GitHub Pages    │
└─────────────────────────────────────┘
```

---

## ❓ FAQ

**Q: Can I work on main directly?**
A: Yes, but not recommended. Main should only have stable, tested content.

**Q: What if I mess up?**
A: In dev? Just undo with `git checkout .` or `git reset --hard HEAD`
   In main? Restore from backup or previous commit.

**Q: How do I see what's different between dev and main?**
A: `git diff main..dev`

**Q: Can I have multiple people working on this?**
A: Yes! But you'd need to push dev to GitHub and coordinate changes.

**Q: What if the publish script fails?**
A: You can always publish manually:
```bash
git checkout main
git merge dev
git push origin main
git checkout dev
```

---

**For detailed documentation:** See `docs-private/DEVELOPMENT_WORKFLOW.md`

**Last Updated:** October 15, 2025

