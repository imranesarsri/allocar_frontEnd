<template>
  <div class="home-page">
    <!-- Header -->
    <HeaderComponent />

    <!-- Modals -->
    <ModalsComponent />

    <!-- Main Content -->
    <HeroBanner />
    <DreamCar />
    <FeaturedCar :cars="featuredCars" />
    <InnerBanner />
    <RecentLaunched />
    <BrowseUsedCar />
    <AppAgency />
    <HowWork />
    <LastCars />

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import ModalsComponent from '@/components/common/ModalsComponent.vue'
import HeroBanner from '@/components/sections/home/HeroBanner.vue'
import DreamCar from '@/components/sections/home/DreamCar.vue'
import FeaturedCar from '@/components/sections/home/FeaturedCar.vue'
import InnerBanner from '@/components/sections/home/InnerBanner.vue'
import RecentLaunched from '@/components/sections/home/RecentLaunched.vue'
import BrowseUsedCar from '@/components/sections/home/BrowseUsedCar.vue'
import AppAgency from '@/components/sections/agency/AppAgency.vue'
import HowWork from '@/components/sections/about/HowWork.vue'
import LastCars from '@/components/sections/home/LastCars.vue'

export default {
  props: {
    featuredCars: {
      type: Array,
      required: true
    }
  },
  name: 'HomePage',
  components: {
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    HeroBanner,
    DreamCar,
    FeaturedCar,
    InnerBanner,
    RecentLaunched,
    BrowseUsedCar,
    AppAgency,
    HowWork,
    LastCars
  }
}
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>