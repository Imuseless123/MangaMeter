<script setup>
import { RouterView } from 'vue-router'
import RootHeader from './components/RootHeader.vue'
</script>

<template>
  <div class="app-container">
    <RootHeader class="header" />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
  
<style>
body, html {
  padding: 0;
  margin: 0;
  height: 100vh; /* Make sure the body takes the full viewport height */
  overflow: hidden; /* Prevent any overflow */
}

#app {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Full height of the parent, which is 100vh */
  background-color: #121212;
}

.header {
  height: 80px;
}

.content {
  flex: 1; /* Takes up the remaining space */
  overflow: hidden; /* Prevent scrolling inside the content */
}
</style>
