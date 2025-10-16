// ============================================
// Data Manager - Handles all data persistence
// ============================================

export class DataManager {
    constructor() {
        this.storageKey = 'sketchAndScript_cms_data';
        this.data = this.loadData();
    }

    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        
        // Return default structure
        return {
            projects: [],
            media: [],
            settings: {}
        };
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }

    // Project operations
    saveProject(project) {
        this.data.projects.push(project);
        this.saveData();
        return project;
    }

    getProject(id) {
        return this.data.projects.find(p => p.id === id);
    }

    getAllProjects() {
        return [...this.data.projects].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    updateProject(id, updates) {
        const index = this.data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.projects[index] = {
                ...this.data.projects[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveData();
            return this.data.projects[index];
        }
        return null;
    }

    deleteProject(id) {
        this.data.projects = this.data.projects.filter(p => p.id !== id);
        this.saveData();
    }

    // Media operations
    saveMedia(mediaItem) {
        this.data.media.push(mediaItem);
        this.saveData();
        return mediaItem;
    }

    getAllMedia() {
        return [...this.data.media].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    deleteMedia(id) {
        this.data.media = this.data.media.filter(m => m.id !== id);
        this.saveData();
    }

    // Statistics
    getStats() {
        const projects = this.data.projects;
        return {
            architecture: projects.filter(p => p.type === 'architecture').length,
            coding: projects.filter(p => p.type === 'coding').length,
            games: projects.filter(p => p.type === 'game').length,
            media: this.data.media.length
        };
    }

    // Import/Export
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cms-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        this.data = imported;
                        this.saveData();
                        alert('✅ Data imported successfully!');
                        window.location.reload();
                    } catch (error) {
                        alert('❌ Error importing data: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    }

    clearAll() {
        this.data = {
            projects: [],
            media: [],
            settings: {}
        };
        this.saveData();
    }
}

