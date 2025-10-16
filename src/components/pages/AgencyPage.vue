<template>
    <!-- Header -->
    <HeaderComponent />

    <!-- Modals -->
    <ModalsComponent />

    <HeroAgency />

    <!-- Add the filter component with available cities -->
    <FiltreAgency 
        @search="handleAgencySearch"
        :show-results-count="true"
        :filtered-count="filteredCount"
        :available-cities="availableCities"
    />

    <AppAgency 
        :name-filter="nameFilter"
        :city-filter="cityFilter"
        @agencies-loaded="handleAgenciesLoaded"
    />

    <!-- Footer -->
    <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import HeroAgency from '@/components/sections/agency/HeroAgency.vue'
import AppAgency from '@/components/sections/agency/AppAgency.vue'
import ModalsComponent from '@/components/common/ModalsComponent.vue'
import FiltreAgency from '@/components/sections/agency/FiltreAgency.vue'

export default {
    name: 'AgencyPage',
    components: {
        HeaderComponent,
        ModalsComponent,
        HeroAgency,
        AppAgency,
        FooterComponent,
        FiltreAgency,
    },
    data() {
        return {
            nameFilter: '',
            cityFilter: '',
            allAgencies: [],
        }
    },
    computed: {
        filteredCount() {
            let filtered = [...this.allAgencies] // Create a plain array copy

            if (this.nameFilter) {
                filtered = filtered.filter(agency =>
                    agency.agency_name && agency.agency_name.toLowerCase().includes(this.nameFilter.toLowerCase())
                )
            }

            if (this.cityFilter) {
                filtered = filtered.filter(agency =>
                    agency.city && agency.city === this.cityFilter
                )
            }

            return filtered.length
        },
        // Extract unique cities from agencies
        availableCities() {
            console.log('Computing available cities from:', this.allAgencies)
            
            // Convert proxy to plain array and extract cities
            const plainAgencies = JSON.parse(JSON.stringify(this.allAgencies))
            console.log('Plain agencies:', plainAgencies)
            
            const cities = plainAgencies
                .map(agency => agency.city)
                .filter(city => city && city.trim() !== '') // Filter out null, undefined, and empty strings
            
            console.log('Extracted cities:', cities)
            
            const uniqueCities = [...new Set(cities)].sort()
            console.log('Unique sorted cities:', uniqueCities)
            
            return uniqueCities
        }
    },
    methods: {
        handleAgencySearch(filters) {
            console.log('Search filters received:', filters)
            this.nameFilter = filters.name
            this.cityFilter = filters.city
        },
        handleAgenciesLoaded(agencies) {
            console.log('Raw agencies received:', agencies)
            console.log('Type of agencies:', typeof agencies)
            console.log('Is array:', Array.isArray(agencies))
            
            // Convert to plain array to avoid proxy issues
            this.allAgencies = JSON.parse(JSON.stringify(agencies))
            console.log('Processed agencies:', this.allAgencies)
            
            // Log first agency structure for debugging
            if (this.allAgencies.length > 0) {
                console.log('First agency structure:', this.allAgencies[0])
                console.log('First agency city:', this.allAgencies[0].city)
            }
        }
    }
}
</script>