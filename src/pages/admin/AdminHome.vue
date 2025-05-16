<template>
  <div
    class="max-w-[1920px] m-0 grid grid-cols-[220px_auto] grid-rows-[74px_auto] [grid-template-areas:'header_header''aside_main'] gap-y-[10px] bg-gray-100">
    <header class="[grid-area:header] bg-white flex pr-[32px]">
      <div
        class="w-[220px] text-2xl flex items-center justify-center font-bold">
        Jimggun
      </div>
      <div class="flex-1 flex items-center justify-end ">
        <button><img src="/public/images/jung/darkbtn.png" alt="다크모드버튼"></button></div>
    </header>

    <aside class="[grid-area:aside] bg-white rounded-tl-10 rounded-tr-10">
      <Sidebar />
    </aside>
    <main class="[grid-area:main] max-w-[1700px]">
      <router-view ></router-view>
    </main>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
</script>

<style scoped></style>
