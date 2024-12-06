<template>

  <WordpressHeader 
    v-if="isSmallScreen" 
    class="wordpress-header" 
  />

  <div v-if="menuItem" class="menu-item-container">

    <img :src="pic" class="item-pic" />

    <div class="item-info">
      <p class="title">{{ menuItem.DisplayName }}</p>
      <StarRating :rating="menuItem.Rating" :show-number="false" :starSize="22"/>
      <p class="price">Price: {{ menuItem.DisplayPrice }}</p>

      <label class="quantity-label">Quantity:</label>
      
      <div class="options-row">
        <div v-for="(option, index) in menuItem.Options" :key="index" class="option-radio">
          <label class="radio-label">
            <input type="radio" v-model="selectedOption" :value="option" class="radio-input">
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

    <!-- Reviews Section -->
    <div class="reviews-section">
      <h2 class="related-title">Customer Reviews</h2>
      <div v-if="filteredReviews.length" class="reviews-container">
        <ReviewCard 
          v-for="(review, index) in filteredReviews" 
          :key="index" 
          :review="review" 
        />
      </div>
      <div v-else>
        <p>No reviews for this item yet.</p>
      </div>
    </div>

  
  
  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import MenuCard from "../components/MenuCard.vue";
import WordpressHeader from "../components/Header.vue";
import StarRating from "../components/StarRating.vue";
import ReviewCard from "../components/ReviewCard.vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "../stores/cart.js";
import { folderRealOrTest } from "../data.config.js";
import Reviews from "../assets/real_menu/Reviews.json";

const cart = useCartStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  ItemName: {
    type: String,
    required: true,
  },
});

const jsonData = ref([]);
const menuItem = ref(null);
const pic = ref("");
const selectedOption = ref(null);
const relatedItems = ref([]);
const isSmallScreen = ref(false);
const filteredReviews = ref([]);

const loadAllReviews = () => {
  filteredReviews.value = Reviews.Reviews;
};

const updateScreenSize = () => {
  isSmallScreen.value = window.matchMedia("(max-width: 650px)").matches;
};

const updateMenuItem = () => {
  const itemName = props.ItemName;

  menuItem.value = jsonData.value.find((item) => item.Name === itemName) || null;

  if (menuItem.value) {
    pic.value = new URL(`../assets/${folderRealOrTest}/pics/${menuItem.value.Images[0]}`, import.meta.url).href;

    findRelatedItems(menuItem.value);

    if (menuItem.value.Options.length === 1) {
      selectedOption.value = menuItem.value.Options[0];
    }
  }
};

const findRelatedItems = (currentItem) => {
  const taggedItems = jsonData.value.filter(
    (item) =>
      item.Tags.some((tag) => currentItem.Tags.includes(tag)) &&
      item.Name !== currentItem.Name
  );

  const otherItems = jsonData.value.filter(
    (item) =>
      !item.Tags.some((tag) => currentItem.Tags.includes(tag)) &&
      item.Name !== currentItem.Name
  );

  relatedItems.value = [...taggedItems, ...otherItems];
};

const addItem = () => {
  if (selectedOption.value) {
    cart.addItem({
      ...menuItem.value,
      Cost: selectedOption.value.price,
      Quantity: selectedOption.value.quantity,
    });

    alert("Item Successfully Added to Cart!");
  }
};

const scrollLeft = () => {
  const container = document.querySelector(".related-items-grid");
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  const container = document.querySelector(".related-items-grid");
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
};

const goToItemPage = (item) => {
  router.push(item.Route).then(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const loadMenuData = async () => {
  try {
    const MenuData = await import(`../assets/${folderRealOrTest}/MenuItems.json`);
    jsonData.value = MenuData.default.MenuItems;
    updateMenuItem();
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
};

watch(
  () => route.params.ItemName, 
  () => updateMenuItem()
);

onMounted(() => {
  updateScreenSize();
  loadMenuData();
  loadAllReviews();
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

</script>


<style scoped>
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
  border: 1.5px solid gray;
}

.item-info {
  display: flex;
  flex-direction: column;
  text-align: left;
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

.wordpress-header {
  display: none;
}

.reviews-section {
  margin-top: -10px;
  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
}

@media (max-width: 650px) {
  .menu-item-container {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
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
