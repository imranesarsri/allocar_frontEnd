<template>
<div class="car-details-area pt-100 mb-100">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0"
                    class="scrollspy-example" tabindex="0">
                    
                    <div class="single-item mb-50" id="car-milage">
                        <div class="car-milage">
                            <div class="title mb-25">
                                <h5>Agence</h5>
                            </div>
                            <div class="overview-content" v-if="agency && !loading">
                                <ul>
                                    <li><span>Agency:</span> {{ agency.agency_name }}</li>
                                    <li><span>City:</span> {{ agency.city }}</li>
                                </ul>
                                <ul>
                                    <li><span>Address:</span> {{ agency.address }}</li>
                                </ul>
                                
                            </div>
                            <div v-else-if="loading" class="overview-content">
                                <p>Chargement des informations de l'agence...</p>
                            </div>
                            <div v-else-if="error" class="overview-content">
                                <p class="error-message">{{ error }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="single-item mb-50" id="car-milage">
                        <div class="car-milage">
                            <div class="title mb-25">
                                <h5>Description</h5>
                            </div>
                            <div class="overview-content">
                                <p v-if="agency && !loading">
                                {{ agency.description }}
                                </p>
                                <p v-else-if="loading">
                                Chargement de la description...
                                </p>
                                <p v-else-if="error" class="error-message">
                                Impossible de charger la description
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="car-details-sidebar">
                <div class="contact-info mb-50" v-if="agency && !loading">
                    <div class="single-contact" @click="copyToClipboard(agency.email)" v-if="agency.email">
                    <a>Email : <i class='bx bx-at'></i>{{ agency.email }}</a>
                    </div>
                    <div class="single-contact" @click="copyToClipboard(agency.phone_fix)" v-if="agency.phone_fix">
                    <a>Fix : <i class='bx bx-phone-call'></i>{{ agency.phone_fix }}</a>
                    </div>
                    <div class="single-contact" @click="copyToClipboard(agency.phone_number_1)" v-if="agency.phone_number_1">
                    <a>Numero 1 : <i class='bx bx-phone-call'></i>{{ agency.phone_number_1 }}</a>
                    </div>
                    <div class="single-contact" @click="copyToClipboard(agency.phone_number_2)" v-if="agency.phone_number_2">
                    <a>Numero 2 : <i class='bx bx-phone-call'></i>{{ agency.phone_number_2 }}</a>
                    </div>
                    <div class="single-contact" @click="openWebsite(agency.website)" v-if="agency.website">
                    <a>Site web : <i class='bx bx-world'></i>Site Web</a>
                    </div>
                </div>
                
                <div v-else-if="loading" class="loading text-center">
                    <i class='bx bx-loader-alt bx-spin'></i> Chargement...
                </div>
                
                <div v-else-if="error" class="error text-center">
                    <p class="error-message">{{ error }}</p>
                    <button @click="fetchAgencyData()" class="btn btn-retry">
                        <i class='bx bx-refresh'></i> Réessayer
                    </button>
                </div>
                
            </div>
                <div class="car-details-sidebar">                         
                    <div class="contact-info mb-50" v-if="agency && !loading">                             
                        <div class="single-contact" @click="openLink(agency.facebook_url)" v-if="agency.facebook_url">                                 
                        <a><i class='bx bxl-facebook'></i>Facebook</a>                             
                        </div>                             
                        <div class="single-contact" @click="openLink(agency.instagram_url)" v-if="agency.instagram_url">                                 
                        <a><i class='bx bxl-instagram'></i>Instagram</a>                             
                        </div>                             
                        <div class="single-contact" @click="openLink(agency.other_social_media_url)" v-if="agency.other_social_media_url">                                 
                        <a><i class='bx bx-link'></i>Autre lien</a>                             
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
  name: 'AppDetails',
  data() {
    return {
      agency: null,
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchAgencyData()
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id !== from.params.id) {
        this.fetchAgencyData()
      }
    }
  },
  methods: {
    async fetchAgencyData() {
      try {
        this.loading = true
        this.error = null
        
        const agencyId = this.$route.params.id
        
        if (!agencyId) {
          this.error = 'ID de l\'agence manquant'
          return
        }
        
        // Récupérer l'agence spécifique par agency_id
        const response = await axios.get(`http://127.0.0.1:8000/api/en/agencies/${agencyId}`)
        
        if (response.data && response.data.success) {
          // Les données sont directement dans response.data avec l'index "0"
          if (response.data["0"]) {
            this.agency = response.data["0"]
          } else {
            // Si pas d'index "0", prendre le premier objet disponible (sauf success)
            const keys = Object.keys(response.data).filter(key => key !== 'success')
            if (keys.length > 0) {
              this.agency = response.data[keys[0]]
            } else {
              this.error = 'Agence non trouvée'
            }
          }
        } else {
          this.error = 'Agence non trouvée'
        }
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        if (error.response && error.response.status === 404) {
          this.error = 'Agence non trouvée'
        } else {
          this.error = 'Impossible de charger les données de l\'agence'
        }
      } finally {
        this.loading = false
      }
    },
    
    // Navigation de retour vers la liste
    goBackToAgencies() {
      this.$router.push({ name: 'AgenciesListPage' })
    },
    
    async copyToClipboard(text) {
      if (!text) return
      
      try {
        await navigator.clipboard.writeText(text)
        this.$toast.success(`${text} copié !`) // Si vous utilisez vue-toastification
        // Ou utilisez une autre méthode de notification
      } catch (err) {
        console.error('Erreur copie:', err)
      }
    },
    
    openWebsite(url) {
      if (url) {
        window.open(url, '_blank')
      }
    },
    openLink(url) {
      if (url) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>