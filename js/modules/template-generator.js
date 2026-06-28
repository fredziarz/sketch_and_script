// ============================================
// Template Generator - HTML output for main site
// Must stay in sync with sketch_and_script/templates/
// ============================================

export class TemplateGenerator {
    generateArchitectureProject(data) {
        const imageUrls = data.imageUrls || [];
        const heroImage = imageUrls[0] || data.featuredImage || '';
        const galleryImages = imageUrls.slice(1);
        const captions = data.galleryCaptions || [];

        const title = data.title || 'Untitled Project';
        const subtitle = data.subtitle || '';
        const category = data.category || 'Residential';
        const location = data.location || '';
        const year = data.year || '';
        const overview = data.overview || '';
        const metaDescription = data.metaDescription || title;

        const overviewParts = overview.split('\n\n');
        const description = overviewParts[0] || '';
        const additionalInfo = overviewParts.slice(1).join('\n\n');
        const categoryFull = category.includes('Development') ? category : `${category} Development`;

        const e = (s) => this.escapeHtml(String(s ?? ''));
        const galleryHTML = this.buildArchitectureGallery(galleryImages, captions);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${e(metaDescription)}">
    <title>${e(title)} | Sketch & Script</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/architecture-theme.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    <link rel="stylesheet" href="../css/architecture-gallery.css">
</head>
<body class="architecture-theme">
    <a href="#main-content" class="skip-nav">Skip to main content</a>
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <img src="../images/arch-icon.png" alt="" class="logo-icon">
                <span class="logo-text">Sketch & Script</span>
            </a>
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link active">Architecture</a>
                <a href="../coding.html" class="nav-link">QA & Coding</a>
                <a href="../index.html#about" class="nav-link">About</a>
                <a href="../index.html#contact" class="nav-link nav-cta">Contact</a>
            </div>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <main id="main-content">
    <section class="hero-image-section">
        <img src="${heroImage}"
             alt="${e(title)}"
             loading="eager"
             class="hero-image">
        <div class="project-info-overlay">
            <div class="project-info-content">
                <div class="project-info-main">
                    <div class="category-badge">${e(category)}</div>
                    <h1>${e(title)}</h1>
                    <p class="subtitle">${e(subtitle)}</p>
                </div>
                <div class="meta-info">
                    ${location ? `
                    <div class="meta-info-item">
                        <span class="label">Location</span>
                        <span>${e(location)}</span>
                    </div>` : ''}
                    ${year ? `
                    <div class="meta-info-item">
                        <span class="label">Year</span>
                        <span>${e(year)}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
    </section>

    <div class="project-items">
        ${galleryHTML}
        <section class="description-section">
            <div class="description-content">
                <div class="description-block">
                    <h2 class="project-title">${e(title)}</h2>
                    <div class="meta-detail">${e(categoryFull)}</div>
                    <p class="project-desc">${e(description)}</p>
                </div>
                <div class="description-block">
                    ${additionalInfo ? `<p class="additional-info">${e(additionalInfo)}</p>` : ''}
                    ${year || location ? `<div class="meta-detail">Completed ${e(year)}${year && location ? ' • ' : ''}${e(location)}</div>` : ''}
                </div>
            </div>
        </section>
    </div>

    <section class="section">
        <div class="container" style="text-align: center;">
            <a href="../architecture.html" class="btn btn-secondary">← Back to Architecture Portfolio</a>
        </div>
    </section>
    </main>

    ${this.siteFooter()}
    ${this.architectureLightbox()}
    ${this.siteScripts(true)}
</body>
</html>`;
    }

    buildArchitectureGallery(images, captions) {
        if (!images.length) return '';

        const e = (s) => this.escapeHtml(String(s ?? ''));
        let html = '';
        let i = 0;

        while (i < images.length) {
            const alt = e(captions[i] || `Gallery image ${i + 1}`);
            if (i + 1 < images.length) {
                const alt2 = e(captions[i + 1] || `Gallery image ${i + 2}`);
                html += `
        <div class="row-image-wrapper">
            <div class="image-list">
                <img src="${images[i]}" alt="${alt}" class="image-large" loading="lazy">
                <img src="${images[i + 1]}" alt="${alt2}" class="image-large" loading="lazy">
            </div>
        </div>`;
                i += 2;
            } else {
                html += `
        <div class="image-wrapper">
            <img src="${images[i]}" alt="${alt}" class="image-large" loading="lazy">
        </div>`;
                i += 1;
            }
        }
        return html;
    }

    generateCodingProject(data) {
        const imageUrls = data.imageUrls || [];
        const screenshots = imageUrls.length ? imageUrls : (data.screenshots || []);

        const title = data.title || 'Untitled Project';
        const subtitle = data.subtitle || '';
        const category = data.category || 'QA Testing';
        const status = data.status || 'Completed';
        const overview = data.overview || '';
        const role = data.role || '';
        const duration = data.duration || '';
        const teamSize = data.teamSize || '';
        const year = data.year || '';
        const technologies = data.technologies || [];
        const githubUrl = data.githubUrl || '';
        const demoUrl = data.demoUrl || '';
        const features = data.features || [];
        const codeLanguage = data.codeLanguage || '';
        const codeFilename = data.codeFilename || '';
        const codeSample = data.codeSample || '';
        const screenshotCaptions = data.screenshotCaptions || [];
        const metaDescription = data.metaDescription || title;
        const e = (s) => this.escapeHtml(String(s ?? ''));

        const techBadgesHTML = technologies.map(tech =>
            `<div class="tech-badge">${e(tech)}</div>`
        ).join('\n                ');

        const featuresHTML = features.map(feature => {
            const [featureTitle, ...descParts] = feature.split('-');
            return `
                <div class="feature-card">
                    <h3>${e(featureTitle.trim())}</h3>
                    <p>${e(descParts.join('-').trim())}</p>
                </div>`;
        }).join('');

        const codeShowcaseHTML = codeSample ? `
    <section class="section section-alt">
        <div class="container-narrow">
            <h2 class="section-title">Code Showcase</h2>
            <div class="code-showcase">
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">${e(codeLanguage)}</span>
                        <span class="code-file">${e(codeFilename)}</span>
                    </div>
                    <pre><code>${this.escapeHtml(codeSample)}</code></pre>
                </div>
            </div>
        </div>
    </section>` : '';

        const screenshotsHTML = screenshots.map((img, index) => {
            const caption = e(screenshotCaptions[index] || '');
            const layoutClass = index === 0 ? 'gallery-item-large' :
                index === screenshots.length - 1 ? 'gallery-item-wide' : '';
            return `
                <div class="gallery-item ${layoutClass}">
                    <img src="${img}" alt="${caption}" loading="lazy">
                    ${caption ? `<div class="gallery-caption">${caption}</div>` : ''}
                </div>`;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../images/fav-icon.png">
    <link rel="alternate icon" href="../images/fav-icon.png">
    <meta name="description" content="${e(metaDescription)}">
    <title>${e(title)} | Sketch & Script</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/coding-theme.css">
    <link rel="stylesheet" href="../css/project-pages.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="coding-theme">
    <a href="#main-content" class="skip-nav">Skip to main content</a>
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <img src="../images/code-icon.png" alt="" class="logo-icon">
                <span class="logo-text">Sketch & Script</span>
            </a>
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link">Architecture</a>
                <a href="../coding.html" class="nav-link active">QA & Development</a>
            </div>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="../coding.html">QA & Development</a>
                <span>/</span>
                <span class="current">${e(title)}</span>
            </nav>
        </div>
    </section>

    <main id="main-content">
    <section class="project-hero">
        <div class="container">
            <div class="project-hero-content">
                <div class="project-badges">
                    <span class="project-category-badge">${e(category)}</span>
                    <span class="project-status-badge status-${e(status.toLowerCase().replace(/\s+/g, '-'))}">${e(status)}</span>
                </div>
                <h1 class="project-hero-title">${e(title)}</h1>
                <p class="project-hero-subtitle">${e(subtitle)}</p>
                <div class="project-meta-grid">
                    ${role ? `<div class="project-meta-item"><span class="meta-label">Role</span><span class="meta-value">${e(role)}</span></div>` : ''}
                    ${duration ? `<div class="project-meta-item"><span class="meta-label">Duration</span><span class="meta-value">${e(duration)}</span></div>` : ''}
                    ${teamSize ? `<div class="project-meta-item"><span class="meta-label">Team Size</span><span class="meta-value">${e(teamSize)}</span></div>` : ''}
                    ${year ? `<div class="project-meta-item"><span class="meta-label">Year</span><span class="meta-value">${e(year)}</span></div>` : ''}
                </div>
                ${githubUrl || demoUrl ? `
                <div class="project-links">
                    ${githubUrl ? `<a href="${e(githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span>View on GitHub</span><span class="btn-icon">↗</span></a>` : ''}
                    ${demoUrl ? `<a href="${e(demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span>Live Demo</span><span class="btn-icon">→</span></a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>

    ${technologies.length ? `
    <section class="section">
        <div class="container">
            <h2 class="section-title">Technology Stack</h2>
            <div class="tech-stack-grid">${techBadgesHTML}</div>
        </div>
    </section>` : ''}

    <section class="section section-alt">
        <div class="container-narrow">
            <div class="project-overview">
                <h2 class="section-title">Project Overview</h2>
                <div class="project-description">
                    ${overview.split('\n\n').map(p => `<p>${e(p)}</p>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </section>

    ${features.length ? `
    <section class="section">
        <div class="container">
            <h2 class="section-title">Key Features</h2>
            <div class="features-grid">${featuresHTML}</div>
        </div>
    </section>` : ''}

    ${codeShowcaseHTML}

    ${screenshots.length ? `
    <section class="section">
        <div class="container-wide">
            <h2 class="section-title">Screenshots</h2>
            <div class="project-gallery">${screenshotsHTML}</div>
        </div>
    </section>` : ''}

    <section class="section section-alt">
        <div class="container">
            <div class="cta-box">
                <h2>Let's Collaborate</h2>
                <p>Looking for QA expertise or test automation? Get in touch to discuss your project.</p>
                <a href="../index.html#contact" class="btn btn-primary">Contact Me</a>
            </div>
        </div>
    </section>
    </main>

    ${this.siteFooter()}
    ${this.siteScripts(false)}
</body>
</html>`;
    }

    generateGameProject(data) {
        const imageUrls = data.imageUrls || [];
        const screenshots = imageUrls.length ? imageUrls : (data.screenshots || []);

        const title = data.title || 'Untitled Game';
        const subtitle = data.subtitle || '';
        const genre = data.genre || 'Platformer';
        const engine = data.engine || 'Unity';
        const status = data.status || 'Completed';
        const description = data.description || '';
        const plays = data.plays || '';
        const year = data.year || '';
        const playUrl = data.playUrl || '';
        const githubUrl = data.githubUrl || '';
        const features = data.features || [];
        const screenshotCaptions = data.screenshotCaptions || [];
        const videoUrl = data.videoUrl || '';
        const metaDescription = data.metaDescription || title;
        const e = (s) => this.escapeHtml(String(s ?? ''));

        const featuresHTML = features.map(feature => `<li>${e(feature)}</li>`).join('');

        const screenshotsHTML = screenshots.map((img, index) => {
            const caption = e(screenshotCaptions[index] || '');
            const layoutClass = index === 0 ? 'gallery-item-large' : '';
            return `
                <div class="gallery-item ${layoutClass}">
                    <img src="${img}" alt="${caption}" loading="lazy">
                    ${caption ? `<div class="gallery-caption">${caption}</div>` : ''}
                </div>`;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../images/fav-icon.png">
    <link rel="alternate icon" href="../images/fav-icon.png">
    <meta name="description" content="${e(metaDescription)}">
    <title>${e(title)} | Sketch & Script</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/coding-theme.css">
    <link rel="stylesheet" href="../css/project-pages.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="coding-theme">
    <a href="#main-content" class="skip-nav">Skip to main content</a>
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <img src="../images/code-icon.png" alt="" class="logo-icon">
                <span class="logo-text">Sketch & Script</span>
            </a>
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link">Architecture</a>
                <a href="../coding.html" class="nav-link active">QA & Development</a>
            </div>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="../coding.html">QA & Development</a>
                <span>/</span>
                <span class="current">${e(title)}</span>
            </nav>
        </div>
    </section>

    <main id="main-content">
    <section class="project-hero">
        <div class="container">
            <div class="project-hero-content">
                <div class="project-badges">
                    <span class="project-category-badge">Game Development</span>
                    <span class="project-status-badge status-${e(status.toLowerCase().replace(/\s+/g, '-'))}">${e(status)}</span>
                </div>
                <h1 class="project-hero-title">${e(title)}</h1>
                <p class="project-hero-subtitle">${e(subtitle)}</p>
                <div class="project-meta-grid">
                    <div class="project-meta-item"><span class="meta-label">Genre</span><span class="meta-value">${e(genre)}</span></div>
                    <div class="project-meta-item"><span class="meta-label">Engine</span><span class="meta-value">${e(engine)}</span></div>
                    ${plays ? `<div class="project-meta-item"><span class="meta-label">Plays</span><span class="meta-value">${e(plays)}</span></div>` : ''}
                    ${year ? `<div class="project-meta-item"><span class="meta-label">Year</span><span class="meta-value">${e(year)}</span></div>` : ''}
                </div>
                ${playUrl || githubUrl ? `
                <div class="project-links">
                    ${playUrl ? `<a href="${e(playUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><span>Play Now</span><span class="btn-icon">🎮</span></a>` : ''}
                    ${githubUrl ? `<a href="${e(githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><span>View Source</span><span class="btn-icon">↗</span></a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>

    <section class="section section-alt">
        <div class="container-narrow">
            <div class="project-overview">
                <h2 class="section-title">About This Game</h2>
                <div class="project-description">
                    ${description.split('\n\n').map(p => `<p>${e(p)}</p>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </section>

    ${features.length ? `
    <section class="section">
        <div class="container-narrow">
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">${featuresHTML}</ul>
        </div>
    </section>` : ''}

    ${videoUrl ? `
    <section class="section section-alt">
        <div class="container-wide">
            <h2 class="section-title">Gameplay Video</h2>
            <div class="video-wrapper">
                <iframe width="100%" height="500" src="${e(this.getEmbedUrl(videoUrl))}" title="${e(title)} gameplay video" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </section>` : ''}

    ${screenshots.length ? `
    <section class="section">
        <div class="container-wide">
            <h2 class="section-title">Screenshots</h2>
            <div class="project-gallery">${screenshotsHTML}</div>
        </div>
    </section>` : ''}

    <section class="section section-alt">
        <div class="container">
            <div class="cta-box">
                <h2>Let's Collaborate</h2>
                <p>Interested in game development or QA? Let's talk about your project.</p>
                <a href="../index.html#contact" class="btn btn-primary">Contact Me</a>
            </div>
        </div>
    </section>
    </main>

    ${this.siteFooter()}
    ${this.siteScripts(false)}
</body>
</html>`;
    }

    siteFooter() {
        return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>Sketch & Script</h3>
                    <p>Architecture & Interiors<br>QA & Development</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Architecture</h4>
                        <a href="../architecture.html#portfolio">Portfolio</a>
                        <a href="../architecture.html#workflow">My Workflow</a>
                    </div>
                    <div class="footer-column">
                        <h4>QA & Development</h4>
                        <a href="../coding.html#projects">Projects</a>
                        <a href="../coding.html#games">Game Portfolio</a>
                    </div>
                    <div class="footer-column">
                        <h4>Connect</h4>
                        <a href="https://linkedin.com/in/michal-wicherek" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/fredziarz" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://itch.io/profile/michalwicherek" target="_blank" rel="noopener noreferrer">itch.io</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Sketch & Script | Michał Wicherek</p>
                <p>Hosted on GitHub Pages</p>
            </div>
        </div>
    </footer>`;
    }

    architectureLightbox() {
        return `
    <div class="lightbox-overlay" id="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
        <button type="button" class="lightbox-nav prev" id="lightbox-prev" aria-label="Previous image">‹</button>
        <img src="" alt="" class="lightbox-image" id="lightbox-image">
        <button type="button" class="lightbox-nav next" id="lightbox-next" aria-label="Next image">›</button>
        <div class="lightbox-counter" id="lightbox-counter" aria-live="polite">1 / 1</div>
    </div>`;
    }

    siteScripts(architecture) {
        const lightbox = architecture
            ? '\n    <script src="../js/architecture-lightbox.js"></script>'
            : '';
        return `
    <script src="../js/script.js"></script>
    <script src="../js/keyboard-accessibility.js"></script>
    <script src="../js/page-transitions.js"></script>${lightbox}`;
    }

    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    getEmbedUrl(url) {
        if (url.includes('youtube.com/watch')) {
            const videoId = new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('youtu.be/')) {
            return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
        }
        return url;
    }
}