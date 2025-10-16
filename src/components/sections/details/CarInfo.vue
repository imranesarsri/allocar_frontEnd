<template>
    <div class="car-details-area pt-100 mb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0"
                        class="scrollspy-example" tabindex="0">
                        <div class="single-item mb-50" id="car-img">
                            <div class="car-img-area">
                                <div class="tab-content mb-30" id="myTab5Content">
                                    <div class="tab-pane fade show active" id="exterior" role="tabpanel"
                                        aria-labelledby="exterior-tab">
                                        <div v-if="loading" class="loading">
                                            <p>Chargement...</p>
                                        </div>
                                        <div v-else-if="error" class="error">
                                            <p>{{ error }}</p>
                                        </div>
                                        <div v-else-if="car" class="product-img">
                                            <div class="number-of-img">
                                                <img src="/assets/img/icon/gallery-icon-1.svg" alt="">
                                                {{ car.images ? car.images.length : 0 }}
                                            </div>
                                            <a href="#" class="fav" @click.prevent="toggleFavorite"
                                                :class="{ active: isFavorite }">
                                                <svg width="14" height="13" viewBox="0 0 14 14"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z">
                                                    </path>
                                                </svg>
                                            </a>

                                            <!-- Slider controls -->
                                            <div class="slider-btn-group" v-if="car.images && car.images.length > 1">
                                                <div class="product-stand-next swiper-arrow" @click="prevSlide">
                                                    <svg width="8" height="13" viewBox="0 0 8 13"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                                                    </svg>
                                                </div>
                                                <div class="product-stand-prev swiper-arrow" @click="nextSlide">
                                                    <svg width="8" height="13" viewBox="0 0 8 13"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <!-- Image slider -->
                                            <div class="swiper product-img-slider"
                                                v-if="car.images && car.images.length > 0">
                                                <div class="swiper-wrapper"
                                                    :style="{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.3s ease' }">
                                                    <div class="swiper-slide feature_image_car_detailes"
                                                        v-for="(image, index) in car.images" :key="`slide-${index}`"
                                                        :style="{ minWidth: '100%', flex: '0 0 100%' }">
                                                        <img :src="image.image_url" :alt="`Image ${index + 1}`"
                                                            @error="handleImageError"
                                                            style="width: 100%; height: 100%; object-fit: cover;">
                                                    </div>
                                                </div>

                                                <!-- Indicateurs de slide -->
                                                <div class="slide-indicators" v-if="car.images.length > 1"
                                                    style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
                                                    <span v-for="(image, index) in car.images"
                                                        :key="`indicator-${index}`" @click="goToSlide(index)"
                                                        :class="{ active: currentSlide === index }"
                                                        style="width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: background 0.3s;"
                                                        :style="{ background: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.5)' }"></span>
                                                </div>
                                            </div>

                                            <div v-else class="no-images">
                                                <p>Aucune image disponible</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div class="single-item mb-50" id="car-info">


                            <div class="car-info">
                                <div class="title mb-20">
                                    <h5>Information véhicule</h5>
                                </div>
                                <ul v-if="carData && !loading">
                                    <li>
                                        <div class="icon">
                                            <img src="/assets/img/inner-page/icon/mileage.svg" alt="">
                                        </div>
                                        <div class="content">
                                            <h6>{{ formatMileage(carData.mileage) }}</h6>
                                            <span>Mileage</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <img src="/assets/img/inner-page/icon/engine.svg" alt="">
                                        </div>
                                        <div class="content">
                                            <h6>{{ carData.transmission }}</h6>
                                            <span>Transmission</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <img src="/assets/img/inner-page/icon/fuel.svg" alt="">
                                        </div>
                                        <div class="content">
                                            <h6>{{ carData.fuel_type?.fuel_type_name || 'N/A' }}</h6>
                                            <span>Fuel Type</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <img src="/assets/img/inner-page/icon/condition.svg" alt="">
                                        </div>
                                        <div class="content">
                                            <h6>{{ carData.year }}</h6>
                                            <span>Year</span>
                                        </div>
                                    </li>
                                </ul>

                                <!-- Loading state -->
                                <div v-else class="loading-state">
                                    <p>Chargement des informations sur la voiture..</p>
                                </div>
                            </div>
                        </div>
                        <div class="single-item mb-50" id="overview">
                            <div class="overview">
                                <div class="title mb-25">
                                    <h5>Aperçus</h5>
                                </div>
                                <div class="overview-content">
                                    <ul>
                                        <li><span>Brand</span> {{ carData?.brand?.brand_name || 'N/A' }}</li>
                                        <li><span>Model</span> {{ carData?.model?.model_name || 'N/A' }}</li>
                                        <li><span>Year</span> {{ carData?.year || 'N/A' }}</li>
                                        <li><span>Mileage</span> {{ formatMileage(carData?.mileage) }} km</li>
                                    </ul>
                                    <ul>
                                        <li><span>Color's</span> {{ carData?.color.color_name || 'N/A' }}</li>
                                        <li><span>Fuel Type</span> {{ carData?.fuel_type?.fuel_type_name || 'N/A' }}</li>
                                        <li><span>Category</span> {{ carData?.category?.category_name || 'N/A' }}</li>
                                        <li><span>Transmission</span> {{ carData?.transmission || 'N/A' }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="single-item mb-50" id="performance">
                            <div class="engine-performance">
                                <div class="title mb-25">
                                    <h5>Agence</h5>
                                </div>
                                <div class="overview-content">
                                    <ul>
                                        <li><span>Agence</span> {{ carData?.agency?.agency_name || 'N/A' }}</li>
                                        <li><span>Ville</span> {{ carData?.agency?.city || 'N/A' }}</li>
                                    </ul>
                                    <ul>
                                        <li><span>Available</span> {{ carData?.is_available ? 'Disponible' : 'Non disponible' }}</li>
                                        <li><span>Feature</span> {{ carData?.features || 'Aucune fonctionnalité spécifiée' }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="single-item mb-50" id="performance">
                            <div class="engine-performance">
                                <div class="title mb-25">
                                    <h5>description</h5>
                                </div>
                                <div class="overview-content">
                                    <p>
                                        {{ carData?.description || 'N/A' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="single-item mb-50" id="car-info">
                            <div class="car-reviews">
                                <div class="title mb-20">
                                    <h5>Avis des clients</h5>
                                </div>

                                <!-- Contenu des reviews quand les données sont chargées -->
                                <div v-if="carData && carData.reviews && carData.reviews.length > 0 && !loading"
                                    class="reviews-list">
                                    <div v-for="review in carData.reviews" :key="review.car_review_id"
                                        class="review-item">
                                        <div class="rating">
                                            <span v-for="star in 5" :key="star" class="star"
                                                :class="{ 'filled': star <= review.rating }">★</span>
                                            <span class="rating-number">({{ review.rating }}/5)</span>
                                        </div>
                                        <p class="review-text">{{ review.review_text }}</p>
                                        <small class="review-date">{{ formatDate(review.created_at) }}</small>
                                    </div>
                                </div>

                                <!-- Message quand il n'y a pas de reviews -->
                                <div v-else-if="carData && (!carData.reviews || carData.reviews.length === 0) && !loading"
                                    class="no-reviews">
                                    <p>Aucun avis client disponible pour ce véhicule.</p>
                                </div>

                                <!-- État de chargement -->
                                <div v-else-if="loading" class="loading-state">
                                    <p>Chargement des avis clients...</p>
                                </div>

                                <!-- État d'erreur -->
                                <div v-else-if="error" class="error-state">
                                    <p>Impossible de charger les avis clients.</p>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <div class="col-lg-4">
                    <div class="car-details-sidebar">
                        <div class="contact-info mb-50">
                            <div class="single-contact" id="phoneNumber" data-phone="+990737621432">
                                <a><i class='bx bx-phone-call'></i>Numéro de telephone</a>
                            </div>
                            <div class="single-contact" id="emailAdress" data-email="info@gmail.com">
                                <a><i class='bx bx-at'></i>Email </a>
                            </div>
                            <div class="single-contact" id="emailAdresss" data-whatsapp="+990737621432"
                                data-emails="https://api.whatsapp.com/send?phone=990737621432&text=Hello this is the starting message">
                                <a><i class='bx bxl-whatsapp'></i>Whatsapp</a>
                            </div>
                        </div>

                        <div class="recent-car-area">
                            <div class="title mb-30">
                                <h5>Voiture d'occasion récente</h5>
                            </div>
                            <div class="tab-content mb-30" id="myTab6Content">
                                <div class="tab-pane fade show active" id="related-cars" role="tabpanel"
                                    aria-labelledby="related-cars-tab">

                                    <!-- Contenu des voitures récente quand les données sont chargées -->
                                    <div
                                        v-if="relatedCars && relatedCars.length > 0 && !loadingRelated && !errorRelated">
                                        <div v-for="car in relatedCars" :key="car.car_id"
                                            class="product-st-card1 two mb-30">

                                            <div class="product-img">
                                                <div class="product-price">
                                                    <span>${{ formatPrice(car.price) }}</span>
                                                </div>

                                                <a href="#" @click.prevent="toggleFavoriteRelated(car.car_id)"
                                                    class="fav">
                                                    <svg width="14" height="13" viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z">
                                                        </path>
                                                    </svg>
                                                </a>

                                                <div class="car-img">
                                                    <img class="img-fluid" :src="getCarImage(car.images)"
                                                        :alt="car.brand?.brand_name + ' ' + car.model?.model_name"
                                                        @error="handleImageError">
                                                </div>
                                            </div>

                                            <div class="product-content">
                                                <h6>
                                                    <router-link :to="`/details/${car.car_id}`">
                                                        {{ car.brand?.brand_name }}-{{ car.year }}
                                                    </router-link>
                                                </h6>

                                                <ul class="features">
                                                    <li>
                                                        <img src="/assets/img/home4/icon/menual.svg" alt="">
                                                        {{ car.transmission || 'N/A' }}
                                                    </li>
                                                    <li>
                                                        <img src="/assets/img/home4/icon/fuel.svg" alt="">
                                                        {{ car.fuel_type?.fuel_type_name || 'N/A' }}
                                                    </li>
                                                    <li>
                                                        <img src="/assets/img/home4/icon/electric.svg" alt="">
                                                        {{ car.category?.category_name || 'N/A' }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- Bouton Voir Plus -->
                                        <div class="view-all-btn" v-if="showViewAllButton">
                                            <a class="primary-btn3 two" href="/car-listing"
                                                @click.prevent="goToCarListing">
                                                <svg width="35" height="21" viewBox="0 0 35 21"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                                        stroke-linecap="round"></path>
                                                    <path
                                                        d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z">
                                                    </path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z">
                                                    </path>
                                                    <path
                                                        d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z">
                                                    </path>
                                                </svg>
                                                Voir tous les voitures
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Message quand il n'y a pas de voitures récente -->
                                    <div v-else-if="!loadingRelated && !errorRelated && (!relatedCars || relatedCars.length === 0)"
                                        class="no-related-cars">
                                        <div class="text-center py-5">
                                            <p>Aucune voiture similaire n'est disponible pour le moment.</p>
                                        </div>
                                    </div>

                                    <!-- État de chargement -->
                                    <div v-else-if="loadingRelated" class="loading-state">
                                        <div class="text-center py-5">
                                            <p>Chargement de voitures similaires...</p>
                                        </div>
                                    </div>

                                    <!-- État d'erreur -->
                                    <div v-else-if="errorRelated" class="error-state">
                                        <div class="text-center py-5">
                                            <p>Impossible de charger des voitures similaires.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="auction-car" role="tabpanel"
                                    aria-labelledby="auction-car-tab">
                                    <div class="view-all-btn">
                                        <a class="primary-btn3 two" href="car-listing-left-sidebar.html">
                                            <svg width="35" height="21" viewBox="0 0 35 21"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                                    stroke-linecap="round"></path>
                                                <path
                                                    d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z">
                                                </path>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z">
                                                </path>
                                                <path
                                                    d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42662C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z">
                                                </path>
                                            </svg>
                                            Voir tous les voitures
                                        </a>
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
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
    name: 'CarInfo',
    props: {
        carId: {
            type: [String, Number],
            required: false
        }
    },
    setup(props) {
        const route = useRoute()
        const car = ref(null)
        const carData = ref(null)
        const loading = ref(false)
        const error = ref(null)
        const isFavorite = ref(false)
        const showShare = ref(false)
        const primaryImage = ref(null)
        const currentSlide = ref(0)

        // === NOUVELLES VARIABLES POUR VOITURES récente ===
        const relatedCars = ref([])
        const loadingRelated = ref(false)
        const errorRelated = ref(null)
        const showViewAllButton = ref(true)

        // Computed - Get car ID from props or route params
        const currentCarId = computed(() => {
            return props.carId || route.params.id
        })

        // Computed - Reviews (optimisé pour utiliser carData)
        const reviews = computed(() => {
            // console.log('Computing reviews, carData.value:', !!carData.value)
            const result = carData.value?.reviews || []
            // console.log('Reviews result:', result.length)
            return result
        })

        // Computed - Share links
        const shareLinks = computed(() => {
            const url = encodeURIComponent(window.location.href)
            const text = encodeURIComponent(`Découvrez cette ${carData.value?.brand?.brand_name} ${carData.value?.model?.model_name}`)

            return {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
                instagram: '#'
            }
        })

        // Computed - Average rating (optimisé pour utiliser carData)
        const averageRating = computed(() => {
            if (!carData.value?.reviews || carData.value.reviews.length === 0) return 0
            const total = carData.value.reviews.reduce((sum, review) => sum + review.rating, 0)
            return total / carData.value.reviews.length
        })

        // === NOUVELLES MÉTHODES POUR VOITURES récente ===
        const fetchRelatedCars = async () => {
            if (!currentCarId.value || !carData.value) return

            loadingRelated.value = true
            errorRelated.value = null

            try {
                // Correction 1: Utiliser l'endpoint correct avec les bons paramètres
                const params = {
                    // Filtrer par marque similaire
                    brand_id: carData.value.brand?.car_brand_id,
                    // Filtrer par catégorie similaire  
                    category_id: carData.value.category?.car_category_id,
                    // Exclure la voiture actuelle
                    exclude_id: currentCarId.value,
                    // Limiter le nombre de résultats
                    limit: 4,
                    // S'assurer de récupérer uniquement les voitures disponibles
                    is_available: 1
                }

                // console.log('Fetching related cars with params:', params)

                const response = await axios.get('http://127.0.0.1:8000/api/fr/cars/latest', { params })

                // console.log('Related cars response:', response.data)

                if (response.data.success) {
                    // Correction 2: Accéder correctement aux données selon la structure de l'API
                    const cars = response.data.data?.cars || response.data.cars || response.data.data || []

                    // Correction 3: Filtrer manuellement si l'API ne supporte pas exclude_id
                    relatedCars.value = cars.filter(car =>
                        car.car_id != currentCarId.value &&
                        car.is_available === 1
                    ).slice(0, 4) // Limiter à 4 voitures max

                    // console.log('Related cars found:', relatedCars.value.length)
                } else {
                    console.error('API returned error:', response.data.message)
                    errorRelated.value = response.data.message || 'Erreur lors du chargement des voitures récente'
                    relatedCars.value = []
                }

            } catch (err) {
                console.error('Erreur lors du chargement des voitures similaires:', err)

                // Correction 4: En cas d'erreur, essayer de récupérer toutes les voitures et filtrer côté client
                try {
                    // console.log('Trying fallback method...')
                    const fallbackResponse = await axios.get('http://127.0.0.1:8000/api/fr/cars/latest')

                    if (fallbackResponse.data.success) {
                        const allCars = fallbackResponse.data.data?.cars || fallbackResponse.data.cars || fallbackResponse.data.data || []

                        // Filtrer les voitures récente côté client
                        relatedCars.value = allCars.filter(car => {
                            return car.car_id != currentCarId.value &&
                                car.is_available === 1 &&
                                (car.brand?.car_brand_id === carData.value.brand?.car_brand_id ||
                                    car.category?.car_category_id === carData.value.category?.car_category_id)
                        }).slice(0, 4)

                        // console.log('Fallback method found cars:', relatedCars.value.length)
                    } else {
                        relatedCars.value = []
                        errorRelated.value = 'Impossible de charger les voitures récente.'
                    }
                } catch (fallbackErr) {
                    console.error('Fallback method also failed:', fallbackErr)
                    relatedCars.value = []
                    errorRelated.value = 'Impossible de charger les voitures récente.'
                }
            } finally {
                loadingRelated.value = false
            }
        }

        const getCarImage = (images) => {
            // Image par défaut
            const defaultImage = '/assets/img/inner-page/car-dt-banner-img.png'

            if (!images || !Array.isArray(images) || images.length === 0) {
                return defaultImage
            }

            // Chercher l'image principale
            const primaryImage = images.find(img => img.is_primary === 1 || img.is_primary === true)
            if (primaryImage && primaryImage.image_url) {
                return primaryImage.image_url
            }

            // Prendre la première image disponible
            const firstImage = images.find(img => img.image_url)
            if (firstImage) {
                return firstImage.image_url
            }

            return defaultImage
        }

        const toggleFavoriteRelated = (carId) => {
            console.log('Toggle favorite for related car:', carId)
            // Implémentez votre logique de favoris ici
        }

        const goToCarListing = () => {
            // Utiliser Vue Router si disponible, sinon window.location
            if (route && route.router) {
                route.router.push('/')
            } else {
                window.location.href = '/'
            }
        }

        // Fonction pour récupérer les données de la voiture (MODIFIÉE)
        const fetchCarData = async () => {
            if (!currentCarId.value) {
                error.value = 'ID de voiture manquant'
                return
            }

            loading.value = true
            error.value = null

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/fr/cars/${currentCarId.value}`)

                if (response.data.success) {
                    car.value = response.data.data
                    carData.value = response.data.data
                    setPrimaryImage()

                    // === AJOUT : Récupérer les voitures récente ===
                    await fetchRelatedCars()
                } else {
                    error.value = response.data.message || 'Erreur lors du chargement'
                }

            } catch (err) {
                console.error('Erreur lors du chargement:', err)

                if (err.response?.status === 404) {
                    error.value = 'Cette voiture n\'existe pas.'
                } else if (err.response?.status >= 500) {
                    error.value = 'Erreur serveur. Veuillez réessayer plus tard.'
                } else {
                    error.value = 'Impossible de charger les informations de la voiture.'
                }
            } finally {
                loading.value = false
            }
        }

        const setPrimaryImage = () => {
            if (carData.value?.images && carData.value.images.length > 0) {
                const primaryImg = carData.value.images.find(img => img.is_primary)
                primaryImage.value = primaryImg ? primaryImg.image_url : carData.value.images[0].image_url
            }
        }

        const handleImageError = (event) => {
            event.target.src = '/assets/img/inner-page/car-dt-banner-img.png'
        }

        const formatPrice = (price) => {
            if (!price) return '0.00'
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price)
        }

        const formatMileage = (mileage) => {
            if (!mileage) return '0'
            return new Intl.NumberFormat('fr-FR').format(mileage)
        }

        const formatDate = (date) => {
            if (!date) return 'N/A'

            if (typeof date === 'string') {
                try {
                    const parsedDate = new Date(date)
                    if (isNaN(parsedDate.getTime())) {
                        return date
                    }
                    return parsedDate.toLocaleDateString('fr-FR')
                } catch (error) {
                    return date
                }
            }

            if (date instanceof Date) {
                return date.toLocaleDateString('fr-FR')
            }

            if (typeof date === 'number') {
                return new Date(date).toLocaleDateString('fr-FR')
            }

            return 'N/A'
        }

        const toggleShare = () => {
            showShare.value = !showShare.value
        }

        const copyLink = async () => {
            try {
                await navigator.clipboard.writeText(window.location.href)
                // console.log('Lien copié dans le presse-papiers')
            } catch (error) {
                const textArea = document.createElement('textarea')
                textArea.value = window.location.href
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
                // console.log('Lien copié')
            }
        }

        const toggleFavorite = () => {
            if (carData.value) {
                isFavorite.value = !isFavorite.value
                console.log('Toggle favorite for car:', carData.value.car_id)
            }
        }

        const nextSlide = () => {
            if (carData.value?.images?.length > 1) {
                currentSlide.value = (currentSlide.value + 1) % carData.value.images.length
            }
        }

        const prevSlide = () => {
            if (carData.value?.images?.length > 1) {
                currentSlide.value = currentSlide.value === 0
                    ? carData.value.images.length - 1
                    : currentSlide.value - 1
            }
        }

        watch(currentCarId, (newId) => {
            if (newId) {
                fetchCarData()
            }
        }, { immediate: true })

        onMounted(() => {
            fetchCarData()
        })

        return {
            // Data existantes
            car,
            carData,
            loading,
            error,
            isFavorite,
            showShare,
            primaryImage,
            currentSlide,

            // === NOUVELLES DATA POUR VOITURES récente ===
            relatedCars,
            loadingRelated,
            errorRelated,
            showViewAllButton,

            // Computed
            currentCarId,
            shareLinks,
            averageRating,
            reviews,

            // Methods existantes
            fetchCarData,
            setPrimaryImage,
            handleImageError,
            formatPrice,
            formatMileage,
            formatDate,
            toggleShare,
            copyLink,
            toggleFavorite,
            nextSlide,
            prevSlide,

            // === NOUVELLES MÉTHODES POUR VOITURES récente ===
            fetchRelatedCars,
            getCarImage,
            toggleFavoriteRelated,
            goToCarListing
        }
    }
}
</script>