<template>
  <div class="header">
    <div class="container">
      <h1 class="title">MangaMeter</h1>
      <nav class="navigation">
        <RouterLink to="/">HomePage</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      </nav>
      <div class="auth-buttons">
        <button label="Login" @click="openLogin" class="p-button-outlined" />
        <button label="Sign Up" @click="openSignup" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>

<script setup>

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
.header {
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  z-index: 1000; /* Ensures the header stays above other content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for a subtle effect */
  background-color: aqua;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px; /* Optional max width */
  margin: 0 auto; /* Centers the content inside the header */
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.navigation {
  display: flex;
  gap: 1rem;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>
