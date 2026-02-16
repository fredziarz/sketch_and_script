// ============================================
// Dynamic Project Loader
// Fetches projects from CMS-generated data/projects.json
// ============================================

class ProjectLoader {
    constructor() {
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjects();
        this.setupFilters();
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            if (response.ok) {
                this.projects = await response.json();
                console.log(`✅ Loaded ${this.projects.length} projects from CMS`);
            } else {
                console.warn('⚠️ No projects.json found, using static HTML');
            }
        } catch (error) {
            console.warn('⚠️ Could not load projects.json:', error.message);
        }
    }

    renderProjects() {
        // Find the projects track container
        const track = document.querySelector('.projects-track');
        if (!track || this.projects.length === 0) return;

        // Clear existing content
        track.innerHTML = '';

        // Render each project
        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            track.appendChild(card);
        });

        console.log(`✅ Rendered ${this.projects.length} projects`);
    }

    createProjectCard(project) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-category', (project.category || project.type || 'all').toLowerCase());

        const link = document.createElement('a');
        link.href = project.htmlUrl || `projects/${project.slug}.html`;
        link.className = 'project-card-link';

        // Image
        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';
        
        const img = document.createElement('img');
        img.src = project.featuredImage || 'images/architecture/placeholder.jpg';
        img.alt = project.title;
        img.loading = 'lazy';
        
        imageDiv.appendChild(img);
        link.appendChild(imageDiv);

        // Title
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;
        link.appendChild(title);

        // Optional subtitle
        if (project.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.className = 'project-subtitle';
            subtitle.textContent = project.subtitle;
            link.appendChild(subtitle);
        }

        article.appendChild(link);
        return article;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(category) {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectLoader();
    });
} else {
    new ProjectLoader();
}
