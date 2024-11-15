<template>
    <div>
      <!-- <PrimeAvatar
        class="account-icon"
        icon="pi pi-user"
        v-if="!isLoggedIn"
      />
      <PrimeAvatar
        class="account-icon"
        :label="userInitial"
        v-else
      />
      <button
        @click="handleButtonClick"
        class="p-button-outlined button-label font_roboto"
      >
        {{ buttonText }}
      </button> -->
      <ButtonGroup >
        <Button 
            v-if="accountStore.isLoggedIn"
            :label="accountStore.user?.email"
            variant="outlined"/>
        <Button 
            v-else 
            icon="pi pi-user" />
        <Button v-if="!accountStore.isLoggedIn"
            label="Login" 
            @click="openLogin"/>
        <Button 
            v-else 
            label="Logout"
            @click="logout"/>
      </ButtonGroup>
    </div>
    <LoginPopup v-if="showLoginPopup" @close="showLoginPopup = false" @authenticated="handleAuthenticated" />
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useAccountStore } from '@/stores/AccountStore'; 
  import ButtonGroup from  'primevue/buttongroup';
  import Button from 'primevue/button';
  import LoginPopup from './LoginPopup.vue';


  
  const accountStore = useAccountStore();
  
  const isLoggedIn = computed(() => !!accountStore.user);
  const userInitial = computed(() => accountStore.user?.email.charAt(0).toUpperCase() || '');
  const buttonText = computed(() => (isLoggedIn.value ? 'Logout' : 'Login'));
  
  const showLoginPopup = ref(false); // Boolean to control login popup visibility

  // Open login popup
function openLogin() {
  showLoginPopup.value = true;
}

// Handle authenticated event from popup
function handleAuthenticated() {
  showLoginPopup.value = false; // Close the popup on successful login
}
async function logout() {
  await accountStore.logout();
}
  </script>
  
  <style scoped>
  .account-button {
    display: flex;
    width: 8rem;
    align-items: center;
    gap: 0.5rem;
  }
  .account-icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-label {
    padding: 0.5rem 1rem;
  }


  </style>
  