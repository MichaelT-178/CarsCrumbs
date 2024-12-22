<template>
  <p class="title">Favorites</p>

  <div v-if="favoriteItems.length === 0">
    <NoItems
      message="You don't have any favorite items! Go to the menu and add some!"
      buttonText="Add Now">
    </NoItems>
  </div>
  <div v-else>
    <div v-for="item in favoriteItems" :key="item.id" class="favorite-item">
      <FavoriteCard :item="item" @favorite-toggle="handleFavoriteToggle" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import NoItems from "./Empty.vue";
import FavoriteCard from "../../components/Account/FavoriteCard.vue";
import axiosInstance from "../../lib/axios";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
const userId = authStore.getUserId();
const favoriteItems = ref([]);

const fetchFavorites = async () => {
  try {
    const response = await axiosInstance.get(`/get_favorites/${userId}/`);
    favoriteItems.value = response.data;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    favoriteItems.value = [];
  }
};

const handleFavoriteToggle = ({ item, isFavorite }) => {
  if (!isFavorite) {
    favoriteItems.value = favoriteItems.value.filter(
      (favorite) => favorite.id !== item.id
    );
  }
};

onMounted(() => {
  fetchFavorites();
});

</script>


<style scoped>
.title {
  color: blue;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
}

.favorite-item {
  margin-bottom: 15px;
}

@media (max-width: 800px) {
  .title {
    margin-left: 10px;
    margin-top: 15px;
  }

  .favorite-item {
    margin-left: 10px;
    margin-right: 10px;
  }
}

</style>
