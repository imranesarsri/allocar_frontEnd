<template>
    <div class="most-search-area style-2 pt-90 pb-90 mb-100">
        <div class="container">
            <div class="row mb-60 wow fadeInUp" data-wow-delay="200ms">
                <div class="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
                    <div class="section-title1">
                        <span>Voiture similaire</span>
                        <h2>Voiture similaire de cette marque</h2>
                    </div>
                </div>
            </div>
            
            <!-- État de chargement -->
            <div v-if="loading" class="row">
                <div class="col-lg-12 text-center py-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Chargement...</span>
                    </div>
                    <p class="mt-2">Chargement des voitures similaires...</p>
                </div>
            </div>
            
            <!-- État d'erreur -->
            <div v-else-if="error" class="row">
                <div class="col-lg-12 text-center py-5">
                    <p class="text-danger">{{ error }}</p>
                    <button @click="fetchSimilarCars" class="btn btn-primary">Réessayer</button>
                </div>
            </div>
            
            <!-- Contenu des voitures similaires -->
            <div v-else-if="similarCars && similarCars.length > 0" class="row wow fadeInUp" data-wow-delay="300ms">
                <div class="col-lg-12 position-relative">
                    <div class="swiper upcoming-car-slider mb-50" ref="swiperContainer">
                        <div class="swiper-wrapper">
                            <div 
                                v-for="car in similarCars" 
                                :key="`similar-${car.car_id}`"
                                class="swiper-slide">
                                <div class="product-card">
                                    <div class="product-img">
                                        <div class="number-of-img">
                                            <img src="/assets/img/icon/gallery-icon-1.svg" alt="">
                                            {{ car.images ? car.images.length : 1 }}
                                        </div>
                                        <a href="#" @click.prevent="toggleFavorite(car.car_id)" class="fav">
                                            <svg width="14" height="13" viewBox="0 0 14 14"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.00012 2.40453L6.37273 1.75966C4.90006 0.245917 2.19972 0.76829 1.22495 2.67141C0.767306 3.56653 0.664053 4.8589 1.4997 6.50827C2.30473 8.09639 3.97953 9.99864 7.00012 12.0706C10.0207 9.99864 11.6946 8.09639 12.5005 6.50827C13.3362 4.85803 13.2338 3.56653 12.7753 2.67141C11.8005 0.76829 9.10019 0.245042 7.62752 1.75879L7.00012 2.40453ZM7.00012 13.125C-6.41666 4.25953 2.86912 -2.65995 6.84612 1.00016C6.89862 1.04829 6.95024 1.09816 7.00012 1.14979C7.04949 1.09821 7.10087 1.04859 7.15413 1.00104C11.1302 -2.6617 20.4169 4.25865 7.00012 13.125Z">
                                                </path>
                                            </svg>
                                        </a>
                                        <div class="slider-btn-group">
                                            <div class="product-stand-next swiper-arrow">
                                                <svg width="8" height="13" viewBox="0 0 8 13"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="swiper product-img-slider">
                                            <div class="swiper-wrapper">
                                                <div 
                                                    v-for="(image, index) in getCarImages(car.images)" 
                                                    :key="`img-${index}`"
                                                    class="swiper-slide">
                                                    <img 
                                                        :src="image" 
                                                        :alt="`${car.brand?.brand_name || 'Car'} ${car.model?.model_name || ''}`"
                                                        @error="handleImageError">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <h5>
                                            <router-link :to="`/details/${car.car_id}`">
                                                {{ car.brand?.brand_name || 'Unknown' }}-{{ car.model?.model_name || 'Model' }}-{{ car.year || '2024' }}
                                            </router-link>
                                        </h5>
                                        <div class="price-location">
                                            <div class="price">
                                                <strong>${{ formatPrice(car.price) }}</strong>
                                            </div>
                                            <div class="location">
                                                <a href="#"><i class="bi bi-geo-alt"></i> {{ car.city?.city_name || 'N/A' }}</a>
                                            </div>
                                        </div>
                                        <ul class="features">
                                            <li>
                                                <svg width="13" height="13" viewBox="0 0 13 13"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_611_14491" style="mask-type:alpha"
                                                        maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                                                        <rect width="13" height="13" />
                                                    </mask>
                                                    <g mask="url(#mask0_611_14491)">
                                                        <path
                                                            d="M13 7.3125C13 5.53674 12.284 3.9253 11.1258 2.75099C11.1167 2.73873 11.1068 2.72712 11.0962 2.71625C11.0853 2.70558 11.0737 2.69569 11.0615 2.68667C9.88716 1.52848 8.27571 0.8125 6.5 0.8125C4.72429 0.8125 3.11284 1.52852 1.93849 2.68667C1.92625 2.69572 1.91466 2.7056 1.9038 2.71625C1.89311 2.72711 1.88321 2.73872 1.87417 2.75099C0.716023 3.9253 0 5.53674 0 7.3125C0 9.04849 0.675957 10.6805 1.90333 11.9081L1.90384 11.9087L1.90418 11.909L1.90469 11.9095C1.93434 11.9392 1.96957 11.9628 2.00835 11.9788C2.04713 11.9949 2.0887 12.0031 2.13068 12.0031C2.21251 12.0031 2.29435 11.9719 2.35675 11.9094C2.36208 11.9041 2.36689 11.8984 2.37175 11.8928L3.35686 10.9077C3.41637 10.8476 3.44969 10.7665 3.44951 10.6819C3.44933 10.5974 3.41566 10.5163 3.35589 10.4566C3.29611 10.3968 3.21509 10.3631 3.13055 10.3629C3.04601 10.3627 2.96484 10.396 2.9048 10.4556L2.13605 11.2243C1.23965 10.2268 0.719603 8.97139 0.648082 7.63217H1.73527C1.91181 7.63217 2.05494 7.48909 2.05494 7.3125C2.05494 7.13591 1.91181 6.99283 1.73527 6.99283H0.648167C0.722502 5.6173 1.27336 4.36649 2.13814 3.40274L2.9048 4.1694C2.93445 4.19912 2.96968 4.22269 3.00847 4.23875C3.04726 4.25481 3.08884 4.26305 3.13083 4.263C3.19405 4.26299 3.25585 4.24424 3.30841 4.20912C3.36098 4.17399 3.40195 4.12407 3.42614 4.06566C3.45033 4.00725 3.45666 3.94298 3.44433 3.88097C3.432 3.81896 3.40156 3.762 3.35686 3.7173L2.59024 2.9506C3.55403 2.08582 4.8048 1.53496 6.18033 1.46067V2.54781C6.18033 2.72439 6.32346 2.86748 6.5 2.86748C6.67654 2.86748 6.81967 2.72439 6.81967 2.54781V1.46067C8.1952 1.53496 9.44597 2.08586 10.4098 2.95064L9.6431 3.7173C9.58358 3.77733 9.55027 3.8585 9.55045 3.94304C9.55063 4.02758 9.58429 4.10861 9.64407 4.16839C9.70384 4.22817 9.78487 4.26184 9.86941 4.26203C9.95395 4.26222 10.0351 4.22891 10.0952 4.1694L10.8618 3.40274C11.7266 4.36653 12.2775 5.6173 12.3518 6.99283H11.2646C11.0881 6.99283 10.945 7.13591 10.945 7.3125C10.945 7.48909 11.0881 7.63217 11.2646 7.63217H12.3518C12.2803 8.97139 11.7603 10.2268 10.8639 11.2243L10.0952 10.4556C10.0349 10.3973 9.95409 10.365 9.87024 10.3657C9.78638 10.3664 9.70616 10.4001 9.64687 10.4594C9.58758 10.5187 9.55396 10.5989 9.55325 10.6827C9.55254 10.7666 9.58481 10.8474 9.6431 10.9077L10.6441 11.9087C10.6738 11.9384 10.709 11.962 10.7478 11.978C10.7866 11.9941 10.8281 12.0023 10.8701 12.0023C10.9121 12.0023 10.9537 11.9941 10.9925 11.978C11.0313 11.9619 11.0665 11.9384 11.0962 11.9087C12.3239 10.6809 13 9.04866 13 7.3125Z" />
                                                        <path
                                                            d="M7.96853 3.64648C7.92956 3.63086 7.8879 3.62307 7.84592 3.62356C7.80394 3.62404 7.76247 3.63279 7.72387 3.64931C7.68528 3.66583 7.65031 3.68979 7.62098 3.71982C7.59165 3.74986 7.56852 3.78537 7.55292 3.82435L6.62915 6.13025C6.58625 6.12537 6.54313 6.12278 6.49996 6.12249C6.05003 6.12249 5.64362 6.37171 5.43924 6.77288C5.22562 7.19225 5.28035 7.69332 5.58553 8.11316C5.61729 8.15668 5.65563 8.19499 5.69916 8.22675C5.9471 8.407 6.22402 8.50226 6.49996 8.50226C6.94989 8.50226 7.35634 8.25305 7.56067 7.85188C7.7743 7.43251 7.71957 6.93148 7.4146 6.51194C7.3828 6.46827 7.34439 6.42982 7.30076 6.39797C7.27754 6.38137 7.25388 6.36541 7.22979 6.3501L8.1464 4.06206C8.17791 3.98336 8.17688 3.89537 8.14352 3.81744C8.11016 3.73951 8.04722 3.67801 7.96853 3.64648ZM6.99093 7.56166C6.94504 7.65244 6.87483 7.72868 6.78812 7.78187C6.70142 7.83506 6.60163 7.8631 6.49992 7.86287C6.36335 7.86287 6.22589 7.81518 6.0912 7.72107C5.93776 7.50075 5.90763 7.26189 6.00894 7.06306C6.05482 6.97227 6.12504 6.89602 6.21175 6.84283C6.29845 6.78964 6.39824 6.7616 6.49996 6.76184C6.56637 6.76184 6.63294 6.77335 6.69935 6.79572C6.70152 6.79662 6.70353 6.79777 6.70574 6.79867C6.71273 6.80144 6.71976 6.80369 6.7268 6.80595C6.79115 6.83099 6.85221 6.86378 6.90863 6.9036C7.06203 7.12392 7.0922 7.36282 6.99093 7.56166Z" />
                                                    </g>
                                                </svg>
                                                {{ formatMileage(car.mileage) }} miles
                                            </li>
                                        </ul>
                                        <div class="content-btm">
                                            <router-link 
                                                class="view-btn2" 
                                                :to="`/details/${car.car_id}`">
                                                <svg width="35" height="21" viewBox="0 0 35 21"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 20C5.47715 20 1 15.7467 1 10.5C1 5.25329 5.47715 1 11 1"
                                                        stroke-linecap="round" />
                                                    <path
                                                        d="M14.2597 3C14.1569 3 14.0583 3.04166 13.9856 3.11582C13.9129 3.18997 13.8721 3.29055 13.8721 3.39542C13.8721 3.50029 13.9129 3.60086 13.9856 3.67502C14.0583 3.74917 14.1569 3.79083 14.2597 3.79083H15.8104C15.9132 3.79083 16.0118 3.74917 16.0845 3.67502C16.1572 3.60086 16.198 3.50029 16.198 3.39542C16.198 3.29055 16.1572 3.18997 16.0845 3.11582C16.0118 3.04166 15.9132 3 15.8104 3H14.2597ZM16.7795 3C16.6767 3 16.5781 3.04166 16.5054 3.11582C16.4327 3.18997 16.3919 3.29055 16.3919 3.39542C16.3919 3.50029 16.4327 3.60086 16.5054 3.67502C16.5781 3.74917 16.6767 3.79083 16.7795 3.79083H21.3346C21.4374 3.79083 21.536 3.74917 21.6087 3.67502C21.6814 3.60086 21.7222 3.50029 21.7222 3.39542C21.7222 3.29055 21.6814 3.18997 21.6087 3.11582C21.536 3.04166 21.4374 3 21.3346 3H16.7795Z" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M15.2292 5.76953C15.1264 5.76953 15.0278 5.81119 14.9551 5.88535C14.8824 5.9595 14.8415 6.06008 14.8415 6.16495C14.8415 6.26982 14.8824 6.3704 14.9551 6.44455C15.0278 6.51871 15.1264 6.56037 15.2292 6.56037H24.1454C25.653 6.56037 26.5822 6.79999 27.3256 7.18493C27.9575 7.51194 28.4672 7.9467 29.1055 8.49119C29.2375 8.60368 29.3749 8.72073 29.5201 8.84271L29.6101 8.91824L29.726 8.93069C33.2653 9.31069 34.0622 10.5309 34.2246 11.1557V12.6893C34.2246 12.7942 34.1838 12.8948 34.1111 12.9689C34.0384 13.0431 33.9398 13.0847 33.8369 13.0847H32.8356C32.6511 11.9627 31.6943 11.1077 30.5418 11.1077C29.3893 11.1077 28.4325 11.9627 28.248 13.0847H21.2058C21.0212 11.9627 20.0645 11.1077 18.912 11.1077C17.7594 11.1077 16.8027 11.9627 16.6182 13.0847H14.7446C14.6418 13.0847 14.5432 13.1264 14.4705 13.2006C14.3978 13.2747 14.3569 13.3753 14.3569 13.4802C14.3569 13.585 14.3978 13.6856 14.4705 13.7598C14.5432 13.8339 14.6418 13.8756 14.7446 13.8756H16.6182C16.8027 14.9976 17.7594 15.8527 18.912 15.8527C20.0645 15.8527 21.0212 14.9976 21.2058 13.8756H28.248C28.4325 14.9976 29.3893 15.8527 30.5418 15.8527C31.6943 15.8527 32.6511 14.9976 32.8356 13.8756H33.8369C34.1454 13.8756 34.4412 13.7506 34.6593 13.5281C34.8774 13.3057 34.9999 13.0039 34.9999 12.6893V11.0626L34.99 11.0187C34.7431 9.92754 33.5791 8.57502 29.9239 8.15706C29.8217 8.07086 29.7215 7.98505 29.6227 7.90063C28.9828 7.35397 28.3942 6.851 27.6766 6.4795C26.7966 6.02418 25.7391 5.76953 24.1454 5.76953H15.2292ZM28.9912 13.4802C28.9912 13.0607 29.1545 12.6584 29.4453 12.3618C29.7361 12.0651 30.1306 11.8985 30.5418 11.8985C30.9531 11.8985 31.3475 12.0651 31.6383 12.3618C31.9291 12.6584 32.0925 13.0607 32.0925 13.4802C32.0925 13.8996 31.9291 14.302 31.6383 14.5986C31.3475 14.8952 30.9531 15.0618 30.5418 15.0618C30.1306 15.0618 29.7361 14.8952 29.4453 14.5986C29.1545 14.302 28.9912 13.8996 28.9912 13.4802ZM18.912 11.8985C18.5007 11.8985 18.1063 12.0651 17.8155 12.3618C17.5247 12.6584 17.3613 13.0607 17.3613 13.4802C17.3613 13.8996 17.5247 14.302 17.8155 14.5986C18.1063 14.8952 18.5007 15.0618 18.912 15.0618C19.3232 15.0618 19.7176 14.8952 20.0084 14.5986C20.2992 14.302 20.4626 13.8996 20.4626 13.4802C20.4626 13.0607 20.2992 12.6584 20.0084 12.3618C19.7176 12.0651 19.3232 11.8985 18.912 11.8985Z" />
                                                    <path
                                                        d="M11 8.14151C11 8.03664 11.0408 7.93606 11.1135 7.86191C11.1862 7.78775 11.2848 7.74609 11.3877 7.74609H15.7489C15.8517 7.74609 15.9503 7.78775 16.023 7.86191C16.0957 7.93606 16.1365 8.03664 16.1365 8.14151C16.1365 8.24638 16.0957 8.34696 16.023 8.42111C15.9503 8.49527 15.8517 8.53693 15.7489 8.53693H11.3877C11.2848 8.53693 11.1862 8.49527 11.1135 8.42111C11.0408 8.34696 11 8.24638 11 8.14151ZM26.6836 8.65278C26.7563 8.72694 26.7971 8.82749 26.7971 8.93234C26.7971 9.03719 26.7563 9.13775 26.6836 9.2119L26.6532 9.24294C26.2897 9.61367 25.7968 9.82197 25.2828 9.82203H19.1409C19.0381 9.82203 18.9395 9.78037 18.8668 9.70622C18.7941 9.63206 18.7532 9.53149 18.7532 9.42462C18.7532 9.32174 18.7941 9.22117 18.8668 9.14701C18.9395 9.07286 19.0381 9.0312 19.1409 9.0312H25.2826C25.4354 9.03122 25.5866 9.00055 25.7277 8.94095C25.8688 8.88134 25.997 8.79397 26.105 8.68382L26.1355 8.65278C26.2082 8.57866 26.3068 8.53701 26.4096 8.53701C26.5123 8.53701 26.6109 8.57866 26.6836 8.65278ZM19.5286 17.7304C19.5286 17.6255 19.5694 17.5249 19.6421 17.4508C19.7148 17.3766 19.8134 17.335 19.9162 17.335H21.5638C21.6666 17.335 21.7652 17.3766 21.8379 17.4508C21.9106 17.5249 21.9514 17.6255 21.9514 17.7304C21.9514 17.8352 21.9106 17.9358 21.8379 18.01C21.7652 18.0841 21.6666 18.1258 21.5638 18.1258H19.9162C19.8134 18.1258 19.7148 18.0841 19.6421 18.01C19.5694 17.9358 19.5286 17.8352 19.5286 17.7304ZM22.2422 17.7304C22.2422 17.6255 22.283 17.5249 22.3557 17.4508C22.4284 17.3766 22.527 17.335 22.6299 17.335H26.991C27.0939 17.335 27.1925 17.3766 27.2652 17.4508C27.3379 17.5249 27.3787 17.6255 27.3787 17.7304C27.3787 17.8352 27.3379 17.9358 27.2652 18.01C27.1925 18.0841 27.0939 18.1258 26.991 18.1258H22.6299C22.527 18.1258 22.4284 18.0841 22.3557 18.01C22.283 17.9358 22.2422 17.8352 22.2422 17.7304Z" />
                                                </svg>
                                                Voir plus de details
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Message si aucune voiture trouvée -->
            <div v-else-if="!loading && !error" class="row">
                <div class="col-lg-12 text-center py-5">
                    <p>Aucune voiture similaire trouvée pour cette marque.</p>
                </div>
            </div>
            
            <div class="row wow fadeInUp" data-wow-delay="400ms" v-if="similarCars && similarCars.length > 0">
                <div class="col-lg-12 divider">
                    <div class="slider-btn-group style-2 justify-content-md-between justify-content-center">
                        <div class="slider-btn prev-2 d-md-flex d-none" @click="prevSlide">
                            <svg width="11" height="19" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                            </svg>
                        </div>
                        <div class="view-btn-area">
                            <p>Il y a {{ totalCars }}+ voitures similaires</p>
                            <router-link class="view-btn" :to="`/brand/${brandId}`">Voir Plus</router-link>
                        </div>
                        <div class="slider-btn next-2 d-md-flex d-none" @click="nextSlide">
                            <svg width="11" height="19" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                            </svg>
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
    name: 'SimilarCar',
    props: {
        brandId: {
            type: [String, Number],
            required: false
        },
        carId: {
            type: [String, Number], 
            required: false
        }
    },
    setup(props) {
        const route = useRoute()
        const similarCars = ref([])
        const loading = ref(false)
        const error = ref(null)
        const totalCars = ref(0)
        const swiper = ref(null)

        // Computed pour récupérer l'ID de la marque depuis les props ou l'URL
        const currentBrandId = computed(() => {
            return props.brandId || route.params.brandId || route.params.id
        })

        // Computed pour récupérer l'ID de la voiture courante
        const currentCarId = computed(() => {
            return props.carId || route.params.carId || route.params.id
        })

        // Méthode pour récupérer les voitures similaires
        const fetchSimilarCars = async () => {
            if (!currentBrandId.value) return

            loading.value = true
            error.value = null

            try {
                const params = {
                    car_brand_id: currentBrandId.value,
                    is_available: 1,
                    limit: 8
                }

                // Exclure la voiture courante si on est sur une page de détail
                if (currentCarId.value) {
                    params.exclude_id = currentCarId.value
                }

                // console.log('Fetching similar cars with params:', params)

                const response = await axios.get('http://127.0.0.1:8000/api/fr/cars', { params })

                // console.log('Similar cars response:', response.data)

                if (response.data.success) {
                    const cars = response.data.data?.cars || response.data.cars || response.data.data || []
                    
                    // Filtrer les voitures disponibles et exclure la voiture courante
                    similarCars.value = cars.filter(car => {
                        return car.is_available === 1 && 
                               car.car_id != currentCarId.value
                    }).slice(0, 8)

                    // Récupérer le total depuis les métadonnées ou compter
                    totalCars.value = response.data.meta?.total || response.data.total || similarCars.value.length

                    // console.log('Similar cars found:', similarCars.value.length)

                    // Initialiser Swiper après avoir chargé les données
                    initSwiper()
                } else {
                    error.value = response.data.message || 'Erreur lors du chargement'
                }

            } catch (err) {
                console.error('Erreur lors du chargement des voitures similaires:', err)
                error.value = 'Impossible de charger les voitures similaires.'
                
                // Méthode de fallback : récupérer toutes les voitures et filtrer
                try {
                    const fallbackResponse = await axios.get('http://127.0.0.1:8000/api/fr/cars')
                    
                    if (fallbackResponse.data.success) {
                        const allCars = fallbackResponse.data.data?.cars || fallbackResponse.data.cars || []
                        
                        similarCars.value = allCars.filter(car => {
                            return car.brand?.car_brand_id == currentBrandId.value &&
                                   car.is_available === 1 &&
                                   car.car_id != currentCarId.value
                        }).slice(0, 8)

                        totalCars.value = similarCars.value.length
                        error.value = null
                        
                        initSwiper()
                    }
                } catch (fallbackErr) {
                    console.error('Fallback method failed:', fallbackErr)
                }

            } finally {
                loading.value = false
            }
        }

        // Initialiser Swiper
        const initSwiper = () => {
            setTimeout(() => {
                if (window.Swiper && similarCars.value.length > 0) {
                    swiper.value = new window.Swiper('.upcoming-car-slider', {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        loop: true,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        },
                        breakpoints: {
                            576: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }
                    })
                }
            }, 100)
        }

        // Méthodes pour la navigation du slider
        const nextSlide = () => {
            if (swiper.value) {
                swiper.value.slideNext()
            }
        }

        const prevSlide = () => {
            if (swiper.value) {
                swiper.value.slidePrev()
            }
        }

        // Méthode pour récupérer les images d'une voiture
        const getCarImages = (images) => {
            if (!images || !Array.isArray(images) || images.length === 0) {
                return ['/assets/img/home1/product-img-11.png']
            }

            return images.map(img => img.image_url).filter(url => url)
        }

        // Méthode pour gérer les erreurs d'image
        const handleImageError = (event) => {
            event.target.src = '/assets/img/home1/product-img-11.png'
        }

        // Méthode pour formater le prix
        const formatPrice = (price) => {
            if (!price) return '0.00'
            return new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price)
        }

        // Méthode pour formater le kilométrage
        const formatMileage = (mileage) => {
            if (!mileage) return '0'
            return new Intl.NumberFormat('fr-FR').format(mileage)
        }

        // Méthode pour gérer les favoris
        const toggleFavorite = (carId) => {
            console.log('Toggle favorite for car:', carId)
            // Implémentez votre logique de favoris ici
        }
        // Watcher pour réagir aux changements d'ID de marque
        watch(currentBrandId, (newBrandId) => {
            if (newBrandId) {
                fetchSimilarCars()
            }
        }, { immediate: true })

        // Lifecycle hook
        onMounted(() => {
            if (currentBrandId.value) {
                fetchSimilarCars()
            }
        })

        return {
            // Data
            similarCars,
            loading,
            error,
            totalCars,
            swiper,
            
            // Computed
            currentBrandId,
            currentCarId,
            
            // Methods
            fetchSimilarCars,
            initSwiper,
            nextSlide,
            prevSlide,
            getCarImages,
            handleImageError,
            formatPrice,
            formatMileage,
            toggleFavorite
        }
    }
}
</script>