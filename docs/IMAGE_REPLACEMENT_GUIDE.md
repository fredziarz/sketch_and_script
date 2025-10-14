# Image Replacement Guide

Quick reference for replacing placeholder images with your own.

## Homepage Hero Images

### Architecture Background
**Location:** `images/hero-architecture.jpg`
- **Recommended size:** 1920x1080px or larger
- **Format:** JPG or WebP (optimize for web)
- **Content:** Architecture, interiors, or building design photo
- **Tip:** High-quality architectural photography works best

### Coding Background
**Location:** `images/hero-coding.jpg`
- **Recommended size:** 1920x1080px or larger
- **Format:** JPG or WebP (optimize for web)
- **Content:** Code, technology, or development-related imagery
- **Tip:** Abstract tech patterns or code screenshots work well

---

## Favicon & Logo

### Favicon
**Location:** `images/favicon.svg`
- **Current:** "S&S" monogram
- **Format:** SVG (recommended) or PNG (16x16, 32x32, 180x180)
- **Replace:** Edit the SVG or create your own
- **Note:** Keep it simple and recognizable at small sizes

### Logo Icon
**Location:** `images/logo-icon.svg`
- **Current:** Crossed pen & ruler icon
- **Format:** SVG (recommended)
- **Size:** 32x32px display size
- **Replace:** Edit the SVG or create your own
- **Used in:** Navigation bar (all pages)

---

## Project Images

### Architecture Projects
**Location:** `images/architecture/`
- **Naming:** `project-X.jpg` (where X = 1-9)
- **Recommended size:** 800x600px minimum
- **Format:** JPG or WebP
- **Used on:** Portfolio gallery cards

### Coding Projects
**Location:** `images/coding/`
- **Naming:** `project-X.jpg`
- **Recommended size:** 800x600px minimum
- **Format:** JPG or WebP
- **Used on:** Project cards and detail pages

### Game Projects
**Location:** `images/games/`
- **Naming:** `game-X.jpg`
- **Recommended size:** 800x600px minimum (or game aspect ratio)
- **Format:** JPG, PNG, or WebP
- **Tip:** Screenshots or promotional art from your games

---

## Image Optimization

### Before uploading:
1. **Resize** to appropriate dimensions
2. **Compress** using tools like:
   - [Squoosh.app](https://squoosh.app)
   - [TinyPNG](https://tinypng.com)
   - ImageOptim (Mac)
3. **Target size:** Under 500KB per image
4. **Format:** 
   - Photos: JPG (quality 75-85)
   - Graphics/logos: SVG or PNG
   - Modern browsers: WebP

### Quick optimization:
```bash
# Using imagemagick (if installed)
convert original.jpg -resize 1920x1080 -quality 80 hero-architecture.jpg
```

---

## CSS Background Images

If you change image filenames, update these files:

### Homepage hero backgrounds:
**File:** `css/styles.css`
```css
/* Line ~300 */
.architecture-side {
    background-image: url('images/hero-architecture.jpg');
}

.qa-side {
    background-image: url('images/hero-coding.jpg');
}
```

---

## Need Help?

- All images use relative paths from the CSS/HTML file location
- Placeholder images are intentionally simple for easy replacement
- Keep original aspect ratios where possible
- Test images on mobile and desktop views

