<template>
  <div class="top-line">
    <div class="search-bar-container">
      <span class="material-icons search-icon">search</span>
      <input 
        type="text" 
        ref="searchInput"
        v-model="searchQuery" 
        class="top-search-bar" 
        placeholder="Search"
        @focus="showDropdown = true"
        @keydown.enter="handleSearchEnter"
      />
      <span 
        v-if="searchQuery" 
        class="material-icons close-icon" 
        @click="clearSearchField"
      >
        close
      </span>
      <span v-else class="shortcut-text"></span>

      <DropdownSearch
        :query="searchQuery"
        :show="showDropdown"
        @close="hideDropdown"
        @keydown.enter="handleSearchEnter"
      />

    </div>

    <div class="profile-section">

      <div class="profile-icons">

        <div
          class="cart-profile-group"
          @mouseover="toggleCartDropdown(true)"
          @mouseleave="toggleCartDropdown(false)"
        >

        <div class="cart-profile-inner-container">
          <span class="material-symbols-outlined profile-cart-icon">shopping_cart</span>
          <p class="profile-section-text">${{ cart.getTotal() }}.00</p>
          <span v-if="showCartHighlight" class="material-symbols-outlined profile-down-arrow-icon">
            keyboard_arrow_up
          </span>
          <span v-else class="material-symbols-outlined profile-down-arrow-icon">
            keyboard_arrow_down
          </span>
        </div>
        
        <DropdownCart 
          v-model:visible="showCartHighlight"
          @close="hideDropdown"
        />
        
      </div>

      <section 
        class="profile-person-group" 
        @mouseover="toggleProfileDropdown(true)" 
        @mouseleave="toggleProfileDropdown(false)"
      >
        <span class="material-symbols-outlined profile-person-icon">person</span>

        <DropdownProfile 
          v-model:visible="showProfileHighlight" 
          @close="hideDropdown" />
      </section>
    </div>
  </div>

  </div>

  <div 
    v-if="showDropdown || showCartOverlay || showProfileOverlay" 
    class="overlay" 
    @click="hideDropdown"
  ></div>

  <nav class="navbar">
    <img :src="logo" alt="Logo" class="logo" />
    <div class="right-section">
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
            <span class="material-symbols-outlined cart-icon">shopping_cart</span>
            <span v-if="cart.getItemCount() > 0" class="cart-badge">{{ cart.getItemCount() }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import logo from "../assets/logos/purple-logo.png";
import { useCartStore } from "../stores/cart.js";
import DropdownSearch from "./TopLine/DropdownSearch.vue";
import DropdownCart from './TopLine/DropdownCart.vue';
import DropdownProfile from './TopLine/DropdownProfile.vue';

const cart = useCartStore();

const router = useRouter();

const emit = defineEmits(['update:visible']);

const showCartOverlay = ref(false);
const showCartHighlight = ref(false);
const showProfileOverlay = ref(false);
const showProfileHighlight = ref(false);

const searchQuery = ref('');
const showDropdown = ref(false);
const filteredResults = ref([]);
const searchInput = ref(null);

const hideDropdown = () => {
  showDropdown.value = false;
  showCartOverlay.value = false;
  showCartHighlight.value = false;
  showProfileOverlay.value = false;
  showProfileHighlight.value = false;
  searchQuery.value = "";
  filteredResults.value = [];
};

const toggleCartDropdown = (state) => {
  showCartHighlight.value = state;
  // showCartOverlay.value = state; //UNCOMMENT THIS LINE TO DISPLAY OVERLAY
  emit('update:visible', state);
};

const toggleProfileDropdown = (state) => {
  showProfileHighlight.value = state;
  // showProfileOverlay.value = state; //UNCOMMENT THIS LINE TO DISPLAY OVERLAY
  emit('update:visible', state);
};

const clearSearchField = () => {
  searchQuery.value = "";
  searchInput.value.blur();
};

const keysPressed = new Set();

const handleKeydown = (event) => {
  keysPressed.add(event.code);

  if (
    (keysPressed.has('AltLeft') || keysPressed.has('AltRight') 
    || keysPressed.has('MetaLeft') || keysPressed.has('MetaRight'))
    && keysPressed.has('KeyS')
  ) {
    event.preventDefault();

    if (searchInput.value) {
      searchInput.value.focus();
    } else {
      console.error("searchInput is null");
    }
  }
};

const handleKeyup = (event) => {
  if (keysPressed.has(event.code)) {
    keysPressed.delete(event.code);
    keysPressed.clear();
  }
};

const handleSearchEnter = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'SearchResults',
      query: { search_query: searchQuery.value.trim() },
    });

    hideDropdown();
    searchInput.value.blur();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyup);
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
  justify-content: space-between;
  padding: 0 0 0 20px;
  box-sizing: border-box;
  gap: 10px;
}

.search-bar-container {
  display: flex;
  align-items: center;
  margin-left: 15px; /* Increase this number to push search-bar right */
  background-color: #3E0054;
  border-radius: 6px;
  padding: 2px 12px;
  gap: 8px;
  border: 1px solid #B0B0B0;
  width: 225px;
  position: relative;
}

.search-bar-container:focus-within {
  border: 1px solid blue;
}

.shortcut-text {
  font-size: 14px;
  color: #B0B0B0;
  margin-left: auto;
}

.close-icon {
  font-size: 18px;
  color: #B0B0B0;
  cursor: pointer;
}

.close-icon:hover {
  font-size: 18px;
  color: #B91212;
  cursor: pointer;
}

.top-search-bar::placeholder {
  color: #B0B0B0;
}

.search-icon {
  font-size: 18px;
  color: #B0B0B0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: #620086;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 40px;
  z-index: 1001;
  height: 80px;
}

.top-search-bar {
  width: 100%;
  height: 20px;
  border: none;
  background: transparent;
  color: #B0B0B0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s, width 0.3s;
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
  height: 80px;
  margin-left: 30px; /* Increase this number to push the logo right */
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

.cart-profile-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  position: relative;
  cursor: pointer;
  gap: 5px;
  /* background-color: red; */
}

.cart-profile-inner-container {
  /* background-color: magenta; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.cart-profile-inner-container:hover .profile-cart-icon,
.cart-profile-inner-container:hover .profile-section-text,
.cart-profile-inner-container:hover .profile-down-arrow-icon {
  color: #FFFF7A;
}


.profile-person-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* background-color: blue; */
  position: relative;
  flex-grow: 1;
  height: 100%;
  color: white;
  border-radius: 0 0px 0px 0;
  padding-right: 20px; /* Increase this number to push left */
}

.profile-person-group:hover {
  /* background-color: pink; */
  cursor: pointer;
}

.profile-section {
  display: flex;
  align-items: stretch;
  height: 100%;
}

.profile-section-text {
  font-size: 17px;
  color: white;
  margin: 0;
  white-space: nowrap;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 900px;
}

.profile-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-person-icon {
  font-size: 29px;
  /* color: #cfcece; */
  color: white;
  margin-left: 2px;
  margin-right: 3px;
}

.profile-person-icon:hover {
  color: #FFFF7A;
}

.profile-down-arrow-icon {
  color: white;
  font-size: 19px;
  margin-left: -4px;
}

.profile-cart-icon {
  color: white;
  font-size: 20px;
  margin-right: -0.5px;
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

.result:last-child {
  border-bottom: none;
}

.result:hover {
  background-color: #FFFFA6;
}

.tabs {
  margin-right: 30px; /* Increase this number to push to the left */
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

.tab a {
  color: #fff;
  text-decoration: none;
  position: relative;
}

.tab a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2.5px;
  background-color: #FFFF7A;
  transition: width 0.25s ease;
}

.tab a:hover::after {
  width: 100%;
}

.cart-icon {
  font-size: 28px;
  position: relative;
  top: 25px;
  margin-left: 8px;
  color: white;
}

.cart-icon:hover {
  color: #FFFF7A;
}

.cart-icon:hover::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  height: 45px;
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 50%;
  z-index: -1;
}

.cart-badge {
  position: absolute;
  top: 12.5px; /* Increase to move down */
  right: 50.5px; /* Increase to move left */
  background-color: #E50000;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  font-size: 14px;
  min-width: 20px; 
  height: 20px;
  font-weight: bold;
}

</style>
