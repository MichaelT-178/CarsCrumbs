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
  position: relative;
  width: 100%;
  height: 625px;
  overflow: hidden;
  display: flex;
}

.tray-cookies {
  display: block;
  border: none;
  margin: 0;
  padding: 0;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.38);
  pointer-events: none;
}

.text-overlay {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  font-size: 46px;
  font-weight: bold;
  font-family: Amatic SC;
  font-weight: 600;
  font-style: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
  width: 100%;
  max-width: 850px;
}

.order-button {
  display: inline-block;
  padding: 12px 125px;
  margin-top: 10px;
  background-color: #2525bd;
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.order-button:hover {
  background-color: blue;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
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

@media (max-width: 920px) {
  .image-container {
    height: 450px;
  }

  .text-overlay {
    font-size: 35px;
    max-width: 90%;
  }

  .order-button {
    padding: 12px 100px;
  }

  .rectangle {
    width: 100px;
  }
  
  .top-hr {
    width: 65%;
  }
  
  .bottom-hr {
    width: 35%;
  }
}

@media (max-width: 620px) {
  .image-container {
    height: 380px;
  }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .text-overlay {
    font-size: 32px;
    max-width: 95%;
    top: 80px;
  }

  .order-button {
    padding: 10px 90px;
  }

  .rectangle {
    width: 100px;
  }
}

@media (max-width: 450px) {
  .image-container {
    height: 300px;
  }

  .text-overlay {
    font-size: 26.1px;
    max-width: 100%;
    top: 10px;
  }

  .order-button {
    padding: 12px 35px;
    font-size: 20px;
    margin-top: -5px;
  }

  .rectangle {
    width: 80px;
    top: 44px;
  }
  
  .top-hr {
    width: 60%;
    margin-top: 40px;
  }
  
  .bottom-hr {
    width: 25%;
    margin-top: 15px;
  }
}

</style>
