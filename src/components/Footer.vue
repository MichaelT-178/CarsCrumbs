<template>
  <footer class="footer-section">
    <div class="footer-left">
      <h2>Visit Us</h2>
      <div class="google-map">
        <iframe
          :src="googleMapSource"
          width="230"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p class="details">Raleigh, North Carolina</p>
      <p class="details">(555) 555-5555</p>
    </div>
    <div class="footer-right">
      <h2>Contact Us</h2>
      <div class="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
          <img src="/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.svg" alt="Facebook" />
        </a>
      </div>
      <router-link to="/ContactUs" class="contact-button">Contact Us</router-link>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Cars Crumbs | Developed by <a :href="linkedin" target="_blank" class="linkedin-link">Michael Totaro</a></p>
    </div>
  </footer>
</template>


<script setup>

const googleMapSource = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7267022300417!2d-78.63817868497424!3d35.77959038016714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf49f978e8e1d%3A0x49703a4629c8b82c!2sRaleigh%2C%20NC!5e0!3m2!1sen!2sus!4v1690386741592!5m2!1sen!2sus";
const linkedin = "https://www.linkedin.com/in/michael-totaro-72857722a/";

</script>


<style scoped>

.footer-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #F3E7A4;
  padding: 20px;
}

.footer-left,
.footer-right {
  flex: 1 1 45%;
  text-align: center;
}

.footer-left h2,
.footer-right h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.google-map {
  margin-bottom: 10px;
}

.social-icons img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
}

.contact-button {
  display: inline-block;
  padding: 8px 44px;
  margin-top: 10px;
  background-color: darkblue;
  color: white;
  font-size: 22px;
  text-decoration: none;
  border-radius: 5px;
}

.contact-button:hover {
  background-color: #555;
}

.footer-bottom {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
}

.linkedin-link {
  color: #0000D8;
  text-decoration: none;
}

.details {
  font-size: 1rem;
  font-weight: 600px;;
  padding-bottom: 5px;
  /* font-family: "Josefin Sans", sans-serif; */
}

.linkedin-link:hover {
  color: darkblue;
  text-decoration: underline;
}

@media (max-width: 458px) {
  .footer-right h2 {
    margin-top: 30px;
  }
}

</style>
