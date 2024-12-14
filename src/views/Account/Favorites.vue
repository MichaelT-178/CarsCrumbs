<template>
  <p class="title">FAVORITES</p>

  <div v-if="favoriteItems.length === 0">
    <NoItems
      message="You don't have any favorite items! Go to the menu and add some!"
      buttonText="Add Now">
    </NoItems>
  </div>
  <div v-else>
    <div v-for="item in favoriteItems" :key="item.id" class="favorite-item">
      <FavoriteCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NoItems from "./Empty.vue";
import MenuItems from "../../assets/real_menu/MenuItems.json";
import FavoriteCard from "../../components/Account/FavoriteCard.vue";


const favoriteItemIds = ref([1, 3, 5]);

const favoriteItems = ref(MenuItems.MenuItems.filter(item =>
  favoriteItemIds.value.includes(item.id)
));

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
