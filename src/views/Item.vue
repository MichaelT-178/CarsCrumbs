<template>
  <div v-if="menuItem">
    <p>{{ menuItem.DisplayName }} 😋 (BREAD.vue)</p>
    <img :src="pic" class="item-pic">
    <p>Name: {{ menuItem.DisplayName }} {{ menuItem.Emoji }}</p>
    <p>Price: {{ menuItem.DisplayPrice }}</p>

    <!-- Radio buttons -->
    <div v-for="(option, index) in menuItem.Options" :key="index" class="option-radio">
      <label>
        <input type="radio" v-model="selectedOption" :value="option">
        {{ option.description }} - ${{ option.price }}
      </label>
    </div>

    <button @click="addItem" :disabled="!selectedOption">
      Add to Cart
    </button>

  </div>
  <div v-else>
    <p>Item not found</p>
  </div>
</template>


<script setup>
import { ref, watch } from "vue";
import MenuItems from "../assets/menu_items/MenuItems.json";
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

const updateMenuItem = () => {
  const itemName = props.ItemName.replace(/ /g, "_");
  menuItem.value = jsonData.value[itemName] || null;
  
  if (menuItem.value) {
    pic.value = new URL(`../assets/menu/${menuItem.value.Image}`, import.meta.url).href;
  }
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

</script>


<style scoped>
.title {
  color: red;
  font-family: Arial, sans-serif;
  font-size: 50px;
}

.item-pic {
  width: 500px;
  height: 300px;
}

.option-radio {
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #45a049;
}

</style>
