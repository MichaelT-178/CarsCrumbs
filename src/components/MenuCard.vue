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
import { computed, ref, onMounted } from "vue";
import StarRating from "./StarRating.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      Name: "",
      Emoji: "",
      Price: 0.0,
      Images: [],
      Route: "",
      Tags: [],
    }),
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const pic = computed(() => {
  if (props.item.Images && props.item.Images.length > 0) {
    return `../../src/assets/new_images/${props.item.Images[0]}`;
  }
  
  return "";
});

const isHearted = ref(props.isFavorite);
const emit = defineEmits(["open-side-view"]);

const openSideView = () => {
  emit("open-side-view", props.item);
};



const authStore = useAuthStore();
const userId = authStore.getUserId();

// const toggleHeart = async () => {
//   if (!userId) {
//     alert("You need to be logged in to favorite items.");
//     return;
//   }

//   try {
//     // Try Block
//     if (isHearted.value) {
//       const response = await axiosInstance.delete("/delete_favorite/", {
//         data: { user_id: userId, item_id: props.item.id },
//       });

//       console.log(response.data.detail);
//     } else {
//       const response = await axiosInstance.post("/add_favorite/", {
//         user_id: userId,
//         item_id: props.item.id,
//       });

//       console.log(response.data.detail);
//     }

//     isHearted.value = !isHearted.value;
//      // Try Block

//   } catch (error) {
//     console.error("Error toggling favorite:", error.response?.data?.detail || error.message);

//     if (!isHearted.value && error.response?.data?.detail === "Favorite already exists.") {
//       isHearted.value = true;
//     } else {
//       alert("Failed to toggle favorite. Please try again.");
//     }
//   }

// };

const goToItem = () => {
  let path = props.item.Route;

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  router.push(path);
}

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

