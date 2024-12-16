import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';

//Item
import Item from '../views/Item.vue';

//SearchResults
import SearchResults from '../views/SearchResults.vue';

//Checkout
import Checkout from '../views/Checkout.vue';

//Write review
import WriteReview from '../views/WriteReview.vue';

// Account
import Account from '../views/Account/Account.vue';

// Payment 
import Payment from '../views/Payment.vue';

import PaymentSuccess from '../views/PaymentSuccess.vue';

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/order',
		component: Order
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/contact-us',
		component: Contact
	},
	{
		path: '/payment',
		component: Payment
	},
	{
		path: '/payment-success',
		name: 'PaymentSuccess',
		component: PaymentSuccess
	},
	{
		path: '/item/:ItemName',
		name: 'ItemView',
		component: Item,
		props: true
  },
	{
		path: '/results',
		name: 'SearchResults',
		component: SearchResults,
		props: (route) => ({ searchQuery: route.query.search_query })
	},
	{
		path: '/cart/checkout',
		component: Checkout
	},
	{
		path: '/write-review',
		name: 'WriteReview',
		component: WriteReview,
		props: (route) => ({ itemName: route.query.itemName })
	},
	{
		path: '/account',
		name: 'AccountView',
		component: Account,
		props: (route) => ({ tab: route.query.tab })
	},
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;