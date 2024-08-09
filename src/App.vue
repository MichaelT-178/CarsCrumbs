<template>
  <div id="app">
    <component :is="isMobile ? MobileNavBar : NavBar" />
    <main :class="mainClass">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavBar from "./components/NavBar.vue";
import MobileNavBar from "./components/MobileNavBar.vue";

const isMobile = ref(window.innerWidth <= 940);

const updateWindowSize = () => {
  isMobile.value = window.innerWidth <= 940;
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


<style scoped>
.mobile-content {
  padding-top: 75px;
}

.desktop-content {
  padding-top: 60px;
}
</style>
