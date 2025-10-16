// ============================================
// UI Manager - Handles UI interactions and notifications
// ============================================

export class UIManager {
    constructor() {
        this.toast = document.getElementById('toast');
    }

    showToast(message, duration = 3000) {
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, duration);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    showLoading() {
        // Could implement a loading spinner
        console.log('Loading...');
    }

    hideLoading() {
        console.log('Loading complete');
    }
}

