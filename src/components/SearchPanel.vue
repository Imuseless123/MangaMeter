<template>
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
  
</template>
<script setup>
import { ref, onMounted, onUnmounted,nextTick } from 'vue';
import axios from 'axios';
import MangaSearchEntry from './MangaSearchEntry.vue';
import { useRatingStore } from '@/stores/RatingStore';
const selectedMangaIndex = ref(null);
const selectedManga = ref(null);
const mangas = ref([]);
const searchTerm = ref('');
const ratingStore = useRatingStore();
const fetchMangas = async () => {
  if (!searchTerm.value.trim()) return;

  try {
    const response = await axios.get(`http://localhost:3000/manga/search/`, {
      params: {
        title: searchTerm.value,
        limit: 5,
        page: 1,
        order: 'desc'
      }
    });
    console.log(response);

    mangas.value = response.data;
    selectedMangaIndex.value = null; // Reset selection when new data is fetched
    selectedManga.value = null;
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};
const selectManga = async (index) => {
  selectedMangaIndex.value = index;

  // Get the selected manga's data
  const manga = mangas.value[index];

  // Store the selected manga in the Pinia store
  ratingStore.setSelectedManga({
    id: manga.mangaId,
    name: manga.mangaName,
    image: `https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverFileName}`,
    genres: manga.genreTags,
  });

  await nextTick(() => {
    const h2Element = document.getElementById('mangaName');
    console.log(h2Element);  // This should now return the correct element
  });

  console.log("Manga selected: ", ratingStore.selectedManga); // Log the selected manga from the store
};
</script>
<style scoped>
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

</style>