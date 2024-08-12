<template>
  <div v-if="menuItem">
    <p>{{ menuItem.Name }} 😋</p>
    <img :src="pic" class="item-pic">
    <p>Name: {{ menuItem.Name }} {{ menuItem.Emoji }}</p>
    <p>Price: ${{ menuItem.Price }}</p>
  </div>
  <div v-else>
    <p>Item not found</p>
  </div>
</template>


<script setup>
import { ref, watch } from "vue";
import MenuItems from "../assets/MenuItems.json";

const props = defineProps({
  ItemName: {
    type: String,
    required: true
  }
});

const jsonData = ref(MenuItems);
const menuItem = ref(null);
const pic = ref("");

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

</style>
