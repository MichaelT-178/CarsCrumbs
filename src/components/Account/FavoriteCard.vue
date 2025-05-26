<template>
  <div class="item-container">
    <img 
      :src="getPicUrl" 
      :alt="displayName" 
      class="item-image" 
    />
    <div class="item-info">
      <div class="item-name">
        {{ displayName }} {{ emoji }}
      </div>
      <div class="item-price">
        {{ displayPrice }}
      </div>
      <span 
        class="buy-now-link" 
        @click="() => handleClick(route)"
      >
        Buy Now
      </span>
    </div>
    <div 
      class="heart-icon" 
      @click="toggleFavorite"
    >
      <svg 
        v-if="isFavorite" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="red" 
        class="material-icon"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="material-icon"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useFavoritesStore } from "../../stores/favorites";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const userId = authStore.getUserId();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["favorite-toggle"]);

const {
  DisplayName: displayName,
  DisplayPrice: displayPrice,
  Emoji: emoji,
  Route: route,
  Images,
  id: itemId
} = props.item;

const getPicUrl = computed(() =>
  new URL(`../../../assets/new_images/${Images[0]}`, import.meta.url).href
);

const isFavorite = computed(() => favoritesStore.isFavorite(itemId));

const handleClick = (route) => {
  if (!route.startsWith("/")) {
    route = "/" + route;
  }
  router.push(route);
};

const toggleFavorite = () => {
  if (!userId) {
    alert("You need to be logged in to favorite items.");
    return;
  }

  if (isFavorite.value) {
    favoritesStore.removeFavorite(itemId);
  } else {
    favoritesStore.addFavorite(props.item);
  }

  emit("favorite-toggle", { item: props.item, isFavorite: isFavorite.value });
};

</script>


<style scoped>
.item-container {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 80%;
}

.item-image {
  width: 70px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 18px;
  font-weight: bold;
}

.item-price {
  font-size: 14px;
  color: #5a5959;
  margin-top: 2px;
}

.buy-now-link {
  color: blue;
  font-size: 15px;
  margin-top: 5px;
  cursor: pointer;
  text-decoration: underline;
}

.buy-now-link:hover {
  color: darkblue;
}

.heart-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.material-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 1000px) {
  .item-container {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .item-container {
    width: 100%;
  }
}
</style>
