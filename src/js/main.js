// Source JavaScript file for bundling with Browserify
const utils = require('./utils');

// Main application module
const App = {
    init() {
        console.log('App initialized');
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded');
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init.bind(App));
} else {
    App.init();
}

module.exports = App;