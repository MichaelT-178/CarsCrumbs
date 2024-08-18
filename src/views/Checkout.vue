<template>
  <div class="checkout-container">

    <!-- Left side: Check Out-->
    <div class="form-container">
      <h2 class="contact-title">Check Out</h2>
      <p class="dm-info">
        You can also DM us on Instagram
        <a href="https://www.example.com" class="insta-link" target="_blank">@crumbs</a>
      </p>
      <form @submit.prevent="submitForm">
        <!-- Form fields -->
        <div class="form-group">
          <label for="name">Name<span style="color: #EF0000;"> *</span></label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="email">Email<span style="color: #EF0000;"> *</span></label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number<span style="color: #EF0000;"> *</span></label>
          <input 
            type="phone" 
            id="phone" 
            v-model="formData.phone" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="pickup-time">Pickup Time<span style="color: #EF0000;"> *</span></label>
          <select id="pickup-time" v-model="formData.pickupTime" required>
            <option disabled value="">Select a time slot</option>
            <option>3:00pm - 4:00pm</option>
            <option>4:00pm - 5:00pm</option>
            <option>5:00pm - 6:00pm</option>
            <option>6:00pm - 7:00pm</option>
          </select>
        </div>
        <div class="form-group">
          <label for="details">Additional Details</label>
          <textarea 
            id="details" 
            v-model="formData.details" 
          ></textarea>
        </div>
        <div class="button-container">
          <button 
            type="submit" 
            :disabled="!isFormValid" 
            :class="{
              'valid': isFormValid && !isButtonClicked, 
              'clicked': isButtonClicked, 
              'default': !isFormValid && !isButtonClicked
            }"
          >
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>

    <!-- Right side: Order Summary -->
    <div class="order-summary">
      <h2 class="summary-title">Order Summary</h2>
      <div class="item-list">
        <ItemCard v-for="item in cart.items" :key="item.id" :item="item" />
      </div>
      <div class="venmo-container">
        <a v-if="!isButtonClicked" 
           class="gray-venmo-btn"
           target="_blank">
           <img :src="GrayVenmoLogo" alt="Logo" class="venmo-logo" />
           Pay Us On Venmo
        </a>
        <a v-else 
           href="https://venmo.com/johndoe?txn=pay&amount=15.00"
           class="venmo-btn"
           target="_blank">
           <img :src="VenmoLogo" alt="Logo" class="venmo-logo" />
           Pay Us On Venmo
        </a>
      </div>
      <p class="clear-cart" @click="deleteCart">Clear Cart</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import VenmoLogo from "../assets/Venmo.png";
import GrayVenmoLogo from "../assets/GrayVenmo.png";
import ItemCard from "../components/ItemCard.vue";
import { useCartStore } from "../stores/cart.js";

const cart = useCartStore();

const formData = ref({
  name: '',
  email: '',
  phone: '',
  pickupTime: '',
  details: ''
});

const isButtonClicked = ref(false);
const buttonText = ref("Send Message");

emailjs.init('bCe2UFI1L7SfXITtA');

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formData.value.name.trim() !== '' &&
         formData.value.email.match(emailRegex) &&
         formData.value.phone.trim() !== '' && 
         formData.value.pickupTime !== '';
});

const sanitizeHTML = (str) => {
  const whitelist = ['b', 'i', 'em', 'strong', 'u', 'p', 'br', 'ul', 'ol', 'li', 'a'];
  
  return str.replace(/<\/?([a-zA-Z0-9]+)(?:\s[^>]*)?>/g, (match, tagName) => {
    return whitelist.includes(tagName.toLowerCase()) ? match : '';
  });
};

const sanitizedOrderSummary = sanitizeHTML(cart.getCartDetails());

const submitForm = () => {
  if (!isFormValid.value) return;

  buttonText.value = "Sending...";

  const templateParams = {
    subject: "Order for Cars Crumbs",
    start_message: `A person named "${formData.value.name}" made a purchase at Cars Crumbs.`,
    main_message: sanitizedOrderSummary, 
    from_name: formData.value.name,
    from_email: formData.value.email,
    pickup_time: `Pickup time is between: <b>${formData.value.pickupTime}</b>`,
    phone_number: formData.value.phone,
    additional_details: formData.value.details || "No additional details"
  };

  const serviceID = 'service_feq974e';
  const templateID = 'template_62iha9a';

  emailjs.send(serviceID, templateID, templateParams)
    .then((response) => {
      Swal.fire({
        title: 'Sent!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonText: 'Close',
        showCancelButton: true,
        cancelButtonText: 'Download Receipt',
        cancelButtonColor: '#FFAA5E',
        reverseButtons: true,
        customClass: {
          actions: 'swal2-actions-custom',
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Hello");
        }
      }); 

      isButtonClicked.value = true;
      formData.value.name = '';
      formData.value.email = '';
      formData.value.phone = '';
      formData.value.details = '';
      formData.value.pickupTime = '';
      return response;
    })
    .catch((err) => {
      Swal.fire('Error!', 'Something went wrong when sending your message! See console.', 'error');
      console.error('Failed to send email:', err);
      throw err;
    })
    .finally(() => {
      isButtonClicked.value = true;
      buttonText.value = 'Submit';
    });
};

const deleteCart = () => {
  console.log('Delete');
};

</script>


<style>
/* Styles need to be Global to work in the alert */

.swal2-actions-custom {
  display: flex;
  flex-direction: column;
}

.swal2-actions-custom .swal2-confirm {
  order: 2;
}

.swal2-actions-custom .swal2-cancel {
  order: 1;
  margin-bottom: 10px;
}

</style>


<style scoped>

.checkout-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.form-container {
	width: 500px;
	height: 685px;
	border: 1.5px solid purple;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
	background-color: #FFE4E6;
}

.contact-title {
	margin-bottom: 8px;
}

.dm-info {
	font-size: 16px;
	margin-bottom: 20px;
}

.form-group {
	margin-bottom: 30px;
}

.form-group label {
	display: block;
	margin-bottom: 5px;
}

.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-group input,
.form-group textarea {
	width: 100%;
	padding: 8px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 6px;
	box-sizing: border-box;
}

.form-group textarea {
	height: 100px;
}

.insta-link {
	color: purple;
	text-decoration: none;
}

.insta-link:hover {
	color: #610061;
	text-decoration: underline;
}

.insta-link:active {
	color: #D400D4;
}

.button-container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: -5px;
}

button {
	width: 80%;
	color: white;
	cursor: pointer;
	border: none;
	padding: 11px 40px;
	margin-top: 5px;
	font-size: 16.5px;
	border-radius: 25px;
}

button.default {
	background-color: gray;
	border-radius: 25px;
}

button.valid {
	background-color: #3FC76C;
	border-radius: 25px;
}

button.valid:hover {
	background-color: #179140;
	border-radius: 25px;
}

button.clicked {
	background-color: #00B7FF;
	border-radius: 25px;
}

.order-summary {
  width: 500px;
  margin-left: 40px;
  margin-top: 30px;
  background-color: lightgreen;
  border: 1.5px solid purple;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.summary-title {
  margin-bottom: 15px;
  font-size: 24px;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.venmo-container {
  margin-top: 20px;
}

.gray-venmo-btn {
  display: inline-flex;
  align-items: center;
  background-color: #808080;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-family: Arial, sans-serif;
  text-decoration: none;
  transition: background-color 0.3s ease, filter 0.3s ease;
}

.venmo-btn {
  display: inline-flex;
  align-items: center;
  background-color: #008AFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-family: Arial, sans-serif;
  text-decoration: none;
  transition: background-color 0.3s ease, filter 0.3s ease;
}

.venmo-logo {
  margin-right: 8px;
  width: 28px;
  height: auto;
}

.clear-cart {
  margin-top: 15px;
  color: red;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
}

.clear-cart:hover {
  color: #D10606;
  text-decoration: underline;
}

.clear-cart:active {
  color: darkred;
  text-decoration: none;
}

</style>
