import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Item from '../views/Item.vue';

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
        path: '/Info/:ItemName',
        name: 'ItemView',
        component: Item,
        props: true
    },
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;