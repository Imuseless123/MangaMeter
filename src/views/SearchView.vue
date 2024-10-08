<template>
  <div class="container">
    <div class="left-half">
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-bar" />
        <div class="rectangle-list">
          <MangaSearchEntry 
            v-for="(manga, index) in mangas" 
            :key="index" 
            :name="manga.title" 
            :image="manga.image" 
            :genres="manga.genres" 
          />
        </div>
      </div>
    </div>
    <div class="right-half">Right Half</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MangaSearchEntry from '../components/MangaSearchEntry.vue';

// Sample data for rectangle items
// Sample manga data
const mangas = ref([
  {
    title: "Example Manga 1",
    image: "path/to/placeholder-image1.jpg", // Add your image path here
    genres: ['Action', 'Adventure']
  },
  {
    title: "Example Manga 2",
    image: "path/to/placeholder-image2.jpg",
    genres: ['Fantasy', 'Drama']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "path/to/placeholder-image3.jpg",
    genres: ['Comedy', 'Slice of Life']
  },
  // Add more manga entries as needed
]);
</script>

<style scoped>
.container {
  display: flex;
  height: 100%; 
}

.left-half {
  flex: 1; /* Takes 50% of the container */
  background-color: lightblue; /* Change to your desired color */
  display: flex;
  align-items: flex-start; /* Align items to the top */
  justify-content: center; /* Center horizontally */
  padding: 40px; /* Add padding */
  box-sizing: border-box; /* Include padding in the total width/height */
}

.right-half {
  flex: 1; /* Takes 50% of the container */
  background-color: lightcoral; /* Change to your desired color */
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between search bar and rectangles */
}

.search-bar {
  width: 100%;
  height: 60px;
  border: 0px;
  padding: 0px;
  border-radius: 10px;
}

.rectangle-list {
  flex: 1;
  height: 100%;
  overflow-y: auto; /* Enables vertical scrolling */
  display: flex;
  flex-direction: column;
  gap: 12px;
}



</style>
