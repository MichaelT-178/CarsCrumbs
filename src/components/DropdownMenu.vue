<template>
  <div 
    v-if="show && filteredItems.length" 
    class="dropdown-menu"
  >
    <ul>
      <li 
        v-for="(item, index) in filteredItems" 
        :key="index" 
        class="dropdown-item"
        @click="handleClick(item)"
      >
        {{ item.DisplayName }}
      </li>
    </ul>
  </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { folderRealOrTest } from '../data.config';

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

  return menu.value.filter(item =>
    queryWords.some(word =>
      item.DisplayName.toLowerCase().includes(word) ||
      item.Tags.some(tag => tag.toLowerCase().includes(word)) ||
      (item.Alternative && item.Alternative.toLowerCase().includes(word))
    )
  ).slice(0, 5);
});

const handleClick = (item) => {
  router.push({
    name: 'SearchResults',
    query: { search_query: item.DisplayName.trim() },
  });

  emit('close');
};

const loadMenuData = async () => {
  try {
    const MenuData = await import(`../assets/${folderRealOrTest}/MenuItems.json`);
    menu.value = Object.values(MenuData.default);
  } catch (error) {
    console.error("Error loading menu data:", error);
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
  width: 500px;
  background-color: darkblue;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1003;
  padding: 10px 0;
  border: 1px solid darkblue;
  border-radius: 4px;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:focus {
  outline: 2px solid #FFD700;
  background-color: #FFD700;
  color: black;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
  color: black;
}

</style>
