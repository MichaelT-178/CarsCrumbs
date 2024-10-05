<template>
  <div class="image-container">
    <img :src="HomeCookies" class="tray-cookies" />
    <div class="dark-overlay"></div>
    <div class="text-overlay">
      <div class="rectangle"></div> <!-- The yellow rectangle -->
      <hr class="top-hr" />
      <p>We are a local bakery in Raleigh, NC specializing in pastries, cakes, and cookies.</p>
      <hr class="bottom-hr" />
    </div>
  </div>

  <!-- Displaying menu items -->
  <div class="menu-items">
    <HomeMenuItem 
      v-for="(menuItem, index) in menu" 
      :key="index" 
      :item="menuItem" 
    />
  </div>

  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeCookies from "../assets/HomeCookies.png";
import MenuData from "../assets/menu_items/HomePage.json";
import HomeMenuItem from "../components/HomeMenuItem.vue";

const jsonData = ref(MenuData);
const menu = jsonData.value["Items"];

</script>

<style scoped>
/* Styles for Home component */
.image-container {
  margin-top: -11px;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.tray-cookies {
  width: 100%;
  height: auto;
  display: block;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
  pointer-events: none;
}

.text-overlay {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  font-size: 2.4rem;
  font-weight: bold;
  font-family: "Noto Serif", Georgia, serif;
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
}

.rectangle {
  width: 140px;
  height: 7px;
  background-color: #FFFC7C;
  margin: 0 auto;
  position: relative;
  top: 14px;
}

.top-hr {
  border: none;
  border-top: 1px solid white;
  width: 70%;
  margin: 10px auto 20px;
}

.bottom-hr {
  border: none;
  border-top: 1px solid white;
  width: 30%;
  margin: 25px auto;
}

/* Styles for HomeMenuItem */
.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0; /* No gap between items */
  justify-content: space-between; /* Distribute space between items */
  margin: 0;
  padding: 0;
}

.menu-items > * {
  flex: 1 1 50%; /* Each item takes up 50% width */
  box-sizing: border-box;
  margin: 0;
}

.home-menu-item {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.home-menu-item img {
  width: 100%;
  height: auto;
  display: block;
}

.home-menu-item .item-details {
  padding: 10px;
}

.home-menu-item h3 {
  margin: 10px 0;
  font-size: 1.6rem;
  text-align: center;
}

.home-menu-item p {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
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

/* Responsive Adjustments */
@media (max-width: 1000px) {
  .menu-items > * {
    flex: 1 1 100%; /* Each item takes up full width on smaller screens */
  }

  .text-overlay {
    font-size: 2rem;
    width: 70%;
    bottom: -1%;
  }
}

@media (max-width: 750px) {
  .text-overlay {
    font-size: 1.8rem;
    width: 80%;
    bottom: -1%;
  }

  .tray-cookies {
    height: 250px;
  }
}

@media (max-width: 600px) {
  .text-overlay {
    width: 90%;
  }
}

@media (max-width: 400px) {
  .text-overlay {
    font-size: 1.4rem;
    bottom: -5%;
    width: 80%;
  }

  .tray-cookies {
    height: 220px;
  }

  .bottom-hr {
    margin: 15px auto;
  }
}

</style>
