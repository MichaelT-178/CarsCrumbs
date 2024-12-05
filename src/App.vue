<template>
  <div id="app">
    <component :is="isMobile ? MobileNavBar : NavBar" key="nav" />
    <main :class="mainClass">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavBar from "./components/NavBar.vue";
import MobileNavBar from "./components/MobileNavBar.vue";

const isMobile = ref(window.innerWidth <= 800);

const updateWindowSize = () => {
  isMobile.value = window.innerWidth <= 800;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});

const mainClass = computed(() => {
  return isMobile.value ? 'mobile-content' : 'desktop-content';
});

</script>


<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {
  background-color: #F2F2F2;
  /* background-color: #00b3ad; */
}
 
.mobile-content {
  padding-top: 112px;
}

.desktop-content {
  padding-top: 120px;
}

</style>
