<template>
    <template v-if="selectedManga">
      <div class="manga-container">
        <img :src="selectedManga.image" alt="Manga Cover" class="manga-image" />
        <div class="overlay">
  
          <div class="manga-info">
            <h2 id="mangaName" class="mangaName">
              {{ selectedManga.name }}
            </h2>
            <div class="ranking">
              <div class="ranking-row">
                <div class="genre-col">
                  <strong>Overall:</strong>
                </div>
                <div class="overall-col">
                  <div class="score-holder">7.9</div>
                </div>
                <div class="user-col">
                  <div class="user-score-holder">7</div>
                </div>
              </div>
              <div class="ranking-row" v-for="(genre, index) in selectedManga.genres" :key="index">
                <div class="genre-col">
                  {{ genre }}:
                </div>
                <div class="overall-col">
                  <div class="score-holder">{{ index }}</div>
                </div>
                <div class="user-col">
                  <div class="user-score-holder">7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>Select a manga to view its details.</p>
    </template>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useRatingStore } from '@/stores/RatingStore'; // Adjust the path based on your project structure
  
  const ratingStore = useRatingStore(); // Use the Pinia store
  const isMobile = ref(false);
  
  // Computed property to get the selected manga from the store
  const selectedManga = computed(() => ratingStore.selectedManga);
  
  // Check screen size to update `isMobile` flag
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 1200; // Adjust as needed for mobile breakpoint
  };
  
  // Run on component mount and window resize
  onMounted(() => {
    updateIsMobile(); // Initial check
    window.addEventListener('resize', updateIsMobile); // Listen for screen resizing
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
  });
  
  // const closeDetails = () => {
  //   ratingStore.setSelectedManga(null);
  // };
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
  
  .ranking-row{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    /* background-color: aqua; */
  }
  
  .genre-col{
    width: 25%;
    font-size: 20px;
    /* background-color: red; */
  }
  
  .overall-col{
    width: 30%;
    font-size: 20px;
    /* background-color: blue; */
  }
  
  .user-col{
    width: 18%;
    font-size: 18px;
    justify-content: center;
    /* background-color: yellowgreen; */
    margin: auto 0;
  }
  
  .score-holder{
    width: 80%;
    padding: 5px 0;
    margin-left: auto;
    text-align: center;
    background-color: #D89831;
    border-radius: 5px;
  }
  
  .user-score-holder{
    width: 100%;
    padding: 2px 0;
    text-align: center;
    background-color: #515552;
    border-radius: 0 5px 5px 0;
  }
  
  </style>
  