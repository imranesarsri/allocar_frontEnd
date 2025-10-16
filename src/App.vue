<template>
  <div id="app" class="tt-magic-cursor">
    <!-- Preloader Component -->
    <Preloader v-if="loadingState.isLoading" />

    <!-- Main Application Content -->
    <router-view v-show="!loadingState.isLoading" />
  </div>
</template>

<script>
import Preloader from './components/layout/Preloader.vue';
import { loadingState } from './store/loading.js';

export default {
  name: 'App',
  components: {
    Preloader
  },
  setup() {
    return {
      loadingState
    };
  },
  mounted() {
    // Initialize marquee and other global scripts
    this.initializeMarquee()
  },
  methods: {
    initializeMarquee() {
      // Convert jQuery marquee to Vue or use CSS animations
      // You can use GSAP or CSS animations instead of jQuery marquee
      this.$nextTick(() => {
        // Initialize any global JavaScript functionality here
        console.log('App mounted and ready')
      })
    }
  }
}
</script>
