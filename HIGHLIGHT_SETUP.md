# How to Enable "Highlight New Content" Feature

This guide shows you how to add elegant highlighting for new projects on your dev site.

---

## 🎯 What It Does

When you click **"🔧 Dev Site"** in the CMS, it opens your local dev site with new content beautifully highlighted:

✨ **Visual Effects:**
- Pulsing blue glow around new projects
- "NEW ✨" badge in corner
- Auto-scroll to new content
- Notification banner
- Smooth animations

---

## 📋 Setup Instructions

### Step 1: Add the Script to Your Dev Branch

```bash
# Switch to dev branch
git checkout dev

# Copy the highlight script
cp highlight-new.js js/highlight-new.js
```

### Step 2: Add Script to Your HTML Pages

Add this line before the closing `</body>` tag in:
- `index.html`
- `architecture.html`
- `coding.html`

```html
    <!-- Highlight new content (dev only) -->
    <script src="js/highlight-new.js"></script>
</body>
</html>
```

### Step 3: (Optional) Mark Specific Projects as New

You can manually mark projects as new by adding `data-new="true"`:

```html
<!-- Add this to your newest project card -->
<article class="project-card" data-new="true">
    <a href="projects/your-new-project.html">
        ...
    </a>
</article>
```

---

## 🚀 How to Use

### Daily Workflow

1. **Create project in CMS** (cms branch)
   ```bash
   git checkout cms
   ./start-cms.sh
   # Create project → Download HTML
   ```

2. **Add to dev site** (dev branch)
   ```bash
   git checkout dev
   # Move HTML to projects/
   # Add images to images/
   # Update architecture.html or coding.html
   ```

3. **Start dev server**
   ```bash
   python3 -m http.server 8000
   ```

4. **Preview with highlighting**
   - In CMS, click **"🔧 Dev Site"**
   - New content automatically highlighted!
   - Check everything looks good

5. **Publish when ready**
   ```bash
   git commit -m "Add new project"
   git push origin dev
   ./publish.sh
   ```

---

## 🎨 Customization

### Change Colors

Edit `js/highlight-new.js` and modify the colors:

```javascript
// Blue (default)
background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);

// Green
background: linear-gradient(135deg, #10b981 0%, #34d399 100%);

// Purple
background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);

// Orange
background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
```

### Change Badge Text

Find this line and change the text:

```javascript
content: "NEW ✨";
// Change to:
content: "LATEST ⭐";
content: "FRESH 🎉";
content: "RECENT ✨";
```

### Disable Auto-Scroll

Remove or comment out this section:

```javascript
// Scroll to the highlighted project after a short delay
setTimeout(() => {
    firstProject.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}, 500);
```

---

## 🔧 How It Works

1. **CMS adds `?highlight=new` to URL**
   - Dev button: `http://localhost:8000?highlight=new`
   - Script checks for this parameter

2. **Script automatically highlights**
   - First project card (assumed newest)
   - Any element with `data-new="true"`

3. **Visual effects applied**
   - Pulsing glow animation
   - "NEW" badge with bounce
   - Notification banner
   - Auto-scroll to content

---

## 💡 Tips

### Highlighting Multiple Projects

```html
<article class="project-card" data-new="true">...</article>
<article class="project-card" data-new="true">...</article>
<article class="project-card" data-new="true">...</article>
```

### Remove Highlighting

Just remove `data-new="true"` when project is no longer new.

### Testing

```bash
# Without highlighting
http://localhost:8000

# With highlighting
http://localhost:8000?highlight=new
```

---

## 🎯 Example Workflow

```
DAY 1: Add new project
─────────────────────────
1. CMS: Create "Modern Loft" project
2. Dev: Add to architecture.html (first card)
3. Preview: Click "🔧 Dev Site" → See it highlighted!
4. Publish: ./publish.sh when ready

DAY 7: Add another project
─────────────────────────
1. CMS: Create "Pixel Game" project
2. Dev: Add to coding.html (first card)
3. Preview: Click "🔧 Dev Site" → New one highlighted!
4. Old "Modern Loft" no longer highlighted (automatically)
```

---

## ❓ FAQ

**Q: Do I need to remove the script from live site?**  
A: No! Script only activates when `?highlight=new` is in URL. Safe to leave on production.

**Q: Can I disable it temporarily?**  
A: Yes! Open dev site without `?highlight=new` parameter, or remove the script tag.

**Q: Will it work on mobile?**  
A: Yes! All animations and effects are responsive.

**Q: Can I highlight sections instead of projects?**  
A: Yes! Add `data-new="true"` to any element you want highlighted.

---

## 🎉 Result

Now when you click **"🔧 Dev Site"** from the CMS:
- Opens your local dev site
- New content elegantly highlighted
- Easy to spot what changed
- Beautiful animations and effects
- Professional look and feel

Perfect for previewing changes before publishing! ✨

---

**Version 1.0** | October 2025

