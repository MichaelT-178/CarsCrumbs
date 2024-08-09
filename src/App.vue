<template>
  <div id="app">
    <NavBar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>


<script setup>
import NavBar from "./components/NavBar.vue";
</script>


<style scoped>
.content {
  padding-top: 60px;
}
</style>
  