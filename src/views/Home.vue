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
  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>


<script setup>
import HomeCookies from "../assets/HomeCookies.png";

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
  top: 14px; /* Increase to move down */
}

.top-hr {
  border: none;
  border-top: 1px solid white;
  width: 70%;
  margin: 10px auto 20px; /* Decrease 2nd number to move down */
}

.bottom-hr {
  border: none;
  border-top: 1px solid white;
  width: 30%;
  margin: 25px auto; /* Increase number to move down */
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

@media (max-width: 1000px) {
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
    margin: 15px auto; /* Increase number to move down */
  }
}

</style>
