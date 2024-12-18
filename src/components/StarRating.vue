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
          <linearGradient :id="'partial-fill-' + star">
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

// Props
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

// Emit function
const emit = defineEmits(['update:modelValue']);

// Reactive state
const emittedRating = ref(props.rating); // Stores the current rating
const hoverRating = ref(0); // Stores the hovered star rating

// Computed values
const displayedRating = computed(() => hoverRating.value || emittedRating.value); // Determines the rating to display
const formattedRating = computed(() => displayedRating.value.toFixed(1)); // Formats the displayed rating to 1 decimal place

// Functions
const getStarFill = (star) => {
  const ratingToUse = hoverRating.value || emittedRating.value;

  if (star <= Math.floor(ratingToUse)) {
    return "#ebc801"; // Full yellow
  }

  if (star === Math.ceil(ratingToUse) && ratingToUse % 1 !== 0) {
    return `url(#partial-fill-${star})`; // Partial fill for fractional ratings
  }

  return "#c9c9c9"; // Grey for unselected stars
};

const getGradientOffset = (fraction) => `${fraction * 100}%`;

// Event handlers
const hoverStar = (star) => {
  if (props.editable) {
    hoverRating.value = star; // Update hover rating
  }
};

const resetHover = () => {
  hoverRating.value = 0; // Clear hover rating
};

const selectStar = (star) => {
  if (props.editable) {
    emittedRating.value = star; // Set the selected rating
    emit('update:modelValue', star); // Emit the selected rating
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
