import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {

  const items = ref([]);
  let currentId = ref(0);

  function addItem(item) {
    item.id = currentId.value++;
    items.value.push(item);
  }

  function deleteItem(id) {
    items.value = items.value.filter(item => item.id !== id);
  }
  
  function getItemCount() {
    return items.value.length;
  }
  
  function getTotal() {
    // return items.value.reduce((total, item) => total + item.Price, 0);

    let total = 0;

    for (const item in items.value) {
      total += item.Price;
    }

    return total;
  }

  const allItems = computed(() => items.value);
  
  return { items, addItem, deleteItem, getItemCount, getTotal, allItems };

});