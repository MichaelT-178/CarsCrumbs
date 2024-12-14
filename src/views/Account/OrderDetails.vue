<template>
  <div>
    <p class="title">Order Details</p>
    <div class="back-container">
      <router-link to="/account?tab=orderHistory" class="back-button">Back</router-link>
      <span class="date">• 12-4-2024</span>
    </div>
    <div class="order-list">
      <PastOrderCard v-for="order in orders" :key="order.name" :order="order" />
    </div>
  </div>
</template>


<script setup>
import OrderDetails from "../../assets/real_menu/OrderDetails.json";
import PastOrderCard from "../../components/Account/PastOrderCard.vue";

const orders = OrderDetails.OrderDetails;

</script>


<style scoped>
.order-list {
  padding-bottom: 100px;
}

.title {
  color: orange;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
}

.back-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.back-button {
  display: inline-block;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-size: 18px;
}

.back-button:hover {
  color: darkblue;
}

.date {
  margin-left: 8px;
  font-size: 16px;
  color: black;
  font-family: "Helvetica";
}

@media (max-width: 800px) {
  .title {
    margin-left: 10px;
    margin-top: 15px;
  }

  .back-container {
    margin-left: 10px;
  }

  .order-card {
    margin-left: 10px;
  }
}
</style>
