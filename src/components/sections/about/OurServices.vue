<template>
    <div class="why-choose-area pt-90 pb-90 mb-100">
        <div class="container">
            <div class="row mb-60 wow fadeInUp" data-wow-delay="200ms">
                <div class="col-lg-12 d-flex justify-content-center">
                    <div class="section-title1 text-center">
                        <span>Meilleure Agence de Location</span>
                        <h2>Pourquoi Choisir ALLOCAR</h2>
                    </div>
                </div>
            </div>
            <div class="row mb-50 g-4 justify-content-center">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                    <div class="choose-card">
                        <div class="choose-top">
                            <div class="choose-icon">
                                <img src="assets/img/icon/affordable.svg" alt="">
                            </div>
                            <h5>Prix <span>Abordables</span></h5>
                        </div>
                        <p>Nos tarifs compétitifs vous permettent de profiter de véhicules de qualité sans dépasser
                            votre budget, avec des options pour tous les besoins.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                    <div class="choose-card">
                        <div class="choose-top">
                            <div class="choose-icon">
                                <img src="assets/img/icon/guarantee.svg" alt="">
                            </div>
                            <h5>Garantie <span>Satisfaction</span></h5>
                        </div>
                        <p>Nous garantissons votre satisfaction avec un service client exceptionnel et une politique de
                            remboursement flexible si vous n'êtes pas entièrement satisfait.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                    <div class="choose-card">
                        <div class="choose-top">
                            <div class="choose-icon">
                                <img src="assets/img/icon/warranty.svg" alt="">
                            </div>
                            <h5>Assistance <span>24/7</span></h5>
                        </div>
                        <p>Notre équipe est disponible 24h/24 et 7j/7 pour vous assister en cas de problème ou de
                            question durant votre location.</p>
                    </div>
                </div>
            </div>
            <div class="our-activetis">
                <div class="row justify-content-center g-lg-4 gy-5">
                    <div class="col-lg-3 col-sm-4 col-sm-6 divider d-flex justify-content-lg-start justify-content-sm-center wow fadeInUp"
                        data-wow-delay="200ms">
                        <div class="single-activiti">
                            <div class="icon">
                                <img src="assets/img/icon/av-car.svg" alt="">
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h5 class="counter">{{ loading ? '...' : carsCount }}</h5>
                                    <span>+</span>
                                </div>
                                <p>Véhicules Disponibles</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-4 col-sm-6 divider d-flex justify-content-sm-center wow fadeInUp"
                        data-wow-delay="300ms">
                        <div class="single-activiti">
                            <div class="icon">
                                <img src="assets/img/icon/sold-car.svg" alt="">
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h5 class="counter">2500</h5>
                                    <span>+</span>
                                </div>
                                <p>Locations Réalisées</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-4 col-sm-6 divider d-flex justify-content-sm-center wow fadeInUp"
                        data-wow-delay="400ms">
                        <div class="single-activiti">
                            <div class="icon">
                                <img src="assets/img/icon/use-car.svg" alt="">
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h5 class="counter">{{ loading ? '...' : agenciesCount }}</h5>
                                    <span></span>
                                </div>
                                <p>Agences au Maroc</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-4 col-sm-6 d-flex justify-content-lg-end justify-content-sm-center wow fadeInUp"
                        data-wow-delay="500ms">
                        <div class="single-activiti">
                            <div class="icon">
                                <img src="assets/img/icon/happy-customar.svg" alt="">
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h5 class="counter">96.5</h5>
                                    <span>%</span>
                                </div>
                                <p>Satisfaction Client</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row wow fadeInUp" data-wow-delay="200ms">
                <div class="col-lg-12 d-flex justify-content-center">
                    <div class="trustpilot-review">
                        <strong>Excellent!</strong>
                        <img src="assets/img/icon/trustpilot-star2.svg" alt="">
                        <p>Note de <strong>4.8</strong> sur 5.0 basée sur <a href="#"><strong>1,250</strong>
                                avis clients</a></p>
                        <img src="assets/img/icon/trustpilot-logo.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'OurServices',
    data() {
        return {
            agenciesCount: 0,
            carsCount: 0,
            loading: true,
            error: null
        }
    },
    async mounted() {
        await this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                this.loading = true
                this.error = null

                // console.log('Début de la récupération des données...')

                // Récupération des agences
                // console.log('Récupération des agences...')
                const agenciesResponse = await axios.get('http://127.0.0.1:8000/api/fr/agencies/total')
                // console.log('Réponse agences:', agenciesResponse.data)

                // Récupération des voitures
                // console.log('Récupération des voitures...')
                const carsResponse = await axios.get('http://127.0.0.1:8000/api/fr/cars/count')
                //console.log('Réponse voitures:', carsResponse.data)

                // Traitement de la réponse des agences
                if (agenciesResponse.data.success) {
                    this.agenciesCount = agenciesResponse.data.total
                    // console.log('Nombre d\'agences défini:', this.agenciesCount)
                } else {
                    console.warn('API agences non successful:', agenciesResponse.data)
                }

                // Traitement de la réponse des voitures
                if (carsResponse.data.success) {
                    this.carsCount = carsResponse.data.data
                    // console.log('Nombre de voitures défini:', this.carsCount)
                } else {
                    console.warn('API voitures non successful:', carsResponse.data)
                }

                // console.log('Données finales - Agences:', this.agenciesCount, 'Voitures:', this.carsCount)

            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error)
                console.error('Détails de l\'erreur:', error.response?.data)
                this.error = 'Impossible de charger les statistiques'
                // Valeurs par défaut en cas d'erreur
                this.agenciesCount = 8
                this.carsCount = 150
                // console.log('Utilisation des valeurs par défaut')
            } finally {
                this.loading = false
                // console.log('Chargement terminé')
            }
        }
    }
}
</script>

<style scoped>
.counter {
    transition: all 0.3s ease;
}

.loading {
    opacity: 0.6;
}
</style>