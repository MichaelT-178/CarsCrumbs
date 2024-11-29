<template>
  <div class="menu-card">
    <img :src="pic" :alt="item.DisplayName" class="menu-image" />
    <h2 class="menu-name">{{ item.DisplayName }}</h2>
    <div class="menu-tags">
      <span
        v-for="tag in item.Tags"
        :key="tag"
        class="menu-tag"
        :class="{'no-hover': disableTagHover, 'tag-hovered': hovered === tag && !disableTagHover}"
        @click="tagClicked(tag)"
        @mouseover="handleMouseOver(tag)"
        @mouseleave="handleMouseLeave"
      >{{ tag }}</span>
    </div>
    <p class="menu-price">{{ item.DisplayPrice }}</p>
    <div class="flex-spacer"></div>
    <div class="button-container">
      <button class="order-button" @click="openSideView">Order Now</button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      Name: '',
      Emoji: '',
      Price: 0.0,
      Images: [],
      Route: '',
      Tags: [],
    }),
  },
  disableTagHover: {
    type: Boolean,
    default: false,
  },
});

const pic = ref(new URL(`../assets/example_pics/menu/${props.item.Images[0]}`, import.meta.url).href);

const hovered = ref(null);

const emit = defineEmits(['tag-clicked', 'open-side-view']);

const tagClicked = (tag) => {
  emit('tag-clicked', tag);
};

const handleMouseOver = (tag) => {
  if (!props.disableTagHover) {
    hovered.value = tag;
  }
};

const handleMouseLeave = () => {
  if (!props.disableTagHover) {
    hovered.value = null;
  }
};

const openSideView = () => {
  emit('open-side-view', props.item);
};

</script>

<style scoped>
.menu-card {
  border: 1.5px solid #3D3D3D;
  padding-bottom: 12px;
  max-width: 230px;
  text-align: center;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.menu-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.menu-name {
  font-weight: bold;
  margin-top: 8px;
}

.menu-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 8px 0;
}

.menu-tag {
  background-color: #f0f0f0;
  border-radius: 50px;
  padding: 4px 12px;
  margin: 4px 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.menu-tag:hover,
.menu-tag.tag-hovered {
  background-color: #A5A5A5;
  color: white;
}

.menu-tag:active {
  background-color: lightseagreen;
  color: white;
}

.menu-tag.no-hover:hover {
  background-color: #f0f0f0;
  color: black;
  cursor: default;
}

.menu-price {
  margin-top: -3px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  margin-bottom: 12px;
}

.flex-spacer {
  flex-grow: 1;
}

.order-button {
  margin-top: 8px;
  padding: 6px 22px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 15px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: 65%;
  transition: background-color 0.3s ease;
  margin-bottom: 2px;
}

.order-button:hover {
  background-color: #0056b3;
}

@media (max-width: 550px) {
  .menu-card {
    max-width: 500px;
    width: 300px;
  }
}

</style>
