<template>
  <div class="dream-car-area pt-100 pb-100">
    <div class="container">
      <div class="row mb-50 wow fadeInUp" data-wow-delay="200ms">
        <div class="col-lg-12">
          <div class="section-title-2 text-center">
            <h2>Recherchez la voiture qui vous convient</h2>
            <p>Plus de 30 catégories de marques sont disponibles</p>
          </div>
        </div>
      </div>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-make" role="tabpanel" aria-labelledby="pills-make-tab">
          <div class="row g-4 justify-content-center">
            <p v-if="error" class="text-danger text-center">{{ error }}</p>
            <template v-else-if="brands.length">
              <div v-for="brand in brands" :key="brand.car_brand_id"
                class="col-xl-2 col-md-3 col-sm-4 col-6 wow fadeInUp" data-wow-delay="200ms">
                <a :href="`/filter?Brand=${encodeURIComponent(brand.brand_name)}`" class="car-category text-center">
                  <div class="icon">
                    <img :src="brand.logo_url || 'assets/img/home2/icon/suzuki.svg'" :alt="brand.brand_name">
                  </div>
                  <div class="content">
                    <h6>{{ brand.brand_name }}</h6>
                    <span>({{ brand.cars_count }})</span>
                  </div>
                </a>
              </div>
            </template>
            <p v-else class="text-center">No brands available</p>
          </div>
        </div>
      </div>
      <div class="explore-btn d-lg-none d-flex pt-40">
        <a class="explore-btn2" :href="`/filter?Brand=all`">Explorez davantage <i class="bi bi-arrow-right-short"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'DreamCar',
  setup() {
    const brands = ref([])
    const error = ref('')

    const getBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/en/parameters/top-car-brands')

        if (response.data && response.data.success && response.data.data) {
          brands.value = response.data.data
        } else {
          console.error('Unexpected data format:', response.data)
          error.value = 'Invalid data format received'
        }
      } catch (err) {
        console.error('Error fetching brands:', err.response?.data || err.message)
        error.value = `Error fetching brands: ${err.response?.statusText || err.message}`
      }
    }

    onMounted(() => {
      getBrands()
    })

    return {
      brands,
      error
    }
  }
}
</script>