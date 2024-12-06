<template>
  <div class="menu-rating">
    <span v-for="star in 5" :key="star" class="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="star-icon"
      >
        <defs>
          <linearGradient :id="'partial-fill-' + star">
            <stop
              v-if="star === Math.ceil(rating) && rating % 1 !== 0"
              :offset="getGradientOffset(rating % 1)"
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
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  showNumber: {
    type: Boolean,
    default: true,
  },
});

const getStarFill = (star) => {
  if (props.rating === 5) {
    return "#ebc801";
  }

  if (star < Math.ceil(props.rating)) {
    return "#ebc801";
  }
  
  if (star === Math.ceil(props.rating) && props.rating % 1 !== 0) {
    return `url(#partial-fill-${star})`;
  }

  return "#c9c9c9";
};


const getGradientOffset = (fraction) => `${fraction * 100}%`;

const formattedRating = computed(() => props.rating.toFixed(1));

</script>


<style scoped>
.menu-rating {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.star-icon {
  width: 18px;
  height: 18px;
  margin-right: 2px;
}

.rating-value {
  font-size: 14px;
  margin-left: 4px;
  font-weight: 600;
  color: #414141;
}
</style>
