<template>
  <p class="title">Order History</p>

  <div v-if="orders.length === 0">
    <NoItems 
      message="You haven't ordered anything yet! Go to the menu and buy something!"
      buttonText="Order Now">
    </NoItems>
  </div>

  <div v-else>
    <OrderCard 
      v-for="order in orders" 
      :key="order.id" 
      class="order-card"
      :item="order" />

		<p class="spacing"></p>
  </div>
</template>


<script setup>
import NoItems from "./Empty.vue";
import PastOrders from "../../assets/real_menu/PastOrders.json";
import OrderCard from "../../components/Account/OrderHistoryCard.vue";

const orders = PastOrders.Orders;

</script>


<style scoped>
.title {
  color: orange;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
}

.spacing {
	padding-bottom: 50px;
}

@media (max-width: 800px) {
  .title {
    margin-left: 10px;
    margin-top: 15px;
  }

  .order-card {
    margin-left: 10px;
  }
}

</style>