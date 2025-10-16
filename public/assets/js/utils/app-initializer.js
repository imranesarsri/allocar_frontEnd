import { PaymentHandler } from './payment-handler.js';
import { NavigationHandler } from './navigation-handler.js';
import { FormHandlers } from './form-handlers.js';
import { CountdownTimer } from './countdown-timer.js';
import { ShopHandlers } from './shop-handlers.js';
import { PreloaderHandler } from './preloader.js';
import { SwiperHandler } from './swiper-handler.js';

export class AppInitializer {
  constructor() {
    this.paymentHandler = new PaymentHandler();
    this.navigationHandler = new NavigationHandler();
    this.formHandlers = new FormHandlers();
    this.countdownTimer = new CountdownTimer();
    this.shopHandlers = new ShopHandlers();
    this.preloaderHandler = new PreloaderHandler();
    this.swiperHandler = new SwiperHandler();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeAll());
    } else {
      this.initializeAll();
    }
  }

  initializeAll() {
    try {
      this.paymentHandler.init();
      this.navigationHandler.init();
      this.formHandlers.init();
      this.countdownTimer.init();
      this.shopHandlers.init();
      this.preloaderHandler.init();
    } catch (error) {
      console.error('Error initializing app components:', error);
    }
  }
}

// Create and export a singleton instance
export const appInitializer = new AppInitializer();