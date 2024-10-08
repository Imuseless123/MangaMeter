<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <h1 class="logo font_roboto">MangaMeter</h1>
      </div>
      <nav class="navigation">
        <div>
          <RouterLink ref="homeLink" class="text font_roboto" @click="navigating('homeLink')" to="/">HomePage</RouterLink>
        </div>
        <div>
          <RouterLink ref="searchLink" class="text font_roboto" @click="navigating('searchLink')" to="/search">Search</RouterLink>
        </div>
        <div>
          <RouterLink ref="leaderboardLink" class="text font_roboto" @click="navigating('leaderboardLink')" to="/leaderboard">Leaderboard</RouterLink>
        </div>
      </nav>
      <div class="auth-buttons">
        <button label="Login font_roboto" @click="openLogin" class="p-button-outlined" >Login</button>
        <button label="Sign Up font_roboto" @click="openSignup" class="p-button-outlined" >Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';

// // Refs for the links
// const homeLink = ref(null);
// const searchLink = ref(null);
// const leaderboardLink = ref(null);

// // Lifecycle hook to ensure refs are ready
// onMounted(() => {
//   // Ensure all refs are set before accessing them
//   resetLinks();
// });

// // Function to navigate and style the links
// function navigating(clickedLink) {
//   // Reset all links first
//   resetLinks();

//   // Apply the styles to the clicked link
//   const link = getLinkByRef(clickedLink);
//   if (link) {
//     link.style.backgroundColor = 'rgba(185, 139, 70, 0.5)';
//     link.style.borderRadius = '5px';
//     link.style.padding = '8px';
//   }
// }

// // Function to reset styles for all links
// function resetLinks() {
//   if (homeLink.value) {
//     homeLink.value.style.backgroundColor = '';
//     homeLink.value.style.borderRadius = '';
//     homeLink.value.style.padding = '';
//   }

//   if (searchLink.value) {
//     searchLink.value.style.backgroundColor = '';
//     searchLink.value.style.borderRadius = '';
//     searchLink.value.style.padding = '';
//   }

//   if (leaderboardLink.value) {
//     leaderboardLink.value.style.backgroundColor = '';
//     leaderboardLink.value.style.borderRadius = '';
//     leaderboardLink.value.style.padding = '';
//   }
// }

// // Helper function to get the link ref
// function getLinkByRef(refName) {
//   if (refName === 'homeLink') {
//     return homeLink.value;
//   } else if (refName === 'searchLink') {
//     return searchLink.value;
//   } else if (refName === 'leaderboardLink') {
//     return leaderboardLink.value;
//   }
//   return null;
// }

function openLogin() {
  // Logic to open the login popup
  console.log('Login button clicked');
}

function openSignup() {
  // Logic to open the signup popup
  console.log('Sign Up button clicked');
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
  background-color: aqua;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #1E1E1E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto; /* Centers the content inside the header */
  padding: 10px 20px;
}

.title {
  .logo{
    /* padding-leftt: 10; */
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.navigation {
  display: flex;
  gap: 1rem;
  .text{
    color: #FFFFFF;
    text-decoration: none;
    padding: 8px;
  }

  .text:hover{
    background-color: rgba(185, 139, 70, 0.5);
    border-radius: 5px;
  }
}

.auth-buttons {
  padding-right: 40px;
  display: flex;
  gap: 0.5rem;
  .p-button-outlined{
    font-size: 18px;
    color: #1E1E1E;
    background-color: #b98b46;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }


}
</style>
