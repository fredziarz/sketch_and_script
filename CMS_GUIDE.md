# CMS User Guide

**Complete workflow: Zero to Production**

---

## Quick Navigation

1. [Setup & Start](#setup--start)
2. [Create Project](#create-project)
3. [Fill Form](#fill-form)
4. [Add Media](#add-media)
5. [Generate HTML](#generate-html)
6. [File Naming](#file-naming-conventions)
7. [Add to Portfolio](#add-to-portfolio)
8. [Test & Deploy](#test--deploy)
9. [Troubleshooting](#troubleshooting)

---

## Setup & Start

### Prerequisites
- Git repository cloned
- Python 3 installed

### Start CMS
```bash
cd /home/michal/Documents/sketchAndScript
./start-both-servers.sh
```

**Opens automatically:**
- CMS: http://localhost:8080
- Dev Site: http://localhost:8000

### Stop
```bash
./stop-servers.sh
```

---

## Create Project

1. Open http://localhost:8080
2. Click **"New Project"**
3. Choose type:
   - **🏗️ Architecture** - Buildings, interiors
   - **💻 Coding** - Web apps, QA, tools
   - **🎮 Game** - Interactive projects

---

## Fill Form

### Required Fields

**Title** ⭐
- Project name (3-6 words)
- Examples: "Modern Apartment Redesign", "E-commerce Testing Suite"

**Description** ⭐
- Short (150-200 chars): Brief summary with key achievement
- Full (optional): 3-5 paragraphs with context, challenge, solution, results

**Year** ⭐
- Format: `2024`
- Use completion year

**Category** ⭐
- Architecture: Residential, Commercial, Interior, Renovation
- Coding: Web App, QA & Testing, Mobile, API, DevOps
- Game: 2D, 3D, Puzzle, Action, Educational

### Optional Fields

**Client**
- Examples: "Private Client", "ABC Corp", "Personal Project"

**Location** (Architecture)
- Format: "City, Country" or "City, Region"

**Technologies** (Coding/Game)
- Comma-separated: "Python, Selenium, pytest, Jenkins"
- List 3-8 technologies in order of importance

**Role**
- Examples: "Lead Architect", "QA Engineer", "Solo Developer"

**Duration**
- Format: "3 months", "6 weeks", "1 year"

---

## Add Media

### Upload to Media Library

**Step 1: Upload Images**
1. Go to **Media Library** in the sidebar (🖼️)
2. Click **"Upload Files"**
3. Select images from your computer
4. Wait for upload confirmation

**Supported Formats:**
- **Images:** JPG, PNG, WebP, GIF, SVG
- **Max size:** 10MB per file
- **Recommended:** 1920px width for project images

### Using the Image Picker 🆕

**When creating a new project**, you can now select images from your Media Library:

**Step 1: In any image field, look for the 🖼️ button**
- Featured Image Path → Single image picker
- Gallery Images → Multiple image picker
- Screenshots → Multiple image picker

**Step 2: Click the 🖼️ button**
- A modal opens showing all images from your Media Library
- For **single selection** (Featured Image): Click any image to select it
- For **multiple selection** (Gallery/Screenshots): Click multiple images to select them

**Step 3: Click "Insert Selected"**
- The image data will be automatically inserted into the form field
- For multiple images, they're inserted as comma-separated values
- You can still manually type paths if needed

**Tips:**
- Upload images to Media Library first before creating projects
- Image data is stored as base64 (works offline)
- You can mix uploaded images with file paths
- Click 🖼️ button again to change selection

### Manual Image Paths (Alternative)

You can still manually enter image paths:
```
../images/architecture/project-main.jpg
../images/coding/screenshot1.jpg, ../images/coding/screenshot2.jpg
```

### Image Count Guidelines
- Architecture: 5-10 images
- Coding: 3-6 screenshots
- Games: 6-12 screenshots

### Architecture gallery layout

Reference page: `projects/lake-apartments.html`. Generated pages must use `architecture-gallery.css` (not `project-pages.css`).

**Structure:** hero image → gallery images → description section → back button.

**Gallery order** (images after hero):
- Odd count: one single full-width image, then rows of two
- Even count: rows of two only

Example (3 gallery images): single → pair. Example (5 gallery images): single → pair → pair.

See `.cursor/rules/architecture-projects.mdc` for the full checklist.

### Files (Optional)

**Click "Add File"**
- Code repositories
- Documentation PDFs
- Playable builds
- Demo links

---

## Generate HTML

1. Scroll to bottom
2. Click **"Generate HTML"**
3. Review preview:
   - ✓ Title correct
   - ✓ Images load
   - ✓ Description formatted
   - ✓ Theme correct
4. Click **"Download HTML"**

---

## File Naming Conventions

### Format

**Architecture** (slug-based, matches `data/projects.json`):

```
[slug].html
```

Example: `lake-apartments.html`

**Coding / games** (numbered):

```
[type]-project-[number].html
```

### Rules

**✅ CORRECT:**
- `lake-apartments.html` (architecture)
- `coding-project-3.html`
- `coding-project-game-2.html`

**❌ AVOID:**
- `Architecture-Project-10.html` (❌ Capital letters)
- `architecture_project_10.html` (❌ Underscores)
- `architecture project 10.html` (❌ Spaces)
- `arch-proj-10.html` (❌ Abbreviations)
- `project-10.html` (❌ Missing type)
- `my-cool-project.html` (❌ Custom name without slug convention)

### Find Next Number (coding / games only)

```bash
ls projects/coding-project-*.html
ls projects/coding-project-game-*.html
```

### Type Prefixes

- **Architecture projects:** `[slug].html` + entry in `data/projects.json`
- **Coding projects:** `coding-project-N.html`
- **Game projects:** `coding-project-game-N.html`

### Why This Matters

- ✓ Consistent URLs
- ✓ Easy to find files
- ✓ Alphabetical sorting works
- ✓ No conflicts
- ✓ Clean repository

### Common Mistakes

| Wrong | Right | Why |
|-------|-------|-----|
| `Apartment.html` | `lake-apartments.html` | Use slug; register in `data/projects.json` |
| `project_11.html` | `coding-project-11.html` | Underscores, missing type |
| `CODING-PROJECT-5.html` | `coding-project-5.html` | All caps |
| `game-1.html` | `coding-project-game-1.html` | Missing "project" |

---

## Add to Portfolio

### Architecture Projects

**1. Add entry to** `data/projects.json` (title, slug, category, imageUrls, htmlUrl, createdAt).

**2. Save generated page as** `projects/[slug].html` (e.g. `projects/lake-apartments.html`).

The portfolio slider on `architecture.html` is filled automatically by `load-projects.js` — do not add hardcoded `<article class="project-card">` blocks there.

Example JSON entry:

```json
{
  "title": "Lake Apartments",
  "slug": "lake-apartments",
  "category": "residential",
  "imageUrls": ["https://…/lake-apartments-aerial-view.jpg"],
  "type": "architecture",
  "htmlUrl": "projects/lake-apartments.html",
  "createdAt": "2026-02-16T12:00:00.000Z"
}
```

### Coding Projects

**Edit:** `coding.html`

Same structure, different file path and content.

**Games go in `coding.html`** with `data-category="game"`

---

## Test & Deploy

### Local Testing

1. Open http://localhost:8000
2. Navigate to portfolio page
3. Find your project
4. Click to open
5. Check:
   - [ ] Images load
   - [ ] Links work
   - [ ] Text readable
   - [ ] Mobile view (F12 → device toolbar)
   - [ ] Navigation works

### Deploy to Production

```bash
# 1. Stop servers
./stop-servers.sh

# 2. Check changes
git status
git diff

# 3. Stage files
git add architecture.html  # or coding.html
git add projects/[your-file].html

# 4. Commit
git commit -m "Add project: [Name]"

# 5. Deploy
./publish.sh

# 6. Wait 2-3 minutes, then verify at:
# https://www.sketchandscript.pl
```

---

## Workflow Checklist

### Pre-Work
- [ ] Gather info, images, files
- [ ] Check next project number

### In CMS
- [ ] Start servers
- [ ] Create new project (correct type)
- [ ] Fill required fields
- [ ] Add description (short + full)
- [ ] Upload 5-10 images
- [ ] Add captions
- [ ] Add tags
- [ ] Generate HTML
- [ ] Download with correct name

### In Portfolio
- [ ] Edit portfolio page
- [ ] Add project card
- [ ] Save

### Testing
- [ ] Check dev site
- [ ] Test project page
- [ ] Test mobile view
- [ ] Verify all links

### Deploy
- [ ] Stop servers
- [ ] Git add/commit
- [ ] Run `./publish.sh`
- [ ] Verify live (2-3 min wait)

---

## Troubleshooting

### CMS Won't Load
```bash
./stop-servers.sh
./start-both-servers.sh
```

### Image Upload Fails
- Check file size (max 10MB)
- Try JPG format
- Compress image first

### Image Picker Shows No Images
- Upload images to Media Library first
- Refresh the project form page
- Check that uploaded files are images (not other file types)

### Project Not in Portfolio
- Did you add project card to HTML?
- Check file path matches
- Hard refresh (Ctrl+Shift+R)

### 404 Error
- Verify file name exactly matches link
- Check file is in `projects/` folder
- Check spelling/capitalization

### Changes Not Live
- Wait 5 minutes
- Hard refresh browser
- Clear cache
- Check GitHub Actions

### Port Already in Use
```bash
./stop-servers.sh
# or
pkill -f 'python3 -m http.server'
```

---

## Quick Reference

### Commands
```bash
# Start
./start-both-servers.sh

# Stop
./stop-servers.sh

# List project pages
ls projects/

# Deploy
./publish.sh
```

### URLs
- **CMS:** http://localhost:8080
- **Dev:** http://localhost:8000
- **Live:** https://www.sketchandscript.pl

### File Naming
```
[slug].html                    # architecture (+ data/projects.json)
coding-project-[N].html
coding-project-game-[N].html
```

**Rules:**
- Lowercase only
- Hyphens, not underscores
- Include type + "project"
- Sequential numbering

---

## Tips

### Quality
- High-resolution images (1920px)
- Clear descriptions with results
- Include before/after when possible
- Proper captions for accessibility

### SEO
- Descriptive titles with keywords
- Complete descriptions
- Alt text via captions
- Project dates

### Performance
- Optimize images first (TinyPNG)
- Keep under 5MB per image
- Don't upload dozens of images
- Compress game builds

### Organization
- Export CMS data regularly
- Keep consistent naming
- Document project numbers
- Update monthly/quarterly

---

## Support

**Questions?**
- Check [README.md](README.md)
- Review this guide
- Check browser console (F12)

**Need help?**
- Email: michalwicherek@gmail.com
- GitHub: [@fredziarz](https://github.com/fredziarz)

---

**Last updated:** November 2025
**Version:** 2.0 - Added Image Picker feature
