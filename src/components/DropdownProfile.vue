<template>
  <div 
    class="rectangle-background" 
    :class="{ 'is-visible': visible }"
  >
    <div v-if="true">
      <p class="not-signed-in-text">Not logged in</p>
      <div class="sign-in-btn" @click="goToOrderView">
        <p>SIGN IN</p>
      </div>
    </div>
    <div v-else> 

      <div class="account-section">
        <span class="material-symbols-outlined account-circle-icon">account_circle</span>
      </div>



      <div class="info-section">

        <div class="info-item">
          <span class="material-symbols-outlined favorite-icon">favorite</span>
          <p>Favorites</p>
        </div>

        <div class="divider"></div>

        <div class="info-item">
          <span class="material-symbols-outlined order-history-icon">receipt_long</span>
          <p>Order History</p>
        </div>
        <div class="divider"></div>
        
        <div class="info-item">
          <span class="material-symbols-outlined review-icon">reviews</span>
          <p>Reviews</p>
        </div>
        
        <div class="divider"></div>

      </div>


      <div class="button-container">
        <div class="profile-btn view-account-btn" @click="goToCartView">
          <p>VIEW ACCOUNT</p>
        </div>
        <div class="profile-btn sign-out-btn" @click="goToCheckoutView">
          <p>SIGN OUT</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const goToCartView = () => {
  console.log('Navigating to Cart and emitting close event');
  router.push('/Cart');
  emit('close');
};

const goToCheckoutView = () => {
  console.log('Navigating to Cart and emitting close event');
  router.push('/Cart/Checkout');
  emit('close');
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
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  opacity: 0;
  margin-right: 15px;
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
  border-bottom: 10px solid cyan;
}


.not-signed-in-text {
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

.sign-in-btn {
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

.sign-in-btn:hover {
  background-color: #0056b3;
}


.account-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.account-circle-icon {
  font-size: 70px;
  color: #444;
}

.info-section {
  width: 100%;
  margin-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
}

.info-item:hover {
  background-color: #e0e0e0;
}

.favorite-icon,
.order-history-icon,
.review-icon {
  font-size: 24px;
  color: #444;
  margin-right: 10px;
}

.info-item p {
  font-size: 16px;
  font-weight: 500;
  color: #212121;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: #ccc;
  width: 100%;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.profile-btn {
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
  margin-top: 5px;
  margin-bottom: 5px;
}

.profile-btn:hover {
  background-color: #0056b3;
}

.view-account-btn {
  background-color: #efefef;
  color: #444;
}

.view-account-btn:hover {
  background-color: #444;
  color: white;
}

.sign-out-btn {
  background-color: #007BFF;
  margin-bottom: 15px;
}

.sign-out-btn:hover {
  background-color: #444;
  color: white;
}

</style>
