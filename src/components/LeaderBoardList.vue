<template>
    <div class="background-container">
  <div v-if="mangas.length > 0" class="fade-left"></div>
    </div>
    
    <div class="container">
    
    <div class="result-container">
      <div v-if="isLoading" class="loading-indicator">
        Loading...
      </div>
      <div v-else class="loaded-container">
        <div class="page">
        <div class="pagination" v-if="mangas.length > 0">
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
  </div>
    <!-- </div> -->
  
  </template>
  <script setup>
  import { ref,nextTick, computed, onMounted } from 'vue';
  import axios from 'axios';
  import MangaSearchEntry from './MangaSearchEntry.vue';
  import { useRatingStore } from '@/stores/RatingStore';
  import { defineProps } from 'vue';
  const props = defineProps({
  genreId: String,

});

  const selectedMangaIndex = ref(null);
  const selectedManga = ref(null);
  const mangas = ref([]);
  const ratingStore = useRatingStore();
  const currentPage = ref(1);
  const total = ref(0);
  const isLoading = ref(false); 
  const totalPages = computed(() => {
    return Math.ceil(total.value / 10); // 10 is the number of manga per page
  });
  const fetchMangas = async () => {
    isLoading.value = true;
  
    try {
      const response = await axios.get(`https://mangameterapi.littlebutenough.com/getAverGRating/`, {
        params: {
          genreId: props.genreId,
          limit: 10,
          page: currentPage.value,
          sortDescending: 1
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
    finally {
      isLoading.value = false; // Set loading state to false when fetch is complete
    }
  };
  
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      fetchMangas();
    }
  };
  // Computed property for visible pages
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
    return [...new Set(pages)]; // Remove duplicate '...' entries
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

  onMounted(async () => {
    console.log(props.genreId);

    fetchMangas();
  });
  </script>
  <style scoped>
  
  .search-bar:focus{
    outline: 2px solid #A6721F;
    outline-offset: 2px;
  }
  
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
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
  
  .pagination {
    display: flex;
    gap: 4px; /* Adds spacing between buttons */
  }
  
  .pagination button {
    background-color: transparent;
    color: white;
    border: 1px solid #7e3d3d; /* Softer border color for visual depth */
    border-radius: 5px;
    padding: 6px 12px; /* Slightly larger padding for a more modern feel */
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  
  .pagination button:hover:not(:disabled) {
    background-color: #A6721F; /* Highlight color on hover */
    color: #1e1e1e; /* Dark text color on hover for contrast */
    transform: translateY(-2px); /* Subtle lift effect */
  }
  
  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination button.active {
    background-color: #A6721F;
    color: #1e1e1e;
    border: 1px solid #8a5c23; /* A slightly darker border for the active state */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow for the active button */
  }
  
  .pagination button:not(:disabled):not(.active):hover {
    border-color: #A6721F; /* Add border color change on hover */
  }
  
  .loading-indicator {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Adjust height according to your needs */
    font-size: 18px; /* Text size */
    color: #666; /* Loading text color */
    font-weight: bold;
  }
  
  .loading-indicator::before {
    content: '';
    border: 4px solid transparent;
    border-top: 4px solid #db8d34; /* Blue spinner color */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin-right: 10px; /* Space between text and spinner */
  }
  
  /* Keyframes for the spinning animation */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loaded-container{
    display: flex;           /* Optional: Flex layout for alignment */
    flex-direction: column; /* Align children vertically */
    height: 100%;           /* Take full height of the parent */
    width: 100%;            /* Take full width */
    overflow: hidden;
  }
  .fade-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* Adjust the width as desired for the fading area */
    height: 100%;
    background: linear-gradient(to right, black 50%, transparent);
    pointer-events: none; /* Prevents overlay from interfering with clicks */
    z-index: -1;
  }
  .background-container{
    height: 100%;
    width: 100%;
    position: absolute;
  }
  
  </style>
  