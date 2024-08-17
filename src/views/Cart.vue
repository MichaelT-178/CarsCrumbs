<template>
	<p class="title">Cart</p>

	<!-- Loop through all items in the cart and display each one using the ItemCard component -->
	<div class="item-list">
		<ItemCard
			v-for="(item, index) in cart.items"
			:key="index"
			:item="item"
		/>
	</div>

	<a href="https://venmo.com/johndoe?txn=pay&amount=15.00"
	   class="venmo-btn"
	   target="_blank">
	   <img :src="VenmoLogo" alt="Logo" class="venmo-logo" />
	   Pay Us On Venmo
	</a>
	<p>Dm <a href="https://target.com" class="insta-link" target="_blank">@crumbs</a> on Instagram to discuss alternative payment methods.</p>
</template>

<script setup>
import VenmoLogo from "../assets/Venmo.png";
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

.venmo-btn {
	display: inline-flex;
	align-items: center;
	background-color: #008AFF;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 50px;
	font-size: 18px;
	font-family: Arial, sans-serif;
	text-decoration: none;
	transition: background-color 0.3s ease, filter 0.3s ease;
}

.venmo-btn:hover {
	filter: brightness(0.8);
}

.venmo-btn:active {
	filter: brightness(1.35);
}

.venmo-logo {
	margin-right: 3px;
	width: 28px;
	margin-top: -2px;
	height: auto;
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

/* 980 media query */

</style>
