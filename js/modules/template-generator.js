// ============================================
// Template Generator - Generates HTML from templates
// ============================================

export class TemplateGenerator {
    generateArchitectureProject(data) {
        const {
            title = 'Untitled Project',
            subtitle = '',
            category = 'Residential',
            overview = '',
            location = '',
            year = '',
            area = '',
            duration = '',
            featuredImage = '../images/architecture/placeholder.jpg',
            galleryImages = [],
            galleryCaptions = [],
            metaDescription = title
        } = data;

        // Generate gallery items HTML
        const galleryHTML = galleryImages.map((img, index) => {
            const caption = galleryCaptions[index] || '';
            const layoutClass = index === 0 ? 'gallery-item-large' : 
                               index === galleryImages.length - 1 ? 'gallery-item-wide' : '';
            
            return `
                <div class="gallery-item ${layoutClass}">
                    <img src="${img}" alt="${caption}" loading="lazy">
                    <div class="gallery-caption">${caption}</div>
                </div>
            `;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
    <link rel="alternate icon" href="../images/favicon.svg">
    <meta name="description" content="${metaDescription}">
    <title>${title} | Sketch & Script</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/architecture-theme.css">
    <link rel="stylesheet" href="../css/project-pages.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-R9ZNFG075D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R9ZNFG075D');
    </script>
</head>
<body class="architecture-theme">
    <!-- Navigation -->
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">Sketch & Script</a>
            
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link active">Architecture</a>
                <a href="../coding.html" class="nav-link">QA & Development</a>
            </div>
            
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="../architecture.html">Architecture</a>
                <span>/</span>
                <span class="current">${title}</span>
            </nav>
        </div>
    </section>

    <!-- Project Hero -->
    <section class="project-hero">
        <div class="container">
            <div class="project-hero-content">
                <span class="project-category-badge">${category}</span>
                <h1 class="project-hero-title">${title}</h1>
                <p class="project-hero-subtitle">${subtitle}</p>
                
                <div class="project-meta-grid">
                    ${location ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Location</span>
                        <span class="meta-value">${location}</span>
                    </div>` : ''}
                    ${year ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Year</span>
                        <span class="meta-value">${year}</span>
                    </div>` : ''}
                    ${area ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Area</span>
                        <span class="meta-value">${area}</span>
                    </div>` : ''}
                    ${duration ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Duration</span>
                        <span class="meta-value">${duration}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Image -->
    <section class="section section-featured-image">
        <div class="container-wide">
            <div class="featured-image-wrapper">
                <img src="${featuredImage}" alt="${title} - Main View" loading="eager">
            </div>
        </div>
    </section>

    <!-- Project Overview -->
    <section class="section">
        <div class="container-narrow">
            <div class="project-overview">
                <h2 class="section-title">Project Overview</h2>
                <div class="project-description">
                    ${overview.split('\n\n').map(p => `<p>${p}</p>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </section>

    ${galleryHTML ? `
    <!-- Gallery -->
    <section class="section">
        <div class="container-wide">
            <h2 class="section-title">Project Gallery</h2>
            <p class="section-description">Explore the transformation through detailed photography</p>
            
            <div class="project-gallery">
                ${galleryHTML}
            </div>
        </div>
    </section>` : ''}

    <!-- CTA Section -->
    <section class="section section-alt">
        <div class="container">
            <div class="cta-box">
                <h2>Interested in Working Together?</h2>
                <p>Let's discuss your next architecture or interior design project.</p>
                <a href="../index.html#contact" class="btn btn-primary">Get in Touch</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
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
                        <a href="https://linkedin.com/in/michal-wicherek" target="_blank">LinkedIn</a>
                        <a href="https://github.com/fredziarz" target="_blank">GitHub</a>
                        <a href="https://itch.io/profile/michalwicherek" target="_blank">itch.io</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Sketch & Script | Michał Wicherek</p>
                <p>Built with passion | Hosted on GitHub Pages</p>
            </div>
        </div>
    </footer>

    <script src="../js/script.js"></script>
    <script src="../js/page-transitions.js"></script>
</body>
</html>`;
    }

    generateCodingProject(data) {
        const {
            title = 'Untitled Project',
            subtitle = '',
            category = 'QA Testing',
            status = 'Completed',
            overview = '',
            role = '',
            duration = '',
            teamSize = '',
            year = '',
            technologies = [],
            githubUrl = '',
            demoUrl = '',
            features = [],
            codeLanguage = '',
            codeFilename = '',
            codeSample = '',
            screenshots = [],
            screenshotCaptions = [],
            metaDescription = title
        } = data;

        // Generate tech badges
        const techBadgesHTML = technologies.map(tech => 
            `<div class="tech-badge">${tech}</div>`
        ).join('\n                ');

        // Generate features HTML
        const featuresHTML = features.map(feature => {
            const [featureTitle, ...descParts] = feature.split('-');
            const description = descParts.join('-').trim();
            
            return `
                <div class="feature-card">
                    <h3>${featureTitle.trim()}</h3>
                    <p>${description}</p>
                </div>
            `;
        }).join('');

        // Generate code showcase HTML
        const codeShowcaseHTML = codeSample ? `
    <!-- Code Showcase -->
    <section class="section section-alt">
        <div class="container-narrow">
            <h2 class="section-title">Code Showcase</h2>
            <p class="section-description">Sample implementation</p>
            
            <div class="code-showcase">
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">${codeLanguage}</span>
                        <span class="code-file">${codeFilename}</span>
                    </div>
                    <pre><code>${this.escapeHtml(codeSample)}</code></pre>
                </div>
            </div>
        </div>
    </section>` : '';

        // Generate screenshots HTML
        const screenshotsHTML = screenshots.map((img, index) => {
            const caption = screenshotCaptions[index] || '';
            const layoutClass = index === 0 ? 'gallery-item-large' : 
                               index === screenshots.length - 1 ? 'gallery-item-wide' : '';
            
            return `
                <div class="gallery-item ${layoutClass}">
                    <img src="${img}" alt="${caption}" loading="lazy">
                    <div class="gallery-caption">${caption}</div>
                </div>
            `;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
    <link rel="alternate icon" href="../images/favicon.svg">
    <meta name="description" content="${metaDescription}">
    <title>${title} | Sketch & Script</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/coding-theme.css">
    <link rel="stylesheet" href="../css/project-pages.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-R9ZNFG075D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R9ZNFG075D');
    </script>
</head>
<body class="coding-theme">
    <!-- Navigation -->
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">Sketch & Script</a>
            
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link">Architecture</a>
                <a href="../coding.html" class="nav-link active">QA & Development</a>
            </div>
            
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="../coding.html">QA & Development</a>
                <span>/</span>
                <span class="current">${title}</span>
            </nav>
        </div>
    </section>

    <!-- Project Hero -->
    <section class="project-hero">
        <div class="container">
            <div class="project-hero-content">
                <div class="project-badges">
                    <span class="project-category-badge">${category}</span>
                    <span class="project-status-badge status-${status.toLowerCase().replace(' ', '-')}">${status}</span>
                </div>
                <h1 class="project-hero-title">${title}</h1>
                <p class="project-hero-subtitle">${subtitle}</p>
                
                <div class="project-meta-grid">
                    ${role ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Role</span>
                        <span class="meta-value">${role}</span>
                    </div>` : ''}
                    ${duration ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Duration</span>
                        <span class="meta-value">${duration}</span>
                    </div>` : ''}
                    ${teamSize ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Team Size</span>
                        <span class="meta-value">${teamSize}</span>
                    </div>` : ''}
                    ${year ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Year</span>
                        <span class="meta-value">${year}</span>
                    </div>` : ''}
                </div>
                
                ${githubUrl || demoUrl ? `
                <div class="project-links">
                    ${githubUrl ? `
                    <a href="${githubUrl}" target="_blank" class="btn btn-primary">
                        <span>View on GitHub</span>
                        <span class="btn-icon">↗</span>
                    </a>` : ''}
                    ${demoUrl ? `
                    <a href="${demoUrl}" target="_blank" class="btn btn-secondary">
                        <span>Live Demo</span>
                        <span class="btn-icon">→</span>
                    </a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>

    ${technologies.length > 0 ? `
    <!-- Tech Stack -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Technology Stack</h2>
            <div class="tech-stack-grid">
                ${techBadgesHTML}
            </div>
        </div>
    </section>` : ''}

    <!-- Project Overview -->
    <section class="section section-alt">
        <div class="container-narrow">
            <div class="project-overview">
                <h2 class="section-title">Project Overview</h2>
                <div class="project-description">
                    ${overview.split('\n\n').map(p => `<p>${p}</p>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </section>

    ${features.length > 0 ? `
    <!-- Key Features -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Key Features</h2>
            
            <div class="features-grid">
                ${featuresHTML}
            </div>
        </div>
    </section>` : ''}

    ${codeShowcaseHTML}

    ${screenshots.length > 0 ? `
    <!-- Screenshots -->
    <section class="section">
        <div class="container-wide">
            <h2 class="section-title">Screenshots</h2>
            
            <div class="project-gallery">
                ${screenshotsHTML}
            </div>
        </div>
    </section>` : ''}

    <!-- CTA Section -->
    <section class="section section-alt">
        <div class="container">
            <div class="cta-box">
                <h2>Let's Collaborate</h2>
                <p>Looking for QA expertise or development? Get in touch to discuss your project.</p>
                <a href="../index.html#contact" class="btn btn-primary">Contact Me</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
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
                        <a href="https://linkedin.com/in/michal-wicherek" target="_blank">LinkedIn</a>
                        <a href="https://github.com/fredziarz" target="_blank">GitHub</a>
                        <a href="https://itch.io/profile/michalwicherek" target="_blank">itch.io</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Sketch & Script | Michał Wicherek</p>
                <p>Built with passion | Hosted on GitHub Pages</p>
            </div>
        </div>
    </footer>

    <script src="../js/script.js"></script>
    <script src="../js/page-transitions.js"></script>
</body>
</html>`;
    }

    generateGameProject(data) {
        const {
            title = 'Untitled Game',
            subtitle = '',
            genre = 'Platformer',
            engine = 'Unity',
            status = 'Completed',
            description = '',
            role = '',
            duration = '',
            plays = '',
            year = '',
            playUrl = '',
            githubUrl = '',
            features = [],
            thumbnail = '../images/games/placeholder.jpg',
            screenshots = [],
            screenshotCaptions = [],
            videoUrl = '',
            metaDescription = title
        } = data;

        // Similar structure to coding project but with game-specific elements
        const featuresHTML = features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        const screenshotsHTML = screenshots.map((img, index) => {
            const caption = screenshotCaptions[index] || '';
            const layoutClass = index === 0 ? 'gallery-item-large' : '';
            
            return `
                <div class="gallery-item ${layoutClass}">
                    <img src="${img}" alt="${caption}" loading="lazy">
                    <div class="gallery-caption">${caption}</div>
                </div>
            `;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
    <link rel="alternate icon" href="../images/favicon.svg">
    <meta name="description" content="${metaDescription}">
    <title>${title} | Sketch & Script</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/coding-theme.css">
    <link rel="stylesheet" href="../css/project-pages.css">
    <link rel="stylesheet" href="../css/page-transitions.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-R9ZNFG075D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R9ZNFG075D');
    </script>
</head>
<body class="coding-theme">
    <!-- Navigation -->
    <nav class="nav" id="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">Sketch & Script</a>
            
            <div class="nav-menu" id="nav-menu">
                <a href="../index.html" class="nav-link">Home</a>
                <a href="../architecture.html" class="nav-link">Architecture</a>
                <a href="../coding.html" class="nav-link active">QA & Development</a>
            </div>
            
            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
        <div class="container">
            <nav class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="../coding.html">QA & Development</a>
                <span>/</span>
                <span class="current">${title}</span>
            </nav>
        </div>
    </section>

    <!-- Project Hero -->
    <section class="project-hero">
        <div class="container">
            <div class="project-hero-content">
                <div class="project-badges">
                    <span class="project-category-badge">Game Development</span>
                    <span class="project-status-badge status-${status.toLowerCase().replace(' ', '-')}">${status}</span>
                </div>
                <h1 class="project-hero-title">${title}</h1>
                <p class="project-hero-subtitle">${subtitle}</p>
                
                <div class="project-meta-grid">
                    <div class="project-meta-item">
                        <span class="meta-label">Genre</span>
                        <span class="meta-value">${genre}</span>
                    </div>
                    <div class="project-meta-item">
                        <span class="meta-label">Engine</span>
                        <span class="meta-value">${engine}</span>
                    </div>
                    ${plays ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Plays</span>
                        <span class="meta-value">${plays}</span>
                    </div>` : ''}
                    ${year ? `
                    <div class="project-meta-item">
                        <span class="meta-label">Year</span>
                        <span class="meta-value">${year}</span>
                    </div>` : ''}
                </div>
                
                ${playUrl || githubUrl ? `
                <div class="project-links">
                    ${playUrl ? `
                    <a href="${playUrl}" target="_blank" class="btn btn-primary">
                        <span>Play Now</span>
                        <span class="btn-icon">🎮</span>
                    </a>` : ''}
                    ${githubUrl ? `
                    <a href="${githubUrl}" target="_blank" class="btn btn-secondary">
                        <span>View Source</span>
                        <span class="btn-icon">↗</span>
                    </a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>

    <!-- Game Overview -->
    <section class="section section-alt">
        <div class="container-narrow">
            <div class="project-overview">
                <h2 class="section-title">About This Game</h2>
                <div class="project-description">
                    ${description.split('\n\n').map(p => `<p>${p}</p>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </section>

    ${features.length > 0 ? `
    <!-- Features -->
    <section class="section">
        <div class="container-narrow">
            <h2 class="section-title">Game Features</h2>
            <ul class="feature-list">
                ${featuresHTML}
            </ul>
        </div>
    </section>` : ''}

    ${videoUrl ? `
    <!-- Gameplay Video -->
    <section class="section section-alt">
        <div class="container-wide">
            <h2 class="section-title">Gameplay Video</h2>
            <div class="video-wrapper">
                <iframe width="100%" height="500" src="${this.getEmbedUrl(videoUrl)}" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </section>` : ''}

    ${screenshots.length > 0 ? `
    <!-- Screenshots -->
    <section class="section">
        <div class="container-wide">
            <h2 class="section-title">Screenshots</h2>
            
            <div class="project-gallery">
                ${screenshotsHTML}
            </div>
        </div>
    </section>` : ''}

    <!-- CTA Section -->
    <section class="section section-alt">
        <div class="container">
            <div class="cta-box">
                <h2>Let's Collaborate</h2>
                <p>Interested in game development or QA? Let's talk about your project.</p>
                <a href="../index.html#contact" class="btn btn-primary">Contact Me</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
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
                        <a href="https://linkedin.com/in/michal-wicherek" target="_blank">LinkedIn</a>
                        <a href="https://github.com/fredziarz" target="_blank">GitHub</a>
                        <a href="https://itch.io/profile/michalwicherek" target="_blank">itch.io</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Sketch & Script | Michał Wicherek</p>
                <p>Built with passion | Hosted on GitHub Pages</p>
            </div>
        </div>
    </footer>

    <script src="../js/script.js"></script>
    <script src="../js/page-transitions.js"></script>
</body>
</html>`;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    getEmbedUrl(url) {
        // Convert YouTube watch URLs to embed URLs
        if (url.includes('youtube.com/watch')) {
            const videoId = new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}

