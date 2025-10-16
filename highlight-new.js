// ============================================
// Highlight New Content Script
// Add this to your dev branch to highlight new projects
// ============================================

(function() {
    // Check if we should highlight new content
    const urlParams = new URLSearchParams(window.location.search);
    const shouldHighlight = urlParams.get('highlight') === 'new';
    
    if (!shouldHighlight) return;
    
    // Add CSS for highlighting
    const style = document.createElement('style');
    style.textContent = `
        .highlight-new {
            position: relative;
            animation: pulse-glow 2s ease-in-out infinite;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3) !important;
            border-radius: 12px;
        }
        
        .highlight-new::before {
            content: "NEW ✨";
            position: absolute;
            top: -12px;
            right: -12px;
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
            z-index: 10;
            animation: bounce 1s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
            }
            50% {
                box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.2);
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-3px);
            }
        }
        
        /* Smooth scroll to highlighted content */
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
    
    // Find and highlight the first project card (assumed to be newest)
    // Adjust selector based on your HTML structure
    const firstProject = document.querySelector('.project-card:first-child');
    
    if (firstProject) {
        firstProject.classList.add('highlight-new');
        
        // Scroll to the highlighted project after a short delay
        setTimeout(() => {
            firstProject.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 500);
    }
    
    // Also highlight any projects with data-new attribute
    document.querySelectorAll('[data-new="true"]').forEach(el => {
        el.classList.add('highlight-new');
    });
    
    // Show a notification banner
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.5s ease-out;
    `;
    banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">✨</span>
            <span>New content is highlighted!</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: rgba(255,255,255,0.2); border: none; color: white; 
                           padding: 4px 8px; border-radius: 6px; cursor: pointer; margin-left: 8px;">
                ✕
            </button>
        </div>
    `;
    
    // Add slide-in animation
    const keyframes = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    style.textContent += keyframes;
    
    document.body.appendChild(banner);
    
    // Auto-remove banner after 5 seconds
    setTimeout(() => {
        banner.style.transition = 'opacity 0.5s, transform 0.5s';
        banner.style.opacity = '0';
        banner.style.transform = 'translateX(400px)';
        setTimeout(() => banner.remove(), 500);
    }, 5000);
})();

