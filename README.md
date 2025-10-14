# Sketch & Script Portfolio

> **Professional portfolio for architecture, QA/coding, and game development**
> 
> **Domain**: sketchandscript.pl | **Hosting**: GitHub Pages (free) | **Contact**: michalwicherek@gmail.com

---

## 🚀 Quick Deploy

**Repository:** [github.com/fredziarz/sketch_and_script](https://github.com/fredziarz/sketch_and_script)

```bash
# 1. Prepare project (move files to root)
cd ~/Documents/sketchAndScript
./prepare-deployment.sh

# 2. Push to GitHub
git remote add origin https://github.com/fredziarz/sketch_and_script.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages
# Visit: https://github.com/fredziarz/sketch_and_script/settings/pages
# Source: main branch, / (root) folder

# 4. Configure DNS at your registrar
# Add 4 A records + 1 CNAME (see DEPLOYMENT.md)

# 5. Add custom domain in GitHub: www.sketchandscript.pl
# 6. Wait for DNS propagation (1-24 hours)
# 7. Enable HTTPS
```

**✅ Live at:** `https://www.sketchandscript.pl`

**📖 Full guide:** See `DEPLOYMENT.md`

---

## 📁 Project Structure

```
sketchAndScript/
├── README.md                    (This file)
├── DEPLOYMENT.md                (Deployment guide)
├── PROJECT_MANAGEMENT_GUIDE.md  (Add/manage projects)
├── FINAL_SUMMARY.md             (Technical details)
├── WCAG_2.2_COMPLIANCE.md       (Accessibility info)
├── prepare-deployment.sh        (Setup automation)
├── .gitignore                   
└── starter-template/            (Website files)
    ├── index.html, architecture.html, coding.html
    ├── CNAME (www.sketchandscript.pl)
    ├── robots.txt, sitemap.xml
    ├── css/, js/, images/
    ├── projects/ (11 pages)
    └── templates/
```

**Note:** Before deploying, files must move from `starter-template/` to root (script does this automatically)

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | This file - overview |
| `DEPLOYMENT.md` | Complete deployment guide |
| `PROJECT_MANAGEMENT_GUIDE.md` | Add/manage content |
| `FINAL_SUMMARY.md` | Technical details |
| `WCAG_2.2_COMPLIANCE.md` | Accessibility compliance |

---

## ⌨️ Keyboard Accessibility

### **Features:**
- ✅ Full keyboard navigation (Tab, Enter, Escape)
- ✅ Skip navigation link
- ✅ Enhanced focus indicators
- ✅ Filter navigation with arrow keys
- ✅ **WCAG 2.2 Level AA compliant** 🌟
- ✅ Minimum 44x44px tap targets (exceeds 24x24px requirement)

### **Keyboard Shortcuts:**
| Shortcut | Action |
|----------|--------|
| `Alt + H` | Homepage |
| `Alt + A` | Architecture |
| `Alt + C` | Coding/QA |
| `/` | Focus filter |
| `Escape` | Close menu |

### **Test It:**
1. Press `Tab` to navigate
2. Use `Arrow keys` on filter buttons
3. Press `Enter/Space` to activate

---

## 🎨 Features

### **Design:**
- ✅ Split homepage (architecture/coding)
- ✅ Light theme for architecture
- ✅ Dark theme for coding
- ✅ Smooth page transitions
- ✅ Mobile responsive
- ✅ PT Sans typography

### **Technical:**
- ✅ No build process needed
- ✅ Pure HTML/CSS/JavaScript
- ✅ Optimized for performance
- ✅ SEO-friendly
- ✅ Fast loading (<2s)

### **Content Management:**
- ✅ Easy project addition
- ✅ Template files included
- ✅ Comprehensive guides included
- ✅ No build process needed

---

## 📝 Adding Projects

See `PROJECT_MANAGEMENT_GUIDE.md` for complete instructions on adding and managing portfolio content.

---

## 🔄 Updating Content

```bash
cd ~/Documents/sketchAndScript
# Make your changes
git add .
git commit -m "Update content"
git push
# Wait 2-3 minutes → live at www.sketchandscript.pl
```

Test locally before pushing:
```bash
python3 -m http.server 8000  # Visit http://localhost:8000
```

---

## 🛠️ Troubleshooting

See `DEPLOYMENT.md` for common issues and solutions.

---

## ✨ Features

- Split homepage (architecture/coding)
- Light/dark themes
- Keyboard accessible (WCAG 2.2 AA)
- Mobile responsive
- SEO optimized
- Free GitHub Pages hosting

---

## 📞 Contact

- **Author:** Michał Wicherek
- **Email:** michalwicherek@gmail.com
- **Location:** 95-083 Wrząca

---

**Ready to deploy?** → See `DEPLOYMENT.md`
