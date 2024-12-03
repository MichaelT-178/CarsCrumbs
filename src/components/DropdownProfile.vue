<template>
  <div 
    class="rectangle-background" 
    :class="{ 'is-visible': visible }"
  >

    <!-- REPLACE WITH USER INFO -->
    <div v-if="true">
      <p class="not-signed-in-text">Not signed in</p>
      <div class="sign-in-btn" @click="goToOrderView">
        <p>SIGN IN</p>
      </div>


    </div>
  </div>
</template>


<script setup>

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

</script>


<style scoped>
.rectangle-background {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  min-height: 100px;
  background-color: cyan;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  opacity: 0;
  margin-right: 2px;
}

.rectangle-background.is-visible {
  visibility: visible;
  opacity: 1;
}

.rectangle-background::after {
  content: '';
  position: absolute;
  top: -9px;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid cyan;
}

.not-signed-in-text {
  position: absolute;
  top: 10px;
  width: 100%;
  margin-left: -10px;
  text-align: center;
  color: black;
  font-size: 19px;
  color: #212121;
  font-weight: 550;
  font-family: 'Josefin Sans';
  margin-top: 6px;
}

.sign-in-btn {
  width: 225px;
  height: 40px;
  background-color: #007BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  color: #F2F2F2;
  font-size: 16px;
  font-weight: bold;
  font-family: Josefin Sans;
  text-transform: uppercase;
  margin-top: 35px;
}

.sign-in-btn:hover {
  background-color: #0056b3;
}

</style>