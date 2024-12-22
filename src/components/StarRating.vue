<template>
  <div
    class="menu-rating"
    @mouseleave="resetHover"
  >
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      @mouseover="hoverStar(star)"
      @click="selectStar(star)"
      :style="{ cursor: editable ? 'pointer' : 'default' }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="star-icon"
        :style="{ width: `${starSize}px`, height: `${starSize}px` }"
      >
        <defs>
          <linearGradient :id="'partial-fill-' + star + '-' + uniqueId">
            <stop
              v-if="star === Math.ceil(displayedRating) && displayedRating % 1 !== 0"
              :offset="getGradientOffset(displayedRating % 1)"
              stop-color="#ebc801"
            />
            <stop offset="0%" stop-color="#c9c9c9" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          :fill="getStarFill(star)"
        />
      </svg>
    </span>
    <span v-if="showNumber" class="rating-value">{{ formattedRating }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// EXPLANATION BELOW at the bottom of the file
const uniqueId = `star-rating-${Math.random().toString(36).slice(2, 11)}`;

const props = defineProps({
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  showNumber: {
    type: Boolean,
    default: true,
  },
  starSize: {
    type: Number,
    default: 18,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const emittedRating = ref(props.rating); 
const hoverRating = ref(0); 

const displayedRating = computed(() => hoverRating.value || emittedRating.value); 
const formattedRating = computed(() => displayedRating.value.toFixed(1)); 

const getStarFill = (star) => {
  const ratingToUse = hoverRating.value || emittedRating.value;

  if (star <= Math.floor(ratingToUse)) {
    return "#ebc801"; // Full yellow
  }

  if (star === Math.ceil(ratingToUse) && ratingToUse % 1 !== 0) {
    return `url(#partial-fill-${star}-${uniqueId})`; // Partial fill for fractional ratings
  }

  return "#c9c9c9";
};

const getGradientOffset = (fraction) => `${fraction * 100}%`;

const hoverStar = (star) => {
  if (props.editable) {
    hoverRating.value = star; 
  }
};

const resetHover = () => {
  hoverRating.value = 0; 
};

const selectStar = (star) => {
  if (props.editable) {
    emittedRating.value = star;
    emit('update:modelValue', star);
  }
};

</script>


<style scoped>
.menu-rating {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.star-icon {
  margin-right: 2px;
}

.rating-value {
  font-size: 14px;
  margin-left: 4px;
  font-weight: 600;
  color: #414141;
}

</style>

<!-- The issue with the second StarRating component not showing the fractional 
rating (4.5) correctly likely stems from how Vue's reactivity and 
updates are handled. Specifically, the linearGradient element in the 
SVG is dynamic and relies on the :id and :offset bindings to create 
the fractional star. However, SVG elements in Vue often require 
careful handling to ensure their updates propagate correctly.

Here’s a breakdown of what might be causing the problem:

1. Dynamic id Binding Conflict
The id for the linearGradient element is dynamically generated as 'partial-fill-' + star. 
This can result in duplicate id values when there are multiple StarRating 
components on the page. SVG defs require unique id values for gradients to work properly. -->
