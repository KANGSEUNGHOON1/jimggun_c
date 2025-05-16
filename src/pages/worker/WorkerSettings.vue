<template>
  <!--배경색-->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!--전체영역-->
    <div class="w-full max-w-[768px] mx-auto h-screen bg-white flex-1">
      <h1>환경설정</h1>
      <BottomNavBar />
    </div>
  </div>
</template>
<script setup>
import BottomNavBar from '@/components/BottomNavBar.vue';
</script>
