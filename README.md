# Sketch & Script

> **Where architecture meets code, and design intersects with logic**

A professional portfolio showcasing two complementary disciplines: architectural design and software quality engineering.

**🌐 Live at:** [www.sketchandscript.pl](https://www.sketchandscript.pl)

---

## 🎯 About This Project

Most people see architecture and software development as completely separate worlds. This portfolio challenges that notion. Both fields require:

- **Creative problem-solving** - Whether designing a functional living space or debugging complex code
- **Attention to detail** - From precise measurements to pixel-perfect interfaces
- **User-centric thinking** - Understanding how people interact with spaces and software
- **Systematic approach** - Balancing aesthetics with functionality

**Sketch & Script** represents the intersection of these disciplines, demonstrating how systematic thinking enhances design, and creative vision enriches technical work.

---

## 📐 What You'll Find Here

### **Architecture & Interior Design**
Transforming spaces into experiences. Projects showcasing:
- Residential and commercial design
- Space planning and optimization
- Interior styling and aesthetics
- Functional, beautiful environments

### **QA Engineering & Development**
Building quality through code. Projects featuring:
- Quality assurance and systematic testing
- Web application development
- Game development (coding meets creativity)
- Robust, user-friendly software solutions

---

## 🎨 Design Philosophy

**Split Personality**
- **Light theme** for architecture - open, airy, minimalist
- **Dark theme** for coding - focused, technical, modern
- Seamless transitions between both worlds

**Accessibility First**
- Fully keyboard navigable (WCAG 2.2 Level AA compliant)
- Thoughtful UX that works for everyone
- Responsive design for all devices

**Performance Matters**
- Pure HTML/CSS/JavaScript - no bloated frameworks
- Fast loading times
- Optimized for both user experience and search engines

---

## 📱 Features

- ✅ **Split homepage** - Choose your path: Architecture or Code
- ✅ **Project galleries** - Detailed case studies with images
- ✅ **Architecture gallery** - mir.no-inspired vertical scroll design with fullscreen lightbox
- ✅ **Interactive lightbox** - Swipe, keyboard, and click navigation with image counter
- ✅ **Content Management System** - Browser-based CMS with media library and image picker
- ✅ **Smooth animations** - Professional page transitions
- ✅ **Mobile responsive** - Perfect on phones, tablets, desktops
- ✅ **Keyboard shortcuts** - Alt+A (Architecture), Alt+C (Coding), Arrow keys (lightbox)
- ✅ **SEO optimized** - Proper meta tags, sitemap, robots.txt

---

## 🏗️ Architecture Project Template

Architecture projects use a clean, mir.no-inspired gallery design with these features:

**Gallery Design:**
- Clean vertical scroll layout for optimal image viewing
- Hero image with overlaid project info (desktop) or stacked layout (mobile)
- Consistent 2rem spacing throughout
- Support for single images or 2-column image rows

**Interactive Lightbox:**
- Click/tap any image to view fullscreen
- Navigate with swipe gestures (mobile), arrow keys, or navigation buttons
- Image counter shows position (e.g., "3 / 7")
- White blurred background with elegant shadow
- Close with Escape key or background click

**Mobile-First Responsive:**
- Desktop: Hero image with bronze/gold overlay (#B8936D)
- Mobile: Hero image → white project info section → gallery
- Touch-optimized navigation with 50px swipe threshold

**Template Location:** `templates/architecture-project-template.html`

---

## 🚀 For Developers - CMS Workflow

> **📖 Complete Guide:** See [CMS_GUIDE.md](CMS_GUIDE.md) for detailed step-by-step instructions

### Quick Start

**Start Development Environment:**
```bash
./start-both-servers.sh
```

Opens automatically:
- **CMS** → http://localhost:8080 (manage content)
- **Dev Site** → http://localhost:8000 (preview changes)

**Stop Servers:**
```bash
./stop-servers.sh
```

---

## Adding New Projects

### 1. Open CMS
Visit http://localhost:8080 (after running `./start-both-servers.sh`)

### 2. Create Project
Click **"New Project"** button, choose type:
- **Architecture** - Building/interior design projects
- **Coding** - Web apps, QA projects
- **Game** - Interactive games and demos

### 3. Fill Form

**Required:**
- **Title** - Project name (e.g., "Modern Apartment Redesign")
- **Description** - What the project is about (2-3 sentences)
- **Year** - When it was completed
- **Category** - Project type (residential, web-app, game, etc.)

**Optional:**
- **Tags** - Keywords for filtering (e.g., "3D, visualization, interior")
- **Client** - Who it was for
- **Technologies** - Tools/languages used (for coding projects)

### 4. Add Media

**Media Library with Image Picker:**
- Upload images to centralized media library
- Click 🖼️ button in form fields to select from uploaded images
- Single selection for featured images
- Multiple selection for galleries/screenshots
- Images converted to base64 automatically (no separate files)
- Supports JPG, PNG, WebP, GIF, SVG (max 10MB)

**Recommended sizes:**
- Architecture hero images: 1920px width
- Gallery images: 1920px width
- Coding screenshots: 1600px width

### 5. Generate & Save

1. Click **"Generate HTML"** button
2. Click **"Download HTML"**
3. Save as `projects/[type]-project-[number].html`
   - Architecture: `architecture-project-10.html`
   - Coding: `coding-project-3.html`
   - Game: `coding-project-game-2.html`

### 6. Preview

Click **"Dev Site"** button in CMS to preview at http://localhost:8000

### 7. Deploy

When ready to publish:
```bash
./publish.sh
```

---

## 📊 Project Structure

```
sketchAndScript/              # Main website
├── start-both-servers.sh    # Start CMS + Dev
├── stop-servers.sh          # Stop servers
├── publish.sh               # Deploy to production
├── index.html               # Split homepage
├── architecture.html        # Architecture portfolio
├── coding.html              # Coding portfolio
├── projects/                # Individual project pages
│   ├── architecture-project-*.html
│   └── coding-project-*.html
├── css/                     # Theming & responsive design
│   ├── styles.css           # Core styles
│   ├── architecture-theme.css  # Light theme
│   ├── coding-theme.css     # Dark theme
│   └── project-slider.css   # Image galleries
├── js/                      # Interactive functionality
│   ├── script.js
│   ├── keyboard-accessibility.js
│   └── page-transitions.js
└── images/                  # Media organized by category

sketchAndScript-cms/         # CMS (separate branch)
├── index.html               # CMS interface
├── js/                      # CMS logic & modules
└── css/                     # CMS styles
```

---

## 🔄 Workflow Summary

```
1. ./start-both-servers.sh     ← Start everything
2. Open http://localhost:8080  ← Create project in CMS
3. Fill form, add images       ← Add content
4. Generate HTML               ← Create project page
5. Copy to projects/           ← Save file
6. Click "Dev Site"            ← Preview changes
7. ./publish.sh                ← Deploy when ready
8. ./stop-servers.sh           ← Stop servers
```

---

## 🛠️ Built With

- **Pure HTML5/CSS3/JavaScript** - No dependencies, no build process
- **mir.no-inspired gallery** - Clean vertical scroll design for architecture projects
- **Custom lightbox system** - Touch, swipe, and keyboard navigation
- **PT Sans typography** - Clean, professional, readable
- **GitHub Pages** - Free, reliable hosting
- **Custom domain** - Professional presence
- **Browser-based CMS** - LocalStorage with media library and image picker

---

## 💡 Tips & Best Practices

### Adding Images
- Use high-quality images (1920px width recommended)
- CMS converts to base64 (no separate image files needed)
- Add descriptive captions for accessibility

### Project Numbers
- Check existing files in `projects/` folder
- Use next available number
- Format: `[type]-project-[number].html`

### Testing
- Always preview in Dev Site before deploying
- Check both mobile and desktop views
- Test navigation and links

### Backup
- Export data from CMS regularly
- Keep project files in version control
- LocalStorage is browser-specific

---

## 🔧 Troubleshooting

**CMS not loading?**
- Run `./start-both-servers.sh` from main directory
- Check http://localhost:8080 in browser

**Port already in use?**
- Run `./stop-servers.sh` first
- Or: `pkill -f 'python3 -m http.server'`

**Images not showing?**
- Check file format (JPG, PNG, WebP)
- CMS handles conversion automatically

**Changes not visible on live site?**
- Wait 2-3 minutes after `./publish.sh`
- Hard refresh browser (Ctrl+Shift+R)

---

## ⌨️ Keyboard Navigation

Because good UX means **everyone** can navigate efficiently:

| Shortcut | Action |
|----------|--------|
| `Alt + H` | Go to homepage |
| `Alt + A` | Architecture portfolio |
| `Alt + C` | QA & Coding portfolio |
| `Tab` | Navigate through links |
| `Enter/Space` | Activate buttons |
| `Escape` | Close menus / Exit lightbox |
| `← →` | Navigate lightbox images (architecture projects) |

---

## 🌟 Philosophy in Practice

This portfolio embodies a simple truth: **the best work happens at the intersection of disciplines**.

- Architecture teaches **spatial thinking** that improves UI/UX design
- Coding teaches **systematic approaches** that optimize design workflows
- Design thinking brings **creativity** to technical problem-solving
- Engineering rigor ensures **quality** in creative projects

Whether designing a room or debugging code, the principles remain the same: understand the user, solve real problems, and deliver quality work.

---

## 📞 Contact

**Michał Wicherek**
- 🌐 Website: [www.sketchandscript.pl](https://www.sketchandscript.pl)
- 📧 Email: michalwicherek@gmail.com
- 💼 LinkedIn: [linkedin.com/in/michal-wicherek](https://linkedin.com/in/michal-wicherek)
- 💻 GitHub: [@fredziarz](https://github.com/fredziarz)

---

## 🎓 For Developers

This portfolio can serve as a template for others. Key learnings:
- Building accessible websites without frameworks
- Implementing dual themes (light/dark)
- Creating smooth page transitions
- Browser-based CMS with LocalStorage and media library
- Interactive lightbox with swipe/touch/keyboard navigation
- mir.no-inspired clean gallery design
- Mobile-first responsive architecture
- Deploying to GitHub Pages with custom domain

**Repository:** [github.com/fredziarz/sketch_and_script](https://github.com/fredziarz/sketch_and_script)

**Architecture Template:** See `templates/architecture-project-template.html` for the complete gallery system with lightbox, responsive design, and all placeholders documented.

---

**Built with passion. Crafted with precision. Deployed with confidence.** ✨

---

*This portfolio showcases professional work in architecture, interior design, QA engineering, and game development. All projects represent real work and genuine expertise in both creative and technical domains.*
