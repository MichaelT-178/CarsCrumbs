<template>
	<Header titleText="Cart" />

  <div class="item-list">
    <ItemCard
      v-for="(item, index) in cart.items"
      :key="index"
      :item="item"
    />
  </div>

  <button
    class="checkout-button"
    @click="handleCheckout"
  >
    {{ checkoutText }}
  </button>

  <p class="clear-cart" @click="deleteCart">Reset Cart</p>
  <p>
    Dm <a href="https://target.com" class="insta-link" target="_blank">@crumbs</a> on Instagram to discuss alternative payment methods.
  </p>
</template>


<script setup>
import { computed } from 'vue';
import Header from "../components/Header.vue";
import ItemCard from "../components/ItemCard.vue";
import { useCartStore } from '../stores/cart.js';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const router = useRouter();

const deleteCart = () => {
  cart.resetCart();

  const goBackToHome = confirm('Your cart has been cleared. Do you want to go back to the home page?');

  if (goBackToHome) {
    router.push({ path: '/' });
  }
};

const checkoutText = computed(() => {
  return cart.getItemCount() === 0 ? 'Go to Menu' : 'Checkout';
});

const handleCheckout = () => {
  if (cart.getItemCount() === 0) {
    router.push({ path: '/Order' });
  } else {
    router.push({ path: '/Cart/Checkout' });
  }
};

</script>


<style scoped>


.title {
  color: red;
  font-family: Arial, sans-serif;
  font-size: 50px;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.insta-link {
  color: purple;
  text-decoration: none;
}

.insta-link:hover {
  color: #610061;
  text-decoration: underline;
}

.insta-link:active {
  color: #D400D4;
}

.checkout-button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  border: none;
  font-size: 18px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #218838;
}

.checkout-button:active {
  background-color: #1e7e34;
}

.clear-cart {
  margin-top: 15px;
  color: red;
  cursor: pointer;
  font-size: 18px;
  padding: 12px;
}

.clear-cart:hover {
  color: #D10606;
  text-decoration: underline;
}

.clear-cart:active {
  color: darkred;
  text-decoration: none;
}

</style>
