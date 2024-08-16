<template>
  <p class="title">Menu</p>
  <div class="filter-container">
    <label for="tag-filter">Filter by:</label>
    <select id="tag-filter" v-model="selectedTag">
      <option value="No Filter">No Filter</option>
      <option value="Cookie">Cookie</option>
      <option value="Brownie">Brownie</option>
      <option value="Bread">Bread</option>
      <option value="Bagel">Bagel</option>
      <option value="Cake">Cake</option>
    </select>
  </div>
  <div class="menu-container">
    <MenuCard
      v-for="(item, key) in filteredItems"
      :key="key"
      :item="item"
      @tag-clicked="updateFilter"
    />
  </div>
  <div class="bottom-section">
    <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AllData from '../assets/MenuItems.json';
import MenuCard from '../components/MenuCard.vue';

const selectedTag = ref('No Filter');

const filteredItems = computed(() => {
  if (selectedTag.value === 'No Filter') {
    return AllData;
  }
  return Object.fromEntries(
    Object.entries(AllData).filter(([key, item]) =>
      item.Tags.some(tag => tag.includes(selectedTag.value))
    )
  );
});

function updateFilter(tag) {
  selectedTag.value = tag.replace(/[🍪🍫🥖🥯🎂]/g, '').trim();
}
</script>

<style scoped>
.title {
  color: red;
  font-family: Arial, sans-serif;
  font-size: 50px;
}

.filter-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.bottom-section {
  margin-top: 70px;
  background-color: #F3E7A4;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
