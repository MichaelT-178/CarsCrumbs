<template>
  <div class="payment-element">
    <form @submit.prevent="handleSubmit">
      <div id="payment-element"></div>

      <button type="submit" :disabled="!isFormValid || isLoading">
        {{ isLoading ? "Processing..." : `Pay ${amount}` }}
      </button>
    </form>
    <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="powered-by">
      Powered by
      <img src="/stripe.svg" alt="Stripe" class="stripe-icon" />
    </a>

    <p v-if="message" class="payment-message">{{ message }}</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";
import { useRouter } from 'vue-router';
import { convertToSubcurrency } from "../utils/helper";

const amount = 49.99;

const router = useRouter();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_TEST_KEY);

const isLoading = ref(false);
const message = ref("");
const clientSecret = ref("");
let stripe;
let elements;

const isFormValid = ref(false);

onMounted(async () => {
  stripe = await stripePromise;

  try {
    const response = await axiosInstance.post("/create-payment-intent/", {
      amount: convertToSubcurrency(amount),
    });

    clientSecret.value = response.data.clientSecret;

    const options = {
      clientSecret: clientSecret.value,
      appearance: {
        theme: "stripe",
      },
    };

    elements = stripe.elements(options);

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

    isFormValid.value = true;
  } catch (error) {
    message.value = "Failed to load payment details.";
    console.error(error);
  }
});

const handleSubmit = async () => {
  isLoading.value = true;

  if (!stripe || !elements) {
    message.value = "Stripe is not initialized.";
    isLoading.value = false;
    return;
  }

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // THIS CAN LITERALLY BE BASICALLY ANY HTTPS WEBSITE
      return_url: `${window.location.origin}${router.resolve({ name: "PaymentSuccess" }).href}`,
    },
  });

  if (error) {
    message.value = error.message;
  }

  isLoading.value = false;
}

</script>


<style scoped>

.payment-element {
  max-width: 500px;
  background-color: white;
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  color: white;
  width: 100%;
  padding: 18px;
  font-size: 16px;
  margin-top: 18px;
  background-color: black;
  border-radius: 5px;
  font-weight: 700;
}

button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

button:hover {
  cursor: pointer;
  background-color: #2e2e2e;
}

.payment-message {
  color: red;
  margin-top: 20px;
  text-align: center;
}

.powered-by {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  color: #5d5d5d;
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

</style>
