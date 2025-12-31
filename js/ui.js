const UI = {
    showToast: (message, type = 'info', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${UI.getToastIcon(type)}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    getToastIcon: (type) => {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    },
    showLoading: (text = 'Loading...') => {
        const existingLoader = document.querySelector('.global-loader');
        if (existingLoader) return;
        const loader = document.createElement('div');
        loader.className = 'global-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>${text}</p>
            </div>
        `;
        document.body.appendChild(loader);
        document.body.style.overflow = 'hidden';
    },
    hideLoading: () => {
        const loader = document.querySelector('.global-loader');
        if (loader) {
            loader.remove();
            document.body.style.overflow = '';
        }
    },
    showLoadingWithDelay: async (text = 'Loading...', asyncTask, minDisplayTime = 800) => {
        UI.showLoading(text);
        const startTime = Date.now();
        try {
            const result = await asyncTask();
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minDisplayTime) {
                await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime));
            }
            UI.hideLoading();
            return result;
        } catch (error) {
            UI.hideLoading();
            throw error;
        }
    },
    showConfirm: (options) => {
        console.log('[UI.showConfirm] START', options);
        const { title, message, onConfirm, onCancel } = options;
        const existingDialogs = document.querySelectorAll('.custom-confirm-overlay');
        if (existingDialogs.length > 0) {
            console.log('[UI.showConfirm] Removing', existingDialogs.length, 'existing dialog(s)');
            existingDialogs.forEach(dialog => dialog.remove());
        }
        console.log('[UI.showConfirm] Creating overlay...');
        const overlay = document.createElement('div');
        overlay.className = 'custom-confirm-overlay';
        overlay.innerHTML = `
            <div class="custom-confirm-dialog">
                <div class="custom-confirm-header">
                    <h3>${title}</h3>
                </div>
                <div class="custom-confirm-body">
                    <p>${message}</p>
                </div>
                <div class="custom-confirm-footer">
                    <button class="btn btn-outline cancel-btn">Cancel</button>
                    <button class="btn btn-primary confirm-btn">Confirm</button>
                </div>
            </div>
        `;
        console.log('[UI.showConfirm] Appending to body...');
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            console.log('[UI.showConfirm] Adding show class');
            overlay.classList.add('show');
        }, 10);
        const closeDialog = () => {
            console.log('[UI.showConfirm] Closing dialog');
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        const cancelBtn = overlay.querySelector('.cancel-btn');
        console.log('[UI.showConfirm] Cancel button:', cancelBtn);
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                console.log('[UI.showConfirm] Cancel clicked');
                closeDialog();
                if (onCancel) onCancel();
            });
        }
        const confirmBtn = overlay.querySelector('.confirm-btn');
        console.log('[UI.showConfirm] Confirm button:', confirmBtn);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                console.log('[UI.showConfirm] Confirm clicked');
                closeDialog();
                if (onConfirm) onConfirm();
            });
        }
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                console.log('[UI.showConfirm] Backdrop clicked');
                closeDialog();
                if (onCancel) onCancel();
            }
        });
        console.log('[UI.showConfirm] Dialog ready');
    },
    showModal: (title, content, buttons = []) => {
        console.log('[UI.showModal] Creating modal...', { title, buttons });
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" data-close="true">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        ${buttons.map((btn, idx) => `
                            <button class="btn ${btn.class || 'btn-secondary'}" data-action="${idx}">
                                ${btn.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            setTimeout(() => modal.classList.add('show'), 10);
            console.log('[UI.showModal] Modal added to DOM');
            const closeBtn = modal.querySelector('[data-close]');
            if (closeBtn) {
                console.log('[UI.showModal] Close button found, adding listener');
                closeBtn.addEventListener('click', () => {
                    console.log('[UI.showModal] Close button clicked');
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                    }, 300);
                    console.log('[UI.showModal] Resolving with -1');
                    resolve(-1);
                });
            }
            const actionButtons = modal.querySelectorAll('[data-action]');
            console.log('[UI.showModal] Found', actionButtons.length, 'action buttons');
            actionButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const actionIdx = parseInt(e.target.dataset.action);
                    console.log('[UI.showModal] Action button clicked:', actionIdx);
                    const button = buttons[actionIdx];
                    if (button.action) {
                        button.action();
                    }
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                    }, 300);
                    console.log('[UI.showModal] Resolving with', actionIdx);
                    resolve(actionIdx);
                });
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    console.log('[UI.showModal] Backdrop clicked');
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                    }, 300);
                    console.log('[UI.showModal] Resolving with -1');
                    resolve(-1);
                }
            });
        });
    },
    confirm: (message, title = 'Confirm') => {
        console.log('[UI.confirm] Called with:', { message, title });
        const promise = UI.showModal(title, `<p>${message}</p>`, [
            { text: 'Cancel', class: 'btn-outline' },
            { text: 'Confirm', class: 'btn-primary' }
        ]).then(result => {
            console.log('[UI.confirm] Modal resolved with:', result);
            const confirmed = result === 1;
            console.log('[UI.confirm] Returning:', confirmed);
            return confirmed;
        });
        console.log('[UI.confirm] Promise created, returning...');
        return promise;
    },
    setButtonLoading: (button, loading = true, originalText = '') => {
        if (loading) {
            button.dataset.originalText = button.innerHTML;
            button.disabled = true;
            button.innerHTML = `<span class="btn-spinner"></span> Loading...`;
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || originalText;
            button.classList.remove('loading');
        }
    },
    showEmptyState: (container, message, icon = '📋', actionText = '', actionCallback = null) => {
        const emptyState = `
            <div class="empty-state">
                <div class="empty-icon">${icon}</div>
                <p class="empty-message">${message}</p>
                ${actionText ? `<button class="btn btn-primary empty-action">${actionText}</button>` : ''}
            </div>
        `;
        container.innerHTML = emptyState;
        if (actionCallback) {
            container.querySelector('.empty-action')?.addEventListener('click', actionCallback);
        }
    },
    showError: (container, message, retry = null) => {
        const errorHtml = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <p class="error-message">${message}</p>
                ${retry ? '<button class="btn btn-primary retry-btn">Try Again</button>' : ''}
            </div>
        `;
        container.innerHTML = errorHtml;
        if (retry) {
            container.querySelector('.retry-btn')?.addEventListener('click', retry);
        }
    },
    showInlineLoader: (container, text = 'Loading...') => {
        container.innerHTML = `
            <div class="inline-loader">
                <div class="spinner-small"></div>
                <span>${text}</span>
            </div>
        `;
    },
    validateForm: (form) => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    },
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    formatDate: (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },
    formatNumber: (num, decimals = 0) => {
        return Number(num).toFixed(decimals);
    },
    toggleMobileMenu: () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('show-mobile');
        }
    }
};
