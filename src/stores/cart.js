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
                      // Convert storedItems array to just ids and take the max id. Then add 1. 
                      // If storedItems is empty its 0.
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
    //CSC 434 ass function ❤️🥹🫶
    items.value = items.value.filter(item => item.id !== id);
  }

  function getItems() {
    return items.value;
  }  

  function getItemCount() {
    return items.value.length;
  }
  
  function getTotal() {
    //CSC 434 function ❤️
    return items.value.reduce((total, item) => total + item.Cost, 0);
  }

  function getCartDetails(date = null) {
    //Include date for receipt
    let bodyContent = `Order Summary<br/>${date !== null ? `${date}<br/>` : ""}<br/>`;
  
    items.value.forEach(item => {
      bodyContent += `
      <div>
        <strong>Product:</strong> ${item.DisplayName}<br/>
        <strong>Quantity:</strong> ${item.Quantity }<br/>
        <strong>Price:</strong> $${item.Cost.toFixed(2)}<br/>
      </div><br/>`;
    });

    // ${item.Quantity ? `<strong>Quantity:</strong> ${item.Quantity}<br/>` : ''}
    
    bodyContent += `<div><strong>Cart:</strong> ${getItemCount()} items<br/><strong>Total:</strong> $${getTotal().toFixed(2)}</div>`;
    
    return bodyContent;
  }

  function getOrderSummary() {
    //Include date for receipt
    let bodyContent = `<br/>`;
  
    items.value.forEach(item => {
      bodyContent += `
      <div>
        <strong>Product:</strong> ${item.DisplayName}<br/>
        <strong>Quantity:</strong> ${item.Quantity }<br/>
        ${item.Quantity ? `<strong>Quantity:</strong> ${item.Quantity}<br/>` : ''}
        <strong>Price:</strong> $${item.Cost.toFixed(2)}<br/>
      </div><br/>`;
    });
    
    bodyContent += `<div><strong>Cart:</strong> ${getItemCount()} items<br/><strong>Total:</strong> $${getTotal().toFixed(2)}</div>`;
    
    return bodyContent;
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

  return { items, addItem, deleteItem, getItems, getItemCount, getTotal, getCartDetails, getOrderSummary, resetCart, allItems };

});
