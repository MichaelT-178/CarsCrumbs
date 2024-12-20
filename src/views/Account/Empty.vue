<template>
  <div class="no-results">
    <img :src="ShrugGuy" alt="No Results" />
    <p class="msg">{{ message }}</p>
    <router-link to="/order" class="add-button">{{ buttonText }}</router-link>
  </div>
</template>


<script setup>
import ShrugGuy from "../../assets/other/Shrug.png";

defineProps({
  message: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});
</script>


<style scoped>
.title {
  color: orange;
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
}

.no-results {
  margin-top: 20px;
  text-align: center;
}

.no-results img {
  max-width: 500px;
  max-height: 500px;
  margin-bottom: 0;
  border: 1px solid black;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -10px;
}

.no-results p {
  font-size: 21px;
  color: #555;
}

.msg {
  width: 400px;
  font-size: 22px;
  margin: 0 auto;
  text-align: center;
}

.add-button {
  margin-top: 10px;
  display: inline-block;
  padding: 10px 20px;
  width: 200px;
  background-color: #005B5B;
  color: white;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 50px;
  font-size: 22px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #004949;
}

.add-button:active {
  background-color: #00D5D5;
}

</style>
