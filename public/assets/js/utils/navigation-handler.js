import { DOMHelpers } from './dom-helpers.js';

export class NavigationHandler {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupCartMenu();
        this.setupSidebar();
        this.setupMobileSearch();
        this.setupCartSidebar();
        this.setupDropdowns();
        this.setupStickyHeader();
        this.setupActiveMenu();
        this.initialized = true;
    }

    setupCartMenu() {
        const cartBtn = document.querySelector('.header-cart-btn');
        const cartMenu = document.querySelector('.cart-menu');

        if (cartBtn && cartMenu) {
            cartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                DOMHelpers.toggleClass(cartMenu, 'active');
            });

            document.addEventListener('click', (e) => {
                const target = e.target;
                if (!target.closest('.cart-menu') && !target.closest('.header-cart-btn')) {
                    DOMHelpers.removeClass(cartMenu, 'active');
                }
            });
        }
    }

    setupSidebar() {
        const sidebarBtn = document.querySelector('.sidebar-btn2');
        const sidebar = document.querySelector('.header-sidebar');
        const closeBtn = document.querySelector('.close-btn');

        if (sidebarBtn && sidebar) {
            sidebarBtn.addEventListener('click', () => {
                DOMHelpers.addClass(sidebar, 'slide');
            });
        }

        if (closeBtn && sidebar) {
            closeBtn.addEventListener('click', () => {
                DOMHelpers.removeClass(sidebar, 'slide');
            });
        }
    }

    setupMobileSearch() {
        const searchBtn = document.querySelector('.search-btn');
        const searchBar = document.querySelector('.search-bar');
        const closeBtn = document.querySelector('.close-btn');

        if (searchBtn && searchBar) {
            searchBtn.addEventListener('click', () => {
                DOMHelpers.addClass(searchBar, 'slide');
            });
        }

        if (closeBtn && searchBar) {
            closeBtn.addEventListener('click', () => {
                DOMHelpers.removeClass(searchBar, 'slide');
            });
        }
    }

    setupCartSidebar() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartCloseBtn = document.querySelector('.cart-close-btn');

        if (cartBtn && cartSidebar) {
            cartBtn.addEventListener('click', () => {
                DOMHelpers.addClass(cartSidebar, 'slide');
            });
        }

        if (cartCloseBtn && cartSidebar) {
            cartCloseBtn.addEventListener('click', () => {
                DOMHelpers.removeClass(cartSidebar, 'slide');
            });
        }
    }

    setupDropdowns() {
        const dropdownIcons = document.querySelectorAll('.dropdown-icon');

        dropdownIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const parent = icon.parentElement;
                const submenu = icon.nextElementSibling;

                if (submenu) {
                    DOMHelpers.toggleClass(icon, 'active');
                    DOMHelpers.slideToggle(submenu);

                    // Close other dropdowns
                    const siblings = parent?.parentElement?.children;
                    if (siblings) {
                        Array.from(siblings).forEach(sibling => {
                            if (sibling !== parent) {
                                const siblingIcon = sibling.querySelector('.dropdown-icon');
                                const siblingSubmenu = sibling.querySelector('ul, .mega-menu');

                                if (siblingIcon) DOMHelpers.removeClass(siblingIcon, 'active');
                                if (siblingSubmenu) DOMHelpers.slideUp(siblingSubmenu);
                            }
                        });
                    }
                }
            });
        });
    }

    setupStickyHeader() {
        const header = document.querySelector('header.header-area');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    DOMHelpers.addClass(header, 'sticky');
                } else {
                    DOMHelpers.removeClass(header, 'sticky');
                }
            });
        }
    }

    setupActiveMenu() {
        const currentLocation = location.href;
        const menuItems = document.querySelectorAll('ul li a');

        menuItems.forEach(item => {
            if (item.href === currentLocation) {
                DOMHelpers.addClass(item, 'active');
            }
        });
    }
}