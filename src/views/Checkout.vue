<template>

  <Header titleText="Checkout" />

  <div class="checkout-container">
    
    <!-- Left side: Check Out-->
    <div class="form-container">
      <h2 class="contact-title">Check Out</h2>
      <p class="dm-info">
        You can also DM us on Instagram
        <a href="https://ig.me/m/cars.crumbs" class="insta-link" target="_blank">@cars.crumbs</a>
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
          <label for="pickup-date">Pickup Date<span style="color: #EF0000;"> *</span></label>
          <Datepicker 
            v-model="formData.pickupDate" 
            id="pickup-date" 
            :required="true"
            :enable-time="false" 
            :month-change-on-scroll="false"
            :enable-time-picker="false"
            format="MM-dd-yyyy"
            auto-apply
            :min-date="minPickupDate"
            :max-date="new Date(new Date().getFullYear(), 11, 31)"
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
          <label for="notes">Additional Notes</label>
          <textarea 
            id="notes" 
            v-model="formData.notes" 
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
      <p>{{ cart.getItemCount() }} Items</p>

      <div class="item-list">
        <div 
          v-for="item in cart.getItems()" 
          :key="item.id"
        >
          <ItemCard :item="item"></ItemCard>
        </div>
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
      <p class="clear-cart" @click="deleteCart">Reset Cart</p>
    </div>
  </div>
  <div class="bottom-section">
	  <p>Copyright © 2024 Beanie Boo. All Rights Reserved.</p>
	</div>
</template>


<script setup>
import { ref, computed } from 'vue';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import VenmoLogo from "../assets/logos/Venmo.png";
import GrayVenmoLogo from "../assets/logos/GrayVenmo.png";
import Header from "../components/Header.vue";
import { useCartStore } from "../stores/cart.js";
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import ItemCard from '../components/ItemCard.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const cart = useCartStore();
const router = useRouter();

// Min pickup date will be days after current date 
// If date is 8-21 min-pickup will be 8-23
const calculateMinDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  return today;
}

const minPickupDate = ref(calculateMinDate());

const formData = ref({
  name: '',
  email: '',
  phone: '',
  pickupTime: '',
  pickupDate: '',
  notes: ''
});

const isButtonClicked = ref(false);
const buttonText = ref("Place Order");

emailjs.init('bCe2UFI1L7SfXITtA');

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formData.value.name.trim() !== '' &&
         formData.value.email.match(emailRegex) &&
         formData.value.phone.trim() !== '' && 
         formData.value.pickupTime !== '' &&
         formData.value.pickupDate !== '';
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

  const formValues = formData.value;
  
  //08-22-2024 becomes Thursday, August 22nd
  const formattedDate = format(formValues.pickupDate, 'EEEE, MMMM do');

  const templateParams = {
    subject: "Order for Cars Crumbs",
    start_message: `A person named "${formValues.name}" made a purchase at Cars Crumbs.`,
    main_message: sanitizedOrderSummary, 
    from_name: formValues.name,
    from_email: formValues.email,
    pickup_time: `<b><u>Pickup time</u></b>: Between <b>${formValues.pickupTime}</b> on <u><i>${formattedDate}</i></u>.`,
    phone_number: formValues.phone,
    additional_details: formValues.notes || "No additional details"
  };

  const serviceID = 'service_feq974e';
  const templateID = 'template_62iha9a';

  emailjs.send(serviceID, templateID, templateParams)
    .then((response) => {
      Swal.fire({
        title: 'Sent!',
        text: 'Your order has been sent to Cars Crumbs!',
        icon: 'success',
        confirmButtonText: 'Close',
        confirmButtonColor: '#FF4141', //red
        showCancelButton: true,
        cancelButtonText: 'Download Receipt',
        cancelButtonColor: '#7066e0', //Orange: #FFAA5E
        reverseButtons: true,
        customClass: {
          actions: 'swal2-actions-custom',
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          downloadReceiptPDF()
        }
      }); 

      isButtonClicked.value = true;
      formData.value.name = '';
      formData.value.email = '';
      formData.value.phone = '';
      formData.value.notes = '';
      formData.value.pickupTime = '';
      formData.value.pickupDate = '';
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

//Returns 8-14 if August 14th
function getReceiptDate() {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth returns 0-11 so add 1
  const day = now.getDate();

  return `${month}-${day}`;
}

function downloadReceiptPDF() {
  const element = document.createElement('div');

  //Wednesday, August 21st
  const formattedDate = format(Date.now(), 'EEEE, MMMM do');

  element.innerHTML = cart.getCartDetails(formattedDate);

  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: `CarsCrumbsReceipt${getReceiptDate()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .save();
}


function deleteCart() {
  cart.resetCart();

  const goBackToHome = confirm('Your cart has been cleared. Do you want to go back to the home page?');

  if (goBackToHome) {
    router.push({ path: '/' });
  }
};

</script>


<style>
/* Styles need to be Global to work in the alert */

.swal2-actions-custom {
  margin-top: 6px;
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
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin-top: -25px;
}

.form-container {
  width: 500px;
  height: 785px;
  border: 1.5px solid purple;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #FFE4E6;
  margin-bottom: 30px; 
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

.form-group select,
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
  resize: none;
  font-family: arial;
  color: black;
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
  margin-top: -5px;
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

.item-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;

  /* flex-wrap: wrap; */
  gap: 10px;
}

.venmo-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.gray-venmo-btn,
.venmo-btn {
  display: inline-flex;
  align-items: center;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-family: Arial, sans-serif;
  text-decoration: none;
  transition: background-color 0.3s ease, filter 0.3s ease;
}

.gray-venmo-btn {
  background-color: #808080;
}

.venmo-btn {
  background-color: #008AFF;
}

.venmo-btn:hover {
  filter: brightness(0.7);
}

.venmo-btn:active {
  filter: brightness(0.9);
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

.bottom-section {
	background-color: #F3E7A4;
	text-align: center;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-section p {
	font-size: 17px;
}

@media (max-width: 940px) {
  .checkout-container {
    flex-direction: column;
    align-items: center;
  }
  
  .order-summary {
    margin-left: 0;
    margin-top: 30px;
  }
}

@media (max-width: 575px) {
	.checkout-container {
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}

	.order-summary {
		width: 100%;
		max-width: 90%;
	}
	
	.form-container {
		width: 100%;
		max-width: 90%;
		margin: 0 auto;
		margin-top: 35px;
	}
	
	.bottom-section {
		margin-top: 20px;
	}
}

</style>

