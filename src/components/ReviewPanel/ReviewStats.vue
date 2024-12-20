<template>
  <div class="customer-reviews">
    <div class="rating-summary">
      <div class="average-rating">
        <h1>{{ avgNumOfStars.toFixed(1) }}</h1>
      </div>
      <div class="rating-details">
        <div class="rating-star">
          <StarRating 
            :rating="avgNumOfStars" 
            :show-number="false"
            :star-size="28"
          />
        </div>
        <div class="rating-count">
          <span>{{ numOfRatings }} star {{ pluralize("rating", 2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import StarRating from "../StarRating.vue";
import { pluralize } from "../../utils/helper";

const props = defineProps({
  avgNumOfStars: {
    type: Number,
    required: true,
  },
  numOfRatings: {
    type: Number,
    required: true,
  },

});

</script>


<style scoped>
.customer-reviews {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
}

.rating-summary {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px; 
}

.average-rating {
  font-size: 20px;
  margin-bottom: -3px;
  color: #1e1d1d;
}

.rating-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.rating-star {
  margin-bottom: 5px;
}

.rating-count {
  font-size: 17px;
  color: #575757;
  margin-top: -8px;
  margin-left: 4px;
}

@media (max-width: 1040px) {
  .customer-reviews {
    padding: 0px 20px;
    margin-bottom: 10px;
  }
}

</style>
