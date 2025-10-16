# Sketch & Script

Portfolio website: architecture and coding projects.

**Live:** [www.sketchandscript.pl](https://www.sketchandscript.pl)

---

## Quick Start

### Start Development Environment

```bash
./start-both-servers.sh
```

Opens automatically:
- **CMS** → http://localhost:8080 (manage content)
- **Dev Site** → http://localhost:8000 (preview changes)

### Stop Servers

```bash
./stop-servers.sh
```

---

## Adding New Projects

### 1. Open CMS

Visit http://localhost:8080 (after running `./start-both-servers.sh`)

### 2. Create Project

Click **"New Project"** button, then choose type:
- **Architecture** - Building/interior design projects
- **Coding** - Web apps, QA projects
- **Game** - Interactive games and demos

### 3. Fill Form

**Required:**
- **Title** - Project name (e.g., "Modern Apartment Redesign")
- **Description** - What the project is about (2-3 sentences)
- **Year** - When it was completed
- **Category** - Project type (residential, web-app, game, etc.)

**Optional:**
- **Tags** - Keywords for filtering (e.g., "3D, visualization, interior")
- **Client** - Who it was for
- **Technologies** - Tools/languages used (for coding projects)

### 4. Add Media

**Images:**
- Click **"Add Image"**
- Select file from computer
- Add caption (optional)
- Images are converted to base64 and saved

**Files/Code:**
- For coding projects: upload source files, demos
- For games: include playable files or links
- Add descriptions for each file

### 5. Generate HTML

Click **"Generate HTML"** button at bottom

The CMS creates a complete project page in the correct format.

### 6. Copy HTML File

1. Click **"Download HTML"** (or copy from preview)
2. Save as `projects/[type]-project-[number].html`
   - Architecture: `architecture-project-10.html`
   - Coding: `coding-project-3.html`
   - Game: `coding-project-game-2.html`

### 7. Preview Changes

Click **"Dev Site"** button in CMS header to preview locally at http://localhost:8000

### 8. Deploy

When ready to publish:
```bash
./publish.sh
```

---

## CMS Features

### Projects List
- View all saved projects
- Edit existing projects
- Delete projects
- Search and filter

### Data Storage
- Projects saved in browser LocalStorage
- Automatic save on changes
- Export data for backup

### Preview Buttons
- **🔧 Dev Site** - Local preview on port 8000
- **🌐 Live Site** - Production website

### Templates
Each project type has optimized template:
- Architecture: Image gallery focus, light theme
- Coding: Technical details, code samples, dark theme
- Games: Embedded playables, screenshots

---

## Project Structure

```
sketchAndScript/              # Main website (dev branch)
├── start-both-servers.sh    # Start CMS + Dev
├── stop-servers.sh          # Stop servers
├── publish.sh               # Deploy to production
├── index.html               # Homepage
├── architecture.html        # Architecture portfolio
├── coding.html              # Coding portfolio
├── projects/                # Individual project pages
│   ├── architecture-project-1.html
│   ├── coding-project-1.html
│   └── coding-project-game-1.html
├── css/                     # Styles
├── js/                      # Scripts
└── images/                  # Media files

sketchAndScript-cms/         # CMS (cms branch)
├── index.html               # CMS interface
├── js/                      # CMS logic
│   ├── cms.js
│   └── modules/             # Data, forms, templates
└── css/                     # CMS styles
```

---

## Workflow Summary

```
1. ./start-both-servers.sh     ← Start everything
2. Open http://localhost:8080  ← Create project in CMS
3. Fill form, add images       ← Add content
4. Generate HTML               ← Create project page
5. Copy to projects/           ← Save file
6. Click "Dev Site"            ← Preview changes
7. ./publish.sh                ← Deploy when ready
8. ./stop-servers.sh           ← Stop servers
```

---

## Deployment

### Automatic Deploy

```bash
./publish.sh
```

This script:
1. Commits changes to dev branch
2. Merges to main branch
3. Pushes to GitHub
4. GitHub Pages deploys automatically (2-3 minutes)

### Manual Deploy

```bash
git add .
git commit -m "Add new project"
git push origin dev
# Merge to main and push
```

---

## Tips

### Adding Images
- Use high-quality images (1920px width recommended)
- CMS converts to base64 (no separate image files needed)
- Add descriptive captions for accessibility

### Project Numbers
- Check existing files in `projects/` folder
- Use next available number
- Format: `[type]-project-[number].html`

### Testing
- Always preview in Dev Site before deploying
- Check both mobile and desktop views
- Test navigation and links

### Backup
- Export data from CMS regularly
- Keep project files in version control
- LocalStorage is browser-specific

---

## Troubleshooting

**CMS not loading?**
- Run `./start-both-servers.sh` from main directory
- Check http://localhost:8080 in browser

**Port already in use?**
- Run `./stop-servers.sh` first
- Or: `pkill -f 'python3 -m http.server'`

**Images not showing?**
- Check file format (JPG, PNG, WebP)
- CMS handles conversion automatically

**Changes not visible on live site?**
- Wait 2-3 minutes after `./publish.sh`
- Hard refresh browser (Ctrl+Shift+R)

---

## Tech Stack

- **Frontend:** Pure HTML/CSS/JavaScript
- **CMS:** Browser-based, LocalStorage
- **Hosting:** GitHub Pages
- **Domain:** Custom DNS (sketchandscript.pl)
- **Dev Server:** Python http.server

---

## Contact

**Michał Wicherek**
- 🌐 [www.sketchandscript.pl](https://www.sketchandscript.pl)
- 📧 michalwicherek@gmail.com
- 💻 GitHub: [@fredziarz](https://github.com/fredziarz)

---

**Simple. Powerful. Elegant.** ✨
