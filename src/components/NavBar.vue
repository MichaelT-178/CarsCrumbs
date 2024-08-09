<template>
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
        />
        <ul v-if="showDropdown" class="dropdown" @mousedown.prevent>
          <li 
            v-for="(result, index) in filteredResults" 
            :key="index" 
            class="result" 
            @click="handleItemClick(result.Name)"
          >
            {{ result.Emoji }} {{ result.Name }}
          </li>
        </ul>
      </div>
      <div class="tabs">
        <ul>
          <li class="tab"><router-link to="/">Home</router-link></li>
          <li class="tab"><router-link to="/Order">Order</router-link></li>
          <li class="tab"><router-link to="/Cart">Cart</router-link></li>
          <li class="tab"><router-link to="/About">About</router-link></li>
          <li class="tab"><router-link to="/ContactUs">Contact Us</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from "../assets/logo.png";
import MenuData from "../assets/Menu.json";

const router = useRouter();

const jsonData = ref(MenuData);
const menu = jsonData.value["Menu"];
const searchQuery = ref('');
const showDropdown = ref(false);
const filteredResults = ref([]);
const searchInput = ref(null);

const filterResults = () => {
  if (searchQuery.value) {
    filteredResults.value = menu.filter(item => item.Name.toLowerCase().includes(searchQuery.value.toLowerCase()));
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
  router.push({ name: 'ItemView', params: { ItemName: itemName } });
  hideDropdown();
  searchInput.value.blur();
};

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
  z-index: 1000;
}

.logo {
  height: 60px; /* Increased logo height */
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
  transition: width 0.3s ease-in-out;
}

.search-bar input:focus {
  width: 300px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1001;
  width: 322px;
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

.tabs {
  margin-right: -15px; /* Adjust this value to move the tabs further to the right */
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

</style>
