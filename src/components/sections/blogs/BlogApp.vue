x<template>
    <div class="blog-standard-page pt-100 mb-100">
        <div class="container">
            <div class="row g-lg-4 gy-5">
                <div class="col-lg-8">
                    <div v-for="blog in blogs" :key="blog.blog_post_id" class="news-card2 mb-50">
                        <div class="news-img">
                            <a @click="navigateToBlog(blog)" style="cursor: pointer;">
                                <img :src="blog.featured_image || 'assets/img/inner-page/blog-st-01.png'" alt="">
                            </a>
                            <div class="date">
                                <a href="blog-standard.html">{{ blog.category?.name || 'Conseils d\'achat' }}</a>
                            </div>
                        </div>
                        <div class="content">
                            <h4><a @click="navigateToBlog(blog)" style="cursor: pointer;">{{ blog.title }}</a></h4>
                            <p>{{ blog.excerpt || blog.content.substring(0, 150) + '...' }}</p>
                            <div class="news-btm d-flex align-items-center justify-content-between">
                                <div class="author-area">
                                    <div class="author-content">
                                        <h6>{{ blog.author?.name || 'Mulish Kary' }}</h6>
                                        <a href="blog-standard.html">Posted on - {{ formatDate(blog.published_at) }}</a>
                                    </div>
                                </div>
                                <a class="view-btn" :href="`/detailsBlog/${blog.blog_post_id}`">Voir details</a>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-and-next-prev">
                        <div class="pagination">
                            <ul>
                                <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                                    <a @click="fetchBlogs(page)">{{ page.toString().padStart(2, '0') }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="next-prev-btn">
                            <ul>
                                <li v-if="currentPage > 1">
                                    <a @click="fetchBlogs(currentPage - 1)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14"
                                            viewBox="0 0 7 14">
                                            <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z"></path>
                                        </svg> Précédent
                                    </a>
                                </li>
                                <li v-if="currentPage < totalPages">
                                    <a @click="fetchBlogs(currentPage + 1)">
                                        Suivant
                                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14"
                                            viewBox="0 0 7 14">
                                            <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="blog-sidebar mb-50">
                        <div class="single-widgets widget_egns_categoris mb-20">
                            <div class="widget-title mb-20">
                                <h6>Categorie</h6>
                            </div>
                            <ul class="wp-block-categoris-cloud">
                                <li v-for="category in categories" :key="category.id">
                                    <a href="blog-standard.html">
                                        <span>{{ category.name }}</span>
                                        <span class="number-of-categoris">({{ category.count }})</span>
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div class="single-widgets widget_egns_recent_post mb-20">
                            <div class="widget-title blog-title mb-20">
                                <h6>Blog récent</h6>
                                <div class="slider-btn-group2 d-flex align-items-center justify-content-between">
                                    <div class="slider-btn prev-51" @click="prevRecentBlog">
                                        <svg width="7" height="12" viewBox="0 0 8 13"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                                        </svg>
                                    </div>
                                    <div class="slider-btn next-51" @click="nextRecentBlog">
                                        <svg width="7" height="12" viewBox="0 0 8 13"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="recent-post-wraper">
                                <div class="swiper recent-post-sidebar-slider">
                                    <div class="swiper-wrapper">
                                        <div v-for="blog in blogs.slice(0, 5)" :key="blog.blog_post_id"
                                            class="swiper-slide">
                                            <div class="widget-cnt">
                                                <div class="wi">
                                                    <a
                                                        :href="`blog-details.html?slug=${blogs[currentRecentIndex].slug}`">
                                                        <img :src="blogs[currentRecentIndex].featured_image || 'assets/img/inner-page/blog-st-01.png'"
                                                            alt="image">
                                                    </a>
                                                </div>
                                                <div class="wc">
                                                    <a class="date" href="blog-standard.html">{{
                                                        formatDate(blogs[currentRecentIndex].published_at) }}</a>
                                                    <h6><a
                                                            :href="`blog-details.html?slug=${blogs[currentRecentIndex].slug}`">{{
                                                                blogs[currentRecentIndex].title }}</a></h6>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="single-widgets widget_egns_tag">
                            <div class="widget-title mb-20">
                                <h6>Mots clés populaires</h6>
                            </div>
                            <p class="wp-block-tag-cloud">
                                <a href="#">Conseils automobiles</a>
                                <a href="#">location</a>
                                <a href="#">Hyundai</a>
                                <a href="#">Conduite</a>
                                <a href="#">Comparer</a>
                                <a href="#">Achat</a>
                                <a href="#">Toyota</a>
                                <a href="#">Service</a>
                            </p>
                        </div>
                    </div>
                    <div class="single-widgets sidebar-banner" v-if="topPromotionalCar">
                        <div class="product-content">
                            <div class="text">
                                <h4><a href="#">{{ topPromotionalCar.brand.brand_name }} <span>( {{
                                    topPromotionalCar.model.model_name }})</span></a></h4>
                                <h6>Pour l'offre d'été</h6>
                            </div>
                            <div class="offer-batch">
                                <h3>{{ Math.round(topPromotionalCar.promotion.discount_percentage) }}%</h3>
                                <span>Rabais</span>
                            </div>
                        </div>
                        <div class="product-img">
                            <img :src="topPromotionalCar.images.find(img => img.is_primary)?.image_url || 'assets/img/inner-page/sb-banner-img.png'"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {

    name: 'BlogApp',

    data() {
        return {
            blogs: [],
            categories: [],
            topPromotionalCar: null,
            currentPage: 1,
            totalPages: 1,
            currentRecentIndex: 0,
            loading: false
        }
    },
    mounted() {
        this.fetchBlogs();
        this.extractCategories();
        this.fetchPromotionalCars();
    },
    methods: {
        navigateToBlog(blog) {
            this.$router.push(`/detailsBlog/${blog.blog_post_id}`);
        },
        async fetchBlogs(page = 1) {
            this.loading = true;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/fr/blogs/recentBlogs?page=${page}`);
                this.blogs = response.data.data;
                this.currentPage = response.data.pagination.current_page;
                this.totalPages = response.data.pagination.last_page;
                this.extractCategories();
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                this.loading = false;
            }
        },
        extractCategories() {
            const categoryMap = {};
            this.blogs.forEach(blog => {
                if (blog.category) {
                    const catName = blog.category.name;
                    if (categoryMap[catName]) {
                        categoryMap[catName].count++;
                    } else {
                        categoryMap[catName] = {
                            id: blog.category.blog_category_id,
                            name: catName,
                            count: 1
                        };
                    }
                }
            });
            this.categories = Object.values(categoryMap);
        },
        nextRecentBlog() {
            if (this.currentRecentIndex < this.blogs.length - 1) {
                this.currentRecentIndex++;
            } else {
                this.currentRecentIndex = 0;
            }
        },
        prevRecentBlog() {
            if (this.currentRecentIndex > 0) {
                this.currentRecentIndex--;
            } else {
                this.currentRecentIndex = this.blogs.length - 1;
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        async fetchPromotionalCars() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fr/cars/promotional');
                const cars = response.data.cars;
                if (cars && cars.length > 0) {
                    this.topPromotionalCar = cars.reduce((max, car) =>
                        car.promotion.discount_percentage > max.promotion.discount_percentage ? car : max
                    );
                }
            } catch (error) {
                console.error('Erreur promotional cars:', error);
            }
        }
    }
}
</script>