// SwiperHandler.js
export class SwiperHandler {
    constructor() {
        this.initialized = false;
        this.swipers = [];
    }

    init() {
        if (this.initialized) return;

        this.setupSwipers();
        this.initialized = true;
    }

    setupSwipers() {
        // Most Search Slider
        this.initMostSearchSlider();
        
        // Add other swiper configurations here as needed
        // this.initOtherSliders();
    }

    initMostSearchSlider() {
        const swiperElement = document.querySelector(".most-search-slider");
        
        if (swiperElement && typeof window.Swiper !== 'undefined') {
            const swiper = new window.Swiper(".most-search-slider", {
                slidesPerView: 1,
                speed: 1500,
                spaceBetween: 25,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".next-1",
                    prevEl: ".prev-1",
                },
                breakpoints: {
                    280: {
                        slidesPerView: 1,
                    },
                    386: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1400: {
                        slidesPerView: 4
                    },
                }
            });

            // Store swiper instance for later reference
            this.swipers.push({
                name: 'mostSearchSlider',
                instance: swiper
            });
        }
    }

    // Method to get specific swiper instance
    getSwiper(name) {
        const swiper = this.swipers.find(s => s.name === name);
        return swiper ? swiper.instance : null;
    }

    // Method to destroy all swipers
    destroyAll() {
        this.swipers.forEach(swiper => {
            if (swiper.instance && typeof swiper.instance.destroy === 'function') {
                swiper.instance.destroy();
            }
        });
        this.swipers = [];
        this.initialized = false;
    }
}