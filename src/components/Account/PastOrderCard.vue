<template>
  <div class="order-card">
    <div class="card-header">
      <h2 class="card-title">{{ order.emoji }} {{ order.name }}</h2>
    </div>
    <div class="image-container">
      <img :src="getPicUrl(order.image)" alt="Order Image" class="order-image" />
    </div>
    <div class="card-details">
      <p class="details"><strong>Cost:</strong> ${{ (parseFloat(order.cost) || 0).toFixed(2) }}</p>
      <p class="details"><strong>Quantity:</strong> {{ order.quantity }}</p>
    </div>
    <router-link :to="order.route" class="reorder-button">
      Reorder
    </router-link>
  </div>
</template>

<script setup>

defineProps({
  order: {
    type: Object,
    required: true
  }
});

const getPicUrl = (imageName) => {
  return new URL(`../../../assets/new_images/${imageName}`, import.meta.url).href;
};

</script>

<style scoped>
.order-card {
  background-color: white;
  width: 280px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.card-header {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
}

.card-title {
  font-size: 18px;
  margin: 0;
}

.details {
  font-size: 16px;
  padding-left: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  height: 180px;
  overflow: hidden;
}

.order-image {
  width: 90%;
  height: 90%;
  object-fit: cover;
}

.card-details {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.card-details p {
  margin: 5px 0;
}

.reorder-button {
  display: block;
  margin: 10px auto;
  padding: 4px 10px;
  width: 100px;
  text-align: center;
  background-color: #007bff;
  color: white;
  font-weight: 600px;
  font-size: 18px;
  border-radius: 4px;
  text-decoration: none;
}

.reorder-button:hover {
  background-color: #0056b3;
}

</style>
