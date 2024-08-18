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

  // Returns a string that will be used in email
  function getCartDetails() {
    let bodyContent = `<h1>Order Summary</h1><ul>`;
    
    items.value.forEach(item => {
      bodyContent += `
        <li>
          <strong>Product:</strong> ${item.name}<br />
          <strong>Price:</strong> $${item.Price.toFixed(2)}<br />
          <strong>Quantity:</strong> ${item.quantity || 1}<br />
        </li>`;
    });
  
    bodyContent += `</ul>`;
    bodyContent += `<p><strong>Total:</strong> $${getTotal().toFixed(2)}</p>`;
    
    return bodyContent;
  }
  

  const allItems = computed(() => items.value);
  
  return { items, addItem, deleteItem, getItemCount, getTotal, getCartDetails, allItems };

});