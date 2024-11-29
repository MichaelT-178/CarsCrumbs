<template>
  <div class="page-container">
    <div class="header-container">
      <div class="title-container">
        <p class="title">Menu</p>
        <input
          type="text"
          v-model="searchQuery"
          class="search-bar"
          placeholder="Search..."
        />
      </div>
      <div class="filter-container">
        <select id="tag-filter" v-model="selectedTag" class="styled-select">
          <option value="No Filter">❌ No Filter</option>
          <option value="Cookie">🍪 Cookie</option>
          <option value="Brownie">🍫 Brownie</option>
          <option value="Bread">🥖 Bread</option>
          <option value="Bagel">🥯 Bagel</option>
          <option value="Cake">🎂 Cake</option>
        </select>
      </div>
    </div>
    <div class="menu-container">
      <MenuCard
        v-for="(item, key) in filteredItems"
        :key="key"
        :item="item"
        @tag-clicked="updateFilter"
        @open-side-view="openSideView"
      />
    </div>
    
    <!-- SideView and dark overlay -->
    <transition name="fade">
      <div v-if="showSideView" class="overlay" @click="closeSideView"></div>
    </transition>
    <transition name="slide">
      <SideView v-if="showSideView" :ItemName="selectedItem.Name" @close="closeSideView" />
    </transition>

    <div class="bottom-section">
      <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import AllData from '../assets/menu_items/MenuItems.json';
import MenuCard from '../components/MenuCard.vue';
import SideView from '../components/SideItemView.vue';

const selectedTag = ref('No Filter');
const searchQuery = ref('');
const showSideView = ref(false);
const selectedItem = ref(null);

const filteredItems = computed(() => {
  let items = AllData;

  if (selectedTag.value !== 'No Filter') {
    items = Object.fromEntries(
      Object.entries(items).filter(([key, item]) =>
        item.Tags.some(tag => tag.includes(selectedTag.value))
      )
    );
  }

  if (searchQuery.value.trim()) {
    items = Object.fromEntries(
      Object.entries(items).filter(([key, item]) =>
        item.DisplayName.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
      )
    );
  }

  return items;
});

const updateFilter = (tag) => {
  selectedTag.value = tag.replace(/[🍪🍫🥖🥯🎂]/g, '').trim();
};

const openSideView = (item) => {
  selectedItem.value = item;
  showSideView.value = true;
};

const closeSideView = () => {
  showSideView.value = false;
  selectedItem.value = null;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

watch(selectedTag, (newTag) => {
  const hash = newTag === 'No Filter' ? '' : `#${newTag.toLowerCase()}`;
  window.location.hash = hash;
});

onMounted(() => {
  const hash = window.location.hash.replace('#', '');

  if (hash) {
    selectedTag.value = capitalizeFirstLetter(hash);
  }
});

</script>



<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title-container {
  display: flex;
  align-items: center;
}

.title {
  color: #1a1c1e;
  /* font-family: Georgia, serif; */
  /* font-family: "Lobster", cursive; */
  font-family: "Poppins", cursive;
  font-size: 50px;
  margin-left: 20px;
}

.search-bar {
  margin-left: 20px;
  margin-top: 9px;
  padding: 8px 16px;
  font-size: 16px;
  border: 1.5px solid #5E5E5E;
  border-radius: 50px;
  outline: none;
  background-color: #F2F2F2;
  width: 250px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.search-bar:focus {
  border-color: blue;
}

.filter-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
}

.styled-select {
  padding: 8px 16px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  background-color: #f3e7a4;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.styled-select:focus {
  background-color: #e1d89f;
  border-color: #b5a85e;
}

.menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
  padding-bottom: 30px;
}

.bottom-section {
  background-color: #F3E7A4;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  transition: opacity 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 610px) {
  .search-bar {
    display: none;
  }
}

@media (max-width: 550px) {
  .header-container {
    flex-direction: column;
    align-items: center;
  }

  .title-container {
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-left: 0;
    margin-bottom: 16px;
    text-align: center;
  }

  .filter-container {
    margin-right: 0;
    justify-content: center;
    width: 100%;
    display: flex;
  }

  .styled-select {
    max-width: 480px;
    width: 270px;
    margin: 0 auto;
  }

  .search-bar {
    display: block;
    margin-top: -10px;
    margin-right: 12px;
    margin-bottom: 16px;
    width: 270px;
  }

  .menu-container {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 35px;
  }
}

</style>
