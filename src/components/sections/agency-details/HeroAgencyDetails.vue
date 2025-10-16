<template>
  <div class="inner-page-banner">
    <div class="banner-wrapper">
      <div class="container-fluid">
        <ul class="breadcrumb-list">
          <li><a href="/">Accueil</a></li>
          <li>Agences details</li>
        </ul>
        <div class="banner-main-content-wrap">
          <div class="row justify-content-between">
            <!-- Loading state -->
            <div v-if="loading" class="col-12 d-flex justify-content-center align-items-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>
            
            <!-- Error state -->
            <div v-else-if="error" class="col-12">
              <div class="alert alert-danger" role="alert">
                {{ error }}
              </div>
            </div>
            
            <!-- Content when data is loaded -->
            <template v-else-if="agency">
              <div class="col-xl-6 col-lg-7 d-flex align-items-center">
                <div class="banner-content">
                  <span class="sub-title">
                    {{ agency.city }}
                  </span>
                  <h1>{{ agency.agency_name }}</h1>
                  <h5>Adresse : {{ agency.address }}</h5>
                </div>
              </div>
              <div class="col-xl-6 col-lg-5 d-lg-flex d-none align-items-center justify-content-end">
                <div class="banner-img_logo-agency">
                  <img 
                    :src="agency.logo || defaultLogo" 
                    :alt="`Logo ${agency.agency_name}`"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HeroAgencyDetails',

  data() {
    return {
      agency: null,
      loading: true,
      error: null,
      defaultLogo: 'http://127.0.0.1:8000/storage/seed_images/agencies/logos/logo_1.png'
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
        this.agency = null
        
        const agencyId = this.$route.params.id
        
        if (!agencyId) {
          this.error = 'ID de l\'agence manquant'
          return
        }
        
        const response = await axios.get(`http://127.0.0.1:8000/api/en/agencies/${agencyId}`)
        
        if (response.data && response.data.success) {
          // Gestion plus robuste de la structure de données
          let agencyData = null
          
          // Cas 1: données directement dans l'index "0"
          if (response.data["0"]) {
            agencyData = response.data["0"]
          }
          // Cas 2: données dans la propriété "data"
          else if (response.data.data) {
            agencyData = Array.isArray(response.data.data) 
              ? response.data.data[0] 
              : response.data.data
          }
          // Cas 3: chercher le premier objet qui n'est pas "success"
          else {
            const dataKeys = Object.keys(response.data).filter(key => 
              key !== 'success' && typeof response.data[key] === 'object'
            )
            if (dataKeys.length > 0) {
              agencyData = response.data[dataKeys[0]]
            }
          }
          
          if (agencyData && this.validateAgencyData(agencyData)) {
            this.agency = agencyData
          } else {
            this.error = 'Données de l\'agence invalides'
          }
        } else {
          this.error = 'Agence non trouvée'
        }
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        
        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.error = 'Agence non trouvée'
              break
            case 500:
              this.error = 'Erreur du serveur. Veuillez réessayer plus tard.'
              break
            default:
              this.error = 'Une erreur est survenue lors du chargement'
          }
        } else if (error.request) {
          this.error = 'Impossible de contacter le serveur'
        } else {
          this.error = 'Une erreur inattendue s\'est produite'
        }
      } finally {
        this.loading = false
      }
    },

    validateAgencyData(data) {
      // Vérifier que les propriétés essentielles existent
      return data && 
             typeof data === 'object' && 
             data.agency_name && 
             data.city && 
             data.address
    },

    handleImageError(event) {
      // Fallback en cas d'erreur de chargement d'image
      event.target.src = this.defaultLogo
    }
  }
}
</script>