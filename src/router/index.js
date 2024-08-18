import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';

//Menu
import Cookies from '../views/menu/Cookies.vue';
import Brownies from '../views/menu/Brownies.vue';
import Bread from '../views/menu/Bread.vue';
import Bagels from '../views/menu/Bagels.vue';
import Cakes from '../views/menu/Cakes.vue';

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
        path: '/Cookies/:ItemName',
        name: 'CookieView',
        component: Cookies,
        props: true
    },
	{
        path: '/Brownies/:ItemName',
        name: 'BrownieView',
        component: Brownies,
        props: true
    },
	{
        path: '/Bread/:ItemName',
        name: 'BreadView',
        component: Bread,
        props: true
    },
	{
        path: '/Bagels/:ItemName',
        name: 'BagelView',
        component: Bagels,
        props: true
    },
	{
        path: '/Cake/:ItemName',
        name: 'CakeView',
        component: Cakes,
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