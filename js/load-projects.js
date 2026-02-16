/**
 * Dynamic Project Loader
 * Fetches projects from data/projects.json and renders them on the page
 */

class ProjectLoader {
    constructor() {
        this.projectsTrack = document.querySelector('.projects-track');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = [];
        this.currentFilter = 'all';
        
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.setupFilters();
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                console.warn('No projects.json found, showing placeholder projects');
                return;
            }
            
            this.projects = await response.json();
            // Sort by createdAt - newest first
            this.projects.sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA; // Descending order (newest first)
            });
            this.renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderProjects() {
        if (!this.projectsTrack) return;

        // Clear existing projects
        this.projectsTrack.innerHTML = '';

        // Filter projects based on current filter
        const filteredProjects = this.filterProjects();

        if (filteredProjects.length === 0) {
            this.projectsTrack.innerHTML = '<p class="no-projects">No projects found for this category.</p>';
            return;
        }

        // Render each project
        filteredProjects.forEach(project => {
            const card = this.createProjectCard(project);
            this.projectsTrack.appendChild(card);
        });
    }

    filterProjects() {
        if (this.currentFilter === 'all') {
            return this.projects;
        }

        return this.projects.filter(project => {
            const category = project.category ? project.category.toLowerCase() : '';
            return category === this.currentFilter;
        });
    }

    createProjectCard(project) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-category', project.category ? project.category.toLowerCase() : 'other');

        // Get the featured image (first image URL)
        const imageUrl = this.getProjectImage(project);
        const projectUrl = this.getProjectUrl(project);
        const title = project.title || 'Untitled Project';

        article.innerHTML = `
            <a href="${projectUrl}" class="project-card-link">
                <div class="project-image">
                    <img src="${imageUrl}" alt="${title}" loading="lazy">
                </div>
                <h3 class="project-title">${title}</h3>
            </a>
        `;

        return article;
    }

    getProjectImage(project) {
        // Try imageUrls first (from GitHub uploads)
        if (project.imageUrls && project.imageUrls.length > 0) {
            return project.imageUrls[0];
        }
        
        // Try imagePaths (local paths)
        if (project.imagePaths && project.imagePaths.length > 0) {
            return project.imagePaths[0];
        }
        
        // Try legacy featuredImage property
        if (project.featuredImage) {
            return project.featuredImage;
        }
        
        // Fallback to placeholder
        const type = project.type || 'architecture';
        return `images/${type}/placeholder-${type}-1.jpg`;
    }

    getProjectUrl(project) {
        // Try slug-based URL first
        if (project.slug) {
            const slug = this.sanitizeSlug(project.slug);
            return `projects/${slug}.html`;
        }
        
        // Try folder-based URL
        if (project.folder) {
            return `projects/${project.folder}.html`;
        }
        
        // Fallback
        return '#';
    }

    sanitizeSlug(slug) {
        return slug
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update filter and re-render
                this.currentFilter = button.getAttribute('data-filter');
                this.renderProjects();
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectLoader();
    });
} else {
    new ProjectLoader();
}
