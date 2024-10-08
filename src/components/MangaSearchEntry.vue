<template>
  <div class="manga-entry-container">
    <img :src="image" alt="Manga cover" class="manga-image" />
    <div class="manga-details">
      <div class="manga-title">{{ name }}</div>
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
.manga-entry-container {
  height: 180px; /* Fixed height for rectangles */
  background-color: rgb(44, 218, 160);
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 16px; /* Add some padding */
  box-sizing: border-box;
  flex-shrink: 0; /* Prevent shrinking */
}

.manga-image {
  width: 60px; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-right: 16px; /* Space between image and details */
}
.manga-details {
  display: flex;
  flex-direction: column;
}
.manga-title {
  font-size: 16px;
  font-weight: bold;
}

.manga-genres {
  display: flex;
  flex-wrap: wrap; /* Allow genres to wrap if needed */
  gap: 4px; /* Space between genres */
}

.genre {
  background-color: rgba(255, 255, 255, 0.8); /* Background for genres */
  border-radius: 4px;
  padding: 4px 8px; /* Padding for genre items */
  font-size: 12px; /* Font size for genres */
}
</style>
