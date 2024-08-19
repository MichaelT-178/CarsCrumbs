import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  let currentId = ref(0);

  // Load items from localStorage when the store is created
  const loadItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedItems && Array.isArray(storedItems)) {
      items.value = storedItems;
      currentId.value = storedItems.length > 0 
                        // Convert storedItems to id's and take the max. Then add 1. If empty its 0.
                      ? Math.max(...storedItems.map(item => item.id)) + 1 
                      : 0;
    }
  };

  loadItems();

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
    return items.value.reduce((total, item) => total + item.Price, 0);
  }

  function getCartDetails() {
    let bodyContent = `Order Summary<br/><br/>`;
    
    items.value.forEach(item => {
      bodyContent += `
      <div>
        <strong>Product:</strong> ${item.Name}<br/>
        <strong>Price:</strong> $${item.Price.toFixed(2)}<br/>
        <strong>Quantity:</strong> ${item.quantity || 1}<br/>
      </div><br/>`;
    });
    
    bodyContent += `<div><strong>Total:</strong> $${getTotal().toFixed(2)}</div>`;
    
    return bodyContent;
  }

  function getReceipt() {
    return "This is the receipt";
  }

  function resetCart() {
    items.value = [];
    currentId.value = 0;
    localStorage.removeItem('cartItems');
  }

  const allItems = computed(() => items.value);
  
  watch(items, (newItems) => {
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  }, { deep: true });

  return { items, addItem, deleteItem, getItemCount, getTotal, getCartDetails, getReceipt, resetCart, allItems };

});
