<template>
  <div class="header">
    <div class="container">
      <div class="title">
        <h1 class="logo font_roboto">MangaMeter</h1>
      </div>
      <TabMenu :model="items" class="tabbar" :activeItem="activeItem">
          <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                      <span v-bind="props.icon" />
                      <span v-bind="props.label">{{ item.label }}</span>
                  </a>
              </router-link>
              <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                  <span v-bind="props.icon" />
                  <span v-bind="props.label">{{ item.label }}</span>
              </a>
          </template>
      </TabMenu>
      <div class="spacer"></div>
      <AccountButton />
    </div>

  </div>
</template>
<script setup>
import { ref, watch,computed   } from 'vue';
import { useAccountStore } from '@/stores/AccountStore'; // Import account store
import { useRouter, useRoute } from 'vue-router'; // Import Vue Router for navigation
import AccountButton from './AccountButton.vue';
import TabMenu from 'primevue/tabmenu';


// Account store for user authentication state
const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

const showLoginPopup = ref(false); // Boolean to control login popup visibility



const items = ref([
    { route: '/', label: 'HomePage', icon: 'pi pi-home' },
    { route: '/search', label: 'Search', icon: 'pi pi-search' },
    { route: '/leaderboard', label: 'Leaderboard', icon: 'pi pi-chart-bar' }
]);
watch(
  () => accountStore.isLoggedIn,
  (isLoggedIn) => {
    const favoriteRoute = { route: '/favorite', label: 'Favorite', icon: 'pi pi-heart' };
    if (isLoggedIn) {
      // Add the 'Favorite' tab if the user is logged in
      if (!items.value.find(item => item.route === '/favorite')) {
        items.value.push(favoriteRoute);
      }
    } else {
      // Remove the 'Favorite' tab if the user is logged out
      items.value = items.value.filter(item => item.route !== '/favorite');
    }
  },
  () => route.path,
  () => {
    // Trigger reactivity by updating activeItem
    activeItem.value = items.value.find(item => item.route === route.path);
  },
  { immediate: true } // Run the watcher immediately to set the initial state
);
// Handle authenticated event from the popup
function handleAuthenticated() {
  showLoginPopup.value = false; // Close the popup on successful login
}
// Computed property to determine the active tab based on the current route
const activeItem = computed(() => {
  return items.value.find(item => item.route === route.path) || null;
});
</script>

<style scoped>
.font_roboto {
  font-family: 'Roboto', sans-serif;
}

.header {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 10px 20px;
}

.title .logo {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.navigation-tabs {
  flex: 1;
  margin-left: 20px;
}

.navigation-tabs .p-tabmenu-nav {
  display: flex;
  justify-content: space-around;
}

.tabbar {
  padding-left: 20px;
  --p-tabmenu-tablist-background: transparent; /* Set to transparent */
}
.spacer{flex:1}
</style>

