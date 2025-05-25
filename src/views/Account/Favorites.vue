<template>
  <p class="title">Favorites</p>

  <div v-if="favoritesStore.favoriteItems.length === 0">
    <NoItems
      message="You don't have any favorite items! Go to the menu and add some!"
      buttonText="Add Now"
    />
  </div>
  <div v-else>
    <div
      v-for="item in favoritesStore.favoriteItems"
      :key="item.id"
      class="favorite-item"
    >
      <FavoriteCard
        :item="item"
        @favorite-toggle="handleFavoriteToggle"
      />
    </div>
  </div>
</template>


<script setup>
import NoItems from "./Empty.vue";
import FavoriteCard from "../../components/Account/FavoriteCard.vue";
import { useAuthStore } from "../../stores/auth";
import { useFavoritesStore } from "../../stores/favorites";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const userId = authStore.getUserId();

const handleFavoriteToggle = ({ item, isFavorite }) => {
  if (!isFavorite) {
    favoritesStore.removeFavorite(item.id);
  }
};

favoritesStore.loadFavorites(userId);

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
