<template>
  <div class="reviews-layout">
    <div class="review-item">
      <ReviewStats :item-name="itemName" />
    </div>
    <div class="divider"></div>
    <div class="review-item">
      <BarPercent :item-name="itemName" />
    </div>
    <div class="divider"></div>
    <div class="review-item">
      <RecommendCircle :item-name="itemName" />
    </div>
  </div>
</template>

<script setup>
import ReviewStats from "./ReviewStats.vue";
import BarPercent from "./BarPercent.vue";
import RecommendCircle from "./RecommendCircle.vue";

const props = defineProps({
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
