<template>
  <div class="filter-container">
    <div class="container">
      <div class="filter-wrapper">
        <!-- Search by Agency Name -->
        <div class="search-box">
          <div class="input-container">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par nom d'agence..."
              class="input-field"
              @input="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-btn"
              type="button"
            >
              ×
            </button>
          </div>
        </div>

        <!-- City Select Dropdown -->
        <div class="search-box">
          <div class="select-wrapper">
            <div class="input-container" @click="toggleDropdown">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="select-value" :class="{ 'placeholder': !selectedCity }">
                {{ selectedCity || 'Sélectionner une ville...' }}
              </span>
              <button
                v-if="selectedCity"
                @click.stop="clearCity"
                class="clear-btn"
                type="button"
              >
                ×
              </button>
              <svg class="arrow" :class="{ 'open': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            
            <!-- Dropdown -->
            <div v-show="isDropdownOpen" class="dropdown">
              <div class="search-section">
                <input
                  v-model="citySearchQuery"
                  type="text"
                  placeholder="Rechercher une ville..."
                  class="search-input"
                  @click.stop
                />
              </div>
              <div class="options">
                <div
                  v-for="city in filteredCities"
                  :key="city"
                  @click="selectCity(city)"
                  class="option"
                  :class="{ 'active': city === selectedCity }"
                >
                  {{ city }}
                </div>
                <div v-if="filteredCities.length === 0" class="no-options">
                  Aucune ville trouvée
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Button -->
        <div v-if="searchQuery || selectedCity" class="reset-section">
          <button @click="clearAllFilters" class="reset-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Réinitialiser
          </button>
        </div>
        
        <!-- Results -->
        <div v-if="showResultsCount" class="results">
          {{ filteredCount }} {{ filteredCount === 1 ? 'agence trouvée' : 'agences trouvées' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltreAgency',
  props: {
    showResultsCount: {
      type: Boolean,
      default: true
    },
    filteredCount: {
      type: Number,
      default: 0
    },
    initialName: {
      type: String,
      default: ''
    },
    initialCity: {
      type: String,
      default: ''
    },
    availableCities: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchQuery: this.initialName,
      selectedCity: this.initialCity,
      isDropdownOpen: false,
      citySearchQuery: ''
    }
  },
  computed: {
    filteredCities() {
      if (!this.citySearchQuery) {
        return this.availableCities
      }
      return this.availableCities.filter(city =>
        city.toLowerCase().includes(this.citySearchQuery.toLowerCase())
      )
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', {
        name: this.searchQuery.trim(),
        city: this.selectedCity
      })
    },
    clearSearch() {
      this.searchQuery = ''
      this.handleSearch()
    },
    clearCity() {
      this.selectedCity = ''
      this.handleSearch()
    },
    clearAllFilters() {
      this.searchQuery = ''
      this.selectedCity = ''
      this.citySearchQuery = ''
      this.isDropdownOpen = false
      this.handleSearch()
    },
    toggleDropdown() {
      if (this.availableCities.length === 0) return
      this.isDropdownOpen = !this.isDropdownOpen
      if (this.isDropdownOpen) {
        this.citySearchQuery = ''
      }
    },
    selectCity(city) {
      this.selectedCity = city
      this.isDropdownOpen = false
      this.citySearchQuery = ''
      this.handleSearch()
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.filter-container {
  width: 100%;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: #f8fafc;
}

.filter-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
}

.search-box {
  margin-bottom: 1rem;
}

.input-container {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.input-container:hover,
.input-container:focus-within {
  border-color: #3b82f6;
}

.icon {
  width: 20px;
  height: 20px;
  color: #6b7280;
  margin-right: 12px;
  flex-shrink: 0;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1f2937;
  background: transparent;
}

.input-field::placeholder {
  color: #9ca3af;
}

.select-value {
  flex: 1;
  font-size: 16px;
  color: #1f2937;
}

.select-value.placeholder {
  color: #9ca3af;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 18px;
  color: #6b7280;
  line-height: 1;
}

.clear-btn:hover {
  background: #f3f4f6;
  color: #ef4444;
}

.arrow {
  width: 20px;
  height: 20px;
  color: #6b7280;
  margin-left: 8px;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #3b82f6;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.search-section {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.search-input:focus {
  border-color: #3b82f6;
}

.options {
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
}

.option:hover {
  background: #f3f4f6;
}

.option.active {
  background: #3b82f6;
  color: white;
}

.option:last-child {
  border-bottom: none;
}

.no-options {
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  font-style: italic;
}

/* Reset Button */
.reset-section {
  text-align: center;
  margin: 24px 0 16px 0;
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

/* Results */
.results {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

@media (min-width: 769px) {
  .filter-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
  
  .search-box {
    margin-bottom: 0;
  }
  
  .reset-section {
    grid-column: 1 / -1;
    margin: 24px 0 16px 0;
  }
  
  .results {
    grid-column: 1 / -1;
    margin-top: 8px;
  }
}
</style>