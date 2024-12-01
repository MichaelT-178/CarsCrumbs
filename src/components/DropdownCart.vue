<template>
  <div 
    class="rectangle-background" 
    :class="{ 'is-visible': visible }"
  >
    <slot>
      <p style="color: black; font-size: 24px;">CART</p>
    </slot>
  </div>
</template>


<script setup>

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

</script>


<style scoped>
.rectangle-background {
  position: absolute;
  top: 100%;
  right: 0;
  width: 175px;
  height: 100px;
  background-color: #FFFF7A;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, visibility 0.3s;
  visibility: hidden;
  opacity: 0;
  margin-right: 2px;
}

.rectangle-background.is-visible {
  visibility: visible;
  opacity: 1;
}

.rectangle-background::after {
  content: '';
  position: absolute;
  top: -9px;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid #FFFF7A;
}

</style>
