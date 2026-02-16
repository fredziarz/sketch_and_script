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
                // File doesn't exist, that's fine
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
            throw new Error(`GitHub API error: ${response.status}`);
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
            const error = await response.json();
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

    async testConnection() {
        if (!this.isConfigured()) {
            return { success: false, message: 'GitHub is not configured' };
        }

        try {
            const url = `https://api.github.com/repos/${this.settings.owner}/${this.settings.repo}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `token ${this.settings.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    message: `Connected to ${data.full_name}`,
                    repo: data
                };
            } else {
                return {
                    success: false,
                    message: `Connection failed: ${response.status}`
                };
            }
        } catch (error) {
            return {
                success: false,
                message: `Connection error: ${error.message}`
            };
        }
    }
}
