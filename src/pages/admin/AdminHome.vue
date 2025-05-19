<template>
  <div
    class="max-w-[1920px] m-0 grid grid-cols-[220px_auto] grid-rows-[74px_auto] [grid-template-areas:'header_header''aside_main'] gap-y-[10px] bg-gray-100 dark:bg-dark">
    <header
      class="[grid-area:header] bg-white dark:bg-dark-100 flex pr-[32px]">
      <div
        class="w-[220px] text-2xl flex items-center justify-center font-bold text-black dark:text-white">
        Jimggun
      </div>

      <div class="flex-1 flex items-center justify-end">
        <!-- ✅ 다크모드 토글 버튼 -->
        <button
          @click="toggleDark"
          aria-label="다크모드 토글"
          class="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300">
          <span
            class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
            :class="{ 'translate-x-6': isDark }">
          </span>
        </button>
      </div>
    </header>

    <aside
      class="[grid-area:aside] bg-white dark:bg-dark-100 rounded-tl-10 rounded-tr-10">
      <Sidebar />
    </aside>

    <main class="[grid-area:main] max-w-[1700px] text-black dark:text-white">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDarkStore } from '@/stores/useDarkStore'
const { isDark, toggleDark } = useDarkStore()
import Sidebar from "./Sidebar.vue";



// HTML 최상위에 dark 클래스 토글
watch(isDark, (val) => {
  document.documentElement.classList.toggle("dark", val);
});


</script>

<style scoped></style>
