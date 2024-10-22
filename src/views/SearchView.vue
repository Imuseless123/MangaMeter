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
                {{ selectedManga.name }} {{ selectedManga.name }} {{ selectedManga.name }}
              </h2>
              <div class="ranking">
                <ul class="noDeco">
                  <li class="center-text overall">
                    <ul class="noDeco spacing ranking-row-layout">
                      <li class="mange-genre">
                        <strong>Overall:</strong>
                      </li>
                      <li class="manga-score">
                        7.9
                      </li>
                      <li class="user-score">
                        7
                      </li>
                    </ul>
                  </li>
                  <li class="center-text" v-for="(genre, index) in selectedManga.genres" :key="index">
                    <ul class="noDeco spacing ranking-row-layout">
                      <li class="mange-genre">
                        {{ genre }}:
                      </li>
                      <li class="manga-score">
                        {{ index }}
                      </li>
                      <li class="user-score">
                        7
                      </li>
                    </ul>
                  </li>
                </ul>
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
  padding: 20px;
  border-radius: 10px;
}

.manga-info {
  max-width: 95%;
}

h2 {
  max-width: 911px;
  height: 200px;
  font-size: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex; /* Changed from -webkit-box to flex */
  align-items: flex-end; /* Aligns text to the top */
  position: relative;
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
  display: flex;
  justify-content: center;
}

.noDeco {
  list-style-type: none; /* Remove bullet points */
}

.spacing {
  margin-bottom: 10px; /* Add spacing between each list item */
}

.ranking-row-layout {
  max-width: 500px;
  display: flex; /* Align items horizontally */
  justify-content: space-between; /* Space out all items evenly */
  align-items: center; /* Vertically align items */
}

.ranking-row-layout li:first-child {
  flex: 1; /* Take up available space */
}

.ranking-row-layout li:nth-child(2),
.ranking-row-layout li:nth-child(3) {
  min-width: 200px; /* Ensures second and third li have equal minimum width */
  text-align: center; /* Center the text within the li */
}

/* ul.user-spacing li {
  margin-top: 5px;
  margin-bottom: 10px;
}

ul.user-spacing li:last-child {
  margin-bottom: 0; 
} */

.center-text{
  display: flex;
  justify-content: center;
  align-items: center;
}

.manga-score{
  padding: 5px 0px;
  border-radius: 5px;
  /* width: 80px; */
  background-color: #D89831;
  float: left;
  width: 50%;
}

.user-score{
  font-size: 10px;
  padding: 5px 0px;
  border-radius: 5px;
  /* width: 80px; */
  background-color: #515552;
  float: left;
  width: 25%;
}

.mange-genre{
  padding: 5px 0px;
  justify-content: flex-start;
  float: left;
  width: 25%;
}

.overall{
  font-size: 20px;
}

.score-section{
  display: flex;
  justify-items: start;
}

.a{
  background-color: aqua;
}

.b{
  background-color: aliceblue;
}

</style>
