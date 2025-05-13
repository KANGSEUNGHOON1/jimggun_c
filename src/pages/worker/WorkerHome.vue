<template>
  <!--전체-->
  <div class="workerHomeWrap w-full max-w-[768px] mx-auto">
    <!--탭 메뉴-->
    <div class="workerHomeTab">
      <!-- 탭 버튼 -->
      <div class="flex">
        <h2
          @click="activeTab = 'home'"
          class="flex-1 text-center cursor-pointer"
          :class="activeTab === 'home' ? ' text-[#FF6F00]' : 'text-[#111]'"
        >
          홈
        </h2>
        <h2
          @click="activeTab = 'todayWork'"
          class="flex-1 text-center cursor-pointer "
          :class="activeTab === 'todayWork' ? ' text-[#FF6F00]' : 'text-[#111]'"
        >
          오늘 할 일
        </h2>
      </div>

      <!--홈 탭 내용-->
      <section v-if="activeTab === 'home'" class="home-wrap">홈</section>

<!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
      <!--오늘 할 일 탭 내용-->
      <section v-if="activeTab === 'todayWork'" class="todayWork-wrap">오늘 할 일</section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('home');
</script>
