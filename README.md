# CMS - Sketch & Script

Browser CMS for the portfolio at `sketch_and_script`. Generated HTML must match main-site templates.

## Start

```bash
cd /home/michal/Documents/sketch_and_script
./start-both-servers.sh
```

- CMS: http://localhost:8080
- Dev site: http://localhost:8000

## Publish flow

1. Create project in CMS (Architecture / Coding / Game)
2. Images upload to `images/{slug}/` on GitHub
3. HTML uploads to `projects/{slug}.html`
4. **Architecture only:** entry merged into `data/projects.json` (portfolio slider reads this)

## Filename conventions

| Type | Example | Registry |
|------|---------|----------|
| Architecture | `lake-apartments.html` | `data/projects.json` |
| Coding | `coding-project-3.html` | manual card in `coding.html` |
| Game | `coding-project-game-2.html` | manual card in `coding.html` |

## Generated architecture pages include

- `css/architecture-gallery.css`
- `js/architecture-lightbox.js`
- `js/keyboard-accessibility.js`
- Skip link, lightbox, hero overlay layout (mir.no style)

## Ponytail rule

See `.cursor/rules/ponytail.mdc` — keep generator in sync with main repo templates, no duplicate JSON files per project.
