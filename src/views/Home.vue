<template>
  <div class="image-container">
    <img :src="HomeCookies" class="tray-cookies" />
    <div class="text-overlay">
      <hr />
      <p>We are a local bakery in Raleigh, NC specializing in pastries, cakes, and cookies.</p>
      <hr />
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
.tray-cookies {
  margin-top: -11px;
  height: 10%;
  width: 100%;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.text-overlay {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  font-size: 2.2rem;
  font-weight: bold;
	font-family: "Noto Serif", Georgia, serif;
  padding: 10px;
  border-radius: 5px;
}

.text-overlay hr {
  border: none;
  border-top: 2px solid white;
  margin: 5px 0;
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

</style>
