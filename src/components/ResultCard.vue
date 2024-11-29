<template>
  <div class="menu-card" @click="navigateToRoute">
    <img :src="pic" alt="Menu item image" class="menu-image" />
    <div class="item-details">
      <h3 class="item-name">{{ item.DisplayName }}</h3>
      <p class="item-price">{{ item.Price === 0.0 ? 'Prices Vary' : `$${item.Price.toFixed(2)}` }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      DisplayName: '',
      Emoji: '',
      Price: 0.0,
      Image: '',
      Route: '',
      Tags: [],
    }),
  },
});

const router = useRouter();

const pic = ref(new URL(`../assets/example_pics/menu/${props.item.Image}`, import.meta.url).href);

const navigateToRoute = () => {
  if (props.item.Route) {
    router.push(props.item.Route);
  }
};

</script>


<style scoped>
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
}

.menu-card:hover {
  border: 2px solid blue;
  cursor: pointer;
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

</style>

