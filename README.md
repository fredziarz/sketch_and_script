# Sketch & Script

Portfolio website showcasing architecture and coding projects.

## Quick Start

**Start:**
```bash
./start-both-servers.sh
```
- CMS: http://localhost:8080
- Dev: http://localhost:8000

**Stop:**
```bash
./stop-servers.sh
```

**Deploy:**
```bash
./publish.sh
```

## Structure

```
sketchAndScript/              # Website (dev branch)
├── start-both-servers.sh    # Start CMS + Dev
├── stop-servers.sh          # Stop servers
├── publish.sh               # Deploy to production
└── README.md                # This file

sketchAndScript-cms/         # CMS (cms branch)
└── index.html               # Manage projects
```

## Workflow

1. **Start** → `./start-both-servers.sh`
2. **Create** → Open CMS, add projects
3. **Preview** → Click "Dev Site" button
4. **Deploy** → `./publish.sh`

That's it!
