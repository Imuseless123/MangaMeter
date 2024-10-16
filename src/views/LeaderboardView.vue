<template>
  <div class="outer-container">
    <div class="scroll-container" ref="scrollContainer">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="rectangle">
        {{ item }}
      </div>
    </div>
    <button class="overlay-button" @click="toggleOverlay">Genres</button>
    <div class="overlay" v-show="isOverlayVisible">
      <input type="text" placeholder="Search genres..." class="search-bar" v-model="searchQuery" />
      <div class="genre-list">
        <div 
          v-for="(genre, index) in filteredGenres" 
          :key="index" 
          class="genre-item"
          @click="selectGenre">
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import { ref,computed, onMounted } from 'vue';

const items = Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`);
const scrollContainer = ref(null);
const isOverlayVisible = ref(false);
const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
const searchQuery = ref('');

const toggleOverlay = () => {
  isOverlayVisible.value = !isOverlayVisible.value;
};
const selectGenre = () => {
  isOverlayVisible.value = false;
};
const filteredGenres = computed(() => {
  if (!searchQuery.value) return genres;
  return genres.filter(genre => genre.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
onMounted(() => {
  const container = scrollContainer.value;
  const itemWidth = container.scrollWidth / items.length;
  
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

.rectangle {
  min-width: 400px;
  height: 100%; /* The child now takes the full height of the parent */
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, opacity 0.3s;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box; /* To include padding/border in the height calculation */
}


/* Zoom effect on hover */
.rectangle:hover {
  transform: scale(1.05);
  opacity: 1; /* Ensure the hovered rectangle is fully opaque */
}

/* Dim effect for other rectangles when one is hovered */
.scroll-container:hover .rectangle {
  opacity: 0.5;
}

/* Ensure hovered rectangle stays fully visible */
.scroll-container:hover .rectangle:hover {
  opacity: 1;
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
  max-height: calc(100% - 60px); /* Adjust to fit the search bar height */
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
