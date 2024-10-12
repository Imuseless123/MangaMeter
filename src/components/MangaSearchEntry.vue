<template>
  <div class="manga-entry-container"
        @click="toggleSelected" 
       :class="{ 'selected': isSelected }">
    
    
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
    <div class="blobs_container">
      <div v-for="(color, index) in blobColors" :key="index" class="blob" 
         :style="{ left: `${Math.random() * 40}%`, top: `${Math.random() * 100}%`, background: color }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';

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
// Function to get a random RGBA color
function getRandomColor() {
  const randomValue = () => Math.floor(Math.random() * 256);
  return `rgba(${randomValue()}, ${randomValue()}, ${randomValue()}, 0.5)`;
}

// Create an array of random colors for the blobs
const blobColors = ref(Array.from({ length: 3 }, getRandomColor));

// Track selection state
const isSelected = ref(false);

// Toggle the selected state
function toggleSelected() {
  isSelected.value = !isSelected.value;
}
</script>

<style scoped>
.font_roboto {
  font-family: 'Roboto', sans-serif;
}

.manga-entry-container {
  position: relative; /* Make sure the container is the reference point */
  height: 180px; /* Fixed height for rectangles */
  background-color: var(--color-surface-a0);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px; /* Add some padding */
  box-sizing: border-box;
  flex-shrink: 0; /* Prevent shrinking */
  overflow: hidden; /* Clip the background blur to fit inside the container's border radius */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  box-shadow: -2.5px 2px 10px var(--color-surface-a40); 
  margin-left: 10px;
  margin-bottom: 15px;
}

.manga-entry-container:hover {
  background-color: var(--color-surface-a10); /* Brighten up the background color on hover */
}

/* Make sure blobs are always visible when selected */
.manga-entry-container.selected .blobs_container {
  opacity: 1; /* Keep blobs visible when the container is selected */
}

/* Remove the scaling effect when selected */
.manga-entry-container.selected {
  /* No scale transformation */
}

/* Ensure blobs are initially hidden and only appear when selected */
.blobs_container {
  position: absolute;
  height: 200%; 
  aspect-ratio: 1/1;
  left: 70%;
  pointer-events: none; /* Prevent interaction with the blobs */
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s; /* Smooth transition for visibility */
}

/* Blobs will not change based on hover now */
.blob {
  position: absolute;
  opacity: 0.5;
  width: 200px; /* Adjust size as needed */
  aspect-ratio: 1/1;
  animation: rotate 10s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  filter: blur(40px);
  z-index: 0;
  left: calc(100% - 100px); /* Position it to the right side, adjust as needed */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Adjust for perfect vertical centering */
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    border-radius: 60% 40% 30% 70% / 100% 85% 92% 74%;
  }
  50% {
    transform: rotate(180deg);
    border-radius: 20% 71% 47% 70% / 81% 15% 22% 54%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 100% 75% 92% 74% / 60% 80% 30% 70%;
  }
}
.image-container {
  width: 100px; /* 12 units */
  height: 150px; /* 17 units */
  display: flex;
  z-index: 1; 
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
  z-index: 1; 
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
  z-index: 1; 
}

.manga-genres {
  height: auto;
  display: flex;
  flex-wrap: wrap; /* Allow genres to wrap if needed */
  gap: 4px; /* Space between genres */
  /* background-color: bisque; */
  z-index: 1; 
}

.genre {
  background-color: rgba(255, 255, 255, 0.8); /* Background for genres */
  border-radius: 4px;
  padding: 4px 8px; /* Padding for genre items */
  font-size: 12px; /* Font size for genres */
}
</style>
