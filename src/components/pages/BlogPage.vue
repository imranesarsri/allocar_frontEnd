<template>
    <!-- Header -->
    <HeaderComponent />
    <!-- Modals -->
    <CardBlog />
    <BlogApp />
    <ModalsComponent />
    <!-- Footer -->
    <FooterComponent />
</template>



<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import CardBlog from '../sections/blogs/CardBlog.vue';
import BlogApp from '../sections/blogs/BlogApp.vue';
import ModalsComponent from '@/components/common/ModalsComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'




export default {
    name: 'BlogPage',
    components: {
        HeaderComponent,
        CardBlog,
        BlogApp,
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