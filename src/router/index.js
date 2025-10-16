import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import { fetchHomePageData } from '../utils/api.js';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        props: true, // Enable props to pass fetched data
        beforeEnter: async (to, from, next) => {
            const homePageData = await fetchHomePageData();
            to.params = { ...to.params, ...homePageData };
            next();
        },
        meta: {
            title: 'Allocar'
        }
    },
    {
        path: '/filter',
        name: 'FilterPage',
        component: () => import('@/components/pages/FilterPage.vue'),
        meta: {
            title: 'Filter- ALLOCAR'
        }
    },
    {
        path: '/agency',
        name: 'AgencyPage',
        component: () => import('@/components/pages/AgencyPage.vue'),
        meta: {
            title: 'Agences - Allocar'
        }
    },
    {
        path: '/agency/:id',
        name: 'AgencyDetailsPage',
        component: () => import('@/components/pages/AgencyDetailsPage.vue'),
        meta: {
            title: 'Agences - Allocar'
        }
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import('@/components/pages/AboutPage.vue'),
        meta: {
            title: 'À propos - Allocar'
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/components/pages/ContactPage.vue'),
        meta: {
            title: 'Contact - Allocar'
        }
    },
    {
        path: '/booking',
        name: 'booking',
        component: () => import('@/components/pages/BookingPage.vue'),
        meta: {
            title: 'Réservation - Allocar'
        }
    },
    {
        path: '/blogs',
        name: 'BlogPage',
        component: () => import('@/components/pages/BlogPage.vue'),
        meta: {
            title: 'Blogs - Allocar'
        }
    },
    {
        path: '/blogs/:id',
        name: 'BlogDetailsPage',
        component: () => import('@/components/pages/BlogDetailsPage.vue'),
        meta: {
            title: 'Blogs - Allocar'
        }
    },
    {
        path: '/details/:id',
        name: 'DetailsPage',
        component: () => import('@/components/pages/DetailsPage.vue'),
        meta: {
            title: 'Details - Allocar'
        }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when changing routes
    return { top: 0 };
  }
});

// Global navigation guard for updating page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Allocar - Car Dealer HTML Template';
  next();
});

export default router;