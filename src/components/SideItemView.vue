<template>
  <div class="side-content">
    <button class="close-btn" @click="handleClose">X</button>
    <h2>{{ item.Name }}</h2>
  </div>
</template>


<script setup>
const props = defineProps({
  item: Object
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>


<style scoped>
.side-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: gray;
}

h2 {
  font-size: 24px;
  margin: 0;
}

@media (max-width: 680px) {
  .side-content {
    width: 100%;
  }

  .close-btn {
    right: 10px;
  }
}

</style>
