<template>
    <div class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <div class="tabs">
          <button :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">Login</button>
          <button :class="{ active: activeTab === 'signup' }" @click="activeTab = 'signup'">Sign Up</button>
        </div>
        
        <!-- Conditional content for Login and Sign Up -->
        <div v-if="activeTab === 'login'" class="form-container">
          <input type="email" placeholder="Email" v-model="username"/>
          <input type="password" placeholder="Password" v-model="password"/>
          <button :disabled="loading" @click="login">
          <span v-if="loading">Loading...</span>
          <span v-else>Login</span>
        </button>
        </div>
        <div v-else class="form-container">
          <input type="email" placeholder="Email" v-model="username"/>
          <input type="password" placeholder="Password" v-model="password"/>
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword"/>
          <button :disabled="loading" @click="signup">
          <span v-if="loading">Signing up...</span>
          <span v-else>Sign Up</span>
        </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import supabase from '../ultis/supabaseClient'; // Import the Supabase client
  
  defineProps({
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close', 'authenticated']); // Emit 'authenticated' event
  const activeTab = ref('login'); // Controls the active tab
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref(''); // For sign-up form's "retype password"
  const loading = ref(false);
  
  function closePopup() {
    emit('close');
  }
  
  async function login() {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.value,
        password: password.value,
      });
  
      if (error) {
        console.error('Login error:', error.message);
      } else {
        console.log('Login successful:', data);
        emit('authenticated', username.value); // Pass the email to the header
        emit('close'); // Close the popup
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
    finally{loading.value = false;}
  }
  
  async function signup() {
    loading.value = true;
    if (password.value !== confirmPassword.value) {
      console.error('Passwords do not match');
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email: username.value,
        password: password.value,
      });
  
      if (error) {
        console.error('Sign Up error:', error.message);
      } else {
        console.log('Sign Up successful:', data);
        emit('authenticated', username.value); // Pass the email to the header
        emit('close'); // Close the popup
      }
    } catch (err) {
      console.error('Sign Up error:', err.message);
    }
    finally{loading.value = false;}
  }
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: var(--background-dark);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .tabs button {
    flex: 1;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.2rem;
    border-bottom: 2px solid transparent;
  }
  
  .tabs button.active {
    border-bottom: 2px solid white;
  }
  .form-container {
  display: flex;
  flex-direction: column; /* Stack inputs vertically */
  gap: 1rem; /* Add some space between the input fields */
}
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #5a67d8;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  