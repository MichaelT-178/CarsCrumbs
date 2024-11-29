<template>
  <div v-if="menuItem">
    <div class="side-content" @keydown="handleKeydown">
      <button class="close-btn" @click="handleClose">
        <span class="material-symbols-outlined">close</span>
      </button>
      <h2>{{ menuItem.DisplayName }}</h2>
      <img :src="pic" class="item-pic">
      <p>
        Name: 
        <router-link :to="{ name: 'ItemView', params: { ItemName: ItemName } }" class="router-link">
          {{ menuItem.DisplayName }} {{ menuItem.Emoji }}
        </router-link>
      </p>
      <p>Price: {{ menuItem.DisplayPrice }} </p>

      <!-- Radio Buttons -->
      <div v-for="(option, index) in menuItem.Options" :key="index" class="option-radio">
        <label>
          <input type="radio" v-model="selectedOption" :value="option">
          {{ option.description }} - ${{ option.price }}
        </label>
      </div>

      <button @click="addItem" :disabled="!selectedOption" class="add-item-btn">
        Add to Cart
      </button>
    </div>
  </div>
  <div v-else>
    <p>Item not found</p>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import MenuItems from "../assets/test_menu/MenuItems.json";
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

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleClose();
  }
};

const updateMenuItem = () => {
  const itemName = props.ItemName.replace(/ /g, "_");
  menuItem.value = jsonData.value[itemName] || null;
  
  if (menuItem.value) {
    pic.value = new URL(`../assets/test_menu/pics/${menuItem.value.Images[0]}`, import.meta.url).href;
  }
};

const addItem = () => {
  if (selectedOption.value) {
    const option = selectedOption.value;

    cart.addItem({ 
      ...menuItem.value, 
      Cost: option.price, 
      Description: option.description 
    });
    
    alert("Item Successfully Added to Cart!");
    handleClose();
  }
};

watch(selectedOption, (newOption) => {
  menuItem.value.DisplayPrice = newOption ? `$${newOption.price}.00` : menuItem.value.DisplayPrice;
});

watch(() => props.ItemName, () => {
  updateMenuItem();
}, { immediate: true });

onMounted(() => {
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
  align-items: flex-start;
  padding: 20px;
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
  margin-bottom: 10px;
  color: black;
  align-self: flex-start;
}

.item-pic {
  width: 300px;
  height: 200px;
  margin-bottom: 20px;
}

.option-radio {
  margin: 10px 0;
}

.add-item-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.add-item-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-item-btn:hover:enabled {
  background-color: #45a049;
}

.router-link {
  text-decoration: none;
  color: inherit;
}

.router-link:hover {
  text-decoration: underline;
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
