<template>
  <div class="container">
    <div class="left-half">
      <SearchPanel/>
    </div>
    <transition name="slide-up">
      <div
        v-if="!isMobile || selectedManga"
        class="right-half font_roboto"
        :class="{ overlay: isMobile && selectedManga }"
      >
        <RatePanel />

        <!-- Close button for the overlay -->
        <button 
          v-if="isMobile && selectedManga" 
          class="close-button" 
          @click="closeOverlay"
        >
          Close
        </button>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRatingStore } from '@/stores/RatingStore'; // Adjust the path based on your project structure
import SearchPanel from '@/components/SearchPanel.vue';
import RatePanel from '@/components/RatePanel.vue';

const ratingStore = useRatingStore(); // Use the Pinia store

const selectedManga = computed(() => ratingStore.selectedManga);
const isMobile = ref(false);

// Check screen size to update `isMobile` flag
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 1200; // Adjust as needed for mobile breakpoint
};

// Run on component mount and window resize
onMounted(() => {
  updateIsMobile(); // Initial check
  window.addEventListener('resize', updateIsMobile); // Listen for screen resizing
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Function to close the overlay and reset selected manga
const closeOverlay = () => {
  ratingStore.setSelectedManga(null); // Clear the selected manga in the store
};
</script>

<style scoped>
.font_roboto {
  font-family: 'Roboto', sans-serif;
}

.container {
  display: flex;
  height: 100%;
}

.left-half {
  flex: 1; /* Takes 50% of the container */
  display: flex;
  align-items: flex-start; /* Align items to the top */
  justify-content: center; /* Center horizontally */
  padding: 40px; /* Add padding */
  box-sizing: border-box; /* Include padding in the total width/height */
}

.right-half {
  flex: 1; /* Takes 50% of the container */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 40px 0px;
}

/* Close button styling */
.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  z-index: 1001; /* Ensure it sits above other content */
}

/* Transition for entering and leaving */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}


.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%); /* Start or end position for slide */
  opacity: 0; /* Start or end opacity */
}

.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0); /* Final position */
  opacity: 1; /* Final opacity */
}

/* Overlay class */
.overlay {
  position: fixed; /* Make the overlay cover the screen */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Dark background */
  z-index: 1000; /* Ensure it sits above other content */
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>