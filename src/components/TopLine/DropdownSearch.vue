<template>
  <div 
    v-if="show && filteredItems.length" 
    class="dropdown-menu"
  >
    <p class="menu-title">Menu</p>
    <ul>
      <li 
        v-for="(item, index) in filteredItems" 
        :key="index" 
        class="dropdown-item"
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
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../lib/axios';

const props = defineProps({
  query: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);
const router = useRouter();

const menu = ref([]);

const filteredItems = computed(() => {
  if (!props.query) return [];
  const queryWords = props.query.toLowerCase().split(' ');

  return menu.value
    .filter(item =>
      queryWords.some(word =>
        item.DisplayName.toLowerCase().includes(word) ||
        item.Tags.some(tag => tag.toLowerCase().includes(word)) ||
        (item.Alternative && item.Alternative.toLowerCase().includes(word))
      )
    )
    .map(item => ({
      ...item,
      imageUrl: `https://crumb-pics.s3.us-east-1.amazonaws.com/${item.Images[0]}`,
    }))
    .slice(0, 5);
});

const handleClick = (item) => {
  let path = item.Route;
  
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  router.push(path);
  emit('close');
};

const loadMenuData = async () => {
  try {
    const response = await axiosInstance.get("get_menu/");
    menu.value = response.data.MenuItems;
  } catch (error) {
    console.error('Error loading menu data:', error);
  }
};

onMounted(() => {
  loadMenuData();
});

</script>


<style scoped>
.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  width: 485px;
  background-color: #F2F2F2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1003;
  padding: 10px 0;
  /* border: 1px solid #F2F2F2; */
  border-radius: 4px;
}

.menu-title {
  font-size: 28px;
  font-family: "Roboto Slab", cursive;
  margin-left: 15px;
  margin-right: 15px;
  /* font-weight: 600; */
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

.dropdown-item:focus {
  outline: 2px solid #FFD700;
  background-color: #FFD700;
  color: black;
}

.dropdown-item:hover {
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
