<template>
  <div v-if="menuItem">
    <p>{{ menuItem.Name }} 😋 (COOKIES.vue)</p>
    <img :src="pic" class="item-pic">
    <p>Name: {{ menuItem.Name }} {{ menuItem.Emoji }}</p>
    <p>Price: ${{ selectedPrice }}</p>

    <!-- Radio Buttons for Selecting Quantity -->
    <div>
      <label>
        <input type="radio" value="6" v-model="selectedQuantity" />
        6 cookies for $15
      </label>
      <label>
        <input type="radio" value="12" v-model="selectedQuantity" />
        12 cookies for $25
      </label>
    </div>
  </div>
  <div v-else>
    <p>Item not found</p>
  </div>
  <button @click="addItem">Print Menu Item</button>
</template>

<script setup>
import { ref, watch } from "vue";
import MenuItems from "../../assets/MenuItems.json";
import { useCartStore } from "../../stores/cart.js";
  
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
const selectedQuantity = ref("6");
const selectedPrice = ref(15);

const updateMenuItem = () => {
  const itemName = props.ItemName.replace(/ /g, "_");
  menuItem.value = jsonData.value[itemName] || null;
  
  if (menuItem.value) {
    pic.value = new URL(`../../assets/menu/${menuItem.value.Image}`, import.meta.url).href;
  }
};

const addItem = () => {
    cart.addItem(menuItem.value)
    alert("Item Successfully Added to Cart!")
  };

watch(selectedQuantity, () => {
  selectedPrice.value = selectedQuantity.value === "6" ? 15 : 25;
});

watch(() => props.ItemName, () => {
  updateMenuItem();
}, { immediate: true });

updateMenuItem();

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

.radio-group {
  margin-top: 10px;
}

.radio-group label {
  margin-right: 20px;
  font-size: 16px;
  font-family: Arial, sans-serif;
}
</style>
