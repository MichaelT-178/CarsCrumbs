<template>
  <div class="card">
    <router-link class="view-order-link" :to="'/account?tab=orderDetails'">View Order</router-link>
    <p class="date">{{ formatDate(props.item.Date) }}</p>
    <p class="total">{{ props.item.Total }}</p>
    <p class="id-num">#{{ props.item.ConfirmationNum }}</p>
    <p class="successful-order">✅ Order Completed!</p>
    <div class="images">
      <img 
        v-for="(image, index) in limitedImages" 
        :key="index" 
        class="image" 
        :src="getPicUrl(image)" 
        alt="Item Image" 
      />
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { folderRealOrTest } from '../../data.config';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      Date: '',
      ConfirmationNum: 0,
      Total: '',
      Image: [],
    }),
  },
});

const formatDate = (inputDate) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [month, day, year] = inputDate.split('-');
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
};

const limitedImages = computed(() => {
  const allImages = Array.isArray(props.item.Image) ? props.item.Image : [props.item.Image];
  return allImages.slice(0, 4);
});

const getPicUrl = (imageName) => new URL(`../../assets/${folderRealOrTest}/pics/${imageName}`, import.meta.url).href;

</script>


<style scoped>
.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 80%;
  margin-bottom: 20px;
  position: relative; /* Position relative for placing the link in the corner */
}

.view-order-link {
  position: absolute;
  top: 20px;
  right: 15px;
  text-decoration: none;
  font-size: 14px;
	font-family: "Helvetica";
	color: #4e4e4e;
}

.view-order-link:hover {
  text-decoration: underline;
}

.date {
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 8px;
}

.id-num,
.total {
  color: #555555;
  font-size: 15px;
}

.id-num {
  margin-top: 3px;
}

.successful-order {
  margin-top: 4px;
}

.images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

@media (max-width: 800px) {
  .card {
    max-width: 90%;
  }
}

</style>
