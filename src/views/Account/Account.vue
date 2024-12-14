<template>
  <div v-if="!isMobile">
    <div class="account-dashboard">
      <aside class="sidebar">
        <ul>
          <li @click="changeTab('accountSettings')" :class="{ active: currentTab === 'accountSettings' }">Account Settings</li>
          <li @click="changeTab('favorites')" :class="{ active: currentTab === 'favorites' }">Favorites</li>
          <li @click="changeTab('orderHistory')" :class="{ active: currentTab === 'orderHistory' }">Order History</li>
          <li @click="changeTab('reviews')" :class="{ active: currentTab === 'reviews' }">Reviews</li>
        </ul>
      </aside>
      <main class="content">
        <component :is="currentView" />
      </main>
    </div>
  </div>
  <div v-else>
    <nav v-if="!isTabSelected">
      <p>My Account</p>
      <div class="nav-item">
        <router-link class="router-link" :to="{ path: '/account', query: { tab: 'accountSettings' } }">
          Account Settings
        </router-link>
        <span class="material-symbols-outlined arrow">arrow_forward_ios</span>
      </div>
      <div class="nav-item">
        <router-link class="router-link" :to="{ path: '/account', query: { tab: 'favorites' } }">
          Favorites
        </router-link>
        <span class="material-symbols-outlined arrow">arrow_forward_ios</span>
      </div>
      <div class="nav-item">
        <router-link class="router-link" :to="{ path: '/account', query: { tab: 'orderHistory' } }">
          Order History
        </router-link>
        <span class="material-symbols-outlined arrow">arrow_forward_ios</span>
      </div>
      <div class="nav-item">
        <router-link class="router-link" :to="{ path: '/account', query: { tab: 'reviews' } }">
          Reviews
        </router-link>
        <span class="material-symbols-outlined arrow">arrow_forward_ios</span>
      </div>
    </nav>
    <div>
      <component :is="currentTabComponent" />
    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AccountSettings from './AccountSettings.vue';
import Favorites from './Favorites.vue';
import OrderHistory from './OrderHistory.vue';
import Reviews from './UserReviews.vue';
import OrderDetails from './OrderDetails.vue';

const route = useRoute();
const router = useRouter();

const isMobile = ref(window.innerWidth <= 800);
const isTabSelected = computed(() => !!route.query.tab);

const currentTab = ref(route.query.tab || 'favorites');

const tabComponents = {
  accountSettings: AccountSettings,
  favorites: Favorites,
  orderHistory: OrderHistory,
  reviews: Reviews,
  orderDetails: OrderDetails,
};

const currentView = computed(() => tabComponents[currentTab.value] || Favorites);

const changeTab = (tab) => {
  if (currentTab.value !== tab) {
    currentTab.value = tab;
    router.push({ query: { ...route.query, tab } });
  }
};

watch(
  () => route.query.tab,
  (newTab) => {
    currentTab.value = newTab || 'favorites';
  }
);

const currentTabComponent = computed(() => {
  const tab = route.query.tab;

  switch (tab) {
    case 'accountSettings':
      return AccountSettings;
    case 'favorites':
      return Favorites;
    case 'orderHistory':
      return OrderHistory;
    case 'reviews':
      return Reviews;
    default:
      return null;
  }
});


const updateWindowSize = () => {
  isMobile.value = window.innerWidth <= 800;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});

</script>


<style scoped>
.account-dashboard {
  display: flex;
}

.sidebar {
  width: 240px;
  padding: 10px;
	margin-right: 50px;
	margin-top: 20px;
	margin-left: 10px;
}

.content {
  flex: 1;
	margin-top: 40px;
	border-left: 0.5px solid gray;
  padding-left: 20px;
	height: 100vh;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 18px;
  border-top: 1px solid lightgray;
  font-family: "Tahoma";
}

.nav-item .router-link {
  text-decoration: none;
  color: #1a1a1a;
  flex-grow: 1;
}

.nav-item .arrow {
  color: #1a1a1a;
  font-weight: bold;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 19px;
  color: #1a1a1a;
  font-family: "Josefin Sans", sans-serif;
}

.sidebar li:hover {
  font-weight: 600;
}

.sidebar li.active {
  background-color: lightskyblue;
  border-radius: 8px;
  font-weight: 600;
}


nav {
  font-family: "Josefin Sans", sans-serif;
  margin-top: 20px;
  padding: 10px;
}

nav p {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-top: -10px;
  font-family: "Tahoma";
  font-weight: 700;
  color: #1a1a1a;
}

nav .router-link {
  display: block;
  font-weight: 590;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #1a1a1a;
  font-family: "Tahoma";
  text-decoration: none;
  border-top: 1px solid lightgray;
}

nav .router-link:first-of-type {
  border-top: none;
}

nav .router-link:hover {
  cursor: pointer;
}

.arrow {
  font-size: 14px;
}

</style>