<template>
  <div id="app">
    <div v-if="!authStore.isSpecialNavBar">
    <component :is="isMobile ? MobileNavBar : NavBar" key="nav" />
    </div>
    <div v-else>
      <span class="alternative-purple-header">
        <img :src="PurpleLogo" alt="alternative crumbs logo" class="alternative-crumbs-logo"/>
      </span>
    </div>
    <main :class="mainClass">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavBar from "./components/NavBar.vue";
import MobileNavBar from "./components/MobileNavBar.vue";
import { useAuthStore } from './stores/auth';
import PurpleLogo from './assets/logos/purple-logo.png';

const isMobile = ref(window.innerWidth <= 800);

const authStore = useAuthStore();

const updateWindowSize = () => {
  isMobile.value = window.innerWidth <= 800;
};

onMounted(() => {
  authStore.setSpecialNavBar(false);
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

.alternative-purple-header {
  background-color: #620086;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alternative-crumbs-logo {
  height: 70px;
  width: auto;
  /* border: 1px solid white; */
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.mobile-content {
  padding-top: 112px;
}

.desktop-content {
  padding-top: 120px;
}

</style>
