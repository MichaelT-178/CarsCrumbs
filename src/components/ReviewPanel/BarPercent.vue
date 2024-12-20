<template>
  <div class="customer-reviews">
    <div class="rating-breakdown">
      <div 
        v-for="([rating, percent]) in orderedRatings" 
        :key="rating" 
        class="rating-bar"
      >
        <span class="rating-label">{{ rating }} stars</span>
        <div class="bar-container">
          <div 
            class="bar-fill" 
            :style="{ width: percent + '%' }"
          ></div>
        </div>
        <span class="percent-label">{{ percent }}%</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';


const props = defineProps({
  ratingDistributions: {
    type: Object,
    required: true,
    default: () => ({})
  }
});


const orderedRatings = computed(() => {
  const total = Object.values(props.ratingDistributions).reduce((sum, count) => sum + count, 0);

  const percentages = Object.entries(props.ratingDistributions).map(([key, value]) => {
    const stars = convertRatingKey(key);
    const percent = total > 0 ? ((value / total) * 100) : 0;

    return [stars, percent];
  });

  return percentages.sort(([a], [b]) => b - a);
});


function convertRatingKey(key) {
  const mapping = {
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5
  };

  return mapping[key] || key;
}

</script>


<style scoped>
.customer-reviews {
  font-family: Arial, sans-serif;
  padding: 0px 20px;
  width: 400px;
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
}

.rating-breakdown {
  margin-top: 20px;
  width: 100%;
}

.rating-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bar-container {
  flex: 3;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  height: 10px;
  overflow: hidden;
  margin: 0 10px;
  position: relative;
}

.bar-fill {
  background-color: #00A200;
  height: 100%;
  border-radius: 4px;
}

.rating-label {
  flex: 1;
  font-size: 16px;
  margin-right: -20px;
  color: #555;
  font-family: 'Helvetica', sans-serif;
}

.percent-label {
  flex: none;
  width: 50px;
  text-align: right;
  font-size: 16px;
  color: #555;
  font-family: 'Helvetica', sans-serif;
}

@media (max-width: 1000px) {
  .customer-reviews {
    width: 350px;
  }

  .percent-label {
    flex: none;
    width: 30px;
    text-align: right;
    font-size: 16px;
    color: #555;
    font-family: 'Helvetica', sans-serif;
  }
}

</style>

