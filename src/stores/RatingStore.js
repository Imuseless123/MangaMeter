import { defineStore } from 'pinia';
import axios from 'axios'; 
import { useAccountStore } from '@/stores/AccountStore';
import {API_BASE_URL ,API_ENDPOINTS } from '@/ultis/apiConfig'


export const useRatingStore = defineStore('rating', {
  state: () => ({
    selectedManga: null,
    mangaPublicRatings: [],
    userRatings: [],  
  }),
  actions: {
    async setSelectedManga(manga) {
      this.selectedManga = manga; // Store the selected manga
      console.log(this.selectedManga);
      this.getMangaPublicRatings(manga.id);
      const accountStore = useAccountStore();
      console.log("User:" +accountStore.user?.id);
      if(accountStore.user?.id){
        this.getMangaUserRating(manga.id,accountStore.user?.id)
      }
     
      
    },
    async getMangaPublicRatings(mangaId){
      try {
        // Fetch the average ratings for the selected manga
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_AVERAGE_MANGA_RATING}?mangaId=${mangaId}`);
        // Save the response data (ratings) to the store
        if (response.data && response.data.data) {
          this.mangaPublicRatings = response.data.data;;
          console.log("Public rate: "+JSON.stringify(this.mangaPublicRatings));
        } else {
          this.mangaPublicRatings = []; // If no data, set an empty array
        }
      } catch (error) {
        console.error("Error fetching average ratings:", error);
        this.mangaPublicRatings = []; // Optionally set an empty array on error
      }
    },
    async getMangaUserRating(mangaId,userId){
      try {
        const userResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_MANGA_RATING}?mangaId=${mangaId}&userId=${userId}`);
        this.userRatings = userResponse.data || [];
        console.log("User rate: "+JSON.stringify(this.userRatings));
        
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        this.userRatings = [];
      }
    },
    async rateMangaGenre(genreId, score) {
      const accountStore = useAccountStore();
      const userId = accountStore.user?.id;

      // Check if the user is logged in
      if (!accountStore.isLoggedIn || !userId) {
        console.error("User is not logged in. Cannot submit rating.");
        return;
      }
      try {
        // Send the user's rating for the genre to the backend
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.POST_USER_RATING}?mangaId=${this.selectedManga.id}&genre=${genreId}&userId=${userId}&rating=${score}`);
        console.log(response);
        if (response.status === 200) {
          console.log("Rating submitted successfully:", response.data);

          // Update or add the rating in the userRatings array
          const existingRating = this.userRatings.find(rating => rating.genreid === genreId);
          if (existingRating) {
            existingRating.userscore = score; // Update the score if rating exists
          } else {
            this.userRatings.push({ genreid: genreId, userscore: score }); // Add new rating if not present
          }
        } else {
          console.error("Failed to submit rating, received status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    },
  },
});
