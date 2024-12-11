<template>
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
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AccountSettings from './AccountSettings.vue';
import Favorites from './Favorites.vue';
import OrderHistory from './OrderHistory.vue';
import Reviews from './UserReviews.vue';
import OrderDetails from './OrderDetails.vue';

const route = useRoute();
const router = useRouter();

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

.content {
  flex: 1;
	margin-top: 40px;
	border-left: 0.5px solid gray;
  padding-left: 20px;
	height: 100vh;
}

</style>
