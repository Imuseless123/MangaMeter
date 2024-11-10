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
      <div v-if="isLoggedIn" class="user-col">
        <!-- Display score if rated, else show editable icon -->
        <div v-if="userScore !== null" class="user-score-holder">{{ userScore }}</div>
        <div v-else>
          <span v-if="!isEditing" class="edit-icon" @click="toggleEditing">✏️</span>
          <input v-else type="number" v-model="tempScore" @blur="submitScore" @keyup.enter="submitScore" class="score-input" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
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
  
  const emits = defineEmits(['update-score']); // Event to send updated score to parent
  
  // State for editing score
  const isEditing = ref(false);
  const tempScore = ref(props.userScore || '');
  
  // Toggle editing mode
  function toggleEditing() {
    isEditing.value = !isEditing.value;
    tempScore.value = props.userScore || '';
  }
  
  // Submit score and emit to parent component
  function submitScore() {
    if (tempScore.value) {
      emits('update-score', { genreName: props.genreName, score: tempScore.value });
      isEditing.value = false;
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
    width: 18%;
    font-size: 18px;
    justify-content: center;
    /* background-color: yellowgreen; */
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
  .edit-icon {
  cursor: pointer;
  color: gray;
  font-size: 1.2em;
  width: 100%;
    padding: 2px 0;
    text-align: center;
    background-color: #515552;
    border-radius: 0 5px 5px 0;
}

.score-input {
    width: 100%;
    padding: 2px 0;
    text-align: center;
    background-color: #515552;
    border-radius: 0 5px 5px 0;

  text-align: center;
}
  </style>
  