<template>
  <div class="home-page">
    <!-- Header -->
    <HeaderComponent />

    <!-- Modals -->
    <ModalsComponent />

    <!-- Main Content -->
    <HeroAbout />
    <AboutUs />
    <HowWork />
    <AgencyName />
    <OurServices />

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import ModalsComponent from '@/components/common/ModalsComponent.vue'
import HeroAbout from '@/components/sections/about/HeroAbout.vue';
import AboutUs from '@/components/sections/about/AboutUs.vue';
import HowWork from '@/components/sections/about/HowWork.vue';
import OurServices from '@/components/sections/about/OurServices.vue';
import AgencyName from '@/components/sections/AgencyName.vue';


export default {
  name: 'AboutPage',
  components: {
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
    HeroAbout,
    AboutUs,
    HowWork,
    OurServices,
    AgencyName
  }
}
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>