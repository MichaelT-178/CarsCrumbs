<template>
	<div class="contact-container">

	  <!-- Left side -->
	  <div class="form-container">
		<h2 class="contact-title">Contact Us</h2>
		<p class="dm-info">You can also DM us on Instagram @crumbs</p>
		<form @submit.prevent="submitForm">
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
			<label for="message">Message<span style="color: #EF0000;"> *</span></label>
			<textarea 
			  id="message" 
			  v-model="formData.message" 
			  required
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
  
	  <!-- Right side -->
	  <div class="info-container">
		<h2>Contact Information</h2>
		<iframe
		  class="google-map"
		  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4201966716735!2d-78.64050328477353!3d35.78774388017742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5a18f4f02f3%3A0x9208f71f4a8e7dbd!2sRaleigh%2C%20NC%2C%20USA!5e0!3m2!1sen!2s!4v1691580041601!5m2!1sen!2s"
		  width="100%"
		  height="250"
		  allowfullscreen=""
		  loading="lazy"
		  referrerpolicy="no-referrer-when-downgrade"
		></iframe>
		<div class="contact-info">
		  <p><span class="material-symbols-outlined purple-icon">location_on</span> Washington Ave 2910</p>
		  <p><span class="material-symbols-outlined purple-icon">call</span> +1 (704) 999-9999</p>
		  <p><span class="material-symbols-outlined purple-icon">mail</span> crumbs@gmail.com</p>
		</div>
		<div class="social-section">
		  <h2>Socials</h2>
		  <div class="social-icons">
			<!-- Instagram -->
			<a href="https://instagram.com" target="_blank" class="social-button instagram">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="social-icon">
				<path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"/>
			  </svg>
			</a>
			<!-- X (Twitter) -->
			<a href="https://twitter.com" target="_blank" class="social-button twitter">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="social-icon">
				<path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.29 4.29 0 0 0 1.88-2.36 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.91 12.16 12.16 0 0 1-8.83-4.48 4.27 4.27 0 0 0 1.33 5.72c-.63-.02-1.23-.19-1.75-.47v.05a4.27 4.27 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.97A8.58 8.58 0 0 1 2 18.49 12.1 12.1 0 0 0 8.19 20c7.55 0 11.67-6.26 11.67-11.68 0-.18 0-.35-.01-.53a8.32 8.32 0 0 0 2.04-2.11z"/>
			  </svg>
			</a>
			<!-- Facebook -->
			<a href="https://facebook.com" target="_blank" class="social-button facebook">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="social-icon">
				<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54v-2.2c0-2.52 1.48-3.91 3.74-3.91 1.08 0 2.21.19 2.21.19v2.44h-1.24c-1.23 0-1.61.76-1.61 1.54v1.94h2.73l-.44 2.89h-2.29v6.99C18.34 21.12 22 16.99 22 12z"/>
			  </svg>
			</a>
		  </div>
		</div>
		<div class="location-section">
		  <h2>Location</h2>
		  <p>We currently do not have a physical storefront. For pick up and drop off options, please message us.</p>
		</div>
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

const formData = ref({
	name: '',
	email: '',
	message: ''
});

const isButtonClicked = ref(false);
const buttonText = ref("Send Message"); 

emailjs.init('bCe2UFI1L7SfXITtA');

const isFormValid = computed(() => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return formData.value.name.trim() !== '' &&
		   formData.value.email.match(emailRegex) &&
		   formData.value.message.trim() !== '';
});


const submitForm = () => {
	if (!isFormValid.value) return;
  
	isButtonClicked.value = true;
	buttonText.value = "Sending...";
  
	const templateParams = {
		from_name: formData.value.name,
		from_email: formData.value.email,
		message: formData.value.message,
	};
  
	const serviceID = 'service_feq974e';
	const templateID = 'template_cowiwh7';
	
	emailjs.send(serviceID, templateID, templateParams)
		.then((response) => {
			Swal.fire('Sent!', 'Your message has been sent successfully!', 'success');
			formData.value.name = '';
			formData.value.email = '';
			formData.value.message = '';
			return response;
	  	})
		.catch((err) => {
			Swal.fire('Error!', 'Something went wrong when sending your message! See console.', 'error');
			console.error('Failed to send email:', err);
			throw err;
		})
		.finally(() => {
			isButtonClicked.value = false;
			buttonText.value = 'Submit';
		})
};

</script>


<style scoped>
.contact-container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	padding: 40px;
	box-sizing: border-box;
	flex-wrap: wrap;
}

.form-container {
	width: 500px;
	height: 600px;
	border: 1px solid purple;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
	background-color: lightskyblue;
}

.info-container {
	width: 500px;
	margin-left: 40px;
	margin-top: 30px;
}

.google-map {
	border-radius: 10px;
	margin-bottom: 15px;
	margin-top: 10px;
	border: 1px solid black;
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

.form-group input,
.form-group textarea {
	width: 100%;
	padding: 8px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 6px;
	box-sizing: border-box;
}

#message {
	width: 100%;
	height: 200px;
	border-radius: 6px;
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
	background-color: rgb(0, 68, 255);
	border-radius: 25px;
}

button.valid:hover {
	background-color: darkblue;
	border-radius: 25px;
}

button.clicked {
	background-color: #00A643;
	border-radius: 25px;
}

.contact-info {
	margin-bottom: 20px;
}

.contact-info p {
	margin: 10px 0;
	font-size: 18px;
}

.material-symbols-outlined.purple-icon {
	vertical-align: middle;
	margin-right: 8px;
	color: purple;
}

.social-section {
	text-align: left;
}
  
.social-section h2 {
	margin-top: 30px;
	margin-bottom: 10px;
}
  
.social-icons {
	display: flex;
	gap: 10px;
}
  
.social-button {
	display: inline-block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
  
.social-button.instagram {
	background-color: #F00075;
}
  
.social-button.twitter {
	background-color: #1DA1F2;
}
  
.social-button.facebook {
	background-color: #0866FF;
}
  
.social-icon {
	width: 30px;
	height: 30px;
	fill: white;
}
  
.location-section {
	margin-top: 10px;
}
  
.location-section h2 {
	margin-top: 30px;
}
  
.location-section p {
	font-size: 19px;
	margin-bottom: 10px;
	margin-top: 8px;
}
  
.bottom-section {
	background-color: #F3E7A4;
	text-align: center;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-section p {
	font-size: 17px;
}

@media (max-width: 940px) {
	.contact-container {
		flex-direction: column;
		align-items: center;
	}
	
	.info-container {
		margin-left: 0;
		margin-top: 30px;
	}
}

@media (max-width: 575px) {
	.contact-container {
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}
	
	.form-container {
		width: 100%;
		max-width: 90%;
		margin: 0 auto;
		margin-top: 15px;
	}
	
	.bottom-section {
		margin-top: 10px;
	}
}

</style>
  