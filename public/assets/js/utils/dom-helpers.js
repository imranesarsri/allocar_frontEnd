// DOM Helper utilities
export class DOMHelpers {
    static addClass(element, className) {
        element.classList.add(className);
    }

    static removeClass(element, className) {
        element.classList.remove(className);
    }

    static toggleClass(element, className) {
        element.classList.toggle(className);
    }

    static hasClass(element, className) {
        return element.classList.contains(className);
    }

    static show(element) {
        element.style.display = 'block';
    }

    static hide(element) {
        element.style.display = 'none';
    }

    static fadeOut(element, duration = 1000) {
        return new Promise((resolve) => {
            element.style.transition = `opacity ${duration}ms`;
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    }

    static slideToggle(element) {
        if (element.style.display === 'none' || !element.style.display) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    static slideUp(element) {
        element.style.display = 'none';
    }

    static slideDown(element) {
        element.style.display = 'block';
    }
}