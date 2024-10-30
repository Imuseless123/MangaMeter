import { defineStore } from 'pinia';

export const useRatingStore = defineStore('rating', {
  state: () => ({
    selectedManga: null,
  }),
  actions: {
    setSelectedManga(manga) {
      this.selectedManga = manga; // Store the selected manga
      console.log(this.selectedManga);
    },
  },
});
