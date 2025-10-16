<template>
    <!-- Header -->
    <HeaderComponent />
    <!-- Modals -->
    <ModalsComponent />

    <CardCar />
    <CarInfo />
    <!-- Footer -->
    <FooterComponent />
</template>

<script>
import CardCar from '@/components/sections/details/CardCar.vue';
import CarInfo from '@/components/sections/details/CarInfo.vue';
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import ModalsComponent from '@/components/common/ModalsComponent.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';



export default {
    name: 'DetailsPage',
    components: {
        HeaderComponent,
        CardCar,
        CarInfo,
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