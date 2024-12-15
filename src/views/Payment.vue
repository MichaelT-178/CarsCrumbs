<template>
  <div class="checkout-container">
    <form id="payment-form" @submit.prevent="handlePayment">
    <h2 class="title">Secure Checkout</h2>

    <label for="card-number" class="input-label">Card Number</label>
    <div class="input-field card-number-container">
      <div id="card-number" class="stripe-element"></div>
      <div class="card-icons">
        <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" />
        <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" />
        <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" />
        <img src="https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg" alt="UnionPay" />
      </div>
    </div>

    <label for="card-expiry" class="input-label">Expiration Date</label>
    <div id="card-expiry" class="input-field"></div>


    <label for="card-cvc" class="input-label">CVC</label>
    <div class="input-field cvc-container">
      <div id="card-cvc" class="stripe-element"></div>
      <img src="/cvc.svg" alt="CVC" class="cvc-icon" />
    </div>

    <label for="zip-code" class="input-label">ZIP Code</label>
    <div id="zip-code" class="input-field"></div>

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
const zipCode = ref(null);
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

  zipCode.value = elements.value.create('postalCode');
  zipCode.value.mount('#zip-code');
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

#card-number {
  flex: 1;
  padding-right: 50px;
}

.checkout-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.card-number-container {
  position: relative;
  display: flex;
  align-items: center;
}

.card-icons {
  display: flex;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  gap: 5px;
}

.card-icons img {
  width: 20px;
  height: auto;
  display: inline-block;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #2a354f;
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

.cvc-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cvc-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: auto;
}

#card-cvc {
  flex: 1;
  padding-right: 50px;
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
