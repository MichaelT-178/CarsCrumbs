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

const ratingPercentages = {
  5: 70,
  4: 10,
  3: 5,
  2: 7,
  1: 6,
};

const orderedRatings = Object.entries(ratingPercentages).sort(
  ([a], [b]) => b - a
);

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

