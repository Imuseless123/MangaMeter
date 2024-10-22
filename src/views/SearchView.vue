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

    <div class="right-half font_roboto">
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
                    <div class="score-holder">
                      7.9
                    </div>
                  </div>
                  <div class="user-col">
                    <div class="user-score-holder">
                      7
                    </div>
                  </div>
                </div>
                <div class="ranking-row" v-for="(genre, index) in selectedManga.genres" :key="index">
                  <div class="genre-col">
                    {{ genre }}:
                  </div>
                  <div class="overall-col">
                    <div class="score-holder">
                      {{ index }}
                    </div>
                  </div>
                  <div class="user-col">
                    <div class="user-score-holder">
                      7
                    </div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,defineAsyncComponent,nextTick } from 'vue';
import MangaSearchEntry from '../components/MangaSearchEntry.vue';
import axios from 'axios';

const mangas = ref([]);
const searchTerm = ref('');
const selectedMangaIndex = ref(null); // Track the selected manga index
const selectedManga = ref(null);
let h2Element;

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

    mangas.value = response.data;
    selectedMangaIndex.value = null; // Reset selection when new data is fetched
    selectedManga.value = null;
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};

// Function to update the selected manga index
const selectManga = async (index) => {
  selectedMangaIndex.value = index;

  // Get the selected manga's data
  const manga = mangas.value[index];
  selectedManga.value = {
    name: manga.mangaName,
    image: `https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverFileName}`,
    genres: manga.genreTags,
  };

  await nextTick(() => {
    h2Element = document.getElementById('mangaName');
    console.log(h2Element);  // This should now return the correct element
    checkOverflow(h2Element);
  });
};

// // Function to check if the h2 element overflows
// const checkOverflow = () => {
//   // console.log(h2Element.scrollWidth);
//   if (h2Element && h2Element.scrollWidth > h2Element.clientWidth) {
//     h2Element.style.alignItems = 'flex-start'; // Change to flex-start if overflow detected
//     console.log("flex-start");
//   } else if (h2Element){
//     h2Element.style.alignItems = 'flex-end'; // Reset to default if no overflow
//     console.log("flex-end");
//   }
// };
</script>
<style scoped>
.font_roboto{
  font-family: 'Roboto', sans-serif;
}

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
