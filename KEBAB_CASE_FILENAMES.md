# Kebab-Case Filenames Feature

**Date:** November 3, 2025  
**Status:** ✅ Complete

## Overview

The CMS now automatically converts uploaded image filenames to **kebab-case** format and uses these clean filenames in project file paths instead of base64 data or references.

## What Changed

### Before
- Uploaded: `My Cool Photo (2024).jpg`
- Used in forms: `data:image/jpeg;base64,/9j/4AAQSkZJ...` (3 MB string)
- Problems: Performance issues, unreadable, can't version control

### After
- Uploaded: `My Cool Photo (2024).jpg`
- **Converted to:** `my-cool-photo-2024.jpg`
- **Used in forms:** `../images/architecture/my-cool-photo-2024.jpg`
- Benefits: Clean, readable, standard web paths

## Features

### ✅ Automatic Kebab-Case Conversion

Filenames are automatically converted when uploaded:

```javascript
"My Project Image.jpg"        → "my-project-image.jpg"
"Photo 2024-11-03.png"        → "photo-2024-11-03.png"
"IMG_1234 (final).jpg"        → "img-1234-final.jpg"
"Architecture Project #5.png" → "architecture-project-5.png"
```

### ✅ Smart Path Generation

Paths are generated based on project type:

- **Architecture projects:** `../images/architecture/filename.jpg`
- **Coding projects:** `../images/coding/filename.jpg`
- **Game projects:** `../images/games/filename.jpg`

### ✅ Download with Correct Names

Each image in the Media Library has a download button (💾) that saves the image with its kebab-case filename, ready to be placed in your project folders.

### ✅ Visual Feedback

When you select images from the Media Library:
- Input field shows: `../images/architecture/my-image.jpg`
- Placeholder shows: `✓ Selected: my-image.jpg`
- Green border confirms selection

## How It Works

### 1. Upload Images

```
1. Go to Media Library (🖼️)
2. Click "Upload Files"
3. Select images (e.g., "My Project Photo.jpg")
4. CMS automatically creates kebab-case name: "my-project-photo.jpg"
```

### 2. Download Images

```
1. In Media Library, find your image
2. Click the 💾 download button
3. Image downloads as "my-project-photo.jpg"
4. Save to appropriate folder:
   - /images/architecture/
   - /images/coding/
   - /images/games/
```

### 3. Use in Projects

```
1. Create new project (Architecture/Coding/Game)
2. Click 🖼️ button next to image fields
3. Select image(s) from library
4. Path automatically inserted: ../images/architecture/my-project-photo.jpg
5. Submit form - HTML generated with correct paths
```

## Workflow

### Complete Image Workflow:

```
Upload → Kebab-Case → Store → Download → Place in Folder → Use in Project
  (UI)     (auto)     (local)    (💾)      (file system)     (CMS forms)
```

### Example:

```
1. Upload "Apartment Interior - Living Room.jpg"
2. CMS converts to "apartment-interior-living-room.jpg"
3. Download the image with 💾 button
4. Save to: /images/architecture/apartment-interior-living-room.jpg
5. In Architecture project form, select image with 🖼️
6. Path inserted: ../images/architecture/apartment-interior-living-room.jpg
7. Generate project HTML - image path is correct!
```

## Technical Details

### Conversion Rules

The `toKebabCase()` function:
1. Removes file extension
2. Converts to lowercase
3. Replaces all non-alphanumeric characters with hyphens
4. Removes leading/trailing hyphens
5. Re-adds original extension

```javascript
toKebabCase("My Cool Photo (2024).jpg")
→ "my-cool-photo-2024.jpg"
```

### Storage

```javascript
{
  id: "abc123",
  name: "My Cool Photo.jpg",           // Original name
  kebabName: "my-cool-photo.jpg",      // Kebab-case name
  type: "image/jpeg",
  size: 524288,
  dataUrl: "data:image/jpeg;base64,..."  // For preview/download
}
```

### Path Detection

The image picker automatically detects project type from form context:

```javascript
// Architecture Form → ../images/architecture/
// Coding Form → ../images/coding/
// Game Form → ../images/games/
```

## Benefits

### 🚀 Performance
- No more 3 MB strings in input fields
- Lightweight path strings (30-50 characters)
- No browser freeze or crash

### 📁 File Organization
- Clean, readable filenames
- Standard web conventions
- Easy to find and manage

### 🔄 Version Control
- Images stored as actual files
- Can be committed to git
- Easy to track changes

### 🎯 SEO & Accessibility
- Descriptive filenames
- Better for search engines
- Professional URLs

### 🛠️ Maintenance
- Easy to update images (just replace file)
- No localStorage bloat
- Standard file system operations

## File Structure

Your project should have this structure:

```
sketch_and_script/
├── images/
│   ├── architecture/
│   │   ├── my-apartment-design.jpg
│   │   ├── living-room-interior.jpg
│   │   └── modern-kitchen.jpg
│   ├── coding/
│   │   ├── test-dashboard.png
│   │   ├── api-documentation.png
│   │   └── code-coverage.jpg
│   └── games/
│       ├── game-screenshot-1.png
│       ├── gameplay-demo.jpg
│       └── character-design.png
├── projects/
│   ├── architecture-project-1.html  (uses ../images/architecture/...)
│   ├── coding-project-1.html         (uses ../images/coding/...)
│   └── coding-project-game-1.html    (uses ../images/games/...)
└── ...
```

## Files Modified

- ✅ `js/modules/media-manager.js` - Added kebab-case conversion and download
- ✅ `js/modules/image-picker.js` - Use file paths instead of references
- ✅ `js/modules/form-builder.js` - Removed reference resolution (not needed)
- ✅ `css/cms.css` - Enhanced media library styling

## Migration from Old System

If you have projects using the old `media://` references:

1. The old system is **still supported** (backward compatible)
2. New uploads automatically use kebab-case
3. Re-select images in old projects to update to new paths
4. No breaking changes

## Best Practices

### Naming Conventions

**Good:**
- `apartment-renovation-2024.jpg`
- `test-results-dashboard.png`
- `game-level-1-screenshot.jpg`

**Avoid:**
- `IMG_1234.jpg` (not descriptive)
- `photo.jpg` (too generic)
- `final_FINAL_v2.jpg` (redundant)

### Organization Tips

1. **Be descriptive** - Use meaningful names
2. **Include project info** - Add project name to filename
3. **Number sequences** - Use consistent numbering (01, 02, 03)
4. **Keep it short** - 3-5 words max
5. **Avoid duplicates** - Make each filename unique

## Future Enhancements

Potential improvements:
- [ ] Bulk download all media with correct names
- [ ] Auto-organize downloads into project folders
- [ ] Duplicate filename detection
- [ ] Image optimization on upload
- [ ] Folder selection in image picker
- [ ] Batch rename functionality

---

**Implementation Time:** 1 hour  
**Lines Changed:** ~150  
**Performance:** ✅ No more browser freeze  
**User Experience:** ✅ Much cleaner and more professional

