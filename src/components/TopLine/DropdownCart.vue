<template>
  <div 
    class="rectangle-background" 
    :class="{ 'is-visible': visible }"
  >

    <div v-if="cart.getItemCount() === 0">
      <p class="empty-cart-text">No items in the cart</p>
      <div class="menu-btn" @click="goToOrderView">
        <p>GO TO MENU</p>
      </div>
    </div>
    
    <div v-else> 
      <p class="cart-info-header">{{ cart.getItemCount() }} {{ pluralize("item", cart.getItemCount()) }} in the cart</p>
      <div class="cart-info-divider"></div>

      <!-- Cart-item card -->
      <div 
        v-for="item in cart.getItems()" 
        :key="item.id" 
        class="cart-item"
      >
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
          <p class="item-quantity">{{ item.Quantity }} • ${{ (parseFloat(item.Cost) || 0).toFixed(2) }}</p>
        </div>
      </div>
      <!-- END: Cart-item card -->
      <div class="cart-info-divider-two"></div>

      <div class="button-container">
        <div class="menu-btn cart-btn" @click="goToCartView">
          <p>GO TO CART</p>
        </div>
        <div class="menu-btn checkout-btn" @click="goToCheckoutView">
          <p>CHECKOUT</p>
        </div>
      </div>
    </div>

  </div>  
</template>


<script setup>
import { computed } from 'vue';
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';
import { pluralize } from '../../utils/helper';

const cart = useCartStore();
const router = useRouter();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const goToOrderView = () => {
  router.push('/order');
  emit('close');
};

const goToCartView = () => {
  router.push('/cart');
  emit('close');
};

const goToCheckoutView = () => {
  router.push('/cart/checkout');
  emit('close');
};

const getPicture = (item) => {
  return computed(() => `../../../src/assets/new_images/${item.Images[0]}`);
};

const deleteItem = (itemId) => {
  cart.deleteItem(itemId);
};

</script>


<style scoped>
.rectangle-background {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  min-height: 100px;
  background-color: white;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  opacity: 0;
  margin-right: 2px;
}

.rectangle-background.is-visible {
  visibility: visible;
  opacity: 1;
}

.rectangle-background::after {
  content: '';
  position: absolute;
  top: -9px;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid white;
}

.empty-cart-text {
  position: absolute;
  top: 10px;
  width: 100%;
  margin-left: -10px;
  text-align: center;
  color: black;
  font-size: 19px;
  color: #212121;
  font-weight: 550;
  font-family: 'Josefin Sans';
  margin-top: 6px;
}

.menu-btn {
  width: 225px;
  height: 40px;
  background-color: #007BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  color: #F2F2F2;
  font-size: 16px;
  font-weight: bold;
  font-family: Josefin Sans;
  text-transform: uppercase;
  margin-top: 35px;
}

.menu-btn:hover {
  background-color: #0056b3;
}

.cart-info-header {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #383737;
  padding: 10px 0;
  font-family: 'Josefin Sans';
  margin-left: 5px;
}

.cart-info-divider {
  width: 250px;
  height: 1px;
  background-color: #959595;
  margin-top: 40px;
}

.cart-info-divider-two {
  width: 250px;
  height: 1px;
  background-color: #959595;
  margin-top: -5px;
  margin-bottom: 5px;
}

.cart-items {
  margin-top: 11px;
}

.item-picture {
  width: 110px;
  height: 100px;
  border: 1px solid black;
  margin-left: 2px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  position: relative;
  border-bottom: 1.5px dashed #ddd;
}

.rectangle-background .cart-item:nth-last-child(3) {
  border-bottom: none;
}

.item-picture {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  /* margin-top: -10px; */
  margin-bottom: 5px;
}

.item-quantity {
  font-size: 14px;
  color: #686767;
}

.trash-icon {
  position: absolute;
  top: 4px;
  right: 5px;
  font-size: 19px;
  color: #7a7a7a;
  cursor: pointer;
  transition: color 0.2s ease;
}

.trash-icon:hover {
  color: #ff0000;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cart-btn {
  background-color: #efefef;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #444;
}

.cart-btn:hover {
  background-color: #444;
  color: white;
}

.checkout-btn {
  background-color: #007BFF;
  margin-top: 5px;
  margin-bottom: 15px;
}

.checkout-btn:hover {
  background-color: #444;
  color: white;
}

</style>
