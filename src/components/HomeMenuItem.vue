<template>
  <div :class="{'menu-item': true, 'border-purple': isHovered}">
    <div class="item-image">
      <img :src="pic" :alt="item.Name" />
    </div>
    
    <div class="item-content">
      <h2>{{ item.Name }}</h2>
      <p>{{ item.Description }}</p>
      <router-link 
        :to="item.Link" 
        class="order-link" 
        @mouseover="isHovered = true" 
        @mouseleave="isHovered = false"
      >
        Order Now
      </router-link>
    </div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const pic = computed(() => new URL(`../assets/menu/${props.item.Picture}`, import.meta.url).href);
const isHovered = ref(false);

</script>


<style scoped>

.menu-item {
  display: flex;
  width: 100%;
  max-width: 50%;
  margin: 20px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  /* teal lightskyblue #F3E7A4*/
  /* background-color: lightskyblue; */
  /* background-color: white; */
  /* background-color: #F3E7A4;  */
  background-color: #F0EBC8;
  height: 300px;
}

.menu-item.border-purple {
  border: 2px solid purple;
}

.item-image {
  flex: 1;
  max-width: 40%;
}

.item-image img {
  width: 100%;
  height: auto;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 5px;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 5px;
}

.order-link {
  font-size: 1.1rem;
  color: #fff;
  background-color: navy;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: auto;
}

.order-link:hover {
  background-color: blue;
}

</style>
