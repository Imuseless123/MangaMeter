<template>
  <div 
    class="manga-entry-container"
    @click="handleClick" 
    :class="{ 'selected': isSelected }"
  >
    <div class="image-container">
      <img :src="image" alt="Manga cover" class="manga-image" />
    </div>
    <div class="manga-details font_roboto">
      <div class="manga-title">
        {{ name }}
      </div>
      <div class="manga-genres">
        <span v-for="(genre, index) in genres" :key="index" class="genre">{{ genre.name }}</span>
      </div>
    </div>
    <div class="blobs_container" :class="{ 'visible': isSelected }">
      <div v-for="(color, index) in blobColors" :key="index" class="blob" 
           :style="{ left: `${Math.random() * 40}%`, top: `${Math.random() * 100}%`, background: color }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { ref } from 'vue';

defineProps({
  name: String,
  image: String,
  genres: Array,
  isSelected: Boolean // New prop to determine if the entry is selected
});

const emit = defineEmits(['selectManga']);

const blobColors = ref(Array.from({ length: 3 }, () => {
  const randomValue = () => Math.floor(Math.random() * 256);
  return `rgba(${randomValue()}, ${randomValue()}, ${randomValue()}, 0.5)`;
}));

const handleClick = () => {
  emit('selectManga'); // Emit the event when this component is clicked
};
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
  box-sizing: border-box;
  flex-shrink: 0; /* Prevent shrinking */
  overflow: hidden; /* Clip the background blur to fit inside the container's border radius */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  box-shadow: 0px 2px 6px var(--color-surface-a30); 
}

.manga-entry-container:hover {
  background-color: var(--color-surface-a10); /* Brighten up the background color on hover */
}

/* Make sure blobs are always visible when selected */
.manga-entry-container.selected .blobs_container {
  opacity: 1; /* Keep blobs visible when the container is selected */
}

/* Ensure blobs are initially hidden and only appear when selected */
.blobs_container {
  position: absolute;
  height: 200%; 
  aspect-ratio: 1/2;
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
  width: 120px; /* 12 units */
  height: 150px; /* 17 units */
  display: flex;
  z-index: 1; 
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to maintain the aspect ratio */
  margin: 16px; /* Space between image and details */

}

.manga-image {
  width: 100%;
  height: auto;
  object-fit: contain; /* Maintain aspect ratio of the image */
}
.manga-details {
  width: 100%;
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
  white-space: normal; /* Allow text to wrap */
  word-break: break-word; /* Break long words to fit container */
  overflow: hidden;
}


.manga-genres {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* Slightly larger gap for better separation */
  z-index: 1;
}

.genre {
  background: rgb(78, 58, 30); /* Gold to orange gradient */
  color: #ffffff; /* Dark text color for contrast */
  border-radius: 8px; /* Rounded corners for a softer look */
  padding: 4px 10px; /* Comfortable padding for smaller elements */
  font-size: 12px;
  font-weight: 500; /* Slightly bolder font for readability */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
  transition: transform 0.2s ease, background 0.2s ease;
}

.genre:hover {
  background: transparent; /* Transparent background */
  color: #edad45; /* Gold text color for the inverted effect */
  border: 1px solid #edad45;/* Reversed gradient for hover effect */
  transform: scale(1.05); /* Slight scale-up on hover */
}
</style>
