<template>
    <!-- Header -->
    <HeaderComponent />
    <!-- Modals -->
    <ModalsComponent />

    <BlogDetailsApp />

    <!-- Footer -->
    <FooterComponent />
</template>

<script>

import HeaderComponent from '@/components/common/HeaderComponent.vue';
import ModalsComponent from '@/components/common/ModalsComponent.vue';
import BlogDetailsApp from '@/components/sections/blog-details/BlogDetailsApp.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';



export default {
    name: 'BlogDetailsPage',
    components: {
        HeaderComponent,
        ModalsComponent,
        BlogDetailsApp,
        FooterComponent,
    }
}
</script>

<style scoped>
.home-page {
    overflow-x: hidden;
}
</style>