<template>
  <p class="title">Your Reviews</p>

  <div v-if="false">
    <NoItems 
      message="You haven't left any reviews yet! Go buy something and leave a review!"
      buttonText="Order Now">
    </NoItems>
  </div>
  <div v-else>
    <div v-for="review in userReviews" :key="review.id" class="review-wrapper">
      <UserReviewCard :review="review" />
    </div>
  </div>
</template>

<script setup>
import NoItems from "./Empty.vue";
import UserReviewCard from "../../components/Account/UserReviewCard.vue";
import ReviewsData from "../../assets/real_menu/Reviews.json";

const userReviews = ReviewsData.Reviews;

</script>

<style scoped>
.title {
  color: green;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
}

.review-wrapper {
  margin-bottom: 16px;
}

@media (max-width: 800px) {
	.title {
    margin-left: 10px;
    margin-top: 15px;
  }

	.review-wrapper {
		margin-left: 10px;
	}
}

</style>
