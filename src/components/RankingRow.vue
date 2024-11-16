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
      <InputNumber
        v-model="editableUserScore"
        :min="1"
        :max="10"
        showButtons
        placeholder="_"
        @keypress.enter="submitScore"
        class="editable-score"
        inputStyle="width: 120px; padding:6px 40px 6px; height: 100%; font-size: 1.2rem; border: 0px"
        style="padding:0px 0px 0px; display: flex;"
      />
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps } from 'vue';
import { useRatingStore } from '@/stores/RatingStore';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { useToast } from "primevue/usetoast";

const toast = useToast();

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
    type: Number,
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
  },
});

const ratingStore = useRatingStore();
const isSubmitted = ref(false);
const editableUserScore = ref(null);

watch(
  () => props.userScore,
  (newUserScore) => {
    // Only update `editableUserScore` if the user hasn't just submitted a score
    if (!isSubmitted.value) {
      if (newUserScore !== 'empty') {
        editableUserScore.value = newUserScore;
      } else {
        editableUserScore.value = null; // If no user score, make it editable
      }
    }
  },
  { immediate: true }
);


async function submitScore() {
  if (editableUserScore.value !== null) {
    try {
      isSubmitted.value = true; // Prevent interference during submission
      await ratingStore.rateMangaGenre(props.genreId, editableUserScore.value);


      // Show success toast message
      toast.add({
        severity: "success",
        summary: "Score Submitted",
        detail: `Your score of ${editableUserScore.value} has been recorded.`,
        life: 3000,
      });
    } catch (error) {
      // Show error toast message in case of failure
      toast.add({
        severity: "error",
        summary: "Submission Failed",
        detail: "There was an issue submitting your score. Please try again.",
        life: 3000,
      });
    } finally {
      isSubmitted.value = false;
    }
  }
}

</script>

<style scoped>
.ranking-row {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 42;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.genre-col {
  width: 25%;
  font-size: 20px;
}

.overall-col {
  width: 30%;
  font-size: 20px;
}

.user-col {
  top: 50%;
  font-size: 18px;
  height: 34px;
  justify-content: center;
  background-color: #515552;
  border-radius: 0 5px 5px 0;
  
}

.score-holder {
  font-size: 1.3rem;
  width: 80%;
  height: 40px;
  padding: 5px 0;
  margin-left: auto;
  text-align: center;
  background-color: #d89831;
  border-radius: 5px;
}

.user-col.submitted {
  background-color: #969696; /* Slight color change on submit */
}

.editable-score {
  width: 120px;
  text-align: center;
  border: none;
  background: transparent;
  color: #000;
  padding: 5px;
  font-size: 16px;
  outline: none;
  --p-inputtext-background: transparent;
  --p-inputnumber-button-background:transparent;
  --p-inputnumber-button-hover-background:transparent;
}

.submit-btn {
  margin-top: 10px;
}
</style>
