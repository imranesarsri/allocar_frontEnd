import { DOMHelpers } from './dom-helpers.js';

export class PaymentHandler {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.setupPaymentMethods();
        this.initialized = true;
    }

    setupPaymentMethods() {
        const paymentItems = document.querySelectorAll('.choose-payment-mathord ul li');
        const stripePayment = document.getElementById('StripePayment');
        const offlinePayment = document.getElementById('OfflinePayment');

        paymentItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                paymentItems.forEach(li => DOMHelpers.removeClass(li, 'active'));

                // Hide all payment sections
                if (stripePayment) DOMHelpers.hide(stripePayment);
                if (offlinePayment) DOMHelpers.hide(offlinePayment);

                // Show appropriate payment section based on clicked item
                if (DOMHelpers.hasClass(item, 'stripe')) {
                    if (stripePayment) DOMHelpers.show(stripePayment);
                } else if (DOMHelpers.hasClass(item, 'offline')) {
                    if (offlinePayment) DOMHelpers.show(offlinePayment);
                }

                // Add active class to clicked item
                DOMHelpers.addClass(item, 'active');
            });
        });
    }
}