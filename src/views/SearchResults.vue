<template>
  <div class="flex-container">
    <div>
      <Header :titleText="resultText" />
      <div v-if="filteredItems.length > 0" class="results-container">
        <ResultCard v-for="(item, index) in filteredItems" :key="index" :item="item" />
      </div>
      <div v-else class="no-results">
        <img :src="ShrugGuy" alt="No Results" />
        <p>No results found for "{{ searchQuery }}"</p>
      </div>
    </div>
    <div class="bottom-section">
      <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from "../components/Header.vue";
import ResultCard from "../components/ResultCard.vue";
import ShrugGuy from "../assets/Shrug.png";
import MenuItems from "../assets/test_menu/MenuItems.json";

const jsonData = ref(MenuItems);

const route = useRoute();
const searchQuery = ref(route.query.search_query || '');

const resultText = computed(() => `Search Results for "${searchQuery.value || ''}"`);

const filteredItems = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();

  return Object.values(jsonData.value).filter(item => 
      item.DisplayName.toLowerCase().includes(query) ||
      item.DisplayName.toLowerCase().includes(query.slice(0, -1)) || //Remove possible s at the end
      item.Alternative.toLowerCase().includes(query.slice(0, -1)) || //Remove possible s at the end
      item.Tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.Tags.some(tag => tag.toLowerCase().includes(query.slice(0, -1))) //Remove possible s at the end
  );
});

watch(() => route.query.search_query, (newQuery) => {
  searchQuery.value = newQuery;
});

</script>


<style scoped>

.flex-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

.results-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 17px;
  row-gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 38%;
  margin: 0 auto;
  margin-top: -15px;
  margin-bottom: 25px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
}

.no-results img {
  max-width: 500px;
  max-height: 500px;
  margin-bottom: 0;
  border: 1px solid black;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -10px;
}

.no-results p {
  font-size: 21px;
  color: #555;
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
  .results-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .results-container {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>

