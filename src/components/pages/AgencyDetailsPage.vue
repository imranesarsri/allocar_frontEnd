<template>
    <div>
        <HeaderComponent />
        <ModalsComponent />

        <div v-if="loading" class="loading-container">
            <div class="spinner-border" role="status">
                <span class="sr-only">Chargement...</span>
            </div>
        </div>

        <div v-else-if="error" class="error-container">
            <div class="alert alert-danger" role="alert">
                {{ error }}
            </div>
        </div>

        <template v-else-if="agency">
            <HeroAgencyDetails :agency="agency" />
            <AppDetails :agency="agency" />
        </template>

        <FooterComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import ModalsComponent from '@/components/common/ModalsComponent.vue';
import HeroAgencyDetails from '@/components/sections/agency-details/HeroAgencyDetails.vue';
import AppDetails from '@/components/sections/agency-details/AppDetails.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';

export default {
    name: 'AgencyDetailsPage',
    components: {
        HeaderComponent,
        ModalsComponent,
        HeroAgencyDetails,
        AppDetails,
        FooterComponent,
    },
    data() {
        return {
            agency: null,
            loading: true,
            error: null,
        };
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler(newId) {
                if (newId) {
                    this.fetchAgencyData(newId);
                }
            },
        },
    },
    methods: {
        async fetchAgencyData(agencyId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/en/agencies/${agencyId}`);
                if (response.data && response.data.success) {
                    const agencyData = response.data.data || (response.data[0] ? response.data[0] : null);
                    if (agencyData) {
                        this.agency = agencyData;
                    } else {
                        this.error = 'Agency data not found in the expected format.';
                    }
                } else {
                    this.error = response.data.message || 'Failed to retrieve agency data.';
                }
            } catch (err) {
                this.error = 'An error occurred while fetching agency data.';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.home-page {
    overflow-x: hidden;
}

.loading-container, .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    padding: 2rem;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.alert {
    width: 100%;
    max-width: 600px;
    text-align: center;
}
</style>