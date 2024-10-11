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
    image: "https://uploads.mangadex.org/covers/6cf12805-6bdb-441f-90dc-facd8e85d5fa/95c7ae69-8d57-45fc-ac43-52103e522d31.png", // Add your image path here
    genres: ['Action', 'Adventure']
  },
  {
    title: "Example Manga 2",
    image: "https://uploads.mangadex.org/covers/8f22b5ff-2d76-4f5d-9b35-7969de2dc66d/75f5dc12-b04c-4ced-b9ae-2358615fea2e.png",
    genres: ['Fantasy', 'Drama']
  },
  {
    title: "Example Manga 3",
    image: "",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "",
    genres: ['Comedy', 'Slice of Life']
  },
  {
    title: "Example Manga 3",
    image: "g",
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
