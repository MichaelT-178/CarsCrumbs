<template>
  <div class="flex-container">
    <div>
      <Header :titleText="resultText" />
      <div v-if="filteredItems.length > 0" class="results-container">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="menu-card"
          @click="navigateToRoute(item.Route)"
        >
          <img
            :src="getItemImage(item.Images[0])"
            alt="Menu item image"
            class="menu-image"
          />
          <div class="item-details">
            <h3 class="item-name">{{ item.DisplayName }}</h3>
            <p class="item-price">
              {{ item.DisplayPrice }}
            </p>
          </div>
        </div>
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
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../components/Header.vue";
import ShrugGuy from "../assets/other/Shrug.png";

const jsonData = ref([]);
const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.search_query || "");

const resultText = computed(() => `Search Results for "${searchQuery.value || ""}"`);

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return [];
  }

  const query = searchQuery.value.toLowerCase();

  return jsonData.value.filter(
    (item) =>
      item.DisplayName.toLowerCase().includes(query) ||
      item.DisplayName.toLowerCase().includes(query.slice(0, -1)) ||
      (item.Alternative && item.Alternative.toLowerCase().includes(query.slice(0, -1))) ||
      item.Tags.some((tag) => tag.toLowerCase().includes(query)) ||
      item.Tags.some((tag) => tag.toLowerCase().includes(query.slice(0, -1)))
  );
});

watch(
  () => route.query.search_query,
  (newQuery) => {
    searchQuery.value = newQuery;
  }
);

const loadMenuData = async () => {
  try {
    const MenuData = await import(`../assets/${folderRealOrTest}/MenuItems.json`);
    jsonData.value = MenuData.default.MenuItems;
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
};

const getItemImage = (imageName) => `https://crumb-pics.s3.us-east-1.amazonaws.com/${imageName}`;

const navigateToRoute = (route) => {
  if (route) {
    router.push(route);
  }
};

onMounted(() => {
  loadMenuData();
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

.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  padding: 16px;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.menu-card:hover {
  border: 2px solid blue;
}

.menu-image {
  width: 100%;
  height: 140px;
  border-radius: 8px;
}

.item-details {
  text-align: center;
  margin-top: 8px;
}

.item-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 4px;
}

.item-price {
  color: #9e9e9e;
  font-size: 16px;
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
  background-color: #f3e7a4;
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
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
  }
  
  .menu-card {
    width: 170px;
    padding: 12px;
  }
}

@media (max-width: 350px) {
  .results-container {
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10px;
  }
}

</style>