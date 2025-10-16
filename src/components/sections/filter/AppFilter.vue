<template>
    <div class="product-search-area mb-100">
        <div class="container">
            <!-- Simple 4-Column Filter -->
            <form @submit.prevent="handleSearch">
                <div class="row row-cols-xl-4 row-cols-md-2 row-cols-1 g-3 justify-content-center">
                    <div class="col">
                        <div class="form-inner">
                            <label>Sélectionner la ville</label>
                            <select v-model="filters.city_name" @change="onCityChange" class="form-control">
                                <option value="">Toutes les villes</option>
                                <option v-for="city in allCities" :key="`city-${city.car_city_id}`" :value="city.city_name">
                                    {{ city.city_name }} ({{ city.cars_count || 0 }})
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-inner">
                            <label>Sélectionner la marque</label>
                            <select v-model="filters.brand_name" @change="onBrandChange" class="form-control">
                                <option value="">Toutes les marques</option>
                                <option v-for="brand in allBrands" :key="`brand-${brand.car_brand_id}`" :value="brand.brand_name">
                                    {{ brand.brand_name }} ({{ brand.cars_count || 0 }})
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-inner">
                            <label>Sélectionner le modèle</label>
                            <select v-model="filters.model_name" @change="handleFilterChange" :disabled="!filters.brand_name" class="form-control">
                                <option value="">Tous les modèles</option>
                                <option v-for="model in availableModels" :key="`model-${model.id || model.car_model_id}`" :value="model.model_name">
                                    {{ model.model_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col d-flex align-items-end">
                        <div class="form-inner w-100">
                            
                            <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                                <i class="fas fa-search"></i>
                                {{ loading ? 'Recherche...' : 'Rechercher' }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            
        </div>
    </div>

    <!-- Search Results Section -->
    <div v-if="displayCars.length > 0" class="single-category-page mb-100">
        <div class="container">
            <div class="row mb-50">
                <div class="col-lg-12">
                    <div class="section-title-2 text-center">
                        <h2>{{ hasActiveFilters ? 'Résultats de recherche' : 'Toutes les voitures disponibles' }}</h2>
                        <p>
                            {{ hasActiveFilters
                                ? displayCars.length
                                : (paginationMeta.total ?? displayCars.length) }} voitures trouvées
                        </p>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center g-4">
                <div v-for="car in displayCars" :key="`car-${car.car_id}-${filterKey}`" class="col-xl-3 col-md-4 col-sm-6">
                    <CarCard :car="car" />
                </div>
            </div>
            <!-- Pagination Controls (only when no filters) -->
            <div v-if="!hasActiveFilters && paginationMeta.total > perPage" class="row mt-4">
                <div class="col-12 d-flex justify-content-center align-items-center flex-wrap gap-2">
                    <button class="btn btn-outline-secondary" :disabled="currentPage === 1" @click="firstPage">« Première</button>
                    <button class="btn btn-outline-secondary" :disabled="currentPage === 1" @click="prevPage">‹ Précédent</button>

                    <button
                        v-for="p in pagesToShow"
                        :key="`p-${p}`"
                        class="btn"
                        :class="p === currentPage ? 'btn-primary' : 'btn-outline-secondary'"
                        @click="goToPage(p)"
                        :disabled="p === currentPage"
                    >
                        {{ p }}
                    </button>

                    <button class="btn btn-outline-secondary" :disabled="currentPage >= (paginationMeta.last_page || 1)" @click="nextPage">Suivant ›</button>
                    <button class="btn btn-outline-secondary" :disabled="currentPage >= (paginationMeta.last_page || 1)" @click="lastPage">Dernière »</button>
                </div>
            </div>
        </div>
    </div>

    <!-- No Results -->
    <div v-else-if="hasActiveFilters && !loading" class="no-results">
        <div class="container text-center py-5">
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h3>Aucune voiture trouvée</h3>
            <p>Essayez d'ajuster vos filtres pour voir plus de résultats.</p>
            <button @click="clearAllFilters" class="btn btn-primary">Effacer tous les filtres</button>
        </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
        <div class="container text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-3">Recherche en cours...</p>
        </div>
    </div>
</template>

<script>
import CarCard from './CarCard.vue'

export default {
    name: 'BrowseUsedCar',
    components: {
        CarCard
    },
    data() {
        return {
            topCities: [],
            allCars: [],
            filteredCars: [],
            allBrands: [],
            allCities: [],
            allColors: [],
            allFuelTypes: [],
            availableModels: [],
            loading: false,
            searchTimeout: null,
            showAdvancedFilters: false,
            isSearching: false,
            filterKey: 0, // Force re-render key
            routeSyncInProgress: false,
            // Pagination state for unfiltered listing
            currentPage: 1,
            perPage: 10,
            paginationMeta: { total: 0, last_page: 1 },
            filters: {
                city_name: '',
                brand_name: '',
                model_name: '',
                color_name: '',
                fuel_type_name: '',
                price_from: null,
                price_to: null,
                year_from: null,
                year_to: null,
                on_promotion: false
            },
            apiBaseUrl: 'http://127.0.0.1:8000/api/fr/cars' // Changed to French
        };
    },
    computed: {
        hasActiveFilters() {
            return Object.values(this.filters).some(value => 
                value !== '' && value !== false && value !== null
            );
        },
        
        displayCars() {
            return this.hasActiveFilters ? this.filteredCars : this.allCars;
        },
        pagesToShow() {
            // Build a compact range of page numbers around current page
            const total = this.paginationMeta.last_page || 1;
            const current = this.currentPage;
            const radius = 2; // pages before/after current
            const pages = [];
            const start = Math.max(1, current - radius);
            const end = Math.min(total, current + radius);
            // Ensure at least 5 buttons when possible
            let s = start;
            let e = end;
            while (e - s + 1 < Math.min(5, total)) {
                if (s > 1) s--;
                else if (e < total) e++;
                else break;
            }
            for (let i = s; i <= e; i++) pages.push(i);
            return pages;
        }
    },
    mounted() {
        this.fetchInitialData().then(() => {
            this.processQueryParams();
        });
    },
    watch: {
        '$route.query': {
            handler() {
                // Avoid reacting to our own programmatic updates
                if (this.routeSyncInProgress) {
                    this.routeSyncInProgress = false;
                    return;
                }
                this.processQueryParams();
            },
            deep: true
        }
    },
    beforeUnmount() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    },
    methods: {
        processQueryParams() {
            const { Brand, Model, City } = this.$route.query || {};

            let shouldSearch = false;

            // Brand
            if (typeof Brand === 'string' && Brand.length > 0) {
                const brandValue = decodeURIComponent(Brand);
                if (brandValue.toLowerCase() === 'all') {
                    // Clear brand filter when 'all'
                    if (this.filters.brand_name !== '') {
                        shouldSearch = true;
                    }
                    this.filters.brand_name = '';
                    this.availableModels = [];
                } else {
                    if (this.filters.brand_name !== brandValue) {
                        shouldSearch = true;
                    }
                    this.filters.brand_name = brandValue;
                    // If we already have brands loaded, attempt to fetch models
                    const selectedBrand = this.allBrands.find(b => b.brand_name === brandValue);
                    if (selectedBrand) {
                        this.fetchModelsByBrand(selectedBrand.car_brand_id);
                    }
                }
            }

            // Model
            if (typeof Model === 'string' && Model.length > 0) {
                const modelValue = decodeURIComponent(Model);
                if (this.filters.model_name !== modelValue) {
                    shouldSearch = true;
                }
                this.filters.model_name = modelValue;
            }

            // City
            if (typeof City === 'string' && City.length > 0) {
                const cityValue = decodeURIComponent(City);
                if (this.filters.city_name !== cityValue) {
                    shouldSearch = true;
                }
                this.filters.city_name = cityValue;
            }

            // Additional filters (lowercase keys in URL)
            const q = this.$route.query || {};
            const strOrEmpty = (v) => (typeof v === 'string' ? v : '');
            const numOrNull = (v) => (v !== undefined ? Number(v) : null);
            const boolOrFalse = (v) => (v === 'true' || v === true);

            const colorQ = strOrEmpty(q.color_name);
            if (colorQ !== '' && colorQ !== this.filters.color_name) { this.filters.color_name = colorQ; shouldSearch = true; }
            const fuelQ = strOrEmpty(q.fuel_type_name);
            if (fuelQ !== '' && fuelQ !== this.filters.fuel_type_name) { this.filters.fuel_type_name = fuelQ; shouldSearch = true; }
            const pf = q.price_from !== undefined ? numOrNull(q.price_from) : null;
            if (pf !== null && pf !== this.filters.price_from) { this.filters.price_from = pf; shouldSearch = true; }
            const pt = q.price_to !== undefined ? numOrNull(q.price_to) : null;
            if (pt !== null && pt !== this.filters.price_to) { this.filters.price_to = pt; shouldSearch = true; }
            const yf = q.year_from !== undefined ? numOrNull(q.year_from) : null;
            if (yf !== null && yf !== this.filters.year_from) { this.filters.year_from = yf; shouldSearch = true; }
            const yt = q.year_to !== undefined ? numOrNull(q.year_to) : null;
            if (yt !== null && yt !== this.filters.year_to) { this.filters.year_to = yt; shouldSearch = true; }
            const promo = (q.on_promotion !== undefined) ? boolOrFalse(q.on_promotion) : false;
            if (promo !== this.filters.on_promotion) { this.filters.on_promotion = promo; shouldSearch = true; }

            if (shouldSearch) {
                this.handleSearch();
            }

            // Pagination query params (only applied when no filters are active)
            const pageQ = q.page !== undefined ? Number(q.page) : null;
            const perPageQ = q.per_page !== undefined ? Number(q.per_page) : null;
            const noFilters = !this.hasActiveFilters;
            if (noFilters) {
                let needFetch = false;
                if (pageQ !== null && !Number.isNaN(pageQ) && pageQ > 0 && pageQ !== this.currentPage) {
                    this.currentPage = pageQ;
                    needFetch = true;
                }
                if (perPageQ !== null && !Number.isNaN(perPageQ) && perPageQ > 0 && perPageQ !== this.perPage) {
                    this.perPage = Math.min(Math.max(perPageQ, 1), 50);
                    needFetch = true;
                }
                if (needFetch) {
                    this.fetchPaginatedCars(this.currentPage);
                }
            }
        },
        updateRouteQueryFromFilters() {
            const current = { ...(this.$route.query || {}) };
            const next = {};

            // Backward-compatible capitalized keys
            if (this.filters.brand_name) next.Brand = this.filters.brand_name;
            if (this.filters.model_name) next.Model = this.filters.model_name;
            if (this.filters.city_name) next.City = this.filters.city_name;

            // Additional filters with lowercase keys
            if (this.filters.color_name) next.color_name = this.filters.color_name;
            if (this.filters.fuel_type_name) next.fuel_type_name = this.filters.fuel_type_name;
            if (this.filters.price_from !== null) next.price_from = String(this.filters.price_from);
            if (this.filters.price_to !== null) next.price_to = String(this.filters.price_to);
            if (this.filters.year_from !== null) next.year_from = String(this.filters.year_from);
            if (this.filters.year_to !== null) next.year_to = String(this.filters.year_to);
            if (this.filters.on_promotion) next.on_promotion = 'true';

            // When no filters are active, reflect pagination in URL
            if (!this.hasActiveFilters) {
                next.page = String(this.currentPage);
                // Removed per_page from URL but keeping it in the API request
            }

            // Only push if changed
            if (JSON.stringify(current) === JSON.stringify(next)) return;
            this.routeSyncInProgress = true;
            this.$router.replace({ query: next }).catch(() => { /* ignore */ });
        },
        async fetchInitialData() {
            this.loading = true;
            try {
                await Promise.all([
                    this.fetchTopCities(),
                    this.fetchPaginatedCars(this.currentPage),
                    this.fetchFilterOptions()
                ]);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchTopCities() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/topCiteis`);
                const data = await response.json();
                if (data.success && Array.isArray(data.top_cities)) {
                    this.topCities = data.top_cities;
                }
            } catch (error) {
                console.error('Failed to load top cities:', error);
                this.topCities = [];
            }
        },

        async fetchPaginatedCars(page = 1) {
            try {
                const url = new URL(`${this.apiBaseUrl}/paginate`);
                url.searchParams.set('page', String(page));
                url.searchParams.set('per_page', String(this.perPage));
                const response = await fetch(url.toString());
                const data = await response.json();
                if (data.success && data.data && Array.isArray(data.data.data)) {
                    // Laravel paginator: { data: [...], current_page, last_page, total }
                    this.allCars = data.data.data;
                    this.currentPage = data.data.current_page || page;
                    this.paginationMeta = {
                        total: data.data.total || this.allCars.length,
                        last_page: data.data.last_page || 1
                    };
                } else if (data.success && data.data && Array.isArray(data.data)) {
                    // Fallback if API returns a simple array
                    this.allCars = data.data;
                    this.paginationMeta = { total: data.data.length, last_page: 1 };
                } else {
                    this.allCars = [];
                    this.paginationMeta = { total: 0, last_page: 1 };
                }
                this.filterKey++;
            } catch (error) {
                console.error('Failed to load paginated cars:', error);
                this.allCars = [];
                this.paginationMeta = { total: 0, last_page: 1 };
            }
        },

        async goToPage(page) {
            if (page < 1 || page > (this.paginationMeta.last_page || 1)) return;
            this.loading = true;
            await this.fetchPaginatedCars(page);
            this.loading = false;
            this.updateRouteQueryFromFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        nextPage() { this.goToPage(this.currentPage + 1); },
        prevPage() { this.goToPage(this.currentPage - 1); },
        firstPage() { this.goToPage(1); },
        lastPage() { this.goToPage(this.paginationMeta.last_page || 1); },

        async fetchFilterOptions() {
            try {
                // Fetch brands
                const brandsResponse = await fetch(`${this.apiBaseUrl}/brands`);
                const brandsData = await brandsResponse.json();
                if (brandsData.success && Array.isArray(brandsData.data)) {
                    this.allBrands = brandsData.data;
                }

                // Fetch cities for filter
                const citiesResponse = await fetch(`${this.apiBaseUrl}/topCities`);
                const citiesData = await citiesResponse.json();
                if (citiesData.success && Array.isArray(citiesData.data)) {
                    this.allCities = citiesData.data;
                }
            } catch (error) {
                console.error('Failed to load filter options:', error);
            }
        },

        async onBrandChange() {
            // Reset model when brand changes
            this.filters.model_name = '';
            this.availableModels = [];
            
            if (this.filters.brand_name) {
                // Constrain cities to those that have this brand
                try {
                    const url = `${this.apiBaseUrl}/cities-by-brand?brand_name=${encodeURIComponent(this.filters.brand_name)}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data && data.success && Array.isArray(data.data)) {
                        this.allCities = data.data;
                        // If current city not in list anymore, clear it
                        if (this.filters.city_name && !this.allCities.some(c => c.city_name === this.filters.city_name)) {
                            this.filters.city_name = '';
                        }
                    }
                } catch (e) {
                    console.warn('Failed to fetch cities-by-brand', e);
                }
            }
            
            this.updateRouteQueryFromFilters();
            this.debouncedSearch();
        },

        async onCityChange() {
            // When city changes, reset brand/model and constrain brands to the city
            this.filters.brand_name = '';
            this.filters.model_name = '';
            this.availableModels = [];
            // Immediately reflect city change in URL before async calls
            this.updateRouteQueryFromFilters();
            try {
                if (this.filters.city_name) {
                    const url = `${this.apiBaseUrl}/brands-by-city?city_name=${encodeURIComponent(this.filters.city_name)}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data && data.success && Array.isArray(data.data)) {
                        this.allBrands = data.data;
                    } else {
                        this.allBrands = [];
                    }
                } else {
                    // No city selected: load all brands again
                    const brandsResponse = await fetch(`${this.apiBaseUrl}/brands`);
                    const brandsData = await brandsResponse.json();
                    this.allBrands = (brandsData.success && Array.isArray(brandsData.data)) ? brandsData.data : [];
                }
            } catch (e) {
                console.warn('Failed to fetch brands-by-city', e);
            }
            this.debouncedSearch();
        },

        async fetchModelsByBrand(brandId) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/models/${brandId}`);
                const data = await response.json();
                if (data.success && Array.isArray(data.data) && data.data.length) {
                    this.availableModels = data.data;
                } else {
                    // Fallback: try to infer models from allCars for the selected brand
                    console.warn('Models API returned empty, falling back to derive from allCars');
                    const modelsSet = new Map();
                    this.allCars
                        .filter(c => c.brand && c.brand.brand_name === this.filters.brand_name && c.model)
                        .forEach(c => {
                            const key = c.model.model_name;
                            if (key && !modelsSet.has(key)) {
                                modelsSet.set(key, { id: c.model.car_model_id || c.model.id, model_name: c.model.model_name });
                            }
                        });
                    this.availableModels = Array.from(modelsSet.values());
                }
            } catch (error) {
                console.error('Failed to load models:', error);
                // Fallback on error as well
                const modelsSet = new Map();
                this.allCars
                    .filter(c => c.brand && c.brand.brand_name === this.filters.brand_name && c.model)
                    .forEach(c => {
                        const key = c.model.model_name;
                        if (key && !modelsSet.has(key)) {
                            modelsSet.set(key, { id: c.model.car_model_id || c.model.id, model_name: c.model.model_name });
                        }
                    });
                this.availableModels = Array.from(modelsSet.values());
            }
        },

        handleFilterChange() {
            this.updateRouteQueryFromFilters();
            this.debouncedSearch();
        },

        debouncedSearch() {
            // Clear existing timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            // Only auto-search if we have active filters
            if (this.hasActiveFilters) {
                this.searchTimeout = setTimeout(() => {
                    this.searchCars();
                }, 800); // Increased debounce time
            }
        },

        async handleSearch() {
            // Clear any pending timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            await this.searchCars();
        },

        async searchCars() {
            // Prevent multiple simultaneous searches
            if (this.isSearching) {
                return;
            }

            if (!this.hasActiveFilters) {
                this.filteredCars = [];
                this.filterKey++; // Force re-render
                return;
            }

            this.isSearching = true;
            this.loading = true;
            
            try {
                const params = new URLSearchParams();
                
                // Add non-empty filters to params
                Object.keys(this.filters).forEach(key => {
                    if (this.filters[key] !== '' && this.filters[key] !== false && this.filters[key] !== null) {
                        params.append(key, this.filters[key]);
                    }
                });

                const response = await fetch(`${this.apiBaseUrl}/filter-by-brand?${params.toString()}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('API Response:', JSON.parse(JSON.stringify(data))); // Log the raw API response
                
                if (data.success && data.data) {
                    // Extract data from response
                    const cars = data.data.cars || [];
                    const brands = data.data.brands || [];
                    const models = data.data.models || [];
                    const cities = data.data.cities || [];
                    const colors = data.data.colors || [];
                    const categories = data.data.categories || [];
                    const fuelTypes = data.data.fuel_types || [];
                    
                    // Update filter options for advanced filters
                    if (colors.length > 0) this.allColors = colors;
                    if (fuelTypes.length > 0) this.allFuelTypes = fuelTypes;
                    
                    // When a brand is selected, set availableModels from the models facet of the filtered response
                    if (this.filters.brand_name) {
                        const mapped = (models || []).map(m => ({ id: m.car_model_id || m.id, model_name: m.model_name }));
                        // Deduplicate by name, keep stable order
                        const seen = new Set();
                        this.availableModels = mapped.filter(m => {
                            const key = (m.model_name || '').toLowerCase().trim();
                            if (!key || seen.has(key)) return false;
                            seen.add(key);
                            return true;
                        });
                        // If current model no longer valid under current filters, clear it
                        if (this.filters.model_name && !this.availableModels.some(m => m.model_name === this.filters.model_name)) {
                            this.filters.model_name = '';
                        }
                    } else {
                        this.availableModels = [];
                    }
                    
                    // Map the car data with full relationship data
                    this.filteredCars = cars.map(car => {
                        const brand = brands.find(b => b.car_brand_id === car.brand_id);
                        const model = models.find(m => m.car_model_id === car.model_id);
                        const city = cities.find(c => c.car_city_id === car.city_id);
                        const color = colors.find(col => col.car_color_id === car.color_id);
                        const category = categories.find(cat => cat.car_category_id === car.category_id);
                        const fuelType = fuelTypes.find(ft => ft.car_fuel_type_id === car.fuel_type_id);
                        
                        // Determine the price, with fallbacks
                        const originalPrice = car.original_price ?? car.price ?? 0;
                        const currentPrice = car.current_price ?? car.price ?? originalPrice;
                        const isOnPromotion = (car.promotion?.is_on_promotion || car.is_on_promotion) && currentPrice < originalPrice;
                        
                        // Log the price data for debugging
                        console.log('Car ID:', car.car_id || car.id);
                        console.log('Original Price:', originalPrice);
                        console.log('Current Price:', currentPrice);
                        console.log('Is on promotion:', isOnPromotion);
                        console.log('Car object:', car);
                        
                        return {
                            ...car,
                            brand: brand || { brand_name: 'Marque inconnue', logo_url: null },
                            model: model || { model_name: 'Modèle inconnu' },
                            city: city || { city_name: 'Ville inconnue' },
                            color: color || { color_name: 'Couleur inconnue' },
                            category: category || { category_name: 'Catégorie inconnue' },
                            fuelType: fuelType || { fuel_type_name: 'Carburant inconnu' },
                            // Handle promotion data
                            promotion: isOnPromotion ? {
                                is_on_promotion: true,
                                current_price: currentPrice,
                                original_price: originalPrice,
                                discount_percentage: car.discount_percentage || 
                                    Math.round(((originalPrice - currentPrice) / originalPrice) * 100),
                                days_remaining: car.days_remaining || 0,
                                savings: originalPrice - currentPrice
                            } : {
                                is_on_promotion: false,
                                current_price: currentPrice,
                                original_price: originalPrice
                            },
                            // Ensure we have image data
                            images: car.images || (car.image_url ? [{ image_url: car.image_url }] : []),
                            // Ensure price is available
                            price: currentPrice,
                            // Ensure these are at the root level for backward compatibility
                            current_price: currentPrice,
                            original_price: originalPrice,
                            is_on_promotion: isOnPromotion
                        };
                    });
                    
                    console.log('Processed Cars:', JSON.parse(JSON.stringify(this.filteredCars))); // Log the processed car data
                    
                    this.filterKey++; // Force re-render
                } else {
                    console.error('API returned error or no data:', data);
                    this.filteredCars = [];
                }
            } catch (error) {
                console.error('Search failed:', error);
                this.filteredCars = [];
            } finally {
                this.loading = false;
                this.isSearching = false;
            }
        },
        
        toggleAdvancedFilters() {
            this.showAdvancedFilters = !this.showAdvancedFilters;
        },
        
        clearAllFilters() {
            // Clear timeout first
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            this.filters = {
                city_name: '',
                brand_name: '',
                model_name: '',
                color_name: '',
                fuel_type_name: '',
                price_from: null,
                price_to: null,
                year_from: null,
                year_to: null,
                on_promotion: false
            };
            this.availableModels = [];
            this.filteredCars = [];
            this.filterKey++; // Force re-render
            this.updateRouteQueryFromFilters();
            // Reload paginated cars
            this.currentPage = 1;
            this.fetchPaginatedCars(1);
        }
    }
};
</script>

<style scoped>
.form-inner {
    margin-bottom: 0;
}

.form-inner label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

.form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-control:disabled {
    background-color: #f8f9fa;
    opacity: 0.6;
}

.btn {
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-primary {
    background: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
    border-color: #0056b3;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-outline-primary {
    background: transparent;
    border-color: #007bff;
    color: #007bff;
}

.btn-outline-primary:hover {
    background: #007bff;
    color: white;
}

.btn-outline-secondary {
    background: transparent;
    border-color: #6c757d;
    color: #6c757d;
}

.btn-outline-secondary:hover {
    background: #6c757d;
    color: white;
}

.advanced-filters .card {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.advanced-filters .card-header {
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 15px 20px;
}

.advanced-filters .card-body {
    padding: 20px;
}

.form-check {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}

.form-check-input {
    margin: 0;
    width: 16px;
    height: 16px;
}

.form-check-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    margin: 0;
}

.no-results {
    padding: 60px 0;
}

.no-results i {
    opacity: 0.5;
}

.no-results h3 {
    color: #333;
    margin-bottom: 10px;
}

.no-results p {
    color: #666;
    margin-bottom: 20px;
}

.loading-state {
    padding: 60px 0;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.section-title-2 h2 {
    margin-bottom: 10px;
}

.nav-tabs .nav-link {
    position: relative;
    border-radius: 8px 8px 0 0;
    margin-right: 5px;
    transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
    background-color: #f8f9fa;
}

.nav-tabs .nav-link.active {
    background-color: var(--primary-color, #007bff);
    color: white;
    border-color: var(--primary-color, #007bff);
}

.browse-car-filter-area {
    margin-bottom: 30px;
}

.tab-content {
    padding-top: 20px;
}

.wow {
    visibility: hidden;
}

@media (max-width: 768px) {
    .row-cols-xl-4 > .col {
        margin-bottom: 15px;
    }
    
    .nav-tabs {
        flex-wrap: wrap;
    }
    
    .nav-tabs .nav-link {
        font-size: 14px;
        padding: 8px 12px;
        margin-bottom: 5px;
    }
    
    .advanced-filters .row > .col-md-3 {
        margin-bottom: 15px;
    }
}
</style>
