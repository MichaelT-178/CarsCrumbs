<template>
  <div class="review-card">

    <div class="review-header">
      <h3>{{ review.review_headline }}</h3>
      <span 
        class="material-symbols-outlined delete-icon"
        @click="deleteReview"
      >
      delete
    </span>
    </div>

    <div class="rating-section">
      <StarRating :rating="review.star_rating" :show-number="false" />

      <div class="recommendation-container">
        <div class="divider"></div>
        <span 
          class="material-symbols-outlined" 
          :class="{ 'thumbs-up': review.would_recommend, 'thumbs-down': !review.would_recommend }">
          {{ review.would_recommend ? 'thumb_up' : 'thumb_down' }}
        </span>
        <span 
          class="recommendation-text" 
          :class="review.would_recommend ? 'positive' : 'negative' ">
          {{ review.would_recommend ? 'Would Recommend' : 'Would Not Recommend' }}
        </span>
      </div>
    </div>

    <p class="name-date">
      {{ formatDate(review.date_added) }}
    </p>
    <p class="text-review">{{ review.written_review }}</p>

    <router-link
      :to="`/item/${review.item_name}`"
      class="item-link"
    >
    {{ review.item_name.replace(/_/g, " ") }}
    </router-link>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import StarRating from "../../components/StarRating.vue";
// import axiosInstance from "../../lib/axios";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['reviewDeleted']);

const reviewId = props.review.id;
const userId = authStore.getUserId();

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 550;
};

const deleteReview = async () => {
  const reviewData = {
    user_id: userId,
    review_id: reviewId,
  };

  try {
    // await axiosInstance.delete('delete_review/', { data: reviewData });

    alert("REVIEW DELETED SUCCESSFULLY!!!!!");
    emits('reviewDeleted', reviewId);
  } catch (error) {
    console.error("Error deleting review:", error.response?.data || error.message);
    alert("FAILED");
  }
};

const formatDate = (date) => {
  const dateList = date.split("-");
  return `${dateList[1]}-${dateList[2]}-${dateList[0]}`;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>


<style scoped>

.review-card {
  position: relative;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
  /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05); */
  width: 90%;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-card h3 {
  margin: 0 0 0.5rem;
}

.item-link {
  font-size: 14px;
  font-family: "Helvetica";
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

.item-link:hover {
  color: darkblue;
}

.review-card p {
  margin: 0.25rem 0;
}

.name-date {
  color: #3a3a3a;
  font-size: 14px;
  font-family: "Helvetica";
}

.delete-icon {
  font-size: 25px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-icon:hover {
  color: red;
}

.separator {
  color: black;
}

.text-review {
  padding-top: 8px;
  font-size: 16px;
  font-family: "Helvetica";
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.recommendation-container {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: "Helvetica";
  margin-top: -7px;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: lightgray;
  margin-top: -5px;
  margin-right: 2px;
}

.recommendation {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-family: "Helvetica";
  margin-top: -7px;
}

::v-deep(.recommendation-text.positive) {
  color: green;
}

::v-deep(.recommendation-text.negative) {
  color: #da3b01;
}

.thumbs-up {
  color: green;
  font-size: 15px;
}

.thumbs-down {
  color: #da3b01;
  font-size: 15px;
}

@media (max-width: 800px) {
  .review-card {
    width: 97%;
  }
}

@media (max-width: 400px) {
  .text-review {
    max-width: 290px;
  }
}

</style>

