<template>
  <!-- Pink line with "cool" text -->
  <div class="top-line">
    <span class="cool-text">cool</span>
  </div>

  <!-- Dark overlay -->
  <div v-if="showDropdown" class="overlay" @click="hideDropdown"></div>

  <nav class="navbar">
    <img :src="logo" alt="Logo" class="logo" />
    <div class="right-section">
      <!-- <div class="search-bar">
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
      </div> -->
      <div class="tabs">
        <ul>
          <li class="tab">
            <router-link to="/" class="tab-link">
              <p>Home</p>
            </router-link>
          </li>
          <li class="tab">
            <router-link to="/Order" class="tab-link">
              <p>Order</p>
            </router-link>
          </li>
          <!-- <li class="tab">
            <router-link to="/Cart" class="tab-link">
              <p>Cart</p>
              <span v-if="cart.getItemCount() > 0" class="cart-badge">{{ cart.getItemCount() }}</span>
            </router-link>
          </li> -->
          <li class="tab">
            <router-link to="/About" class="tab-link">
              <p>About</p>
            </router-link>
          </li>
          <li class="tab">
            <router-link to="/ContactUs" class="tab-link">
              <p>Contact Us</p>
            </router-link>
          </li>


          <router-link to="/Cart">
            <span class="material-symbols-outlined cart-icon" style="color: white">shopping_cart</span>
            <span v-if="cart.getItemCount() > 0" class="cart-badge">{{ cart.getItemCount() }}</span>
          </router-link>



        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import logo from "../assets/logo.png";
import MenuData from "../assets/menu_items/Menu.json";
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
  router.push({ name: 'SearchResults', query: { search_query: searchQuery.value.trim() }});
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

.top-line {
  width: 100%;
  height: 40px;
  background-color: #3E0054;
  position: fixed;
  top: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align text to the right */
  padding: 0 20px; /* Add some padding to the right */
  box-sizing: border-box;
}

.cool-text {
  font-size: 16px;
  color: white;
  text-transform: uppercase;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px; /* Increase first increases vertical, increase second increases closeness */
  /* background-color: #620086; */
  background-color: #620086;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 35px;
  z-index: 1001;
  height: 80px;
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
  height: 70px;
}

.menu ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-right: 40px;
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
  width: 180px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid black;
  margin-right: 15px;
}

.search-bar input:focus {
  width: 290px;
  transition: width 0.3s ease-in-out;
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
  width: 290px;
}

.result {
  padding: 11px;
  cursor: pointer;
  background: lightskyblue;
  color: black;
  border-bottom: 1px solid #3C3B3B;
  font-size: 17.5px;
}

.result:last-child {
  border-bottom: none;
}

.result:hover {
  background-color: #FFFFA6;
}

.result span.result-text {
  margin-left: 10px;
}

.tabs {
  margin-right: 0px;
}

.tabs ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tab {
  font-size: 24px;
  cursor: pointer;
  position: relative;
}

.tab-link {
  height: 80px;
  padding: 0 12px; 
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  letter-spacing: 0px;
  font-weight: 700;
  text-transform: uppercase;
}

/* .tab-link:hover {
  background-color: lightskyblue;
} */

/* .tab a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.tab a:hover {
  color: #FFFF7A;
  text-decoration: underline;
} */

/* .tab a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.tab a:hover {
  color: #FFFF7A;
  text-decoration: underline;
  text-decoration-color: #FFFF7A;
} */

.tab a {
  color: #fff;
  text-decoration: none; /* No default underline */
  position: relative; /* Required for the pseudo-element */
}

.tab a::after {
  content: '';
  position: absolute;
  bottom: 0; /* Place the underline at the bottom */
  left: 0;
  width: 0; /* Initially no width */
  height: 2.5px; /* Thickness of the underline */
  background-color: #FFFF7A; /* Color of the underline */
  transition: width 0.25s ease; /* Smooth transition for width */
}

.tab a:hover::after {
  width: 100%; /* Expand to full width on hover */
}

.cart-icon {
  font-size: 28px; /* Increase the size of the cart icon */
  position: relative; /* Ensure the badge is positioned relative to the icon */
  top: 25px;
  margin-left: 8px; /* Add some space between the icon and adjacent elements */
}

.cart-badge {
  position: absolute;
  top: 10px; /* Adjust to position the badge at the top-right */
  right: 20px; /* Adjust for better alignment */
  background-color: #E50000;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  font-size: 14px;
  min-width: 22px; 
  height: 22px;
  font-weight: bold; /* Make the text bold for better readability */
}

.cart-badge.hidden {
  display: none;
}

</style>
