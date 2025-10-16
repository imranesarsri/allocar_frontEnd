<template>
    <div>
        <HeaderComponent />
        <div class="booking-page container mt-5">
            <h2>Réserver votre voiture</h2>
            <div v-if="car">
                <div class="car-details">
                    <h3>{{ car.brand?.brand_name }} {{ car.model?.model_name }}</h3>
                    <p>Prix: {{ formatPrice(price) }}</p>
                </div>
                <form @submit.prevent="submitBooking">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nom complet</label>
                        <input type="text" class="form-control" id="name" v-model="booking.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="booking.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Téléphone</label>
                        <input type="tel" class="form-control" id="phone" v-model="booking.phone" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Confirmer la réservation</button>
                </form>
            </div>
            <div v-else>
                <p>Chargement des détails de la voiture...</p>
            </div>
        </div>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';
import axios from 'axios';

export default {
    name: 'BookingPage',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            car: null,
            price: 0,
            booking: {
                name: '',
                email: '',
                phone: ''
            }
        };
    },
    async created() {
        const carId = this.$route.query.carId;
        this.price = this.$route.query.price;
        if (carId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/fr/cars/${carId}`);
                if (response.data.success) {
                    this.car = response.data.data;
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        }
    },
    methods: {
        formatPrice(price) {
            if (!price) return '0.00';
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'MAD'
            }).format(price);
        },
                async submitBooking() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/fr/bookings', {
                    car_id: this.car.car_id,
                    price: this.price,
                    name: this.booking.name,
                    email: this.booking.email,
                    phone: this.booking.phone
                });
                if (response.data.success) {
                    alert('Réservation soumise avec succès!');
                    this.$router.push('/');
                } else {
                    alert('Erreur lors de la soumission de la réservation.');
                }
            } catch (error) {
                console.error('Error submitting booking:', error);
                alert('Erreur lors de la soumission de la réservation.');
            }
        }
    }
};
</script>

<style scoped>
.booking-page {
    padding: 2rem 0;
}
</style>
