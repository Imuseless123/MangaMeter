<template>
  <div class="manga-entry-container">
    <div class="image-container">
      <img :src="image" alt="Manga cover" class="manga-image" />
    </div>
    <div class="manga-details font_roboto">
      <div class="manga-title">
        {{ name }}
      </div>
      <div class="manga-genres">
        <span v-for="(genre, index) in genres" :key="index" class="genre">{{ genre }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props
defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.font_roboto{
  font-family: 'Roboto', sans-serif;
}

.manga-entry-container {
  height: 180px; /* Fixed height for rectangles */
  background-color: #313131;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 16px; /* Add some padding */
  box-sizing: border-box;
  flex-shrink: 0; /* Prevent shrinking */
}

.image-container {
  width: 100px; /* 12 units */
  height: 150px; /* 17 units */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to maintain the aspect ratio */
  margin-right: 16px; /* Space between image and details */
  border-radius: 10px;
}

.manga-image {
  width: 100%;
  height: auto;
  object-fit: contain; /* Maintain aspect ratio of the image */
}
.manga-details {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
}

.manga-title {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  padding-bottom: 11px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0)); /* Fades out at the end */
  -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0)); /* For Safari */
  overflow: hidden;
  white-space: nowrap;  
}

.manga-genres {
  height: auto;
  display: flex;
  flex-wrap: wrap; /* Allow genres to wrap if needed */
  gap: 4px; /* Space between genres */
  /* background-color: bisque; */
}

.genre {
  background-color: rgba(255, 255, 255, 0.8); /* Background for genres */
  border-radius: 4px;
  padding: 4px 8px; /* Padding for genre items */
  font-size: 12px; /* Font size for genres */
}
</style>
