# 📘 Complete Project Management Guide

**Everything you need to add and manage projects in your portfolio**

---

## 📚 Table of Contents

1. [Quick Add: Project Cards](#quick-add-project-cards)
2. [Full Detail Pages](#full-detail-pages)
3. [Image Management](#image-management)
4. [Deployment](#deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Add: Project Cards

### Architecture Projects

**Time: 5 minutes** | **File: `architecture.html`**

1. **Find the insertion point:**
   ```bash
   # Search for: <!-- ADD MORE PROJECTS HERE -->
   # Around line 60-80
   ```

2. **Copy this template:**
   ```html
   <article class="project-card" data-category="residential">
       <a href="projects/architecture-project-1.html" class="project-card-link">
           <div class="project-image">
               <img src="images/architecture/project-name.jpg" 
                    alt="Project description" 
                    loading="lazy">
           </div>
           <h3 class="project-title">Your Project Name</h3>
       </a>
   </article>
   ```

3. **Customize:**
   - `data-category`: `residential`, `commercial`, or `interior`
   - `href`: Link to detail page (optional)
   - `src`: Your image path
   - `alt`: Descriptive text
   - `project-title`: Project name

### Coding/QA Projects

**Time: 5 minutes** | **File: `coding.html`**

1. **Find the insertion point:**
   ```bash
   # Search for: <!-- ADD MORE PROJECTS HERE -->
   # Around line 100-120
   ```

2. **Copy this template:**
   ```html
   <article class="project-card" data-category="qa">
       <div class="project-info">
           <div class="tech-stack">
               <span class="tech-tag">Python</span>
               <span class="tech-tag">Selenium</span>
               <span class="tech-tag">CI/CD</span>
           </div>
           <h3 class="project-title">Your Project Name</h3>
           <p class="project-excerpt">
               Brief description with impact. What problem did it solve?
           </p>
           <div class="project-links">
               <a href="projects/coding-project-1.html" class="project-link">View Details →</a>
               <a href="https://github.com/user/repo" class="project-link">View Code →</a>
           </div>
       </div>
   </article>
   ```

3. **Customize:**
   - `data-category`: `qa`, `development`, or `games`
   - `tech-tag`: 2-4 technologies
   - `project-title`: Project name
   - `project-excerpt`: 2-3 sentences
   - `project-links`: Detail page and/or GitHub

### Games

**Time: 5 minutes** | **File: `coding.html`**

1. **Find the insertion point:**
   ```bash
   # Search for: <!-- ADD MORE GAMES HERE -->
   # Around line 180-200
   ```

2. **Copy this template:**
   ```html
   <article class="game-card">
       <a href="projects/coding-project-game-1.html" class="project-card-link">
           <div class="game-image">
               <img src="images/games/game-name.gif" 
                    alt="Game title" 
                    loading="lazy">
           </div>
           <div class="game-info">
               <h3 class="game-title">Your Game Title</h3>
               <div class="game-meta">
                   <span class="game-engine">Unity</span>
                   <span class="game-genre">Platformer</span>
               </div>
           </div>
       </a>
   </article>
   ```

3. **Customize:**
   - `src`: Gameplay GIF or screenshot
   - `game-title`: Game name
   - `game-engine`: Unity or Godot
   - `game-genre`: Genre (Platformer, Shooter, Puzzle, etc.)

---

## 📄 Full Detail Pages

### When to Create Detail Pages

- For your **best 5-10 projects**
- When you have **multiple images** to showcase
- When you want to **explain the process**
- For **case studies** with challenges/solutions

### Architecture Project Page

**Time: 30-60 minutes per project**

1. **Copy the template:**
   ```bash
   cd starter-template
   cp templates/architecture-project-template.html projects/architecture-project-1.html
   ```

2. **Update basic info** (lines 1-60):
   ```html
   <!-- Meta tags -->
   <title>Project Name | Sketch & Script</title>
   <meta name="description" content="Project description">
   
   <!-- Breadcrumb -->
   <span class="current">Project Name</span>
   
   <!-- Hero section -->
   <h1>Project Name</h1>
   <p class="project-hero-subtitle">One-sentence description</p>
   ```

3. **Update project details** (lines 60-90):
   ```html
   <div class="project-meta-grid">
       <div class="project-meta-item">
           <span class="meta-label">Location</span>
           <span class="meta-value">City, Country</span>
       </div>
       <div class="project-meta-item">
           <span class="meta-label">Year</span>
           <span class="meta-value">2024</span>
       </div>
       <div class="project-meta-item">
           <span class="meta-label">Area</span>
           <span class="meta-value">XX m²</span>
       </div>
       <div class="project-meta-item">
           <span class="meta-label">Duration</span>
           <span class="meta-value">X months</span>
       </div>
   </div>
   ```

4. **Write overview** (lines 110-130):
   - 2-3 paragraphs describing the project
   - Client brief
   - Your design approach

5. **Add gallery images** (lines 140-200):
   ```html
   <div class="project-gallery">
       <!-- Large image (spans 2 columns) -->
       <div class="gallery-item gallery-item-large">
           <img src="../images/architecture/project-1.jpg" 
                alt="Living room overview" 
                loading="lazy">
           <div class="gallery-caption">Living Room - Open plan layout</div>
       </div>
       
       <!-- Regular image -->
       <div class="gallery-item">
           <img src="../images/architecture/project-2.jpg" 
                alt="Kitchen detail" 
                loading="lazy">
           <div class="gallery-caption">Kitchen - Custom millwork</div>
       </div>
       
       <!-- Add 6-12 images total -->
   </div>
   ```

6. **Link from main page** (`architecture.html`):
   ```html
   <a href="projects/architecture-project-1.html" class="project-card-link">
   ```

### Coding/QA Project Page

**Time: 30-60 minutes per project**

1. **Copy the template:**
   ```bash
   cd starter-template
   cp templates/coding-project-template.html projects/coding-project-1.html
   ```

2. **Update hero section** (lines 60-120):
   ```html
   <h1>Project Name</h1>
   <p class="project-hero-subtitle">Brief description</p>
   
   <div class="project-meta-grid">
       <div class="project-meta-item">
           <span class="meta-label">Role</span>
           <span class="meta-value">Lead QA Engineer</span>
       </div>
       <div class="project-meta-item">
           <span class="meta-label">Duration</span>
           <span class="meta-value">6 months</span>
       </div>
       <div class="project-meta-item">
           <span class="meta-label">Team Size</span>
           <span class="meta-value">4 members</span>
       </div>
   </div>
   
   <div class="project-links">
       <a href="https://github.com/user/repo" class="btn btn-primary">
           View on GitHub →
       </a>
       <a href="https://demo.example.com" class="btn btn-secondary">
           Live Demo →
       </a>
   </div>
   ```

3. **Write overview** (lines 130-160):
   - What you built
   - Problem it solves
   - Technical approach

4. **Add screenshots** (lines 180-240):
   ```html
   <div class="project-gallery">
       <div class="gallery-item gallery-item-large">
           <img src="../images/coding/screenshot-1.jpg" 
                alt="Dashboard view" 
                loading="lazy">
           <div class="gallery-caption">Main Dashboard</div>
       </div>
       <!-- Add 4-8 screenshots -->
   </div>
   ```

5. **Link from main page** (`coding.html`):
   ```html
   <a href="projects/coding-project-1.html" class="project-link">View Details →</a>
   ```

---

## 🖼️ Image Management

### Required Images

| Type | Location | Size | Format |
|------|----------|------|--------|
| Homepage backgrounds | `images/` | 1920x1080 | JPG |
| Architecture projects | `images/architecture/` | 800-1200px wide | JPG/WebP |
| Coding screenshots | `images/coding/` | 1200x800 | PNG/JPG |
| Game screenshots | `images/games/` | 800x600 | JPG/GIF |

### Image Optimization

**Essential!** Optimize before uploading:

1. **Resize images:**
   - Homepage backgrounds: 1920x1080px
   - Project photos: 800-1200px wide
   - Screenshots: 1200px wide
   - Keep aspect ratio

2. **Compress using [Squoosh.app](https://squoosh.app/):**
   - Upload your image
   - Select WebP or JPG
   - Quality: 80-85%
   - Target: < 500KB per image
   - Download optimized

3. **Naming convention:**
   - Good: `modern-apartment-warsaw.jpg`
   - Good: `pixel-platformer-gameplay.gif`
   - Bad: `IMG_1234.jpg`
   - Bad: `Screenshot 2024-01-01.png`

### Folder Structure

```
images/
├── hero-architecture.jpg (homepage left)
├── hero-coding.jpg (homepage right)
├── architecture/
│   ├── project-1-hero.jpg
│   ├── project-1-gallery-1.jpg
│   ├── project-1-gallery-2.jpg
│   └── ...
├── coding/
│   ├── project-1-dashboard.jpg
│   ├── project-1-report.jpg
│   └── ...
└── games/
    ├── game-1-gameplay.gif
    ├── game-2-screenshot.jpg
    └── ...
```

### Quick Image Add Workflow

```bash
# 1. Optimize image (use squoosh.app)

# 2. Copy to folder
cp ~/Downloads/optimized-image.jpg images/architecture/project-name.jpg

# 3. Update HTML with image path

# 4. Test locally
python3 -m http.server 8000

# 5. Deploy
git add images/
git commit -m "Add project images"
git push origin main
```

---

## 🚀 Deployment

### Complete Workflow

```bash
# 1. Make changes (add project, images, etc.)

# 2. Test locally
cd ~/Documents/portfolio
python3 -m http.server 8000
# Open http://localhost:8000 and test

# 3. Check everything:
# ✓ Project appears correctly
# ✓ Images load
# ✓ Links work
# ✓ Responsive on mobile (resize browser)

# 4. Commit changes
git add .
git commit -m "Add new architecture project: Project Name"

# 5. Push to GitHub
git push origin main

# 6. Wait 2-3 minutes, then check live site
```

### Update Sitemap

When adding new project pages, update `sitemap.xml`:

```xml
<url>
    <loc>https://sketchandscript.pl/projects/architecture-project-4.html</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
```

---

## 🐛 Troubleshooting

### Project doesn't appear

- ✓ Check HTML syntax (missing closing tags?)
- ✓ Make sure it's inside `<div class="projects-grid">`
- ✓ Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- ✓ Check browser console (F12) for errors

### Image doesn't load

- ✓ Check file path is correct (case-sensitive!)
- ✓ Verify file exists: `ls images/architecture/`
- ✓ Image extension matches HTML (`.jpg` vs `.JPG`)
- ✓ File is committed to Git: `git status`

### Filter doesn't work

- ✓ Check `data-category` matches exactly
- ✓ Make sure JavaScript files are loaded
- ✓ Check browser console for errors

### Page looks broken

- ✓ Verify all CSS files are linked
- ✓ Check for unclosed HTML tags
- ✓ Clear browser cache
- ✓ Test in incognito mode

### Links not working

- ✓ Check href paths (relative vs absolute)
- ✓ Ensure target files exist
- ✓ Use relative paths: `projects/project-name.html`
- ✓ Not absolute paths: `/projects/project-name.html`

---

## ✅ Quick Reference

### Architecture Project Card
```html
<article class="project-card" data-category="residential">
    <a href="projects/architecture-project-1.html" class="project-card-link">
        <div class="project-image">
            <img src="images/architecture/project.jpg" alt="Project" loading="lazy">
        </div>
        <h3 class="project-title">Project Name</h3>
    </a>
</article>
```

### Coding Project Card
```html
<article class="project-card" data-category="qa">
    <div class="project-info">
        <div class="tech-stack">
            <span class="tech-tag">Python</span>
        </div>
        <h3 class="project-title">Project Name</h3>
        <p class="project-excerpt">Description</p>
        <div class="project-links">
            <a href="projects/coding-project-1.html" class="project-link">View Details →</a>
        </div>
    </div>
</article>
```

### Game Card
```html
<article class="game-card">
    <a href="projects/game-1.html" class="project-card-link">
        <div class="game-image">
            <img src="images/games/game.gif" alt="Game" loading="lazy">
        </div>
        <div class="game-info">
            <h3 class="game-title">Game Name</h3>
            <div class="game-meta">
                <span class="game-engine">Unity</span>
                <span class="game-genre">Platformer</span>
            </div>
        </div>
    </a>
</article>
```

---

## 💡 Pro Tips

1. **Start simple:** Add projects as cards first, create detail pages later
2. **Use placeholders:** Start with placeholder images while preparing photos
3. **Be consistent:** Use same naming patterns for files
4. **Test mobile:** Always check responsive design
5. **Optimize images:** Never skip image optimization
6. **Commit often:** Small, frequent commits are better
7. **Update regularly:** Keep portfolio fresh with latest work

---

## 📋 Checklist for Adding a Complete Project

- [ ] Optimize all images (< 500KB each)
- [ ] Add project card to main page (architecture.html or coding.html)
- [ ] Create detail page (if needed)
- [ ] Add 6-12 gallery images
- [ ] Write project overview (2-3 paragraphs)
- [ ] Fill in all meta information
- [ ] Test locally (http://localhost:8000)
- [ ] Check on mobile (resize browser)
- [ ] Verify all links work
- [ ] Update sitemap.xml
- [ ] Commit and push to GitHub
- [ ] Verify live site (wait 2-3 minutes)

---

**Ready to showcase your work!** 🎉

**Need help?** Check the templates in `starter-template/templates/`

