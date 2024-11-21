<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="background-overlay"></div>
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Your Next Favorite Manga</h1>
        <p class="hero-tagline">Not all genres are created equal—rate and explore manga</p>
   
      </div>
    </section>
  </div>


</template>

<script setup>
import { Button } from 'primevue';
import { useRouter } from 'vue-router';
const router = useRouter();
function startExploring() {
  router.push('/search');
}
// No interactivity or data handling for now
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;    
align-items: center;
  height: 100%;
  position: relative; /* Make it the containing block for absolute positioning */
  overflow: hidden;
  z-index: 10;
}
.home-page {
  font-family: 'Arial', sans-serif;
  color: #fff;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  padding: 2rem;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-content .hero-tagline {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.explore-button {
  font-size: 1.2rem;
  padding: 0.8rem 2rem;

}



/* Features Section */
.features {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 3rem;
  background-color: #1c1e26;
}

.feature {
  flex: 1 1 300px;
  max-width: 300px;
  text-align: center;
  margin: 1rem;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.feature img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Responsiveness */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  .hero-content .hero-tagline {
    font-size: 1.2rem;
  }
  .explore-button {
    font-size: 1rem;
  }
  .features {
    flex-direction: column;
  }
  .feature {
    max-width: 90%;
  }
}

.background-image {
  width: 100vw;
  height: 100vh;
  opacity: 0.3;
  position: absolute;
  background-image: url('../assets/panel_wall.webp');
  background-size: 200%;
  animation: diagonal-slide 40s linear infinite alternate;
  z-index: -2;
}
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, black 10%, transparent 40%, transparent 60%, black 80%);
  z-index: -1; /* Layered above the background image but behind content */
}
@keyframes diagonal-slide {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>
