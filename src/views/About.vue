<template>
  <div class="page">
    <Header titleText="About" />

    <div class="page-container">
      <div class="content-wrapper">
        <p class="about-text">
          My name is Carleigh, I am a junior at NC State University majoring in psychology. 
          I started this business because I am passionate about baking. I grew up baking with 
          my mom and my sister in Charlotte, NC and created Car’s Crumbs to turn my dream of 
          starting a bakery into a reality. My favorite things to bake are cookies, breads, and brownies.
        </p>

        <div class="image-container">
          <img :src="Carly1" alt="New Hampshire Cookies" @click="() => openImageView(0)" />
          <img :src="Carly2" alt="Carly2" @click="() => openImageView(1)" />
          <img :src="Carly3" alt="NH Cookies 2" @click="() => openImageView(2)" />
        </div>
      </div>

      <transition name="fade">
        <ImageView
          v-if="isImageViewOpen"
          :images="[Carly1, Carly2, Carly3]"
          :captions="['New Hampshire Cookies', 'Carleigh Making Bread', 'Baking New Hampshire Cookies']"
          :initialImage="currentImage"
          :isOpen="isImageViewOpen"
          @close="isImageViewOpen = false"
        />
      </transition>
    </div>

    <div class="bottom-section">
      <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import Header from "../components/Header.vue";
import ImageView from "./ImageView.vue";
import Carly1 from "../assets/other/CarlyPics/Carly1.jpg";
import Carly2 from "../assets/other/CarlyPics/Carly2.jpg";
import Carly3 from "../assets/other/CarlyPics/Carly3.jpg";

const isImageViewOpen = ref(false);
const currentImage = ref(0);

const openImageView = (imageIndex) => {
  currentImage.value = imageIndex;
  isImageViewOpen.value = true;
};

</script>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 85px);
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 22px;
  box-sizing: border-box;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 750px;
  margin: 0 auto 20px auto;
  box-sizing: border-box;
}

.about-text {
  text-align: left;
  color: black;
  font-size: 20px;
  line-height: 1.5;
  width: 100%;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding-bottom: 25px;
}

.image-container img {
  width: 100%;
  max-width: 32.25%;
  height: auto;
}

.image-container img:hover {
  cursor: pointer;
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
    width: 100%;
  }
}

@media (max-width: 452px) {
  .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .image-container img {
    max-width: 48.5%;
    flex: 0 0 48.5%;
    height: auto;
  }
}

@media (max-width: 343px) {
  .image-container img {
    max-width: 47.5%;
  }
}


</style>