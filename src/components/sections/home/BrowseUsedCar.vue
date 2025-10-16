<template>
    <div class="browse-used-car-section mb-100">
        <div class="container">
            <div class="row mb-50 wow fadeInUp" data-wow-delay="200ms">
                <div class="col-lg-12">
                    <div class="section-title-2 text-center">
                        <h2>Parcourir par ville</h2>
                        <p>Plus de 30 catégories de marques sont disponibles</p>
                    </div>
                </div>
            </div>
            <div class="row wow fadeInUp" data-wow-delay="300ms">
                <div class="col-lg-12">
                    <div class="browse-car-filter-area">
                        <ul class="nav nav-tabs" id="cityTabs" role="tablist">
                            <li class="nav-item" v-for="(city, index) in topCities" :key="city.city_id"
                                role="presentation">
                                <button class="nav-link" :class="{ active: index === 0 }" :id="`tab-${city.city_id}`"
                                    data-bs-toggle="tab" :data-bs-target="`#pane-${city.city_id}`" type="button"
                                    role="tab" :aria-controls="`pane-${city.city_id}`" :aria-selected="index === 0">
                                    {{ city.city_name }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="tab-content" id="cityTabContent">
                        <div class="tab-pane fade" :class="{ show: index === 0, active: index === 0 }"
                            v-for="(city, index) in topCities" :key="`pane-${city.city_id}`"
                            :id="`pane-${city.city_id}`" role="tabpanel" :aria-labelledby="`tab-${city.city_id}`">
                            <div class="row justify-content-center g-4">
                                <div class="col-xl-3 col-md-4 col-sm-6" v-for="car in city.cars" :key="car.car_id">
                                    <div class="product-card2 two">
                                        <div class="product-img">
                                            <img :src="car.images[0]?.image_url" alt="car image" />
                                        </div>
                                        <div class="product-content">
                                            <div class="company-logo">
                                                <a :href="`/details/${car.car_id}`">
                                                    <img :src="car.brand.logo_url || 'assets/img/default-logo.svg'"
                                                        alt="brand logo" />
                                                </a>
                                            </div>
                                            <div class="price">
                                                <strong>${{ parseFloat(car.price).toLocaleString() }}</strong>
                                            </div>
                                            <h6>
                                                <a :href="`/details/${car.car_id}`">
                                                    {{ car.brand.brand_name }} {{ car.model.model_name }} - {{ car.year
                                                    }}
                                                </a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="city.cars.length === 0" class="text-center py-4">
                                    <p>No cars available in this city.</p>
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
export default {
    name: 'BrowseUsedCar',

    data() {
        return {
            topCities: []
        };
    },

    mounted() {
        this.fetchTopCities();
    },

    methods: {
        async fetchTopCities() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/en/cars/topCiteis');
                const data = await response.json();
                if (data.success) {
                    this.topCities = data.top_cities;
                }
            } catch (error) {
                console.error('Failed to load cities:', error);
            }
        }
    }
};
</script>
