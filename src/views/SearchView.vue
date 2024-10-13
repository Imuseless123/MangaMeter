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
            :isSelected="selectedMangaIndex === index" 
            @selectManga="selectManga(index)"
          />
        </div>
      </div>
    </div>

    <div class="right-half">
      <template v-if="selectedManga">
        <div class="manga-container">
          <img :src="selectedManga.image" alt="Manga Cover" class="manga-image" />
          <div class="overlay">
            <div class="manga-info">
              <h2>{{ selectedManga.name }}</h2>
              <p><strong>Genres:</strong> {{ selectedManga.genres.join(', ') }}</p>
              <p><strong>Overall:</strong> 7.9</p>
              <p><strong>Action:</strong> 7.9</p>
              <p><strong>Drama:</strong> 7.9</p>
              <p><strong>Mystery:</strong> 7.9</p>
            </div>
            <div class="ratings">
              <p>7</p>
              <p>9</p>
              <p>6</p>
              <p>8</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p>Select a manga to view its details.</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MangaSearchEntry from '../components/MangaSearchEntry.vue';
import axios from 'axios';

const mangas = ref([]);
const searchTerm = ref('');
const selectedMangaIndex = ref(null); // Track the selected manga index
const selectedManga = ref(null);

const fetchMangas = async () => {
  if (!searchTerm.value.trim()) return;

  try {
    const response = await axios.get(`http://localhost:3000/searchTitle/`, {
      params: {
        title: searchTerm.value,
        limit: 5,
        page: 1,
        order: 'desc'
      }
    });

    mangas.value = response.data;
    selectedMangaIndex.value = null; // Reset selection when new data is fetched
    selectedManga.value = null;
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};

// Function to update the selected manga index
const selectManga = (index) => {
  selectedMangaIndex.value = index;

  // Get the selected manga's data
  const manga = mangas.value[index];
  selectedManga.value = {
    name: manga.mangaName,
    image: `https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverFileName}`,
    genres: manga.genreTags,
  };
};
</script>
<style scoped>
.container {
  display: flex;
  height: 100%; 
}

.left-half {
  flex: 1; /* Takes 50% of the container */
  /* background-color: #1E1E1E; */
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
  outline: none; /* Removes the default outline */
}

.search-bar:focus{
  outline: 2px solid #A6721F;
  outline-offset: 2px;
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

/* Custom scrollbar styling */
.rectangle-list::-webkit-scrollbar {
  width: 8px;
}

.rectangle-list::-webkit-scrollbar-thumb {
  background-color: #A6721F;
  border-radius: 10px;
}

.right-half {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  position: relative;
  background-color: #1E1E1E;
  border-radius: 10px;
}

.manga-container {
  position: relative;
  width: 100%;
  max-width: 800px; /* Adjust based on your layout */
  height: 100%;
  /* border-radius: 10px; */
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
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
}

.manga-info {
  max-width: 70%;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
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


</style>
