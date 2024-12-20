<template>
  <div class="payment-success">
    <div class="circle">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path
          class="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle-fill"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          :style="{ strokeDashoffset: strokeDashoffset }"
        />
      </svg>
      <div class="checkmark">
        <svg viewBox="0 0 52 52" class="checkmark-svg">
          <path d="M14 26l8 8L38 16" />
        </svg>
      </div>
    </div>
    <h1>Payment Successful!</h1>
    <p>Your payment has been processed successfully.</p>
    <router-link to="/" class="home-button">Home</router-link>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const strokeDasharray = 100;
const strokeDashoffset = ref(strokeDasharray);

onMounted(() => {
  setTimeout(() => {
    strokeDashoffset.value = 0;
  }, 100);
});

</script>


<style scoped>
.payment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.circle {
  position: relative;
  width: 275px;
  height: 275px;
  margin-bottom: 20px;
  margin-top: -200px;
}

.circular-chart {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: #e6e6e6;
  stroke-width: 1.5;
}

.circle-fill {
  fill: none;
  stroke: #28a745;
  stroke-width: 1.5;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 1s ease-in-out;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkmark-svg {
  width: 230px;
  height: 230px;
  stroke: #28a745;
  stroke-width: 1.75;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin: -10px 0 5px 0;
  font-family: "Helvetica";
}

p {
  font-size: 1.2rem;
  color: #717171;
  font-family: "Helvetica";
  margin-top: 3px;
}

.home-button {
  display: inline-block;
    padding: 10px 30px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    font-size: 22px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 6px;
}

.home-button:hover {
  background-color: #0056b3;;
}

@media (max-width: 450px) {
  .circle {
    width: 230px;
    height: 230px;
  }

  .checkmark-svg {
    width: 200px;
    height: 200px;
  }

  p {
    text-align: center;
  }
}

</style>
