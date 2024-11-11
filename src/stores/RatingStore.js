import { defineStore } from 'pinia';
import axios from 'axios'; 
import { useAccountStore } from '@/stores/AccountStore';


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
        const response = await axios.get(`https://mangameterapi.littlebutenough.com/getAverMRating?mangaId=${mangaId}`);
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
        const userResponse = await axios.get(`https://mangameterapi.littlebutenough.com/rating/manga/user?mangaId=${mangaId}&userId=${userId}`);
        this.userRatings = userResponse.data || [];
        console.log("User rate: "+JSON.stringify(this.userRatings));
        
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        this.userRatings = [];
      }
    }
  },
});
