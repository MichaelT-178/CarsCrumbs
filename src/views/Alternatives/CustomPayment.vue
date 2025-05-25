<template>
  <div class="checkout-container">
    <form id="payment-form" @submit.prevent="handlePayment">
      <label for="card-number" class="input-label">Card Number</label>
      <div class="input-field card-number-container" :class="{ error: fieldErrors.cardNumber }">
        <div id="card-number" class="stripe-element"></div>
        <div class="card-icons">
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg"
            alt="Visa"
          />
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
            alt="Mastercard"
          />
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
            alt="Amex"
          />
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg"
            alt="UnionPay"
          />
        </div>
      </div>
      <p v-if="fieldErrors.cardNumber" class="field-error">{{ fieldErrors.cardNumber }}</p>

      <div class="row">
        <div class="field-container">
          <label for="card-expiry" class="input-label">Expiration Date</label>
          <div id="card-expiry" class="input-field" :class="{ error: fieldErrors.cardExpiry }"></div>
          <p v-if="fieldErrors.cardExpiry" class="field-error">{{ fieldErrors.cardExpiry }}</p>
        </div>
        <div class="field-container">
          <div class="security-code-form">
            <label for="card-cvc" class="input-label">Security Code</label>
            <div class="input-field cvc-container" :class="{ error: fieldErrors.cardCvc }">
              <div id="card-cvc" class="stripe-element"></div>
              <img src="/cvc.svg" alt="CVC" class="cvc-icon" />
            </div>
            <p v-if="fieldErrors.cardCvc" class="field-error">{{ fieldErrors.cardCvc }}</p>
          </div>
        </div>
      </div>

      <label for="postal-code" class="input-label">ZIP Code</label>
      <div 
        id="postal-code" 
        class="input-field" 
        placeholder="12345"
        :class="{ error: fieldErrors.postalCode }">
      </div>
      <p v-if="fieldErrors.postalCode" class="field-error">{{ fieldErrors.postalCode }}</p>

      <button type="submit" class="pay-button" :disabled="isProcessing">
        {{ isProcessing ? 'Processing...' : 'Pay' }}
      </button>
    </form>

    <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="powered-by">
      Powered by
      <img src="/stripe.svg" alt="Stripe" class="stripe-icon" />
    </a>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
// import axiosInstance from '../../lib/axios';

const stripe = ref(null);
const elements = ref(null);
const cardNumber = ref(null);
const cardExpiry = ref(null);
const cardCvc = ref(null);
const postalCode = ref(null);
const isProcessing = ref(false);
const errorMessage = ref('');
const fieldErrors = ref({
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  postalCode: ''
});

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_TEST_KEY);
  elements.value = stripe.value.elements();

  cardNumber.value = elements.value.create('cardNumber');
  cardNumber.value.mount('#card-number');

  cardExpiry.value = elements.value.create('cardExpiry');
  cardExpiry.value.mount('#card-expiry');

  cardCvc.value = elements.value.create('cardCvc');
  cardCvc.value.mount('#card-cvc');

  postalCode.value = elements.value.create('postalCode', {
    placeholder: '12345', 
  });

  postalCode.value.mount('#postal-code');
  
});


// on change doesn't work for all the fields
// This is more explicit and customizable
const validateFields = () => {
  let hasErrors = false;

  // Validate Card Number
  if (!cardNumber.value) {
    fieldErrors.value.cardNumber = 'Card Number is required.';
    hasErrors = true;
  } else if (!cardNumber.value._complete) {
    fieldErrors.value.cardNumber = 'Please enter a valid Card Number.';
    hasErrors = true;
  } else {
    fieldErrors.value.cardNumber = '';
  }

  // Validate Expiry
  if (!cardExpiry.value) {
    fieldErrors.value.cardExpiry = 'Expiration Date is required.';
    hasErrors = true;
  } else if (!cardExpiry.value._complete) {
    fieldErrors.value.cardExpiry = 'Please enter a valid Expiration Date.';
    hasErrors = true;
  } else {
    fieldErrors.value.cardExpiry = '';
  }

  // Validate CVC
  if (!cardCvc.value) {
    fieldErrors.value.cardCvc = 'Security Code is required.';
    hasErrors = true;
  } else if (!cardCvc.value._complete) {
    fieldErrors.value.cardCvc = 'Please enter a valid Security Code.';
    hasErrors = true;
  } else {
    fieldErrors.value.cardCvc = '';
  }

  // Validate Postal Code
  if (!postalCode.value) {
    fieldErrors.value.postalCode = 'ZIP Code is required.';
    hasErrors = true;
  } else if (!postalCode.value._complete) {
    fieldErrors.value.postalCode = 'Please enter a valid ZIP Code.';
    hasErrors = true;
  } else {
    fieldErrors.value.postalCode = '';
  }

  return !hasErrors;
};

const handlePayment = async () => {
  isProcessing.value = true;
  errorMessage.value = '';

  if (!validateFields()) {
    isProcessing.value = false;
    return;
  }

  try {
    // const { data } = await axiosInstance.post('/create-payment-intent/', {
    //   amount: 5000,
    //   currency: 'usd',
    // });

    // const { error, paymentIntent } = await stripe.value.confirmCardPayment(data.clientSecret, {
    //   payment_method: {
    //     card: cardNumber.value,
    //   },
    // });

    // if (error) {
    //   throw new Error(error.message);
    // }

    alert(`Payment succeeded! PaymentIntent ID: ${paymentIntent.id}`);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isProcessing.value = false;
  }
};

</script>


<style scoped>

* {
  box-sizing: border-box;
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

.title {
  text-align: center;
  font-size: 1.45rem;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  color: #2a354f;
}

.input-label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #4a4a4a;
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
  width: 24px;
  height: auto;
  display: inline-block;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.field-container {
  flex: 1;
  min-width: 0;
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
  /* margin-top: 15px; */
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
  width: 25px;
  height: auto;
}

.input-field.error {
  border-color: #df1b41;
}

.field-error {
  color: #df1b41;
  font-size: 0.8rem;
  margin-top: -10px;
  margin-bottom: 15px;
}

#card-number {
  flex: 1;
  padding-right: 50px;
}

#card-cvc {
  flex: 1;
  padding-right: 50px;
}

.powered-by {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #8d8d8d;
  text-decoration: none;
  margin-top: 15px;
}

.stripe-icon {
  width: 45px;
  height: auto;
  margin-top: 0.25px;
}

.powered-by:hover,
.stripe-icon:hover {
  filter: brightness(0.1);
  transition: filter 0.3s ease; 
}

@media (max-width: 480px) {

  .title {
    font-size: 1.2rem;
  }

  .pay-button {
    padding: 10px;
    font-size: 0.9rem;
  }

  .row {
    flex-direction: column;
  }

  .security-code-form {
    margin-top: -8px;
  }

  .field-container {
    width: 100%;
  }

  .checkout-container {
    max-width: 350px;
  }
}

</style>
