<template>
  <div v-if="menuItem">
  <div class="side-content" @keydown="handleKeydown">
    <button class="close-btn" @click="handleClose">
      <span class="material-symbols-outlined">close</span>
    </button>
    <h2 v-if="menuItem">{{ menuItem.DisplayName }}</h2>
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
  </div>
  <div v-else>
    <p>Item not found</p>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MenuItems from "../assets/MenuItems.json";
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const props = defineProps({
  ItemName: {
    type: String,
    required: true
  }
});

const jsonData = ref(null);
const menuItem = ref(null);
const pic = ref("");

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleClose();
  }
};

onMounted(() => {
  jsonData.value = MenuItems;
  menuItem.value = jsonData.value[props.ItemName];
  pic.value = new URL(`../assets/menu/${menuItem.value.Image}`, import.meta.url).href;
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>


<style scoped>
.side-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 2000;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.material-symbols-outlined {
  font-size: 24px;
}

.material-symbols-outlined:hover {
  color: red;
}

h2 {
  font-size: 24px;
  margin: 0;
  color: black;
}

.item-pic {
  width: 300px;
  height: 200px;
}

.option-radio {
  margin: 10px 0;
}

@media (max-width: 680px) {
  .side-content {
    width: 100%;
  }

  .close-btn {
    right: 10px;
  }
}

</style>
