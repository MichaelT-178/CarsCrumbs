<template>
  <div 
    class="rectangle-background" 
    :class="{ 'is-visible': visible }"
  >
    <div v-if="!isLoggedIn">
      <p class="not-signed-in-text">Not logged in</p>
      <div class="profile-btn" @click="goToView('/sign-in')">
        <p>SIGN IN</p>
      </div>
    </div>
    <div v-else> 

      <div class="account-section">
        <span class="material-symbols-outlined account-circle-icon">account_circle</span>
      </div>

      <div class="name-section">
        <p>Hi, {{ authStore.getFirstName() }}</p>
      </div>

      <div class="info-section">
        <div 
          class="info-item" 
          @click="goToView('/account?tab=favorites')"
        >
          <span class="material-symbols-outlined favorite-icon">favorite</span>
          <p>Favorites</p>
        </div>

        <div class="divider"></div>


        <div 
          class="info-item" 
          @click="goToView('/account?tab=orderHistory')"
        >
          <span class="material-symbols-outlined order-history-icon">receipt_long</span>
          <p>Order History</p>
        </div>

        <div class="divider"></div>
        
        <div 
          class="info-item" 
          @click="goToView('/account?tab=reviews')"
        >
          <span class="material-symbols-outlined review-icon">reviews</span>
          <p>Reviews</p>
        </div>
        
        <div class="divider"></div>
      </div>


      <div class="button-container">
        <div class="profile-btn view-account-btn" @click="goToView('account?tab=accountSettings')">
          <p>VIEW ACCOUNT</p>
        </div>
        <div class="profile-btn sign-out-btn" @click="signOut">
          <p>SIGN OUT</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const isLoggedIn = computed(() => authStore.getIsLoggedIn());

const goToView = (path) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  router.push(path);
  emit('close');
};

const signOut = () => {
  console.error('SIGNED OUT');
  authStore.logout();
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
  border-bottom: 10px solid white;
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
  margin-top: 35px;
}

.profile-btn:hover {
  background-color: #0056b3;
}

.account-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.name-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.name-section p {
  color: #444;
  font-size: 20px;
  font-weight: bold;
}

.account-circle-icon {
  font-size: 70px;
  color: #444;
}

.info-section {
  width: 100%;
  margin-top: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  font-family: "Helvetica";
  font-weight: 600;
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

.view-account-btn {
  background-color: #efefef;
  margin-top: -5px;
  margin-bottom: 5px;
  color: #444;
}

.view-account-btn:hover {
  background-color: #444;
  color: white;
}

.sign-out-btn {
  background-color: #007BFF;
  margin-top: 5px;
  margin-bottom: 15px;
}

.sign-out-btn:hover {
  background-color: #444;
  color: white;
}

</style>
