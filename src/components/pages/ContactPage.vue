<template>
    <!-- Header -->
    <HeaderComponent />
    <!-- Modals -->
    <ModalsComponent />

    <ContactAg />
    <!-- Footer -->
    <FooterComponent />
</template>



<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import ModalsComponent from '@/components/common/ModalsComponent.vue';
import ContactAg from '@/components/sections/details/ContactAg.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';





export default {
    name: 'ContactPage',
    components: {
        HeaderComponent,
        ContactAg,
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