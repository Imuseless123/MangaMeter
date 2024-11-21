<template>
  <div class="leaderboard-panel">
    <div class="panel-section genre-name">
      <h3>{{ genreName }}</h3>
    </div>
    <div class="panel-section top-manga">
        <div class="manga-background" :style="{ backgroundImage: topMangaCoverUrl ? `url(${topMangaCoverUrl})` : 'url(/placeholder_image.png)' }">
            <div class="manga-title-wrapper">
                <p class="manga-title">#1<br /> {{ topManga }}</p>
            </div>

        </div>
    </div>
    <div class="panel-section second-manga">
      <p>#2: {{ secondManga }}</p>
    </div>

    <!-- Section 4: Third Manga -->
    <div class="panel-section third-manga">
      <p>#3: {{ thirdManga }}</p>
    </div>

    <!-- Section 5: More Details Button -->
    <div class="panel-section details-button-section">
      <Button @click="goToLeaderboardDetail">More details</Button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Button from 'primevue/button';

const topManga = ref('');
const secondManga = ref('');
const thirdManga = ref('');
const topMangaCoverUrl = ref('');

const props = defineProps({
  genreName: String,
  genreId: String,
});
const router = useRouter();
const goToLeaderboardDetail = () => {
  // Use props.genre in the params for navigation
  router.push({ name: 'LeaderboardDetail', params: { genreId: props.genreId } });
};

const fetchTopThree = async () =>{
  try {
      const response = await axios.get(`https://mangameterapi.littlebutenough.com/getAverGRating/`, {
        params: {
          genreId: props.genreId,
          limit: 3,
          page: 1,
          sortDescending: 'desc'
        }
      });
      console.log(response);
      const mangas = response.data.data;
      if (mangas.length > 0) {
        topManga.value = mangas[0].mangaName || '';
        topMangaCoverUrl.value = `https://uploads.mangadex.org/covers/${mangas[0].mangaId}/${mangas[0].coverFileName}`;
      }
      if (mangas.length > 1) secondManga.value = mangas[1].mangaName || '';
      if (mangas.length > 2) thirdManga.value = mangas[2].mangaName || '';
      console.log(mangas);

    } catch (error) {
      console.error("Error fetching manga:", error);
    }
}
onMounted(async () => {
  fetchTopThree();
});
</script>

<style scoped>
.leaderboard-panel {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.panel-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

/* Genre name section */
.genre-name {
  background-color: #21292e;
  width: 100%;
  flex: 0.5;
}

/* Top manga section (largest) */
.top-manga {
  position: relative;
  background-color: #21292e;
  width: 100%;
  overflow: hidden;

  flex: 4; /* Ratio 1:1 for the main section */
}

/* Second manga section */
.second-manga {
  background-color: #2f373b;
  width: 100%;

  flex: 1;
}

/* Third manga section */
.third-manga {
  background-color: #21292e;
  width: 100%;

  flex: 1;
}

/* More details button section */
.details-button-section {
  background-color: #aa7a2b;
  width: 100%;

  flex: 0.5;
}
.manga-background {
    width: 100%;
    height: 100%;
    background-image: url('/placeholder_image.png'); /* Use your image path here */
    background-size: cover; /* Make the image fill the container */
    background-position: center; /* Center the image */
    position: relative;
    display: flex;
    align-items: flex-end; /* Align the text at the bottom */
}

.manga-background::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, #131618 0%, rgba(0,0,0,0.6) 70%, transparent);; /* Dark fade from bottom to top */
    z-index: 1; /* Ensure the gradient is above the image but below the text */
}

.manga-background p {
    position: relative;
    z-index: 2; /* Ensure the text is above the gradient */
    color: white;
    font-size: 1.5rem;
    margin: 0;
}
.manga-title-wrapper {
    position: absolute; /* Position the title over the image */
    bottom: 0; /* Start at the bottom */
    width: 100%;
    padding: 0px; /* Add some padding */
    display: flex;
    flex-direction: column; /* Arrange items vertically */
    justify-content: flex-end; /* Align children to the bottom */
}


.manga-title {
    width: 100%;
    color: white;
    font-size: 3rem; /* Increase the font size */
    font-weight: bold; /* Make the text bold */
    margin: 0;
    max-height: 4.8em; /* Allow up to 4 lines (4 * 1.2em) */
    overflow-y: auto; /* Enable vertical scrolling if text exceeds height */
    line-height: 1.2; /* Set line height */
    white-space: normal; /* Allow text to wrap */
    display: -webkit-box; /* Enables line clamping */
    -webkit-line-clamp: 4; /* Limit to 4 lines */
    -webkit-box-orient: vertical; /* Vertical text flow */
    box-sizing: border-box; /* Include padding in the width/height calculations */
}

button {
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>
