<template>
  <div class="cart-item">
    <span 
      class="material-symbols-outlined trash-icon" 
      @click="deleteItem(item.id)"
    >
      delete
    </span>

    <img 
      :src="getPicture(item).value" 
      alt="Cart item picture" 
      class="item-picture"
    />
    <div class="item-details">
      <p class="item-name">{{ item.DisplayName }}</p>
      <p class="item-quantity">{{ item.Quantity }} • ${{ item.Cost }}.00</p>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const getPicture = (item) => {
  return `../../src/assets/new_images/${item.Images[0]}`
};

const deleteItem = (itemId) => {
  cart.deleteItem(itemId);
};

</script>



<style scoped>

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  position: relative;
  background-color: cyan;
}

.trash-icon {
  position: absolute;
  right: 10px;
  font-size: 24px;
  color: #7a7a7a;
  cursor: pointer;
  transition: color 0.2s ease;
}

.trash-icon:hover {
  color: #ff0000;
}

.item-picture {
  width: 110px;
  height: 100px;
  border: 1px solid black;
  margin-left: 2px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
}

.item-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  /* margin-top: -10px; */
  margin-bottom: 5px;
}


.item-quantity {
  font-size: 16px;
  color: #686767;
}

@media (max-width: 600px) {
  .trash-icon {
    top: 10px;
  }

  .item-name {
  font-size: 17px;
}


.item-quantity {
  font-size: 13px;
}

}


</style>