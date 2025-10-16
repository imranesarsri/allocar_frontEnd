import { DOMHelpers } from './dom-helpers.js';

export class FormHandlers {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupPasswordToggle();
        this.setupQuantityControls();
        this.setupServiceSelect();
        this.setupContactHandlers();
        this.initialized = true;
    }

    setupPasswordToggle() {
        const toggleButtons = [
            { toggle: '#togglePassword', input: '#password' },
            { toggle: '#togglePassword2', input: '#password2' },
            { toggle: '#togglePassword3', input: '#password3' }
        ];

        toggleButtons.forEach(({ toggle, input }) => {
            const toggleBtn = document.querySelector(toggle);
            const passwordInput = document.querySelector(input);

            if (toggleBtn && passwordInput) {
                toggleBtn.addEventListener('click', () => {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    DOMHelpers.toggleClass(toggleBtn, 'bi-eye');
                });
            }
        });
    }

    setupQuantityControls() {
        const minusButtons = document.querySelectorAll('.quantity__minus');
        const plusButtons = document.querySelectorAll('.quantity__plus');

        minusButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = btn.parentElement?.querySelector('.quantity__input');
                if (input) {
                    let value = parseInt(input.value);
                    if (value > 1) {
                        value--;
                        input.value = value.toString().padStart(2, '0');
                    }
                }
            });
        });

        plusButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = btn.parentElement?.querySelector('.quantity__input');
                if (input) {
                    let value = parseInt(input.value);
                    value++;
                    input.value = value.toString().padStart(2, '0');
                }
            });
        });
    }

    setupServiceSelect() {
        const selectWraps = document.querySelectorAll('.select-wrap');

        selectWraps.forEach(wrap => {
            wrap.addEventListener('click', () => {
                // Remove selected class from siblings
                const parent = wrap.parentElement;
                if (parent) {
                    const siblings = parent.querySelectorAll('.select-wrap');
                    siblings.forEach(sibling => {
                        if (sibling !== wrap) {
                            DOMHelpers.removeClass(sibling, 'selected');
                        }
                    });
                }

                // Add selected class to clicked item
                DOMHelpers.addClass(wrap, 'selected');
            });
        });
    }

    setupContactHandlers() {
        const phoneNumber = document.getElementById('phoneNumber');
        const emailAddress = document.getElementById('emailAdress');
        const emailAddresss = document.getElementById('emailAdresss');

        if (phoneNumber) {
            phoneNumber.addEventListener('click', () => {
                const phone = phoneNumber.dataset.phone;
                const link = phoneNumber.querySelector('a');
                if (phone && link) {
                    link.outerHTML = `<a href="tel:${phone}"><i class='bx bx-phone-call'></i> ${phone}</a>`;
                }
            });
        }

        if (emailAddress) {
            emailAddress.addEventListener('click', () => {
                const email = emailAddress.dataset.email;
                const link = emailAddress.querySelector('a');
                if (email && link) {
                    link.outerHTML = `<a href="mailto:${email}"><i class='bx bx-at'></i>${email}</a>`;
                }
            });
        }

        if (emailAddresss) {
            emailAddresss.addEventListener('click', () => {
                const emails = emailAddresss.dataset.emails;
                const whatsapp = emailAddresss.dataset.whatsapp;
                const link = emailAddresss.querySelector('a');
                if (emails && whatsapp && link) {
                    link.outerHTML = `<a href="${emails}"><i class='bx bxl-whatsapp'></i>${whatsapp}</a>`;
                }
            });
        }
    }
}