<template>
    <div class="browse-used-car-section mt-100 mb-100">
        <div class="container">
            <div class="row mb-50 wow fadeInUp" data-wow-delay="200ms">
                <div class="col-lg-12">
                    <div class="section-title-2 text-center">
                        <h2>Agence</h2>
                        <p>Il y a plus de 30 catégories de marques disponibles</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <!-- Loading state -->
                    <div v-if="loading" class="text-center agency-loading-container">
                        <div class="agency-loading-spinner"></div>
                        <p class="agency-loading-text">Chargement des agences...</p>
                    </div>
                    <!-- Error state -->
                    <div v-else-if="error" class="text-center agency-error-container">
                        <div class="agency-error-icon">⚠️</div>
                        <p class="agency-error-message">{{ error }}</p>
                        <button @click="fetchAgencies" class="agency-retry-btn">Réessayer</button>
                    </div>
                    <!-- No results state -->
                    <div v-else-if="displayedAgencies.length === 0 && !loading" class="text-center">
                        <p>Aucune agence trouvée avec ces critères de recherche.</p>
                    </div>
                    <!-- Agencies Grid -->
                    <div v-else class="agencies-grid-container">
                        <!-- Agency counter -->
                        <div class="agency-counter">
                            {{ displayedAgencies.length }} agence{{ displayedAgencies.length > 1 ? 's' : '' }} disponible{{ displayedAgencies.length > 1 ? 's' : '' }}
                        </div>

                        <!-- Grid -->
                        <div class="agencies-grid">
                            <div v-for="agency in displayedAgencies" :key="agency.agency_id" class="agency-card">
                                <div class="agency-card-inner">
                                    <div class="agency-logo-container">
                                        <img :src="agency.logo_url || '/assets/img/default-agency-logo.jpg'" 
                                             :alt="agency.agency_name + ' logo'"
                                             @error="$event.target.src='/assets/img/default-agency-logo.jpg'"
                                             class="agency-logo">
                                    </div>
                                    
                                    <div class="agency-info">
                                        <h5 class="agency-name">{{ agency.agency_name }}</h5>
                                        <p v-if="agency.city" class="agency-city">
                                            <i class="fas fa-map-marker-alt"></i> {{ agency.city }}
                                        </p>
                                    </div>

                                    <button @click="goToAgencyDetails(agency.agency_id)" class="btn btn-primary btn-sm view-details-btn">
                                        Voir les détails
                                    </button>
                                </div>
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
    name: 'AppAgency',
    props: {
        nameFilter: {
            type: String,
            default: ''
        },
        cityFilter: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            agencies: [],
            loading: true,
            error: null
        }
    },
    computed: {
        displayedAgencies() {
            let filtered = this.agencies

            // Filter by agency name
            if (this.nameFilter) {
                filtered = filtered.filter(agency => {
                    const agencyName = agency.agency_name ? agency.agency_name.toLowerCase() : ''
                    const searchTerm = this.nameFilter.toLowerCase()
                    return agencyName.includes(searchTerm)
                })
            }

            // Filter by city
            if (this.cityFilter) {
                filtered = filtered.filter(agency => {
                    return agency.city && agency.city === this.cityFilter
                })
            }

            return filtered
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
                
                const response = await axios.get('http://127.0.0.1:8000/api/en/agencies')
                
                let agenciesData = []
                if (response.data && response.data.data) {
                    agenciesData = response.data.data
                } else {
                    agenciesData = response.data
                }
                
                // Store as reactive data
                this.agencies = agenciesData
                
                console.log('Sample agency:', agenciesData[0])
                
                // Emit clean data to parent
                this.$emit('agencies-loaded', agenciesData)
                
            } catch (error) {
                console.error('Erreur lors de la récupération des agences:', error)
                
                let errorMessage = 'Erreur lors de la requête: ' + error.message
                if (error.response) {
                    // Server responded with error status
                    errorMessage = `Erreur serveur: ${error.response.status} - ${error.response.statusText}`
                } else if (error.request) {
                    // Request was made but no response received
                    errorMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.'
                }
                
                this.error = errorMessage
                this.$emit('agencies-loaded', [])
            } finally {
                this.loading = false
            }
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
.agency-loading-container {
    padding: 3rem 0;
}

.agency-loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: agency-spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes agency-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.agency-loading-text {
    color: #666;
    font-size: 1.1rem;
}

/* Error States */
.agency-error-container {
    padding: 3rem 0;
}

.agency-error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.agency-error-message {
    color: #dc3545;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.agency-retry-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
}

.agency-retry-btn:hover {
    background: #0056b3;
}

/* Agency Counter */
.agency-counter {
    text-align: center;
    margin-bottom: 2rem;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
}

/* Grid Styles */
.agencies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

/* Agency Card Styles */
.agency-card {
    height: 100%;
}

.agency-card-inner {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    border: 1px solid #e9ecef;
    text-align: center;
}

.agency-card-inner:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.agency-logo-container {
    margin-bottom: 1.5rem;
}

.agency-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.agency-info {
    flex-grow: 1;
    margin-bottom: 1.5rem;
}

.agency-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #343a40;
    margin: 0 0 0.5rem;
}

.agency-city {
    font-size: 1rem;
    color: #6c757d;
    margin: 0;
}

.agency-city i {
    margin-right: 0.5rem;
    color: #007bff;
}

.view-details-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 8px;
    background-color: #007bff;
    border-color: #007bff;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.view-details-btn:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 576px) {
    .agencies-grid {
        grid-template-columns: 1fr;
    }
}
</style>