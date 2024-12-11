<template>
  <p class="title">User Reviews</p>

	<div v-if="true">
		<NoItems 
			message="You haven't left any reviews yet! Go buy something and leave a review!"
			buttonText="Order Now">
		</NoItems>
	</div>
	<div v-else>
		 
	</div>


</template>


<script setup>
import NoItems from "./Empty.vue";

</script>


<style scoped>

.title {
	color: green;
	font-family: Arial, sans-serif;
	margin-bottom: 10px;
	font-size: 34px;
	font-weight: 800;
}

</style>