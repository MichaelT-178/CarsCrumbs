<template>
  <div class="write-review-container">
    <WordpressHeader v-if="isSmallScreen" />
    <div v-if="selectedItem" class="review-layout">
      <div class="image-section">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="selectedItem.DisplayName"
          class="item-image"
        />
      </div>

      <div class="form-section">
        <div class="form-section-header">
          <h2>Review this item</h2>
          <p v-if="selectedItem">
            You're writing a review for:
            <strong
              @click="handleCancel"
              class="name-link">{{ selectedItem.DisplayName }}</strong> {{ selectedItem.Emoji }}
          </p>
          <div v-else>
            <p>Item not found.</p>
          </div>
        </div>

        <label class="star-rating-section" :class="{ 'error-border': starRatingError }">
          <strong>Star Rating:</strong>
          <StarRating
            :showNumber="false"
            :starSize="40"
            :editable="true"
            v-model="starRating"
          ></StarRating>
        </label>
        <div v-if="starRating > 0">
        </div>
        <p v-if="starRatingError" style="color: red; margin-top: -5px; margin-bottom: 20px; font-weight: 500;">Required</p>
        
        <div>
          <label><strong>Display Name:</strong></label>
          <input
            class="text-field-input"
            :class="{ 'error-border': displayNameError }"
            type="text"
            placeholder="Enter your public name (optional)"
            v-model="displayName"
            maxlength="30"
          />
          <p v-if="displayNameError" class="text-field-error">Required (max 30 characters)</p>
        </div>

        <div>
          <label><strong>Add a Headline:</strong></label>
          <input
            class="text-field-input"
            :class="{ 'error-border': reviewHeadlineError }"
            type="text"
            placeholder="Enter a title for your review (optional)"
            v-model="reviewHeadline"
            maxlength="30"
          />
          <p v-if="reviewHeadlineError" class="text-field-error">
            Required (max 30 characters)
          </p>
        </div>

        <div>
          <label><strong>Add a Written Review:</strong></label>
          <textarea
            class="text-field-area"
            :class="{ 'error-border': writtenReviewError }"
            v-model="writtenReview"
            placeholder="Provide a brief description (optional)"
            maxlength="255"
          ></textarea>
          <p v-if="writtenReviewError" class="text-field-error">
            Required (max 255 characters)
          </p>
        </div>

        <div class="radio-button-section" :class="{ 'error-border': recommendError }">
          <p><strong>Would you recommend this item?</strong></p>
          <div class="radio-group">
            <label>
              <input type="radio" name="recommend" value="yes" v-model="recommend" /> Yes
            </label>
            <label>
              <input type="radio" name="recommend" value="no" v-model="recommend" /> No
            </label>
          </div>
        </div>
        <p v-if="recommendError" style="color: red; margin-top: 5px; margin-bottom: 20px;">Required</p>

        <div class="buttons">
          <button
            type="button"
            class="cancel-button"
            @click="handleCancel">
            Cancel
          </button>
          <button
            type="button"
            class="submit-button"
            @click="handleSubmit">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import MenuItems from "../../src/assets/real_menu/MenuItems.json";
import StarRating from "../components/StarRating.vue";
import WordpressHeader from "../components/Header.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  itemName: {
    type: String,
    required: true,
  },
});

const imageUrl = ref("");
const isSmallScreen = ref(window.innerWidth < 800);
const displayName = ref("");
const reviewHeadline = ref("");
const writtenReview = ref("");
const starRating = ref(0);
const recommend = ref("");
const router = useRouter();

// Validation messages and styles
const starRatingError = ref(false);
const displayNameError = ref(false);
const reviewHeadlineError = ref(false);
const recommendError = ref(false);
const writtenReviewError = ref(false);

const selectedItem = computed(() =>
  MenuItems.MenuItems.find((item) => item.Name === props.itemName) || null
);

if (selectedItem.value) {
  imageUrl.value = new URL(`../assets/real_menu/pics/${selectedItem.value.Images[0]}`,
    import.meta.url
  ).href;
}

const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 800;
};

const handleCancel = () => {
  router.push({
    name: 'ItemView',
    params: {
      ItemName: props.itemName,
    },
  });
};

const isAnyFieldFilled = () => {
  return displayName.value.trim() || reviewHeadline.value.trim() || writtenReview.value.trim();
};

const handleSubmit = () => {
  // Reset error states
  starRatingError.value = false;
  displayNameError.value = false;
  reviewHeadlineError.value = false;
  recommendError.value = false;
  writtenReviewError.value = false;

  let isValid = true;

  // Validate star rating
  if (starRating.value === 0) {
    starRatingError.value = true;
    isValid = false;
  }

  if (isAnyFieldFilled()) {
    // Validate display name
    if (!displayName.value.trim()) {
      displayNameError.value = true;
      isValid = false;
    }

    // Validate review headline
    if (!reviewHeadline.value.trim()) {
      reviewHeadlineError.value = true;
      isValid = false;
    }

    // Validate written review
    if (!writtenReview.value.trim()) {
      writtenReviewError.value = true;
      isValid = false;
    }
  }

  // Validate recommendation
  if (!recommend.value) {
    recommendError.value = true;
    isValid = false;
  }

  if (isValid) {
    console.log("SUBMIT");
    console.log("Display Name:", displayName.value);
    console.log("Review Headline:", reviewHeadline.value);
    console.log("Written Review:", writtenReview.value);
    console.log("Star Rating:", starRating.value);
    console.log("Would recommend:", recommend.value);
  }
};

// Watch for changes to remove errors
watch(starRating, (newValue) => {
  if (newValue > 0) {
    starRatingError.value = false;
  }
});

watch(displayName, (newValue) => {
  if (newValue.trim()) {
    displayNameError.value = false;
  }
});

watch(reviewHeadline, (newValue) => {
  if (newValue.trim()) {
    reviewHeadlineError.value = false;
  }
});

watch(writtenReview, (newValue) => {
  if (newValue.trim()) {
    writtenReviewError.value = false;
  }
});

watch(recommend, (newValue) => {
  if (newValue) {
    recommendError.value = false;
  }
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "auto" });
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
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

.review-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.thanks-for-review-text {
  color: #008300;
  font-weight: bold;
  margin-top: -5px;
  margin-bottom: 17px;
}

.submit-early-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 5px 15px;
  border-radius: 4px;
  top: -10px;
  cursor: pointer;
  margin-bottom: 10px;
}

.submit-early-button:hover {
  background-color: #0056b3;
}

.item-image {
  width: 300px;
  height: 300px;
  border: 1.5px solid #b4b2b2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-field-error {
  color: red; 
  margin-top: -10px; 
  margin-bottom: 20px;
}

.form-section {
  flex: 2;
}

.form-section-header {
  margin-bottom: 15px;
}

.form-section h2 {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.name-link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.text-field-input,
.text-field-area {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  max-width: 800px;
  font-family: "Helvetica";
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: none;
  height: 100px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.radio-group {
  margin-top: 10px;
  margin-bottom: 12px;
}

.cancel-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.submit-button:hover {
  background-color: #0056b3;
}

.bottom-section {
  background-color: #F3E7A4;
  text-align: center;
  height: 80px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.bottom-section p {
  font-size: 17px;
}

.error-border {
  border: 1px solid red;
}

@media (max-width: 800px) {
  .review-layout {
    flex-direction: column;
    align-items: center;
  }

  .image-section {
    justify-content: center;
    margin-bottom: 20px;
  }

  .bottom-section {
    text-align: left;
    padding-left: 20px;
  }

  .form-section-header {
    order: -1;
    margin-bottom: 15px;
  }
}

</style>
