<template>
  <div class="menu-item">
    <img :src="pic" :alt="item.DisplayName" class="menu-image" />
    <div class="menu-info">
      <h2 class="menu-name-link" @click="goToItem">{{ item.DisplayName }}</h2>

      <StarRating :rating="item.Rating" />

      <p class="menu-price">{{ item.DisplayPrice }}</p>

      <div class="button-heart">
        <button class="order-button" @click="openSideView">Order Now</button>
        <div v-if="isHearted">
          <img
            src="/heart-filled.svg"
            class="material-symbols-outlined favorite-icon"
            @click="toggleHeart"
          />
        </div>
        <div v-else>
          <span
            class="material-symbols-outlined favorite-icon"
            :class="{ hearted: isHearted }"
            @click="toggleHeart"
          >
            favorite
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import StarRating from "./StarRating.vue";
import { useAuthStore } from "../stores/auth";
import { useFavoritesStore } from "../stores/favorites";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const userId = authStore.getUserId();

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      Name: "",
      Emoji: "",
      Price: 0.0,
      Images: [],
      Route: "",
      Tags: [],
    }),
  },
});

const emit = defineEmits(["open-side-view"]);

const pic = computed(() => {
  try {
    return props.item.Images?.[0]
      ? new URL(`../assets/new_images/${props.item.Images[0]}`, import.meta.url).href
      : "";
  } catch (e) {
    console.warn("Image not found:", props.item.Images?.[0]);
    return "";
  }
});

const isHearted = computed(() => favoritesStore.isFavorite(props.item.id));

const toggleHeart = () => {
  if (!userId) {
    alert("You need to be logged in to favorite items.");
    return;
  }

  if (isHearted.value) {
    favoritesStore.removeFavorite(props.item.id);
  } else {
    favoritesStore.addFavorite(props.item);
  }
};

const goToItem = () => {
  let path = props.item.Route;
  if (!path.startsWith("/")) path = "/" + path;
  router.push(path);
};

const openSideView = () => {
  emit("open-side-view", props.item);
};

</script>


<style scoped>
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
  text-align: left;
  position: relative;
}

.menu-image {
  width: 250px;
  object-fit: cover;
  height: 250px;
  border-radius: 8px;
}

.menu-info {
  margin-top: 12px;
  width: 100%;
}

.menu-name-link {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
  margin-top: 1px;
}

.menu-name-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.menu-price {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: 15px;
  margin-bottom: 8px;
}

.order-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-button:hover {
  background-color: #0056b3;
}

.favorite-icon {
  position: absolute;
  top: 260px;
  right: -5px;
  font-size: 27px;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;
  fill: black;
}

.favorite-icon.hearted {
  color: red;
}

</style>

