<template>
  <div 
    v-if="show && items.length" 
    class="dropdown-menu"
  >
    <p class="menu-title">Menu</p>
    <ul>
      <li 
        v-for="(item, index) in items" 
        :key="index" 
        class="dropdown-item"
        :class="{ active: index === activeIndex }"
        @mouseenter="emit('updateIndex', index)"
        @click="handleClick(item)"
      >
        <img 
          :src="item.imageUrl" 
          :alt="item.DisplayName" 
          class="item-image" 
        />
        <div class="item-info">
          <div class="item-name">
            {{ item.DisplayName }} {{ item.Emoji }}
          </div>
          <div class="item-price">
            {{ item.DisplayPrice }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  show: {
    type: Boolean,
    default: false,
  },
  activeIndex: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(['close', 'updateIndex']);
const router = useRouter();

const handleClick = (item) => {
  let path = item.Route;

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  router.push(path);
  emit('close');
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 485px;
  background-color: #F2F2F2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1003;
  padding: 10px 0;
  border-radius: 4px;
}

.menu-title {
  font-size: 28px;
  font-family: "Roboto Slab", cursive;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 0px;
  border-bottom: 1.5px solid #c7c7c7;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  color: black;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover,
.dropdown-item.active {
  background-color: #dbd8d8;
  color: black;
}

.item-image {
  width: 70px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  right: 100px;
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
</style>