<template>
	<div class="menu-card">
	  <img :src="pic" :alt="item.Name" class="menu-image" />
	  <h2 class="menu-name">{{ item.Name }}</h2>
	  <div class="menu-tags">
		<span
		  v-for="tag in item.Tags"
		  :key="tag"
		  class="menu-tag"
		  @click="tagClicked(tag)"
		  @mouseover="hovered = tag"
		  @mouseleave="hovered = null"
		  :class="{ 'tag-hovered': hovered === tag }"
		>{{ tag }}</span>
	  </div>
	  <p class="menu-price">{{ `$${item.Cost}.00 (${item.Description})` }}</p>
	  <button @click="deleteItem" class="order-button">Delete</button>
	</div>
</template>


<script setup>
import { ref } from 'vue';
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();
  
const props = defineProps({
	item: {
	  type: Object,
	  required: true,
	  default: () => ({
			id: 0,
	    Name: '',
			Emoji: '',
			Price: 0.0,
			Image: '',
			Route: '',
			Tags: [],
	  }),
	},
});

const pic = ref(new URL(`../assets/menu/${props.item.Image}`, import.meta.url).href);

const hovered = ref(null);

const emit = defineEmits(['tag-clicked']);


const tagClicked = (tag) => {
	emit('tag-clicked', tag);
}

const deleteItem = () => {
	if (confirm("Are you sure you want to delete this item?")) {
		cart.deleteItem(props.item.id);
	}
}

</script>


<style scoped>

.menu-card {
	border: 1.5px solid #3D3D3D;
	padding-bottom: 12px;
	max-width: 230px;
	text-align: center;
	border-radius: 8px;
	background-color: white;
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

.menu-price {
	margin-top: 8px;
	font-weight: bold;
}
  
.order-button {
	margin-top: 8px;
	padding: 6px 22px;
	background-color: red;
	color: white;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	text-decoration: none;
	display: inline-block;
	text-align: center;
	width: 65%;
	transition: background-color 0.3s ease;
}

.order-button:hover {
	background-color: darkred;
}

@media (max-width: 550px) {
	.menu-card {
		max-width: 500px;
		width: 300px;
	}
}

</style>
  