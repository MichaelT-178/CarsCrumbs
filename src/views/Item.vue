<template>
  <div v-if="menuItem" class="menu-item-container">
    <!-- Image on the left -->
    <img :src="pic" class="item-pic" />

    <!-- Information on the right -->
    <div class="item-info">
      <p class="title">{{ menuItem.DisplayName }} 😋</p>
      <p class="price">Price: {{ menuItem.DisplayPrice }}</p>

      <!-- Quantity Label -->
      <label class="quantity-label">Quantity:</label>
      
      <!-- Radio buttons -->
      <div class="options-row">
        <div v-for="(option, index) in menuItem.Options" :key="index" class="option-radio">
          <label class="radio-label">
            <input type="radio" v-model="selectedOption" :value="option" class="radio-input">
            <span class="custom-radio">{{ option.description }} - ${{ option.price }}</span>
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

  <!-- "Try our Other Cookies" section -->
  <div v-if="relatedItems.length > 0" class="related-items-container">
    <p class="related-title">Try our Other Items</p>
    <div class="scrollable-container">
      <!-- Left arrow to scroll -->
      <button class="scroll-button left-arrow" @click="scrollLeft">❮</button>
      
      <!-- Scrollable recommended items -->
      <div class="related-items-grid">
        <MenuCard
          v-for="(item, index) in relatedItems"
          :key="index"
          :item="item"
        />
      </div>
      
      <!-- Right arrow to scroll -->
      <button class="scroll-button right-arrow" @click="scrollRight">❯</button>
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from "vue";
import MenuItems from "../assets/menu_items/MenuItems.json";
import MenuCard from '../components/MenuCard.vue';
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const props = defineProps({
  ItemName: {
    type: String,
    required: true
  }
});

const jsonData = ref(MenuItems);
const menuItem = ref(null);
const pic = ref("");
const selectedOption = ref(null);
const relatedItems = ref([]);

const updateMenuItem = () => {
  const itemName = props.ItemName.replace(/ /g, "_");
  menuItem.value = jsonData.value[itemName] || null;

  if (menuItem.value) {
    pic.value = new URL(`../assets/menu/${menuItem.value.Image}`, import.meta.url).href;
    findRelatedItems(menuItem.value);
  }
};

const findRelatedItems = (currentItem) => {
  // First, filter the items that share tags with the current item
  const taggedItems = Object.values(jsonData.value).filter(item => {
    return item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name;
  });

  // Then, filter the items that do not share any tags with the current item
  const otherItems = Object.values(jsonData.value).filter(item => {
    return !item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name;
  });

  // Combine the two arrays, with related items appearing first
  relatedItems.value = [...taggedItems, ...otherItems];
};

// Watch for changes in the item and update accordingly
watch(() => props.ItemName, () => {
  updateMenuItem();
}, { immediate: true });

updateMenuItem();

const addItem = () => {
  if (selectedOption.value) {
    const option = selectedOption.value;

    cart.addItem({ ...menuItem.value, Cost: option.price, Description: option.description });
    alert("Item Successfully Added to Cart!");
  }
};

// Scroll the related items grid left
const scrollLeft = () => {
  const container = document.querySelector('.related-items-grid');
  container.scrollBy({
    left: -1000, // Adjust scroll amount as needed
    behavior: 'smooth'
  });
};

// Scroll the related items grid right
const scrollRight = () => {
  const container = document.querySelector('.related-items-grid');
  container.scrollBy({
    left: 1000, // Adjust scroll amount as needed
    behavior: 'smooth'
  });
};
</script>



<style scoped>
.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  background-color: lightskyblue;
  border-radius: 0;
  margin-top: -13px;
}

.item-pic {
  width: 350px;
  height: 350px;
  border: 1.5px solid black;
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
  padding-top: 5px;
  padding-bottom: 20px;
  font-weight: 600;
  color: white;
  text-align: left;
}

.quantity-label {
  font-size: 20px;
  font-weight: bold;
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
  transition: background-color 0.3s;
  border: 1px solid #ccc;
}

.radio-input:checked + .custom-radio {
  background-color: #fdbe0f;
  color: white;
  border: 1px solid purple;
}

button {
  padding: 10px 20px;
  background-color: #ff6347;
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
  background-color: #ff4500;
}

/* Related Items Section */
.related-items-container {
  margin-top: 50px;
  padding: 20px;
  background-color: #F3E7A4;
  border-radius: 5px;
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
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  width: 100%;
  padding: 10px 0;
}

/* Make all MenuCards the same width */
.menu-card {
  width: 250px; /* Set the fixed width for each card */
  flex-shrink: 0; /* Prevent the cards from shrinking */
}

.related-items-grid::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
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

@media (max-width: 800px) {
  .menu-item-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 30px;
  }

  .item-info {
    text-align: center;
    width: 100%;
    margin-top: 20px;
  }

  .title {
    margin-bottom: 5px;
  }

  .price {
    font-size: 22px;
  }
  
  .item-pic {
    margin-bottom: -40px;
    width: 100%;
    max-width: 360px;
    height: auto;
  }

  .options-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .option-radio {
    margin: 10px 0;
  }

  .related-items-grid {
    justify-content: center;
  }

  .related-title {
    text-align: center;
  }
  
  .menu-card {
    width: 100%;
    max-width: 250px; /* Adjust max width for smaller screens */
    height: auto;
  }
}


</style>
