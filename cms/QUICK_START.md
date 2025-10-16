# CMS Quick Start Guide

## 🚀 Getting Started (3 Steps)

### Step 1: Start the CMS
```bash
cd cms
./start-cms.sh
```
Or manually:
```bash
python3 -m http.server 8080
```

### Step 2: Open in Browser
Navigate to: **http://localhost:8080**

### Step 3: Create Your First Project
Click on sidebar → "New [Type] Project" → Fill form → Download HTML!

---

## 📋 Project Types

### 🏛️ Architecture Projects
**Use for:** Interior design, architectural projects
**Required:** Title, slug, subtitle, category, overview, featured image
**Output:** `architecture-project-[name].html`

### 💻 Coding Projects  
**Use for:** QA projects, web development, software engineering
**Required:** Title, slug, subtitle, category, overview
**Output:** `coding-project-[name].html`

### 🎮 Game Projects
**Use for:** Game development projects
**Required:** Title, slug, subtitle, genre, engine, description
**Output:** `coding-project-game-[name].html`

---

## 🎯 Workflow

1. **Fill Form** → Enter project details
2. **Download HTML** → Save generated file
3. **Add Images** → Upload to `images/` folder
4. **Copy File** → Move HTML to `projects/` folder
5. **Update Links** → Add to architecture.html or coding.html
6. **Git Commit** → Commit and push changes
7. **Publish** → Run `./publish.sh` when ready

---

## 📁 File Structure

```
After creating a project, organize like this:

images/
├── architecture/
│   └── my-project-1.jpg  ← Upload your images here
│   └── my-project-2.jpg
├── coding/
│   └── screenshot-1.jpg
└── games/
    └── game-thumbnail.jpg

projects/
└── architecture-project-10.html  ← Downloaded HTML goes here
```

---

## 💡 Pro Tips

### Image Paths
Always use relative paths from `projects/` folder:
```
✅ ../images/architecture/photo.jpg
❌ /images/architecture/photo.jpg
❌ images/architecture/photo.jpg
```

### Slugs
Use kebab-case (lowercase with hyphens):
```
✅ modern-apartment-renovation
❌ Modern Apartment Renovation
❌ modern_apartment_renovation
```

### Backup Your Data
Go to Settings → Export All Data → Save JSON file

### Preview Before Publishing
1. Click eye icon 👁️ to preview
2. Check all images load correctly
3. Test all links work

---

## 🔧 Common Tasks

### Add New Project to Website
1. Create project in CMS
2. Download HTML file
3. Move to `projects/` folder
4. Open `architecture.html` or `coding.html`
5. Add new project card:
```html
<article class="project-card">
    <a href="projects/your-new-project.html">
        <!-- ... project card content ... -->
    </a>
</article>
```

### Update Existing Project
1. Find project in CMS → All Projects
2. Create new version with same slug
3. Replace old HTML file in `projects/`

### Delete Project
1. CMS → All Projects
2. Click trash icon 🗑️
3. Manually remove HTML from `projects/` folder

---

## ❗ Important Notes

- **Data Storage:** Everything stored in browser localStorage
- **Backup Regularly:** Use Export function in Settings
- **Image Size:** Optimize images before upload (recommended: < 500KB)
- **Browser:** Works best in Chrome, Firefox, Safari (latest versions)
- **No Auto-sync:** CMS doesn't automatically update your website files

---

## 🆘 Troubleshooting

**Problem:** Module errors / blank page
**Solution:** Make sure you're using a local server (not file://)

**Problem:** Data disappeared  
**Solution:** Browser cache was cleared. Restore from backup JSON

**Problem:** Images not showing in generated HTML  
**Solution:** Check image paths are relative (`../images/...`)

**Problem:** Can't upload files
**Solution:** Check file type and size (max 10MB)

---

## 📞 Quick Reference

| Action | Location | Shortcut |
|--------|----------|----------|
| New Architecture | Sidebar | Click 🏛️ |
| New Coding | Sidebar | Click 💻 |
| New Game | Sidebar | Click 🎮 |
| All Projects | Sidebar → Projects | Filter/Search |
| Upload Media | Media Library | Drag & Drop |
| Export Data | Settings | Download JSON |
| Preview Project | All Projects → 👁️ | Opens new tab |
| Download Project | Auto-downloads | After creation |

---

**Happy Creating! 🎨**

For full documentation, see [README.md](README.md)

