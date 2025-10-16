# Sketch & Script CMS

A simple, browser-based Content Management System for managing your portfolio website projects.

## Features

✨ **Three Project Types**
- 🏛️ Architecture Projects
- 💻 Coding Projects
- 🎮 Game Projects

📊 **Dashboard**
- Project statistics
- Recent projects overview
- Quick access to all features

📁 **Media Library**
- Upload and manage images
- Support for various file types
- Drag & drop interface

🔧 **Project Management**
- Create, view, and delete projects
- Export projects as HTML files
- Filter and search capabilities

💾 **Data Persistence**
- LocalStorage-based storage
- Import/Export functionality
- Backup and restore data

## Quick Start

### 1. Open the CMS

Since this is a static web application, you'll need to run it through a local server:

**Option A: Using Python**
```bash
cd cms
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

**Option B: Using Node.js (http-server)**
```bash
npm install -g http-server
cd cms
http-server -p 8080
```

Then open: `http://localhost:8080`

**Option C: Using PHP**
```bash
cd cms
php -S localhost:8080
```

Then open: `http://localhost:8080`

### 2. Create Your First Project

1. Click on "New Architecture Project", "New Coding Project", or "New Game Project" in the sidebar
2. Fill in the project details
3. Click "Create [Project Type] Project"
4. The HTML file will automatically download!

### 3. Add the Project to Your Website

1. Save the downloaded HTML file to the `projects/` folder
2. Update the corresponding page (`architecture.html` or `coding.html`) to include a link to your new project
3. Upload your images to the appropriate folder in `images/`
4. Commit and push to GitHub

## Usage Guide

### Creating an Architecture Project

Required fields:
- **Project Title**: Main heading
- **URL Slug**: Used for filename (e.g., `modern-apartment`)
- **Subtitle**: Brief description
- **Category**: Residential, Commercial, etc.
- **Project Overview**: Main description
- **Featured Image Path**: Path to hero image

Optional fields:
- Location, Year, Area, Duration
- Gallery images and captions
- Meta description for SEO

### Creating a Coding Project

Required fields:
- **Project Title**: Project name
- **URL Slug**: Filename identifier
- **Subtitle**: Brief description
- **Category**: QA Testing, Web Dev, etc.
- **Project Overview**: Main description

Optional fields:
- Role, Duration, Team Size, Year
- Technology stack
- GitHub and Demo URLs
- Key features
- Code samples
- Screenshots

### Creating a Game Project

Required fields:
- **Game Title**: Name of the game
- **URL Slug**: Filename identifier
- **Subtitle**: Brief description
- **Genre**: Platformer, Puzzle, etc.
- **Game Engine**: Unity, Unreal, etc.
- **Game Description**: Overview

Optional fields:
- Development details
- Play URL (itch.io, etc.)
- GitHub repository
- Features
- Screenshots and video

## Data Management

### Export Data
Click "Export All Data" in Settings to download a JSON backup of all your projects and media.

### Import Data
Click "Import Data" to restore from a previous backup.

### Clear Data
Use with caution! This deletes all projects and media from localStorage.

## File Structure

```
cms/
├── index.html              # Main CMS interface
├── css/
│   └── cms.css            # CMS styling
├── js/
│   ├── cms.js             # Main application
│   └── modules/
│       ├── data-manager.js       # Data persistence
│       ├── form-builder.js       # Dynamic forms
│       ├── template-generator.js # HTML generation
│       ├── media-manager.js      # File uploads
│       └── ui-manager.js         # UI interactions
└── README.md
```

## Technical Details

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Storage
- Uses HTML5 LocalStorage
- Storage limit: ~5-10MB (browser dependent)
- Data persists until manually cleared

### Generated HTML
- Uses your existing project templates
- Maintains your site's styling and structure
- Includes Google Analytics tracking
- SEO-optimized with meta tags

## Tips & Best Practices

1. **Image Paths**: Always use relative paths from the `projects/` folder (e.g., `../images/architecture/photo.jpg`)

2. **Regular Backups**: Export your data regularly using the Settings page

3. **File Organization**: 
   - Architecture images: `images/architecture/`
   - Coding images: `images/coding/`
   - Game images: `images/games/`

4. **Naming Convention**:
   - Use kebab-case for slugs: `my-awesome-project`
   - Slugs become filenames: `architecture-project-10.html`

5. **Testing**: Always preview your generated HTML before adding to the live site

## Limitations

- No server-side storage (uses browser localStorage)
- Media files stored as base64 (storage intensive)
- No collaborative editing
- No version control (use Git for final HTML files)

## Future Enhancements

Potential features for future versions:
- [ ] Backend integration for proper file storage
- [ ] Image optimization and resizing
- [ ] Bulk import/export
- [ ] Project templates
- [ ] WYSIWYG editor
- [ ] Preview before download
- [ ] Automatic sitemap generation

## Troubleshooting

**Q: My data disappeared!**
A: LocalStorage is cleared when you clear browser data. Always keep backups using the Export feature.

**Q: Can't upload files**
A: Check the file type is supported (images, ZIP, HTML, JS, CSS) and under 10MB.

**Q: Generated HTML doesn't look right**
A: Ensure all file paths are correct and relative to the `projects/` folder.

**Q: Getting "Module not found" errors**
A: Make sure you're running the CMS through a local server, not opening the HTML file directly.

## Support

For issues or questions:
- Check this README
- Review the browser console for errors
- Ensure all files are in the correct locations

---

**Built for Sketch & Script Portfolio**
Version 1.0 | October 2025

