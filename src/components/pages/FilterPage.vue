<template>
    <!-- Header -->
    <HeaderComponent />
    <!-- Modals -->
    <ModalsComponent />

    <HeroFilter />
    <AppFilter />
    <TopCars />
    <!-- Footer -->
    <FooterComponent />
</template>



<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import ModalsComponent from '@/components/common/ModalsComponent.vue';
import HeroFilter from '@/components/sections/filter/HeroFilter.vue';
import AppFilter from '@/components/sections/filter/AppFilter.vue';
import TopCars from '@/components/sections/filter/TopCars.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';





export default {
    name: 'FilterPage',
    components: {
        HeaderComponent,
        HeroFilter,
        AppFilter,
        TopCars,
        ModalsComponent,
        FooterComponent,
    }
}
</script>

<style scoped>
.home-page {
    overflow-x: hidden;
}
</style>