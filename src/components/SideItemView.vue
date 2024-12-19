<template>
  <transition name="slide">
    <div class="side-view-wrapper">
      <button class="close-btn" @click="handleClose">
        <span class="material-symbols-outlined">close</span>
      </button>

      <div v-if="contentVisible" class="side-content" @keydown="handleKeydown">
        <h2>{{ menuItem.DisplayName }}</h2>

        <div class="image-container">
          <img
            :src="pic"
            class="item-pic"
            alt="Item Image"
            @load="onImageLoaded"
          />
        </div>

        <p v-if="menuItem">
          Name:
          <router-link
            :to="{ name: 'ItemView', params: { ItemName: menuItem.Name } }"
            class="router-link"
          >
            {{ menuItem.DisplayName }} {{ menuItem.Emoji }}
          </router-link>
        </p>
        <p v-if="menuItem">Price: {{ menuItem.DisplayPrice }}</p>

        <div v-if="menuItem.Options">
          <div
            v-for="(option, index) in menuItem.Options"
            :key="index"
            class="option-radio"
          >
            <label>
              <input type="radio" v-model="selectedOption" :value="option" />
              {{ option.quantity }} - ${{ option.price }}
            </label>
          </div>
        </div>

        <button
          @click="addItem"
          :disabled="!selectedOption"
          class="add-item-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const menuItem = ref(null);
const pic = ref("");
const selectedOption = ref(null);
const contentVisible = ref(false);

const handleClose = () => {
  emit("close");
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    handleClose();
  }
};

const updateMenuItem = () => {
  if (props.item) {
    menuItem.value = props.item;
    pic.value = `https://crumb-pics.s3.us-east-1.amazonaws.com/${props.item.Images[0]}`;
  }
};

const addItem = () => {
  if (selectedOption.value) {
    const option = selectedOption.value;

    cart.addItem({
      ...menuItem.value,
      Cost: option.price,
      Quantity: option.quantity,
    });

    alert("Item Successfully Added to Cart!");
    handleClose();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  updateMenuItem();
  contentVisible.value = true;
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

</script>



<style scoped>
.side-view-wrapper {
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

.side-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.image-container {
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  margin-bottom: 20px;
}

.item-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.option-radio {
  margin: 10px 0;
}

.add-item-btn {
  padding: 10px 20px;
  background-color: #4caf50;
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

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 400px) {
  .side-view-wrapper {
    width: 350px;
  }
}

</style>
