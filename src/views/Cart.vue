<template>
	<p class="title">Cart</p>


	<div class="item-list">
		<ItemCard
			v-for="(item, index) in cart.items"
			:key="index"
			:item="item"
		/>
	</div>

	<router-link to="/Cart/Checkout" class="checkout-button">Checkout</router-link>
	
	<p>Dm <a href="https://target.com" class="insta-link" target="_blank">@crumbs</a> on Instagram to discuss alternative payment methods.</p>
</template>


<script setup>
import ItemCard from "../components/ItemCard.vue";
import { useCartStore } from '../stores/cart.js';

const cart = useCartStore();
</script>

<style scoped>
.title {
	color: red;
	font-family: Arial, sans-serif;
	font-size: 50px;
}

.item-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.insta-link {
	color: purple;
	text-decoration: none;
}

.insta-link:hover {
	color: #610061;
	text-decoration: underline;
}

.insta-link:active {
	color: #D400D4;
}

.checkout-button {
	display: inline-block;
	padding: 10px 20px;
	background-color: blue;
	color: white;
	text-decoration: none;
	border-radius: 50px;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	transition: background-color 0.3s ease;
}

.checkout-button:hover {
	background-color: #218838;
}

.checkout-button:active {
	background-color: #1e7e34;
}

/* 980 media query */
</style>
