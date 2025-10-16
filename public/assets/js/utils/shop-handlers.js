import { DOMHelpers } from './dom-helpers.js';

export class ShopHandlers {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupShopImageGallery();
        this.setupSidebarMenu();
        this.initialized = true;
    }

    setupShopImageGallery() {
        const shopBigImg = document.querySelector('.shop-big-img');
        const firstImage = document.querySelector('.shop-big-img ul li:first-child');
        const allImages = document.querySelectorAll('.shop-big-img ul li');

        // Initialize first image as active
        if (firstImage) {
            DOMHelpers.addClass(firstImage, 'active');
        }

        if (shopBigImg) {
            // Mouse enter event
            shopBigImg.addEventListener('mouseenter', () => {
                const nonFirstImages = document.querySelectorAll('.shop-big-img ul li:not(:first-child)');
                nonFirstImages.forEach(img => DOMHelpers.removeClass(img, 'active'));
            });

            // Mouse leave event
            shopBigImg.addEventListener('mouseleave', () => {
                allImages.forEach(img => DOMHelpers.removeClass(img, 'active'));
                if (firstImage) {
                    DOMHelpers.addClass(firstImage, 'active');
                }
            });
        }

        // Hover events for individual images
        allImages.forEach(image => {
            image.addEventListener('mouseenter', () => {
                allImages.forEach(img => DOMHelpers.removeClass(img, 'active'));
                DOMHelpers.addClass(image, 'active');
            });
        });
    }

    setupSidebarMenu() {
        const sidebarButton = document.querySelector('.sidebar-button');
        const mainMenu = document.querySelector('.main-menu');
        const sidebarMenu = document.querySelector('.sidebar-menu');
        const menuCloseBtn = document.querySelector('.menu-close-btn');

        if (sidebarButton && (mainMenu || sidebarMenu)) {
            sidebarButton.addEventListener('click', () => {
                DOMHelpers.toggleClass(sidebarButton, 'active');
                if (mainMenu) DOMHelpers.toggleClass(mainMenu, 'show-menu');
                if (sidebarMenu) DOMHelpers.toggleClass(sidebarMenu, 'show-menu');
            });
        }

        if (menuCloseBtn && sidebarMenu) {
            menuCloseBtn.addEventListener('click', () => {
                DOMHelpers.removeClass(sidebarMenu, 'show-menu');
            });
        }
    }
}