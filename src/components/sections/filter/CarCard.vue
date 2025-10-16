<template>
    <div class="product-card2 two enhanced-card">
        <div class="product-img">
            <img :src="carImageUrl" :alt="carAlt" @error="handleImageError" />
            
            <!-- Promotion Badge -->
            <div v-if="hasPromotion" class="promotion-badge">
                <span class="discount-percentage">-{{ promotionDiscount }}%</span>
                <span v-if="promotionDaysRemaining > 0" class="days-remaining">
                    {{ promotionDaysRemaining }} jours restants
                </span>
            </div>
            
            <!-- Availability Badge -->
            <div class="availability-badge" :class="availabilityClass">
                {{ availabilityText }}
            </div>
            
            <!-- Image Count -->
            <div v-if="imageCount > 1" class="image-count">
                <i class="fas fa-camera"></i> {{ imageCount }}
            </div>
        </div>
        
        <div class="product-content">
            <div class="company-logo">
                <a :href="carDetailUrl">
                    <img :src="brandLogoUrl" :alt="brandAlt" />
                </a>
            </div>
            
            <div class="price-section">
                <div v-if="hasPromotion" class="price-with-discount">
                    <strong class="current-price">{{ formatPrice(currentPrice) }} DH</strong>
                    <span class="original-price">{{ formatPrice(originalPrice) }} DH</span>
                    <div v-if="savings > 0" class="savings">
                        Économie {{ formatPrice(savings) }} DH
                    </div>
                </div>
                <div v-else class="price">
                    <strong>{{ formatPrice(currentPrice) }} DH</strong>
                </div>
            </div>
            
            <h6 class="car-title">
                <a :href="carDetailUrl">
                    {{ carTitle }}
                </a>
            </h6>
            
            <!-- Car Details -->
            <div class="car-details">
                <div v-if="cityName" class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ cityName }}</span>
                </div>
                <div v-if="car.mileage && car.mileage > 0" class="detail-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>{{ formatMileage(car.mileage) }}</span>
                </div>
                <div v-if="fuelTypeName" class="detail-item">
                    <i class="fas fa-gas-pump"></i>
                    <span>{{ fuelTypeName }}</span>
                </div>
                <div v-if="car.transmission" class="detail-item">
                    <i class="fas fa-cogs"></i>
                    <span>{{ car.transmission }}</span>
                </div>
                <div v-if="colorName" class="detail-item">
                    <i class="fas fa-palette"></i>
                    <span>{{ colorName }}</span>
                </div>
                <div v-if="categoryName" class="detail-item">
                    <i class="fas fa-car"></i>
                    <span>{{ categoryName }}</span>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
                <a :href="carDetailUrl" class="btn btn-primary btn-sm">
                    <i class="fas fa-eye"></i>
                </a>
                <button @click="addToWishlist" class="btn btn-outline-secondary btn-sm" type="button">
                    <i class="fas fa-heart"></i>
                </button>
                <button @click="shareCar" class="btn btn-outline-info btn-sm" type="button">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarCard',
    props: {
        car: {
            type: Object,
            required: true,
            validator(value) {
                return value && typeof value === 'object' && value.car_id;
            }
        }
    },
    computed: {
        hasPromotion() {
            return this.car.promotion && this.car.promotion.is_on_promotion;
        },
        
        availabilityClass() {
            return {
                'available': this.car.is_available !== false,
                'sold': this.car.is_available === false
            };
        },
        
        availabilityText() {
            return this.car.is_available !== false ? 'Disponible' : 'Vendu';
        },
        
        imageCount() {
            if (Array.isArray(this.car.images)) {
                return this.car.images.length;
            }
            return this.car.image_url ? 1 : 0;
        },
        
        carImageUrl() {
            // Handle multiple image formats
            if (this.car.images && Array.isArray(this.car.images) && this.car.images.length > 0) {
                const firstImage = this.car.images[0];
                if (typeof firstImage === 'object' && firstImage.image_url) {
                    return firstImage.image_url;
                }
                if (typeof firstImage === 'string') {
                    return firstImage;
                }
            }
            
            if (this.car.image_url) {
                return this.car.image_url;
            }
            
            if (this.car.main_image) {
                return this.car.main_image;
            }
            
            return '/assets/img/default-car.jpg';
        },
        
        brandLogoUrl() {
            if (this.car.brand && this.car.brand.logo_url) {
                return this.car.brand.logo_url;
            }
            if (this.car.logo_url) {
                return this.car.logo_url;
            }
            return '/assets/img/default-logo.svg';
        },
        
        brandAlt() {
            const brandName = this.brandName;
            return `Logo ${brandName}`;
        },
        
        carDetailUrl() {
            return `/details/${this.car.car_id}`;
        },
        
        carTitle() {
            const brand = this.brandName;
            const model = this.modelName;
            const year = this.car.year || '';
            
            return `${brand} ${model} ${year}`.trim();
        },
        
        carAlt() {
            return `Image ${this.carTitle}`;
        },
        
        // Computed properties for safe data access
        brandName() {
            return (this.car.brand && this.car.brand.brand_name !== 'Marque inconnue') 
                ? this.car.brand.brand_name 
                : 'Voiture';
        },
        
        modelName() {
            return (this.car.model && this.car.model.model_name !== 'Modèle inconnu') 
                ? this.car.model.model_name 
                : '';
        },
        
        cityName() {
            return (this.car.city && this.car.city.city_name !== 'Ville inconnue') 
                ? this.car.city.city_name 
                : null;
        },
        
        colorName() {
            return (this.car.color && this.car.color.color_name !== 'Couleur inconnue') 
                ? this.car.color.color_name 
                : null;
        },
        
        categoryName() {
            return (this.car.category && this.car.category.category_name !== 'Catégorie inconnue') 
                ? this.car.category.category_name 
                : null;
        },
        
        fuelTypeName() {
            return (this.car.fuelType && this.car.fuelType.fuel_type_name !== 'Carburant inconnu') 
                ? this.car.fuelType.fuel_type_name 
                : null;
        },
        
        currentPrice() {
            if (this.hasPromotion && this.car.promotion.current_price) {
                return this.car.promotion.current_price;
            }
            if (this.car.current_price) {
                return this.car.current_price;
            }
            return this.car.price || 0;
        },
        
        originalPrice() {
            if (this.hasPromotion && this.car.promotion.original_price) {
                return this.car.promotion.original_price;
            }
            if (this.car.original_price) {
                return this.car.original_price;
            }
            return this.car.price || 0;
        },
        
        savings() {
            return this.originalPrice - this.currentPrice;
        },
        
        promotionDiscount() {
            return this.car.promotion?.discount_percentage || this.car.discount_percentage || 0;
        },
        
        promotionDaysRemaining() {
            return this.car.promotion?.days_remaining || this.car.days_remaining || 0;
        }
    },
    methods: {
        handleImageError(event) {
            event.target.src = '/assets/img/default-car.jpg';
        },
        
        handleLogoError(event) {
            event.target.src = '/assets/img/default-logo.svg';
        },
        
        formatPrice(price) {
            if (!price || price === 0) return '0';
            const numPrice = parseFloat(price);
            if (isNaN(numPrice)) return '0';
            return numPrice.toLocaleString('fr-FR');
        },
        
        formatMileage(mileage) {
            if (!mileage) return 'N/A';
            if (mileage < 1000) {
                return `${mileage} km`;
            }
            return `${(mileage / 1000).toFixed(1)}k km`;
        },
        
        addToWishlist() {
            try {
                this.$emit('add-to-wishlist', this.car.car_id);
            } catch (error) {
                console.error('Error adding to wishlist:', error);
            }
        },
        
        shareCar() {
            try {
                const url = `${window.location.origin}${this.carDetailUrl}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: this.carTitle,
                        text: `Découvrez cette ${this.carTitle}`,
                        url: url
                    })
                } else {
                    this.fallbackShare(url);
                }
            } catch (error) {
                console.error('Error sharing car:', error);
            }
        },
        
        fallbackShare(url) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    alert('Lien copié dans le presse-papiers !');
                }).catch(() => {
                    this.promptShare(url);
                });
            } else {
                this.promptShare(url);
            }
        },
        
        promptShare(url) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Lien copié dans le presse-papiers !');
            } catch (err) {
                prompt('Copiez ce lien :', url);
            }
        }
    }
};
</script>

<style scoped>
/* Same styles as before but with improved stability */
.enhanced-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.enhanced-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-img {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.enhanced-card:hover .product-img img {
    transform: scale(1.05);
}

.promotion-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: linear-gradient(135deg, #ff4757, #ff3838);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
    z-index: 2;
}

.promotion-badge .discount-percentage {
    display: block;
    font-size: 14px;
}

.promotion-badge .days-remaining {
    display: block;
    font-size: 10px;
    opacity: 0.9;
    margin-top: 2px;
}

.availability-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 2;
}

.availability-badge.available {
    background: #2ed573;
    color: white;
}

.availability-badge.sold {
    background: #ff4757;
    color: white;
}

.image-count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 2;
}

.product-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.company-logo {
    margin-bottom: 15px;
}

.company-logo img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.price-section {
    margin-bottom: 15px;
}

.price-with-discount .current-price {
    color: #2ed573;
    font-size: 20px;
    margin-right: 10px;
}

.price-with-discount .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
}

.price-with-discount .savings {
    color: #ff4757;
    font-size: 12px;
    font-weight: bold;
    margin-top: 4px;
}

.price strong {
    font-size: 20px;
    color: #333;
}

.car-title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
}

.car-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
}

.car-title a:hover {
    color: #007bff;
}

.car-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 20px;
    flex: 1;
}

.detail-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
}

.detail-item i {
    width: 16px;
    margin-right: 6px;
    color: #999;
}

.action-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: auto;
}

.action-buttons .btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    transition: all 0.3s ease;
    border: 1px solid;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.action-buttons .btn:first-child {
    flex: 2;
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

.btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
    background: transparent;
}

.btn-outline-secondary:hover {
    background: #6c757d;
    color: white;
}

.btn-outline-info {
    border-color: #17a2b8;
    color: #17a2b8;
    background: transparent;
}

.btn-outline-info:hover {
    background: #17a2b8;
    color: white;
}

@media (max-width: 768px) {
    .car-details {
        grid-template-columns: 1fr;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .action-buttons .btn:first-child {
        flex: 1;
    }
}
</style>
