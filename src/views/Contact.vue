<template>

	<Header titleText="Contact Us" />

	<div class="contact-container">

	  <!-- Left side -->
	  <div class="form-container">
		<h2 class="contact-title">Contact Us</h2>
		<p class="dm-info">You can also DM us on Instagram <a href="https://www.example.com" class="insta-link" target="_blank">@crumbs</a></p>
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
			<label for="phone">Phone Number<span style="color: #EF0000;"> *</span></label>
			<input 
			  type="phone" 
			  id="phone" 
			  v-model="formData.phone" 
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
		  <p class="info-txt"><span class="material-symbols-outlined purple-icon">location_on</span> Washington Ave 2910</p>
		  <p class="info-txt"><span class="material-symbols-outlined purple-icon">call</span> +1 (704) 999-9999</p>
		  <p class="info-txt"><span class="material-symbols-outlined purple-icon">mail</span> crumbs@gmail.com</p>
		</div>
		<div class="social-section">
		  <h2>Socials</h2>
		  <div class="social-icons">
			<!-- Instagram -->
			<a href="https://instagram.com" target="_blank" class="social-button instagram">
				<img src="/instagram.svg" class="social-icon"/>
			</a>

			<!-- X (Twitter) -->
			<a href="https://twitter.com" target="_blank" class="social-button twitter">
				<img src="/twitter.svg" class="social-icon"/>
			</a>

			<!-- Facebook -->
			<a href="https://facebook.com" target="_blank" class="social-button facebook">
				<img src="/facebook.svg" class="social-icon"/>
			</a>

			<!-- tiktok -->
			<a href="https://tiktok.com" target="_blank" class="social-button tiktok">
				<img src="/tiktok.svg" class="social-icon"/>
			</a>

			<!-- LinkedIn -->
			<a href="https://tiktok.com" target="_blank" class="social-button tiktok">
				<img src="/tiktok.svg" class="social-icon"/>
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
import Header from '../components/Header.vue';

// Email logic
const formData = ref({
	name: '',
	email: '',
	phone: '',
	message: ''
});

const isButtonClicked = ref(false);
const buttonText = ref("Send Message"); 

emailjs.init('bCe2UFI1L7SfXITtA');

const isFormValid = computed(() => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return formData.value.name.trim() !== '' &&
		   formData.value.email.match(emailRegex) &&
		   formData.value.phone.trim() !== '' &&
		   formData.value.message.trim() !== '';
});


const submitForm = () => {
	if (!isFormValid.value) return;
  
	isButtonClicked.value = true;
	buttonText.value = "Sending...";

	const sanitizeHTML = (str) => {
		const whitelist = ['b', 'i', 'em', 'strong', 'u', 'p', 'br', 'ul', 'ol', 'li', 'a'];
		
		return str.replace(/<\/?([a-zA-Z0-9]+)(?:\s[^>]*)?>/g, (match, tagName) => {
			return whitelist.includes(tagName.toLowerCase()) ? match : '';
		});
	};

  const sanitizedMessage = sanitizeHTML(formData.value.message);

	const templateParams = {
		subject: "Message from Cars Crumbs",
		start_message: `"${formData.value.name}" sent you a message on the Cars Crumbs website.`,
		main_message: sanitizedMessage, 
		from_name: formData.value.name,
		from_email: formData.value.email,
		phone_number: formData.value.phone,
		additional_details: "No additional details"
	};

	const serviceID = 'service_feq974e';
	const templateID = 'template_62iha9a';
	
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
	margin-top: -30px;
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

.form-container {
	width: 500px;
	height: 685px;
	border: 1.5px solid purple;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
	background-color: lightskyblue;
}

.info-container {
	width: 500px;
  margin-left: 40px;
  margin-top: 30px;
  background-color: lightgreen;
  border: 1.5px solid purple;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
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
	background-color: #C600C6;
	border-radius: 25px;
}

button.valid:hover {
	background-color: purple;
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

.info-txt {
	color: black;
}

.material-symbols-outlined.purple-icon {
	vertical-align: middle;
	margin-right: 8px;
	color: purple;
}

.social-section, .location-section {
	background-color: Beige;
  border: 1px solid purple;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  box-sizing: border-box;
}

.social-section h2, .location-section h2 {
	margin-top: 0;
}

.social-icons {
	margin-top: 6px;
	display: flex;
	gap: 15px;
}
  
.social-button {
	display: inline-block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: filter 0.175s ease;
}

.social-button:hover {
  filter: brightness(0.8);
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

.social-button.tiktok {
	background-color: black;
}
  
.social-icon {
	width: 30px;
	height: 30px;
	fill: white;
}

.social-button.tiktok .social-icon {
  width: 32px;
  height: 32px;
}
  
.location-section p {
	font-size: 19px;
	margin-bottom: 10px;
	margin-top: 6px;
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

	.info-container {
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

@media (max-width: 400px) {
	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: -20px;
	}
}

</style>
