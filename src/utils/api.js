import { loadingState } from '../store/loading';

const API_BASE_URL = 'http://127.0.0.1:8000/api/en';

async function fetchFeaturedCars() {
  const response = await fetch(`${API_BASE_URL}/cars/featured`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured cars');
  }
  const data = await response.json();
  return data.cars;
}

export async function fetchHomePageData() {
  loadingState.isLoading = true;
  try {
    // Fetch all data in parallel
    const [featuredCars] = await Promise.all([
      fetchFeaturedCars(),
      // Add other data fetching promises here, e.g., fetchRecentCars()
    ]);

    return {
      featuredCars,
      // other data
    };
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
    return { featuredCars: [] }; // Return empty data on error
  } finally {
    loadingState.isLoading = false;
  }
}
