<template>
  <div class="reviews-layout">
    <div class="review-item">
      <!-- Review Stats -->
      <ReviewStats 
        :avg-num-of-stars="reviewStats.avg_num_of_stars"
        :num-of-ratings="reviewStats.num_of_ratings"
      />
    </div>
    <div class="divider"></div>
    <div class="review-item">
      <!-- Bar Percent Middle -->
      <BarPercent 
        :rating-distributions="reviewStats.rating_distributions"
      />
    </div>
    <div class="divider"></div>
    <div class="review-item">
      <!-- Recommend Circle -->
      <RecommendCircle 
        :percent-recommended="reviewStats.percent_recommended"
        :num-of-recommendations="reviewStats.num_of_recommendations"
        :item-name="itemName" 
      />
    </div>
  </div>
</template>

<script setup>
import ReviewStats from "./ReviewStats.vue";
import BarPercent from "./BarPercent.vue";
import RecommendCircle from "./RecommendCircle.vue";

const props = defineProps({
  reviewStats: {
    type: Object,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

// Use the itemName prop to fetch or display relevant data for the reviews.
</script>

<style scoped>
.reviews-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.review-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.divider {
  width: 1px;
  background-color: #ccc;
  height: 160px;
}

@media (max-width: 1040px) {
  .reviews-layout {
    flex-direction: column;
    align-items: center;
  }

  .divider {
    display: none;
  }

  .reviews-layout .review-item:nth-child(3) {
    margin-top: -25px;
  }
}
</style>
