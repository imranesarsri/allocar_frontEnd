<template>
    <div class="inner-page-banner">
        <div class="banner-wrapper">
            <div class="container-fluid">

                <div class="banner-main-content-wrap" v-if="car && !loading">
                    <div class="row">
                        <div class="col-xl-6 col-lg-7 d-flex align-items-center">
                            <div class="banner-content style-2">
                                <div class="price-model-and-fav-area">
                                    <div class="price-and-model">
                                        <div class="price">

                                            <h3>${{ formatPrice(car.price) }}</h3>

                                        </div>
                                    </div>
                                    <ul class="share-and-fav">

                                        <li>
                                            <div class="share-icon" @click="toggleShare">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                    viewBox="0 0 12 12">
                                                    <path
                                                        d="M10.1248 0.750223C9.82642 0.750223 9.54028 0.868748 9.32931 1.07972C9.11833 1.2907 8.99981 1.57684 8.99981 1.8752C8.99981 2.17357 9.11833 2.45971 9.32931 2.67069C9.54028 2.88166 9.82642 3.00019 10.1248 3.00019C10.4232 3.00019 10.7093 2.88166 10.9203 2.67069C11.1312 2.45971 11.2498 2.17357 11.2498 1.8752C11.2498 1.57684 11.1312 1.2907 10.9203 1.07972C10.7093 0.868748 10.4232 0.750223 10.1248 0.750223ZM8.24982 1.8752C8.24976 1.43529 8.4044 1.00936 8.68666 0.671933C8.96893 0.33451 9.36085 0.107081 9.79386 0.0294379C10.2269 -0.0482056 10.6734 0.0288801 11.0553 0.247208C11.4372 0.465536 11.7302 0.811204 11.883 1.22373C12.0358 1.63626 12.0387 2.08939 11.8912 2.50382C11.7436 2.91826 11.455 3.26762 11.0759 3.49078C10.6968 3.71395 10.2513 3.7967 9.81734 3.72456C9.38337 3.65243 8.98859 3.42999 8.70206 3.09618L3.66364 5.43615C3.77947 5.80322 3.77947 6.19705 3.66364 6.56413L8.70206 8.90409C9.00494 8.55184 9.4278 8.32458 9.88869 8.26634C10.3496 8.2081 10.8157 8.32303 11.1967 8.58886C11.5776 8.85469 11.8464 9.25249 11.9508 9.70517C12.0552 10.1578 11.9878 10.6332 11.7617 11.039C11.5356 11.4448 11.1669 11.7523 10.7271 11.9018C10.2872 12.0512 9.80756 12.0321 9.38101 11.8481C8.95446 11.6641 8.61141 11.3282 8.41835 10.9057C8.22529 10.4832 8.19597 10.004 8.33607 9.56108L3.29765 7.22112C3.04823 7.51179 2.71577 7.7191 2.345 7.81517C1.97423 7.91124 1.58293 7.89145 1.22374 7.75847C0.864549 7.62548 0.554702 7.38569 0.33588 7.07133C0.117057 6.75698 -0.000244141 6.38315 -0.000244141 6.00014C-0.000244141 5.61712 0.117057 5.24329 0.33588 4.92894C0.554702 4.61459 0.864549 4.37479 1.22374 4.24181C1.58293 4.10882 1.97423 4.08903 2.345 4.1851C2.71577 4.28117 3.04823 4.48848 3.29765 4.77916L8.33607 2.4392C8.27871 2.2567 8.24963 2.0665 8.24982 1.8752ZM1.87492 4.87515C1.57656 4.87515 1.29042 4.99368 1.07944 5.20465C0.868467 5.41563 0.749942 5.70177 0.749942 6.00014C0.749942 6.2985 0.868467 6.58464 1.07944 6.79562C1.29042 7.00659 1.57656 7.12512 1.87492 7.12512C2.17329 7.12512 2.45943 7.00659 2.67041 6.79562C2.88138 6.58464 2.99991 6.2985 2.99991 6.00014C2.99991 5.70177 2.88138 5.41563 2.67041 5.20465C2.45943 4.99368 2.17329 4.87515 1.87492 4.87515ZM10.1248 9.00009C9.82642 9.00009 9.54028 9.11861 9.32931 9.32959C9.11833 9.54056 8.99981 9.8267 8.99981 10.1251C8.99981 10.4234 9.11833 10.7096 9.32931 10.9205C9.54028 11.1315 9.82642 11.25 10.1248 11.25C10.4232 11.25 10.7093 11.1315 10.9203 10.9205C11.1312 10.7096 11.2498 10.4234 11.2498 10.1251C11.2498 9.8267 11.1312 9.54056 10.9203 9.32959C10.7093 9.11861 10.4232 9.00009 10.1248 9.00009Z" />
                                                </svg>
                                            </div>
                                            <ul class="social-icons" v-show="showShare">
                                                <li><a :href="shareLinks.facebook" target="_blank"><i
                                                            class="bx bxl-facebook"></i></a></li>
                                                <li><a :href="shareLinks.twitter" target="_blank"><i
                                                            class="bx bxl-twitter"></i></a></li>
                                                <li><a :href="shareLinks.pinterest" target="_blank"><i
                                                            class="bx bxl-pinterest-alt"></i></a></li>
                                                <li><a :href="shareLinks.instagram" target="_blank"><i
                                                            class="bx bxl-instagram"></i></a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <h1>{{ car.brand?.brand_name }} {{ car.model?.model_name }}</h1>
                                <div class="car-details">
                                    <div class="location-and-notification">
                                        <ul>
                                            <li><i class="bi bi-geo-alt"></i> {{ car.city?.city_name }}, {{
                                                car.agency?.agency_name }}</li>
                                        </ul>
                                    </div>
                                </div>



                                <div class="find-btn">
                                    <a href="#" class="primary-btn3" @click.prevent="bookCar"
                                        :class="{ disabled: !car.is_available }">
                                        <svg width="24" height="15" viewBox="0 0 24 15"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.25985 0C3.15704 0 3.05844 0.0413135 2.98574 0.114852C2.91304 0.18839 2.87219 0.28813 2.87219 0.392129C2.87219 0.496128 2.91304 0.595867 2.98574 0.669405C3.05844 0.742944 3.15704 0.784257 3.25985 0.784257H4.8105C4.91332 0.784257 5.01192 0.742944 5.08462 0.669405C5.15732 0.595867 5.19816 0.496128 5.19816 0.392129C5.19816 0.28813 5.15732 0.18839 5.08462 0.114852C5.01192 0.0413135 4.91332 0 4.8105 0H3.25985ZM5.77966 0C5.67684 0 5.57824 0.0413135 5.50554 0.114852C5.43284 0.18839 5.39199 0.28813 5.39199 0.392129C5.39199 0.496128 5.43284 0.595867 5.50554 0.669405C5.57824 0.742944 5.67684 0.784257 5.77966 0.784257H10.3347C10.4375 0.784257 10.5361 0.742944 10.6088 0.669405C10.6815 0.595867 10.7223 0.496128 10.7223 0.392129C10.7223 0.28813 10.6815 0.18839 10.6088 0.114852C10.5361 0.0413135 10.4375 0 10.3347 0H5.77966Z">
                                            </path>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M4.22917 2.7464C4.12636 2.7464 4.02776 2.78771 3.95505 2.86125C3.88235 2.93479 3.84151 3.03453 3.84151 3.13853C3.84151 3.24253 3.88235 3.34227 3.95505 3.4158C4.02776 3.48934 4.12636 3.53066 4.22917 3.53066H13.1454C14.653 3.53066 15.5822 3.76829 16.3256 4.15002C16.9575 4.47431 17.4672 4.90546 18.1055 5.44542C18.2375 5.55698 18.3749 5.67305 18.5201 5.79402L18.6101 5.86892L18.726 5.88127C22.2653 6.25811 23.0622 7.46822 23.2246 8.08778V9.60865C23.2246 9.71265 23.1838 9.81239 23.1111 9.88593C23.0384 9.95947 22.9398 10.0008 22.8369 10.0008H21.8356C21.6511 8.88811 20.6943 8.04014 19.5418 8.04014C18.3893 8.04014 17.4325 8.88811 17.248 10.0008H10.2058C10.0212 8.88811 9.06448 8.04014 7.91196 8.04014C6.75944 8.04014 5.80269 8.88811 5.61816 10.0008H3.7446C3.64178 10.0008 3.54318 10.0421 3.47048 10.1156C3.39778 10.1892 3.35693 10.2889 3.35693 10.3929C3.35693 10.4969 3.39778 10.5966 3.47048 10.6702C3.54318 10.7437 3.64178 10.785 3.7446 10.785H5.61816C5.80269 11.8977 6.75944 12.7457 7.91196 12.7457C9.06448 12.7457 10.0212 11.8977 10.2058 10.785H17.248C17.4325 11.8977 18.3893 12.7457 19.5418 12.7457C20.6943 12.7457 21.6511 11.8977 21.8356 10.785H22.8369C23.1454 10.785 23.4412 10.6611 23.6593 10.4405C23.8774 10.2199 23.9999 9.92065 23.9999 9.60865V7.99543L23.99 7.95191C23.7431 6.86983 22.5791 5.52855 18.9239 5.11407C18.8217 5.02859 18.7215 4.9435 18.6227 4.85978C17.9828 4.31766 17.3942 3.81887 16.6766 3.45047C15.7966 2.99893 14.7391 2.7464 13.1454 2.7464H4.22917ZM17.9912 10.3929C17.9912 9.97691 18.1545 9.57795 18.4453 9.2838C18.7361 8.98965 19.1306 8.82439 19.5418 8.82439C19.9531 8.82439 20.3475 8.98965 20.6383 9.2838C20.9291 9.57795 21.0925 9.97691 21.0925 10.3929C21.0925 10.8089 20.9291 11.2079 20.6383 11.502C20.3475 11.7962 19.9531 11.9614 19.5418 11.9614C19.1306 11.9614 18.7361 11.7962 18.4453 11.502C18.1545 11.2079 17.9912 10.8089 17.9912 10.3929ZM7.91196 8.82439C7.5007 8.82439 7.10629 8.98965 6.81549 9.2838C6.52468 9.57795 6.36131 9.97691 6.36131 10.3929C6.36131 10.8089 6.52468 11.2079 6.81549 11.502C7.10629 11.7962 7.5007 11.9614 7.91196 11.9614C8.32322 11.9614 8.71763 11.7962 9.00843 11.502C9.29923 11.2079 9.46261 10.8089 9.46261 10.3929C9.46261 9.97691 9.29923 9.57795 9.00843 9.2838C8.71763 8.98965 8.32322 8.82439 7.91196 8.82439Z">
                                            </path>
                                            <path
                                                d="M0 5.09873C0 4.99473 0.0408428 4.89499 0.113543 4.82146C0.186244 4.74792 0.284847 4.7066 0.387662 4.7066H4.74886C4.85167 4.7066 4.95027 4.74792 5.02297 4.82146C5.09567 4.89499 5.13652 4.99473 5.13652 5.09873C5.13652 5.20273 5.09567 5.30247 5.02297 5.37601C4.95027 5.44955 4.85167 5.49086 4.74886 5.49086H0.387662C0.284847 5.49086 0.186244 5.44955 0.113543 5.37601C0.0408428 5.30247 0 5.20273 0 5.09873ZM15.6836 5.60575C15.7563 5.67929 15.7971 5.77901 15.7971 5.88299C15.7971 5.98697 15.7563 6.08669 15.6836 6.16022L15.6532 6.19101C15.2897 6.55865 14.7968 6.76522 14.2828 6.76528H8.14089C8.03808 6.76528 7.93948 6.72397 7.86678 6.65043C7.79408 6.57689 7.75323 6.47715 7.75323 6.37315C7.75323 6.26915 7.79408 6.16941 7.86678 6.09587C7.93948 6.02234 8.03808 5.98102 8.14089 5.98102H14.2826C14.4354 5.98104 14.5866 5.95063 14.7277 5.89152C14.8688 5.83241 14.997 5.74577 15.105 5.63654L15.1355 5.60575C15.2082 5.53224 15.3068 5.49094 15.4096 5.49094C15.5123 5.49094 15.6109 5.53224 15.6836 5.60575ZM8.52856 14.6079C8.52856 14.5039 8.5694 14.4041 8.6421 14.3306C8.7148 14.257 8.8134 14.2157 8.91622 14.2157H10.5638C10.6666 14.2157 10.7652 14.257 10.8379 14.3306C10.9106 14.4041 10.9514 14.5039 10.9514 14.6079C10.9514 14.7118 10.9106 14.8116 10.8379 14.8851C10.7652 14.9587 10.6666 15 10.5638 15H8.91622C8.8134 15 8.7148 14.9587 8.6421 14.8851C8.5694 14.8116 8.52856 14.7118 8.52856 14.6079ZM11.2422 14.6079C11.2422 14.5039 11.283 14.4041 11.3557 14.3306C11.4284 14.257 11.527 14.2157 11.6298 14.2157H15.991C16.0939 14.2157 16.1925 14.257 16.2652 14.3306C16.3379 14.4041 16.3787 14.5039 16.3787 14.6079C16.3787 14.7118 16.3379 14.8116 16.2652 14.8851C16.1925 14.9587 16.0939 15 15.991 15H11.6298C11.527 15 11.4284 14.9587 11.3557 14.8851C11.283 14.8116 11.2422 14.7118 11.2422 14.6079Z">
                                            </path>
                                        </svg>
                                        {{ car.is_available ? 'Réserver maintenant' : 'Non disponible' }}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-5 d-lg-flex d-none align-items-center justify-content-end">
                            <div class="banner-img hero_image_car_details">
                                <img :src="primaryImage || '/assets/img/inner-page/car-dt-banner-img.png'"
                                    :alt="car.brand?.brand_name + ' ' + car.model?.model_name"
                                    @error="handleImageError">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Loading state -->
                <div v-else-if="loading" class="loading-state">
                    <div class="spinner"></div>
                    <p>Chargement des informations...</p>
                </div>
                <!-- Error state -->
                <div v-else-if="error" class="error-state">
                    <p>{{ error }}</p>
                    <button @click="fetchCarData" class="retry-btn">Réessayer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CardCar',

    props: {
        carId: {
            type: [String, Number],
            required: false
        }
    },

    data() {
        return {
            car: null,
            loading: false,
            error: null,
            isFavorite: false,
            showShare: false,
            primaryImage: null
        }
    },

    computed: {
        // Get car ID from props or route params
        currentCarId() {
            return this.carId || this.$route.params.id
        },

        shareLinks() {
            const url = encodeURIComponent(window.location.href)
            const text = encodeURIComponent(`Découvrez cette ${this.car?.brand?.brand_name} ${this.car?.model?.model_name}`)

            return {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
                instagram: '#'
            }
        },

        averageRating() {
            if (!this.car?.reviews || this.car.reviews.length === 0) return 0
            const total = this.car.reviews.reduce((sum, review) => sum + review.rating, 0)
            return total / this.car.reviews.length
        }
    },

    async mounted() {
        await this.fetchCarData()
    },

    methods: {
        async fetchCarData() {
            if (!this.currentCarId) {
                this.error = 'ID de voiture manquant'
                return
            }

            this.loading = true
            this.error = null

            try {
                // Utiliser l'endpoint de ton repository
                const response = await axios.get(`http://127.0.0.1:8000/api/fr/cars/${this.currentCarId}`)

                // Ton repository retourne la structure { success: true, data: car }
                if (response.data.success) {
                    this.car = response.data.data
                    this.setPrimaryImage()
                } else {
                    this.error = response.data.message || 'Erreur lors du chargement'
                }

            } catch (error) {
                console.error('Erreur lors du chargement:', error)

                if (error.response?.status === 404) {
                    this.error = 'Cette voiture n\'existe pas.'
                } else if (error.response?.status >= 500) {
                    this.error = 'Erreur serveur. Veuillez réessayer plus tard.'
                } else {
                    this.error = 'Impossible de charger les informations de la voiture.'
                }
            } finally {
                this.loading = false
            }
        },

        setPrimaryImage() {
            if (this.car?.images && this.car.images.length > 0) {
                // Chercher l'image principale
                const primaryImg = this.car.images.find(img => img.is_primary)
                this.primaryImage = primaryImg ? primaryImg.image_url : this.car.images[0].image_url
            }
        },

        handleImageError(event) {
            event.target.src = '/assets/img/inner-page/car-dt-banner-img.png'
        },

        formatPrice(price) {
            if (!price) return '0.00'
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price)
        },

        formatMileage(mileage) {
            if (!mileage) return '0'
            return new Intl.NumberFormat('fr-FR').format(mileage)
        },


        toggleShare() {
            this.showShare = !this.showShare
        },



                bookCar() {
            if (this.car && this.car.is_available) {
                const bookingUrl = `/booking?carId=${this.car.car_id}&price=${this.car.price}`;
                window.location.href = bookingUrl;
            }
        },

        async copyLink() {
            try {
                await navigator.clipboard.writeText(window.location.href)
                this.$toast?.success('Lien copié dans le presse-papiers')
            } catch (error) {
                // Fallback pour les anciens navigateurs
                const textArea = document.createElement('textarea')
                textArea.value = window.location.href
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
                this.$toast?.success('Lien copié')
            }
        }
    },

    watch: {
        currentCarId: {
            immediate: true,
            handler(newId) {
                if (newId) {
                    this.fetchCarData()
                }
            }
        }
    }
}
</script>

<style scoped>
.car-banner-modern {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f9ff 100%);
    min-height: 60vh;
    padding: 2rem 0;
}

.breadcrumb-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 0;
}

.breadcrumb-list li {
    color: #6b7280;
    position: relative;
}

.breadcrumb-list li:not(:last-child)::after {
    content: '—';
    margin-left: 1rem;
    color: #9ca3af;
}

.breadcrumb-list a {
    color: #10b981;
    text-decoration: none;
}

.car-info-section {
    padding-right: 2rem;
}

.price-section {
    margin-bottom: 2rem;
}

.price-main {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1rem 0;
}

.original-price {
    text-decoration: line-through;
    color: #9ca3af;
    font-size: 2rem;
    margin-right: 1rem;
}

.current-price,
.price-main {
    color: #1f2937;
}

.price-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.change-model-btn {
    background: transparent;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.change-model-btn:hover {
    border-color: #10b981;
    color: #10b981;
}

.action-icons {
    display: flex;
    gap: 0.5rem;
    position: relative;
}

.icon-btn {
    background: transparent;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s;
}

.icon-btn:hover,
.icon-btn.active {
    color: #dc2626;
}

.share-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 10;
}

.share-dropdown a {
    padding: 0.5rem;
    color: #6b7280;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
}

.share-dropdown a:hover {
    background-color: #f3f4f6;
}

.promotion-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.discount-badge {
    background: #dc2626;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.days-remaining {
    background: #f59e0b;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
}

.car-title {
    font-size: 3.5rem;
    font-weight: 800;
    color: #1f2937;
    margin: 0 0 1rem 0;
    line-height: 1.1;
}

.location-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #6b7280;
    margin-bottom: 2rem;
}

.notify-btn {
    background: transparent;
    border: none;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-left: auto;
}

.find-car-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 2rem;
}

.find-car-btn:hover:not(.disabled) {
    background: #059669;
    transform: translateY(-1px);
}

.find-car-btn.disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.car-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.detail-item {
    background: rgba(255, 255, 255, 0.7);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
}

.detail-item .label {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
}

.detail-item .value {
    display: block;
    font-weight: 600;
    color: #1f2937;
}

.car-image-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
}

.image-placeholder {
    width: 100%;
    max-width: 400px;
    height: 300px;
    background: #f3f4f6;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.car-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.placeholder-text {
    font-size: 4rem;
    font-weight: 800;
    color: #1f2937;
    font-family: 'Courier New', monospace;
}

.loading-state,
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    text-align: center;
}

.spinner {
    width: 3rem;
    height: 3rem;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #10b981;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.error-content i {
    font-size: 3rem;
    color: #dc2626;
}

.retry-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.retry-btn:hover {
    background: #059669;
}

/* Responsive */
@media (max-width: 768px) {
    .car-title {
        font-size: 2.5rem;
    }

    .price-main {
        font-size: 2rem;
    }

    .car-info-section {
        padding-right: 0;
        margin-bottom: 2rem;
    }

    .location-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .notify-btn {
        margin-left: 0;
    }

    .car-details-grid {
        grid-template-columns: 1fr;
    }
}
</style>