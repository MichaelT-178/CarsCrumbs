<template>
  <WordpressHeader v-if="isSmallScreen" />

  <div v-if="menuItem" class="menu-item-container">
    <img :src="pic" class="item-pic" />

    <div class="item-info">
      <p class="title">{{ menuItem.DisplayName }}</p>
      <div class="rating-container">
        <StarRating :rating="menuItem.Rating" :show-number="false" :starSize="22" />
        <p class="dividing-circle">•</p>

        <div v-if="itemStats?.num_of_ratings">
          <div class="rating-num-section">
            <p class="rating-number" @click="scrollToReviews">{{ itemStats.num_of_ratings }}</p>
            <span class="material-symbols-outlined down-arrow-icon">keyboard_arrow_down</span>
          </div>
        </div>
        <div v-else>
          <p class="first-review-text" @click="scrollToReviews">
            Be the first to review
          </p>
        </div>
      </div>

      <p class="price">Price: {{ menuItem.DisplayPrice }}</p>

      <label class="quantity-label">Quantity:</label>

      <div class="options-row">
        <div v-for="(option, index) in menuItem.Options" :key="index" class="option-radio">
          <label class="radio-label">
            <input type="radio" v-model="selectedOption" :value="option" class="radio-input" />
            <span class="custom-radio">{{ option.quantity }} - ${{ option.price }}</span>
          </label>
        </div>
      </div>

      <button @click="addItem" :disabled="!selectedOption">
        Add to Cart
      </button>
    </div>
  </div>
  <div v-else>
    <p>Item not found</p>
  </div>

  <!-- Try our Other Items -->
  <div class="related-items-container">
    <p class="related-title">Try our Other Items</p>
    <div class="scrollable-container">
      <button class="scroll-button left-arrow" @click="scrollLeft">❮</button>
      <div class="related-items-grid">
        <MenuCard
          v-for="(item, index) in relatedItems"
          :key="index"
          :item="item"
          :disableTagHover="true"
          @click="goToItemPage(item)"
        />
      </div>
      <button class="scroll-button right-arrow" @click="scrollRight">❯</button>
    </div>
  </div>

  <div class="has-reviews" v-if="itemReviews.length">
    <!-- Reviews Section -->
    <div class="reviews-section">
      <h2 class="reviews-header">Customer Reviews</h2>
      <hr class="reviews-header-divider" />
      <ReviewPanel :review-stats="itemStats" :item-name="props.ItemName" />
      <div class="reviews-divider">
        <span class="divider-title">Reviews</span>
        <hr class="reviews-header-divider" />
      </div>
      <div class="reviews-container" ref="reviewsSection">
        <ReviewCard v-for="(review, index) in itemReviews" :key="index" :review="review" />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="reviews-section">
      <div class="reviews-divider">
        <span class="divider-title">Reviews</span>
        <hr class="reviews-header-divider" />
        <div class="empty-review-section">
          <p class="custom-reviews-title">No Customer Reviews Yet</p>
          <StarRating
            :rating="0"
            :show-number="false"
            :starSize="56"
            class="empty-star-rating"
            @click="goToWriteReview"
          />
          <p class="custom-reviews-text" ref="reviewsSection">
            Be the first person to rate this item!
          </p>
          <div @click="goToWriteReview" class="write-review-button">
            Write a review
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import MenuCard from "../components/RecommendCard.vue";
import WordpressHeader from "../components/Header.vue";
import StarRating from "../components/StarRating.vue";
import ReviewCard from "../components/ReviewCard.vue";
import ReviewPanel from "../components/ReviewPanel/ReviewPanel.vue";
import { useCartStore } from "../stores/cart.js";
import { useAuthStore } from "../stores/auth.js";
import MenuData from "../../src/assets/new_data/menu.json";
import ReviewData from "../../src/assets/new_data/reviews.json";

const cart = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  ItemName: {
    type: String,
    required: true
  }
});

const jsonData = ref([]);
const menuItem = ref(null);
const pic = ref("");
const selectedOption = ref(null);
const relatedItems = ref([]);
const isSmallScreen = ref(false);
const itemReviews = ref([]);
const itemStats = ref(null);
const reviewsSection = ref(null);

const scrollToReviews = () => {
  if (reviewsSection.value) {
    reviewsSection.value.scrollIntoView({ behavior: "smooth" });
  }
};

// UPDATED: Use static ReviewData
const loadAllReviews = () => {
  const itemReviewBlock = ReviewData.reviews.find(
    review => review.item_name === props.ItemName
  );

  if (itemReviewBlock) {
    itemReviews.value = itemReviewBlock.reviews || [];
    itemStats.value = itemReviewBlock.review_stats || null;
  } else {
    itemReviews.value = [];
    itemStats.value = null;
  }
};

const updateScreenSize = () => {
  isSmallScreen.value = window.matchMedia("(max-width: 650px)").matches;
};

const updateMenuItem = () => {
  const matchedItem = jsonData.value.find(item => item.Name === props.ItemName);

  if (matchedItem) {
    menuItem.value = matchedItem;
    if (matchedItem.Images.length > 0) {
      pic.value = `../../src/assets/new_images/${matchedItem.Images[0]}`;
    }
    findRelatedItems(matchedItem);
    if (matchedItem.Options.length === 1) {
      selectedOption.value = matchedItem.Options[0];
    }
  } else {
    console.error(`No menu item found matching name: ${props.ItemName}`);
  }
};

const findRelatedItems = (currentItem) => {
  const taggedItems = jsonData.value.filter(
    item => item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name
  );
  const otherItems = jsonData.value.filter(
    item => !item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name
  );
  relatedItems.value = [...taggedItems, ...otherItems];
};

const addItem = () => {
  if (selectedOption.value) {
    cart.addItem({
      ...menuItem.value,
      Cost: selectedOption.value.price,
      Quantity: selectedOption.value.quantity
    });
    alert("Item Successfully Added to Cart!");
  }
};

const scrollLeft = () => {
  const container = document.querySelector(".related-items-grid");
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({ left: -cardWidth, behavior: "smooth" });
};

const scrollRight = () => {
  const container = document.querySelector(".related-items-grid");
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({ left: cardWidth, behavior: "smooth" });
};

const goToItemPage = (item) => {
  let path = item.Route;
  if (!path.startsWith("/")) path = "/" + path;
  router.push(path).then(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const goToWriteReview = () => {
  if (authStore.getIsLoggedIn()) {
    router.push({ path: "/write-review", query: { itemName: props.ItemName } });
  } else {
    router.push({
      path: "/sign-in",
      query: {
        successRoute: "write-review",
        successRouteProp: JSON.stringify({ itemName: props.ItemName })
      }
    });
  }
};

const loadMenuData = () => {
  jsonData.value = MenuData.MenuItems || [];
};

watch(
  () => props.ItemName,
  async (newItemName, oldItemName) => {
    if (newItemName !== oldItemName) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      menuItem.value = null;
      itemReviews.value = [];
      pic.value = "";
      selectedOption.value = null;
      await updateMenuItem();
      await loadAllReviews();
    }
  }
);

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "auto" });
  updateScreenSize();
  loadMenuData();
  updateMenuItem();
  loadAllReviews();
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>




<style scoped>
html {
  scroll-behavior: smooth;
}

.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  border-radius: 0;
}

.item-pic {
  width: 300px;
  height: 300px;
  /* border: 1.5px solid gray; */
  border: 1.5px solid #b4b2b2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.empty-review-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0; 
}

.empty-star-rating:hover {
  cursor: pointer;
}

.rating-container {
  display: flex;
  align-items: center;
  /* gap: 10px; */
}

.rating-num-section {
  display: flex;
  color: #424242;
  font-family: "Helvetica";
}

.dividing-circle {
  margin-left: 5px;
  margin-right: 1px;
  margin-top: -5.5px;
}

.rating-number {
  margin-top: -6.5px;
  margin-left: 7px;
}

.first-review-text {
  color: #424242;
  font-family: "Helvetica";
  margin-left: 6px;
  margin-top: -7px
}

.first-review-text:hover {
  color: #2d2d2d;
  text-decoration: underline;
  cursor: pointer;
}

.down-arrow-icon {
  font-size: 17px;
  margin-top: -6px;
}

.rating-num-section:hover {
  color: black;
  cursor: pointer;
}

.rating-number:hover {
  text-decoration: underline;
}

.title {
  color: black;
  font-family: Arial, sans-serif;
  font-size: 40px;
  font-weight: bold;
  text-align: left;
}

.price {
  font-size: 20px;
  margin-top: -1px;
  padding-bottom: 20px;
  text-align: left;
  font-family: "Helvetica";
}

.quantity-label {
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 0;
}

.options-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.option-radio {
  margin: 10px 0;
}

.radio-label {
  display: flex;
  align-items: center;
}

.radio-input {
  display: none;
}

.custom-radio {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 50px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-family: "Helvetica";
  font-size: 15px;
  transition: background-color 0.3s;
  border: 1px solid #ccc;
}

.radio-input:checked + .custom-radio {
  background-color: #3E0054;
  color: white;
  font-weight: 600;
  border: 1.5px solid black;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}

.related-items-container {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
}

.related-title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
  text-align: left;
}

.scrollable-container {
  display: flex;
  align-items: center;
  position: relative;
}

.related-items-grid {
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  gap: 20px;
  width: 100%;
  padding: 10px 0;
  scroll-snap-type: x mandatory;
}

.menu-card {
  width: 250px;
  flex-shrink: 0;
}

.related-items-grid::-webkit-scrollbar {
  display: none;
}

.empty-reviews-divider {
  text-align: center;
  margin-top: 20px;
}

.custom-reviews-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.custom-reviews-text {
  margin: 10px 0;
  text-align: center;
  font-size: 17px;
  font-family: 'Helvetica', sans-serif;
}

.write-review-button {
  padding: 10px 23px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 18px;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  margin-top: 5px;
}

.write-review-button:hover {
  background-color: #0056b3;
  cursor: pointer;
}


.scroll-button {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  z-index: 10;
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

.bottom-section {
  background-color: #F3E7A4;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.bottom-section p {
  font-size: 17px;
}

.reviews-section {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
}

.reviews-header {
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: left;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
}

.reviews-divider {
  text-align: left;
  margin-top: 20px;
}

.reviews-header-divider {
  width: 100%;
  height: 1px;
  background-color: #b1b1b1;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
}

.reviews-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: -8px;
}

.divider-title {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
}

@media (max-width: 650px) {
  .menu-item-container {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
  }

  .reviews-header {
    font-size: 36px;
  }

  .item-pic {
    height: 305px;
    width: 305px;
    align-self: center;
    margin-top: -40px;
  }

  .item-info {
    text-align: left;
    width: 100%;
    margin-top: -25px;
  }

  .title {
    font-size: 30px;
    text-align: left;
    margin-bottom: 5px;
  }

  .price {
    font-size: 22px;
    text-align: left;
  }

  .options-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .quantity-label {
    text-align: left;
  }

  .related-title {
    text-align: left;
  }
  
  .related-items-container {
    padding-left: 20px;
  }
  
  .menu-card {
    width: 100%;
    max-width: 250px;
    height: auto;
  }

  .bottom-section {
    text-align: left;
    padding-left: 20px;
  }

  .related-title {
    font-size: 35px;
  }
}

</style>