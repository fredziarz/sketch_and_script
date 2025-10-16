# Sketch & Script

Portfolio website showcasing architecture and coding projects.

## Quick Start

**Local Development:**
```bash
./start-both-servers.sh
```

Opens:
- CMS: http://localhost:8080
- Dev Site: http://localhost:8000

**Deploy:**
```bash
./publish.sh
```

## Structure

```
sketchAndScript/              # Website (dev branch)
├── index.html               # Homepage
├── architecture.html        # Architecture projects
├── coding.html              # Coding projects
├── css/                     # Styles
├── js/                      # Scripts
├── images/                  # Media
├── projects/                # Project pages
└── templates/               # Project templates

sketchAndScript-cms/         # CMS (cms branch - separate directory)
└── index.html               # Manage projects here
```

## Workflow

1. **Add Project:** Open CMS → Create → Fill form → Save
2. **Preview:** CMS → Click "Dev Site" button → See changes
3. **Publish:** Run `./publish.sh` when ready

That's it!
