<template>
    <div class="recent-launched-car mb-100">
        <div class="container">
            <div class="row mb-50 wow fadeInUp" data-wow-delay="200ms"
                style="visibility: visible; animation-delay: 200ms;">
                <div class="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
                    <div class="section-title-2">
                        <h2>Promotionnel</h2>
                        <p>Voici quelques-unes des voitures présentées dans différentes catégories</p>
                    </div>
                    <div class="slider-btn-group2">
                        <div class="slider-btn prev-5" @click="slidePrev" tabindex="0" role="button" aria-label="Previous slide">
                            <svg width="9" height="15" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                            </svg>
                        </div>
                        <div class="slider-btn next-5" @click="slideNext" tabindex="0" role="button" aria-label="Next slide">
                            <svg width="9" height="15" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row wow fadeInUp" data-wow-delay="300ms" style="visibility: visible; animation-delay: 300ms;">
                <div class="col-lg-12">
                    <!-- Loading State -->
                    <div v-if="loading" class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Chargement...</span>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>

                    <!-- Cars Display -->
                    <div v-else class="swiper recent-launch-car-slider" ref="swiperContainer">
                        <div class="swiper-wrapper">
                            <div v-for="car in promotionalCars" :key="car.car_id" class="swiper-slide">
                                <div class="product-card2">
                                    <div class="product-img">
                                        <div class="date">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#alartModal01">
                                                {{ formatDiscountEndDate(car.promotion.discount_end_date) }}
                                                <i class="bi bi-exclamation-circle"></i>
                                            </button>
                                        </div>
                                        <a href="#" class="fav">
                                            <svg width="14" height="13" viewBox="0 0 14 14"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z">
                                                </path>
                                            </svg>
                                        </a>
                                        <div class="discount-badge" v-if="car.promotion.discount_percentage">
                                            -{{ car.promotion.discount_percentage.toFixed(0) }}%
                                        </div>
                                        <a :href="`details/${car.car_id}`">
                                            <img :src="getPrimaryImage(car.images)" :alt="getCarName(car)" />
                                        </a>
                                    </div>
                                    <div class="product-content">
                                        <div class="details-btn">
                                            <a :href="`details/${car.car_id}`">
                                                <i class="bi bi-arrow-right-short"></i>
                                            </a>
                                        </div>
                                        <div class="price">
                                            <strong class="old-price">${{ formatPrice(car.promotion.original_price) }}</strong>
                                            <strong>${{ formatPrice(car.promotion.current_price) }}</strong>
                                        </div>
                                        <h6>
                                            <a :href="`details/${car.car_id}`">
                                                {{ getCarName(car) }}
                                            </a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Assurez-vous d'avoir importé Swiper dans votre projet
import Swiper from 'swiper'
import 'swiper/css'

export default {
    name: 'RecentLaunched',
    data() {
        return {
            promotionalCars: [],
            loading: true,
            error: null,
            swiper: null
        }
    },
    async mounted() {
        await this.fetchPromotionalCars();
        // Initialiser Swiper après que les données soient chargées
        this.$nextTick(() => {
            this.initSwiper();
        });
    },
    beforeUnmount() {
        // Nettoyer l'instance Swiper
        if (this.swiper) {
            this.swiper.destroy();
        }
    },
    methods: {
        async fetchPromotionalCars() {
            try {
                this.loading = true;
                this.error = null;

                const response = await fetch('http://127.0.0.1:8000/api/en/cars/promotional');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    this.promotionalCars = data.cars;
                } else {
                    throw new Error('Failed to fetch promotional cars');
                }
            } catch (err) {
                this.error = 'Failed to load promotional cars. Please try again later.';
                console.error('Error fetching promotional cars:', err);
            } finally {
                this.loading = false;
            }
        },

        initSwiper() {
            // Vérifier si Swiper est disponible
            if (typeof Swiper === 'undefined') {
                console.error('Swiper is not loaded. Please make sure to include Swiper library.');
                return;
            }

            const swiperContainer = this.$refs.swiperContainer;
            
            if (swiperContainer && this.promotionalCars.length > 0) {
                this.swiper = new Swiper(swiperContainer, {
                    slidesPerView: 1,
                    spaceBetween: 25,
                    loop: this.promotionalCars.length > 3,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        576: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 25,
                        }
                    }
                });
            }
        },

        slidePrev() {
            if (this.swiper) {
                this.swiper.slidePrev();
            }
        },

        slideNext() {
            if (this.swiper) {
                this.swiper.slideNext();
            }
        },

        getPrimaryImage(images) {
            const primaryImage = images.find(img => img.is_primary === 1);
            return primaryImage ? primaryImage.image_url : (images[0]?.image_url || 'assets/img/placeholder-car.jpg');
        },

        getCarName(car) {
            return `${car.brand.brand_name} ${car.model.model_name}-${car.year}`;
        },

        formatPrice(price) {
            return parseFloat(price).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        },

        formatDiscountEndDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-US', options);
        }
    }
}
</script>

<style scoped>
.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4444;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    z-index: 2;
}

.savings {
    margin-top: 5px;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.product-img {
    position: relative;
}

.old-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
}

.slider-btn-group2 {
    display: flex;
    gap: 10px;
}

.slider-btn {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}



.slider-btn svg {
    fill: currentColor;
}

.swiper-slide {
    height: auto;
}

.product-card2 {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    height: 100%;
}

.product-card2:hover {
    transform: translateY(-5px);
}
</style>