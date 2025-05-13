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
      <section v-if="activeTab === 'home'" class="home-wrap">
        <!--배너-->
        <div class="w-[702px] h-80 relative">
          <div
            class="w-[702px] h-80 left-0 top-0 absolute bg-orange-500 rounded-[10px] shadow-[2px_4px_10px_0px_rgba(0,0,0,0.02)] border border-gray-200"
          ></div>
          <div class="left-[38px] top-[30px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
            2025.04.28
          </div>
          <div
            class="left-[547px] top-[25px] absolute justify-start text-white text-xl font-medium font-['Pretendard']"
          >
            24.2ºC
          </div>
          <img class="w-9 h-9 left-[638px] top-[19px] absolute" src="/images/kang/sunny.png" />
          <div
            class="w-24 h-24 left-[44px] top-[92px] absolute bg-orange-50 rounded-full shadow-[2px_4px_10px_0px_rgba(0,0,0,0.02)] border border-gray-200"
          ></div>
          <img class="w-16 h-16 left-[60px] top-[107px] absolute" src="/images/kang/truckicon.png" />
          <div
            class="left-[166px] top-[110px] absolute text-center justify-start text-white text-4xl font-bold font-['Pretendard']"
          >
            홍은경
          </div>
          <div
            class="left-[275px] top-[113px] absolute text-center justify-start text-white text-3xl font-bold font-['Pretendard']"
          >
            기사님
          </div>
          <div
            class="left-[166px] top-[160px] absolute justify-start text-white text-base font-medium font-['Pretendard']"
          >
            실시간 교통정보, 중요한 알림을 확인하세요
          </div>
          <div class="left-[511px] top-[215px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
            이 달의 추가 수당
          </div>
          <div
            class="left-[420px] top-[244px] absolute justify-start text-white text-5xl font-bold font-['Pretendard']"
          >
            105,000
          </div>
          <div
            class="left-[621px] top-[251px] absolute justify-start text-white text-4xl font-bold font-['Pretendard']"
          >
            원
          </div>
        </div>
      </section>

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
