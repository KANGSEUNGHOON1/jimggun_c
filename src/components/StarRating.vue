<template>
  <div class="star-rating">
    <img v-for="i in 5" :key="i" :src="i <= rating ? filledStar : emptyStar" alt="별점" class="star-img" />
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
  },
});

const filledStar = "/images/kang/star-filled.png";
const emptyStar = "/images/kang/star-empty.png";
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 4px;
}

.star-img {
  width: 20px;
  height: 20px;
}
</style>
