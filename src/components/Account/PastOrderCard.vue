<template>
  <div class="order-card">
    <div class="card-header">
      <h2 class="card-title">{{ order.emoji }} {{ order.name }}</h2>
    </div>
    <div class="image-container">
      <img :src="getPicUrl(order.image)" alt="Order Image" class="order-image" />
    </div>
    <div class="card-details">
      <p><strong>Cost:</strong> ${{ order.cost.toFixed(2) }}</p>
      <p><strong>Quantity:</strong> {{ order.quantity }}</p>
      <p><strong>Date:</strong> {{ order.date }}</p>
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { folderRealOrTest } from '../../data.config';

defineProps({
  order: {
    type: Object,
    required: true
  }
});

const getPicUrl = (imageName) =>
  new URL(`../../assets/${folderRealOrTest}/pics/${imageName}`, import.meta.url).href;

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
  padding: 10px;
  font-size: 14px;
}

.card-details p {
  margin: 5px 0;
}
</style>
