// ============================================
// Form Builder - Generates dynamic forms for each project type
// ============================================

export class FormBuilder {
    constructor(dataManager) {
        this.data = dataManager;
    }

    buildArchitectureForm() {
        return `
            <!-- Basic Information -->
            <div class="form-section">
                <h3 class="form-section-title">Basic Information</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label required">Project Title</label>
                        <input type="text" name="title" class="form-input" required placeholder="Modern Apartment Renovation">
                        <span class="form-help">This will be the main heading of your project page</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label required">URL Slug</label>
                        <input type="text" name="slug" class="form-input" required placeholder="modern-apartment-renovation">
                        <span class="form-help">Used for the filename (e.g., architecture-project-10.html)</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Subtitle</label>
                    <input type="text" name="subtitle" class="form-input" required placeholder="Complete transformation of an 80m² apartment">
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Category</label>
                    <select name="category" class="form-select" required>
                        <option value="">Select category...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Office">Office</option>
                        <option value="Public Space">Public Space</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Retail">Retail</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Project Overview</label>
                    <textarea name="overview" class="form-textarea" required placeholder="Describe the project in 2-3 paragraphs..."></textarea>
                    <span class="form-help">Main description that appears at the top of the project page</span>
                </div>
            </div>
            
            <!-- Project Metadata -->
            <div class="form-section">
                <h3 class="form-section-title">Project Details</h3>
                
                <div class="form-row four-col">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-input" placeholder="Warsaw, Poland">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="text" name="year" class="form-input" placeholder="2024">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Area</label>
                        <input type="text" name="area" class="form-input" placeholder="80 m²">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Duration</label>
                        <input type="text" name="duration" class="form-input" placeholder="3 months">
                    </div>
                </div>
            </div>
            
            <!-- Images -->
            <div class="form-section">
                <h3 class="form-section-title">Images</h3>
                
                <div class="form-group">
                    <label class="form-label required">Featured Image Path</label>
                    <input type="text" name="featuredImage" class="form-input" required placeholder="../images/architecture/project-main.jpg">
                    <span class="form-help">Path to the main hero image (relative to projects folder)</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Gallery Images (comma-separated paths)</label>
                    <textarea name="galleryImages" class="form-textarea" placeholder="../images/architecture/img1.jpg, ../images/architecture/img2.jpg"></textarea>
                    <span class="form-help">Separate each image path with a comma</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Gallery Captions (comma-separated)</label>
                    <textarea name="galleryCaptions" class="form-textarea" placeholder="Living room overview, Kitchen detail, Bedroom view"></textarea>
                    <span class="form-help">One caption per image, in the same order</span>
                </div>
            </div>
            
            <!-- SEO -->
            <div class="form-section">
                <h3 class="form-section-title">SEO & Metadata</h3>
                
                <div class="form-group">
                    <label class="form-label">Meta Description</label>
                    <input type="text" name="metaDescription" class="form-input" placeholder="Short description for search engines (160 characters max)">
                </div>
            </div>
            
            <!-- Form Actions -->
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <span>Create Architecture Project</span>
                    <span class="icon">→</span>
                </button>
                <button type="reset" class="btn btn-secondary">Reset Form</button>
            </div>
        `;
    }

    buildCodingForm() {
        return `
            <!-- Basic Information -->
            <div class="form-section">
                <h3 class="form-section-title">Basic Information</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label required">Project Title</label>
                        <input type="text" name="title" class="form-input" required placeholder="E-Commerce Test Automation">
                        <span class="form-help">This will be the main heading of your project page</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label required">URL Slug</label>
                        <input type="text" name="slug" class="form-input" required placeholder="ecommerce-test-automation">
                        <span class="form-help">Used for the filename (e.g., coding-project-2.html)</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Subtitle</label>
                    <input type="text" name="subtitle" class="form-input" required placeholder="Comprehensive test automation suite">
                </div>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label required">Category</label>
                        <select name="category" class="form-select" required>
                            <option value="">Select category...</option>
                            <option value="QA Testing">QA Testing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="API Development">API Development</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Full Stack">Full Stack</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-select">
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Project Overview</label>
                    <textarea name="overview" class="form-textarea" required placeholder="Describe the project, challenges, and solutions..."></textarea>
                    <span class="form-help">Main description that appears at the top of the project page</span>
                </div>
            </div>
            
            <!-- Project Details -->
            <div class="form-section">
                <h3 class="form-section-title">Project Details</h3>
                
                <div class="form-row four-col">
                    <div class="form-group">
                        <label class="form-label">Role</label>
                        <input type="text" name="role" class="form-input" placeholder="Lead QA Engineer">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Duration</label>
                        <input type="text" name="duration" class="form-input" placeholder="6 months">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Team Size</label>
                        <input type="text" name="teamSize" class="form-input" placeholder="5 members">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="text" name="year" class="form-input" placeholder="2024">
                    </div>
                </div>
            </div>
            
            <!-- Technology Stack -->
            <div class="form-section">
                <h3 class="form-section-title">Technology Stack</h3>
                
                <div class="form-group">
                    <label class="form-label">Technologies (comma-separated)</label>
                    <input type="text" name="technologies" class="form-input" placeholder="Selenium, Python, Pytest, Jenkins, Docker">
                    <span class="form-help">Technologies and tools used in the project</span>
                </div>
            </div>
            
            <!-- Links -->
            <div class="form-section">
                <h3 class="form-section-title">Links</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label">GitHub URL</label>
                        <input type="url" name="githubUrl" class="form-input" placeholder="https://github.com/username/repo">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Live Demo URL</label>
                        <input type="url" name="demoUrl" class="form-input" placeholder="https://demo.example.com">
                    </div>
                </div>
            </div>
            
            <!-- Key Features -->
            <div class="form-section">
                <h3 class="form-section-title">Key Features</h3>
                
                <div class="form-group">
                    <label class="form-label">Features (one per line)</label>
                    <textarea name="features" class="form-textarea" placeholder="Test Automation - 800+ automated test cases
CI/CD Integration - Seamless Jenkins integration
Reporting - Comprehensive test reports"></textarea>
                    <span class="form-help">Describe 3-4 key features, one per line with format: Title - Description</span>
                </div>
            </div>
            
            <!-- Code Sample -->
            <div class="form-section">
                <h3 class="form-section-title">Code Showcase (Optional)</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label">Code Language</label>
                        <input type="text" name="codeLanguage" class="form-input" placeholder="Python">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Code Filename</label>
                        <input type="text" name="codeFilename" class="form-input" placeholder="test_checkout.py">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Code Sample</label>
                    <textarea name="codeSample" class="form-textarea" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;" placeholder="Paste your code here..."></textarea>
                </div>
            </div>
            
            <!-- Images -->
            <div class="form-section">
                <h3 class="form-section-title">Screenshots</h3>
                
                <div class="form-group">
                    <label class="form-label">Screenshot Paths (comma-separated)</label>
                    <textarea name="screenshots" class="form-textarea" placeholder="../images/coding/screenshot1.jpg, ../images/coding/screenshot2.jpg"></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Screenshot Captions (comma-separated)</label>
                    <textarea name="screenshotCaptions" class="form-textarea" placeholder="Dashboard view, Test results, Coverage report"></textarea>
                </div>
            </div>
            
            <!-- Form Actions -->
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <span>Create Coding Project</span>
                    <span class="icon">→</span>
                </button>
                <button type="reset" class="btn btn-secondary">Reset Form</button>
            </div>
        `;
    }

    buildGameForm() {
        return `
            <!-- Basic Information -->
            <div class="form-section">
                <h3 class="form-section-title">Basic Information</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label required">Game Title</label>
                        <input type="text" name="title" class="form-input" required placeholder="Pixel Platformer">
                        <span class="form-help">The name of your game</span>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label required">URL Slug</label>
                        <input type="text" name="slug" class="form-input" required placeholder="pixel-platformer">
                        <span class="form-help">Used for the filename (e.g., coding-project-game-2.html)</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Subtitle</label>
                    <input type="text" name="subtitle" class="form-input" required placeholder="Challenging pixel-art platformer with retro aesthetic">
                </div>
                
                <div class="form-row three-col">
                    <div class="form-group">
                        <label class="form-label required">Genre</label>
                        <select name="genre" class="form-select" required>
                            <option value="">Select genre...</option>
                            <option value="Platformer">Platformer</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="RPG">RPG</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Simulation">Simulation</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label required">Game Engine</label>
                        <select name="engine" class="form-select" required>
                            <option value="">Select engine...</option>
                            <option value="Unity">Unity</option>
                            <option value="Unreal Engine">Unreal Engine</option>
                            <option value="Godot">Godot</option>
                            <option value="GameMaker">GameMaker</option>
                            <option value="Custom">Custom Engine</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-select">
                            <option value="Completed">Completed</option>
                            <option value="In Development">In Development</option>
                            <option value="Prototype">Prototype</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Game Description</label>
                    <textarea name="description" class="form-textarea" required placeholder="Describe your game, gameplay mechanics, story..."></textarea>
                </div>
            </div>
            
            <!-- Game Details -->
            <div class="form-section">
                <h3 class="form-section-title">Game Details</h3>
                
                <div class="form-row four-col">
                    <div class="form-group">
                        <label class="form-label">Role</label>
                        <input type="text" name="role" class="form-input" placeholder="Solo Developer">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Development Time</label>
                        <input type="text" name="duration" class="form-input" placeholder="3 months">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Play Count</label>
                        <input type="text" name="plays" class="form-input" placeholder="2,500+">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="text" name="year" class="form-input" placeholder="2024">
                    </div>
                </div>
            </div>
            
            <!-- Links -->
            <div class="form-section">
                <h3 class="form-section-title">Game Links</h3>
                
                <div class="form-row two-col">
                    <div class="form-group">
                        <label class="form-label">Play Online URL (itch.io, etc.)</label>
                        <input type="url" name="playUrl" class="form-input" placeholder="https://username.itch.io/game-name">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">GitHub Repository</label>
                        <input type="url" name="githubUrl" class="form-input" placeholder="https://github.com/username/repo">
                    </div>
                </div>
            </div>
            
            <!-- Features -->
            <div class="form-section">
                <h3 class="form-section-title">Game Features</h3>
                
                <div class="form-group">
                    <label class="form-label">Key Features (one per line)</label>
                    <textarea name="features" class="form-textarea" placeholder="Procedurally generated levels
Retro pixel art style
Challenging boss fights
Local multiplayer support"></textarea>
                    <span class="form-help">List the main features of your game</span>
                </div>
            </div>
            
            <!-- Media -->
            <div class="form-section">
                <h3 class="form-section-title">Screenshots & Media</h3>
                
                <div class="form-group">
                    <label class="form-label required">Thumbnail Image</label>
                    <input type="text" name="thumbnail" class="form-input" required placeholder="../images/games/game-thumbnail.jpg">
                    <span class="form-help">Main image for the game card</span>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Screenshot Paths (comma-separated)</label>
                    <textarea name="screenshots" class="form-textarea" placeholder="../images/games/screenshot1.jpg, ../images/games/screenshot2.jpg"></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Screenshot Captions (comma-separated)</label>
                    <textarea name="screenshotCaptions" class="form-textarea" placeholder="Gameplay view, Boss battle, Level editor"></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Gameplay Video URL (YouTube, Vimeo)</label>
                    <input type="url" name="videoUrl" class="form-input" placeholder="https://youtube.com/watch?v=...">
                </div>
            </div>
            
            <!-- Form Actions -->
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <span>Create Game Project</span>
                    <span class="icon">→</span>
                </button>
                <button type="reset" class="btn btn-secondary">Reset Form</button>
            </div>
        `;
    }

    extractFormData(formData, projectType) {
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (value && value.trim() !== '') {
                data[key] = value.trim();
            }
        }
        
        // Process arrays (comma-separated values)
        if (data.galleryImages) {
            data.galleryImages = data.galleryImages.split(',').map(s => s.trim()).filter(s => s);
        }
        if (data.galleryCaptions) {
            data.galleryCaptions = data.galleryCaptions.split(',').map(s => s.trim()).filter(s => s);
        }
        if (data.screenshots) {
            data.screenshots = data.screenshots.split(',').map(s => s.trim()).filter(s => s);
        }
        if (data.screenshotCaptions) {
            data.screenshotCaptions = data.screenshotCaptions.split(',').map(s => s.trim()).filter(s => s);
        }
        if (data.technologies) {
            data.technologies = data.technologies.split(',').map(s => s.trim()).filter(s => s);
        }
        if (data.features) {
            data.features = data.features.split('\n').map(s => s.trim()).filter(s => s);
        }
        
        return data;
    }
}

