<template>
  <div class="review-card">

    <div class="review-header">
      <h3>{{ review.Header }}</h3>
      <span 
        class="report-review desktop-only"
        @click="reportReview"
      >
        {{ isReported ? 'Review reported' : 'Report review' }}
      </span>
    </div>

    <div class="rating-section">
      <StarRating :rating="review.Rating" :show-number="false" />

      <div class="recommendation-container">
        <div class="divider"></div>
        <span 
          class="material-symbols-outlined" 
          :class="{ 'thumbs-up': wouldRecommend, 'thumbs-down': !wouldRecommend }">
          {{ wouldRecommend ? 'thumb_up' : 'thumb_down' }}
        </span>
        <span 
          class="recommendation-text" 
          :class="wouldRecommend ? 'positive' : 'negative' ">
          {{ wouldRecommend ? 'Would Recommend' : 'Would Not Recommend' }}
        </span>
      </div>
    </div>

    <p class="name-date">
      {{ review.Name }}
      <span class="separator">•</span>
      {{ review.DateAdded }}
    </p>
    <p class="text-review">{{ review.Text }}</p>

    <div class="dynamic-report-review mobile-only">
      <span 
        class="report-review"
        @click="reportReview"
      >
        {{ isReported ? 'Review reported' : 'Report review' }}
      </span>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import StarRating from "./StarRating.vue";

defineProps({
  review: {
    type: Object,
    required: true,
  },
});

const wouldRecommend = true;
const isReported = ref(false);
const isMobile = ref(false);

const reportReview = () => {
  if (!isReported.value) {
    isReported.value = true;
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 550;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>


<style scoped>

.review-card {
  position: relative;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: white;
  border: 1px solid black;
  width: 100%;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-card h3 {
  margin: 0 0 0.5rem;
}

.report-review {
  font-size: 14px;
  font-family: "Helvetica";
  color: #4e4e4e;
  cursor: pointer;
  text-decoration: underline;
}

.report-review:hover {
  color: #707070;
}

.review-card p {
  margin: 0.25rem 0;
}

.name-date {
  color: #3a3a3a;
  font-size: 14px;
  font-family: "Helvetica";
}

.separator {
  color: black;
}

.text-review {
  padding-top: 8px;
  font-size: 16px;
  font-family: "Helvetica";
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.recommendation-container {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: "Helvetica";
  margin-top: -7px;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: lightgray;
  margin-top: -5px;
  margin-right: 2px;
}

.recommendation {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: "Helvetica";
  margin-top: -7px;
}

::v-deep(.recommendation-text.positive) {
  color: green;
}

::v-deep(.recommendation-text.negative) {
  color: #da3b01;
}

.thumbs-up {
  color: green;
  font-size: 15px;
}

.thumbs-down {
  color: #da3b01;
  font-size: 15px;
}

@media (max-width: 550px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
    margin-top: 1rem;
    text-align: left;
  }
}

@media (min-width: 551px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }
}

</style>

