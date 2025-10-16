# CMS Workflow Guide - Step by Step

Complete guide for creating and publishing projects to your website.

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Complete Workflow](#complete-workflow)
3. [Creating Architecture Projects](#creating-architecture-projects)
4. [Creating Coding Projects](#creating-coding-projects)
5. [Creating Game Projects](#creating-game-projects)
6. [Publishing to Live Site](#publishing-to-live-site)
7. [Tips & Best Practices](#tips--best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Reference

```
START → CREATE IN CMS → DOWNLOAD HTML → ADD IMAGES → 
UPDATE MAIN PAGE → GIT COMMIT → PUBLISH → LIVE!
```

**Time estimate:** 15-30 minutes per project

---

## 🔄 Complete Workflow

### Phase 1: Preparation (5 minutes)

**STEP 1: Gather Your Content**
- [ ] Project photos (optimize to < 500KB each)
- [ ] Project description written
- [ ] All project details (dates, location, etc.)
- [ ] Links (GitHub, demo, etc.)

**STEP 2: Organize Your Images**
```bash
# Create a temporary folder for this project
mkdir ~/project-images-temp
# Copy all images there
cp your-photos/* ~/project-images-temp/
# Rename them logically: project-1.jpg, project-2.jpg, etc.
```

### Phase 2: Create in CMS (10 minutes)

**STEP 3: Start the CMS**
```bash
cd /home/michal/Documents/sketchAndScript
git checkout cms
cd cms
./start-cms.sh
```

**STEP 4: Open in Browser**
- Open: http://localhost:8080
- You'll see the CMS Dashboard

**STEP 5: Create Your Project**
- Click sidebar → "New [Type] Project"
- Fill in all fields carefully
- Use proper image paths (see [Image Paths](#image-paths) below)
- Click "Create Project"
- **HTML file downloads automatically!**

**STEP 6: Note the Filename**
The CMS creates files like:
- `architecture-project-modern-loft.html`
- `coding-project-test-automation.html`
- `coding-project-game-pixel-platformer.html`

### Phase 3: Add to Website (10 minutes)

**STEP 7: Switch to Dev Branch**
```bash
# Stop the CMS server (Ctrl+C)
cd /home/michal/Documents/sketchAndScript
git checkout dev
```

**STEP 8: Move the Downloaded HTML**
```bash
# Find the next available number
ls projects/architecture-project-*.html | tail -1
# Let's say last one is architecture-project-9.html

# Move your downloaded file
mv ~/Downloads/your-project-name.html projects/architecture-project-10.html
```

**STEP 9: Upload Your Images**
```bash
# For architecture projects:
cp ~/project-images-temp/* images/architecture/

# For coding projects:
cp ~/project-images-temp/* images/coding/

# For game projects:
cp ~/project-images-temp/* images/games/
```

**STEP 10: Update Main Page**

Open the relevant page in your editor:
- Architecture: `architecture.html`
- Coding: `coding.html`
- Games: `coding.html` (games section)

Find the projects section and add a new project card:

```html
<!-- Add this card -->
<article class="project-card">
    <a href="projects/architecture-project-10.html" class="project-card-link">
        <div class="project-image">
            <img src="images/architecture/your-main-image.jpg" 
                 alt="Your Project Title" 
                 loading="lazy">
        </div>
        <div class="project-info">
            <span class="project-category">Residential</span>
            <h3 class="project-title">Your Project Title</h3>
            <p class="project-excerpt">Brief description...</p>
        </div>
    </a>
</article>
```

**STEP 11: Test Locally**
```bash
# If you have the local server script
./start-local-server.sh

# Or manually
python3 -m http.server 8000
```

Open http://localhost:8000 and check:
- [ ] New project appears on main page
- [ ] Clicking it opens the project page
- [ ] All images load correctly
- [ ] No broken links

### Phase 4: Publish (5 minutes)

**STEP 12: Commit Changes**
```bash
cd /home/michal/Documents/sketchAndScript
git add .
git status  # Review what will be committed

git commit -m "Add new [type] project: [Project Name]

- Add project HTML page
- Add project images
- Update [architecture/coding].html with new project card"
```

**STEP 13: Push to Dev**
```bash
git push origin dev
```

**STEP 14: Publish to Live Site** (when ready!)
```bash
./publish.sh
```

This will:
- Switch to main branch
- Merge dev into main
- Push to GitHub
- **Your site goes LIVE in 2-3 minutes!**

---

## 🏛️ Creating Architecture Projects

### Required Information

- **Project Title**: "Modern Apartment Renovation"
- **URL Slug**: "modern-apartment-renovation" (lowercase, hyphens)
- **Subtitle**: "Complete transformation of an 80m² apartment"
- **Category**: Residential, Commercial, Office, etc.
- **Overview**: 2-3 paragraphs describing the project

### Optional but Recommended

- Location: "Warsaw, Poland"
- Year: "2024"
- Area: "80 m²"
- Duration: "3 months"
- Gallery Images: Multiple images for the gallery
- Gallery Captions: One caption per image

### Image Paths Example

```
Featured Image:
../images/architecture/modern-apartment-main.jpg

Gallery Images:
../images/architecture/modern-apartment-1.jpg,
../images/architecture/modern-apartment-2.jpg,
../images/architecture/modern-apartment-3.jpg

Gallery Captions:
Living room with natural light,
Modern kitchen with marble countertops,
Minimalist bedroom design
```

### Checklist Before Creating

- [ ] All images optimized and renamed
- [ ] Project description written
- [ ] Metadata collected (location, year, area, duration)
- [ ] Images uploaded to `images/architecture/`
- [ ] Image paths ready (relative from projects/ folder)

---

## 💻 Creating Coding Projects

### Required Information

- **Project Title**: "E-Commerce Test Automation"
- **URL Slug**: "ecommerce-test-automation"
- **Subtitle**: "Comprehensive test automation suite"
- **Category**: QA Testing, Web Development, API Development, etc.
- **Overview**: Project description

### Optional but Recommended

- Role: "Lead QA Engineer"
- Duration: "6 months"
- Team Size: "5 members"
- Year: "2024"
- Technologies: "Selenium, Python, Pytest, Jenkins, Docker"
- GitHub URL: Full URL to repository
- Demo URL: Link to live demo
- Key Features: List of 3-4 main features
- Code Sample: Example code with language and filename
- Screenshots: Project screenshots with captions

### Technologies Format

Enter as comma-separated list:
```
Selenium, Python, Pytest, Jenkins, Docker, REST API, PostgreSQL
```

The CMS will create individual tech badges.

### Features Format

Enter one feature per line with format: **Title - Description**
```
Test Automation - 800+ automated test cases covering critical paths
CI/CD Integration - Seamless Jenkins integration for automated testing
Reporting - Comprehensive Allure reports with failure analysis
Performance Testing - JMeter scripts for load testing
```

### Code Sample

```python
# Just paste your code, the CMS will format it
import pytest
from pages.product_page import ProductPage

@pytest.mark.smoke
def test_checkout(driver):
    product_page = ProductPage(driver)
    product_page.add_to_cart()
    # ... rest of your code
```

---

## 🎮 Creating Game Projects

### Required Information

- **Game Title**: "Pixel Platformer"
- **URL Slug**: "pixel-platformer"
- **Subtitle**: "Retro pixel-art platformer"
- **Genre**: Platformer, Puzzle, RPG, Action, etc.
- **Game Engine**: Unity, Unreal Engine, Godot, etc.
- **Description**: Gameplay description

### Optional but Recommended

- Role: "Solo Developer"
- Development Time: "3 months"
- Play Count: "2,500+"
- Year: "2024"
- Play URL: "https://username.itch.io/game-name"
- GitHub URL: Repository link
- Features: Key game features (one per line)
- Thumbnail: Main game image
- Screenshots: Game screenshots
- Video URL: YouTube gameplay video

### Features Format

```
Procedurally generated levels
Retro pixel art style
Challenging boss fights
Local multiplayer support
Unlockable characters
```

---

## 🚀 Publishing to Live Site

### Before Publishing Checklist

- [ ] Tested locally and everything works
- [ ] All images display correctly
- [ ] No broken links
- [ ] Project appears on main page
- [ ] Committed to dev branch
- [ ] Pushed to GitHub (dev branch)

### Publishing Command

```bash
cd /home/michal/Documents/sketchAndScript
./publish.sh
```

### What Happens

1. Script checks for uncommitted changes
2. Shows recent commits for review
3. Asks for confirmation
4. Switches to main branch
5. Merges dev into main
6. Pushes to GitHub
7. **Site goes live in 2-3 minutes**
8. Switches back to dev branch

### After Publishing

- Visit: **https://www.sketchandscript.pl**
- Check your new project appears
- Click through to verify everything works
- Share your new project! 🎉

---

## 💡 Tips & Best Practices

### Image Optimization

```bash
# Resize large images (recommended: 1920px wide max)
convert large-image.jpg -resize 1920x1080 optimized-image.jpg

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
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
✅ modern-apartment-main.jpg
✅ modern-apartment-1.jpg
❌ IMG_1234.jpg
❌ photo copy.jpg
```

### Image Paths

Always use **relative paths** from the `projects/` folder:

```
✅ ../images/architecture/photo.jpg
❌ /images/architecture/photo.jpg
❌ images/architecture/photo.jpg
❌ C:/Users/name/Documents/photo.jpg
```

### Writing Descriptions

**Good:**
```
This comprehensive renovation transformed an outdated 80m² apartment 
into a modern, functional living space. The design focuses on maximizing 
natural light, creating an open-plan living area, and incorporating 
contemporary materials with a warm, minimalist aesthetic.
```

**Avoid:**
```
Nice apartment. We did a renovation. It looks good.
```

### Regular Backups

Export your CMS data weekly:
```
1. Open CMS → Settings
2. Click "Export All Data"
3. Save JSON file with date: cms-backup-2024-10-16.json
4. Store in a safe location
```

---

## 🔧 Troubleshooting

### Problem: Images Not Showing

**Check:**
- [ ] Images exist in the correct folder
- [ ] Image paths start with `../images/`
- [ ] Filenames match exactly (case-sensitive!)
- [ ] No spaces in filenames

**Fix:**
```bash
# Check image exists
ls images/architecture/your-image.jpg

# Rename if needed (remove spaces)
mv "image with spaces.jpg" image-without-spaces.jpg
```

### Problem: Project Not Appearing on Main Page

**Check:**
- [ ] Did you update architecture.html or coding.html?
- [ ] Is the HTML file in the projects/ folder?
- [ ] Did you commit and push changes?

**Fix:**
```bash
git status  # Check what's staged
git add architecture.html projects/
git commit -m "Add project to main page"
git push origin dev
```

### Problem: Broken Links

**Check:**
- [ ] Project filename matches the link in main page
- [ ] Path is relative: `projects/project-name.html`
- [ ] No typos in filename

**Fix:**
Edit architecture.html or coding.html and update the href.

### Problem: CMS Won't Start

**Try:**
```bash
# Make sure you're on cms branch
git checkout cms

# Check if port is already in use
lsof -i :8080

# Try different port
cd cms
python3 -m http.server 8081  # Use 8081 instead
```

### Problem: Downloaded HTML Doesn't Match Template

**Fix:**
- CMS is on cms branch, templates might be outdated
- Update CMS: `git pull origin cms`
- Or manually edit the downloaded HTML

---

## 📊 Workflow Summary

```
┌─────────────────────────────────────────────────────────┐
│  COMPLETE WORKFLOW AT A GLANCE                          │
└─────────────────────────────────────────────────────────┘

1. PREPARE
   ├─ Gather images and content
   ├─ Optimize images
   └─ Write descriptions

2. CREATE (CMS)
   ├─ git checkout cms
   ├─ Start CMS
   ├─ Fill form
   └─ Download HTML

3. INTEGRATE (Website)
   ├─ git checkout dev
   ├─ Move HTML to projects/
   ├─ Upload images to images/
   ├─ Update main page
   └─ Test locally

4. PUBLISH
   ├─ git commit
   ├─ git push origin dev
   ├─ ./publish.sh
   └─ Live in 2-3 minutes!

5. VERIFY
   ├─ Visit www.sketchandscript.pl
   ├─ Check new project
   └─ Celebrate! 🎉
```

---

## 🎯 Next Steps

Now that you understand the workflow:

1. **Try it once with test data** - Learn the process
2. **Create your first real project** - Follow this guide
3. **Refine your process** - Find what works for you
4. **Create more projects** - Gets faster each time!

---

## 📚 Additional Resources

- **CMS Documentation**: `cms/README.md`
- **Quick Reference**: `cms/QUICK_START.md`
- **Main Website Docs**: `README.md`
- **Project Templates**: `templates/`

---

## 💬 Common Questions

**Q: Can I edit a project after publishing?**
A: Yes! Create a new version in CMS with same slug, replace the HTML file, commit and publish.

**Q: How do I delete a project?**
A: Remove from main page, delete HTML from projects/, commit and publish.

**Q: Can I preview before publishing?**
A: Yes! Test locally with `python3 -m http.server 8000` before running `./publish.sh`

**Q: What if I make a mistake?**
A: Git saves you! Just revert: `git reset --hard HEAD~1` (before pushing)

**Q: How many projects can I have?**
A: Unlimited! Each project is just one HTML file.

---

**Version 1.0** | October 2025 | Sketch & Script

