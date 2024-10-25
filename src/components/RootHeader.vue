<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <h1 class="logo font_roboto" @click="openHomePage">MangaMeter</h1>
      </div>
      <nav class="navigation" :class="{ open: isMobileMenuOpen }">
        <div>
          <RouterLink id="homeLink" class="text font_roboto" @click="navigating($event)" to="/">HomePage</RouterLink>
        </div>
        <div>
          <RouterLink id="searchLink" class="text font_roboto" @click="navigating($event)" to="/search">Search</RouterLink>
        </div>
        <div>
          <RouterLink id="leaderboardLink" class="text font_roboto" @click="navigating($event)" to="/leaderboard">Leaderboard</RouterLink>
        </div>
        
        <!-- Move auth buttons into the navigation -->
        <div class="auth-buttons">
          <div v-if="!userEmail" class="opacity">
            <button label="Login font_roboto" @click="openLogin" class="p-button-outlined">Login</button>
          </div>
          <div v-else>
            <span class="user-email">{{ userEmail }}</span>
            <button label="Logout font_roboto" @click="logout" class="p-button-outlined">Logout</button>
          </div>
        </div>
      </nav>

      <!-- Hamburger menu button on the right -->
      <div class="mobile-menu" @click="toggleMobileMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <!-- Conditionally show the login popup -->
    <LoginPopup v-if="showLoginPopup" @close="showLoginPopup = false" @authenticated="handleAuthenticated" />
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import LoginPopup from './LoginPopup.vue'; // Import the popup component
import supabase from '../ultis/supabaseClient'; 

const showLoginPopup = ref(false); // Boolean variable to manage popup visibility
const userEmail = ref<string | null>(null); // Store the user's email

const isMobileMenuOpen = ref(false);
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

function handleAuthenticated(email: string) {
  userEmail.value = email; // Set the user's email after login/signup
  showLoginPopup.value = false; // Close the popup
}
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error.message);
  } else {
    userEmail.value = null; // Clear the user's email after logging out
    console.log('User logged out successfully');
  }
}
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>
<style scoped>
.font_roboto {
  font-family: 'Roboto', sans-serif;
}

.header {
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  z-index: 1000; /* Ensures the header stays above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for a subtle effect */
}

.container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; /* Centers the content inside the header */
  padding: 10px 20px;
}

.title .logo {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.navigation {
  display: flex;
  gap: 1rem;
  .text {
    color: #FFFFFF;
    text-decoration: none;
    padding: 8px;
    border-radius: 5px;
  }

  .text:hover {
    background-color: rgba(185, 139, 70, 0.5);
  }
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
  .opacity {
    background-color: #b98b46;
    border-radius: 5px;

    .p-button-outlined {
      font-size: 18px;
      color: #1E1E1E;
      width: 100px;
      height: 40px;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
  }

  .opacity:active {
    opacity: 0.5;
  }
}

.user-email {
  font-weight: bold;
  color: #FFFFFF;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background-color: #b98b46;
}

.mobile-menu .bar {
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 4px 0;
  transition: 0.4s;
}

/* Styling for mobile view */
@media screen and (max-width: 800px) {
  .mobile-menu {
    display: flex;
  }
  
  .navigation {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #1E1E1E;
    padding: 1rem;
    border-radius: 5px;
  }

  .auth-buttons {
    display: block; /* Show auth buttons inside the mobile menu */
    margin-top: 1rem; /* Add spacing between the navigation links and the auth buttons */
  }

  .navigation.open {
    display: flex;
  }

}
</style>
