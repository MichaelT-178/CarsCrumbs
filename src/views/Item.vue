<template>
  <div v-if="menuItem" class="menu-item-container">

    <img :src="pic" class="item-pic" />

    <div class="item-info">
      <p class="title">{{ menuItem.DisplayName }} 😋</p>
      <p class="price">Price: {{ menuItem.DisplayPrice }}</p>

      <label class="quantity-label">Quantity:</label>
      
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
  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>


<script setup>
import { ref, watch } from "vue";
import MenuItems from "../assets/menu_items/MenuItems.json";
import MenuCard from '../components/MenuCard.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();
const router = useRouter();

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
    pic.value = new URL(`../assets/example_pics/menu/${menuItem.value.Image}`, import.meta.url).href;
    findRelatedItems(menuItem.value);
  }
};

const findRelatedItems = (currentItem) => {
  const taggedItems = Object.values(jsonData.value).filter(item => {
    return item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name;
  });

  const otherItems = Object.values(jsonData.value).filter(item => {
    return !item.Tags.some(tag => currentItem.Tags.includes(tag)) && item.Name !== currentItem.Name;
  });

  relatedItems.value = [...taggedItems, ...otherItems];
};

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


const scrollLeft = () => {
  const container = document.querySelector('.related-items-grid');
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({
    left: -cardWidth - 1000,
    behavior: 'smooth'
  });
};

const scrollRight = () => {
  const container = document.querySelector('.related-items-grid');
  const cardWidth = container.offsetWidth / 2;
  container.scrollBy({
    left: cardWidth,
    behavior: 'smooth'
  });
};

const goToItemPage = (item) => {
  router.push(item.Route).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

</script>


<style scoped>
.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  background-color: lightblue;
  border-radius: 0;
  margin-top: -13px;
}

.item-pic {
  width: 300px;
  height: 300px;
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
  color: navy;
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
    text-align: center;
  }

  .price {
    font-size: 22px;
    text-align: center;
  }
  
  .item-pic {
    margin-bottom: -40px;
    height: 275px;
    width: 275px;
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

  .related-title {
    text-align: center;
  }
  
  .menu-card {
    width: 100%;
    max-width: 250px;
    height: auto;
  }
}

</style>
