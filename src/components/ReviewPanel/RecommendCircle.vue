<template>
  <div class="recommendation-container">
    <div class="top-section">
      <div
        class="circle"
        :style="{
          background: `conic-gradient(#00A200 ${recommendPercent}%, #e0e0e0 ${recommendPercent}%)`
        }"
      >
        <div class="circle-inner">
          {{ recommendPercent }}
        </div>
      </div>

      <div class="text-content">
        <div class="recommend-text">{{ recommendPercent }}% would recommend</div>
        <div class="recommend-count">12 recommendations</div>
      </div>
    </div>

    <router-link
      :to="{ path: '/write-review', query: { itemName: itemName } }"
      class="write-review-button"
    >
      Write a review
    </router-link>
  </div>
</template>


<script setup>
const recommendPercent = 58;

const props = defineProps({
  itemName: {
    type: String,
    required: true,
  },
});

</script>


<style scoped>
.recommendation-container {
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: flex-start;
}

.top-section {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#00A200 0%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.circle-inner {
  width: 87%;
  height: 87%;
  border-radius: 50%;
  background-color: #F2F2F2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #00A200;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.recommend-text {
  font-size: 18px;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
}

.recommend-count {
  font-size: 15px;
  color: #555;
  font-family: 'Helvetica', sans-serif;
}

.write-review-button {
  padding: 13px 12px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 16px;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  display: inline-block;
  text-align: center;
}

.write-review-button:hover {
  background-color: #0056b3;
}

@media (max-width: 1000px) {
  .write-review-button {
    margin: 0 auto;
    display: block;
  }
}

</style>
