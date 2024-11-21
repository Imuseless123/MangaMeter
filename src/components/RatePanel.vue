<template>
  <div v-if="selectedManga" class="manga-container">
    <!-- Manga Image with fade-in transition -->
    <img 
      :src="selectedManga.image" 
      alt="Manga Cover" 
      class="manga-image" 
    />
    <Button
      :icon="isFavorite ? 'pi pi-star-fill' : 'pi pi-star'"
      severity="secondary" rounded size='large'
      class="favorite-button"
      @click="toggleFavorite"
    />
    <div class="overlay">
      <div class="manga-info">
        <!-- Manga Title with smooth fade-in -->
        <h2 id="mangaName" class="manga-name">
          {{ selectedManga.name }}
        </h2>

        <!-- Rankings Section -->
        <div class="ranking">
          <!-- Overall Ranking Row -->
          <RankingRow :isOverall="true" :overallScore="overallScore" />

          <!-- Genre Ranking Rows -->
          <div class="ranking-rows">
            <RankingRow
              v-for="(genre, index) in selectedManga.genres"
              :key="genre.id"
              :genreId="genre.id"
              :genreName="genre.name"
              :overallScore="getGenreRating(genre.id)" 
              :userScore="getUserScore(genre.id)"
              :isLoggedIn="isLoggedIn"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed,watch } from 'vue';
import { useRatingStore } from '@/stores/RatingStore';
import { useAccountStore } from '@/stores/AccountStore';
import RankingRow from './RankingRow.vue';
import Button from "primevue/button";
import { API_BASE_URL, API_ENDPOINTS } from '@/ultis/apiConfig';
import axios from 'axios';

const ratingStore = useRatingStore();
const accountStore = useAccountStore();
const isMobile = ref(false);
const isFavorite = ref(false);

// Use computed property to get the selected manga
const selectedManga = computed(() => ratingStore.selectedManga);
const isLoggedIn = computed(() => accountStore.isLoggedIn); 

const overallScore = computed(() => {
  const ratings = ratingStore.mangaPublicRatings.map(rating => rating.averagerating);
  
  if (ratings.length === 0) return 'unrated'; // Handle cases where there are no ratings

  const sum = ratings.reduce((acc, score) => acc + score, 0);
  return (sum / ratings.length).toFixed(1); // Calculate the average and format to 1 decimal place
});

const getGenreRating = (genreId) => {
  const rating = ratingStore.mangaPublicRatings.find(rating => rating.genreid === genreId);
  return rating ? rating.averagerating : 'unrated';  // Return "unrated" if no rating is found
};

// Fetch the user's rating for a genre
const getUserScore = (genreId) => {
  const userRating = ratingStore.userRatings.find(rating => rating.genreid === genreId);
  return userRating ? userRating.ratingscore : 'empty';  // Return 'empty' if no user score
};

// Function to update `isMobile` based on screen width
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 1200;
};
// Set up event listeners on mount, remove on unmount
onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
  watch([selectedManga, accountStore.user], (newVal, oldVal) => {
    if (selectedManga.value && accountStore.user.id) {
      checkFavorite();  // Check if manga is a favorite once both values are available
    }
  }, { immediate: true }); 
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

const checkFavorite = async () => {
  const mangaId = selectedManga.value.id;
  const userId = accountStore.user.id;

  if (!mangaId || !userId) return;  // Make sure we have both mangaId and userId

  try {
    // Call the API to check if the manga is already favorited
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_MANGA_FAVORITE_STATUS}`, {
        params: {
          mangaId: mangaId,
          userId: userId,
        }
      });
    isFavorite.value = response.data;  // Update the favorite state based on response
  } catch (error) {
    console.error('Error while checking favorite status:', error);
  }
};

const toggleFavorite = async () => {
  const mangaId = selectedManga.value.id;
  const userId = accountStore.user.id;

  if (!mangaId || !userId) return;  // Make sure we have both mangaId and userId

  try {
    // Check if the manga is already favorited
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_MANGA_FAVORITE_STATUS}`, {
        params: {
          mangaId: mangaId,
          userId: userId,
        }
      });
    const isFavorited = response.data;

    // If it is favorited, remove it, otherwise add it
    if (isFavorited) {
      // Call the API to remove it from favorites
      await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.DELETE_USER_MANGA_FAVORITE}?mangaId=${mangaId}&userId=${userId}`);
      isFavorite.value = false;  // Update local state
    } else {
      // Call the API to add it to favorites
      console.log(`${API_BASE_URL}${API_ENDPOINTS.POST_USER_MANGA_FAVORITE}?mangaId=${mangaId}&userId=${userId}`)
      await axios.post(`${API_BASE_URL}${API_ENDPOINTS.POST_USER_MANGA_FAVORITE}?mangaId=${mangaId}&userId=${userId}`);
      isFavorite.value = true;  // Update local state
    }
  } catch (error) {
    console.error('Error while toggling favorite:', error);
  }
};
</script>

<style scoped>
.manga-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  overflow: hidden;
}

.manga-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 1s ease-in-out;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80%;
  background: linear-gradient(
    to top,
    rgba(15, 14, 12, 1) 0%,    
    rgba(33, 29, 21, 1) 66%,    
    rgba(33, 29, 21, 0.5) 90%,   
    rgba(151, 151, 151, 0) 100%
  );
  color: white;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.manga-info {
  max-width: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.manga-name {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0;
  animation: fadeIn 1.5s forwards;
  position: sticky;
  top: 0;
  z-index: 10; /* Ensure it stays on top */
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.ranking {
  width: 80%;
  margin: 0 auto;
  max-height: 400px;
  overflow-y: auto; /* Allows vertical scrolling */
  padding-right: 20px; /* Prevents content from being hidden under the scrollbar */
}

/* Hide the scrollbar in Webkit browsers (Chrome, Safari) */
.ranking::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Hide scrollbar in Firefox */
.ranking {
  scrollbar-width: none; /* For Firefox */
}

/* Hide scrollbar in Internet Explorer and Edge */
.ranking {
  -ms-overflow-style: none; /* For IE and Edge */
}

.ranking-rows {
  display: flex;
  flex-direction: column;
}

.no-rating-message {
  color: red;
  font-size: 14px;
  font-style: italic;
}

@media (max-width: 768px) {
  .manga-container {
    max-width: 100%;
  }
  .ranking {
    width: 100%;
  }
}
.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  --p-button-secondary-color: var(--p-amber-400);
  --p-button-secondary-hover-color: var(--p-amber-300);

} 

</style>
