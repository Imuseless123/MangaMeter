// stores/accountStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import supabase from '@/ultis/supabaseClient';

export const useAccountStore = defineStore('account', () => {
  const user = ref(null);         // Stores user data
  const loading = ref(false);     // Tracks loading state
  const isLoggedIn = computed(() => user.value !== null);

  // Fetches and sets the current session (if available) on load
  async function checkSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      user.value = data.session.user;
    }
  }

  // Login function
  async function login(email, password) {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error.message);
      } else {
        user.value = data.user; // Store user info in the store
        console.log('Login :'+data.user);
      }
    } catch (err) {
      console.error('Login error:', err.message);
    } finally {
      loading.value = false;
    }
  }

  // Signup function
  async function signup(email, password) {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Signup error:', error.message);
      } else {
        user.value = data.user; // Store user info in the store
      }
    } catch (err) {
      console.error('Signup error:', err.message);
    } finally {
      loading.value = false;
    }
  }

  // Logout function
  async function logout() {
    loading.value = true;
    try {
      await supabase.auth.signOut();
      user.value = null; // Clear user info on logout
      console.log('Logout');

    } catch (err) {
      console.error('Logout error:', err.message);
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    isLoggedIn, 
    login,
    signup,
    logout,
    checkSession,
  };
});
