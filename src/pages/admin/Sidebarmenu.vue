<script setup>
defineProps({
  title: String,
  activeItem: String,
  items: Array, // { icon?: String, label: String, value: String } 형태의 배열
});
</script>

<template>
  <div class="w-full">
    <div class="h-10 px-6 flex items-center text-gray-200 text-xs font-medium">
      {{ title }}
    </div>
    <div
      v-for="item in items"
      :key="item.value"
      @click="item.route && $router.push(item.route)"
      :class="[
        'h-11 px-6 flex items-center gap-2.5 relative text-gray font-semibold hover:bg-[#FBFBFB] hover:border-l-[3px]	 hover:border-manager hover:font-bold hover:text-manager cursor-pointer',
      ]">
      <div class="w-5 h-5 bg-zinc-300 rounded-sm"></div>
      <span class="text-sm font-semibold">{{ item.label }}</span>
    </div>
  </div>
</template>
