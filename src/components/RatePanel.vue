<template>
  <div v-if="selectedManga" class="manga-container">
    <img :src="selectedManga.image" alt="Manga Cover" class="manga-image" />
    <div class="overlay">
      <div class="manga-info">
        <h2 id="mangaName" class="mangaName">
          {{ selectedManga.name }}
        </h2>

        <div class="ranking" >
          <!-- Overall Ranking Row -->
          <RankingRow :isOverall="true" :overallScore="overallScore"  />

          <!-- Genre Ranking Rows -->
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRatingStore } from '@/stores/RatingStore';
import { useAccountStore } from '@/stores/AccountStore';
import RankingRow from './RankingRow.vue';

const ratingStore = useRatingStore();
const accountStore = useAccountStore();
const isMobile = ref(false);
const overalScore = ref(null);

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
  