<template>

  <!-- Dark overlay -->
  <div v-if="showDropdown" class="overlay" @click="hideDropdown"></div>

  <nav class="navbar">
    <img :src="logo" alt="Logo" class="logo" />
    <div class="right-section">
      <div class="search-bar">
        <input 
          ref="searchInput" 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search..." 
          @input="filterResults" 
          @focus="showDropdown = true" 
          @blur="hideDropdown"
          @keydown.enter="handleSearchEnter"
        />
        <ul v-if="showDropdown" class="dropdown" @mousedown.prevent>
          <li 
            v-for="(result, index) in filteredResults" 
            :key="index" 
            class="result" 
            @click="handleItemClick(result.Name)"
          >
            <span>{{ result.Emoji }}</span><span class="result-text">{{ result.Name }}</span>
          </li>
        </ul>
      </div>
      <div class="tabs">
        <ul>
          <li class="tab"><router-link to="/">Home</router-link></li>
          <li class="tab"><router-link to="/Order">Order</router-link></li>
          <li class="tab">
            <router-link to="/Cart">
              Cart
              <span v-if="cart.getItemCount() > 0" class="cart-badge">{{ cart.getItemCount() }}</span>
            </router-link>
          </li>
          <li class="tab"><router-link to="/About">About</router-link></li>
          <li class="tab"><router-link to="/ContactUs">Contact Us</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import logo from "../assets/logo.png";
import MenuData from "../assets/Menu.json";
import { useRouter } from 'vue-router';
import { useCartStore } from "../stores/cart.js";

const router = useRouter();
const cart = useCartStore();

const jsonData = ref(MenuData);
const menu = jsonData.value["Menu"];
const searchQuery = ref('');
const showDropdown = ref(false);
const filteredResults = ref([]);
const searchInput = ref(null);

const filterResults = () => {
  if (searchQuery.value) {
    const queryWords = searchQuery.value.toLowerCase().split(' ');
    
    filteredResults.value = menu.filter(item => 
      queryWords.some(word => 
        item.Name.toLowerCase().includes(word) || 
        item.Type.toLowerCase().includes(word)
      )
    ).slice(0, 5);
  } else {
    filteredResults.value = [];
  }
};

const hideDropdown = () => {
  showDropdown.value = false;
  searchQuery.value = "";
  filteredResults.value = [];
};

const handleItemClick = (itemName) => {
  const selectedItem = menu.find(item => item.Name === itemName);

  if (selectedItem && selectedItem.Route) {
    router.push(selectedItem.Route);
  }
  
  hideDropdown();
  searchInput.value.blur();
};

const handleSearchEnter = () => {
  router.push({ name: 'SearchResults', params: { SearchQuery: searchQuery.value.trim() } });
  hideDropdown();
  searchInput.value.blur();
};

const closeSearchBar = () => {
  searchInput.value.blur();
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeSearchBar();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>


<style scoped>

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 40px; /* Increase the first padding value to increase navbars vertical size */
  background-color: #620086;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.logo {
  height: 60px;
}

.menu ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-right: 30px;
  cursor: pointer;
}

.right-section {
  display: flex;
  align-items: center;
}

.search-bar {
  position: relative;
}

.search-bar input {
  width: 170px;
  padding: 10px; 
  border-radius: 5px;
  border: 1px solid black;
  margin-right: 30px;
}

.search-bar input:focus {
  width: 300px;
  transition: width 0.3s ease-in-out; /* Move back into .search-bar input to add transition on close */
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1001;
  width: 300px;
}

.result {
  padding: 10px;
  cursor: pointer;
  background: lightskyblue;
  color: black;
  border-bottom: 1px solid #3C3B3B;
}

.result:last-child {
  border-bottom: none;
}

.result:hover {
  background-color: #FFFFA6;
}

.result span.result-text {
  margin-left: 8px;
}

.tabs {
  margin-right: -15px; /* Decrease this value to move the tabs further to the right */
}

.tabs ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tab {
  margin-right: 30px;
  font-size: 22px;
  cursor: pointer;
  position: relative;
}

.tab a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.tab a:hover {
  color: #FFFF7A;
}

.tab a:active {
  text-decoration: underline;
}

.cart-badge {
  position: absolute;
  top: -7px;
  right: -15px;
  background-color: #E50000;
  color: white;
  border-radius: 50%;
  padding: 3px 6px; /* Vertical horizontal */
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
}

.cart-badge.hidden {
  display: none;
}

</style>
