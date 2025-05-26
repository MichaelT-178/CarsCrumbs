<template>
  <div class="image-container">
    <img :src="HomeCookies" class="tray-cookies" />
    <div class="dark-overlay"></div>
    <div class="text-overlay">
      <div class="rectangle"></div>
      <hr class="top-hr" />
      <p>We are a local bakery in Raleigh, NC specializing in pastries, cakes, and cookies.</p>
      <hr class="bottom-hr" />
      <router-link to="/order" class="order-button">Order Now</router-link>
    </div>
  </div>

  <div class="items-section">
    <h1 class="our-products-text">Our Products</h1>
    <div class="product-grid">
      <div
        class="product-card"
        v-for="(menuItem, index) in menu"
        :key="index"
      >
        <div class="card-content">
          <img
            :src="menuItem.imageUrl"
            :alt="menuItem.Name"
            class="product-image"
          />
          <div class="product-info">
            <h2 class="product-name">{{ menuItem.Name }}</h2>
            <p class="product-description">{{ menuItem.Description }}</p>
            <router-link :to="menuItem.Link" class="product-link">See More</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="baking-supplies-container">
    <img :src="BakingSupplies" alt="Baking Supplies" class="baking-supplies" />
    <div class="dark-overlay"></div>
    <div class="baking-supplies-overlay">
      <h2 class="follow-us-text">Follow Us</h2>
      <div class="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
          <img src="/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="/tiktok.svg" alt="Tiktok" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.svg" alt="Linkedin" />
        </a>
      </div>
    </div>
  </div>

  <div class="order-section">
    <h1>Order</h1>
    <p>Please head to our Instagram, @cars.crumbs, and follow us to stay up-to-date on our available products. You can venmo to pay and DM us to hold your order for you. Pick-up times are from 9am-1pm on Saturday and Sunday. Custom cake orders will have different scheduling options.</p>
    <div class="instagram-center">
      <a href="https://www.instagram.com/cars.crumbs/" target="_blank" class="social-button instagram">
        <img src="/instagram.svg" class="social-icon" />
      </a>
    </div>
    <img :src="CinnamonRoll" alt="Cinnamon Roll" class="cinnamon-roll-image" />
  </div>

  <CrumbsFooter></CrumbsFooter>
</template>


<script setup>
import { ref, onMounted } from "vue";
import MenuData from "../assets/home/HomePage.json";
import HomeCookies from "../assets/home/HomeCookies.png";
import CrumbsFooter from "../components/Footer.vue";
import BakingSupplies from "../assets/home/BakingSupplies.jpg";
import CinnamonRoll from "../assets/home/CinnamonRoll.jpg";

const jsonData = ref(MenuData);

const menu = jsonData.value["Items"].map((item) => {
  return {
    ...item,
    imageUrl: new URL(`../assets/new_images/${item.Picture}`, import.meta.url).href,
  };
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "auto" });
});

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

.follow-us-text {
  margin-left: 10px;
}

.rectangle {
  width: 140px;
  height: 7px;
  background-color: #fffc7c;
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

.items-section {
  text-align: center;
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.card-content {
  display: flex;
  align-items: center;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.product-info {
  flex: 1;
  text-align: left;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 17px;
  color: #6a6a6a;
  margin-bottom: 1rem;
}

.product-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #2525bd;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 4px;
}

.product-link:hover {
  background-color: blue;
}

.baking-supplies-container {
  position: relative;
  text-align: center;
  overflow: hidden;
  margin: 2rem 0;
  height: 270px;
}

.baking-supplies {
  width: 100%;
  height: 270px;
  object-fit: cover;
}

.baking-supplies-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.baking-supplies-overlay h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.social-icons img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
}

.social-icons a:hover img {
  filter: brightness(0.8);
  transform: scale(1.1);
}

.order-section {
  text-align: center;
  padding: 20px;
  /* background-color: #f9f9f9; */
  margin-top: -5px;
  /* border-top: 1px solid #ddd; */
}

.order-section h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.order-section p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #6a6a6a;
  max-width: 900px;
  text-align: center;
  margin: 0 auto;
}

.instagram-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.instagram-text {
  font-size: 1.25rem;
  margin-top: 0.5rem;
  color: #6a6a6a;
}

.social-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: filter 0.175s ease;
}

.social-button.instagram {
  background-color: #F00075;
}

.social-icon {
  width: 45px;
  height: 45px;
}

.cinnamon-roll-image {
  width: 400px;
  height: auto;
  margin-top: 1.5rem;
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

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
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
  .our-products-text {
    font-size: 25px;
    margin-bottom: -18px;
  }

  .image-container {
    height: 300px;
  }

  .cinnamon-roll-image {
    width: 300px;
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
