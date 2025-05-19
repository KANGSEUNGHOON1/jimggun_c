<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

defineProps({
  title: String,
  items: Array, // [{ label, value, route, icon, iconHover }]
})

const hoveredItem = ref(null)

// hover 또는 현재 라우터 경로가 일치하면 true
const isHoveredOrActive = (item) => {
  const value = item.value || item.label
  return hoveredItem.value === value || route.path === item.route
}
</script>

<template>
  <div class="w-full">
    <div class="h-10 px-6 flex items-center text-gray-200 text-xs font-medium dark:text-dark-200">
      {{ title }}
    </div>

    <div
      v-for="item in items"
      :key="item.value || item.label"
      @click="item.route && router.push(item.route)"
      @mouseover="hoveredItem = item.value || item.label"
      @mouseleave="hoveredItem = null"
      :class="[
        'h-11 px-6 flex items-center gap-2.5 relative border-l-[3px]  cursor-pointer',
        isHoveredOrActive(item)
          ? 'bg-[#FBFBFB] border-manager text-manager dark:bg-dark-200'
          : 'border-white text-gray dark:text-dark-font-100 dark:border-dark-100'
      ]"
    >
      <img
        :src="isHoveredOrActive(item) ? item.iconHover || item.icon : item.icon"
        alt="icon"
        class="w-6 h-6 object-contain"
      />
      <span class="text-[15px] font-">{{ item.label }}</span>
    </div>
  </div>
</template>
