# Sketch & Script CMS

**A browser-based Content Management System for your portfolio website**

Simple, fast, and powerful tool for creating architecture, coding, and game projects.

---

## 🚀 Quick Start (3 Steps)

### 1. Start the CMS
```bash
./start-cms.sh
```
Or manually: `python3 -m http.server 8080`

### 2. Open Browser
Navigate to: **http://localhost:8080**

### 3. Create Project
Click sidebar → Fill form → Download HTML → Done! 🎉

---

## ✨ Features

**📊 Dashboard**
- Project statistics and overview
- Recent projects at a glance
- Quick access to all features

**🏛️ Three Project Types**
- Architecture & Interior Design Projects
- Coding & QA Projects
- Game Development Projects

**📁 Media Library**
- Upload and manage images
- Drag & drop interface
- Support for various file types

**🔧 Project Management**
- Create, view, delete projects
- Export as production-ready HTML
- Filter and search capabilities

**💾 Data Persistence**
- LocalStorage-based (no server needed!)
- Import/Export for backups
- Offline capable

---

## 🎯 Complete Workflow

```
PREPARE → CREATE IN CMS → DOWNLOAD HTML → ADD TO WEBSITE → PUBLISH → LIVE!
 5 min      10 min          instant         10 min          5 min    Done!
```

### Phase 1: Preparation (5 min)

**Gather Your Content:**
- [ ] Project photos (optimize to < 500KB each)
- [ ] Project description written
- [ ] All details (dates, location, tech stack, etc.)
- [ ] Links (GitHub, demo, play URL, etc.)

**Organize Images:**
```bash
mkdir ~/project-temp
cp your-photos/* ~/project-temp/
# Rename logically: project-main.jpg, project-1.jpg, etc.
```

### Phase 2: Create in CMS (10 min)

**Start CMS:**
```bash
git checkout cms
./start-cms.sh
# Opens at http://localhost:8080
```

**Create Project:**
1. Click "New [Type] Project" in sidebar
2. Fill all required fields
3. Use relative image paths: `../images/architecture/photo.jpg`
4. Click "Create Project"
5. **HTML file downloads automatically!**

### Phase 3: Add to Website (10 min)

**Switch to Development:**
```bash
git checkout dev
```

**Move Files:**
```bash
# Move downloaded HTML to projects folder
mv ~/Downloads/your-project.html projects/architecture-project-10.html

# Copy images
cp ~/project-temp/* images/architecture/
```

**Update Main Page:**

Edit `architecture.html` or `coding.html` and add your project card:

```html
<article class="project-card">
    <a href="projects/architecture-project-10.html" class="project-card-link">
        <div class="project-image">
            <img src="images/architecture/your-image.jpg" alt="Project Title">
        </div>
        <div class="project-info">
            <span class="project-category">Residential</span>
            <h3 class="project-title">Your Project Title</h3>
            <p class="project-excerpt">Brief description...</p>
        </div>
    </a>
</article>
```

**Test Locally:**
```bash
python3 -m http.server 8000
# Open: http://localhost:8000
# Check: images load, links work, no errors
```

### Phase 4: Publish (5 min)

**Commit and Push:**
```bash
git add .
git commit -m "Add new project: Your Project Title"
git push origin dev
```

**Go Live:**
```bash
./publish.sh
# Merges dev → main
# Pushes to GitHub
# Live in 2-3 minutes!
```

**Verify:**
- Visit: **https://www.sketchandscript.pl**
- Check your new project
- Celebrate! 🎉

---

## 🏛️ Architecture Projects

### Required Fields
- **Title**: "Modern Apartment Renovation"
- **Slug**: "modern-apartment-renovation" (kebab-case)
- **Subtitle**: Brief one-line description
- **Category**: Residential, Commercial, Office, etc.
- **Overview**: 2-3 paragraphs about the project
- **Featured Image**: `../images/architecture/project-main.jpg`

### Optional Fields
- Location, Year, Area, Duration
- Gallery images (comma-separated paths)
- Gallery captions (comma-separated)
- Meta description for SEO

### Example Image Paths
```
Featured Image:
../images/architecture/loft-main.jpg

Gallery Images:
../images/architecture/loft-1.jpg,
../images/architecture/loft-2.jpg,
../images/architecture/loft-3.jpg

Captions:
Living room with natural light,
Modern kitchen design,
Minimalist bedroom
```

---

## 💻 Coding Projects

### Required Fields
- **Title**: "E-Commerce Test Automation"
- **Slug**: "ecommerce-test-automation"
- **Subtitle**: "Comprehensive test automation suite"
- **Category**: QA Testing, Web Dev, Mobile, etc.
- **Overview**: Project description

### Optional Fields
- Role, Duration, Team Size, Year
- **Technologies** (comma-separated): `Selenium, Python, Pytest, Docker`
- GitHub URL, Demo URL
- **Key Features** (one per line):
  ```
  Test Automation - 800+ automated test cases
  CI/CD Integration - Jenkins pipeline integration
  Reporting - Comprehensive Allure reports
  ```
- Code sample with language and filename
- Screenshots with captions

---

## 🎮 Game Projects

### Required Fields
- **Title**: "Pixel Platformer"
- **Slug**: "pixel-platformer"
- **Subtitle**: "Retro pixel-art platformer"
- **Genre**: Platformer, Puzzle, RPG, etc.
- **Engine**: Unity, Unreal, Godot, etc.
- **Description**: Gameplay description

### Optional Fields
- Role, Development Time, Play Count, Year
- Play URL (itch.io, etc.)
- GitHub URL
- **Features** (one per line):
  ```
  Procedurally generated levels
  Retro pixel art style
  Boss battles
  ```
- Thumbnail, Screenshots, Video URL

---

## 💡 Tips & Best Practices

### Image Paths (Important!)
**Always use relative paths from `projects/` folder:**
```
✅ ../images/architecture/photo.jpg
❌ /images/architecture/photo.jpg
❌ images/architecture/photo.jpg
❌ C:/Users/path/photo.jpg
```

### Naming Conventions
**Files:**
```
✅ modern-apartment-renovation.html
✅ test-automation-framework.html
❌ Modern Apartment Renovation.html
❌ test_automation_framework.html
```

**Images:**
```
✅ project-main.jpg
✅ project-1.jpg
❌ IMG_1234.jpg
❌ photo copy.jpg
```

### Slugs
Use lowercase with hyphens (kebab-case):
```
✅ modern-apartment-renovation
✅ pixel-platformer-game
❌ Modern Apartment Renovation
❌ modern_apartment_renovation
```

### Image Optimization
```bash
# Recommended: < 500KB per image, max 1920px wide

# Using ImageMagick:
convert large-image.jpg -resize 1920x1080 -quality 85 optimized.jpg

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

### Regular Backups
**Export data weekly:**
1. CMS → Settings
2. "Export All Data"
3. Save as: `cms-backup-2024-10-16.json`
4. Store safely

### Writing Descriptions
**Good:**
> This comprehensive renovation transformed an outdated 80m² apartment into a modern, functional living space. The design focuses on maximizing natural light and creating an open-plan living area.

**Avoid:**
> Nice apartment. Looks good.

---

## 🔧 Troubleshooting

### CMS Won't Start
```bash
# Make sure you're on cms branch
git checkout cms

# Check if port is in use
lsof -i :8080

# Try different port
python3 -m http.server 8081
```

### Images Not Showing
**Check:**
- Images exist in correct folder
- Paths start with `../images/`
- Filenames match exactly (case-sensitive!)
- No spaces in filenames

**Fix:**
```bash
ls images/architecture/  # Verify files exist
mv "file with spaces.jpg" file-without-spaces.jpg
```

### Project Not on Main Page
**Check:**
- Did you update `architecture.html` or `coding.html`?
- Is HTML file in `projects/` folder?
- Did you commit and push?

**Fix:**
```bash
git status
git add architecture.html projects/
git commit -m "Add project link"
git push origin dev
```

### Module Errors / Blank Page
**Solution:** Use a local server, don't open HTML directly
```bash
python3 -m http.server 8080
# NOT: file:///path/to/index.html
```

### Data Disappeared
**Solution:** Browser cache was cleared. Restore from backup JSON
- CMS → Settings → Import Data

---

## 📊 File Organization

```
Website Structure:
──────────────────
images/
├── architecture/    ← Upload your architecture images
├── coding/          ← Upload your coding screenshots
└── games/           ← Upload your game images

projects/
├── architecture-project-1.html
├── architecture-project-2.html
├── coding-project-1.html
└── coding-project-game-1.html

CMS Structure:
──────────────
cms/
├── index.html       # CMS interface
├── css/cms.css      # Styling
├── js/
│   ├── cms.js       # Main app
│   └── modules/     # 5 modular components
└── start-cms.sh     # Launch script
```

---

## 🔐 Technical Details

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Storage
- Uses HTML5 LocalStorage
- Storage limit: ~5-10MB (browser dependent)
- Data persists until manually cleared
- No server required!

### Generated HTML
- Uses your existing project templates
- Maintains site styling and structure
- Includes Google Analytics
- SEO-optimized with meta tags
- Production-ready output

### Architecture
- Modular ES6 JavaScript
- No dependencies (vanilla JS)
- Responsive CSS Grid/Flexbox
- Modern browser APIs

---

## 📋 Quick Reference

| Task | Command |
|------|---------|
| Start CMS | `./start-cms.sh` |
| Switch to CMS | `git checkout cms` |
| Switch to Dev | `git checkout dev` |
| Test locally | `python3 -m http.server 8000` |
| Publish live | `./publish.sh` |
| Export data | Settings → Export All Data |

| CMS Action | Location |
|------------|----------|
| New Architecture | Sidebar → 🏛️ |
| New Coding | Sidebar → 💻 |
| New Game | Sidebar → 🎮 |
| All Projects | Sidebar → Projects |
| Upload Media | Media Library → Drag & Drop |
| Preview Project | All Projects → 👁️ |

---

## ❗ Important Notes

⚠️ **Data Storage:** Everything stored in browser localStorage (not synced across browsers/devices)

⚠️ **No Auto-sync:** CMS doesn't automatically update your website

⚠️ **Manual Process:** You control every step from creation to publishing

⚠️ **Backup Regularly:** Use Export function - browser data can be cleared

✅ **Your Data, Your Control:** Everything stays on your machine

---

## 💬 FAQ

**Q: Can I edit a project after publishing?**  
A: Yes! Create new version with same slug, replace HTML file, commit and publish.

**Q: How do I delete a project?**  
A: 1) Delete from CMS (All Projects → 🗑️), 2) Remove HTML from `projects/`, 3) Remove from main page

**Q: Can I preview before publishing?**  
A: Yes! Test locally before running `./publish.sh`

**Q: What if I make a mistake?**  
A: Git saves you! Revert: `git reset --hard HEAD~1` (before pushing)

**Q: How many projects can I have?**  
A: Unlimited! Each project is just one HTML file.

**Q: Does the CMS publish automatically?**  
A: No! You control everything. CMS generates HTML, you add it to your site manually.

---

## 🎯 Workflow Summary

```
┌──────────────────────────────────────────────┐
│  FROM IDEA TO LIVE IN 30 MINUTES             │
└──────────────────────────────────────────────┘

1. PREPARE (5 min)
   └─ Gather content, optimize images

2. CREATE (10 min)
   ├─ git checkout cms
   ├─ ./start-cms.sh
   ├─ Fill form
   └─ Download HTML

3. INTEGRATE (10 min)
   ├─ git checkout dev
   ├─ Move files
   ├─ Update main page
   └─ Test locally

4. PUBLISH (5 min)
   ├─ git commit & push
   ├─ ./publish.sh
   └─ Live! 🎉
```

---

## 🌟 Benefits

✅ **Fast** - Create projects in minutes, not hours  
✅ **Easy** - Simple forms, no HTML editing  
✅ **Consistent** - All projects use same templates  
✅ **Flexible** - Full control over generated HTML  
✅ **Offline** - Works without internet  
✅ **Free** - No server, no database, no cost  
✅ **Portable** - Just browser localStorage  
✅ **Professional** - Production-ready output  

---

## 🚀 Getting Started

Ready to create your first project?

```bash
# 1. Start CMS
git checkout cms
./start-cms.sh

# 2. Open http://localhost:8080

# 3. Click "New Architecture Project"

# 4. Follow the workflow above

# 5. Your project will be live in 30 minutes!
```

---

**Version 1.0** | October 2025 | Sketch & Script CMS  
**Built with ❤️ for easy portfolio management**
