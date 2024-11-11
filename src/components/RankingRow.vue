<template>
    <div class="ranking-row">
      <!-- Genre or Overall Label -->
      <div class="genre-col">
        <strong v-if="isOverall">Overall:</strong>
        <span v-else>{{ genreName }}:</span>
      </div>
      
      <!-- Overall Score Column -->
      <div class="overall-col">
        <div class="score-holder">{{ overallScore }}</div>
      </div>
  
      <!-- User Score Column (conditionally rendered) -->
      <div v-if="isLoggedIn" class="user-col" :class="{ 'submitted': isSubmitted }">
        <input
      v-model="editableUserScore"
      type="number"
      placeholder="Rate"
      min="1"
      max="10"
      @keyup.enter="submitScore"
      class="editable-score"
    />
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import { useRatingStore } from '@/stores/RatingStore';


  
  const props = defineProps({
    genreId: {
      type: String,
      default: '',
    },
    genreName: {
      type: String,
      default: '',
    },
    overallScore: {
      type:  Number,
      default: null,
    },
    userScore: {
      type: [String, Number, null],
      default: null, // User score, null if not rated yet
    },
    isOverall: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false, // Determines if the user is logged in
    }
  });
  const ratingStore = useRatingStore();
  const isSubmitted = ref(false);
  const editableUserScore = ref(''); 
  watch(() => props.userScore, (newUserScore) => {
  if (newUserScore !== 'empty') {
    editableUserScore.value = newUserScore;
  } else {
    editableUserScore.value = ''; // If no user score, make it editable
  }
}, { immediate: true }); // Make sure the watcher runs on initial mount


  
  // State for editing score
  const isEditing = ref(false);
  const tempScore = ref(props.userScore || '');
  
  // Toggle editing mode
  function toggleEditing() {
    isEditing.value = !isEditing.value;
    tempScore.value = props.userScore || '';
  }
  
  // Submit score and emit to parent component
  async function submitScore() {
    if (editableUserScore.value !== '') {
    await ratingStore.rateMangaGenre(props.genreId, editableUserScore.value);
    isSubmitted.value = true;

    // Reset submission feedback after a short delay
    setTimeout(() => {
      isSubmitted.value = false;
    }, 1500);
  }
  }
  </script>
  
  <style scoped>
 .ranking-row{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    /* background-color: aqua; */
  }
  
  .genre-col{
    width: 25%;
    font-size: 20px;
    /* background-color: red; */
  }
  
  .overall-col{
    width: 30%;
    font-size: 20px;
    /* background-color: blue; */
  }
  
  .user-col{
    width: 16%;
    font-size: 18px;
    justify-content: center;
    background-color: #515552;
    border-radius: 0 5px 5px 0;
    margin: auto 0;
  }
  
  .score-holder{
    width: 80%;
    padding: 5px 0;
    margin-left: auto;
    text-align: center;
    background-color: #D89831;
    border-radius: 5px;
  }
  .user-score-holder{
    width: 100%;
    padding: 2px 0;
    text-align: center;
    background-color: #515552;
    border-radius: 0 5px 5px 0;
  }

.user-col.submitted .editable-score {
  background-color: #e0f7fa; /* Slight color change on submit */
}
/* Remove the up and down arrows for number input */
.editable-score {
  width: 50px;
  text-align: center;
  border: none;
  background: transparent;
  color: #000;
  padding: 5px;
  font-size: 16px;
  outline: none;
  -moz-appearance: textfield;  /* Firefox */
  -webkit-appearance: none;    /* Safari and Chrome */
  appearance: none;            /* Standard for other browsers */
}

.editable-score::-webkit-outer-spin-button,
.editable-score::-webkit-inner-spin-button {
  -webkit-appearance: none;   /* Remove the spinner in Chrome and Safari */
  margin: 0;
}

.editable-score[type="number"] {
  -moz-appearance: textfield;  /* Remove spinner in Firefox */
}

  </style>
  