# CMS - Sketch & Script

Content management for your portfolio.

## Usage

**Start (Automatic):**
```bash
# From main directory:
cd /home/michal/Documents/sketchAndScript
./start-both-servers.sh
```

**Start (Manual):**
```bash
cd /home/michal/Documents/sketchAndScript-cms
python3 -m http.server 8080
```

Open: http://localhost:8080

## Features

- **Create Projects** - Architecture, Coding, or Games
- **Upload Media** - Images, files, code samples
- **Add Tags** - Categorize your work
- **Preview** - Click "Dev Site" to see changes locally
- **Export** - Download HTML files for production

## Quick Workflow

1. Open CMS
2. Click "New Project"
3. Fill form, upload files
4. Click "Generate HTML"
5. Copy files to main site
6. Click "Dev Site" to preview
7. Run `publish.sh` to deploy

## Data Storage

Projects saved in browser LocalStorage. Export regularly to back up.

## Buttons

- **🔧 Dev Site** → http://localhost:8000 (local preview)
- **🌐 Live Site** → https://www.sketchandscript.pl (production)

---

**Pro Tip:** Keep both servers running for seamless workflow!
