<template>
  <div class="write-review-container">
    <h1>Write a Review</h1>
    <p>You're writing a review for: <strong>{{ itemName }}</strong></p>
    <!-- Add the rest of your review form or content here -->
  </div>
</template>

<script setup>
const props = defineProps({
  itemName: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.write-review-container {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 24px;
}

p {
  font-size: 18px;
}
</style>
