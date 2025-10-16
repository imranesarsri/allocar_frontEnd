import { DOMHelpers } from './dom-helpers.js';

export class PreloaderHandler {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupPreloader();
        this.initialized = true;
    }

    setupPreloader() {
        // Auto-hide preloader after page load
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.egns-preloader');
            const generalPreloader = document.querySelector('.preloader');

            if (preloader) {
                setTimeout(() => {
                    DOMHelpers.fadeOut(preloader, 1600);
                }, 100);
            }

            if (generalPreloader) {
                DOMHelpers.fadeOut(generalPreloader, 1000);
            }
        });

        // Manual close button
        const closeBtn = document.querySelector('.preloader-close-btn');
        const preloader = document.querySelector('.egns-preloader');

        if (closeBtn && preloader) {
            closeBtn.addEventListener('click', () => {
                DOMHelpers.addClass(preloader, 'close');
            });
        }
    }
}