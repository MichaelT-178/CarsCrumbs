<template>
  <div class="checkout-container">
    <form id="payment-form" @submit.prevent="handlePayment">
      <h2 class="title">Secure Checkout</h2>

      <label for="card-number" class="input-label">Card Number</label>
      <div id="card-number" class="input-field"></div>

      <label for="card-expiry" class="input-label">Expiration Date</label>
      <div id="card-expiry" class="input-field"></div>

      <label for="card-cvc" class="input-label">CVC</label>
      <div id="card-cvc" class="input-field"></div>

      <button type="submit" class="pay-button" :disabled="isProcessing">
        {{ isProcessing ? 'Processing...' : 'Pay' }}
      </button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripe = ref(null);
const elements = ref(null);
const cardNumber = ref(null);
const cardExpiry = ref(null);
const cardCvc = ref(null);
const isProcessing = ref(false);
const errorMessage = ref('');

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_TEST_KEY);
  elements.value = stripe.value.elements();

  cardNumber.value = elements.value.create('cardNumber');
  cardNumber.value.mount('#card-number');

  cardExpiry.value = elements.value.create('cardExpiry');
  cardExpiry.value.mount('#card-expiry');

  cardCvc.value = elements.value.create('cardCvc');
  cardCvc.value.mount('#card-cvc');
});


const handlePayment = async () => {
  isProcessing.value = true;

  try {
    const { data } = await axios.post('http://localhost:3000/create-payment-intent', {
      amount: 5000,
      currency: 'usd',
    });

    const { error, paymentIntent } = await stripe.value.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardNumber.value,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    alert(`Payment succeeded! PaymentIntent ID: ${paymentIntent.id}`);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isProcessing.value = false;
  }
};
</script>


<style>
* {
  box-sizing: border-box;
}

.checkout-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.input-field {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 40px;
}

.input-label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #4a4a4a;
}

.pay-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pay-button:disabled {
  background-color: #b3d7ff;
  cursor: not-allowed;
}

.pay-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.error {
  margin-top: 15px;
  color: red;
  text-align: center;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .checkout-container {
    padding: 15px;
  }

  .title {
    font-size: 1.2rem;
  }

  .pay-button {
    padding: 10px;
    font-size: 0.9rem;
  }
}

</style>
