<template>
  <div class="review-card">
    <h3>{{ review.Header }}</h3>
    <StarRating :rating="review.Rating" />
    <p class="name-date">
      {{ review.Name }}
      <span class="separator">•</span>
      {{ review.DateAdded }}
    </p>
    <p class="text-review">{{ review.Text }}</p>
  </div>
</template>


<script setup>
import StarRating from "./StarRating.vue";

defineProps({
  review: {
    type: Object,
    required: true,
  },
});

</script>


<style scoped>
.review-card {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: white;
  border: 1px solid black;
  width: 600px;
}

.review-card h3 {
  margin: 0 0 0.5rem;
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

</style>

