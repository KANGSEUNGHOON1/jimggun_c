<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  title: String,
  items: Array, // [{ label, value?, route?, icon, iconHover, darkIcon }]
})

const hoveredItem = ref(null)

// 다크모드 감지
const isDark = ref(document.documentElement.classList.contains('dark'))
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

onMounted(() => {
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => observer.disconnect())

// 아이콘 결정 함수
const getIcon = (item) => {
  const key = item.value || item.label
  const isActive = hoveredItem.value === key || route.path === item.route

  if (isActive) {
    return item.iconHover || item.icon
  } else {
    return isDark.value ? (item.darkIcon || item.icon) : item.icon
  }
}
</script>

<template>
  <div class="w-full">
    <!-- 섹션 타이틀 -->
    <div class="h-10 px-6 flex items-center text-gray-200 text-xs font-medium dark:text-dark-font-300">
      {{ title }}
    </div>

    <!-- 메뉴 항목 -->
    <div
      v-for="item in items"
      :key="item.value || item.label"
      @click="item.route && router.push(item.route)"
      @mouseover="hoveredItem = item.value || item.label"
      @mouseleave="hoveredItem = null"
      :class="[
        'h-11 px-6 flex items-center gap-2.5 relative border-l-[3px] cursor-pointer',
        hoveredItem === (item.value || item.label) || route.path === item.route
          ? 'bg-[#FBFBFB] border-manager text-manager dark:bg-dark-200'
          : 'border-white text-gray dark:text-dark-font-100 dark:border-dark-100'
      ]"
    >
      <img
        :src="getIcon(item)"
        alt="icon"
        class="w-6 h-6 object-contain"
      />
      <span class="text-[15px]">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped></style>
