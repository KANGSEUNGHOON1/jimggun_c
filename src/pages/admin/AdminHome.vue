<template>
  <div
    class="max-w-[1920px] m-0 h-screen grid grid-cols-[220px_auto] grid-rows-[74px_auto] [grid-template-areas:'header_header''aside_main'] gap-y-[10px] bg-gray-100 dark:bg-dark">
    <header class="[grid-area:header] bg-white dark:bg-dark-100 flex pr-[32px]">
      <div
        class="w-[220px] text-2xl flex items-center justify-center font-bold text-black dark:text-white">
        Jimggun
      </div>

      <div class="flex-1 flex items-center justify-end mr-3">
        <!-- 다크모드 토글 버튼 -->
        <button
          @click="toggleDark"
          aria-label="다크모드 토글"
          class="relative w-[57px] h-[28px] rounded-full  overflow-hidden border border-white dark:border-dark"
          :class="
            isDark ? 'bg-gray-800 shadowDark-btnBox' : 'bg-[#F4F5F7] shadow-btnBox '
          ">
          <!-- 이동하는 원 -->
          <span
            class="absolute  top-[1px] left-[6px] w-6 h-6 rounded-full bg-[#F4F5F7] shadow-btn dark:shadowDark-btn dark:bg-dark   flex items-center justify-center transition-transform duration-300"
            :class="isDark ? 'translate-x-[-4px]' : 'translate-x-[24px]'">
            <img
              :src="isDark ? '/images/jung/moon.png' : '/images/jung/sun.png'"
              alt="icon"
              class="w-4 h-4" />
          </span>
        </button>
      </div>
    </header>

    <aside
      class="[grid-area:aside] bg-white dark:bg-dark-100 rounded-tl-10 rounded-tr-10  h-[calc(100vh-74px)]">
      <Sidebar />
    </aside>

    <main class="[grid-area:main] max-w-[1700px] text-black dark:text-white  overflow-y-auto h-[calc(100vh-74px)] pr-2">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useDarkStore } from "@/stores/useDarkStore";
import Sidebar from "./Sidebar.vue";
const darkStore = useDarkStore();
//  ref 유지되는 방식
const { isDark } = storeToRefs(darkStore);
const { toggleDark } = darkStore;
watch(isDark, (val) => {
  document.documentElement.classList.toggle("dark", val);
});
</script>

<style scoped></style>
