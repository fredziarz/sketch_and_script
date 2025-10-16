# CMS User Guide - Complete Workflow

**From Zero to Production: Adding Projects to Sketch & Script**

This guide walks you through every step of adding a new project to your portfolio using the CMS.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Opening the CMS](#opening-the-cms)
3. [Creating a New Project](#creating-a-new-project)
4. [Filling the Form](#filling-the-form)
5. [Adding Images](#adding-images)
6. [Adding Files & Code](#adding-files--code)
7. [Generating HTML](#generating-html)
8. [Saving the Project File](#saving-the-project-file)
9. [Adding to Portfolio Pages](#adding-to-portfolio-pages)
10. [Testing Locally](#testing-locally)
11. [Deploying to Production](#deploying-to-production)
12. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### Prerequisites
- Git repository cloned
- Python 3 installed
- Web browser (Chrome, Firefox, Edge, Safari)

### One-Time Setup
```bash
cd /home/michal/Documents/sketchAndScript
```

That's it! No dependencies to install.

---

## Opening the CMS

### Step 1: Start Servers

```bash
./start-both-servers.sh
```

**What happens:**
- CMS server starts on port 8080
- Dev website server starts on port 8000
- Both open automatically in your browser

**You should see:**
- CMS interface at http://localhost:8080
- Dev site at http://localhost:8000

### Step 2: Verify CMS is Running

In the CMS tab, you should see:
- Header with logo "Sketch & Script CMS"
- Two buttons: "🔧 Dev Site" and "🌐 Live Site"
- "New Project" button
- List of existing projects (if any)

**If you don't see this:** See [Troubleshooting](#troubleshooting)

---

## Creating a New Project

### Step 1: Click "New Project"

Located in the top section of the CMS interface.

### Step 2: Choose Project Type

You'll see three options:

**🏗️ Architecture**
- For building design projects
- Interior design work
- Space planning
- Architectural visualization

**💻 Coding**
- Web applications
- QA/testing projects
- Software development
- Tools and utilities

**🎮 Game**
- Interactive games
- Playable demos
- Game development projects

**Click the appropriate type** for your project.

### Step 3: Form Opens

A detailed form appears with multiple sections:
- Basic Information
- Description
- Project Details
- Media (Images)
- Additional Files
- Tags

---

## Filling the Form

### Basic Information Section

#### **Title** ⭐ Required
- **What it is:** The name of your project
- **Example (Architecture):** "Modern Minimalist Apartment"
- **Example (Coding):** "E-commerce Testing Framework"
- **Example (Game):** "Space Explorer 2D"
- **Tips:** 
  - Keep it concise (3-6 words)
  - Make it descriptive
  - Use title case

#### **Subtitle** (Optional)
- **What it is:** Short tagline or secondary description
- **Example (Architecture):** "120m² Urban Living Space"
- **Example (Coding):** "Automated Testing Suite for React"
- **Example (Game):** "Retro-style Space Shooter"
- **Tips:** 
  - One line maximum
  - Adds context to the title

#### **Year** ⭐ Required
- **What it is:** When the project was completed
- **Format:** YYYY (e.g., 2024)
- **Tips:** Use the completion year, not start year

#### **Status** ⭐ Required
- **Options:**
  - `Completed` - Finished project
  - `In Progress` - Currently working on it
  - `Concept` - Design/planning phase
- **Default:** Completed

---

### Description Section

#### **Short Description** ⭐ Required
- **What it is:** Brief summary (1-2 sentences)
- **Character limit:** Aim for 150-200 characters
- **Example (Architecture):** "A contemporary apartment transformation focusing on maximizing natural light and creating flexible living spaces for a young professional."
- **Example (Coding):** "Comprehensive end-to-end testing framework built with Selenium and Python, reducing bug reports by 60% through automated regression testing."
- **Tips:**
  - Start with the main benefit or outcome
  - Include key achievement or result
  - Keep it engaging

#### **Full Description** (Optional but recommended)
- **What it is:** Detailed project description
- **Length:** 3-5 paragraphs
- **Should include:**
  - Project context and goals
  - Challenges faced
  - Solutions implemented
  - Results achieved
  - Technologies/methods used
- **Example structure:**
  ```
  Paragraph 1: Context - What was the situation?
  Paragraph 2: Challenge - What problem needed solving?
  Paragraph 3: Solution - How did you solve it?
  Paragraph 4: Implementation - What did you do?
  Paragraph 5: Results - What was the outcome?
  ```

---

### Project Details Section

#### **Category** ⭐ Required
- **Architecture options:**
  - Residential
  - Commercial
  - Interior Design
  - Renovation
  - Concept Design
  - Urban Planning
  
- **Coding options:**
  - Web Application
  - QA & Testing
  - Mobile App
  - API Development
  - DevOps
  - Tools & Utilities
  
- **Game options:**
  - 2D Game
  - 3D Game
  - Puzzle Game
  - Action Game
  - Educational Game

#### **Client** (Optional)
- **What it is:** Who the project was for
- **Examples:**
  - "Private Client"
  - "ABC Corporation"
  - "Personal Project"
  - "Startup XYZ"
- **Tips:** Use "Personal Project" if it's for yourself

#### **Location** (Architecture only)
- **What it is:** Where the project is located
- **Examples:**
  - "Warsaw, Poland"
  - "Kraków, Małopolska"
  - "Remote/Online"
- **Format:** City, Country or City, Region

#### **Technologies** (Coding/Game only)
- **What it is:** Tech stack used
- **Format:** Comma-separated list
- **Examples:**
  - "Python, Selenium, pytest, Jenkins"
  - "JavaScript, React, Node.js, MongoDB"
  - "Unity, C#, Blender, Git"
- **Tips:**
  - List 3-8 technologies
  - Order by importance/usage
  - Include frameworks and tools

#### **Role** (Optional)
- **What it is:** Your role in the project
- **Examples:**
  - "Lead Architect"
  - "QA Engineer"
  - "Full Stack Developer"
  - "Solo Developer"
  - "UI/UX Designer"

#### **Duration** (Optional)
- **What it is:** How long the project took
- **Examples:**
  - "3 months"
  - "6 weeks"
  - "1 year"
  - "Ongoing"
- **Format:** Number + time unit

---

## Adding Images

### Overview
Images are the most important visual element of your portfolio. The CMS converts them to base64 format automatically.

### Step-by-Step: Adding an Image

#### 1. Click "Add Image" Button
Located in the Media section of the form.

#### 2. Select Image File
- **Supported formats:** JPG, PNG, WebP, GIF
- **Recommended size:** 1920px width (maintains quality)
- **Max file size:** 5MB per image (browser limitation)

#### 3. Wait for Upload
- Progress indicator shows
- Image converts to base64
- Preview appears when complete

#### 4. Add Image Caption (Optional but recommended)
- **What it is:** Description of the image
- **Examples:**
  - "Living room with custom-built shelving"
  - "Main dashboard interface"
  - "Level 2 boss fight sequence"
- **Tips:**
  - Describe what's shown
  - Keep it concise (1 sentence)
  - Good for accessibility

#### 5. Set as Cover Image (Optional)
- First image is automatically the cover
- Click "Set as Cover" to change
- Cover image shows in portfolio grid

### Image Guidelines

**Architecture Projects:**
- Include before/after if applicable
- Show different angles of space
- Include detail shots
- Recommended: 5-10 images
- Order: Wide shots → Detail shots

**Coding Projects:**
- Screenshots of interface
- Code samples (as images)
- Architecture diagrams
- Results/metrics screenshots
- Recommended: 3-6 images

**Game Projects:**
- Gameplay screenshots
- Character/asset showcase
- Menu screens
- Key moments
- Recommended: 6-12 images

### Reordering Images

- Drag and drop to reorder
- First image = cover image
- Order matters for gallery display

### Removing Images

- Click "×" button on image
- Confirm deletion
- Cannot be undone (unless you haven't saved yet)

---

## Adding Files & Code

### When to Add Files

**Coding Projects:**
- Source code repositories
- Documentation PDFs
- Technical specifications
- Demo links

**Game Projects:**
- Playable builds (.zip)
- Game design documents
- Asset packs

**Architecture Projects:**
- Floor plans (PDF)
- 3D models (link)
- Technical drawings

### Step-by-Step: Adding a File

#### 1. Click "Add File" Button
Located below the images section.

#### 2. Select File Type
- **Code/Source** - Source code files
- **Document** - PDFs, docs
- **Link** - External URLs
- **Executable** - Game builds, apps

#### 3. Upload or Link
- **For files:** Click "Choose File" and select
- **For links:** Paste URL

#### 4. Add File Description
- **Required**
- **What it describes:** What the file contains
- **Examples:**
  - "Source code (GitHub repository)"
  - "Playable Windows build (.zip)"
  - "Technical documentation (PDF)"
  - "Live demo on Heroku"

#### 5. Preview Files
- Files list appears below form
- Can remove or reorder

---

## Generating HTML

### When to Generate

Generate HTML when:
- All required fields are filled ✓
- Images are uploaded ✓
- Description is complete ✓
- Everything looks good ✓

### Step-by-Step: Generate HTML

#### 1. Scroll to Bottom of Form

Find the "Generate HTML" button.

#### 2. Click "Generate HTML"

**What happens:**
- CMS validates all fields
- Checks for required information
- Creates HTML from template
- Applies correct theme (light/dark)
- Optimizes for SEO

#### 3. Review Generated HTML

A preview window opens showing:
- Complete HTML code
- Rendered preview
- File size information

#### 4. Check the Preview

Look for:
- ✓ Title displays correctly
- ✓ Images load properly
- ✓ Description is formatted well
- ✓ Links work
- ✓ Theme is correct (light for architecture, dark for coding)

#### 5. Make Adjustments if Needed

If something looks wrong:
- Click "Close" or "Cancel"
- Edit the form
- Generate again

---

## Saving the Project File

### Step-by-Step: Download & Save

#### 1. Click "Download HTML"

In the preview window, click the download button.

#### 2. Choose File Location

Save to: `/home/michal/Documents/sketchAndScript/projects/`

#### 3. Name the File Correctly

**Format:** `[type]-project-[number].html`

**Examples:**
- `architecture-project-10.html`
- `coding-project-3.html`
- `coding-project-game-2.html`

**How to find the next number:**
```bash
# List existing projects
ls projects/

# Count architecture projects
ls projects/architecture-project-*.html | wc -l

# Count coding projects
ls projects/coding-project-*.html | wc -l
```

**Important:**
- Use lowercase
- No spaces
- Consistent numbering
- Include project type prefix

#### 4. Verify File Saved

Check that the file exists:
```bash
ls -lh projects/[your-new-file].html
```

You should see your file with a size (typically 50-500KB depending on images).

---

## Adding to Portfolio Pages

Your project file is saved, but it won't show in the portfolio yet. You need to add it to the listing page.

### For Architecture Projects

#### 1. Open `architecture.html`

```bash
# In your editor
code architecture.html
```

#### 2. Find the Projects Section

Look for:
```html
<div class="projects-grid" id="projects-grid">
```

#### 3. Add Project Card

Add this structure **at the top** of the grid:

```html
<article class="project-card" data-category="[category]" data-tags="[tags]">
    <a href="projects/architecture-project-10.html" class="project-link">
        <div class="project-image">
            <img src="[cover-image-path]" alt="[project-title]">
        </div>
        <div class="project-info">
            <h3>[Project Title]</h3>
            <p class="project-year">[Year]</p>
            <p class="project-description">[Short description]</p>
            <div class="project-tags">
                <span class="tag">[tag1]</span>
                <span class="tag">[tag2]</span>
            </div>
        </div>
    </a>
</article>
```

#### 4. Fill in the Values

Replace the placeholders:
- `[category]` → Your project category (residential, commercial, etc.)
- `[tags]` → Comma-separated tags
- `architecture-project-10.html` → Your file name
- `[cover-image-path]` → Path to cover image
- `[project-title]` → Your project title
- `[Year]` → Project year
- `[Short description]` → Brief description
- `[tag1]`, `[tag2]` → Individual tags

#### 5. Save the File

```bash
# Save in your editor
Ctrl+S (or Cmd+S on Mac)
```

### For Coding Projects

Same process, but edit `coding.html` instead.

**Game projects go in `coding.html`** with category="game"

---

## Testing Locally

Before deploying, always test locally!

### Step 1: Ensure Dev Server is Running

```bash
# If not running:
./start-both-servers.sh
```

### Step 2: Open Dev Site

Visit: http://localhost:8000

### Step 3: Navigate to Portfolio Page

- Click "Architecture" or "QA & Development"
- Your new project should appear in the grid

### Step 4: Click Your Project

- Opens your new project page
- Check all images load
- Read through content
- Test all links

### Step 5: Check Different Views

**Desktop:**
- Full screen (1920px+)
- Medium screen (1024px)

**Mobile:**
- Open browser dev tools (F12)
- Toggle device toolbar
- Test on different device sizes:
  - iPhone (375px)
  - iPad (768px)
  - Android (360px)

### Step 6: Test Navigation

- Click "Back" button
- Use keyboard (Tab, Enter)
- Test filter/search if applicable

### Common Issues to Check

- [ ] Images load correctly
- [ ] No broken links
- [ ] Text is readable
- [ ] Mobile layout works
- [ ] Project appears in grid
- [ ] Filters work (if tagged)
- [ ] Theme is correct
- [ ] Smooth transitions

---

## Deploying to Production

When everything works locally, it's time to go live!

### Step 1: Stop the Servers

```bash
./stop-servers.sh
```

### Step 2: Check Git Status

```bash
git status
```

You should see:
- `modified: architecture.html` or `coding.html`
- `new file: projects/[your-project].html`
- Possibly `modified: images/...` if you added new images

### Step 3: Review Changes

```bash
git diff architecture.html
# or
git diff coding.html
```

Make sure only your new project card was added.

### Step 4: Stage Changes

```bash
git add architecture.html  # or coding.html
git add projects/[your-new-file].html
git add images/  # if you added images
```

### Step 5: Commit

```bash
git commit -m "Add new project: [Project Name]"
```

**Good commit messages:**
- "Add new project: Modern Apartment Redesign"
- "Add coding project: E-commerce Testing Framework"
- "Add game: Space Explorer 2D"

### Step 6: Push to Dev Branch

```bash
git push origin dev
```

### Step 7: Run Publish Script

```bash
./publish.sh
```

**What the script does:**
1. Checks you're on the right branch
2. Pulls latest changes
3. Merges dev → main
4. Pushes to GitHub
5. Triggers GitHub Pages deployment

### Step 8: Wait for Deployment

- GitHub Pages takes 2-3 minutes
- You'll see "Deploying..." in GitHub Actions
- Wait for "Deployment successful"

### Step 9: Verify on Live Site

1. Open https://www.sketchandscript.pl
2. Hard refresh (Ctrl+Shift+R)
3. Navigate to your portfolio page
4. Click your new project
5. Verify everything works

### Step 10: Clear Cache if Needed

If you don't see changes:
1. Clear browser cache
2. Try incognito/private mode
3. Try different browser
4. Wait another 2-3 minutes

---

## Workflow Checklist

Use this checklist every time you add a project:

### Pre-Work
- [ ] Gather all project information
- [ ] Collect high-quality images
- [ ] Prepare descriptions
- [ ] Have files/links ready

### In CMS
- [ ] Start servers (`./start-both-servers.sh`)
- [ ] Open CMS (http://localhost:8080)
- [ ] Click "New Project"
- [ ] Choose correct type
- [ ] Fill all required fields
- [ ] Add description (short & full)
- [ ] Upload images (5-10 for architecture, 3-6 for coding)
- [ ] Add captions to images
- [ ] Add files/links if needed
- [ ] Add relevant tags
- [ ] Generate HTML
- [ ] Review preview
- [ ] Download HTML file
- [ ] Save with correct name in `projects/`

### In Portfolio Page
- [ ] Open `architecture.html` or `coding.html`
- [ ] Add project card to grid
- [ ] Fill in all card information
- [ ] Save file

### Testing
- [ ] Refresh dev site (http://localhost:8000)
- [ ] Find your project in grid
- [ ] Click to open project page
- [ ] Check all images
- [ ] Test all links
- [ ] Test on mobile view
- [ ] Test navigation
- [ ] Test filters/search

### Deployment
- [ ] Stop servers (`./stop-servers.sh`)
- [ ] Check git status
- [ ] Review changes (`git diff`)
- [ ] Stage files (`git add`)
- [ ] Commit with good message
- [ ] Push to dev
- [ ] Run `./publish.sh`
- [ ] Wait 2-3 minutes
- [ ] Verify on live site
- [ ] Test live project page

### Post-Deployment
- [ ] Share on social media (optional)
- [ ] Update LinkedIn (optional)
- [ ] Notify client (if applicable)
- [ ] Back up CMS data

---

## Troubleshooting

### CMS Won't Load

**Problem:** http://localhost:8080 shows error

**Solutions:**
1. Check if server is running:
   ```bash
   lsof -ti:8080
   ```
2. Restart servers:
   ```bash
   ./stop-servers.sh
   ./start-both-servers.sh
   ```
3. Check for errors in terminal

### Images Won't Upload

**Problem:** Image upload fails or hangs

**Solutions:**
1. Check file size (max 5MB)
2. Try different format (JPG instead of PNG)
3. Compress image first
4. Try smaller image
5. Check browser console for errors (F12)

### Generated HTML Missing Images

**Problem:** HTML file doesn't show images

**Solutions:**
1. Images should be embedded as base64
2. Check if images uploaded successfully in CMS
3. Regenerate HTML
4. Check image file formats

### Project Not Showing in Portfolio

**Problem:** Can't find new project on portfolio page

**Solutions:**
1. Check you added project card to portfolio page
2. Verify file path in card is correct
3. Check category matches filters
4. Hard refresh page (Ctrl+Shift+R)
5. Check console for JavaScript errors

### "File Not Found" Error

**Problem:** Clicking project shows 404

**Solutions:**
1. Verify file name matches link in portfolio card
2. Check file is in `projects/` folder
3. Check spelling and capitalization
4. Verify file has `.html` extension

### Changes Not Showing on Live Site

**Problem:** Deployed but old version still showing

**Solutions:**
1. Wait 5 minutes (GitHub Pages can be slow)
2. Hard refresh (Ctrl+Shift+R)
3. Clear browser cache
4. Try incognito mode
5. Check GitHub Actions for deployment status
6. Verify changes are on main branch

### Mobile Layout Broken

**Problem:** Project looks bad on mobile

**Solutions:**
1. Check responsive CSS is included
2. Test with browser dev tools
3. Verify viewport meta tag exists
4. Check image sizes
5. Test on actual device

### CMS Data Lost

**Problem:** Projects disappeared from CMS

**Solutions:**
1. CMS uses LocalStorage (browser-specific)
2. Check you're using same browser
3. Check browser storage not cleared
4. HTML files are still safe in `projects/` folder
5. Can recreate CMS entries if needed

### Port Already in Use

**Problem:** Error starting servers

**Solution:**
```bash
# Kill existing processes
./stop-servers.sh

# Or manually:
pkill -f 'python3 -m http.server'

# Then restart
./start-both-servers.sh
```

---

## Tips for Success

### Project Quality
- Use high-resolution images
- Write clear, concise descriptions
- Include results/outcomes
- Show before/after when possible
- Highlight your role and contributions

### SEO Optimization
- Use descriptive titles
- Include relevant keywords in description
- Add alt text to images (via captions)
- Use proper heading hierarchy
- Include project dates

### Performance
- Optimize images before upload (use tools like TinyPNG)
- Keep file sizes reasonable
- Don't upload dozens of images
- Compress game builds before linking

### Consistency
- Use similar description lengths
- Maintain consistent image quality
- Use same tone of voice
- Keep project card format consistent
- Regular updates (monthly or quarterly)

### Organization
- Export CMS data regularly as backup
- Keep local images folder organized
- Document project numbers
- Maintain changelog of additions

---

## Quick Reference Commands

```bash
# Start development environment
./start-both-servers.sh

# Stop servers
./stop-servers.sh

# Check what's running on ports
lsof -ti:8080,8000

# Kill processes manually
pkill -f 'python3 -m http.server'

# Count projects
ls projects/architecture-project-*.html | wc -l
ls projects/coding-project-*.html | wc -l

# Git workflow
git status
git add .
git commit -m "Add new project: [Name]"
git push origin dev
./publish.sh

# View local site
# CMS: http://localhost:8080
# Dev Site: http://localhost:8000
# Live Site: https://www.sketchandscript.pl
```

---

## Support

**Questions or issues?**
- Check this guide first
- Review the main [README.md](README.md)
- Check browser console (F12) for errors
- Verify all files are in correct locations

**Need help?**
- Email: michalwicherek@gmail.com
- GitHub: [@fredziarz](https://github.com/fredziarz)

---

**Happy project adding! 🎉**

*Last updated: October 2025*

