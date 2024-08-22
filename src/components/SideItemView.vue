<template>
  <div class="side-content" @keydown="handleKeydown">
    <button class="close-btn" @click="handleClose">
      <span class="material-symbols-outlined">close</span>
    </button>
    <h2>{{ item.Name }}</h2>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const props = defineProps({
  item: Object,
  required: true
});

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
