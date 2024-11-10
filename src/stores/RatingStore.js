import { defineStore } from 'pinia';
import axios from 'axios'; 

export const useRatingStore = defineStore('rating', {
  state: () => ({
    selectedManga: null,
    mangaPublicRatings: [],
    ratingFetchError: false,
  }),
  actions: {
    async setSelectedManga(manga) {
      this.selectedManga = manga; // Store the selected manga
      console.log(this.selectedManga);

      try {
        // Fetch the average ratings for the selected manga
        const response = await axios.get(`https://mangameterapi.littlebutenough.com/getAverMRating?mangaId=${manga.id}`);
        
        // Save the response data (ratings) to the store
        if (response.data && response.data.data) {
          this.mangaPublicRatings = response.data.data;
          this.ratingFetchError = false;
          console.log(this.mangaPublicRatings)
        } else {
          this.mangaPublicRatings = []; // If no data, set an empty array
          this.ratingFetchError = false;
        }
      } catch (error) {
        console.error("Error fetching average ratings:", error);
        this.mangaPublicRatings = []; // Optionally set an empty array on error
        this.ratingFetchError = true;
      }
    },
  },
});
