<template>
  <div class="circle-wrapper">
		<img class="circle" :src="WordPressCircle" alt="Circle" />
		<hr class="circle-line" />
	</div>

	<p class="title">{{ titleText }}</p>
</template>


<script setup>
import WordPressCircle from "../assets/other/WordPressCircle.png";

const props = defineProps({
  titleText: {
    type: String,
    required: false
  }
});

</script>


<style scoped>

.circle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 375px;
  min-width: 230px;
  margin: 20px auto;
}

.circle {
  width: 40px;
  height: auto;
  margin-bottom: 10px;
	top: -100px;
	z-index: 1;
}

.circle-line {
  position: absolute;
  top: 43%;
  left: 0;
  width: 100%;
  height: 1px;
	border-width: 0px;
  background-color: #ACACAC;
  z-index: 0;
}

.title {
  color: #1a1c1e;
  font-family: Georgia, serif;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin-top: 0;
  padding-bottom: 20px;
  margin-top: -15px;
}

@media (max-width: 420px) {
  .circle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 275px;
    min-width: 230px;
    margin: 20px auto;
  }
}

</style>
