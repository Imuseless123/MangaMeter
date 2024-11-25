import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark', // Always dark
  }),
  actions: {
    forceDarkTheme() {
      this.theme = 'dark';
      document.documentElement.classList.add('dark-theme');
    },
  },
});
