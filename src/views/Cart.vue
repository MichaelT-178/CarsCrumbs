<template>
  <div class="page">
    <div class="page-container">
      <div v-if="cart.getItemCount() === 0" class="empty-cart">
        <Header titleText="Empty Cart" />
        <img class="logo" :src="CrumbsLogo" alt="logo" />
        <p class="empty-message">Your Cart Is Empty</p>
        <router-link to="/order" class="order-button">Order Now</router-link>
      </div>

      <div class="cart-page" v-else>
        <div class="cart-container">
          <div class="cart-header">
            <div>
              <h1 class="cart-title">Cart</h1>
              <p class="cart-summary">
                <span class="cart-summary-total">
                  {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.getTotal()) }} total
                </span> •
                <span class="cart-summary-items">{{ cart.getItemCount() }} item{{ cart.getItemCount() > 1 ? "s" : "" }}</span>
              </p>
              <div class="cart-header-underline"></div>
            </div>
          </div>
          
          <div :class="{'item-list': !isMobileScreen, 'item-list-mobile-screen': isMobileScreen}">
            <CartCard
              v-for="(item, index) in cart.getItems()"
              :key="index"
              :item="item"
            />
          </div>
        </div>

        <!-- Order Summary for mobile screens  -->
        <div v-if="!isMobileScreen" class="order-summary">
          <h2>Order Summary</h2>
          <p class="summary-total">
            Total: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.getTotal()) }}
          </p>
          <p class="summary-items">Items: {{ cart.getItemCount() }}</p>
          <router-link to="/cart/checkout" class="checkout-button">Checkout</router-link>
          <p class="reset-cart" @click="deleteCart">Reset Cart</p>
          <p class="insta-message">
            Dm <a href="https://ig.me/m/cars.crumbs" class="insta-link" target="_blank">@cars.crumbs</a> on Instagram to discuss alternative payment methods.
          </p>
        </div>

        <div v-if="isMobileScreen" class="order-summary-mobile-screen">
          <p class="summary-text">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.getTotal()) }} total • {{ cart.getItemCount() }} item{{ cart.getItemCount() > 1 ? "s" : "" }}</p>
          <router-link to="/cart/checkout" class="checkout-button-mobile-screen">Checkout</router-link>
        </div>
      </div>
    </div>

    <div class="bottom-section" v-if="cart.getItemCount() !== 0 && !isMobileScreen">
      <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CartCard from "../components/CartCard.vue";
import Header from "../components/Header.vue";
import CrumbsLogo from "../assets/logos/yellow-square-logo.png";
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

const isMobileScreen = ref(window.innerWidth < 825);

const onResize = () => {
  isMobileScreen.value = window.innerWidth < 825;
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

</script>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 85px);
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 22px;
  box-sizing: border-box;
}

.empty-cart {
  text-align: center;
  /* margin-top: 50px; */
  flex: 1; 
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

.order-summary-mobile-screen {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 12px 20px 20px; /* top side bottom */
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  border-radius: 5px 5px 0 0;
  text-align: center;
}

.order-summary-mobile-screen .summary-text {
  font-size: 18px;
  font-weight: 650;
  margin-bottom: 10px;
  color: #353535;
}

.checkout-button-mobile-screen {
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 18px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.checkout-button-mobile-screen:hover {
  background-color: #218838;
}

.checkout-button-mobile-screen:active {
  background-color: #1e7e34;
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
  flex: 1;
  flex-direction: row;
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

.order-summary-full-width {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.item-list-mobile-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: black;
  font-family: "Helvetica";
  margin-bottom: 5px;
  margin-top: 2px;
}

.cart-header-underline {
  width: 98%;
  height: 1.5px;
  /* background-color: purple; */
  background-color: red;
  margin-top: 5px;
  margin-bottom: 20px;
}

.order-summary h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.summary-total, 
.summary-items {
  font-size: 18px;
  margin-bottom: 10px;
  font-family: "Helvetica";
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
  color: black;
  font-size: 18px;
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

.bottom-section {
  background-color: #F3E7A4;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.bottom-section p {
  font-size: 17px;
}

@media (max-width: 825px) {
  .cart-page {
    flex-direction: column;
  }

  .order-summary {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    margin: 0;
  }

  .cart-container {
    width: 100%;
    margin-bottom: 125px;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cart-header {
    width: 90%;
    margin: 0 auto;
  }

}

@media (max-width: 600px) {
  .empty-cart .logo {
    width: 300px;
  }
}

</style>
