// ============================================
// Sketch & Script CMS - Main Application
// ============================================

import { DataManager } from './modules/data-manager.js';
import { FormBuilder } from './modules/form-builder.js';
import { TemplateGenerator } from './modules/template-generator.js';
import { MediaManager } from './modules/media-manager.js';
import { UIManager } from './modules/ui-manager.js';
import { ImagePicker } from './modules/image-picker.js';
import { GitHubManager } from './modules/github-manager.js';

class CMS {
    constructor() {
        this.data = new DataManager();
        this.forms = new FormBuilder(this.data);
        this.templates = new TemplateGenerator();
        this.media = new MediaManager(this.data);
        this.ui = new UIManager();
        this.imagePicker = new ImagePicker(this.data);
        this.github = new GitHubManager();
        
        this.init();
    }

    init() {
        console.log('🚀 Initializing Sketch & Script CMS...');
        
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize forms
        this.setupForms();
        
        // Initialize dashboard
        this.updateDashboard();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('✅ CMS Ready!');
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show corresponding view
                const viewName = item.dataset.view;
                this.showView(viewName);
            });
        });
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.cms-view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Show requested view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            
            // Update view content
            if (viewName === 'dashboard') {
                this.updateDashboard();
            } else if (viewName === 'projects') {
                this.loadAllProjects();
            } else if (viewName === 'media') {
                this.media.loadMediaLibrary();
            } else if (viewName === 'settings') {
                this.loadGitHubSettings();
            }
        }
    }

    setupForms() {
        // Build Architecture Form
        const archForm = this.forms.buildArchitectureForm();
        document.getElementById('architectureForm').innerHTML = archForm;
        
        // Build Coding Form
        const codingForm = this.forms.buildCodingForm();
        document.getElementById('codingForm').innerHTML = codingForm;
        
        // Build Game Form
        const gameForm = this.forms.buildGameForm();
        document.getElementById('gameForm').innerHTML = gameForm;
        
        // Attach form submit handlers
        this.attachFormHandlers();
        
        // Attach image picker browse buttons
        this.attachImagePickers();
    }

    attachImagePickers() {
        // Find all inputs with data-image-input attribute
        const imageInputs = document.querySelectorAll('[data-image-input]');
        
        imageInputs.forEach(input => {
            const inputType = input.getAttribute('data-image-input');
            const isMultiple = inputType === 'multiple';
            
            // Add browse button using the ImagePicker static method
            ImagePicker.addBrowseButton(input, this.imagePicker, isMultiple);
        });
    }

    attachFormHandlers() {
        // Architecture Form
        document.getElementById('architectureForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleArchitectureSubmit(e.target);
        });
        
        // Coding Form
        document.getElementById('codingForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleCodingSubmit(e.target);
        });
        
        // Game Form
        document.getElementById('gameForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleGameSubmit(e.target);
        });
    }

    async handleArchitectureSubmit(form) {
        const formData = new FormData(form);
        const projectData = this.forms.extractFormData(formData, 'architecture');
        
        // Generate project folder name from title
        const projectFolder = this.github.generateProjectFolderName(projectData.title || 'project');
        
        // Show uploading message
        this.ui.showToast('⏳ Uploading images to GitHub...');
        
        try {
            // Upload images to GitHub if there are any
            if (projectData.images && projectData.images.length > 0) {
                const uploadResults = await this.github.uploadMultipleImages(
                    projectData.images, 
                    projectFolder
                );
                
                // Replace local file objects with GitHub URLs
                projectData.imageUrls = uploadResults
                    .filter(r => r.success)
                    .map(r => r.url);
                
                projectData.imagePaths = uploadResults
                    .filter(r => r.success)
                    .map(r => r.path);
                
                // Check for failures
                const failures = uploadResults.filter(r => !r.success);
                if (failures.length > 0) {
                    console.warn('Some images failed to upload:', failures);
                }
            }
            
            // Generate HTML from template
            const html = this.templates.generateArchitectureProject(projectData);
            
            // Save project data to GitHub
            if (this.github.isConfigured()) {
                await this.github.createProjectData({
                    ...projectData,
                    type: 'architecture',
                    createdAt: new Date().toISOString(),
                    folder: projectFolder
                }, projectFolder);
            }
            
            // Save project locally
            const project = {
                id: Date.now().toString(),
                type: 'architecture',
                data: projectData,
                html: html,
                folder: projectFolder,
                createdAt: new Date().toISOString()
            };
            
            this.data.saveProject(project);
            
            // Show success message
            this.ui.showToast('✅ Architecture project created and uploaded to GitHub!');
            
            // Download HTML file
            this.downloadProjectFile(project);
            
            // Reset form
            form.reset();
            
            // Return to dashboard
            setTimeout(() => {
                document.querySelector('[data-view="dashboard"]').click();
            }, 1500);
            
        } catch (error) {
            console.error('Error creating project:', error);
            this.ui.showToast(`❌ Error: ${error.message}`);
        }
    }

    async handleCodingSubmit(form) {
        const formData = new FormData(form);
        const projectData = this.forms.extractFormData(formData, 'coding');
        
        const projectFolder = this.github.generateProjectFolderName(projectData.title || 'project');
        this.ui.showToast('⏳ Uploading to GitHub...');
        
        try {
            if (projectData.images && projectData.images.length > 0) {
                const uploadResults = await this.github.uploadMultipleImages(
                    projectData.images, 
                    projectFolder
                );
                
                projectData.imageUrls = uploadResults
                    .filter(r => r.success)
                    .map(r => r.url);
                projectData.imagePaths = uploadResults
                    .filter(r => r.success)
                    .map(r => r.path);
            }
            
            const html = this.templates.generateCodingProject(projectData);
            
            if (this.github.isConfigured()) {
                await this.github.createProjectData({
                    ...projectData,
                    type: 'coding',
                    createdAt: new Date().toISOString(),
                    folder: projectFolder
                }, projectFolder);
            }
            
            const project = {
                id: Date.now().toString(),
                type: 'coding',
                data: projectData,
                html: html,
                folder: projectFolder,
                createdAt: new Date().toISOString()
            };
            
            this.data.saveProject(project);
            this.ui.showToast('✅ Coding project created and uploaded to GitHub!');
            this.downloadProjectFile(project);
            form.reset();
            
            setTimeout(() => {
                document.querySelector('[data-view="dashboard"]').click();
            }, 1500);
            
        } catch (error) {
            console.error('Error creating project:', error);
            this.ui.showToast(`❌ Error: ${error.message}`);
        }
    }

    async handleGameSubmit(form) {
        const formData = new FormData(form);
        const projectData = this.forms.extractFormData(formData, 'game');
        
        const projectFolder = this.github.generateProjectFolderName(projectData.title || 'project');
        this.ui.showToast('⏳ Uploading to GitHub...');
        
        try {
            if (projectData.images && projectData.images.length > 0) {
                const uploadResults = await this.github.uploadMultipleImages(
                    projectData.images, 
                    projectFolder
                );
                
                projectData.imageUrls = uploadResults
                    .filter(r => r.success)
                    .map(r => r.url);
                projectData.imagePaths = uploadResults
                    .filter(r => r.success)
                    .map(r => r.path);
            }
            
            const html = this.templates.generateGameProject(projectData);
            
            if (this.github.isConfigured()) {
                await this.github.createProjectData({
                    ...projectData,
                    type: 'game',
                    createdAt: new Date().toISOString(),
                    folder: projectFolder
                }, projectFolder);
            }
            
            const project = {
                id: Date.now().toString(),
                type: 'game',
                data: projectData,
                html: html,
                folder: projectFolder,
                createdAt: new Date().toISOString()
            };
            
            this.data.saveProject(project);
            this.ui.showToast('✅ Game project created and uploaded to GitHub!');
            this.downloadProjectFile(project);
            form.reset();
            
            setTimeout(() => {
                document.querySelector('[data-view="dashboard"]').click();
            }, 1500);
            
        } catch (error) {
            console.error('Error creating project:', error);
            this.ui.showToast(`❌ Error: ${error.message}`);
        }
    }

    downloadProjectFile(project) {
        const filename = `${project.data.slug || 'project'}.html`;
        const blob = new Blob([project.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    updateDashboard() {
        const stats = this.data.getStats();
        
        // Update stat cards
        document.getElementById('archCount').textContent = stats.architecture;
        document.getElementById('codingCount').textContent = stats.coding;
        document.getElementById('gameCount').textContent = stats.games;
        document.getElementById('mediaCount').textContent = stats.media;
        
        // Update recent projects list
        this.loadRecentProjects();
    }

    loadRecentProjects() {
        const projects = this.data.getAllProjects().slice(0, 5);
        const container = document.getElementById('recentProjectsList');
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No projects yet. Create your first project!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = projects.map(project => this.renderProjectItem(project)).join('');
        
        // Attach delete handlers
        this.attachProjectHandlers();
    }

    loadAllProjects() {
        const projects = this.data.getAllProjects();
        const container = document.getElementById('allProjectsList');
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No projects found.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = projects.map(project => this.renderProjectItem(project)).join('');
        
        // Attach delete handlers
        this.attachProjectHandlers();
        
        // Setup filter and search
        this.setupProjectFilters();
    }

    renderProjectItem(project) {
        const badgeClass = `badge-${project.type}`;
        const typeLabel = project.type === 'architecture' ? 'Architecture' : 
                         project.type === 'coding' ? 'Coding' : 'Game';
        
        return `
            <div class="project-item" data-project-id="${project.id}">
                <div class="project-header">
                    <h3 class="project-title">${project.data.title || 'Untitled Project'}</h3>
                    <span class="project-badge ${badgeClass}">${typeLabel}</span>
                </div>
                <div class="project-meta">
                    <span>📅 ${new Date(project.createdAt).toLocaleDateString()}</span>
                    <span>⏰ ${new Date(project.createdAt).toLocaleTimeString()}</span>
                </div>
                <div class="project-actions">
                    <button class="btn-icon" onclick="cms.downloadProject('${project.id}')" title="Download HTML">
                        💾
                    </button>
                    <button class="btn-icon" onclick="cms.viewProject('${project.id}')" title="Preview">
                        👁️
                    </button>
                    <button class="btn-icon" onclick="cms.deleteProject('${project.id}')" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }

    attachProjectHandlers() {
        // Handlers are attached via onclick in HTML for simplicity
    }

    setupProjectFilters() {
        const filterSelect = document.getElementById('projectFilter');
        const searchInput = document.getElementById('projectSearch');
        
        if (filterSelect) {
            filterSelect.addEventListener('change', () => this.filterProjects());
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterProjects());
        }
    }

    filterProjects() {
        const filterType = document.getElementById('projectFilter').value;
        const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
        
        let projects = this.data.getAllProjects();
        
        // Apply type filter
        if (filterType !== 'all') {
            projects = projects.filter(p => p.type === filterType);
        }
        
        // Apply search filter
        if (searchTerm) {
            projects = projects.filter(p => 
                (p.data.title || '').toLowerCase().includes(searchTerm) ||
                (p.data.description || '').toLowerCase().includes(searchTerm)
            );
        }
        
        // Render filtered projects
        const container = document.getElementById('allProjectsList');
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No projects found matching your criteria.</p>
                </div>
            `;
        } else {
            container.innerHTML = projects.map(project => this.renderProjectItem(project)).join('');
        }
    }

    downloadProject(projectId) {
        const project = this.data.getProject(projectId);
        if (project) {
            this.downloadProjectFile(project);
            this.ui.showToast('📥 Downloading project...');
        }
    }

    viewProject(projectId) {
        const project = this.data.getProject(projectId);
        if (project) {
            // Open HTML in new window
            const win = window.open('', '_blank');
            win.document.write(project.html);
            win.document.close();
        }
    }

    deleteProject(projectId) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.data.deleteProject(projectId);
            this.ui.showToast('🗑️ Project deleted');
            this.loadAllProjects();
            this.updateDashboard();
        }
    }

    setupEventListeners() {
        // View Dev Site button - opens local development server
        document.getElementById('viewDevBtn')?.addEventListener('click', () => {
            window.open('http://localhost:8000?highlight=new', '_blank');
        });
        
        // View Live Site button - opens production website
        document.getElementById('viewLiveBtn')?.addEventListener('click', () => {
            window.open('https://www.sketchandscript.pl', '_blank');
        });
        
        // Upload Media button
        document.getElementById('uploadMediaBtn')?.addEventListener('click', () => {
            this.media.openUploadModal();
        });
        
        // GitHub settings buttons
        document.getElementById('saveGitHubBtn')?.addEventListener('click', () => {
            this.saveGitHubSettings();
        });
        
        document.getElementById('testGitHubBtn')?.addEventListener('click', () => {
            this.testGitHubConnection();
        });
        
        // Settings buttons
        document.getElementById('exportDataBtn')?.addEventListener('click', () => {
            this.data.exportData();
            this.ui.showToast('📦 Data exported');
        });
        
        document.getElementById('importDataBtn')?.addEventListener('click', () => {
            this.data.importData();
        });
        
        document.getElementById('clearDataBtn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all data? This cannot be undone!')) {
                this.data.clearAll();
                this.ui.showToast('🗑️ All data cleared');
                this.updateDashboard();
                this.loadAllProjects();
            }
        });
    }
    
    loadGitHubSettings() {
        const settings = this.github.settings;
        const elements = {
            owner: document.getElementById('githubOwner'),
            repo: document.getElementById('githubRepo'),
            branch: document.getElementById('githubBranch'),
            token: document.getElementById('githubToken'),
            basePath: document.getElementById('githubBasePath')
        };
        
        // Check if elements exist (they might not be rendered yet)
        if (!elements.owner) return;
        
        // Populate fields
        elements.owner.value = settings.owner || '';
        elements.repo.value = settings.repo || '';
        elements.branch.value = settings.branch || 'main';
        elements.token.value = settings.token || '';
        elements.basePath.value = settings.basePath || 'images';
        
        // Show configuration status
        const statusDiv = document.getElementById('githubStatus');
        if (statusDiv && this.github.isConfigured()) {
            statusDiv.style.display = 'block';
            statusDiv.style.background = 'var(--bg-tertiary)';
            statusDiv.style.borderLeft = '3px solid var(--success)';
            statusDiv.style.color = 'var(--text-secondary)';
            statusDiv.innerHTML = `✅ GitHub is configured for <strong>${settings.owner}/${settings.repo}</strong>`;
        }
    }
    
    saveGitHubSettings() {
        const settings = {
            owner: document.getElementById('githubOwner').value.trim(),
            repo: document.getElementById('githubRepo').value.trim(),
            branch: document.getElementById('githubBranch').value.trim() || 'main',
            token: document.getElementById('githubToken').value.trim(),
            basePath: document.getElementById('githubBasePath').value.trim() || 'images'
        };
        
        if (!settings.owner || !settings.repo || !settings.token) {
            this.ui.showToast('❌ Please fill in all required fields');
            return;
        }
        
        this.github.saveSettings(settings);
        this.ui.showToast('✅ GitHub settings saved!');
        
        // Show success in status div
        const statusDiv = document.getElementById('githubStatus');
        statusDiv.style.display = 'block';
        statusDiv.style.background = 'var(--bg-tertiary)';
        statusDiv.style.borderLeft = '3px solid var(--success)';
        statusDiv.style.color = 'var(--success)';
        statusDiv.textContent = '✅ Settings saved successfully';
    }
    
    async testGitHubConnection() {
        const statusDiv = document.getElementById('githubStatus');
        statusDiv.style.display = 'block';
        statusDiv.style.background = 'var(--bg-tertiary)';
        statusDiv.style.borderLeft = '3px solid var(--primary)';
        statusDiv.style.color = 'var(--text-primary)';
        statusDiv.textContent = '⏳ Testing connection...';
        
        const result = await this.github.testConnection();
        
        if (result.success) {
            statusDiv.style.borderLeft = '3px solid var(--success)';
            statusDiv.style.color = 'var(--success)';
            let message = result.message;
            if (result.details) {
                message += `<br><small style="color: var(--text-secondary);">${result.details}</small>`;
            }
            statusDiv.innerHTML = message;
            this.ui.showToast('✅ GitHub connection successful!');
        } else {
            statusDiv.style.borderLeft = '3px solid var(--danger)';
            statusDiv.style.color = 'var(--danger)';
            statusDiv.innerHTML = `❌ ${result.message}`;
            this.ui.showToast('❌ GitHub connection failed');
        }
    }
}

// Initialize CMS when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cms = new CMS();
});

