// Main JavaScript for Node.js Frontend
document.addEventListener('DOMContentLoaded', function() {
    console.log('Node.js Frontend loaded successfully!');
    
    // Initialize the application
    init();
});

function init() {
    // Set up event listeners
    setupEventListeners();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Add loading states for buttons
    setupLoadingStates();
    
    console.log('Application initialized');
}

function setupEventListeners() {
    // Fetch data button
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    if (fetchDataBtn) {
        fetchDataBtn.addEventListener('click', fetchServerData);
    }
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(e, this);
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupLoadingStates() {
    // Add loading state functionality for forms and buttons
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) {
                showLoading(submitBtn);
            }
        });
    });
}

async function fetchServerData() {
    const button = document.getElementById('fetchDataBtn');
    const output = document.getElementById('dataOutput');
    
    if (!output) return;
    
    try {
        // Show loading state
        showLoading(button);
        output.textContent = 'Fetching data from server...';
        output.classList.add('loading');
        
        // Fetch data from API endpoint
        const response = await fetch('/api/health');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display the response
        output.textContent = JSON.stringify(data, null, 2);
        output.classList.remove('loading');
        
        // Show success message
        showNotification('Data fetched successfully!', 'success');
        
    } catch (error) {
        console.error('Error fetching data:', error);
        output.textContent = `Error: ${error.message}`;
        output.classList.remove('loading');
        
        // Show error message
        showNotification('Failed to fetch data', 'error');
        
    } finally {
        // Hide loading state
        hideLoading(button);
    }
}

function showLoading(element) {
    if (!element) return;
    
    element.disabled = true;
    element.classList.add('loading');
    element.dataset.originalText = element.textContent;
    element.textContent = 'Loading...';
}

function hideLoading(element) {
    if (!element) return;
    
    element.disabled = false;
    element.classList.remove('loading');
    if (element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
        delete element.dataset.originalText;
    }
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not already present
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 24px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                max-width: 300px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            .notification-success {
                background-color: #27ae60;
            }
            
            .notification-error {
                background-color: #e74c3c;
            }
            
            .notification-info {
                background-color: #3498db;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchServerData,
        showNotification,
        debounce,
        throttle
    };
}