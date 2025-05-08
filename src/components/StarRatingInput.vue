<template>
  <div class="star-rating-input">
    <img
      v-for="i in 5"
      :key="i"
      :src="i <= hoverValue ? filledStar : emptyStar"
      alt="별점"
      class="star-img"
      @click="selectRating(i)"
      @mouseover="hoverValue = i"
      @mouseleave="hoverValue = currentRating"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);

const currentRating = ref(props.modelValue);
const hoverValue = ref(props.modelValue);

function selectRating(value) {
  currentRating.value = value;
  hoverValue.value = value;
  emit('update:modelValue', value);
}

// 외부 값 변경 감지
watch(
  () => props.modelValue,
  (newVal) => {
    currentRating.value = newVal;
    hoverValue.value = newVal;
  }
);

const filledStar = '/images/kang/star-filled.png';
const emptyStar = '/images/kang/star-empty.png';
</script>

<style scoped>
.star-rating-input {
  display: flex;
  gap: 6px;
  cursor: pointer;
}
.star-img {
  width: 28px;
  height: 28px;
  transition: transform 0.2s;
}
.star-img:hover {
  transform: scale(1.2);
}
</style>
