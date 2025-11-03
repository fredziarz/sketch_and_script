// ============================================
// Media Manager - Handles file uploads and media library
// ============================================

export class MediaManager {
    constructor(dataManager) {
        this.data = dataManager;
        this.modal = document.getElementById('fileModal');
        this.fileInput = document.getElementById('fileInput');
        this.uploadArea = document.getElementById('uploadArea');
        this.uploadPreview = document.getElementById('uploadPreview');
        this.selectedFiles = [];
        
        this.setupUploadHandlers();
    }

    setupUploadHandlers() {
        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // File selection
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('drag-over');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('drag-over');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('drag-over');
            this.handleFiles(e.dataTransfer.files);
        });

        // Modal controls
        document.querySelector('.modal-close')?.addEventListener('click', () => {
            this.closeUploadModal();
        });

        document.getElementById('cancelUploadBtn')?.addEventListener('click', () => {
            this.closeUploadModal();
        });

        document.getElementById('confirmUploadBtn')?.addEventListener('click', () => {
            this.uploadFiles();
        });
    }

    openUploadModal() {
        this.modal.classList.add('active');
        this.selectedFiles = [];
        this.uploadPreview.innerHTML = '';
    }

    closeUploadModal() {
        this.modal.classList.remove('active');
        this.selectedFiles = [];
        this.uploadPreview.innerHTML = '';
        this.fileInput.value = '';
    }

    handleFiles(files) {
        const fileArray = Array.from(files);
        
        fileArray.forEach(file => {
            // Check file type
            if (!this.isValidFile(file)) {
                alert(`Invalid file type: ${file.name}`);
                return;
            }
            
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File too large: ${file.name} (max 10MB)`);
                return;
            }
            
            this.selectedFiles.push(file);
            this.previewFile(file);
        });
    }

    isValidFile(file) {
        const validTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'application/zip',
            'text/html',
            'text/javascript',
            'text/css'
        ];
        
        return validTypes.some(type => file.type === type) ||
               file.name.endsWith('.html') ||
               file.name.endsWith('.js') ||
               file.name.endsWith('.css');
    }

    previewFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            
            if (file.type.startsWith('image/')) {
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <div class="file-info">
                        <div>${file.name}</div>
                        <div>${this.formatFileSize(file.size)}</div>
                    </div>
                `;
            } else {
                const icon = this.getFileIcon(file);
                previewItem.innerHTML = `
                    <div class="file-icon">${icon}</div>
                    <div class="file-info">
                        <div>${file.name}</div>
                        <div>${this.formatFileSize(file.size)}</div>
                    </div>
                `;
            }
            
            this.uploadPreview.appendChild(previewItem);
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }

    getFileIcon(file) {
        if (file.name.endsWith('.zip')) return '📦';
        if (file.name.endsWith('.html')) return '📄';
        if (file.name.endsWith('.js')) return '📜';
        if (file.name.endsWith('.css')) return '🎨';
        return '📁';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    toKebabCase(str) {
        return str
            .replace(/\.[^/.]+$/, '') // Remove extension
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    getFileExtension(filename) {
        return filename.slice(filename.lastIndexOf('.'));
    }

    async uploadFiles() {
        if (this.selectedFiles.length === 0) {
            alert('Please select files to upload');
            return;
        }

        // In a real implementation, this would upload to a server
        // For now, we'll store file information in localStorage
        
        for (const file of this.selectedFiles) {
            const reader = new FileReader();
            
            await new Promise((resolve) => {
                reader.onload = (e) => {
                    const kebabName = this.toKebabCase(file.name);
                    const extension = this.getFileExtension(file.name);
                    const kebabFileName = kebabName + extension;
                    
                    const mediaItem = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        kebabName: kebabFileName,
                        type: file.type,
                        size: file.size,
                        dataUrl: e.target.result,
                        createdAt: new Date().toISOString()
                    };
                    
                    this.data.saveMedia(mediaItem);
                    resolve();
                };
                
                reader.readAsDataURL(file);
            });
        }
        
        alert(`✅ ${this.selectedFiles.length} file(s) uploaded successfully!`);
        this.closeUploadModal();
        this.loadMediaLibrary();
    }

    loadMediaLibrary() {
        const mediaGrid = document.getElementById('mediaGrid');
        const media = this.data.getAllMedia();
        
        if (media.length === 0) {
            mediaGrid.innerHTML = `
                <div class="empty-state">
                    <p>No media files yet.</p>
                </div>
            `;
            return;
        }
        
        mediaGrid.innerHTML = media.map(item => {
            const kebabName = item.kebabName || item.name;
            if (item.type.startsWith('image/')) {
                return `
                    <div class="media-item" data-media-id="${item.id}">
                        <img src="${item.dataUrl}" alt="${item.name}">
                        <div class="media-item-overlay">
                            <div class="media-filename">${kebabName}</div>
                            <div class="media-filesize">${this.formatFileSize(item.size)}</div>
                            <div class="media-actions">
                                <button class="btn-icon" onclick="cms.media.downloadMedia('${item.id}')" title="Download">
                                    💾
                                </button>
                                <button class="btn-icon" onclick="cms.media.deleteMedia('${item.id}')" title="Delete">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                const icon = this.getFileIcon(item);
                return `
                    <div class="media-item" data-media-id="${item.id}">
                        <div class="file-display">
                            <div class="file-icon-large">${icon}</div>
                            <div>${kebabName}</div>
                        </div>
                        <div class="media-item-overlay">
                            <div>${this.formatFileSize(item.size)}</div>
                            <div class="media-actions">
                                <button class="btn-icon" onclick="cms.media.downloadMedia('${item.id}')" title="Download">
                                    💾
                                </button>
                                <button class="btn-icon" onclick="cms.media.deleteMedia('${item.id}')" title="Delete">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    downloadMedia(id) {
        const media = this.data.getAllMedia().find(m => m.id === id);
        if (!media) return;
        
        const kebabName = media.kebabName || media.name;
        
        // Create download link
        const link = document.createElement('a');
        link.href = media.dataUrl;
        link.download = kebabName;
        link.click();
    }

    deleteMedia(id) {
        if (confirm('Delete this media file?')) {
            this.data.deleteMedia(id);
            this.loadMediaLibrary();
        }
    }
}

