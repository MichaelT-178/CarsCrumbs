import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteItems = ref([]);

  function loadFavorites(userId) {
    if (!userId) return;

    const stored = localStorage.getItem(`favorites_${userId}`);
    favoriteItems.value = stored ? JSON.parse(stored) : [];
  }

  function saveFavorites(userId) {
    if (!userId) return;
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoriteItems.value));
  }

  function addFavorite(item) {
    if (!favoriteItems.value.some(f => f.id === item.id)) {
      favoriteItems.value.push(item);
      saveFavorites(localStorage.getItem("userId"));
    }
  }

  function removeFavorite(itemId) {
    favoriteItems.value = favoriteItems.value.filter(f => f.id !== itemId);
    saveFavorites(localStorage.getItem("userId"));
  }

  function isFavorite(itemId) {
    return favoriteItems.value.some(f => f.id === itemId);
  }

  return {
    favoriteItems,
    loadFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
});
