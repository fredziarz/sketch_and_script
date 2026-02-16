// ============================================
// GitHub Integration Manager
// ============================================

export class GitHubManager {
    constructor() {
        this.settings = this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('githubSettings');
        return saved ? JSON.parse(saved) : {
            owner: 'fredziarz',
            repo: 'sketch_and_script',
            branch: 'main',
            token: '',
            basePath: 'images' // Base path for images in repo
        };
    }

    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem('githubSettings', JSON.stringify(this.settings));
    }

    isConfigured() {
        return !!(this.settings.token && this.settings.owner && this.settings.repo);
    }

    sanitizeFilename(filename) {
        // Get file extension
        const ext = filename.substring(filename.lastIndexOf('.'));
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        
        // Sanitize: lowercase, replace spaces/special chars with hyphens
        const sanitized = nameWithoutExt
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            .replace(/-+/g, '-'); // Replace multiple hyphens with single
        
        return sanitized + ext.toLowerCase();
    }

    generateProjectFolderName(projectTitle) {
        return projectTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-');
    }

    async uploadImage(file, projectFolder) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured. Please add your token in Settings.');
        }

        const sanitizedFilename = this.sanitizeFilename(file.name);
        const path = `${this.settings.basePath}/${projectFolder}/${sanitizedFilename}`;

        // Convert file to base64
        const base64Content = await this.fileToBase64(file);

        try {
            // First, try to get the file to check if it exists (for SHA)
            let sha = null;
            try {
                const existingFile = await this.getFileContent(path);
                sha = existingFile.sha;
            } catch (e) {
                // File doesn't exist (404), that's fine - we'll create it
                if (e.message !== 'NOT_FOUND') {
                    console.warn('Error checking existing file:', e.message);
                }
            }

            // Create or update file
            const response = await this.createOrUpdateFile(path, base64Content, sanitizedFilename, sha);
            
            return {
                success: true,
                path: path,
                url: response.content.download_url,
                filename: sanitizedFilename
            };
        } catch (error) {
            console.error('GitHub upload error:', error);
            throw new Error(`Failed to upload to GitHub: ${error.message}`);
        }
    }

    async uploadMultipleImages(files, projectFolder) {
        const results = [];
        
        for (const file of files) {
            try {
                const result = await this.uploadImage(file, projectFolder);
                results.push(result);
            } catch (error) {
                results.push({
                    success: false,
                    filename: file.name,
                    error: error.message
                });
            }
        }
        
        return results;
    }

    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Remove data URL prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async getFileContent(path) {
        const url = `https://api.github.com/repos/${this.settings.owner}/${this.settings.repo}/contents/${path}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${this.settings.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            // 404 is expected when file doesn't exist yet
            if (response.status === 404) {
                throw new Error('NOT_FOUND');
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `GitHub API error: ${response.status}`);
        }

        return await response.json();
    }

    async createOrUpdateFile(path, base64Content, filename, sha = null) {
        const url = `https://api.github.com/repos/${this.settings.owner}/${this.settings.repo}/contents/${path}`;
        
        const body = {
            message: `Upload image: ${filename}`,
            content: base64Content,
            branch: this.settings.branch
        };

        if (sha) {
            body.sha = sha;
            body.message = `Update image: ${filename}`;
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${this.settings.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            
            // Provide specific error messages
            if (response.status === 403) {
                throw new Error('Permission denied. Your GitHub token needs "repo" scope with write access. Go to Settings > Developer settings > Personal access tokens and create a new token with "repo" permissions.');
            } else if (response.status === 404) {
                throw new Error(`Repository ${this.settings.owner}/${this.settings.repo} not found or you don't have access to it.`);
            }
            
            throw new Error(error.message || `GitHub API error: ${response.status}`);
        }

        return await response.json();
    }

    async createProjectData(projectData, projectFolder) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured.');
        }

        const path = `data/${projectFolder}.json`;
        const content = JSON.stringify(projectData, null, 2);
        const base64Content = btoa(unescape(encodeURIComponent(content)));

        try {
            let sha = null;
            try {
                const existingFile = await this.getFileContent(path);
                sha = existingFile.sha;
            } catch (e) {
                // File doesn't exist
            }

            await this.createOrUpdateFile(path, base64Content, `${projectFolder}.json`, sha);
            
            return {
                success: true,
                path: path
            };
        } catch (error) {
            console.error('GitHub data upload error:', error);
            throw new Error(`Failed to upload project data: ${error.message}`);
        }
    }

    async uploadProjectHTML(html, projectSlug) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured.');
        }

        const path = `projects/${projectSlug}.html`;
        const base64Content = btoa(unescape(encodeURIComponent(html)));

        try {
            let sha = null;
            try {
                const existingFile = await this.getFileContent(path);
                sha = existingFile.sha;
            } catch (e) {
                // File doesn't exist
            }

            await this.createOrUpdateFile(path, base64Content, `${projectSlug}.html`, sha);
            
            return {
                success: true,
                path: path,
                url: `https://${this.settings.owner}.github.io/${this.settings.repo}/projects/${projectSlug}.html`
            };
        } catch (error) {
            console.error('GitHub HTML upload error:', error);
            throw new Error(`Failed to upload HTML: ${error.message}`);
        }
    }

    async updateProjectsList(newProject) {
        if (!this.isConfigured()) {
            throw new Error('GitHub is not configured.');
        }

        const path = 'data/projects.json';
        
        try {
            // Get existing projects list
            let projects = [];
            let sha = null;
            
            try {
                const existingFile = await this.getFileContent(path);
                sha = existingFile.sha;
                const content = atob(existingFile.content.replace(/\s/g, ''));
                projects = JSON.parse(content);
            } catch (e) {
                // File doesn't exist yet, start fresh
                if (e.message !== 'NOT_FOUND') {
                    console.warn('Could not read existing projects list:', e.message);
                }
            }

            // Check if project already exists (by slug or folder)
            const existingIndex = projects.findIndex(p => 
                p.slug === newProject.slug || p.folder === newProject.folder
            );

            if (existingIndex >= 0) {
                // Update existing project
                projects[existingIndex] = newProject;
            } else {
                // Add new project to the beginning
                projects.unshift(newProject);
            }

            // Upload updated list
            const content = JSON.stringify(projects, null, 2);
            const base64Content = btoa(unescape(encodeURIComponent(content)));

            await this.createOrUpdateFile(path, base64Content, 'projects.json', sha);
            
            return {
                success: true,
                path: path,
                totalProjects: projects.length
            };
        } catch (error) {
            console.error('GitHub projects list update error:', error);
            throw new Error(`Failed to update projects list: ${error.message}`);
        }
    }

    async testConnection() {
        if (!this.isConfigured()) {
            return { success: false, message: 'GitHub is not configured' };
        }

        try {
            // Test 1: Check if we can read the repository
            const repoUrl = `https://api.github.com/repos/${this.settings.owner}/${this.settings.repo}`;
            const repoResponse = await fetch(repoUrl, {
                headers: {
                    'Authorization': `token ${this.settings.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!repoResponse.ok) {
                if (repoResponse.status === 404) {
                    return {
                        success: false,
                        message: `Repository ${this.settings.owner}/${this.settings.repo} not found or you don't have access to it.`
                    };
                } else if (repoResponse.status === 401) {
                    return {
                        success: false,
                        message: 'Invalid token. Please check your Personal Access Token.'
                    };
                }
                return {
                    success: false,
                    message: `Connection failed: ${repoResponse.status}`
                };
            }

            const repoData = await repoResponse.json();
            
            // Test 2: Check token scopes/permissions
            const scopes = repoResponse.headers.get('X-OAuth-Scopes') || '';
            const hasRepoScope = scopes.includes('repo') || scopes.includes('public_repo');
            
            if (!hasRepoScope) {
                return {
                    success: false,
                    message: `Token lacks required permissions. Current scopes: [${scopes}]. You need "repo" scope for private repos or "public_repo" for public repos.`,
                    repo: repoData
                };
            }
            
            return {
                success: true,
                message: `✅ Connected to ${repoData.full_name}`,
                details: `Token has scopes: ${scopes}`,
                repo: repoData
            };
        } catch (error) {
            return {
                success: false,
                message: `Connection error: ${error.message}`
            };
        }
    }
}
