<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <h1 class="logo font_roboto" @click="openHomePage">MangaMeter</h1>
      </div>
      <nav class="navigation">
        <div>
          <RouterLink id="homeLink" class="text font_roboto" @click="navigating($event)" to="/">HomePage</RouterLink>
        </div>
        <div>
          <RouterLink id="searchLink" class="text font_roboto" @click="navigating($event)" to="/search">Search</RouterLink>
        </div>
        <div>
          <RouterLink id="leaderboardLink" class="text font_roboto" @click="navigating($event)" to="/leaderboard">Leaderboard</RouterLink>
        </div>
      </nav>
      <div class="auth-buttons">
        <div class="opacity">
          <button label="Login font_roboto" @click="openLogin" class="p-button-outlined">Login</button>
        </div>
      </div>
    </div>

    <!-- Conditionally show the login popup -->
    <LoginPopup v-if="showLoginPopup" @close="showLoginPopup = false" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import LoginPopup from './LoginPopup.vue'; // Import the popup component

// Boolean variable to manage popup visibility
const showLoginPopup = ref(false);

var homeLink, searchLink, leaderboardLink;

onMounted(() => {
  homeLink = document.getElementById('homeLink');
  searchLink = document.getElementById('searchLink');
  leaderboardLink = document.getElementById('leaderboardLink');
})

function navigating(event) {
  resetNavigate();
  event.target.style.backgroundColor = 'rgba(185, 139, 70, 0.5)';
}

function resetNavigate() {
  homeLink.style.backgroundColor = '';
  searchLink.style.backgroundColor = '';
  leaderboardLink.style.backgroundColor = '';
}

function openLogin() {
  // Show the login popup
  showLoginPopup.value = true;
}

function openHomePage() {
  console.log('Logo clicked');
}
</script>

<style scoped>
.font_roboto{
  font-family: 'Roboto', sans-serif;
}

.header {
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  z-index: 1000; /* Ensures the header stays above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for a subtle effect */
  /* background-color: aqua; */
}

.container {
  width: 100%;
  height: 100%;
  /* background-color: #1E1E1E; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; /* Centers the content inside the header */
  padding: 10px 20px;
}

.title {
  .logo{
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
}

.navigation {
  display: flex;
  gap: 1rem;
  .text{
    color: #FFFFFF;
    text-decoration: none;
    padding: 8px;
    border-radius: 5px;
  }

  .text:hover{
    background-color: rgba(185, 139, 70, 0.5);
  }
}

.auth-buttons {
  padding-right: 40px;
  display: flex;
  gap: 0.5rem;
  .opacity{
    background-color: #b98b46;
    border-radius: 5px;

    .p-button-outlined{
      font-size: 18px;
      color: #1E1E1E;
      width: 100px;
      height: 40px;
      background-color: transparent;
      cursor: pointer;
      border: none;
  }
  }

  .opacity:active{
    opacity: 0.5;
  }
}
</style>
