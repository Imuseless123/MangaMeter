<template>
  <div v-if="selectedManga" class="manga-container">
    <img :src="selectedManga.image" alt="Manga Cover" class="manga-image" />
    <div class="overlay">
      <div class="manga-info">
        <h2 id="mangaName" class="mangaName">
          {{ selectedManga.name }}
        </h2>

        <div class="ranking" v-if="mangaRatingsLoaded">
          <!-- Overall Ranking Row -->
          <RankingRow :isOverall="true" :overallScore="7.9" :userScore="7" />

          <!-- Genre Ranking Rows -->
          <RankingRow
            v-for="(genre, index) in selectedManga.genres"
            :key="genre.id"
            :genreId="genre.id"
            :genreName="genre.name"
            :overallScore="getGenreRating(genre.id)" 
            :isLoggedIn="isLoggedIn"
            v-if="!ratingStore.ratingFetchError"
            
          />
          <p v-if="ratingStore.ratingFetchError" class="no-rating-message">
            No ratings available for this manga.
          </p>
          <p v-if="mangaRatingsEmpty" class="no-rating-message">
            No ratings yet for this manga.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRatingStore } from '@/stores/RatingStore';
import { useAccountStore } from '@/stores/AccountStore';
import RankingRow from './RankingRow.vue';

const ratingStore = useRatingStore();
const accountStore = useAccountStore();
const isMobile = ref(false);

// Use computed property to get the selected manga
const selectedManga = computed(() => ratingStore.selectedManga);
const isLoggedIn = computed(() => accountStore.isLoggedIn); 


const mangaRatingsLoaded = computed(() => ratingStore.mangaPublicRatings.length > 0);

const getGenreRating = (genreId) => {
  const rating = ratingStore.mangaPublicRatings.find(rating => rating.genreid === genreId);
  return rating ? rating.averagerating : 0; // Return the average rating, or 0 if not found
};
// Computed to check if manga ratings are empty
const mangaRatingsEmpty = computed(() => {
  return ratingStore.mangaPublicRatings.length === 0 && !ratingStore.ratingFetchError;
});
// Function to update `isMobile` based on screen width
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 1200;
};

// Set up event listeners on mount, remove on unmount
onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>
  <style scoped>

  
  .manga-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 100%;
  }
  
  .manga-image {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .overlay {
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to top,
      rgba(15, 14, 12, 1) 0%,      /* #0F0E0C at 100% opacity */
      rgba(33, 29, 21, 1) 66%,     /* #211D15 at 100% opacity */
      rgba(33, 29, 21, 0.5) 90%,   /* #211D15 at 50% opacity */
      rgba(151, 151, 151, 0) 100%  /* #979797 at 0% opacity */
    );
    color: white;
    display: flex;
    justify-content: center;
    /* align-items: start; */
    padding: 20px;
    border-radius: 10px;
  }
  
  .manga-info {
    max-width: 95%;
    width: 100%;
    /* background-color: yellow; */
  }
  
  h2 {
    max-width: 911px;
    height: 100px;
    font-size: 20px;
    margin-bottom: 10px;
    overflow: hidden;
    display: flex; /* Changed from -webkit-box to flex */
    align-items: flex-end; /* Aligns text to the top */
    position: relative;
    /* background-color: aquamarine; */
    margin-bottom: 50px;
  }
  
  
  p {
    margin: 5px 0;
  }
  
  .ratings {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .ratings p {
    margin: 5px 0;  
    font-size: 18px;
    font-weight: bold;
  }
  
  .mangaName{
    justify-content: center;
  }
  
  .ranking{
    width: 80%;
    margin: 0 auto;
    /* background-color: antiquewhite; */
  }
  .no-rating-message {
  color: red;
  font-size: 14px;
  font-style: italic;
}
  </style>
  