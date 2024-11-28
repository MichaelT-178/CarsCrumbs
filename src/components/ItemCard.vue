<template>
  <div class="item-card">
    <div class="item-content">
      <img :src="pic" :alt="item.DisplayName" class="item-image" />
      <div class="item-info">
        <h2 class="item-name">{{ item.DisplayName }}</h2>
        <p class="item-quantity">{{ item.Description }}</p>
        <div class="item-tags">
          <span
            v-for="tag in item.Tags"
            :key="tag"
            class="item-tag"
            @click="tagClicked(tag)"
            @mouseover="hovered = tag"
            @mouseleave="hovered = null"
            :class="{ 'tag-hovered': hovered === tag }"
          >
            {{ tag }}
          </span>
        </div>
        <p class="item-price">{{ `$${item.Cost}.00` }}</p>
      </div>
    </div>
    <div
      class="right-side"
      :class="{ 'hovered': hoverDelete }"
      @mouseover="hoverDelete = true"
      @mouseleave="hoverDelete = false"
      @click="deleteItem"
    > <!-- trash icon -->
      <span class="material-symbols-outlined delete-icon">
        delete
      </span>
    </div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      Name: '',
      Quantity: 1,
      Cost: 0.0,
      Image: '',
      Description: '',
      Tags: [],
    }),
  },
});

const pic = computed(() => new URL(`../assets/example_pics/menu/${props.item.Image}`, import.meta.url).href);

const hovered = ref(null);
const hoverDelete = ref(false);

const emit = defineEmits(['tag-clicked']);

const tagClicked = (tag) => {
  emit('tag-clicked', tag);
};

const deleteItem = () => {
  if (confirm("Are you sure you want to delete this item?")) {
    cart.deleteItem(props.item.id);
  }
};

</script>


<style scoped>
.item-card {
  display: flex;
  align-items: center;
  border: 1.5px solid #3D3D3D;
  max-width: 500px;
  border-radius: 8px;
  background-color: white;
  justify-content: space-between;
  position: relative;
  width: 410px;
  overflow: hidden;
}

.item-content {
  display: flex;
  padding: 12px 0 12px 12px; /* Padding top, bottom, and left */
  flex-grow: 1;
}

.item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex-grow: 1;
  margin-left: 12px;
  padding: 12px 0;
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.item-quantity {
  font-size: 16px;
  margin-bottom: 4px;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.item-tag {
  background-color: #f0f0f0;
  border-radius: 50px;
  padding: 4px 12px;
  margin: 4px 4px;
  font-size: 13px;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.item-price {
  font-weight: bold;
  margin-top: 4px;
  font-size: 18px;
}

.right-side {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  background-color: white;
  transition: background-color 0.3s ease;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.right-side.hovered {
  background-color: red;
  cursor: pointer;
}

.delete-icon {
  cursor: pointer;
  color: red;
  font-size: 24px;
  transition: color 0.3s ease;
}

.right-side:hover .delete-icon {
  color: white;
}

</style>
