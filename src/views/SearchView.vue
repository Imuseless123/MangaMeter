<template>
  <div class="container">
    <div class="left-half">
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          class="search-bar" 
          v-model="searchTerm" 
          @keyup.enter="fetchMangas"
        />
        <div class="rectangle-list">
          <MangaSearchEntry 
            v-for="(manga, index) in mangas" 
            :key="index" 
            :name="manga.mangaName" 
            :image="`https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverFileName}`" 
            :genres="manga.genreTags" 
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
import axios from 'axios';

// Reactive reference to store manga details
const mangas = ref([]);

// Reactive reference for the search term
const searchTerm = ref('');

// Function to fetch mangas from the backend
const fetchMangas = async () => {
  if (!searchTerm.value.trim()) return; // Exit if search term is empty
  
  try {
    // Make a GET request to the backend API
    const response = await axios.get(`http://localhost:3000/searchTitle/`, {
      params: {
        title: searchTerm.value,
        limit: 5,
        page: 1,
        order: 'desc'
      }
    });

    // Update the mangas array with the response data
    mangas.value = response.data;
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%; 
}

.left-half {
  flex: 1; /* Takes 50% of the container */
  background-color: #1E1E1E; /* Change to your desired color */
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
  height: 40px;
  border: 0px;
  padding-left: 10px;
  border-radius: 10px;
  background: linear-gradient(to right, #521414 0%, #3E240F 53%, #A6721F 100%);
  color: #FFFFFF;
}

.rectangle-list {
  flex: 1;
  height: 100%;
  overflow-y: auto; /* Enables vertical scrolling */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 15px;
}



</style>
