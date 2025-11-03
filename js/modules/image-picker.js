// ============================================
// Image Picker - Select images from media library for project forms
// ============================================

export class ImagePicker {
    constructor(dataManager) {
        this.data = dataManager;
        this.modal = null;
        this.currentInputField = null;
        this.multiSelect = false;
        this.selectedImages = [];
        
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal" id="imagePickerModal">
                <div class="modal-content modal-large">
                    <div class="modal-header">
                        <h3>Select Images from Media Library</h3>
                        <button class="modal-close" id="imagePickerClose">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="image-picker-info">
                            <p id="pickerInfoText">Click on an image to select it</p>
                        </div>
                        <div id="imagePickerGrid" class="image-picker-grid">
                            <!-- Images will be loaded here -->
                        </div>
                        <div id="imagePickerEmpty" class="empty-state" style="display: none;">
                            <p>No images in media library yet.</p>
                            <p>Upload images first from the Media Library page.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="imagePickerCancel">Cancel</button>
                        <button class="btn btn-primary" id="imagePickerConfirm">Insert Selected</button>
                    </div>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('imagePickerModal');
    }

    setupEventListeners() {
        // Close button
        document.getElementById('imagePickerClose')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Cancel button
        document.getElementById('imagePickerCancel')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Confirm button
        document.getElementById('imagePickerConfirm')?.addEventListener('click', () => {
            this.insertSelectedImages();
        });

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(inputField, multiSelect = false) {
        this.currentInputField = inputField;
        this.multiSelect = multiSelect;
        this.selectedImages = [];
        
        // Detect project type from form context
        this.projectType = this.detectProjectType();
        
        // Update info text
        const infoText = multiSelect 
            ? 'Click on images to select multiple. File paths will be inserted as comma-separated values.'
            : 'Click on an image to select it. The file path will be inserted.';
        document.getElementById('pickerInfoText').textContent = infoText;
        
        // Load images
        this.loadImages();
        
        // Show modal
        this.modal.classList.add('active');
    }

    detectProjectType() {
        // Try to detect from the form ID
        const form = this.currentInputField?.closest('form');
        if (form) {
            const formId = form.id;
            if (formId.includes('architecture')) return 'architecture';
            if (formId.includes('game')) return 'games';
            if (formId.includes('coding')) return 'coding';
        }
        
        // Default to architecture
        return 'architecture';
    }

    getImagePath(kebabName) {
        const folder = this.projectType;
        return `../images/${folder}/${kebabName}`;
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.currentInputField = null;
        this.selectedImages = [];
    }

    loadImages() {
        const grid = document.getElementById('imagePickerGrid');
        const emptyState = document.getElementById('imagePickerEmpty');
        const media = this.data.getAllMedia();
        
        // Filter only images
        const images = media.filter(item => item.type.startsWith('image/'));
        
        if (images.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        grid.innerHTML = images.map(image => {
            const kebabName = image.kebabName || image.name;
            return `
                <div class="image-picker-item" data-image-id="${image.id}" data-kebab-name="${kebabName}" data-image-name="${image.name}">
                    <img src="${image.dataUrl}" alt="${image.name}">
                    <div class="image-picker-item-info">
                        <div class="image-name">${kebabName}</div>
                        <div class="image-size">${this.formatFileSize(image.size)}</div>
                    </div>
                    <div class="image-picker-item-overlay">
                        <span class="check-icon">✓</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // Attach click handlers
        this.attachImageClickHandlers();
    }

    attachImageClickHandlers() {
        const items = document.querySelectorAll('.image-picker-item');
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                const imageId = item.dataset.imageId;
                const kebabName = item.dataset.kebabName;
                const imageName = item.dataset.imageName;
                
                if (this.multiSelect) {
                    // Toggle selection
                    const index = this.selectedImages.findIndex(img => img.id === imageId);
                    if (index > -1) {
                        this.selectedImages.splice(index, 1);
                        item.classList.remove('selected');
                    } else {
                        this.selectedImages.push({ id: imageId, kebabName: kebabName, name: imageName });
                        item.classList.add('selected');
                    }
                } else {
                    // Single select - deselect all others
                    items.forEach(i => i.classList.remove('selected'));
                    item.classList.add('selected');
                    this.selectedImages = [{ id: imageId, kebabName: kebabName, name: imageName }];
                }
            });
        });
    }

    insertSelectedImages() {
        if (this.selectedImages.length === 0) {
            alert('Please select at least one image');
            return;
        }
        
        if (!this.currentInputField) {
            console.error('No input field specified');
            return;
        }
        
        // Insert kebab-case file paths
        if (this.multiSelect) {
            // For multiple images, join with comma and space
            const paths = this.selectedImages.map(img => this.getImagePath(img.kebabName)).join(', ');
            this.currentInputField.value = paths;
            
            // Add visual feedback
            const imageNames = this.selectedImages.map(img => img.kebabName).join(', ');
            this.currentInputField.setAttribute('placeholder', `✓ ${this.selectedImages.length} images selected: ${imageNames}`);
        } else {
            // For single image
            const path = this.getImagePath(this.selectedImages[0].kebabName);
            this.currentInputField.value = path;
            
            // Add visual feedback
            this.currentInputField.setAttribute('placeholder', `✓ Selected: ${this.selectedImages[0].kebabName}`);
        }
        
        // Add a class for styling
        this.currentInputField.classList.add('has-media-selection');
        
        // Trigger change event for any listeners
        this.currentInputField.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Close modal
        this.closeModal();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Helper method to add "Browse Media" button to any input field
    static addBrowseButton(inputElement, imagePicker, multiSelect = false) {
        // Check if button already exists
        if (inputElement.parentElement.querySelector('.browse-media-btn')) {
            return;
        }
        
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-icon browse-media-btn';
        button.innerHTML = '🖼️';
        button.title = multiSelect ? 'Browse Media Library (Multiple)' : 'Browse Media Library';
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            imagePicker.openModal(inputElement, multiSelect);
        });
        
        // Wrap input in container if not already
        const parent = inputElement.parentElement;
        if (!parent.classList.contains('input-with-browse')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-with-browse';
            parent.insertBefore(wrapper, inputElement);
            wrapper.appendChild(inputElement);
            wrapper.appendChild(button);
        } else {
            parent.appendChild(button);
        }
    }
}

