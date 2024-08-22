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

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/Order',
		component: Order
	},
	{
		path: '/Cart',
		component: Cart
	},
	{
		path: '/About',
		component: About
	},
	{
		path: '/ContactUs',
		component: Contact
	},
	{
        path: '/Item/:ItemName',
        name: 'ItemView',
        component: Item,
        props: true
    },
	{
        path: '/Results/:SearchQuery?',
        name: 'SearchResults',
        component: SearchResults,
        props: true
    },
    {
		path: '/Cart/Checkout',
		component: Checkout
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;