<template>
  <div class="about-circle-wrapper">
    <img class="about-circle" :src="WordPressCircle" alt="About Circle" />
    <hr class="circle-line" />
  </div>

  <p class="title">About</p>

  <div class="content-wrapper">
    <p class="about-text">
      My name is Carleigh, I am a junior at NC State University majoring in psychology. I started this business because I am passionate about baking. I grew up baking with my mom and my sister in Charlotte, NC and created Car’s Crumbs to turn my dream of starting a bakery into a reality. My favorite things to bake are cookies, breads, and brownies.
    </p>

    <div class="image-container">
      <img :src="Carly1" alt="New Hampshire Cookies" />
      <img :src="Carly2" alt="Carly2" />
      <img :src="Carly3" alt="NH Cookies 2" />
    </div>
  </div>

  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>


<script setup>
import Carly1 from "../assets/Carly1.jpg";
import Carly2 from "../assets/Carly2.jpg";
import Carly3 from "../assets/Carly3.jpg";
import WordPressCircle from "../assets/WordPressCircle.png";

</script>


<style scoped>

.about-circle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 30%;
  min-width: 230px;
  margin: 20px auto 20px auto;
}

.about-circle {
  width: 40px;
  height: auto;
  margin-bottom: 10px; /* Padding below the About text */
	top: -100px;
	z-index: 1;
}

.circle-line {
  position: absolute;
  top: 43%;
  left: 0;
  width: 100%;
  height: 1px;
	border-width: 0px;
  /* background-color: gray; */
  background-color: white;
  z-index: 0;
}

.title {
  color: #1a1c1e;
  font-family: Georgia, serif;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin-top: 0;
  padding-bottom: 20px; /* Padding below About */
  margin-top: -15px; /* Moves the About title up  */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
	padding: 0 22px; /* 22px increase padding to the left and right of the sides */
}

.about-text {
  text-align: left;
	/* color: #6a6c6e; og color */
  color: black;
  font-size: 20px;
  line-height: 1.5;
  width: 93.75%;
  max-width: 750px;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  justify-content: flex-start;
  gap: 9px;
  width: 93.75%;
  padding-bottom: 20px; /* Add padding below the image container */
}

.image-container img {
  width: 93.75%;
  max-width: 32.25%;
  height: auto;
}

.bottom-section {
	background-color: #F3E7A4;
	text-align: center;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-section p {
	font-size: 17px;
}

@media (max-width: 600px) {
  .image-container {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .image-container img {
    max-width: 48.9%;
  }

  .image-container img:nth-child(3) {
    max-width: 100%;
		width: 121%;
  }
}

</style>
