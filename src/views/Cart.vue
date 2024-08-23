<template>
  <div v-if="cart.getItemCount() === 0" class="empty-cart">
    <Header titleText="Empty Cart" />
    <img class="logo" :src="CrumbsLogo" alt="logo" />
    <p class="empty-message">Your Cart Is Empty</p>
    <router-link
      to="/Order"
      class="order-button"
    >
      Order Now
    </router-link>
  </div>
  <div class="cart-page" v-else>
    <div class="cart-container">
      <div class="cart-header">
        <h1 class="cart-title">Cart</h1>
        <p class="cart-summary">
          <span class="cart-summary-total">${{ cart.getTotal() }}.00 total</span> • 
          <span class="cart-summary-items">{{ cart.getItemCount() }} items</span>
        </p>
        <div class="cart-header-underline"></div>
      </div>

      <div class="item-list">
        <ItemCard
          v-for="(item, index) in cart.items"
          :key="index"
          :item="item"
        />
      </div>
    </div>

    <div class="order-summary">
      <h2>Order Summary</h2>
      <p>Total: ${{ cart.getTotal() }}.00</p>
      <p>Items: {{ cart.getItemCount() }}</p>
      <router-link
        to="/Cart/Checkout"
        class="checkout-button"
      >
        Checkout
      </router-link>
      <p class="reset-cart" @click="deleteCart">Reset Cart</p>
      <p class="insta-message">
        Dm <a href="https://target.com" class="insta-link" target="_blank">@crumbs</a> on Instagram to discuss alternative payment methods.
      </p>
    </div>
  </div>
</template>


<script setup>
import ItemCard from "../components/ItemCard.vue";
import Header from "../components/Header.vue";
import CrumbsLogo from "../assets/logoTwoYellow.png";
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

</script>


<style scoped>

.empty-cart {
  text-align: center;
  padding: 50px;
  margin-top: -50px;
}

.empty-cart .logo {
  width: 450px;
  height: auto;
  border: 1px solid black;
  border-radius: 20px;
  margin-bottom: 20px;
}

.empty-cart .empty-message {
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
  font-family: Georgia, serif;
}

.order-button {
  display: inline-block;
  padding: 10px 20px;
  width: 275px;
  background-color: #005B5B;
  color: white;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 50px;
  font-size: 22px;
  transition: background-color 0.3s ease;
}

.order-button:hover {
  background-color: #004949;
}

.order-button:active {
  background-color: #00D5D5;
}

.checkout-button {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 18px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-top: 20px;
}

.checkout-button:hover {
  background-color: #218838;
}

.checkout-button:active {
  background-color: #1e7e34;
}

.cart-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.cart-container {
  flex: 0 0 70%; /* 70% for the cart */
}

.order-summary {
  width: 320px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  word-wrap: break-word;
  border: 1.5px solid #3D3D3D;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.cart-header {
  margin-bottom: 10px;
}

.cart-title {
  font-size: 36px;
  font-weight: bold;
}

.cart-summary {
  font-size: 18px;
  color: gray;
}

.cart-header-underline {
  width: 100%;
  height: 2px;
  background-color: gray;
  margin-top: 5px;
  margin-bottom: 20px;
}

.order-summary h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-summary p {
  font-size: 18px;
  margin-bottom: 10px;
}

.reset-cart {
  margin-top: -2px;
  color: red;
  cursor: pointer;
  font-size: 18px;
  padding: 12px;
  display: block;
  text-align: center;
}

.reset-cart:hover {
  color: #D10606;
  text-decoration: underline;
}

.reset-cart:active {
  color: darkred;
  text-decoration: none;
}

.insta-message {
  margin-top: -10px;
  color: black;
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

</style>
