<template>
  <div class="image-container">
    <img :src="HomeCookies" class="tray-cookies" />
    <div class="dark-overlay"></div>
    <div class="text-overlay">
      <div class="rectangle"></div>
      <hr class="top-hr" />
      <p>We are a local bakery in Raleigh, NC specializing in pastries, cakes, and cookies.</p>
      <hr class="bottom-hr" />
      <router-link to="/Order" class="order-button">Order Now</router-link>
    </div>
  </div>

  <div class="menu-items">
    <HomeMenuItem 
      v-for="(menuItem, index) in menu" 
      :key="index" 
      :item="menuItem" 
      :index="index"
    />
  </div>

  <CrumbsFooter></CrumbsFooter>
</template>


<script setup>
import { ref } from "vue";
import MenuData from "../assets/home/HomePage.json";
import HomeCookies from "../assets/home/HomeCookies.png";
import HomeMenuItem from "../components/HomeMenuItem.vue";
import CrumbsFooter from "../components/Footer.vue";

const jsonData = ref(MenuData);
const menu = jsonData.value["Items"];

</script>


<style scoped>
.image-container {
  margin-top: -11px;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.tray-cookies {
  width: 100%;
  height: 500px;
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
  /* font-family: "Noto Serif", Georgia, serif; */
  font-family: Amatic SC;
  font-weight: 700;
  font-style: normal;
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
}

.order-button {
  display: inline-block;
  padding: 12px 125px;
  margin-top: 10px;
  background-color: navy;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 5px;
}

.order-button:hover {
  background-color: blue;
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

.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

@media (max-width:  920px) {
  .image-container {
    margin-top: -6px;
  }
  
}

</style>
