<template>
  <div class="outer-container">
    <div class="scroll-container" ref="scrollContainer">
      <LeaderboardPanel
        v-for="(genre, index) in genres"
        :key="index"
        :class="[
          'rectangle', 
          { 'selected-rectangle': selectedIndex === index }
        ]"
        :genre="genre"
        :topManga="'Reincarnated as the Lazy and Villainous Noble, I Broke the Scenario and Became the Most Formidable With Extraordinary Magic'"
        :secondManga="'asdsaqw'"
        :thirdManga="'asdasdcvs'"
        @click="selectGenre(genre)"
      >
        {{ genre }}
      </LeaderboardPanel>

    </div>
    <button class="overlay-button" @click="toggleOverlay">Genres</button>
    <div class="overlay" v-show="isOverlayVisible">
      <input type="text" placeholder="Search genres..." class="search-bar" v-model="searchQuery" />
      <div class="genre-list">
        <div 
          v-for="(genre, index) in filteredGenres" 
          :key="index" 
          class="genre-item"
          @click="selectGenre(genre)">
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import LeaderboardPanel from '../components/LeaderboardPanel.vue';
const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
const scrollContainer = ref(null);
const isOverlayVisible = ref(false);
const searchQuery = ref('');
const selectedIndex = ref(null);

const selectGenre = (selectedGenre) => {
  // Find the index of the selected genre in the original genres array
  const index = genres.indexOf(selectedGenre);
  
  if (index !== -1) {
    selectedIndex.value = index; // Set the selected index to the original index
    isOverlayVisible.value = false;

    // Scroll the container to the selected rectangle smoothly
    const container = scrollContainer.value;
    const rectangles = container.children;
    const selectedRectangle = rectangles[index];
    
    container.scrollTo({
      left: selectedRectangle.offsetLeft - (container.clientWidth / 2) + (selectedRectangle.clientWidth / 2),
      behavior: 'smooth'
    });
  }
};


const toggleOverlay = () => {
  isOverlayVisible.value = !isOverlayVisible.value;
};



const filteredGenres = computed(() => {
  if (!searchQuery.value) return genres;
  return genres.filter(genre => genre.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

onMounted(() => {
  const container = scrollContainer.value;
  const itemWidth = container.scrollWidth / genres.length;
  
  // Set padding to allow centering of the first and last rectangles
  container.style.paddingLeft = `${container.clientWidth / 2 - itemWidth / 2}px`;
  container.style.paddingRight = `${container.clientWidth / 2 - itemWidth / 2}px`;
});
</script>

<style scoped>
.outer-container{
  position: relative;
  height: 100%;
  width: 100%;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  padding: 50px; /* Use padding instead of margin */
  gap: 30px;
  align-items: center;
  height: 100%; /* Set the height to take up the full available space */
  box-sizing: border-box; /* Ensure padding is included in the width/height */
}

/* Brighten effect on hover */
.rectangle:hover {
  opacity: 1; /* Ensure the hovered rectangle is fully opaque */
}

/* Selected rectangle style - zoom effect */
.selected-rectangle {
  transform: scale(1.05);
  opacity: 1;
  transition: transform 0.3s, opacity 0.3s;
}

/* Default style for rectangles */
.rectangle {
  min-width: 400px;
  height: 100%; /* The child now takes the full height of the parent */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s; /* Only transition opacity for hover */
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.5; /* Set default opacity for unselected state */
  box-sizing: border-box;
}

/* Selected rectangle style, only applied when not hovered */
.selected-rectangle {
  transform: scale(1.05);
  opacity: 1;
}
/* Dim effect for other rectangles when one is hovered */
.scroll-container:hover .rectangle:not(:hover):not(.selected-rectangle) {
  opacity: 0.5;
}
.overlay-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
/* Overlay styles */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; /* Covers the left half of the parent */
  height: 100%; /* Covers the entire height of the parent */
  background: linear-gradient(to right, var(--color-surface-a0), transparent); /* Gradient from dark to transparent */
  z-index: 20; /* Ensure it is above other elements */
}
.search-bar {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.genre-list {
  flex-grow: 1; /* Take up the remaining space in the overlay */
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100% - 20px); /* Adjust to fit the search bar height */
  scrollbar-width: none; /* For Firefox */
}

.genre-list::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Edge */
}
.genre-item {
  /* background-color: #3498db; */
  height: 80px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

</style>
