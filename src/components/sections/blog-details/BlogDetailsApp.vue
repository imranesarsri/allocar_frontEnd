<template>
  <!-- Start header section -->
  <div class="inner-page-banner">
    <div class="banner-wrapper">
      <div class="container-fluid">
        <ul class="breadcrumb-list">
          <li><a href="/">Home</a></li>
          <li>Blog Standard</li>
          <li>Blog Details</li>
        </ul>
        <div class="banner-main-content-wrap">
          <div class="row">
            <div class="col-xl-6 col-lg-7 d-flex align-items-center">
              <div class="banner-content">
                <span class="sub-title">Blog Details</span>
                <h1>Car Blog Details</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End header section -->
  <!-- Start Blog Standard section -->
  <div class="blog-details-page pt-100 mb-100">
    <div class="container">
      <div class="row g-lg-4 gy-5">
        <div class="col-lg-8">
          <div v-if="loading" class="loading">
            Chargement...
          </div>

          <div v-else-if="blog">
            <div class="post-thumb">
              <img :src="blog.featured_image || 'assets/img/inner-page/blog-st-01.png'" alt="">
              <div class="date">
                <a href="blog-standard.html">{{ blog.category?.name || 'Conseils d\'achat' }}</a>
              </div>
            </div>

            <h3 class="post-title">{{ blog.title }}</h3>

            <div class="author-area">
              <div class="author-content">
                <h6>{{ blog.author?.name || 'Auteur inconnu' }}</h6>
                <a href="blog-standard.html">Posted on - {{ formatDate(blog.published_at) }}</a>
              </div>
            </div>

            <p>{{ blog.excerpt }}</p>

            <div class="blog-content" v-html="blog.content"></div>

            <!-- Tags si disponibles -->
            <div v-if="blog.tags && blog.tags.length > 0" class="blog-tags mt-4">
              <h6>Tags:</h6>
              <span v-for="tag in blog.tags" :key="tag.blog_tag_id" class="badge bg-secondary me-2">
                {{ tag.name }}
              </span>
            </div>

            <!-- Commentaires si disponibles -->
            <div v-if="blog.comments && blog.comments.length > 0" class="blog-comments mt-4">
              <h5>Commentaires ({{ blog.comments.length }})</h5>
              <div v-for="comment in blog.comments" :key="comment.blog_comment_id"
                class="comment mb-3 p-3 border rounded">
                <p>{{ comment.content }}</p>
                <small class="text-muted">{{ formatDate(comment.created_at) }}</small>
              </div>
            </div>

            <blockquote>
              <div class="quoat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18">
                  <path
                    d="M21.6832 6.05443L21.4534 6.62147L22.0549 6.73371C24.6453 7.21714 26.5 9.46982 26.5 12.0337C26.5 13.573 25.8343 15.0529 24.6667 16.09C23.4982 17.1192 21.9207 17.6286 20.3329 17.4722C17.4907 17.1844 15.2846 14.6588 15.3404 11.7032C15.4201 7.67759 16.8945 5.07458 18.6289 3.38578C20.3761 1.68459 22.4158 0.884497 23.6452 0.531618L23.6591 0.527628L23.6728 0.52284C23.7152 0.507954 23.7704 0.5 23.8713 0.5C24.1425 0.5 24.3799 0.624329 24.5265 0.85037L24.5277 0.852289C24.7128 1.13485 24.6857 1.4981 24.4524 1.75822L24.4523 1.75827C23.2163 3.13698 22.2806 4.57999 21.6832 6.05443Z" />
                  <path
                    d="M7.84136 6.05442L7.61159 6.62147L8.21303 6.73371C10.8035 7.21714 12.6582 9.46983 12.6582 12.0337C12.6582 13.573 11.9925 15.0529 10.8249 16.09C9.65615 17.1194 8.07865 17.6285 6.50008 17.4722C3.67976 17.1842 1.49865 14.7207 1.49865 11.8126V11.6985C1.57946 7.67556 3.05336 5.07393 4.7871 3.38579C6.53424 1.6846 8.574 0.884504 9.8034 0.531628L9.81731 0.527636L9.83096 0.522848C9.8734 0.507959 9.92859 0.500008 10.0294 0.500008C10.3007 0.500008 10.5381 0.624359 10.6846 0.850338L10.6859 0.852327C10.871 1.13488 10.8439 1.49811 10.6106 1.75823L10.6105 1.75828C9.37446 3.13698 8.43881 4.57999 7.84136 6.05442Z" />
                </svg>
              </div>
              <svg class="vector" xmlns="http://www.w3.org/2000/svg" height="95" viewBox="0 0 15 95">
                <path d="M0 26.0484V21.4517L15 36.7742V41.3709L0 26.0484Z" />
                <path d="M0 36.774V32.1772L15 47.4998V52.0965L0 36.774Z" />
                <path d="M0 4.59676V0L15 15.3225V19.9193L0 4.59676Z" />
                <path d="M0 15.3223V10.7256L15 26.0481V30.6449L0 15.3223Z" />
                <path d="M0 47.5001V42.9033L15 58.2258V62.8226L0 47.5001Z" />
                <path d="M0 58.2247V53.6279L15 68.9504V73.5472L0 58.2247Z" />
                <path d="M0 68.9512V64.3545L15 79.677V84.2738L0 68.9512Z" />
                <path d="M0 79.6773V75.0806L15 90.4031V94.9998L0 79.6773Z" />
              </svg>
              <p>{{ blog.excerpt || (blog.content ? blog.content.substring(0, 200) + '...' : 'Contenu non disponible')
                }} <span>{{ blog.author?.name || 'Auteur' }}</span></p>
            </blockquote>


            <p class="content-description">
              {{ blog.content || 'Description non disponible' }}
            </p>
          </div>

          <div v-else-if="error" class="error">
            {{ error }}
          </div>
          <div class="blog-tag-social-area">
            <div class="bolg-tag">
              <h6>Étiqueter:</h6>
              <div v-if="loading" class="tags-loading">
                <span class="text-muted">Chargement des tags...</span>
              </div>

              <!-- Tags disponibles -->
              <ul v-else-if="blog && blog.tags && blog.tags.length > 0" class="tags-list">
                <li v-for="(tag, index) in blog.tags" :key="tag.blog_tag_id" class="tag-item">
                  <a href="#" @click.prevent="navigateToTag(tag)" class="tag-link"
                    :title="`Voir tous les articles avec le tag: ${tag.name}`">
                    {{ tag.name }}
                  </a>
                  <span v-if="index < blog.tags.length - 1" class="tag-separator">,</span>
                </li>
              </ul>

              <!-- Aucun tag -->
              <ul v-else class="no-tags">
                <li><span class="text-muted">Aucun tag disponible</span></li>
              </ul>
            </div>
            <div class="social-area">
              <h6>Partager:</h6>
              <ul class="social-link d-flex align-items-center">
                <li><a href="https://www.facebook.com/"><i class="bx bxl-facebook"></i></a></li>
                <li><a href="https://twitter.com/"><i class="bx bxl-twitter"></i></a></li>
                <li><a href="https://www.pinterest.com/"><i class="bx bxl-linkedin"></i></a></li>
                <li><a href="https://www.instagram.com/"><i class="bx bxl-instagram"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="row mb-100">
            <div class="col-lg-12">
              <div class="details-navigation">
                <div class="single-navigation" v-if="prevPost">
                  <a @click.prevent="navigateToBlog(prevPost)" class="arrow" style="cursor: pointer;">
                    <svg width="9" height="15" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                    </svg>
                  </a>
                  <div class="content">
                    <a @click.prevent="navigateToBlog(prevPost)" style="cursor: pointer;">Prev Post</a>
                    <h6>
                      <a @click.prevent="navigateToBlog(prevPost)" style="cursor: pointer;" :title="prevPost.title">
                        {{ truncateTitle(prevPost.title, 60) }}
                      </a>
                    </h6>
                  </div>
                </div>
                <div class="single-navigation two text-end" v-if="nextPost">
                  <div class="content">
                    <a @click.prevent="navigateToBlog(nextPost)" style="cursor: pointer;">Next Post</a>
                    <h6>
                      <a @click.prevent="navigateToBlog(nextPost)" style="cursor: pointer;" :title="nextPost.title">
                        {{ truncateTitle(nextPost.title, 60) }}
                      </a>
                    </h6>
                  </div>
                  <a @click.prevent="navigateToBlog(nextPost)" class="arrow" style="cursor: pointer;">
                    <svg width="9" height="15" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
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
                    <svg width="7" height="12" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6.50008L8 0L2.90909 6.50008L8 13L0 6.50008Z"></path>
                    </svg>
                  </div>
                  <div class="slider-btn next-51" @click="nextRecentBlog">
                    <svg width="7" height="12" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6.50008L0 0L5.09091 6.50008L0 13L8 6.50008Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="recent-post-wraper">
                <div class="swiper recent-post-sidebar-slider">
                  <div class="swiper-wrapper">
                    <div v-for="blog in blogs.slice(0, 5)" :key="blog.blog_post_id" class="swiper-slide">
                      <div class="widget-cnt">
                        <div class="wi">
                          <a :href="`blog-details.html?slug=${blogs[currentRecentIndex].slug}`">
                            <img
                              :src="blogs[currentRecentIndex].featured_image || 'assets/img/inner-page/blog-st-01.png'"
                              alt="image">
                          </a>
                        </div>
                        <div class="wc">
                          <a class="date" href="blog-standard.html">{{
                            formatDate(blogs[currentRecentIndex].published_at) }}</a>
                          <h6><a :href="`blog-details.html?slug=${blogs[currentRecentIndex].slug}`">{{
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
                <h6>Popular Tags</h6>
              </div>
              <p class="wp-block-tag-cloud">
                <a href="#">Car Advice</a>
                <a href="#">Rental</a>
                <a href="#">Hyundai</a>
                <a href="#">Driving</a>
                <a href="#">Compare</a>
                <a href="#">Buying</a>
                <a href="#">Toyota</a>
                <a href="#">Audi</a>
                <a href="#">Service</a>
              </p>
            </div>
          </div>
          <div class="single-widgets sidebar-banner" v-if="topPromotionalCar">
            <div class="product-content">
              <div class="text">
                <h4><a href="#">{{ topPromotionalCar.brand.brand_name }} <span>( {{ topPromotionalCar.model.model_name
                      }})</span></a></h4>
                <h6>Pour l'offre d'été</h6>
              </div>
              <div class="offer-batch">
                <h3>{{ Math.round(topPromotionalCar.promotion.discount_percentage) }}%</h3>
                <span>Rabais</span>
              </div>
            </div>
            <div class="product-img">
              <img
                :src="topPromotionalCar.images.find(img => img.is_primary)?.image_url || 'assets/img/inner-page/sb-banner-img.png'"
                alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Blog Standard section -->

</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogDetailsApp',

  data() {
    return {
      blog: null, // Blog principal (détail)
      blogs: [], // Blogs récents
      categories: [],
      topPromotionalCar: null,
      currentPage: 1,
      totalPages: 1,
      currentRecentIndex: 0,
      loading: false, // Pour le blog principal
      recentBlogsLoading: false, // Pour les blogs récents
      error: null,
      // Nouvelles données pour les tags et le partage
      availableTags: [], // Sera chargé depuis l'API
      shareUrl: '',
      shareTitle: '',
      shareDescription: '',
      copySuccess: false, // Pour afficher le message de confirmation
      // Navigation entre articles
      prevPost: null,
      nextPost: null,
      navigationLoading: false
    }
  },

  computed: {
    currentRecentBlog() {
      return this.blogs[this.currentRecentIndex] || {};
    },

    // Computed pour les tags du blog actuel
    blogTags() {
      if (!this.blog || !this.blog.tags || !Array.isArray(this.blog.tags)) {
        return [];
      }
      return this.blog.tags;
    },

    // URL complète pour le partage
    fullShareUrl() {
      return window.location.href;
    }
  },

  mounted() {
    this.fetchBlogDetails();
    this.fetchBlogs(); // Récupérer les blogs récents
    this.fetchPromotionalCars();
    this.fetchAllTags(); // Récupérer tous les tags depuis l'API
    this.fetchNavigationPosts(); // Récupérer les articles précédent/suivant
    this.initializeShareData();

    // Debug: vérifier l'état initial
    // console.log('État initial availableTags:', this.availableTags, 'Type:', typeof this.availableTags);
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.fetchBlogDetails()
        this.fetchNavigationPosts() // Recharger la navigation
        this.initializeShareData()
      },
      immediate: false
    },

    // Watcher pour mettre à jour les données de partage quand le blog change
    blog: {
      handler(newBlog) {
        if (newBlog) {
          this.updateShareData();
        }
      },
      deep: true
    }
  },

  methods: {
    async fetchBlogDetails() {
      this.loading = true
      this.error = null

      try {
        const blogId = this.$route.params.id

        if (!blogId) {
          throw new Error('ID du blog manquant')
        }

        // console.log('ID du blog:', blogId)

        const response = await axios.get(`http://127.0.0.1:8000/api/fr/blogs/post/${blogId}`)
        // console.log('Réponse API:', response.data)

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error('Aucune donnée reçue de l\'API')
        }

        // Gérer la structure de réponse avec "0" comme clé
        if (response.data["0"]) {
          this.blog = response.data["0"]
        } else if (response.data.data) {
          this.blog = response.data.data[0] || response.data.data
        } else {
          this.blog = response.data[0] || response.data
        }

        // console.log('Blog récupéré:', this.blog)

        if (!this.blog) {
          throw new Error('Blog non trouvé')
        }

        // Mettre à jour les données de partage après avoir récupéré le blog
        this.updateShareData();

      } catch (error) {
        console.error('Erreur lors du chargement du blog:', error)

        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.error = 'Article non trouvé'
              break
            case 500:
              this.error = 'Erreur serveur. Veuillez réessayer plus tard.'
              break
            default:
              this.error = `Erreur ${error.response.status}: ${error.response.statusText}`
          }
        } else if (error.request) {
          this.error = 'Problème de connexion. Vérifiez votre connexion internet.'
        } else {
          this.error = error.message || 'Une erreur inattendue s\'est produite'
        }

        this.blog = null
      } finally {
        this.loading = false
      }
    },

    navigateToBlog(blog) {
      if (blog && blog.blog_post_id) {
        this.$router.push(`/detailsBlog/${blog.blog_post_id}`);
      }
    },

    async fetchBlogs(page = 1) {
      this.recentBlogsLoading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/fr/blogs/recentBlogs?page=${page}`);
        this.blogs = response.data.data;
        this.currentPage = response.data.pagination.current_page;
        this.totalPages = response.data.pagination.last_page;

        // Réinitialiser l'index si nécessaire
        if (this.currentRecentIndex >= this.blogs.length) {
          this.currentRecentIndex = 0;
        }

        this.extractCategories();
      } catch (error) {
        console.error('Erreur lors du chargement des blogs récents:', error);
        this.blogs = [];
      } finally {
        this.recentBlogsLoading = false;
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
      if (this.blogs.length === 0) return;

      if (this.currentRecentIndex < this.blogs.length - 1) {
        this.currentRecentIndex++;
      } else {
        // Si on est à la fin, charger la page suivante ou revenir au début
        if (this.currentPage < this.totalPages) {
          this.fetchBlogs(this.currentPage + 1);
          this.currentRecentIndex = 0;
        } else {
          this.currentRecentIndex = 0;
        }
      }
    },

    prevRecentBlog() {
      if (this.blogs.length === 0) return;

      if (this.currentRecentIndex > 0) {
        this.currentRecentIndex--;
      } else {
        // Si on est au début, charger la page précédente ou aller à la fin
        if (this.currentPage > 1) {
          this.fetchBlogs(this.currentPage - 1);
          this.$nextTick(() => {
            this.currentRecentIndex = this.blogs.length - 1;
          });
        } else {
          this.currentRecentIndex = this.blogs.length - 1;
        }
      }
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
    },

    // Nouvelle méthode pour récupérer tous les tags depuis l'API
    async fetchAllTags() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fr/blogs/tags');

        // Vérifier la structure de la réponse
        let tags = [];
        if (response.data.data && Array.isArray(response.data.data)) {
          tags = response.data.data;
        } else if (Array.isArray(response.data)) {
          tags = response.data;
        } else {
          console.warn('Structure de réponse inattendue pour les tags:', response.data);
          tags = [];
        }

        this.availableTags = tags;
        // console.log('Tags récupérés:', this.availableTags);
      } catch (error) {
        console.error('Erreur lors du chargement des tags:', error);
        this.availableTags = []; // S'assurer que c'est toujours un tableau
      }
    },

    formatDate(dateString) {
      if (!dateString) return ''

      try {
        return new Date(dateString).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Erreur de formatage de date:', error)
        return dateString
      }
    },

    // Nouvelles méthodes pour les tags et le partage

    initializeShareData() {
      this.shareUrl = window.location.href;
    },

    updateShareData() {
      if (this.blog) {
        this.shareTitle = this.blog.meta_title || this.blog.title || 'Article de blog';
        this.shareDescription = this.blog.meta_description || this.blog.excerpt || 'Découvrez cet article intéressant';
        this.shareUrl = window.location.href;
      }
    },

    // Méthodes de partage social
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
      this.openShareWindow(url);
    },

    shareOnTwitter() {
      const text = `${this.shareTitle} - ${this.shareDescription}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`;
      this.openShareWindow(url);
    },

    shareOnLinkedIn() {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl)}`;
      this.openShareWindow(url);
    },

    shareOnWhatsApp() {
      const text = `${this.shareTitle} ${this.shareUrl}`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      this.openShareWindow(url);
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.shareUrl).then(() => {
        this.copySuccess = true;
        // Masquer le message après 2 secondes
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        // Fallback pour les navigateurs plus anciens
        alert('Lien copié: ' + this.shareUrl);
      });
    },

    openShareWindow(url) {
      window.open(url, 'shareWindow', 'width=600,height=400,scrollbars=yes,resizable=yes');
    },

    // Méthodes pour les tags
    navigateToTag(tag) {
      if (tag && tag.slug) {
        this.$router.push(`/blogs/tag/${tag.slug}`);
      }
    },

    getTagColor(tagName) {
      // Vérifier que availableTags est un tableau
      if (!Array.isArray(this.availableTags)) {
        console.warn('availableTags n\'est pas un tableau:', this.availableTags);
        return '#6c757d'; // Couleur par défaut
      }

      const tag = this.availableTags.find(t =>
        t && t.name && t.name.toLowerCase() === tagName.toLowerCase()
      );

      // Couleurs par défaut basées sur l'ID ou le nom si pas de couleur dans la BDD
      const defaultColors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'];

      if (tag && tag.color) {
        return tag.color;
      } else if (tag && tag.blog_tag_id) {
        return defaultColors[tag.blog_tag_id % defaultColors.length];
      } else {
        // Couleur basée sur le hash du nom du tag
        const hash = tagName.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        return defaultColors[Math.abs(hash) % defaultColors.length];
      }
    },

    // Méthode pour filtrer les blogs par tag
    async filterBlogsByTag(tagSlug) {
      this.recentBlogsLoading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/fr/blogs/tag/${tagSlug}`);
        this.blogs = response.data.data || [];
        this.currentRecentIndex = 0;
        // console.log(`Blogs filtrés par tag ${tagSlug}:`, this.blogs);
      } catch (error) {
        console.error('Erreur lors du filtrage par tag:', error);
        this.blogs = [];
      } finally {
        this.recentBlogsLoading = false;
      }
    },

    // Méthode pour récupérer les blogs par catégorie (bonus)
    async filterBlogsByCategory(categoryId) {
      this.recentBlogsLoading = true;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/fr/blogs/category/${categoryId}`);
        this.blogs = response.data.data || [];
        this.currentRecentIndex = 0;
        // console.log(`Blogs filtrés par catégorie ${categoryId}:`, this.blogs);
      } catch (error) {
        console.error('Erreur lors du filtrage par catégorie:', error);
        this.blogs = [];
      } finally {
        this.recentBlogsLoading = false;
      }
    },

    // Méthode alternative pour récupérer les articles précédent/suivant
    async fetchNavigationPosts() {
      this.navigationLoading = true;
      try {
        const blogId = parseInt(this.$route.params.id);
        if (!blogId) return;

        // Récupérer tous les blogs pour déterminer la navigation
        const response = await axios.get('http://127.0.0.1:8000/api/fr/blogs/recentBlogs?page=1&per_page=100');

        if (response.data && response.data.data) {
          const allBlogs = response.data.data;

          // Trouver l'index du blog actuel
          const currentIndex = allBlogs.findIndex(blog => blog.blog_post_id === blogId);

          if (currentIndex !== -1) {
            // Article précédent (index plus grand = plus récent, donc précédent = index + 1)
            this.prevPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

            // Article suivant (index plus petit = plus ancien, donc suivant = index - 1)
            this.nextPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
          } else {
            // Si l'article actuel n'est pas trouvé, essayer avec une approche basée sur l'ID
            this.prevPost = allBlogs.find(blog => blog.blog_post_id === blogId - 1) || null;
            this.nextPost = allBlogs.find(blog => blog.blog_post_id === blogId + 1) || null;
          }
        }

        // console.log('Navigation récupérée:', {
        //   currentId: blogId,
        //   prev: this.prevPost?.blog_post_id,
        //   next: this.nextPost?.blog_post_id
        // });

      } catch (error) {
        console.error('Erreur lors du chargement de la navigation:', error);

        // Méthode de fallback: essayer de récupérer les articles adjacents directement
        try {
          await this.fetchAdjacentPosts(parseInt(this.$route.params.id));
        } catch (fallbackError) {
          console.error('Erreur fallback navigation:', fallbackError);
          this.prevPost = null;
          this.nextPost = null;
        }
      } finally {
        this.navigationLoading = false;
      }
    },

    // Méthode de fallback pour récupérer les articles adjacents
    async fetchAdjacentPosts(currentId) {
      const promises = [];

      // Essayer de récupérer l'article précédent (ID - 1)
      if (currentId > 1) {
        promises.push(
          axios.get(`http://127.0.0.1:8000/api/fr/blogs/post/${currentId - 1}`)
            .then(response => {
              if (response.data && (response.data["0"] || response.data.data)) {
                this.prevPost = response.data["0"] || response.data.data[0] || response.data.data;
              }
            })
            .catch(() => {
              this.prevPost = null;
            })
        );
      }

      // Essayer de récupérer l'article suivant (ID + 1)
      promises.push(
        axios.get(`http://127.0.0.1:8000/api/fr/blogs/post/${currentId + 1}`)
          .then(response => {
            if (response.data && (response.data["0"] || response.data.data)) {
              this.nextPost = response.data["0"] || response.data.data[0] || response.data.data;
            }
          })
          .catch(() => {
            this.nextPost = null;
          })
      );

      await Promise.all(promises);
    },

    // Méthode pour tronquer le titre
    truncateTitle(title, maxLength = 60) {
      if (!title) return '';
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength).trim() + '...';
    }
  }
}
</script>