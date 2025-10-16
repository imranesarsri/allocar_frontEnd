<template>
    <div class="trusted-partner-section mb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="sub-title">
                        <h6>Nos partenaires de confiance</h6>
                        <div class="dash"></div>
                    </div>

                    <!-- Loading state -->
                    <div v-if="loading" class="text-center ad-loading-container">
                        <div class="ad-loading-spinner"></div>
                        <p class="ad-loading-text">Chargement des agences...</p>
                    </div>

                    <!-- Error state -->
                    <div v-else-if="error" class="text-center ad-error-container">
                        <div class="ad-error-icon">⚠️</div>
                        <p class="ad-error-message">{{ error }}</p>
                        <button @click="fetchAgencies" class="ad-retry-btn">Réessayer</button>
                    </div>

                    <!-- Agencies display -->
                    <div v-else class="ad-agencies-container">
                        

                        <!-- Agency counter -->
                        <div class="ad-agency-counter">
                            {{ agencies.length }} agence{{ agencies.length > 1 ? 's' : '' }} partenaire{{ agencies.length > 1 ? 's' : '' }}
                        </div>

                        <!-- Carousel View (default) -->
                        <div class="partner-slider">
                            <div class="ad-marquee-text">
                                <template v-for="agency in duplicatedAgencies" :key="`${agency.id}-${Math.random()}`">
                                    <div class="ad-agency-card-carousel">
                                        <a :href="`/agency/${agency.agency_id}`" class="ad-agency-link">
                                            <div class="ad-agency-logo-container">
                                                <img :src="agency.logo_url" :alt="getAgencyName(agency)" class="ad-agency-logo">
                                                <div class="ad-online-indicator"></div>
                                            </div>
                                            <div class="ad-agency-info">
                                                <div class="ad-agency-name-text">
                                                    {{ getAgencyName(agency) }}
                                                </div>
                                                <div v-if="agency.location" class="ad-agency-location">
                                                    📍 {{ agency.location }}
                                                </div>
                                            </div>
                                            <div class="ad-external-link-icon">↗</div>
                                        </a>
                                    </div>
                                </template>
                            </div>
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
    name: 'AgencyName',
    data() {
        return {
            agencies: [],
            loading: true,
            error: null,
        }
    },
    computed: {
        // Duplique les agences pour créer un effet de défilement continu
        duplicatedAgencies() {
            if (this.agencies.length === 0) return []
            // Duplique les agences 2 fois pour un défilement fluide
            return [...this.agencies, ...this.agencies]
        }
    },
    async mounted() {
        await this.fetchAgencies()
    },
    methods: {
        async fetchAgencies() {
            try {
                this.loading = true
                this.error = null
                // Remplacez '/api/agencies' par votre URL d'API complète
                const response = await axios.get('http://127.0.0.1:8000/api/agencies')
                
                if (response.data.success) {
                    // Adaptez cette ligne selon la structure de votre réponse API
                    // Si votre API retourne directement un tableau, utilisez response.data
                    // Si elle retourne un objet avec une propriété contenant les agences, adaptez
                    this.agencies = response.data.data || response.data.agencies || response.data
                } else {
                    this.error = response.data.message || 'Erreur lors du chargement des agences'
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des agences:', error)
                this.error = 'Impossible de charger les agences. Veuillez réessayer plus tard.'
            } finally {
                this.loading = false
            }
        },
        // Méthode pour obtenir le nom de l'agence
        getAgencyName(agency) {
            return agency.agency_name || agency.name || 'Agence sans nom'
        },
        goToAgencyDetails(agencyId) {
            this.$router.push({ 
                name: 'AgencyDetailsPage', 
                params: { id: agencyId } 
            })
        }
    }
}
</script>

<style scoped>
/* Loading States */
.ad-loading-container {
    padding: 3rem 0;
}

.ad-loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: ad-spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes ad-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.ad-loading-text {
    color: #666;
    font-size: 1.1rem;
}

/* Error States */
.ad-error-container {
    padding: 3rem 0;
}

.ad-error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.ad-error-message {
    color: #dc3545;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.ad-retry-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
}

.ad-retry-btn:hover {
    background: #0056b3;
}

/* Agency Counter */
.ad-agency-counter {
    text-align: center;
    margin-bottom: 2rem;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
}

/* Carousel View (Improved) */
.ad-marquee-text {
    display: flex;
    animation: ad-marquee 25s linear infinite;
    align-items: center;
    gap: 2rem;
}

.ad-marquee-text:hover {
    animation-play-state: paused;
}

.ad-agency-card-carousel {
    flex-shrink: 0;
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
    min-width: 280px;
}

.ad-agency-card-carousel:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.ad-agency-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
}

.ad-agency-logo-container {
    position: relative;
    flex-shrink: 0;
}

.ad-agency-logo {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid #f0f0f0;
}

.ad-online-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    background: #10b981;
    border: 3px solid white;
    border-radius: 50%;
}

.ad-agency-info {
    flex: 1;
    min-width: 0;
}

.ad-agency-name-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ad-agency-location {
    font-size: 0.85rem;
    color: #666;
}

.ad-external-link-icon {
    font-size: 1.2rem;
    color: #007bff;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.ad-agency-card-carousel:hover .ad-external-link-icon {
    opacity: 1;
}

@keyframes ad-marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .ad-agency-card-carousel {
        min-width: 250px;
    }
    
}
</style>
