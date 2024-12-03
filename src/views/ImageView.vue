<template>
  <div v-if="isOpen" class="overlay" @keydown="handleKeydown" tabindex="0">
    <button class="close-btn" @click="closeImageView">
      <div class="icon-container">
        <span class="material-symbols-outlined">close</span>
      </div>
    </button>
    <div class="image-container">
      <div class="image-background">
        <transition name="fade">
          <img :src="imageSrc" alt="Displayed Image" />
        </transition>
        <p v-if="caption" class="caption">{{ caption }}</p>
      </div>
      <button class="nav-btn left" @click="prevImage">
        <span class="material-symbols-outlined chevron">chevron_left</span>
      </button>
      <button class="nav-btn right" @click="nextImage">
        <span class="material-symbols-outlined chevron">chevron_right</span>
      </button>
    </div>
    <div class="controls">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="{'active': index === currentImage}"
        @click="currentImage = index"
      ></button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  images: Array,
  captions: Array,
  initialImage: Number,
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const currentImage = ref(props.initialImage);

const closeImageView = () => {
  emit('close');
};

const imageSrc = computed(() => props.images[currentImage.value]);
const caption = computed(() => props.captions ? props.captions[currentImage.value] : '');

const handleKeydown = (event) => {
  if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key === 'Escape') {
    closeImageView()
  }
};

const nextImage = () => {
  if (currentImage.value < props.images.length - 1) {
    currentImage.value += 1;
  } else {
    currentImage.value = 0;
  }
};

const prevImage = () => {
  if (currentImage.value > 0) {
    currentImage.value -= 1;
  } else {
    currentImage.value = props.images.length - 1;
  }
};

onMounted(() => {
  document.querySelector('.overlay').focus();
});

</script>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1005;
}

.overlay:focus {
  outline: none;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  background: none;
  border: none;
  padding: 0;
  z-index: 1001;
  cursor: pointer;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.1s ease;
}

.icon-container:hover {
  background-color: gray;
}

.icon-container .material-symbols-outlined {
  font-size: 24px;
  color: white;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; 
}

.image-container img {
  max-width: 100%;
  height: 80vh;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn.left {
  left: 40px;
}

.nav-btn.right {
  right: 40px;
}

.nav-btn:hover {
  background-color: gray;
}

.chevron {
  font-size: 40px;
  color: white;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 8px;
}

.controls button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: grey;
  cursor: pointer;
}

.controls button.active {
  background-color: white;
}

.caption {
  color: #999;
  margin-top: 10px;
  text-align: center;
  font-size: 16.5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 680px) {
  .image-container img {
    max-width: 400px;
    height: 60vh;
  }

  .nav-btn.left {
    left: 20px;
  }
  
  .nav-btn.right {
    right: 20px;
  }

  .close-btn {
    right: 20px;
  }

  .icon-container {
    width: 30px;
    height: 30px;
  }

  .icon-container .material-symbols-outlined {
    font-size: 20px;
  }

}

@media (max-width: 420px) {
  .nav-btn.left {
    left: 0px;
  }
  
  .nav-btn.right {
    right: 0px;
  }
}

</style>
