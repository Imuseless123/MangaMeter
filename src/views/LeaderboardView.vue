<template>
  <main>
    <div class="rectangle-list">
      <div class="rectangle" v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// Sample data for rectangle items
const items = ref(Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`));
</script>

<style scoped>
main {
  padding: 20px; /* Add padding to the main element */
  height: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
}

.rectangle-list {
  display: flex;
  flex-wrap: wrap; /* Allow rectangles to wrap */
  gap: 16px; /* Space between rectangles */
}

.rectangle {
  flex: 1 1 400px; /* Flex-grow, flex-shrink, flex-basis */
  height: 600px; /* Fixed height for rectangles */
  background-color: rgb(44, 218, 160);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-sizing: border-box; /* Ensure padding and border are included in height/width */
}

/* Media queries for responsiveness */
@media (max-width: 600px) {
  .rectangle {
    flex: 1 1 100%; /* Full width for small screens */
  }
}
</style>
