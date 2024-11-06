<template>
  <div class="container">
    <div class= "search">
      <input 
          type="text" 
          placeholder="Search..." 
          class="search-bar" 
          v-model="searchTerm" 
          @keyup.enter="fetchMangas"
        />
    </div>
    <div class="result-container">
      <div class="page">
        <div class="pagination">
          <button @click="changePage(1)" :disabled="currentPage === 1"><<</button>
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"><</button>
          <span v-for="page in visiblePages" :key="page">
            <button 
              @click="changePage(page)" 
              :class="{ active: currentPage === page }"
              :disabled="currentPage === page"
            >
              {{ page }}
            </button>
          </span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">></button>
          <button @click="changePage(totalPages)" :disabled="currentPage === totalPages">>></button>
        </div>
      </div>

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
</template>
<script setup>
import { ref,nextTick, computed } from 'vue';
import axios from 'axios';
import MangaSearchEntry from './MangaSearchEntry.vue';
import { useRatingStore } from '@/stores/RatingStore';
const selectedMangaIndex = ref(null);
const selectedManga = ref(null);
const mangas = ref([]);
const searchTerm = ref('');
const ratingStore = useRatingStore();
const currentPage = ref(1);
const totalPages = ref(10);
const total = ref(0);
const fetchMangas = async () => {
  if (!searchTerm.value.trim()) return;

  try {
    const response = await axios.get(`http://localhost:3000/manga/search/`, {
      params: {
        title: searchTerm.value,
        limit: 5,
        page: currentPage.value,
        order: 'desc'
      }
    });
    console.log(response);

    mangas.value = response.data.data;
    total.value =  response.data.total;
    selectedMangaIndex.value = null; // Reset selection when new data is fetched
    selectedManga.value = null;
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchMangas();
  }
};
const visiblePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 || 
      i === totalPages.value || 
      (i >= currentPage.value - 2 && i <= currentPage.value + 2)
    ) {
      pages.push(i);
    } else if (
      i === currentPage.value - 3 || 
      i === currentPage.value + 3
    ) {
      pages.push('...');
    }
  }
  return pages;
});
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

.search-bar:focus{
  outline: 2px solid #A6721F;
  outline-offset: 2px;
}

.container {
  width: 100%;
  flex: 1;
  gap: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Adjust this to fit your layout */
  overflow-x: visible;
}
.search{
  width: 100%;
}
.result-container{
  box-sizing: border-box;
  position: relative;
  size: 100%;
  flex: 1;  
  overflow: hidden;
  /* background-color: #A6721F; */
  overflow-x: visible;
}
.page{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
  z-index: 10;
  background: linear-gradient(to top, #000000 0%, #00000000 100%);
}
.search-bar {
  width: 100%;
  height: 40px;
  border: 0px;
  border-radius: 10px;
  background: linear-gradient(to right, #521414 0%, #3E240F 53%, #A6721F 100%);
  color: #FFFFFF;
  outline: none; /* Removes the default outline */
}
.rectangle-list {
  display: flex;           /* Enable flexbox layout */
  flex-direction: column; /* Stack children vertically */
  overflow-y: auto;      /* Enable vertical scrolling */
  height: 100%;         /* Set a fixed height (adjust as needed) */
  width: 100%;           /* Ensure it takes the full width */
  gap: 40px;            /* Set the gap between child components */
  overflow-x: visible;
}
.rectangle-list::-webkit-scrollbar {
  width: 8px;  padding-right: 15px;
}

.rectangle-list::-webkit-scrollbar-thumb {
  background-color: #A6721F;
  border-radius: 10px;
}

.pagination{
  display: flex;
}
.pagination button {
  background-color: #521414;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #A6721F;
}

</style>