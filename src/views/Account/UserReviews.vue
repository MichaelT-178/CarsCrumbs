<template>
  <p class="title">Your Reviews</p>

  <div v-if="loading">
    <p>Loading your reviews...</p>
  </div>
  
  <div v-else-if="userReviews.length === 0">
    <NoItems 
      message="You haven't left any reviews yet! Go buy something and leave a review!"
      buttonText="Order Now">
    </NoItems>
  </div>
  
  <div v-else>
    <div v-for="review in userReviews" :key="review.id" class="review-wrapper">
      <UserReviewCard :review="review" @reviewDeleted="removeReview" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import NoItems from "./Empty.vue";
import UserReviewCard from "../../components/Account/UserReviewCard.vue";
import { useAuthStore } from "../../stores/auth";
import UserInfo from "../../../src/assets/new_data/user_info.json";

const userReviews = ref([]);
const loading = ref(true);
const authStore = useAuthStore();

const fetchUserReviews = async () => {
  try {
    userReviews.value = UserInfo.Reviews;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
  } finally {
    loading.value = false;
  }
};

const removeReview = (reviewId) => {
  console.log("DELETE REVIEW");
  // userReviews.value = userReviews.value.filter((review) => String(review.id) !== String(reviewId));
};

onMounted(() => {
  fetchUserReviews();
});
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
